import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { requireAdmin, AdminRequest } from '../../middleware/requireAdmin'

const router = Router()
const prisma = new PrismaClient()

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

// POST /api/admin/login
router.post('/login', async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid credentials' })
    return
  }

  const { email, password } = parsed.data

  try {
    const admin = await prisma.adminUser.findUnique({ where: { email } })
    if (!admin) {
      res.status(401).json({ error: 'Invalid email or password' })
      return
    }

    const valid = await bcrypt.compare(password, admin.passwordHash)
    if (!valid) {
      res.status(401).json({ error: 'Invalid email or password' })
      return
    }

    const token = jwt.sign(
      { adminId: admin.id },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '7d' }
    )

    res.json({
      success: true,
      token,
      admin: { id: admin.id, name: admin.name, email: admin.email },
    })
  } catch (err) {
    console.error('Admin login error:', err)
    res.status(500).json({ error: 'Login failed' })
  }
})

// GET /api/admin/me — verify token & return current admin
router.get('/me', requireAdmin, async (req: AdminRequest, res: Response) => {
  try {
    const admin = await prisma.adminUser.findUnique({
      where: { id: req.adminId },
      select: { id: true, name: true, email: true },
    })
    if (!admin) {
      res.status(404).json({ error: 'Admin not found' })
      return
    }
    res.json({ success: true, admin })
  } catch {
    res.status(500).json({ error: 'Failed to fetch admin' })
  }
})

export default router
