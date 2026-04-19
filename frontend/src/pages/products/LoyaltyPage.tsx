import { ProductPageTemplate } from '@/components/sections/ProductPageTemplate'

export default function LoyaltyPage() {
  return (
    <ProductPageTemplate
      name="Loyalty Engine"
      tag="Points & Rewards Platform"
      tagline="Turn transactions into relationships — at scale."
      icon="🎯"
      accentColor="#f59e0b"
      description="The Loyalty Engine is a production-grade points, cashback, and rewards platform built for digital wallets, banks, and merchant networks. It handles real-time issuance, partner merchant management, AI-driven offer targeting, and a full consumer redemption experience — all through one integration."
      metrics={[
        { value: 'Real-time', label: 'Points issuance at transaction' },
        { value: 'AI-driven', label: 'Offer personalisation engine' },
        { value: '3M+', label: 'Merchants on underlying network' },
        { value: 'Multi-scheme', label: 'Points + cashback + vouchers' },
      ]}
      features={[
        { title: 'Real-Time Points Issuance', description: 'Points awarded at the moment of transaction — no batch jobs, no delays. Triggers via payment webhook with configurable earn rules per MCC, merchant, or campaign.' },
        { title: 'Cashback & Vouchers', description: 'Flexible reward types — percentage cashback, fixed cashback, voucher codes, and gift cards — managed through a central campaign console.' },
        { title: 'Partner Merchant Network', description: 'Manage a network of loyalty-enabled merchants with tiered earn rates, geo-targeted offers, and merchant-funded campaigns.' },
        { title: 'AI Offer Engine', description: 'Behavioural targeting that surfaces the right offer to the right user at the right moment — based on spend history, location, and predicted intent.' },
        { title: 'Redemption & Catalogue', description: 'Full consumer-facing redemption experience — travel, merchandise, bill pay, charity, and cash-out options — with real-time balance and history.' },
        { title: 'Programme Analytics', description: 'Campaign performance dashboard — earn/burn rates, user engagement cohorts, merchant ROI, and liability reporting for finance teams.' },
      ]}
      useCases={[
        'Digital wallets adding a loyalty layer to drive retention',
        'Banks launching a co-brand loyalty programme with merchant partners',
        'Telecoms rewarding data usage, top-up, and roaming',
        'Retailers deploying a white-label coalition loyalty programme',
        'Government platforms rewarding citizen digital service adoption',
      ]}
      techSpecs={[
        'Event-driven real-time issuance (Kafka)',
        'REST APIs for wallet and POS integration',
        'Configurable earn rule engine (no-code)',
        'Campaign management console (web UI)',
        'React Native consumer loyalty SDK',
        'Multi-currency points ledger',
        'Merchant portal (self-serve)',
        'Liability reporting and expiry management',
        'A/B testing for offer campaigns',
      ]}
      relatedProducts={[
        { name: 'Groot Pay', href: '/products/groot-pay', desc: 'Digital wallet platform' },
        { name: 'Merchant AI', href: '/products/merchant-ai', desc: 'AI-powered merchant tools' },
        { name: 'PFM', href: '/products/pfm', desc: 'Personal finance manager' },
      ]}
    />
  )
}
