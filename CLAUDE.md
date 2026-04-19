# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Full-stack corporate website for **Innovation Next** (also known as Four Symmetrons Innovation), a digital technology company HQ'd in Dubai with a hub in Kathmandu. The company operates across 6 domains: Digital Financial Services, E-Governance, AI/ML, BI & Data, IT Services, and Staff Augmentation.

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS v3 + shadcn/ui |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Backend | Node.js + Express + TypeScript |
| Database | PostgreSQL via Prisma ORM |
| CMS | Payload CMS (open-source, self-hosted) |
| Email | Resend API |
| File Upload | Cloudinary |
| Deployment | Frontend: Vercel / Backend: Railway |

## Commands

```bash
# From project root — runs both frontend and backend concurrently
npm run dev

# Frontend only (port 5173)
cd frontend && npm run dev
cd frontend && npm run build      # tsc + vite build

# Backend only (port 3001)
cd backend && npm run dev         # ts-node-dev with hot reload
cd backend && npm run build       # tsc compile to dist/
cd backend && npm run start       # run compiled dist/index.js
cd backend && npm run db:push     # sync Prisma schema to DB
cd backend && npm run db:generate # regenerate Prisma client
cd backend && npm run db:studio   # open Prisma Studio

# CMS (port 3000)
cd cms && npm run dev
```

## Project Structure

```
innovation-next/
├── frontend/src/
│   ├── components/
│   │   ├── ui/              # shadcn primitives + custom UI (shader-background, glass-blog-card, feature108, etc.)
│   │   ├── layout/          # Navbar, Footer
│   │   └── sections/        # Reusable page sections
│   ├── pages/               # Route-level components
│   │   ├── solutions/       # Individual solution pages (unused — see SolutionPage pattern)
│   │   └── products/        # Individual product pages (unused — currently ComingSoon)
│   ├── lib/utils.ts         # cn() helper (clsx + tailwind-merge)
│   └── types/index.ts       # All shared TypeScript types
├── backend/src/
│   ├── index.ts             # Express app entry — middleware, rate limits, route mounting
│   └── routes/              # One file per endpoint group (contact, newsletter, vacancies, careers, blog, caseStudies)
└── cms/                     # Payload CMS (generated)
```

## Architecture Patterns

### Solution Pages (data-driven, not file-driven)
All 6 solution pages share a **single component**: `frontend/src/pages/SolutionPage.tsx`. It reads from a `SOLUTIONS` config map keyed by domain slug (`fintech`, `egovernance`, `ai-ml`, `bi-data`, `it-services`, `staff-augmentation`). Each entry defines icon, tagline, description, accent color, stats, capabilities, optional products, and optional deployments. The `frontend/src/pages/solutions/` directory contains older individual page files that are **not currently used** by the router.

The older `SolutionPageTemplate` component (`frontend/src/components/sections/SolutionPageTemplate.tsx`) is also unused by the current router — `SolutionPage.tsx` renders its own layout inline.

### Product Pages
`/products/:slug` routes render a `ComingSoon` stub. The `frontend/src/pages/products/` files exist but are not wired into the router yet.

### Backend Routes
Each route file in `backend/src/routes/` is self-contained — validation, business logic, and response handling all live in the same file. There are no separate controllers or services layers.

Form submission routes (`/api/contact`, `/api/newsletter`, `/api/careers/apply`) are protected by a stricter `formLimiter` (10 req/hr). All API routes share a general `apiLimiter` (100 req/15min).

### Component Styling Conventions
Custom Tailwind utility classes defined in `frontend/src/index.css` (not in `tailwind.config.js`):
- `glass-card` — glassmorphism card: `bg-white/[0.03] backdrop-blur-[16px] border border-white/[0.08]`
- `btn-primary` — rounded-full gradient button
- `btn-secondary` — rounded-full outlined button
- `btn-gradient-outline` — spinning conic-gradient border button using `@property --border-angle`; inner `<span>` must have `background: #040404` to mask the gradient fill
- `section-heading` — large bold heading using Clash Display Variable
- `hero-heading` — extra-large hero text using Clash Display Variable
- `gradient-text` — blue-to-cyan gradient text (`linear-gradient(135deg, #3C53FF, #0DFFFF)`)
- `stat-number` — large stat display
- `glow-orb` — absolute-positioned radial glow element; combine with `glow-blue` or `glow-cyan` modifier

**Never use `.section-tag`** (the small pill label above headings) — user considers it AI-generated and generic.

Tailwind token aliases (from `tailwind.config.js`):
- `brand-gradient` — `linear-gradient(135deg, #3C53FF, #0DFFFF)`
- `bg-brand-dark` / `bg-brand-surface` / `bg-brand-card` — `#040404` / `#111111` / `#161616`

### Third-party shader library
`@paper-design/shaders-react` `<Warp>` component is used in `DomainsSection`. Its `shape` prop only accepts `"checks" | "stripes" | "edge"` — **do not use `"dots"` or any other value**, it will cause a TypeScript error.

## Branding Rules (Design System v2)
- **Primary Blue:** `#3C53FF` · **Primary Hover:** `#2B3BB5` · **Primary Cyan:** `#0DFFFF`
- **Black:** `#040404` · **White:** `#FAFAFA` · **Surface:** `#111111` · **Card:** `#161616`
- **Neutral 1:** `#737373` · **Neutral 2:** `#393939` · **Neutral 3:** `#B1B1B1`
- **Heading font:** Clash Display Variable (loaded via Fontshare) — applied through `.hero-heading` and `.section-heading`
- **Body font:** Public Sans (loaded via Google Fonts)
- **NEVER use Inter, serif fonts, or lime/green accents** — brand is blue/cyan only
- Each solution domain has its own `accent` color: fintech = `#3C53FF`, e-gov = `#10b981`, ai-ml = `#8b5cf6`, bi-data = `#f59e0b`, it-services = `#ef4444`, staff-aug = `#ec4899`. Use that accent for glows, gradients, and tags on that domain's page.

## Content Rules
- Founder credentials: co-founded eSewa (South Asia's first digital wallet, 13M users) and Fonepay (Nepal's national payment switch, 52+ banks). Reference the **products/platforms** generically — **NEVER name the founders**.
- eSewa and Fonepay are founder credentials shown as "Proven Deployments," NOT Innovation Next products.
- Key fintech stats: 13M+ users, $275M+ monthly transactions, 52+ banks connected, 80%+ market share
- E-Gov stats: 7+ live government platforms, 5M+ citizens served, 10+ government agencies

## API Endpoints

### Public
- `POST /api/contact` — Contact form
- `POST /api/newsletter` — Newsletter subscribe
- `POST /api/careers/apply` — Job application (multipart, CV upload via Cloudinary)
- `GET /api/vacancies` — Open positions
- `GET /api/blog` — Blog posts
- `GET /api/case-studies` — Case studies
- `GET /api/health` — Health check

### Admin
- Payload CMS admin UI at `/admin` (port 3000 in dev)

## Environment Variables

Frontend (`frontend/.env`):
```
VITE_API_URL=http://localhost:3001
VITE_CMS_URL=http://localhost:3000
```

Backend (`backend/.env`):
```
DATABASE_URL=postgresql://...
RESEND_API_KEY=...
CLOUDINARY_URL=...
JWT_SECRET=...
CORS_ORIGIN=http://localhost:5173
```

## Pages: Live vs. Stub

**Fully built:** Home, Company, Contact, Careers, Insights (list), all 6 Solution pages
**ComingSoon stubs:** Products index, all `/products/:slug`, Industries, Use Cases, `/insights/:slug`, `/insights/case-studies`, Privacy, Terms, Cookies
