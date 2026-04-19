# Innovation Next — Setup Guide

## Prerequisites
- Node.js 18+
- PostgreSQL 14+ (local or hosted — Neon.tech recommended for free tier)
- npm or pnpm

---

## 1. Clone & install

```bash
# Install root deps (concurrently for running both servers)
npm install

# Install frontend deps
cd frontend && npm install

# Install backend deps
cd ../backend && npm install
```

---

## 2. Set up environment variables

**Backend:**
```bash
cd backend
cp .env.example .env
# Edit .env — fill in DATABASE_URL, RESEND_API_KEY, CLOUDINARY_*
```

**Frontend:**
```bash
cd frontend
cp .env.example .env
# VITE_API_URL=http://localhost:3001/api is fine for local dev
```

---

## 3. Set up the database

```bash
# From project root
npm run db:push       # Creates all tables from Prisma schema
npm run db:studio     # Optional: open visual DB browser
```

---

## 4. Set up external services

### Email (Resend) — free tier available
1. Sign up at [resend.com](https://resend.com)
2. Create an API key
3. Verify your sending domain (or use Resend's sandbox for dev)
4. Add `RESEND_API_KEY` to backend `.env`

### File uploads (Cloudinary) — free tier available
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Copy Cloud Name, API Key, API Secret from dashboard
3. Add to backend `.env`

---

## 5. Run in development

```bash
# From project root — runs both frontend and backend
npm run dev

# Or separately:
npm run dev:frontend   # Frontend at http://localhost:5173
npm run dev:backend    # Backend API at http://localhost:3001
```

---

## 6. Set up CMS (Payload CMS)

See `docs/CMS_SETUP.md` for detailed instructions.

```bash
mkdir cms && cd cms
npx create-payload-app@latest .
# Admin UI at http://localhost:3000/admin
```

---

## 7. Production deployment

### Frontend → Vercel
```bash
# Install Vercel CLI
npm i -g vercel

cd frontend
vercel

# Set environment variables in Vercel dashboard:
# VITE_API_URL = https://your-backend.railway.app/api
```

### Backend → Railway
1. Push code to GitHub
2. Create new Railway project → Deploy from GitHub
3. Add PostgreSQL service in Railway
4. Set all environment variables from `.env.example`
5. Railway auto-assigns a public URL

### CMS → Railway (separate service)
1. Deploy `cms/` folder as a separate Railway service
2. Connect to the same PostgreSQL or a separate DB
3. Set `PAYLOAD_SECRET` and `DATABASE_URI`

---

## Architecture diagram

```
Browser
  │
  ├── Vercel (Frontend — React/Vite)
  │     └── /api/* → proxy → Railway Backend
  │
  ├── Railway (Backend — Express/Node.js)
  │     ├── /api/contact
  │     ├── /api/newsletter
  │     ├── /api/vacancies
  │     ├── /api/careers/apply
  │     ├── /api/blog
  │     └── /api/case-studies
  │           └── PostgreSQL (Railway managed)
  │
  └── Railway (CMS — Payload)
        └── /admin  ← team uploads content here
              └── PostgreSQL (same or separate)
```

---

## Project file structure

```
innovation-next/
├── frontend/                    React + Vite + TypeScript
│   ├── src/
│   │   ├── App.tsx              Router with all 15+ routes
│   │   ├── index.css            Design system (blue/cyan brand)
│   │   ├── components/
│   │   │   ├── layout/          Navbar, Footer
│   │   │   └── sections/        Page sections + shared templates
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── solutions/       6 solution pages
│   │   │   ├── products/        5 product pages
│   │   │   ├── IndustriesPage.tsx
│   │   │   ├── CompanyPage.tsx
│   │   │   ├── InsightsPage.tsx
│   │   │   ├── CareersPage.tsx  (with CV upload + application form)
│   │   │   └── ContactPage.tsx
│   │   ├── lib/utils.ts         API client + helpers
│   │   └── types/index.ts       TypeScript interfaces
│   └── tailwind.config.js       Brand design tokens
│
├── backend/                     Express + Node.js + TypeScript
│   ├── src/
│   │   ├── index.ts             Server entry, middleware, routes
│   │   ├── routes/
│   │   │   ├── contact.ts       Contact form + email notification
│   │   │   ├── newsletter.ts    Newsletter subscription
│   │   │   ├── vacancies.ts     Job listings CRUD
│   │   │   ├── careers.ts       Job application + CV upload
│   │   │   ├── blog.ts          Blog posts (reads from DB/CMS)
│   │   │   └── caseStudies.ts   Case studies (reads from DB/CMS)
│   │   └── prisma/
│   │       └── schema.prisma    Full DB schema
│   └── .env.example
│
├── docs/
│   └── CMS_SETUP.md             Payload CMS setup guide
│
├── CLAUDE.md                    Instructions for Claude Code
└── SETUP.md                     This file
```

---

## Using with Claude Code

This project was scaffolded to work seamlessly with Claude Code.

```bash
# Install Claude Code CLI
npm install -g @anthropic-ai/claude-code

# From project root
claude

# Claude Code will read CLAUDE.md automatically and understand:
# - Tech stack and file structure
# - Branding rules (blue/cyan, never lime, sans-serif only)
# - API endpoint structure
# - Content from all capability documents
```

Useful Claude Code prompts:
- `"Add an animated counter to the hero stats section"`
- `"Build the individual blog post page at /insights/[slug]"`
- `"Add Framer Motion page transition animations"`
- `"Wire the InsightsPage to use the real /api/blog endpoint"`
- `"Build the use cases pages for /use-cases/*"`
- `"Add a search bar to the InsightsPage"`
