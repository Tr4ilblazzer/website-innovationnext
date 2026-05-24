/// <reference types="vite/client" />
import type {
  ApiResponse,
  CaseStudy,
  ContactFormData,
  JobApplicationData,
  NewsletterFormData,
  Vacancy,
} from '@/types'
import { ALL_POSTS, type InsightPost } from '@/data/insights'
import { MOCK_VACANCIES } from '@/data/vacancies'

// ── Backend blog shape (public API) ─────────────────────────────────────────

interface BackendPost {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  authorName: string
  featuredImage: string | null
  publishedAt: string | null
  readTime: number
  featured: boolean
  content?: string   // only present on the detail endpoint
}

const CATEGORY_ACCENT: Record<string, string> = {
  'Fintech':            '#0072BC',
  'E-Governance':       '#10b981',
  'AI & ML':            '#8b5cf6',
  'BI & Data':          '#f59e0b',
  'IT Services':        '#ef4444',
  'Staff Augmentation': '#ec4899',
}
const DEFAULT_ACCENT = '#0072BC'
const DEFAULT_IMAGE  = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80'

function toInsightPost(p: BackendPost): InsightPost {
  return {
    id:          p.id,
    slug:        p.slug,
    title:       p.title,
    excerpt:     p.excerpt,
    category:    p.category,
    author:      { name: p.authorName },
    publishedAt: p.publishedAt
      ? new Date(p.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      : '',
    readTime:    `${p.readTime} min read`,
    featured:    p.featured,
    image:       p.featuredImage || DEFAULT_IMAGE,
    accentColor: CATEGORY_ACCENT[p.category] ?? DEFAULT_ACCENT,
    body:        [],
    content:     p.content,
  }
}

const BASE_URL = (import.meta as { env: { VITE_API_URL?: string } }).env.VITE_API_URL ?? ''

// ── Core fetch wrapper ───────────────────────────────────────────────────────

async function request<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body?.error ?? `Request failed: ${res.status}`)
  }
  const json: ApiResponse<T> = await res.json()
  if (!json.success || json.data === undefined) throw new Error(json.error ?? 'Unknown error')
  return json.data
}

// ── Blog / Insights ──────────────────────────────────────────────────────────

export async function getBlogPosts(category?: string): Promise<InsightPost[]> {
  try {
    const qs = category
      ? `?category=${encodeURIComponent(category)}&limit=50`
      : '?limit=50'
    // request() unwraps { success: true, data: T } → returns T directly
    const posts = await request<BackendPost[]>(`/api/blog${qs}`)
    return posts.map(toInsightPost)
  } catch {
    // Fallback to mock data if API is unreachable
    return category ? ALL_POSTS.filter(p => p.category === category) : ALL_POSTS
  }
}

export async function getBlogPost(slug: string): Promise<InsightPost> {
  try {
    const post = await request<BackendPost>(`/api/blog/${slug}`)
    return toInsightPost(post)
  } catch {
    // Fallback to mock data
    const post = ALL_POSTS.find(p => p.slug === slug)
    if (!post) throw new Error('Post not found')
    return post
  }
}

// ── Case Studies ─────────────────────────────────────────────────────────────

export async function getCaseStudies(): Promise<CaseStudy[]> {
  // TODO: replace with → return request<CaseStudy[]>('/api/case-studies')
  return []
}

export async function getCaseStudy(slug: string): Promise<CaseStudy> {
  return request<CaseStudy>(`/api/case-studies/${slug}`)
}

// ── Vacancies ────────────────────────────────────────────────────────────────

export async function getVacancies(): Promise<Vacancy[]> {
  try {
    const data = await request<Array<Vacancy & { createdAt: string }>>('/api/vacancies')
    // backend returns createdAt, frontend type uses postedAt — normalise here
    return data.map(v => ({ ...v, postedAt: v.postedAt ?? v.createdAt }))
  } catch {
    return MOCK_VACANCIES
  }
}

// ── Forms (POST) ─────────────────────────────────────────────────────────────

export async function submitContact(data: ContactFormData): Promise<void> {
  await request<void>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function submitNewsletter(data: NewsletterFormData): Promise<void> {
  await request<void>('/api/newsletter', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function submitJobApplication(data: JobApplicationData): Promise<void> {
  const form = new FormData()
  Object.entries(data).forEach(([key, val]) => {
    if (val !== undefined) form.append(key, val instanceof File ? val : String(val))
  })
  const res = await fetch(`${BASE_URL}/api/careers/apply`, { method: 'POST', body: form })
  if (!res.ok) throw new Error('Application submission failed')
}
