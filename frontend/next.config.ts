import type { NextConfig } from 'next'

const permanent = (source: string, destination: string) => ({ source, destination, permanent: true })

const nextConfig: NextConfig = {
  // The repo root has its own lockfile; pin Turbopack to this app
  turbopack: { root: process.cwd() },
  async redirects() {
    return [
      permanent('/solutions', '/solutions/ai-ml'),
      permanent('/solutions/fintech', '/industries/digital-financial-services'),
      permanent('/solutions/egovernance', '/industries/e-governance'),
      permanent('/solutions/it-services', '/solutions/bespoke-software'),
      permanent('/solutions/staff-augmentation', '/solutions/managed-services'),
      permanent('/products/merchant-ai', '/products/onboarding'),
    ]
  },
}

export default nextConfig
