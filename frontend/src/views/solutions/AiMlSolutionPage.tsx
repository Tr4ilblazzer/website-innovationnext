'use client'


import { SolutionPageTemplate } from '@/components/sections/SolutionPageTemplate'

const stats = [
  { value: '20+', label: 'AI models in production' },
  { value: '3.5M+', label: 'Daily transactions under fraud AI' },
  { value: '<500ms', label: 'Real-time fraud decisioning' },
  { value: 'Live', label: 'Merchant onboarding AI, Malaysia' },
]

const features = [
  { title: 'Bank Signature Verification', desc: 'Computer-vision signature matching and forgery detection with confidence scoring and a full audit trail — live at financial institutions in Nepal.' },
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
  'Computer vision and OCR',
  'NLP and LLM integration',
  'Gradient boosting and neural networks',
  'Real-time and batch inference APIs',
  'ONNX / TensorFlow / PyTorch model formats',
  'Under 500ms real-time fraud decisioning',
  'Under 2s document processing',
  'Explainability — SHAP, LIME, decision trails',
  'Drift detection and automated retraining',
  'Bias monitoring and model governance',
  'Human-in-the-loop review for low-confidence cases',
  'Data minimisation and differential-privacy options',
  'GDPR-aligned data handling and regulatory audit trails',
  'AWS / Azure / GCP or on-premise deployment',
]

export default function AiMlSolutionPage() {
  return (
    <SolutionPageTemplate
      tag="AI & Machine Learning"
      headline="AI that runs in"
      headlineAccent="production."
      quote="AI in production — not in the lab."
      description="Every AI capability we offer is live in a financial or government environment — signature verification, document intelligence, fraud detection, and conversational AI, with MLOps to keep models accurate and governed."
      heroImage="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=900&q=80"
      heroImageAlt="AI and machine learning"
      stats={stats}
      featuresSubheadline="Nine capabilities, trained and deployed in live, regulated environments in Nepal and Malaysia — not research notebooks."
      features={features}
      capabilitiesSubtext="The standards and tooling behind our production AI — from model formats to governance."
      capabilities={capabilities}
      insightsCategory="AI & ML"
    />
  )
}
