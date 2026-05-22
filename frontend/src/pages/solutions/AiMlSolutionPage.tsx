import { SolutionPageTemplate } from '@/components/sections/SolutionPageTemplate'

const stats = [
  { value: '20+', label: 'AI models in production' },
  { value: '13M+', label: 'Users on AI-powered platforms' },
  { value: 'Real-time', label: 'Inference at transaction scale' },
  { value: '2026', label: 'LLM & GenAI deployments active' },
]

const features = [
  { title: 'Fraud Detection & AML', desc: 'Real-time transaction fraud scoring and AML pattern detection tuned for payment networks, wallets, and banking platforms.' },
  { title: 'Merchant AI — Risk & Onboarding', desc: 'AI-powered merchant document verification, risk scoring, and performance analytics — compressing onboarding from weeks to hours.' },
  { title: 'Signature Verification', desc: 'Computer vision-based handwritten signature verification for banking, legal, and government document workflows.' },
  { title: 'Document Intelligence', desc: 'OCR + ML pipeline for extracting structured data from identity documents, contracts, and government forms at scale.' },
  { title: 'PFM & Financial Analytics', desc: 'AI-driven personal finance insights, spend categorisation, budget recommendations, and financial health scoring.' },
  { title: 'Custom Model Development', desc: 'End-to-end model design, training, evaluation, and MLOps deployment — tailored to your domain data and business objective.' },
]

const capabilities = [
  'PyTorch / TensorFlow / scikit-learn',
  'MLOps — MLflow, Kubeflow, SageMaker',
  'Computer vision & OCR',
  'NLP & LLM fine-tuning',
  'Real-time inference APIs',
  'Fraud & anomaly detection',
  'Explainable AI (XAI)',
  'A/B model experimentation',
  'Vector databases (Pinecone, Qdrant)',
  'OpenAI / Anthropic API integration',
  'Edge AI deployment',
  'Regulatory AI compliance',
]

export default function AiMlSolutionPage() {
  return (
    <SolutionPageTemplate
      tag="AI & Machine Learning"
      headline="AI that runs in"
      headlineAccent="production."
      quote="Not demos. Not pilots. AI models deployed inside live fintech and government platforms serving millions."
      description="Innovation Next builds and deploys custom AI and machine learning models tuned for financial services and government — from fraud detection and merchant risk scoring to signature verification, document intelligence, and citizen analytics."
      heroImage="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80"
      heroImageAlt="AI and machine learning"
      stats={stats}
      featuresSubheadline="Every model has been trained and deployed in live, regulated environments — not research notebooks."
      features={features}
      capabilitiesSubtext="Every capability listed has been delivered in real, live systems — not in proof-of-concept environments."
      capabilities={capabilities}
      insightsCategory="AI & ML"
    />
  )
}
