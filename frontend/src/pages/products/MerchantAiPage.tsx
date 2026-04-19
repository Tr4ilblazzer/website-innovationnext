import { ProductPageTemplate } from '@/components/sections/ProductPageTemplate'

export default function MerchantAiPage() {
  return (
    <ProductPageTemplate
      name="Merchant AI"
      tag="AI-Powered Merchant Platform"
      tagline="Onboard merchants in hours. Not weeks."
      icon="🛒"
      accentColor="#8b5cf6"
      description="Merchant AI is an AI-powered merchant management platform covering onboarding, document verification, risk scoring, and ongoing performance analytics. Built from production experience managing 3M+ merchants across digital payment networks — it compresses weeks-long manual processes into automated, sub-hour journeys."
      metrics={[
        { value: '3M+', label: 'Merchants on underlying network' },
        { value: 'Hours', label: 'Onboarding — down from weeks' },
        { value: 'AI-scored', label: 'Real-time merchant risk' },
        { value: '99%+', label: 'Document verification accuracy' },
      ]}
      features={[
        { title: 'AI Document Verification', description: 'Automated extraction and verification of business registration documents, tax certificates, and ID — using computer vision and NLP with >99% accuracy.' },
        { title: 'Risk Scoring Engine', description: 'ML-based merchant risk model assessing business legitimacy, fraud probability, and transaction pattern anomalies — at onboarding and continuously post-live.' },
        { title: 'Self-Serve Onboarding Portal', description: 'Merchant-facing web portal for document upload, business profile completion, bank account verification, and QR/POS terminal provisioning.' },
        { title: 'Merchant Analytics Dashboard', description: 'Transaction performance, settlement history, dispute rates, and benchmark comparisons — giving merchants visibility into their payment health.' },
        { title: 'Relationship Manager Console', description: 'Back-office tools for human reviewers — case queuing, document audit trail, override workflows, and escalation management.' },
        { title: 'Ongoing Monitoring & Alerts', description: 'Continuous post-onboarding monitoring for volume anomalies, chargebacks, settlement failures, and compliance triggers — with automated alert routing.' },
      ]}
      useCases={[
        'Payment networks onboarding high volumes of SME merchants',
        'Digital wallets building a proprietary merchant acceptance network',
        'Banks launching merchant acquiring with automated risk controls',
        'Fintechs offering merchant lending based on transaction behaviour',
        'Government payment platforms onboarding service providers at scale',
      ]}
      techSpecs={[
        'Computer vision OCR pipeline (PyTorch)',
        'ML risk model — real-time inference API',
        'REST API for POS/QR provisioning',
        'Webhook-based decision notifications',
        'React web portal (white-label)',
        'Multi-country document taxonomy',
        'Configurable risk threshold rules',
        'GDPR / PCI DSS compliant data handling',
        'Human-in-the-loop review workflow',
      ]}
      relatedProducts={[
        { name: 'Groot Pay', href: '/products/groot-pay', desc: 'Digital wallet platform' },
        { name: 'Loyalty Engine', href: '/products/loyalty', desc: 'Merchant-funded rewards' },
        { name: 'Groot Neo', href: '/products/groot-neo', desc: 'Full neo-banking platform' },
      ]}
    />
  )
}
