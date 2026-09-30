import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'
import { getBlogPosts } from '@/services/api'

export const revalidate = 3600

const STATIC_ROUTES = [
  '', '/company', '/contact', '/careers', '/insights', '/industries',
  '/industries/digital-financial-services', '/industries/e-governance',
  '/solutions/ai-ml', '/solutions/bi-data', '/solutions/consulting',
  '/solutions/bespoke-software', '/solutions/managed-services',
  '/products/groot-neo', '/products/groot-pay', '/products/pfm',
  '/products/loyalty', '/products/onboarding',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts()
  return [
    ...STATIC_ROUTES.map(path => ({ url: `${SITE_URL}${path}`, changeFrequency: 'monthly' as const, priority: path === '' ? 1 : 0.7 })),
    ...posts.map(p => ({ url: `${SITE_URL}/insights/${p.slug}`, lastModified: p.publishedAt, changeFrequency: 'monthly' as const, priority: 0.6 })),
  ]
}
