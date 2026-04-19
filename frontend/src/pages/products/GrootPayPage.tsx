import { ProductPageTemplate } from '@/components/sections/ProductPageTemplate'

export default function GrootPayPage() {
  return (
    <ProductPageTemplate
      name="Groot Pay"
      tag="Digital Wallet"
      tagline="A complete digital wallet platform — from QR payment to remittance."
      icon="💸"
      accentColor="#0DFFFF"
      description="Groot Pay is a white-label digital wallet platform built on the same infrastructure that powered South Asia's first digital wallet at 13M users. It covers consumer-facing payments, merchant QR, P2P, bill pay, remittance, and a full omnichannel engagement layer — all under one licence."
      metrics={[
        { value: '3.5M+', label: 'Daily transactions on underlying platform' },
        { value: '3M+', label: 'Merchants supported' },
        { value: '20+', label: 'Remittance corridors' },
        { value: 'National QR', label: 'Scheme certified' },
      ]}
      features={[
        { title: 'QR Payments', description: 'Static and dynamic QR — interoperable with national payment schemes (DuitNow, Fonepay, UPI-style) and proprietary merchant networks.' },
        { title: 'P2P Transfers', description: 'Instant peer-to-peer transfers via phone number, QR, or account — with real-time notifications and transaction history.' },
        { title: 'Bill Payments & Top-Ups', description: 'Pre-integrated biller aggregator connecting utilities, telecoms, insurance, government fees, and subscription services.' },
        { title: 'Merchant Management', description: 'Merchant onboarding, QR generation, settlement reporting, and merchant analytics dashboard — with AI-powered risk scoring.' },
        { title: 'Cross-Border Remittance', description: 'Send and receive across 20+ corridors — integrated with Remitly, WorldRemit, and major international money transfer networks.' },
        { title: 'Loyalty & Offers', description: 'Built-in cashback, points, and campaign management — with partner merchant offer targeting and real-time issuance.' },
      ]}
      useCases={[
        'Telecoms launching mobile money platforms',
        'Banks adding a digital wallet layer to existing infrastructure',
        'MFIs serving rural or unbanked populations via USSD/app',
        'Government departments issuing benefit payments digitally',
        'Fintechs building a remittance-first wallet product',
      ]}
      techSpecs={[
        'React Native iOS + Android consumer app',
        'USSD interface for feature-phone access',
        'National QR scheme certification support',
        'Real-time settlement via NRB / local scheme rails',
        'PCI DSS compliant',
        'Biometric + PIN + OTP auth layers',
        'Webhook-based merchant notification',
        'REST APIs for third-party integration',
      ]}
      relatedProducts={[
        { name: 'Groot Neo', href: '/products/groot-neo', desc: 'Full neo-banking platform' },
        { name: 'Loyalty Engine', href: '/products/loyalty', desc: 'Rewards & points platform' },
        { name: 'Merchant AI', href: '/products/merchant-ai', desc: 'AI-powered merchant tools' },
      ]}
    />
  )
}
