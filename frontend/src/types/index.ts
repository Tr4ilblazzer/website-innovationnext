// ── API Response Types ──────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// ── Contact Form ────────────────────────────────────────────────

export interface ContactFormData {
  name: string
  email: string
  company?: string
  phone?: string
  subject: string
  message: string
  interest?: SolutionDomain
}

// ── Newsletter ──────────────────────────────────────────────────

export interface NewsletterFormData {
  email: string
  name?: string
}

// ── Career / Vacancy ────────────────────────────────────────────

export interface Vacancy {
  id: string
  title: string
  department: string
  location: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote'
  level: 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Manager'
  description: string
  requirements: string[]
  niceToHave?: string[]
  postedAt: string
  closingDate?: string
  salary?: string
  active: boolean
}

export interface JobApplicationData {
  vacancyId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  currentRole?: string
  experience: string
  coverLetter?: string
  cvFile: File
  portfolioUrl?: string
  linkedinUrl?: string
}

// ── Blog ────────────────────────────────────────────────────────

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: BlogCategory
  tags: string[]
  author: Author
  featuredImage?: string
  publishedAt: string
  updatedAt: string
  readTime: number
  featured: boolean
}

export interface Author {
  name: string
  role: string
  avatar?: string
}

export type BlogCategory =
  | 'Fintech'
  | 'E-Governance'
  | 'AI & ML'
  | 'BI & Data'
  | 'IT Services'
  | 'Staff Augmentation'
  | 'Company News'
  | 'Industry Insights'

// ── Case Studies ────────────────────────────────────────────────

export interface CaseStudy {
  id: string
  title: string
  slug: string
  client: string
  industry: Industry
  domain: SolutionDomain
  challenge: string
  solution: string
  results: CaseStudyResult[]
  technologies: string[]
  duration?: string
  featuredImage?: string
  publishedAt: string
  featured: boolean
}

export interface CaseStudyResult {
  metric: string
  value: string
  description?: string
}

// ── Domains ─────────────────────────────────────────────────────

export type SolutionDomain =
  | 'Digital Financial Services'
  | 'E-Governance'
  | 'AI & Machine Learning'
  | 'BI & Data Solutions'
  | 'IT Services'
  | 'Staff Augmentation'

export type Industry =
  | 'Banking'
  | 'Government'
  | 'Telecoms & MFIs'
  | 'Enterprise'
  | 'Fintech & Startups'

// ── Navigation ──────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
  description?: string
  icon?: string
}

// ── Product ─────────────────────────────────────────────────────

export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  domain: SolutionDomain
  icon: string
  features: ProductFeature[]
  useCases: string[]
  href: string
}

export interface ProductFeature {
  title: string
  description: string
  icon?: string
}

// ── Stats ───────────────────────────────────────────────────────

export interface StatItem {
  value: string
  label: string
  suffix?: string
}
