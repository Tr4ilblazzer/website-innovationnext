'use client'


import { SolutionPageTemplate } from '@/components/sections/SolutionPageTemplate'

const features = [
  { title: 'Bank Signature Verification', desc: 'Computer-vision signature matching and forgery detection with confidence scoring and a full audit trail — live at financial institutions.' },
  { title: 'Intelligent Document Processing', desc: 'OCR, classification, field extraction, and validation for KYC / KYB, loan processing, and government documents, with human review for low-confidence cases.' },
  { title: 'Fraud & Risk AI', desc: 'Behavioural anomaly detection, velocity checks, device fingerprinting, and network analysis — block, flag, or pass in under 500ms, with a decision trail.' },
  { title: 'AI Digital Assistant', desc: 'LLM and NLP conversational assistant embedded in mobile banking — balance and history queries, guided transfers and bill payments, and hand-off to a human agent with full context.' },
  { title: 'Personalised Financial Insights', desc: 'Transaction categorisation, spending patterns, budget-breach prediction, 7–30 day cash-flow forecasts, and plain-language summaries — the models behind PFM.' },
  { title: 'Campaign & Customer Intelligence', desc: 'Predictive segmentation, churn prediction, next-best-offer, automated A/B testing, and a no-code audience builder on top of ML outputs.' },
  { title: 'AI Customer Support Automation', desc: 'Intent detection across 50+ query types, automated resolution, payment troubleshooting, and escalation to an agent with the conversation and transaction context.' },
  { title: 'AI for Government', desc: 'Face recognition and document verification for border screening, ANPR for traffic enforcement, document processing, and conversational citizen-service routing.' },
  { title: 'MLOps & Responsible AI', desc: 'Training pipelines, canary releases and rollback, drift monitoring, automated retraining, explainability, bias checks, model cards, and audit logs across the model lifecycle.' },
]

const capabilities = [
  'Real-time and batch decisioning APIs',
  'Decisions you can explain and audit',
  'Human review for low-confidence cases',
  'Drift monitoring and automated retraining',
  'Bias checks and model governance',
  'Data minimisation and regulatory audit trails',
  'Cloud or on-premise deployment',
]

export default function AiMlSolutionPage() {
  return (
    <SolutionPageTemplate
      title="AI & Machine Learning"
      description="Fraud detection, signature verification and document intelligence, in live use at financial and government institutions, with human review and monitoring built in."
      heroImage="https://images.unsplash.com/photo-1742783201678-33840ee6ee0b?w=1600&q=80"
      heroImageAlt="AI and machine learning"
      featuresSubheadline="AI services built for regulated institutions, each with a decision trail, human review where confidence is low, and model monitoring after go-live."
      features={features}
      capabilitiesSubtext="How our models are run, reviewed and governed once they are live."
      capabilities={capabilities}
      insightsCategory="AI & ML"
    />
  )
}
