'use client'


import { ProductPageTemplate } from '@/components/sections/ProductPageTemplate'

const features = [
  { title: 'Transaction Categorisation', desc: 'ML-based classification across 10+ spend categories.' },
  { title: 'Spending Trend Detection', desc: 'Automated weekly and monthly pattern identification, with anomaly alerts for unusual spend.' },
  { title: 'Budget Management', desc: 'User-defined budgets with real-time breach alerts and a breach predictor.' },
  { title: 'Natural Language Summaries', desc: 'Daily, weekly, and monthly summaries in plain language.' },
  { title: 'Savings Goal Tracking', desc: 'Goal creation with progress visualisation.' },
  { title: 'Subscription & Cash-Flow Insight', desc: 'Detects recurring charges and forecasts cash position 7–30 days ahead.' },
]

const capabilities = [
  'API-first integration with any CBS',
  'Embedded SDK for iOS and Android',
  'White-label — bank branding throughout',
  'Transaction categorisation model',
  'Spending pattern model',
  'Budget breach predictor',
  'Cash-flow forecast model',
  'Natural-language generation engine',
  'Ships inside Groot Neo, or standalone',
]

const relatedProducts = [
  { name: 'Groot Neo', href: '/products/groot-neo', desc: 'Neo-banking platform' },
  { name: 'Loyalty Engine', href: '/products/loyalty', desc: 'Rewards & points' },
  { name: 'Groot Pay', href: '/products/groot-pay', desc: 'Digital wallet' },
]

export default function PfmPage() {
  return (
    <ProductPageTemplate
      title="PFM"
      description="An AI-powered financial wellness module that transforms raw transaction data into personalised financial insights — live and embedded in banking platforms."
      mockup="/pfm-mockup.png"
      mockupAlt="PFM"
      featuresSubheadline="Five models to do the sorting, spot the changes and warn you before your budget breaks."
      features={features}
      capabilitiesSubtext="Integrates through an API or an embedded SDK — no rip-and-replace required."
      capabilities={capabilities}
      relatedProducts={relatedProducts}
      insightsCategory="Fintech"
    />
  )
}
