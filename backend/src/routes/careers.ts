import { Router, Request, Response } from 'express'
import multer from 'multer'
import { PrismaClient } from '@prisma/client'
import { Resend } from 'resend'
import { buildCvKey, uploadCvBuffer, getCvPresignedUrl } from '../lib/minio'

const router = Router()
const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)


// Multer — memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    const allowed = ['application/pdf', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (allowed.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Only PDF and Word documents are accepted'))
    }
  },
})

// POST /api/careers/apply
router.post('/apply', upload.single('cvFile'), async (req: Request, res: Response) => {
  try {
    const { vacancyId, firstName, lastName, email, phone,
      currentRole, experience, coverLetter, portfolioUrl, linkedinUrl } = req.body

    // Basic validation
    if (!vacancyId || !firstName || !lastName || !email || !phone || !experience) {
      return res.status(400).json({ error: 'Required fields missing' })
    }
    if (!req.file) {
      return res.status(400).json({ error: 'CV file is required' })
    }

    // Check vacancy exists
    const vacancy = await prisma.vacancy.findUnique({ where: { id: vacancyId } })
    if (!vacancy) {
      return res.status(404).json({ error: 'Vacancy not found' })
    }

    // Upload CV to MinIO (shared bucket with HRMS) and persist the object key
    const cvKey = buildCvKey(vacancyId as string, req.file.originalname)
    await uploadCvBuffer(req.file.buffer, cvKey, req.file.mimetype)
    const cvUrl = await getCvPresignedUrl(cvKey)

    // Save application
    const application = await prisma.jobApplication.create({
      data: {
        vacancyId,
        firstName,
        lastName,
        email,
        phone,
        currentRole: currentRole || null,
        experience,
        coverLetter: coverLetter || null,
        cvKey,
        portfolioUrl: portfolioUrl || null,
        linkedinUrl: linkedinUrl || null,
        status: 'new',
      },
    })

    // Send emails — fire-and-forget so email errors never block the submission
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_xxxxxxxxxxxx') {
      resend.emails.send({
        from: 'careers@innovationnext.com',
        to: process.env.CAREERS_EMAIL || 'hr@innovationnext.com',
        subject: `New Application: ${vacancy.title} — ${firstName} ${lastName}`,
        html: `
          <h2>New Job Application</h2>
          <p><strong>Position:</strong> ${vacancy.title}</p>
          <p><strong>Applicant:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          ${currentRole ? `<p><strong>Current Role:</strong> ${currentRole}</p>` : ''}
          <p><strong>Experience:</strong></p>
          <p>${experience.replace(/\n/g, '<br>')}</p>
          ${coverLetter ? `<p><strong>Cover Letter:</strong></p><p>${coverLetter.replace(/\n/g, '<br>')}</p>` : ''}
          ${linkedinUrl ? `<p><strong>LinkedIn:</strong> <a href="${linkedinUrl}">${linkedinUrl}</a></p>` : ''}
          ${portfolioUrl ? `<p><strong>Portfolio:</strong> <a href="${portfolioUrl}">${portfolioUrl}</a></p>` : ''}
          <p><strong>CV:</strong> <a href="${cvUrl}">Download CV</a></p>
        `,
      }).catch(e => console.error('Email error (team):', e))

      resend.emails.send({
        from: 'careers@innovationnext.com',
        to: email,
        subject: `We've received your application — ${vacancy.title}`,
        html: `
          <p>Hi ${firstName},</p>
          <p>Thanks for applying for the <strong>${vacancy.title}</strong> position at Innovation Next.</p>
          <p>We've received your application and will review it carefully. Our team will be in touch within <strong>3–5 business days</strong> if your profile is a match.</p>
          <p>Best regards,<br/>The Innovation Next Team</p>
        `,
      }).catch(e => console.error('Email error (applicant):', e))
    } else {
      console.log('ℹ️  Resend not configured — skipping confirmation emails')
    }

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: application.id,
    })

  } catch (error) {
    console.error('Application submission error:', error)
    return res.status(500).json({ error: 'Failed to submit application' })
  }
})

// GET /api/careers/apply (vacancies list for public)
router.get('/vacancies', async (_req: Request, res: Response) => {
  try {
    const vacancies = await prisma.vacancy.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
    })
    return res.json({ success: true, data: vacancies })
  } catch {
    return res.status(500).json({ error: 'Failed to fetch vacancies' })
  }
})

export default router
