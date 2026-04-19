# CMS Setup — Payload CMS

## Why Payload CMS

Payload is the recommended CMS for this project because:
- **Open-source & self-hosted** — no vendor lock-in, no monthly CMS fees
- **TypeScript-native** — matches the project stack exactly
- **Auto-generates REST + GraphQL API** — frontend consumes data without extra build
- **Admin UI included** — your team uploads blogs, vacancies, and case studies immediately
- **PostgreSQL support** — uses the same DB as the backend (or a separate DB)

---

## Setup (10 minutes)

```bash
# From the project root
mkdir cms && cd cms
npx create-payload-app@latest .
# When prompted:
#   Template: blank
#   Database: PostgreSQL
#   TypeScript: yes
```

---

## Collections to create in Payload

Create these four collections in `cms/src/collections/`:

### 1. BlogPosts.ts
```ts
import { CollectionConfig } from 'payload/types'

const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'content', type: 'richText', required: true },
    { name: 'category', type: 'select', options: [
      'Fintech', 'E-Governance', 'AI & ML', 'BI & Data',
      'IT Services', 'Staff Augmentation', 'Company News', 'Industry Insights'
    ]},
    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text' }] },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'authorName', type: 'text', required: true },
    { name: 'authorRole', type: 'text' },
    { name: 'readTime', type: 'number', defaultValue: 5 },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'published', type: 'checkbox', defaultValue: false },
    { name: 'publishedAt', type: 'date' },
  ],
}
export default BlogPosts
```

### 2. CaseStudies.ts
```ts
import { CollectionConfig } from 'payload/types'

const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'client', type: 'text', required: true },
    { name: 'industry', type: 'select', options: [
      'Banking', 'Government', 'Telecoms & MFIs', 'Enterprise', 'Fintech & Startups'
    ]},
    { name: 'domain', type: 'select', options: [
      'Digital Financial Services', 'E-Governance', 'AI & Machine Learning',
      'BI & Data Solutions', 'IT Services', 'Staff Augmentation'
    ]},
    { name: 'challenge', type: 'textarea', required: true },
    { name: 'solution', type: 'richText', required: true },
    { name: 'results', type: 'array', fields: [
      { name: 'metric', type: 'text' },
      { name: 'value', type: 'text' },
      { name: 'description', type: 'text' },
    ]},
    { name: 'technologies', type: 'array', fields: [{ name: 'tech', type: 'text' }] },
    { name: 'duration', type: 'text' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'published', type: 'checkbox', defaultValue: false },
    { name: 'publishedAt', type: 'date' },
  ],
}
export default CaseStudies
```

### 3. Vacancies.ts
```ts
import { CollectionConfig } from 'payload/types'

const Vacancies: CollectionConfig = {
  slug: 'vacancies',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'department', type: 'text', required: true },
    { name: 'location', type: 'text', required: true },
    { name: 'type', type: 'select', options: ['Full-time', 'Part-time', 'Contract', 'Remote'] },
    { name: 'level', type: 'select', options: ['Junior', 'Mid', 'Senior', 'Lead', 'Manager'] },
    { name: 'description', type: 'richText', required: true },
    { name: 'requirements', type: 'array', fields: [{ name: 'requirement', type: 'text' }] },
    { name: 'niceToHave', type: 'array', fields: [{ name: 'item', type: 'text' }] },
    { name: 'salary', type: 'text' },
    { name: 'closingDate', type: 'date' },
    { name: 'active', type: 'checkbox', defaultValue: true },
  ],
}
export default Vacancies
```

### 4. NewsletterSubscribers.ts (view-only for admin)
```ts
import { CollectionConfig } from 'payload/types'

const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  admin: { useAsTitle: 'email' },
  access: { create: () => false, read: ({ req: { user } }) => !!user },
  fields: [
    { name: 'email', type: 'email', required: true },
    { name: 'name', type: 'text' },
    { name: 'active', type: 'checkbox', defaultValue: true },
    { name: 'subscribedAt', type: 'date' },
  ],
}
export default NewsletterSubscribers
```

---

## CMS Environment
```bash
# cms/.env
DATABASE_URI=postgresql://USER:PASSWORD@HOST:5432/innovation_next_cms
PAYLOAD_SECRET=change_this_long_random_string
PORT=3000
```

---

## Running CMS
```bash
cd cms && npm run dev   # Admin at http://localhost:3000/admin
```

---

## Connecting Frontend to CMS

Option A — **Direct Payload API** (simplest):
The frontend calls Payload's REST API directly:
```
GET http://localhost:3000/api/blog-posts?where[published][equals]=true
```

Option B — **Route through Express backend** (recommended for production):
The Express backend proxies CMS data, adds caching, and is the single origin for the frontend.
The blog and case-study routes already exist in `backend/src/routes/blog.ts` and `caseStudies.ts`.
When using Payload, update those routes to fetch from Payload's API instead of Prisma directly.

---

## Alternative CMS options

| CMS | Pros | Cons |
|-----|------|------|
| **Payload** ✅ recommended | TypeScript, self-hosted, free, great DX | Newer, smaller community |
| **Directus** | Very mature, open-source, no-code | Less TypeScript-native |
| **Strapi** | Most popular open-source | Config-heavy, slower |
| **Sanity** | Best editor UX | SaaS pricing, not self-hosted |
| **Contentful** | Enterprise-grade | Expensive at scale |
