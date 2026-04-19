import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// GET /api/case-studies
router.get('/', async (req: Request, res: Response) => {
  try {
    const { industry, domain, featured, limit = '12', page = '1' } = req.query
    const take = Math.min(parseInt(limit as string, 10), 50)
    const skip = (parseInt(page as string, 10) - 1) * take

    const where: Record<string, unknown> = { published: true }
    if (industry) where.industry = industry
    if (domain) where.domain = domain
    if (featured === 'true') where.featured = true

    const [studies, total] = await Promise.all([
      prisma.caseStudy.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        take,
        skip,
        select: {
          id: true, title: true, slug: true, client: true,
          industry: true, domain: true, challenge: true,
          results: true, technologies: true, featuredImage: true,
          publishedAt: true, featured: true, duration: true,
        },
      }),
      prisma.caseStudy.count({ where }),
    ])

    return res.json({
      success: true,
      data: studies,
      meta: { total, page: parseInt(page as string), limit: take, pages: Math.ceil(total / take) },
    })
  } catch {
    return res.status(500).json({ error: 'Failed to fetch case studies' })
  }
})

// GET /api/case-studies/:slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const study = await prisma.caseStudy.findUnique({
      where: { slug: req.params.slug, published: true },
    })
    if (!study) return res.status(404).json({ error: 'Case study not found' })
    return res.json({ success: true, data: study })
  } catch {
    return res.status(500).json({ error: 'Failed to fetch case study' })
  }
})

export default router
