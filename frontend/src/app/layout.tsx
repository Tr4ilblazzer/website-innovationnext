import type { Metadata, Viewport } from 'next'
import { Providers } from './providers'
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from '@/lib/seo'
import './globals.css'

const DESCRIPTION =
  'Innovation Next is a digital technology company building digital financial services, e-governance, AI/ML, BI & data platforms and bespoke software. Headquartered in Kathmandu, Nepal.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — Digital Technology Company`, template: `%s | ${SITE_NAME}` },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  icons: { icon: '/logo-icon.png' },
  openGraph: {
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
    title: `${SITE_NAME} — Digital Technology Company`,
    description: DESCRIPTION,
    images: [{ url: DEFAULT_OG_IMAGE }],
  },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Public+Sans:wght@400;500&display=swap"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
