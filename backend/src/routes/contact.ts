import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { Resend } from 'resend'

const router = Router()
const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

const escapeHtml = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

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
      const e = {
        name: escapeHtml(data.name),
        email: escapeHtml(data.email),
        company: escapeHtml(data.company || '—'),
        phone: escapeHtml(data.phone || '—'),
        interest: escapeHtml(data.interest || '—'),
        subject: escapeHtml(data.subject),
        message: escapeHtml(data.message).replace(/\n/g, '<br/>'),
      }

      resend.emails.send({
        from: 'noreply@innovationnext.com',
        to: process.env.CONTACT_EMAIL || 'hello@innovationnext.com',
        reply_to: data.email,
        subject: `New contact: ${data.subject.replace(/[\r\n]+/g, ' ')}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${e.name}</p>
          <p><strong>Email:</strong> ${e.email}</p>
          <p><strong>Company:</strong> ${e.company}</p>
          <p><strong>Phone:</strong> ${e.phone}</p>
          <p><strong>Interest:</strong> ${e.interest}</p>
          <p><strong>Subject:</strong> ${e.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${e.message}</p>
        `,
      }).catch(err => console.error('Email error (team):', err))

      // Fixed acknowledgement only — never echo submitter-supplied content to a third-party address
      resend.emails.send({
        from: 'hello@innovationnext.com',
        to: data.email,
        subject: 'We received your message — Innovation Next',
        html: `
          <p>Hi ${e.name},</p>
          <p>Thanks for reaching out. We've received your message and our team will get back to you within one business day.</p>
          <br/>
          <p>Best regards,<br/>The Innovation Next Team<br/>Kathmandu, Nepal</p>
        `,
      }).catch(err => console.error('Email error (applicant):', err))
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
