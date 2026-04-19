import { ProductPageTemplate } from '@/components/sections/ProductPageTemplate'

export default function GrootNeoPage() {
  return (
    <ProductPageTemplate
      name="Groot Neo"
      tag="Neo-Banking Platform"
      tagline="From contract to live digital bank — in months, not years."
      icon="🏦"
      accentColor="#3C53FF"
      description="Groot Neo is a full-stack, white-label neo-banking platform built from 13M+ user production experience. Every module — from consumer app to settlement engine — is pre-built and pre-integrated, so banks go live in months, not years. One vendor, one contract, every layer."
      metrics={[
        { value: '13M+', label: 'Users on the underlying platform' },
        { value: 'Months', label: 'Time to live — not years' },
        { value: '1', label: 'Vendor for every layer' },
        { value: 'Central bank', label: 'Compliance built-in' },
      ]}
      features={[
        { title: 'Consumer Banking App', description: 'Fully branded iOS and Android app — accounts, transfers, cards, statements, KYC, and onboarding. Config-driven, not custom-built.' },
        { title: 'Core Banking Engine', description: 'Transaction processing, account management, interest calculation, product configuration, and ledger — built for high-throughput digital banks.' },
        { title: 'Payment Rails Integration', description: 'Pre-integrated connectors for local payment schemes, interbank transfers, SWIFT, and card networks — no cross-vendor integration effort.' },
        { title: 'KYC & Onboarding', description: 'eKYC, biometric verification, document scanning, and liveness detection — regulatory-grade onboarding in under 5 minutes.' },
        { title: 'Settlement & Reconciliation', description: 'Real-time and batch settlement, dispute management, multi-bank reconciliation, and automated reporting — all in one module.' },
        { title: 'Compliance & AML', description: 'Transaction monitoring, AML screening, regulatory reporting, and audit trails — built to central bank specification.' },
      ]}
      useCases={[
        'Banks launching a digital-first subsidiary or challenger brand',
        'Telcos or MFIs seeking a banking licence and platform simultaneously',
        'Fintechs needing a full banking infrastructure under one vendor',
        'International banks entering emerging markets with speed',
        'Development finance institutions launching digital wallets at scale',
      ]}
      techSpecs={[
        'Microservices architecture — modular activation',
        'API-first — REST and webhooks throughout',
        'Cloud-native — AWS, Azure, GCP ready',
        'ISO 27001 security baseline',
        'PCI DSS compliant infrastructure',
        'Multi-tenancy SaaS or dedicated deployment',
        'React Native consumer app (iOS + Android)',
        'Real-time event streaming (Kafka)',
        'PostgreSQL + Redis data layer',
      ]}
      relatedProducts={[
        { name: 'Groot Pay', href: '/products/groot-pay', desc: 'Digital wallet infrastructure' },
        { name: 'PFM', href: '/products/pfm', desc: 'Personal finance manager' },
        { name: 'Loyalty Engine', href: '/products/loyalty', desc: 'Points & rewards platform' },
      ]}
    />
  )
}
