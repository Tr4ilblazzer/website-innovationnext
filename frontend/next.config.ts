import type { NextConfig } from 'next'

const permanent = (source: string, destination: string) => ({ source, destination, permanent: true })

const nextConfig: NextConfig = {
  output: 'standalone',
  images: { remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }] },
  // The repo root has its own lockfile; pin Turbopack to this app
  turbopack: { root: process.cwd() },
  async redirects() {
    return [
      permanent('/solutions', '/solutions/digital-financial-services'),
      permanent('/products', '/products/groot-neo'),
      permanent('/solutions/fintech', '/solutions/digital-financial-services'),
      permanent('/industries/digital-financial-services', '/solutions/digital-financial-services'),
      permanent('/solutions/egovernance', '/solutions/e-governance'),
      permanent('/industries/e-governance', '/solutions/e-governance'),
      permanent('/solutions/it-services', '/solutions/bespoke-software'),
      permanent('/solutions/staff-augmentation', '/solutions/managed-services'),
      permanent('/products/merchant-ai', '/products/onboarding'),
    ]
  },
}

export default nextConfig
