import type { Metadata } from 'next'

export const SITE_NAME = 'Innovation Next'
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://innovationnext.com').replace(/\/$/, '')
export const DEFAULT_OG_IMAGE = '/team-photo.png'

interface PageMetaOptions {
  title: string
  description: string
  path: string
  image?: string
  noindex?: boolean
  type?: 'website' | 'article'
}

/** Per-page metadata: title, description, canonical, Open Graph and Twitter card. */
export function pageMeta({ title, description, path, image = DEFAULT_OG_IMAGE, noindex, type = 'website' }: PageMetaOptions): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: SITE_NAME, type, images: [{ url: image }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  }
}
