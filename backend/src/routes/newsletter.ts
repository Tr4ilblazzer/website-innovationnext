import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { Resend } from 'resend'

const router = Router()
const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  email: z.string().email(),
  name: z.string().max(100).optional(),
})

router.post('/', async (req: Request, res: Response) => {
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'Valid email required' })
  }

  const { email, name } = parsed.data

  try {
    // Upsert subscriber
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { active: true, name: name || undefined },
      create: { email, name, active: true },
    })

    // Confirmation email
    await resend.emails.send({
      from: 'hello@innovationnext.com',
      to: email,
      subject: 'You\'re subscribed to Innovation Next Insights',
      html: `
        <p>Hi${name ? ` ${name}` : ''},</p>
        <p>You're now subscribed to Innovation Next Insights — practical analysis on fintech infrastructure, e-governance, and digital platforms from practitioners who've built at national scale.</p>
        <p>We publish occasionally. No spam, ever.</p>
        <br/>
        <p>— The Innovation Next Team</p>
        <p style="color:#999;font-size:12px;">To unsubscribe, reply to this email with "unsubscribe".</p>
      `,
    })

    res.json({ success: true, message: 'Successfully subscribed' })
  } catch (err) {
    console.error('Newsletter subscription error:', err)
    res.status(500).json({ error: 'Subscription failed' })
  }
})

export default router
