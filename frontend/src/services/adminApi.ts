const BASE = (import.meta.env.VITE_API_URL as string) ?? ''

function getToken(): string | null {
  try {
    const raw = localStorage.getItem('admin-auth')
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed?.state?.token ?? null
  } catch {
    return null
  }
}

function authHeaders(): Record<string, string> {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...(options.headers as Record<string, string> || {}),
    },
  })
  const body = await res.json().catch(() => ({ error: `HTTP ${res.status}` }))
  if (!res.ok) {
    // Unpack Zod field errors so the editor shows exactly which fields are wrong
    const fieldErrors = body.details?.fieldErrors as Record<string, string[]> | undefined
    if (fieldErrors) {
      const detail = Object.entries(fieldErrors)
        .map(([field, msgs]) => `${field}: ${msgs.join(', ')}`)
        .join(' · ')
      throw new Error(`${body.error} — ${detail}`)
    }
    throw new Error(body.error || `HTTP ${res.status}`)
  }
  return body as T
}

// ── Types ─────────────────────────────────────────────────────────

export interface AdminStats {
  contacts: { new: number; read: number; replied: number; total: number }
  posts: { published: number; draft: number; total: number }
  vacancies: { active: number; inactive: number; total: number }
  newsletter: { subscribers: number }
  applications: { total: number }
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  company?: string
  phone?: string
  subject: string
  message: string
  interest?: string
  status: 'new' | 'read' | 'replied'
  createdAt: string
  updatedAt: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  authorName: string
  authorRole?: string
  featuredImage?: string
  published: boolean
  featured: boolean
  readTime: number
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export interface Vacancy {
  id: string
  title: string
  department: string
  location: string
  type: string
  level: string
  description: string
  requirements: string[]
  niceToHave: string[]
  salary?: string
  closingDate?: string
  active: boolean
  createdAt: string
  updatedAt: string
  _count?: { applications: number }
}

// ── Auth ──────────────────────────────────────────────────────────

export const adminLogin = (email: string, password: string) =>
  request<{ success: boolean; token: string; admin: { id: string; name: string; email: string } }>(
    '/api/admin/login',
    { method: 'POST', body: JSON.stringify({ email, password }) }
  )

export const adminMe = () =>
  request<{ success: boolean; admin: { id: string; name: string; email: string } }>('/api/admin/me')

// ── Stats ─────────────────────────────────────────────────────────

export const getAdminStats = () =>
  request<{ success: boolean; data: AdminStats }>('/api/admin/stats')

// ── Contacts ──────────────────────────────────────────────────────

export const getContacts = (status?: string, page = 1) =>
  request<{ success: boolean; data: ContactSubmission[]; meta: { total: number; pages: number } }>(
    `/api/admin/contacts?page=${page}${status ? `&status=${status}` : ''}`
  )

export const getContact = (id: string) =>
  request<{ success: boolean; data: ContactSubmission }>(`/api/admin/contacts/${id}`)

export const updateContactStatus = (id: string, status: string) =>
  request<{ success: boolean; data: ContactSubmission }>(`/api/admin/contacts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })

export const deleteContact = (id: string) =>
  request<{ success: boolean }>(`/api/admin/contacts/${id}`, { method: 'DELETE' })

// ── Blog ──────────────────────────────────────────────────────────

export const getAdminPosts = () =>
  request<{ success: boolean; data: BlogPost[] }>('/api/admin/blog')

export const getAdminPost = (id: string) =>
  request<{ success: boolean; data: BlogPost }>(`/api/admin/blog/${id}`)

export const createPost = (data: Partial<BlogPost>) =>
  request<{ success: boolean; data: BlogPost }>('/api/admin/blog', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const updatePost = (id: string, data: Partial<BlogPost>) =>
  request<{ success: boolean; data: BlogPost }>(`/api/admin/blog/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })

export const deletePost = (id: string) =>
  request<{ success: boolean }>(`/api/admin/blog/${id}`, { method: 'DELETE' })

// ── Vacancies ─────────────────────────────────────────────────────

export const getAdminVacancies = () =>
  request<{ success: boolean; data: Vacancy[] }>('/api/admin/vacancies')

export const getAdminVacancy = (id: string) =>
  request<{ success: boolean; data: Vacancy }>(`/api/admin/vacancies/${id}`)

export const createVacancy = (data: Partial<Vacancy>) =>
  request<{ success: boolean; data: Vacancy }>('/api/admin/vacancies', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const updateVacancy = (id: string, data: Partial<Vacancy>) =>
  request<{ success: boolean; data: Vacancy }>(`/api/admin/vacancies/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })

export const toggleVacancy = (id: string) =>
  request<{ success: boolean; data: Vacancy }>(`/api/admin/vacancies/${id}/toggle`, {
    method: 'PATCH',
  })

export const deleteVacancy = (id: string) =>
  request<{ success: boolean }>(`/api/admin/vacancies/${id}`, { method: 'DELETE' })

// ── Applications ──────────────────────────────────────────────────────────────

export interface JobApplication {
  id: string
  vacancyId: string
  vacancy?: { title: string }
  firstName: string
  lastName: string
  email: string
  phone: string
  currentRole?: string
  experience: string
  coverLetter?: string
  cvUrl: string
  portfolioUrl?: string
  linkedinUrl?: string
  status: 'new' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired'
  createdAt: string
  updatedAt: string
}

export const getApplications = (vacancyId: string) =>
  request<{ success: boolean; data: JobApplication[] }>(
    `/api/admin/vacancies/${vacancyId}/applications`
  )

export const updateApplicationStatus = (appId: string, status: JobApplication['status']) =>
  request<{ success: boolean; data: JobApplication }>(
    `/api/admin/vacancies/applications/${appId}`,
    { method: 'PATCH', body: JSON.stringify({ status }) }
  )
