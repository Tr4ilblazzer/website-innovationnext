# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Full-stack corporate website for **Innovation Next** (also known as Four Symmetrons Innovation), a digital technology company HQ'd in Dubai with a hub in Kathmandu. The company operates across 6 domains: Digital Financial Services, E-Governance, AI/ML, BI & Data, IT Services, and Staff Augmentation.

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS v3 + shadcn/ui |
| State | Zustand (installed, not yet used — TanStack Query planned for API wiring) |
| Forms | React Hook Form + Zod |
| Backend | Node.js + Express + TypeScript |
| Database | PostgreSQL via Prisma ORM |
| CMS | Payload CMS (open-source, self-hosted) — not yet wired to frontend |
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
│   │   ├── ui/              # shadcn primitives + custom brand components
│   │   ├── layout/          # Navbar, Footer
│   │   └── sections/        # Reusable page sections (SolutionPageTemplate, ProductPageTemplate, InsightsSection, etc.)
│   ├── pages/
│   │   ├── solutions/       # 6 individual solution pages (lazy-loaded in App.tsx)
│   │   └── products/        # 5 individual product pages (lazy-loaded in App.tsx)
│   ├── hooks/               # Custom React hooks (useScrollY, useIntersection, useMediaQuery)
│   ├── data/                # Mock data — replaced by API calls when backend is live
│   │   ├── insights.ts      # 18 blog posts (3 per domain) with full body content + InsightPost type
│   │   └── vacancies.ts     # 4 mock job listings
│   ├── services/
│   │   └── api.ts           # Typed fetch functions for all endpoints (see Data Layer below)
│   ├── lib/utils.ts         # cn() helper (clsx + tailwind-merge)
│   └── types/index.ts       # All shared TypeScript types (API / backend shapes)
├── backend/src/
│   ├── index.ts             # Express app entry — middleware, rate limits, route mounting
│   └── routes/              # One file per endpoint group
└── cms/                     # Payload CMS (generated)
```

## Architecture Patterns

### Data & Service Layer
All data that will eventually come from the CMS/backend lives in `frontend/src/data/` and is exposed through typed functions in `frontend/src/services/api.ts`. Components import from `services/api.ts`, never directly from `data/`.

When the backend is live, only `api.ts` changes — each function has a `// TODO: replace with →` comment showing the exact fetch call that replaces the mock. Components stay untouched.

```ts
// Current (mock) — returns InsightPost[] (local CMS shape from data/insights.ts)
export async function getBlogPosts(category?: string): Promise<InsightPost[]> {
  return ALL_POSTS.filter(...)
}

// After backend is live — swap return type to BlogPost[] and use request()
export async function getBlogPosts(category?: string): Promise<BlogPost[]> {
  return request<BlogPost[]>(`/api/blog${category ? `?category=${category}` : ''}`)
}
```

### Insights System
- **Data:** `data/insights.ts` — 18 posts, 3 per domain. Each post has `id`, `slug`, `title`, `excerpt`, `category`, `author`, `publishedAt`, `readTime`, `featured`, `image`, `accentColor`, and `body: ContentBlock[]`.
- **`ContentBlock`** is a discriminated union: `{ type: 'h2' | 'p' | 'blockquote' | 'ul', text?: string, items?: string[] }`.
- **`InsightsSection`** (used on Home, all 6 solution pages, all 5 product pages) accepts an optional `category` prop — pass it to show only domain-relevant posts. Returns `null` if no posts match (IT Services currently has no posts).
- **`InsightsPage`** — paginated at 6 posts/page; featured posts only show on page 1 with no filter active.
- **`InsightDetailPage`** — reads `slug` from `useParams()`, renders `body` blocks, shows related posts from the same category, then a CTA.

### Solution Pages
Each of the 6 solution pages is in `frontend/src/pages/solutions/` and lazy-loaded in `App.tsx`. Layout: hero → features/capabilities → `<TrustedBySection />` → `<InsightsSection category="..." />` → CTA. Each page uses `<SolutionPageTemplate>` from `components/sections/SolutionPageTemplate.tsx` — except `FintechSolutionPage` and `StaffAugSolutionPage` which are hand-written.

### Product Pages
All 5 product pages follow an identical pattern: hero + stats strip → feature cards grid → capabilities checklist → `<TrustedBySection />` → `<InsightsSection category="..." />` → CTA. Each page uses `<ProductPageTemplate>` from `components/sections/ProductPageTemplate.tsx`.

Domain-to-category mapping for `InsightsSection`:
- GrootNeo, GrootPay, PFM, Loyalty → `category="Fintech"`
- MerchantAI → `category="AI & ML"`

### Standard Card Pattern
```tsx
<div className="rounded-3xl bg-[#EBF5FF] p-8 md:p-10">
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
    <div className="bg-white rounded-2xl p-7">
      <div className="w-1.5 h-6 rounded-full mb-5" style={{ background: ACCENT }} />
      <h3 className="text-base font-bold text-[#0A0A0A] mb-2">Title</h3>
      <p className="text-sm text-[#0A0A0A]/50 leading-relaxed">Body</p>
    </div>
  </div>
</div>
```
Use for feature grids, What We Do/How We Work, pillars, etc.

### Glass Image Cards
Two components — `GlassBlogCard` and `GlassLocationCard` — share the same frosted-glass overlay pattern:
- Full-bleed image with `absolute inset-0`
- Frosted panel at `absolute inset-x-4 bottom-4 rounded-2xl`
- `backdropFilter: blur(2px)` + `border: 1px solid rgba(255,255,255,0.6)`
- Both accept an `accentColor` prop that controls the category tag color and (for blog cards) the title hover color. Always pass `post.accentColor` — never hardcode `#0072BC` here.

### TrustedBySection
Appears on all pages **except** Contact, Careers, Insights, and Industries. Place between the features section and `InsightsSection`.

### Backend Routes
Each route file in `backend/src/routes/` is self-contained — validation, business logic, and response handling in one file. Form routes (`/api/contact`, `/api/newsletter`, `/api/careers/apply`) use `formLimiter` (10 req/hr); read routes use `apiLimiter` (100 req/15min).

### Component Styling Conventions
Custom Tailwind utility classes in `frontend/src/index.css`:
- `gradient-text` — **hero h1 only**: `linear-gradient(90deg, #0072BC 0%, #0DFFFF 100%)` clipped to text
- `section-accent` — **section h2 highlighted words only**: solid `color: #0072BC` (no gradient)
- `glass-card` — glassmorphism: `bg-white/[0.03] backdrop-blur-[16px] border border-white/[0.08]`
- `btn-primary` — rounded-full gradient button
- `btn-secondary` — rounded-full outlined button
- `btn-gradient-outline` — spinning conic-gradient border; inner `<span>` needs `background: #040404`
- `section-heading` — large bold heading (Clash Display Variable)
- `hero-heading` — extra-large hero text (Clash Display Variable)
- `glow-orb` — absolute-positioned radial glow; combine with `glow-blue` or `glow-cyan`

**Never use `.section-tag`** — considered generic/AI-looking.

Tailwind token aliases (from `tailwind.config.js`):
- `bg-brand-dark` / `bg-brand-surface` / `bg-brand-card` — `#040404` / `#111111` / `#161616`

### Third-party shader library
`@paper-design/shaders-react` `<Warp>` component (`DomainsSection`). Its `shape` prop only accepts `"checks" | "stripes" | "edge"` — any other value causes a TypeScript error.

## Branding Rules (Design System v2)
- **Primary Blue:** `#0072BC` · **Hover:** `#005a96` · **Tint (card bg):** `#EBF5FF` · **Cyan:** `#0DFFFF`
- **Black:** `#040404` · **White:** `#FAFAFA` · **Surface:** `#111111` · **Card:** `#161616`
- **Heading font:** Clash Display Variable (via Fontshare) — use `.hero-heading` and `.section-heading`
- **Body font:** Public Sans (Google Fonts)
- **NEVER use Inter, serif fonts, or lime/green accents** — brand is blue/cyan only
- Solution domain accent colours: fintech = `#0072BC`, e-gov = `#10b981`, ai-ml = `#8b5cf6`, bi-data = `#f59e0b`, it-services = `#ef4444`, staff-aug = `#ec4899`
- Pill/tag/badge selected state: border-only (`border-[#0072BC] text-[#0072BC]`), no background fill
- Submit/CTA buttons that are border-only: `border: 1.5px solid #0072BC`, `color: #0072BC`, `background: transparent`, with `hover:bg-[#0072BC] hover:text-white`

## Content Rules
- Founder credentials: co-founded eSewa (South Asia's first digital wallet, 13M users) and Fonepay (Nepal's national payment switch, 52+ banks). Reference platforms generically — **NEVER name the founders**.
- eSewa and Fonepay are founder credentials shown as "Proven Deployments," NOT Innovation Next products.
- Key fintech stats: 13M+ users, $275M+ monthly transactions, 52+ banks connected, 80%+ market share
- E-Gov stats: 7+ live government platforms, 5M+ citizens served, 10+ government agencies
- Team: 50+ engineers, average 10 years experience

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

**Fully built:** Home, Company, Contact, Careers, Insights (list + detail), all 6 Solution pages, all 5 Product pages (GrootNeo, GrootPay, PFM, Loyalty, MerchantAI)

**ComingSoon stubs:** Products index (`/products`), Industries, Use Cases, `/insights/case-studies`, Privacy, Terms, Cookies
