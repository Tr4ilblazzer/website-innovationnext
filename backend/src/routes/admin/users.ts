import { Router, Response } from 'express'
import { Prisma, PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { requireAdmin, AdminRequest } from '../../middleware/requireAdmin'

const router = Router()
const prisma = new PrismaClient()

const safeSelect = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
  updatedAt: true,
} as const

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

function isAdminName(name: string): boolean {
  return name.trim().toLowerCase() === 'admin'
}

async function getRequester(adminId?: string) {
  if (!adminId) return null
  return prisma.adminUser.findUnique({
    where: { id: adminId },
    select: { id: true, name: true },
  })
}

function isUniqueError(err: unknown): boolean {
  return err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002'
}

async function emailTaken(email: string, excludeId?: string): Promise<boolean> {
  const existing = await prisma.adminUser.findFirst({
    where: {
      email: { equals: email, mode: 'insensitive' },
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
    select: { id: true },
  })
  return existing !== null
}

const createSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  password: z.string().min(8).max(72),
})

const updateSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
})

const passwordSchema = z.object({
  currentPassword: z.string().max(72).optional(),
  newPassword: z.string().min(8).max(72),
})

// GET /api/admin/users
router.get('/', requireAdmin, async (_req: AdminRequest, res: Response) => {
  try {
    const users = await prisma.adminUser.findMany({
      orderBy: { createdAt: 'desc' },
      select: safeSelect,
    })
    res.json({ success: true, data: users })
  } catch (err) {
    console.error('Admin users fetch error:', err)
    res.status(500).json({ error: 'Failed to fetch admin users' })
  }
})

// POST /api/admin/users
router.post('/', requireAdmin, async (req: AdminRequest, res: Response) => {
  const parsed = createSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: 'Validation failed', details: parsed.error.flatten() })
    return
  }

  if (isAdminName(parsed.data.name)) {
    res.status(409).json({ error: 'That name is reserved for the Admin account' })
    return
  }

  const email = normalizeEmail(parsed.data.email)

  try {
    if (await emailTaken(email)) {
      res.status(409).json({ error: 'An admin with this email already exists' })
      return
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 12)
    const user = await prisma.adminUser.create({
      data: { name: parsed.data.name, email, passwordHash },
      select: safeSelect,
    })

    res.status(201).json({ success: true, data: user })
  } catch (err) {
    if (isUniqueError(err)) {
      res.status(409).json({ error: 'An admin with this email already exists' })
      return
    }
    console.error('Admin user create error:', err)
    res.status(500).json({ error: 'Failed to create admin user' })
  }
})

// PUT /api/admin/users/:id — update name + email
router.put('/:id', requireAdmin, async (req: AdminRequest, res: Response) => {
  const parsed = updateSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: 'Validation failed', details: parsed.error.flatten() })
    return
  }

  const email = normalizeEmail(parsed.data.email)

  try {
    const [existing, requester] = await Promise.all([
      prisma.adminUser.findUnique({
        where: { id: req.params.id },
        select: { id: true, name: true },
      }),
      getRequester(req.adminId),
    ])
    if (!existing) {
      res.status(404).json({ error: 'Admin user not found' })
      return
    }

    const targetIsAdmin = isAdminName(existing.name)
    const requesterIsAdmin = !!requester && isAdminName(requester.name)

    if (targetIsAdmin) {
      if (!requesterIsAdmin) {
        res.status(403).json({ error: 'Only the Admin account can edit this account' })
        return
      }
      if (parsed.data.name !== existing.name) {
        res.status(400).json({ error: 'The Admin account name cannot be changed' })
        return
      }
    } else if (isAdminName(parsed.data.name)) {
      res.status(409).json({ error: 'That name is reserved for the Admin account' })
      return
    }

    if (await emailTaken(email, req.params.id)) {
      res.status(409).json({ error: 'An admin with this email already exists' })
      return
    }

    const user = await prisma.adminUser.update({
      where: { id: req.params.id },
      data: { name: parsed.data.name, email },
      select: safeSelect,
    })

    res.json({ success: true, data: user })
  } catch (err) {
    if (isUniqueError(err)) {
      res.status(409).json({ error: 'An admin with this email already exists' })
      return
    }
    console.error('Admin user update error:', err)
    res.status(500).json({ error: 'Failed to update admin user' })
  }
})

// PATCH /api/admin/users/:id/password
// Self: currentPassword required. Other admins: reset with newPassword only.
router.patch('/:id/password', requireAdmin, async (req: AdminRequest, res: Response) => {
  const parsed = passwordSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: 'Validation failed', details: parsed.error.flatten() })
    return
  }

  try {
    const target = await prisma.adminUser.findUnique({ where: { id: req.params.id } })
    if (!target) {
      res.status(404).json({ error: 'Admin user not found' })
      return
    }

    if (req.params.id !== req.adminId) {
      const requester = await getRequester(req.adminId)
      if (!requester || !isAdminName(requester.name)) {
        res.status(403).json({ error: 'Only the Admin account can reset another user\u2019s password' })
        return
      }
    }

    if (req.params.id === req.adminId) {
      if (!parsed.data.currentPassword) {
        res.status(400).json({ error: 'Current password is required' })
        return
      }
      const valid = await bcrypt.compare(parsed.data.currentPassword, target.passwordHash)
      if (!valid) {
        res.status(400).json({ error: 'Current password is incorrect' })
        return
      }
    }

    const passwordHash = await bcrypt.hash(parsed.data.newPassword, 12)
    await prisma.adminUser.update({
      where: { id: req.params.id },
      data: { passwordHash },
    })

    res.json({ success: true })
  } catch (err) {
    console.error('Admin password update error:', err)
    res.status(500).json({ error: 'Failed to update password' })
  }
})

// DELETE /api/admin/users/:id
router.delete('/:id', requireAdmin, async (req: AdminRequest, res: Response) => {
  if (req.params.id === req.adminId) {
    res.status(400).json({ error: 'You cannot delete your own account' })
    return
  }

  try {
    const outcome = await prisma.$transaction(async tx => {
      const target = await tx.adminUser.findUnique({
        where: { id: req.params.id },
        select: { id: true, name: true },
      })
      if (!target) return 'not-found' as const
      if (isAdminName(target.name)) return 'protected-admin' as const

      const total = await tx.adminUser.count()
      if (total <= 1) return 'last-admin' as const

      await tx.adminUser.delete({ where: { id: req.params.id } })
      return 'deleted' as const
    })

    if (outcome === 'not-found') {
      res.status(404).json({ error: 'Admin user not found' })
      return
    }
    if (outcome === 'protected-admin') {
      res.status(400).json({ error: 'The Admin account cannot be deleted' })
      return
    }
    if (outcome === 'last-admin') {
      res.status(400).json({ error: 'Cannot delete the last admin account' })
      return
    }

    res.json({ success: true })
  } catch (err) {
    console.error('Admin user delete error:', err)
    res.status(500).json({ error: 'Failed to delete admin user' })
  }
})

export default router
