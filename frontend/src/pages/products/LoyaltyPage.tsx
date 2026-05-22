import { ProductPageTemplate } from '@/components/sections/ProductPageTemplate'

const stats = [
  { value: 'Real-time', label: 'Points issuance at transaction' },
  { value: '3M+', label: 'Merchants on underlying network' },
  { value: 'AI-driven', label: 'Offer personalisation engine' },
  { value: 'Multi-scheme', label: 'Points + cashback + vouchers' },
]

const features = [
  { title: 'Real-Time Points Issuance', desc: 'Points awarded at the moment of transaction — no batch jobs, no delays. Configurable earn rules per MCC, merchant, or campaign.' },
  { title: 'Cashback & Vouchers', desc: 'Flexible reward types — percentage cashback, fixed cashback, voucher codes, and gift cards — managed through a central campaign console.' },
  { title: 'Partner Merchant Network', desc: 'Manage a network of loyalty-enabled merchants with tiered earn rates, geo-targeted offers, and merchant-funded campaigns.' },
  { title: 'AI Offer Engine', desc: 'Behavioural targeting that surfaces the right offer to the right user at the right moment — based on spend history, location, and predicted intent.' },
  { title: 'Redemption & Catalogue', desc: 'Full consumer-facing redemption — travel, merchandise, bill pay, charity, and cash-out — with real-time balance and history.' },
  { title: 'Programme Analytics', desc: 'Campaign performance dashboard — earn/burn rates, user engagement cohorts, merchant ROI, and liability reporting for finance teams.' },
]

const capabilities = [
  'Event-driven real-time issuance (Kafka)',
  'REST APIs for wallet and POS integration',
  'Configurable earn rule engine (no-code)',
  'Campaign management console (web UI)',
  'React Native consumer loyalty SDK',
  'Multi-currency points ledger',
  'Merchant portal (self-serve)',
  'Liability reporting and expiry management',
  'A/B testing for offer campaigns',
  'White-label — fully brandable',
]

const relatedProducts = [
  { name: 'Groot Pay', href: '/products/groot-pay', desc: 'Digital wallet platform' },
  { name: 'Merchant AI', href: '/products/merchant-ai', desc: 'AI-powered merchant tools' },
  { name: 'PFM', href: '/products/pfm', desc: 'Personal finance manager' },
]

export default function LoyaltyPage() {
  return (
    <ProductPageTemplate
      tag="Points & Rewards Platform"
      headline="Turn transactions"
      headlineAccent="into relationships."
      quote="End-to-end loyalty infrastructure — configured for banks, wallets, and super-apps."
      description="The Loyalty Engine handles real-time issuance, partner merchant management, AI-driven offer targeting, and a full consumer redemption experience — all through one integration. No rebuilding from scratch."
      mockup="/loyalty-mockup.png"
      mockupAlt="Loyalty Engine"
      stats={stats}
      featuresSubheadline="Every module is built for scale — deployed across digital wallets and merchant networks serving millions."
      features={features}
      capabilitiesSubtext="Every capability has been run in live environments — handling millions of transactions and merchant-funded campaigns."
      capabilities={capabilities}
      relatedProducts={relatedProducts}
      ctaHeadline="Ready to deploy Loyalty Engine?"
      insightsCategory="Fintech"
    />
  )
}
