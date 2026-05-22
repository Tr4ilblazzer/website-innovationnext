import { ProductPageTemplate } from '@/components/sections/ProductPageTemplate'

const stats = [
  { value: '3M+', label: 'Merchants on underlying network' },
  { value: 'Hours', label: 'Onboarding — down from weeks' },
  { value: 'AI-scored', label: 'Real-time merchant risk' },
  { value: '99%+', label: 'Document verification accuracy' },
]

const features = [
  { title: 'AI Document Verification', desc: 'Automated extraction and verification of business registration documents, tax certificates, and ID — using computer vision and NLP with >99% accuracy.' },
  { title: 'Risk Scoring Engine', desc: 'ML-based merchant risk model assessing business legitimacy, fraud probability, and transaction pattern anomalies — at onboarding and continuously post-live.' },
  { title: 'Self-Serve Onboarding Portal', desc: 'Merchant-facing web portal for document upload, business profile completion, bank account verification, and QR/POS terminal provisioning.' },
  { title: 'Merchant Analytics Dashboard', desc: 'Transaction performance, settlement history, dispute rates, and benchmark comparisons — giving merchants visibility into their payment health.' },
  { title: 'Relationship Manager Console', desc: 'Back-office tools for human reviewers — case queuing, document audit trail, override workflows, and escalation management.' },
  { title: 'Ongoing Monitoring & Alerts', desc: 'Continuous post-onboarding monitoring for volume anomalies, chargebacks, settlement failures, and compliance triggers — with automated alert routing.' },
]

const capabilities = [
  'Computer vision OCR pipeline (PyTorch)',
  'ML risk model — real-time inference API',
  'REST API for POS/QR provisioning',
  'Webhook-based decision notifications',
  'React web portal (white-label)',
  'Multi-country document taxonomy',
  'Configurable risk threshold rules',
  'GDPR / PCI DSS compliant data handling',
  'Human-in-the-loop review workflow',
  'Continuous post-live monitoring',
]

const relatedProducts = [
  { name: 'Groot Pay', href: '/products/groot-pay', desc: 'Digital wallet platform' },
  { name: 'Loyalty Engine', href: '/products/loyalty', desc: 'Merchant-funded rewards' },
  { name: 'Groot Neo', href: '/products/groot-neo', desc: 'Full neo-banking platform' },
]

export default function MerchantAiPage() {
  return (
    <ProductPageTemplate
      tag="AI-Powered Merchant Platform"
      headline="Onboard merchants"
      headlineAccent="in hours. Not weeks."
      quote="Built from production experience managing 3M+ merchants across digital payment networks."
      description="Merchant AI covers onboarding, document verification, risk scoring, and ongoing performance analytics — compressing weeks-long manual processes into automated, sub-hour journeys. No rebuilding from scratch."
      mockup="/merchant-ai-mockup.png"
      mockupAlt="Merchant AI"
      stats={stats}
      featuresSubheadline="Every module is built from real production experience — managing millions of merchants across live payment networks."
      features={features}
      capabilitiesSubtext="Every capability has been run in live merchant networks — processing millions of onboarding events and real-time risk decisions."
      capabilities={capabilities}
      relatedProducts={relatedProducts}
      ctaHeadline="Ready to deploy Merchant AI?"
      insightsCategory="AI & ML"
    />
  )
}
