import { Router, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { requireAdmin, AdminRequest } from '../../middleware/requireAdmin'

const router = Router()
const prisma = new PrismaClient()

const vacancySchema = z.object({
  title: z.string().min(3).max(200),
  department: z.string().min(1),
  location: z.string().min(1),
  type: z.enum(['Full-time', 'Part-time', 'Contract', 'Remote']),
  level: z.enum(['Junior', 'Mid', 'Senior', 'Lead', 'Manager']),
  description: z.string().min(20),
  requirements: z.array(z.string()).default([]),
  niceToHave: z.array(z.string()).default([]),
  salary: z.string().optional(),
  closingDate: z.string().optional().transform(v => v ? new Date(v) : null),
  active: z.boolean().default(true),
})

// GET /api/admin/vacancies — all (including inactive)
router.get('/', requireAdmin, async (_req: AdminRequest, res: Response) => {
  try {
    const vacancies = await prisma.vacancy.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { applications: true } } },
    })
    res.json({ success: true, data: vacancies })
  } catch {
    res.status(500).json({ error: 'Failed to fetch vacancies' })
  }
})

// GET /api/admin/vacancies/:id
router.get('/:id', requireAdmin, async (req: AdminRequest, res: Response) => {
  try {
    const vacancy = await prisma.vacancy.findUnique({
      where: { id: req.params.id },
      include: { _count: { select: { applications: true } } },
    })
    if (!vacancy) {
      res.status(404).json({ error: 'Vacancy not found' })
      return
    }
    res.json({ success: true, data: vacancy })
  } catch {
    res.status(500).json({ error: 'Failed to fetch vacancy' })
  }
})

// POST /api/admin/vacancies — create
router.post('/', requireAdmin, async (req: AdminRequest, res: Response) => {
  const parsed = vacancySchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: 'Validation failed', details: parsed.error.flatten() })
    return
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const vacancy = await prisma.vacancy.create({ data: parsed.data as any })
    res.status(201).json({ success: true, data: vacancy })
  } catch (err) {
    console.error('Create vacancy error:', err)
    res.status(500).json({ error: 'Failed to create vacancy' })
  }
})

// PUT /api/admin/vacancies/:id — update
router.put('/:id', requireAdmin, async (req: AdminRequest, res: Response) => {
  const parsed = vacancySchema.partial().safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: 'Validation failed', details: parsed.error.flatten() })
    return
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const vacancy = await prisma.vacancy.update({
      where: { id: req.params.id },
      data: parsed.data as any,
    })
    res.json({ success: true, data: vacancy })
  } catch {
    res.status(500).json({ error: 'Failed to update vacancy' })
  }
})

// PATCH /api/admin/vacancies/:id/toggle — flip active flag
router.patch('/:id/toggle', requireAdmin, async (req: AdminRequest, res: Response) => {
  try {
    const current = await prisma.vacancy.findUnique({ where: { id: req.params.id } })
    if (!current) {
      res.status(404).json({ error: 'Vacancy not found' })
      return
    }
    const updated = await prisma.vacancy.update({
      where: { id: req.params.id },
      data: { active: !current.active },
    })
    res.json({ success: true, data: updated })
  } catch {
    res.status(500).json({ error: 'Failed to toggle vacancy' })
  }
})

// DELETE /api/admin/vacancies/:id
router.delete('/:id', requireAdmin, async (req: AdminRequest, res: Response) => {
  try {
    await prisma.vacancy.delete({ where: { id: req.params.id } })
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Failed to delete vacancy' })
  }
})

// ── Applications ──────────────────────────────────────────────────────────────

// GET /api/admin/vacancies/:id/applications
router.get('/:id/applications', requireAdmin, async (req: AdminRequest, res: Response) => {
  try {
    const applications = await prisma.jobApplication.findMany({
      where: { vacancyId: req.params.id },
      orderBy: { createdAt: 'desc' },
      include: { vacancy: { select: { title: true } } },
    })
    res.json({ success: true, data: applications })
  } catch {
    res.status(500).json({ error: 'Failed to fetch applications' })
  }
})

// PATCH /api/admin/applications/:appId — update status
router.patch('/applications/:appId', requireAdmin, async (req: AdminRequest, res: Response) => {
  const schema = z.object({
    status: z.enum(['new', 'reviewing', 'shortlisted', 'rejected', 'hired']),
  })
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid status' })
    return
  }
  try {
    const app = await prisma.jobApplication.update({
      where: { id: req.params.appId },
      data: { status: parsed.data.status },
    })
    res.json({ success: true, data: app })
  } catch {
    res.status(500).json({ error: 'Failed to update application' })
  }
})

export default router
