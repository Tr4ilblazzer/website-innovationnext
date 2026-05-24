# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Full-stack corporate website for **Innovation Next** (also known as Four Symmetrons Innovation), a digital technology company HQ'd in Dubai with a hub in Kathmandu. The company operates across 6 domains: Digital Financial Services, E-Governance, AI/ML, BI & Data, IT Services, and Staff Augmentation.

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS v3 + shadcn/ui |
| State | Zustand (admin auth only — `useAdminStore`) |
| Forms | React Hook Form + Zod |
| Backend | Node.js + Express + TypeScript |
| Database | PostgreSQL via Prisma ORM |
| Email | Resend API |
| File Upload | Cloudinary |
| Deployment | Frontend: Vercel / Backend: Railway |

> **Note:** Payload CMS is referenced in SETUP.md but the `cms/` directory does not exist. The admin interface is a custom React panel built into the frontend at `/admin/*`.

## Commands

```bash
# From project root — runs both frontend (5173) and backend (3001) concurrently
npm run dev

# Install all deps across root + frontend + backend
npm run install:all

# Frontend only
cd frontend && npm run dev
cd frontend && npm run build      # tsc + vite build

# Backend only
cd backend && npm run dev         # ts-node-dev with hot reload
cd backend && npm run build       # tsc compile to dist/
cd backend && npm run start       # run compiled dist/index.js

# Database (run from project root or backend/)
npm run db:push       # sync Prisma schema → DB (use in dev instead of migrate)
npm run db:migrate    # create a named migration
npm run db:studio     # open Prisma Studio visual browser
```

## Project Structure

```
innovation-next/
├── frontend/src/
│   ├── App.tsx              Router — all routes, lazy loading, PublicLayout vs AdminLayout split
│   ├── context/
│   │   └── HeroThemeContext.tsx   isDark flag toggled by hero sections to switch Navbar style
│   ├── components/
│   │   ├── ui/              shadcn primitives + custom brand components
│   │   ├── layout/          Navbar, Footer
│   │   ├── sections/        Reusable page sections (SolutionPageTemplate, ProductPageTemplate, etc.)
│   │   └── admin/           AdminLayout, AdminRoute (JWT guard), RichTextEditor
│   ├── pages/
│   │   ├── solutions/       6 individual solution pages (lazy-loaded)
│   │   ├── products/        5 individual product pages (lazy-loaded)
│   │   └── admin/           AdminDashboard, AdminContacts, AdminInsights, AdminBlogEditor,
│   │                        AdminVacancies, AdminVacancyEditor, AdminApplications, AdminLogin
│   ├── hooks/               useScrollY, useIntersection, useMediaQuery
│   ├── data/                Mock data — fallback when backend is unreachable
│   │   ├── insights.ts      18 blog posts (3 per domain) — InsightPost type + ContentBlock union
│   │   └── vacancies.ts     4 mock job listings
│   ├── services/
│   │   ├── api.ts           Public API — typed fetch wrappers with mock fallback on error
│   │   └── adminApi.ts      Admin API — authenticated fetch wrappers (reads JWT from Zustand)
│   ├── store/
│   │   └── adminStore.ts    Zustand + persist — stores { token, admin } in localStorage 'admin-auth'
│   ├── lib/utils.ts         cn() helper (clsx + tailwind-merge)
│   └── types/index.ts       Shared TypeScript types (API/backend shapes)
├── backend/src/
│   ├── index.ts             Express app — middleware, rate limits, route mounting
│   ├── routes/              Public route files (contact, newsletter, vacancies, careers, blog, caseStudies)
│   │   └── admin/           Admin routes (auth, stats, contacts, blog, vacancies) — JWT protected
│   └── prisma/
│       └── schema.prisma    DB schema (non-standard location: backend/src/prisma/, not backend/prisma/)
└── docs/
    └── CMS_SETUP.md         Payload CMS setup guide (not yet implemented)
```

## Architecture Patterns

### Data & Service Layer — Two API Files
`services/api.ts` handles all **public** endpoints. Every function tries the real backend first and silently falls back to mock data if the API is unreachable — so the site works without a running backend:

```ts
export async function getBlogPosts(category?: string): Promise<InsightPost[]> {
  try {
    const posts = await request<BackendPost[]>(`/api/blog${qs}`)
    return posts.map(toInsightPost)   // normalises backend shape → InsightPost
  } catch {
    return category ? ALL_POSTS.filter(p => p.category === category) : ALL_POSTS
  }
}
```

`services/adminApi.ts` handles all **admin** endpoints. It reads the JWT from `localStorage` (via `useAdminStore`) and injects it as `Authorization: Bearer <token>`. No mock fallback — admin errors surface directly.

Components import from `services/api.ts` or `services/adminApi.ts`, **never** from `data/` directly.

### Admin Panel
The admin panel is a fully custom React CMS, not Payload. It lives at `/admin/*` routes and is guarded by `AdminRoute` (checks `useAdminStore().isAuthenticated()`).

- **Login:** `POST /api/admin/login` → JWT stored via `useAdminStore.setAuth(token, admin)`
- **Auth state:** Zustand with `persist` middleware — survives page refresh
- **Admin routes:** `/admin` → Dashboard, `/admin/contacts`, `/admin/insights` (blog CRUD), `/admin/vacancies`, `/admin/vacancies/:id/applications`
- **No Navbar/Footer** on admin pages — uses `AdminLayout` instead of `PublicLayout`

Backend admin endpoints all live under `/api/admin/` and require `Authorization: Bearer` header.

### Database Schema
Prisma schema at `backend/src/prisma/schema.prisma`. Models:

| Model | Table | Purpose |
|-------|-------|---------|
| `AdminUser` | `admin_users` | Admin login credentials |
| `ContactSubmission` | `contact_submissions` | Contact form entries |
| `NewsletterSubscriber` | `newsletter_subscribers` | Email subscribers |
| `Vacancy` | `vacancies` | Job listings |
| `JobApplication` | `job_applications` | CV + application data (FK → Vacancy) |
| `BlogPost` | `blog_posts` | CMS-managed blog content |
| `CaseStudy` | `case_studies` | Case study content (results stored as JSON) |

### Insights System
- **Data:** `data/insights.ts` — 18 posts, 3 per domain. Each post has `id`, `slug`, `title`, `excerpt`, `category`, `author`, `publishedAt`, `readTime`, `featured`, `image`, `accentColor`, and `body: ContentBlock[]`.
- **`ContentBlock`** is a discriminated union: `{ type: 'h2' | 'p' | 'blockquote' | 'ul', text?: string, items?: string[] }`.
- **`InsightsSection`** (used on Home, all 6 solution pages, all 5 product pages) accepts an optional `category` prop. Returns `null` if no posts match (IT Services currently has no posts).
- **`InsightDetailPage`** — reads `slug` from `useParams()`, renders `body` blocks, shows related posts from the same category, then a CTA.
- **Backend shape vs. frontend shape:** `api.ts` has a `toInsightPost()` function that normalises `BackendPost` → `InsightPost`. When the backend is live, only `api.ts` changes; pages stay untouched.

### HeroThemeContext
`HeroThemeProvider` wraps the entire app. Hero sections call `setIsDark(true/false)` to signal whether they're dark-background — the Navbar uses `isDark` to switch between light and dark logo/link styles.

### Solution Pages
Each of the 6 solution pages is in `frontend/src/pages/solutions/` and lazy-loaded in `App.tsx`. Layout: hero → features/capabilities → `<TrustedBySection />` → `<InsightsSection category="..." />` → CTA. Each page uses `<SolutionPageTemplate>` — except `FintechSolutionPage` and `StaffAugSolutionPage` which are hand-written.

### Product Pages
All 5 product pages follow an identical pattern: hero + stats strip → feature cards grid → capabilities checklist → `<TrustedBySection />` → `<InsightsSection category="..." />` → CTA. Each uses `<ProductPageTemplate>`.

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

### Glass Image Cards
`GlassBlogCard` and `GlassLocationCard` share a frosted-glass overlay pattern:
- Full-bleed image with `absolute inset-0`
- Frosted panel at `absolute inset-x-4 bottom-4 rounded-2xl`
- `backdropFilter: blur(2px)` + `border: 1px solid rgba(255,255,255,0.6)`
- Always pass `post.accentColor` — never hardcode `#0072BC` here.

### TrustedBySection
Appears on all pages **except** Contact, Careers, Insights, and Industries.

### Backend Routes
Each route file in `backend/src/routes/` is self-contained. Form routes use `formLimiter` (10 req/hr); read routes use `apiLimiter` (100 req/15min). Both limiters are **disabled in dev** (`skip: () => isDev`).

## Environment Variables

Frontend (`frontend/.env`):
```
VITE_API_URL=http://localhost:3001
```

Backend (`backend/.env`):
```
DATABASE_URL=postgresql://postgres@127.0.0.1:5432/postgres
RESEND_API_KEY=...
CLOUDINARY_URL=...
JWT_SECRET=...
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

## API Endpoints

### Public
- `POST /api/contact` — Contact form (formLimiter)
- `POST /api/newsletter` — Newsletter subscribe (formLimiter)
- `POST /api/careers/apply` — Job application, multipart, CV upload via Cloudinary (formLimiter)
- `GET /api/vacancies` — Open positions
- `GET /api/blog` — Blog posts (supports `?category=` and `?limit=` query params)
- `GET /api/blog/:slug` — Single blog post
- `GET /api/case-studies` — Case studies
- `GET /api/health` — Health check

### Admin (all require `Authorization: Bearer <token>`)
- `POST /api/admin/login` — Returns JWT
- `GET /api/admin/me` — Verify token
- `GET /api/admin/stats` — Dashboard counts
- `GET|PATCH|DELETE /api/admin/contacts/:id` — Contact management
- `GET|POST|PUT|DELETE /api/admin/blog/:id` — Blog post CRUD
- `GET|POST|PUT|DELETE|PATCH /api/admin/vacancies/:id` — Vacancy CRUD + toggle active
- `GET /api/admin/vacancies/:id/applications` — Applications for a vacancy
- `PATCH /api/admin/vacancies/applications/:id` — Update application status

## Component Styling Conventions

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

Path alias: `@/` maps to `frontend/src/` (configured in `vite.config.ts` and `tsconfig.json`).

### Third-party shader library
`@paper-design/shaders-react` `<Warp>` component (`DomainsSection`). Its `shape` prop only accepts `"checks" | "stripes" | "edge"`.

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

## Pages: Live vs. Stub

**Fully built:** Home, Company, Contact, Careers, Insights (list + detail), all 6 Solution pages, all 5 Product pages (GrootNeo, GrootPay, PFM, Loyalty, MerchantAI), Admin panel (Login, Dashboard, Contacts, Insights/Blog, Vacancies, Applications)

**ComingSoon stubs:** Products index (`/products`), Industries detail pages, Use Cases, `/insights/case-studies`, Privacy, Terms, Cookies
