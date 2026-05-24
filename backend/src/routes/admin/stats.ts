import { Router, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { requireAdmin, AdminRequest } from '../../middleware/requireAdmin'

const router = Router()
const prisma = new PrismaClient()

// GET /api/admin/stats
router.get('/', requireAdmin, async (_req: AdminRequest, res: Response) => {
  try {
    const [
      contactNew,
      contactRead,
      contactReplied,
      postsPublished,
      postsDraft,
      vacanciesActive,
      vacanciesInactive,
      newsletterCount,
      applicationsCount,
    ] = await Promise.all([
      prisma.contactSubmission.count({ where: { status: 'new' } }),
      prisma.contactSubmission.count({ where: { status: 'read' } }),
      prisma.contactSubmission.count({ where: { status: 'replied' } }),
      prisma.blogPost.count({ where: { published: true } }),
      prisma.blogPost.count({ where: { published: false } }),
      prisma.vacancy.count({ where: { active: true } }),
      prisma.vacancy.count({ where: { active: false } }),
      prisma.newsletterSubscriber.count({ where: { active: true } }),
      prisma.jobApplication.count(),
    ])

    res.json({
      success: true,
      data: {
        contacts: { new: contactNew, read: contactRead, replied: contactReplied, total: contactNew + contactRead + contactReplied },
        posts: { published: postsPublished, draft: postsDraft, total: postsPublished + postsDraft },
        vacancies: { active: vacanciesActive, inactive: vacanciesInactive, total: vacanciesActive + vacanciesInactive },
        newsletter: { subscribers: newsletterCount },
        applications: { total: applicationsCount },
      },
    })
  } catch (err) {
    console.error('Stats error:', err)
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
})

export default router
