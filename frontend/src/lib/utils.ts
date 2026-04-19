import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ── Class merger ─────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ── API Base URL ─────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL || '/api'

// ── Generic fetch wrapper ─────────────────────────────────────────
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'Request failed')
  return json
}

// ── API Calls ─────────────────────────────────────────────────────

export const api = {
  // Contact
  submitContact: (data: Record<string, unknown>) =>
    apiFetch('/contact', { method: 'POST', body: JSON.stringify(data) }),

  // Newsletter
  subscribeNewsletter: (data: Record<string, unknown>) =>
    apiFetch('/newsletter', { method: 'POST', body: JSON.stringify(data) }),

  // Vacancies
  getVacancies: () => apiFetch('/vacancies'),
  getVacancy: (id: string) => apiFetch(`/vacancies/${id}`),

  // Job Applications (multipart)
  submitApplication: (formData: FormData) =>
    fetch(`${API_BASE}/careers/apply`, { method: 'POST', body: formData })
      .then(r => r.json()),

  // Blog
  getPosts: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : ''
    return apiFetch(`/blog${q}`)
  },
  getPost: (slug: string) => apiFetch(`/blog/${slug}`),

  // Case Studies
  getCaseStudies: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : ''
    return apiFetch(`/case-studies${q}`)
  },
  getCaseStudy: (slug: string) => apiFetch(`/case-studies/${slug}`),
}

// ── Format helpers ────────────────────────────────────────────────

export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric', month: 'long', day: 'numeric',
  }).format(new Date(dateStr))
}

export function truncate(str: string, n: number): string {
  return str.length > n ? str.substring(0, n - 1) + '…' : str
}
