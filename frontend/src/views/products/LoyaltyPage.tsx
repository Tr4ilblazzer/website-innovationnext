'use client'


import { ProductPageTemplate } from '@/components/sections/ProductPageTemplate'

const stats = [
  { value: 'Live', label: 'In production' },
  { value: '8', label: 'Reward and engagement features' },
  { value: 'No code', label: 'Rules and tiers set in the admin console' },
  { value: 'Cloud / on-prem', label: 'Deployment options' },
]

const features = [
  { title: 'Points Accumulation', desc: 'Transaction-based, category-based, and merchant-specific earn rules.' },
  { title: 'Tier Management', desc: 'Fully configurable tiers — Bronze, Silver, Gold, Platinum, or your own.' },
  { title: 'Reward Redemption', desc: 'Cashback, vouchers, airtime, merchant offers, and donations.' },
  { title: 'Campaign Engine', desc: 'Time-based, segment-based, and event-triggered promotions.' },
  { title: 'Partner Merchant Integration', desc: 'An open API for merchant and partner network integration.' },
  { title: 'Analytics & Gamification', desc: 'Real-time programme performance and earn/burn ratio, plus configurable challenges, streaks, and badges.' },
]

const capabilities = [
  'RESTful API — works with any wallet, bank, or POS',
  'Rules and tiers configured without code changes',
  'Points in any unit — points, miles, cashback %',
  'Push, SMS, and email earn and redeem alerts',
  'White-label — fully brandable',
  'Cloud (SaaS) or on-premise',
  'Integrates at wallet checkout with Groot Pay',
]

const relatedProducts = [
  { name: 'Groot Pay', href: '/products/groot-pay', desc: 'Digital wallet platform' },
  { name: 'Onboarding Platform', href: '/products/onboarding', desc: 'KYC, KYB, and Video KYC' },
  { name: 'PFM', href: '/products/pfm', desc: 'Personal finance manager' },
]

export default function LoyaltyPage() {
  return (
    <ProductPageTemplate
      tag="Points & Rewards Platform"
      headline="Turn transactions"
      headlineAccent="into relationships."
      quote="Configurable loyalty and rewards for banks, wallets, and merchant networks."
      description="A configurable, API-first loyalty and rewards platform — points accumulation, tier management, campaign execution, and redemption across channels."
      mockup="/loyalty-mockup.png"
      mockupAlt="Loyalty Engine"
      stats={stats}
      featuresSubheadline="Everything is configured through an admin console, not code changes."
      features={features}
      capabilitiesSubtext="Deploys as SaaS or on-premise, and plugs into any wallet, banking, or POS system."
      capabilities={capabilities}
      relatedProducts={relatedProducts}
      insightsCategory="Fintech"
    />
  )
}
