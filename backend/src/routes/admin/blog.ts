import { Router, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { requireAdmin, AdminRequest } from '../../middleware/requireAdmin'

const router = Router()
const prisma = new PrismaClient()

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function calcReadTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

const postSchema = z.object({
  title: z.string().min(3).max(300),
  slug: z.string().optional(),
  excerpt: z.string().min(10).max(600),
  content: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()).default([]),
  authorName: z.string().min(1),
  authorRole: z.string().optional(),
  featuredImage: z.string().optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
})

// GET /api/admin/blog — all posts (including drafts)
router.get('/', requireAdmin, async (_req: AdminRequest, res: Response) => {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, title: true, slug: true, category: true, authorName: true,
        published: true, featured: true, readTime: true, publishedAt: true, createdAt: true,
        excerpt: true, featuredImage: true, tags: true, authorRole: true,
      },
    })
    res.json({ success: true, data: posts })
  } catch {
    res.status(500).json({ error: 'Failed to fetch posts' })
  }
})

// GET /api/admin/blog/:id
router.get('/:id', requireAdmin, async (req: AdminRequest, res: Response) => {
  try {
    const post = await prisma.blogPost.findUnique({ where: { id: req.params.id } })
    if (!post) {
      res.status(404).json({ error: 'Post not found' })
      return
    }
    res.json({ success: true, data: post })
  } catch {
    res.status(500).json({ error: 'Failed to fetch post' })
  }
})

// POST /api/admin/blog — create
router.post('/', requireAdmin, async (req: AdminRequest, res: Response) => {
  const parsed = postSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: 'Validation failed', details: parsed.error.flatten() })
    return
  }

  const data = parsed.data
  const slug = data.slug || slugify(data.title)
  const readTime = calcReadTime(data.content)

  try {
    // Ensure slug uniqueness
    const existing = await prisma.blogPost.findUnique({ where: { slug } })
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug

    const post = await prisma.blogPost.create({
      data: {
        ...data,
        slug: finalSlug,
        readTime,
        publishedAt: data.published ? new Date() : null,
      },
    })
    res.status(201).json({ success: true, data: post })
  } catch (err) {
    console.error('Create post error:', err)
    res.status(500).json({ error: 'Failed to create post' })
  }
})

// PUT /api/admin/blog/:id — update
router.put('/:id', requireAdmin, async (req: AdminRequest, res: Response) => {
  const parsed = postSchema.partial().safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: 'Validation failed', details: parsed.error.flatten() })
    return
  }

  const data = parsed.data
  try {
    const existing = await prisma.blogPost.findUnique({ where: { id: req.params.id } })
    if (!existing) {
      res.status(404).json({ error: 'Post not found' })
      return
    }

    const wasPublished = existing.published
    const nowPublished = data.published ?? existing.published

    const post = await prisma.blogPost.update({
      where: { id: req.params.id },
      data: {
        ...data,
        readTime: data.content ? calcReadTime(data.content) : existing.readTime,
        // Set publishedAt only when first publishing
        publishedAt: !wasPublished && nowPublished ? new Date() : existing.publishedAt,
      },
    })
    res.json({ success: true, data: post })
  } catch (err) {
    console.error('Update post error:', err)
    res.status(500).json({ error: 'Failed to update post' })
  }
})

// DELETE /api/admin/blog/:id
router.delete('/:id', requireAdmin, async (req: AdminRequest, res: Response) => {
  try {
    await prisma.blogPost.delete({ where: { id: req.params.id } })
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Failed to delete post' })
  }
})

export default router
