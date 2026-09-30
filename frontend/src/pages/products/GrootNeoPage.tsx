import { ProductPageTemplate } from '@/components/sections/ProductPageTemplate'

const stats = [
  { value: '13M+', label: 'Users on platforms we built' },
  { value: '3.5M+', label: 'Daily transactions' },
  { value: '10', label: 'Pre-integrated modules' },
  { value: '1', label: 'Vendor for every layer' },
]

const features = [
  { title: 'Core Mobile Banking', desc: 'Native iOS and Android apps — account management, statements, and alerts.' },
  { title: 'Digital Wallet — Groot Pay', desc: 'A fully embedded wallet: P2P, merchant payments, and bill pay. Partners can list their own services as mini-apps through the SDK.' },
  { title: 'AI Intelligence Layer', desc: 'Fraud AI, PFM, campaign intelligence, and an AI digital assistant built into the banking app.' },
  { title: 'Customer Engagement Platform', desc: 'A customer data platform with omnichannel communication and campaign automation.' },
  { title: 'Payment Infrastructure', desc: 'QR (EMVCo), NFC, RTGS integration, and a payment gateway.' },
  { title: 'Settlement & Reconciliation', desc: 'A multi-rail, multi-currency settlement engine with automated reconciliation.' },
  { title: 'Merchant, Agent & KYC Onboarding', desc: 'Automated KYC and KYB flows — liveness, document OCR, biometric identity, and Video KYC — powered by the Onboarding Platform.' },
  { title: 'Digital Lending & Virtual Accounts', desc: 'Embedded credit decisioning and loan origination, plus an account-as-a-service layer.' },
]

const capabilities = [
  'Pre-integrated modules — no systems integration project',
  'Single-vendor accountability',
  'Built for variable connectivity and agent networks',
  'KYC, AML, and reporting built in',
  'Native iOS and Android apps',
  'REST APIs throughout',
  'Cloud or on-premise deployment',
  'White-label — fully brandable',
  'Standalone modules or the full bundle',
  'AI fraud, PFM, and campaign intelligence',
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
      quote="A complete digital bank in one pre-integrated product."
      description="Groot Neo bundles every component needed to launch a fully featured digital bank into one pre-integrated product — removing the integration cost, vendor risk, and time of assembling a stack from point solutions. For banks, digital banks, and fintechs launching or modernising digital channels."
      mockup="/groot-neo-mockup.png"
      mockupAlt="Groot Neo"
      mockupHeight="h-[620px]"
      stats={stats}
      featuresSubheadline="Every module is part of one product, so it works out of the box."
      features={features}
      capabilitiesSubtext="Live in multiple markets — for greenfield digital banks, commercial banks, telecoms launching mobile money, and microfinance institutions."
      capabilities={capabilities}
      relatedProducts={relatedProducts}
      ctaHeadline="Ready to deploy Groot Neo?"
      insightsCategory="Fintech"
    />
  )
}
