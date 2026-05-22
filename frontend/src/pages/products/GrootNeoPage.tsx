import { ProductPageTemplate } from '@/components/sections/ProductPageTemplate'

const stats = [
  { value: '13M+', label: 'Users on the underlying platform' },
  { value: 'Months', label: 'Time to live — not years' },
  { value: '1', label: 'Vendor for every layer' },
  { value: 'Central bank', label: 'Compliance built-in' },
]

const features = [
  { title: 'Consumer Banking App', desc: 'Fully branded iOS and Android app — accounts, transfers, cards, statements, KYC, and onboarding. Config-driven, not custom-built.' },
  { title: 'Core Banking Engine', desc: 'Transaction processing, account management, interest calculation, product configuration, and ledger — built for high-throughput digital banks.' },
  { title: 'Payment Rails Integration', desc: 'Pre-integrated connectors for local payment schemes, interbank transfers, SWIFT, and card networks — no cross-vendor integration effort.' },
  { title: 'KYC & Onboarding', desc: 'eKYC, biometric verification, document scanning, and liveness detection — regulatory-grade onboarding in under 5 minutes.' },
  { title: 'Settlement & Reconciliation', desc: 'Real-time and batch settlement, dispute management, multi-bank reconciliation, and automated reporting — all in one module.' },
  { title: 'Compliance & AML', desc: 'Transaction monitoring, AML screening, regulatory reporting, and audit trails — built to central bank specification.' },
]

const capabilities = [
  'Microservices architecture — modular activation',
  'API-first — REST and webhooks throughout',
  'Cloud-native — AWS, Azure, GCP ready',
  'ISO 27001 security baseline',
  'PCI DSS compliant infrastructure',
  'Multi-tenancy SaaS or dedicated deployment',
  'React Native consumer app (iOS + Android)',
  'Real-time event streaming (Kafka)',
  'PostgreSQL + Redis data layer',
  'White-label — fully brandable',
]

const relatedProducts = [
  { name: 'Groot Pay', href: '/products/groot-pay', desc: 'Digital wallet infrastructure' },
  { name: 'PFM', href: '/products/pfm', desc: 'Personal finance manager' },
  { name: 'Loyalty Engine', href: '/products/loyalty', desc: 'Points & rewards platform' },
]

export default function GrootNeoPage() {
  return (
    <ProductPageTemplate
      tag="Neo-Banking Platform"
      headline="From contract to"
      headlineAccent="live digital bank."
      quote="Full-stack neo-banking infrastructure — built from 13M+ user production experience."
      description="Groot Neo is a white-label neo-banking platform where every module — consumer app, core banking, payment rails, KYC, settlement, and compliance — is pre-built and pre-integrated. Banks go live in months, not years. One vendor, one contract, every layer."
      mockup="/groot-neo-mockup.png"
      mockupAlt="Groot Neo"
      mockupHeight="h-[620px]"
      stats={stats}
      featuresSubheadline="Every module has been built and operated in live banking environments — not assembled from third-party components."
      features={features}
      capabilitiesSubtext="Every capability listed has been delivered in real, regulated banking environments — not prototyped."
      capabilities={capabilities}
      relatedProducts={relatedProducts}
      ctaHeadline="Ready to deploy Groot Neo?"
      insightsCategory="Fintech"
    />
  )
}
