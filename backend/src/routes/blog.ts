import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// GET /api/blog
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, featured, limit = '12', page = '1' } = req.query
    const take = Math.min(parseInt(limit as string, 10), 50)
    const skip = (parseInt(page as string, 10) - 1) * take

    const where: Record<string, unknown> = { published: true }
    if (category) where.category = category
    if (featured === 'true') where.featured = true

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        take,
        skip,
        select: {
          id: true, title: true, slug: true, excerpt: true,
          category: true, tags: true, authorName: true, authorRole: true,
          featuredImage: true, publishedAt: true, readTime: true, featured: true,
        },
      }),
      prisma.blogPost.count({ where }),
    ])

    return res.json({
      success: true,
      data: posts,
      meta: { total, page: parseInt(page as string), limit: take, pages: Math.ceil(total / take) },
    })
  } catch {
    return res.status(500).json({ error: 'Failed to fetch posts' })
  }
})

// GET /api/blog/:slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: req.params.slug, published: true },
    })
    if (!post) return res.status(404).json({ error: 'Post not found' })
    return res.json({ success: true, data: post })
  } catch {
    return res.status(500).json({ error: 'Failed to fetch post' })
  }
})

export default router
