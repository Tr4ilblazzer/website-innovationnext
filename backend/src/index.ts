import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'

dotenv.config()

import contactRouter from './routes/contact'
import newsletterRouter from './routes/newsletter'
import vacanciesRouter from './routes/vacancies'
import careersRouter from './routes/careers'
import blogRouter from './routes/blog'
import caseStudiesRouter from './routes/caseStudies'

const app = express()
const PORT = process.env.PORT || 3001

// ── Security & middleware ─────────────────────────────────────────
app.use(helmet())
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}))
app.use(morgan('dev'))
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))

// ── Rate limiting ─────────────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again shortly.' },
})

const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { error: 'Too many form submissions. Please try again later.' },
})

app.use('/api/', apiLimiter)

// ── Health check ──────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Innovation Next API',
    timestamp: new Date().toISOString(),
    version: '0.1.0',
  })
})

// ── Routes ────────────────────────────────────────────────────────
app.use('/api/contact', formLimiter, contactRouter)
app.use('/api/newsletter', formLimiter, newsletterRouter)
app.use('/api/vacancies', vacanciesRouter)
app.use('/api/careers', formLimiter, careersRouter)
app.use('/api/blog', blogRouter)
app.use('/api/case-studies', caseStudiesRouter)

// ── 404 handler ───────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// ── Error handler ─────────────────────────────────────────────────
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

// ── Start ─────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Innovation Next API running on http://localhost:${PORT}`)
})

export default app
