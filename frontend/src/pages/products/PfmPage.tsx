import { ProductPageTemplate } from '@/components/sections/ProductPageTemplate'

const stats = [
  { value: 'Real-time', label: 'Transaction categorisation' },
  { value: '85%+', label: 'Categorisation accuracy in production' },
  { value: 'AI-driven', label: 'Personalised recommendations' },
  { value: 'Plug-in', label: 'Works with any core banking system' },
]

const features = [
  { title: 'Spend Analytics', desc: 'Automatic transaction categorisation across 40+ spend categories — with monthly trends, merchant-level breakdown, and peer benchmarking.' },
  { title: 'Budget Tracking', desc: 'User-defined and AI-suggested budgets per category — with real-time progress, alerts, and overspend notifications.' },
  { title: 'Savings Goals', desc: 'Goal-based savings with automated round-ups, recurring transfers, and milestone notifications to keep users on track.' },
  { title: 'Financial Health Score', desc: 'Holistic scoring model combining spending behaviour, savings rate, bill payment consistency, and debt load.' },
  { title: 'AI Recommendations', desc: 'Contextual in-app financial nudges — identify subscriptions to cancel, bills to optimise, and savings opportunities based on actual behaviour.' },
  { title: 'Net Worth Dashboard', desc: 'Consolidated view of assets and liabilities — accounts, loans, and investment balances — updated in real time.' },
]

const capabilities = [
  'White-label SDK — embed into any app',
  'REST API integration with any core banking',
  'ML categorisation model — fine-tuned per market',
  'Real-time event-driven architecture',
  'GDPR / data privacy compliant',
  'Multi-currency and multi-account support',
  'Configurable category taxonomy',
  'React Native UI kit included',
  '40+ spend categories out of the box',
  'Peer benchmarking engine',
]

const relatedProducts = [
  { name: 'Groot Neo', href: '/products/groot-neo', desc: 'Neo-banking platform' },
  { name: 'Loyalty Engine', href: '/products/loyalty', desc: 'Rewards & points' },
  { name: 'Groot Pay', href: '/products/groot-pay', desc: 'Digital wallet' },
]

export default function PfmPage() {
  return (
    <ProductPageTemplate
      tag="Personal Finance Manager"
      headline="Financial clarity,"
      headlineAccent="not just history."
      quote="Give your users the financial intelligence they actually need — not just a list of transactions."
      description="PFM is an AI-powered personal finance layer that plugs into any digital banking or wallet platform. It transforms raw transaction data into spend analytics, budgets, savings goals, and personalised recommendations — without users needing to do the heavy lifting."
      mockup="/pfm-mockup.png"
      mockupAlt="PFM"
      stats={stats}
      featuresSubheadline="Every feature is designed to increase engagement and lifetime value for digital banking customers."
      features={features}
      capabilitiesSubtext="Plug into any core banking system via REST API — no rip-and-replace required."
      capabilities={capabilities}
      relatedProducts={relatedProducts}
      ctaHeadline="Ready to deploy PFM?"
      insightsCategory="Fintech"
    />
  )
}
