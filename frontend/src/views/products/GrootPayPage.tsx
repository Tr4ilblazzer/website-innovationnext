'use client'


import { ProductPageTemplate } from '@/components/sections/ProductPageTemplate'

const features = [
  { title: 'P2P & Merchant Payments', desc: 'Instant transfers by mobile number, QR, or NFC, and merchant payments by QR, NFC, or payment gateway.' },
  { title: 'Bill Payments & Top-Up', desc: 'Utilities, insurance, government fees, telecoms, and airtime recharge across carriers.' },
  { title: 'Cardless ATM & Agent Banking', desc: 'Cash-out without a physical card, and cash-in / cash-out through an agent network.' },
  { title: 'International Remittance', desc: 'Receive from 20+ global corridors, with compliance and real-time FX built in.' },
  { title: 'Savings Pockets & Loyalty', desc: 'Goal-based savings within the wallet, and points earn and redemption at checkout.' },
  { title: 'Mini-App Framework & SDK', desc: 'Other businesses build mini-apps and list their services in the wallet — the same framework used in the Government Super App.' },
]

const capabilities = [
  'RESTful APIs — OpenAPI 3.0',
  'CBS connectors and payment-switch integration',
  'Remittance gateway integration',
  'KYC / eKYC — document OCR and liveness',
  'FATF-aligned AML and transaction monitoring',
  'PCI DSS-aligned security',
  'End-to-end encryption',
  'Multi-currency support',
  'Horizontal scaling',
  'Standalone or embedded in Groot Neo',
]

const relatedProducts = [
  { name: 'Groot Neo', href: '/products/groot-neo', desc: 'Full neo-banking platform' },
  { name: 'Loyalty Engine', href: '/products/loyalty', desc: 'Rewards & points platform' },
  { name: 'Onboarding Platform', href: '/products/onboarding', desc: 'KYC, KYB, and Video KYC' },
]

export default function GrootPayPage() {
  return (
    <ProductPageTemplate
      title="Groot Pay"
      description="A full-featured digital wallet platform for consumers, merchants, and agents — mobile money, QR payments, bill pay, and international remittance — and a mini-app platform that lets partners add their own services."
      mockup="/groot-pay-mockup.png"
      mockupAlt="Groot Pay"
      featuresSubheadline="A payment platform that other businesses build on."
      features={features}
      capabilitiesSubtext="Each mini-app is built and released independently of the wallet core, so the platform grows one partner at a time."
      capabilities={capabilities}
      relatedProducts={relatedProducts}
      insightsCategory="Fintech"
    />
  )
}
