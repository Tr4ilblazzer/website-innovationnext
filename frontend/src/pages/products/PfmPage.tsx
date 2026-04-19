import { ProductPageTemplate } from '@/components/sections/ProductPageTemplate'

export default function PfmPage() {
  return (
    <ProductPageTemplate
      name="PFM"
      tag="Personal Finance Manager"
      tagline="Give your users financial clarity — not just transaction history."
      icon="📈"
      accentColor="#10b981"
      description="PFM is an AI-powered personal finance management layer that plugs into any digital banking or wallet platform. It transforms raw transaction data into actionable financial insight — spend analytics, budget tracking, savings goals, and personalised recommendations — all without users needing to do the heavy lifting."
      metrics={[
        { value: 'Real-time', label: 'Transaction categorisation' },
        { value: 'AI-driven', label: 'Personalised recommendations' },
        { value: 'Plug-in', label: 'Works with any core banking system' },
        { value: '85%+', label: 'Categorisation accuracy (production)' },
      ]}
      features={[
        { title: 'Spend Analytics', description: 'Automatic transaction categorisation across 40+ spend categories — with monthly trends, merchant-level breakdown, and peer benchmarking.' },
        { title: 'Budget Tracking', description: 'User-defined and AI-suggested budgets per category — with real-time progress, alerts, and overspend notifications.' },
        { title: 'Savings Goals', description: 'Goal-based savings with automated round-ups, recurring transfers, and milestone notifications to keep users on track.' },
        { title: 'Financial Health Score', description: 'Holistic financial health scoring model — combining spending behaviour, savings rate, bill payment consistency, and debt load.' },
        { title: 'AI Recommendations', description: 'Contextual, in-app financial nudges — identify subscriptions to cancel, bills to optimise, and savings opportunities based on actual behaviour.' },
        { title: 'Net Worth Dashboard', description: 'Consolidated view of assets and liabilities — accounts, loans, and investment balances — updated in real time.' },
      ]}
      useCases={[
        'Digital banks wanting to increase engagement and app stickiness',
        'Wallet platforms competing with superapp financial features',
        'Banks launching Gen-Z or millennial-focused financial wellness products',
        'MFIs helping customers manage irregular income and spending',
        'Enterprise financial wellness programs for employees',
      ]}
      techSpecs={[
        'White-label SDK — embed into any app',
        'REST API integration with any core banking',
        'ML categorisation model — fine-tuned per market',
        'Real-time event-driven architecture',
        'GDPR / data privacy compliant data handling',
        'Multi-currency and multi-account support',
        'Configurable category taxonomy',
        'React Native UI kit included',
      ]}
      relatedProducts={[
        { name: 'Groot Neo', href: '/products/groot-neo', desc: 'Neo-banking platform' },
        { name: 'Loyalty Engine', href: '/products/loyalty', desc: 'Rewards & points' },
        { name: 'Groot Pay', href: '/products/groot-pay', desc: 'Digital wallet' },
      ]}
    />
  )
}
