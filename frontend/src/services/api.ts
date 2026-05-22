/// <reference types="vite/client" />
import type {
  ApiResponse,
  BlogPost,
  CaseStudy,
  ContactFormData,
  JobApplicationData,
  NewsletterFormData,
  Vacancy,
} from '@/types'
import { ALL_POSTS } from '@/data/insights'
import { MOCK_VACANCIES } from '@/data/vacancies'

const BASE_URL = (import.meta as { env: { VITE_API_URL?: string } }).env.VITE_API_URL ?? 'http://localhost:3001'

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

export async function getBlogPosts(category?: string): Promise<BlogPost[]> {
  // TODO: replace with → return request<BlogPost[]>(`/api/blog${category ? `?category=${category}` : ''}`)
  const posts = category
    ? ALL_POSTS.filter(p => p.category === category)
    : ALL_POSTS
  return posts as unknown as BlogPost[]
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  // TODO: replace with → return request<BlogPost>(`/api/blog/${slug}`)
  const post = ALL_POSTS.find(p => p.slug === slug)
  if (!post) throw new Error('Post not found')
  return post as unknown as BlogPost
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
  // TODO: replace with → return request<Vacancy[]>('/api/vacancies')
  return MOCK_VACANCIES
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
