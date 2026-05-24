import { Router, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { requireAdmin, AdminRequest } from '../../middleware/requireAdmin'

const router = Router()
const prisma = new PrismaClient()

// GET /api/admin/contacts?status=new|read|replied&page=1&limit=20
router.get('/', requireAdmin, async (req: AdminRequest, res: Response) => {
  try {
    const { status, page = '1', limit = '20' } = req.query
    const take = Math.min(parseInt(limit as string, 10), 100)
    const skip = (parseInt(page as string, 10) - 1) * take
    const where = status ? { status: status as string } : {}

    const [submissions, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take,
        skip,
      }),
      prisma.contactSubmission.count({ where }),
    ])

    res.json({
      success: true,
      data: submissions,
      meta: { total, page: parseInt(page as string), limit: take, pages: Math.ceil(total / take) },
    })
  } catch (err) {
    console.error('Contacts fetch error:', err)
    res.status(500).json({ error: 'Failed to fetch contacts' })
  }
})

// GET /api/admin/contacts/:id
router.get('/:id', requireAdmin, async (req: AdminRequest, res: Response) => {
  try {
    const submission = await prisma.contactSubmission.findUnique({ where: { id: req.params.id } })
    if (!submission) {
      res.status(404).json({ error: 'Submission not found' })
      return
    }
    // Auto-mark as read when opened
    if (submission.status === 'new') {
      await prisma.contactSubmission.update({ where: { id: req.params.id }, data: { status: 'read' } })
    }
    res.json({ success: true, data: { ...submission, status: submission.status === 'new' ? 'read' : submission.status } })
  } catch {
    res.status(500).json({ error: 'Failed to fetch submission' })
  }
})

// PATCH /api/admin/contacts/:id — update status
const statusSchema = z.object({ status: z.enum(['new', 'read', 'replied']) })

router.patch('/:id', requireAdmin, async (req: AdminRequest, res: Response) => {
  const parsed = statusSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid status. Must be new, read, or replied.' })
    return
  }
  try {
    const updated = await prisma.contactSubmission.update({
      where: { id: req.params.id },
      data: { status: parsed.data.status },
    })
    res.json({ success: true, data: updated })
  } catch {
    res.status(500).json({ error: 'Failed to update status' })
  }
})

// DELETE /api/admin/contacts/:id
router.delete('/:id', requireAdmin, async (req: AdminRequest, res: Response) => {
  try {
    await prisma.contactSubmission.delete({ where: { id: req.params.id } })
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Failed to delete submission' })
  }
})

export default router
