import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { Resend } from 'resend'

const router = Router()
const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  phone: z.string().max(30).optional(),
  subject: z.string().min(3).max(200),
  message: z.string().min(20).max(5000),
  interest: z.string().optional(),
})

router.post('/', async (req: Request, res: Response) => {
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid form data', details: parsed.error.flatten() })
  }

  const data = parsed.data

  try {
    // Save to DB
    const submission = await prisma.contactSubmission.create({ data })

    // Send emails — fire-and-forget so email errors never block the submission
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_xxxxxxxxxxxx') {
      resend.emails.send({
        from: 'noreply@innovationnext.com',
        to: process.env.CONTACT_EMAIL || 'hello@innovationnext.com',
        subject: `New contact: ${data.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Company:</strong> ${data.company || '—'}</p>
          <p><strong>Phone:</strong> ${data.phone || '—'}</p>
          <p><strong>Interest:</strong> ${data.interest || '—'}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, '<br/>')}</p>
        `,
      }).catch(e => console.error('Email error (team):', e))

      resend.emails.send({
        from: 'hello@innovationnext.com',
        to: data.email,
        subject: 'We received your message — Innovation Next',
        html: `
          <p>Hi ${data.name},</p>
          <p>Thanks for reaching out. We've received your message and our team will get back to you within one business day.</p>
          <p><strong>Your message:</strong><br/>${data.message.replace(/\n/g, '<br/>')}</p>
          <br/>
          <p>Best regards,<br/>The Innovation Next Team<br/>Dubai · Kathmandu</p>
        `,
      }).catch(e => console.error('Email error (applicant):', e))
    } else {
      console.log('ℹ️  Resend not configured — skipping confirmation emails')
    }

    res.json({ success: true, message: 'Message received. We\'ll be in touch shortly.', id: submission.id })
  } catch (err) {
    console.error('Contact submission error:', err)
    res.status(500).json({ error: 'Failed to process submission' })
  }
})

export default router
