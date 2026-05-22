import { ProductPageTemplate } from '@/components/sections/ProductPageTemplate'

const stats = [
  { value: '3.5M+', label: 'Daily transactions on underlying platform' },
  { value: '3M+', label: 'Merchants supported' },
  { value: '20+', label: 'Remittance corridors' },
  { value: 'PCI DSS', label: 'Certified infrastructure' },
]

const features = [
  { title: 'QR Payments', desc: 'Static and dynamic QR — interoperable with national payment schemes and proprietary merchant networks.' },
  { title: 'P2P Transfers', desc: 'Instant peer-to-peer transfers via phone number, QR, or account — with real-time notifications and transaction history.' },
  { title: 'Bill Payments & Top-Ups', desc: 'Pre-integrated biller aggregator connecting utilities, telecoms, insurance, government fees, and subscription services.' },
  { title: 'Merchant Management', desc: 'Merchant onboarding, QR generation, settlement reporting, and analytics — with AI-powered risk scoring.' },
  { title: 'Cross-Border Remittance', desc: 'Send and receive across 20+ corridors — integrated with Remitly, WorldRemit, and major international money transfer networks.' },
  { title: 'Loyalty & Offers', desc: 'Built-in cashback, points, and campaign management — with partner merchant offer targeting and real-time issuance.' },
]

const capabilities = [
  'React Native iOS + Android consumer app',
  'USSD interface for feature-phone access',
  'National QR scheme certification support',
  'Real-time settlement via local scheme rails',
  'PCI DSS compliant architecture',
  'Biometric + PIN + OTP auth layers',
  'Webhook-based merchant notification',
  'REST APIs for third-party integration',
  'Multi-currency wallet support',
  'White-label — fully brandable',
]

const relatedProducts = [
  { name: 'Groot Neo', href: '/products/groot-neo', desc: 'Full neo-banking platform' },
  { name: 'Loyalty Engine', href: '/products/loyalty', desc: 'Rewards & points platform' },
  { name: 'Merchant AI', href: '/products/merchant-ai', desc: 'AI-powered merchant tools' },
]

export default function GrootPayPage() {
  return (
    <ProductPageTemplate
      tag="Digital Wallet Infrastructure"
      headline="White-label wallet."
      headlineAccent="Production-ready."
      quote="Built on the same infrastructure that powered South Asia's first digital wallet at 13M users."
      description="Groot Pay covers consumer-facing payments, merchant QR, P2P, bill pay, remittance, and a full omnichannel engagement layer — all under one licence, ready to deploy in months."
      mockup="/groot-pay-mockup.png"
      mockupAlt="Groot Pay"
      stats={stats}
      featuresSubheadline="Every module has been built and operated in live payment environments — not assembled from third-party components."
      features={features}
      capabilitiesSubtext="Every capability listed has been delivered in real, regulated payment environments."
      capabilities={capabilities}
      relatedProducts={relatedProducts}
      ctaHeadline="Ready to deploy Groot Pay?"
      insightsCategory="Fintech"
    />
  )
}
