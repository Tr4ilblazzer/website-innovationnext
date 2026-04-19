import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// GET /api/vacancies
router.get('/', async (req: Request, res: Response) => {
  try {
    const { department, type, level } = req.query
    const where: Record<string, unknown> = { active: true }
    if (department) where.department = department
    if (type) where.type = type
    if (level) where.level = level

    const vacancies = await prisma.vacancy.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, title: true, department: true, location: true,
        type: true, level: true, description: true, requirements: true,
        salary: true, closingDate: true, createdAt: true,
      },
    })

    res.json({ success: true, data: vacancies })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch vacancies' })
  }
})

// GET /api/vacancies/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const vacancy = await prisma.vacancy.findUnique({
      where: { id: req.params.id },
    })
    if (!vacancy || !vacancy.active) {
      return res.status(404).json({ error: 'Vacancy not found' })
    }
    res.json({ success: true, data: vacancy })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vacancy' })
  }
})

export default router
