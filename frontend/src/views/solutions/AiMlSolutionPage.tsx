'use client'


import { SolutionPageTemplate } from '@/components/sections/SolutionPageTemplate'

const stats = [
  { value: '20+', label: 'AI models in production' },
  { value: '3.5M+', label: 'Daily transactions under fraud AI' },
  { value: '<500ms', label: 'Real-time fraud decisioning' },
  { value: 'Live', label: 'Merchant onboarding AI, Malaysia' },
]

const features = [
  { title: 'Bank Signature Verification', desc: 'Computer-vision signature matching and forgery detection with confidence scoring — live at financial institutions in Nepal.' },
  { title: 'Intelligent Document Processing', desc: 'OCR, classification, field extraction, and validation for KYC / KYB, loan processing, and government documents, with human review for low-confidence cases.' },
  { title: 'Fraud & Risk AI', desc: 'Behavioural anomaly detection, velocity checks, device fingerprinting, and multi-dimensional risk scoring — block, flag, or pass in under 500ms, with a decision trail.' },
  { title: 'AI Digital Assistant', desc: 'LLM and NLP conversational assistant embedded in mobile banking — queries, guided transfers, product guidance, and hand-off to a human agent with context.' },
  { title: 'Campaign & Customer Intelligence', desc: 'Predictive segmentation, churn prediction, next-best-offer, and automated campaign testing on top of ML outputs.' },
  { title: 'MLOps & Responsible AI', desc: 'Training pipelines, canary releases, drift monitoring, automated retraining, explainability, bias checks, and audit logs across the model lifecycle.' },
]

const capabilities = [
  'Computer vision and OCR',
  'NLP and LLM integration',
  'Gradient boosting and neural networks',
  'Real-time and batch inference APIs',
  'ONNX / TensorFlow / PyTorch model formats',
  'Explainability — SHAP, LIME, decision trails',
  'Drift detection and automated retraining',
  'Bias monitoring and model governance',
  'AWS / Azure / GCP or on-premise deployment',
  'Face recognition and liveness',
  'ANPR and violation classification',
  'Predictive analytics on programme KPIs',
]

export default function AiMlSolutionPage() {
  return (
    <SolutionPageTemplate
      tag="AI & Machine Learning"
      headline="AI that runs in"
      headlineAccent="production."
      quote="AI in production — not in the lab."
      description="Every AI capability we offer is live in a financial or government environment — signature verification, document intelligence, fraud detection, and analytics, with AI built into every platform we deliver."
      heroImage="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=900&q=80"
      heroImageAlt="AI and machine learning"
      stats={stats}
      featuresSubheadline="Trained and deployed in live, regulated environments in Nepal and Malaysia — not research notebooks."
      features={features}
      capabilitiesSubtext="The standards and tooling behind our production AI — from model formats to governance."
      capabilities={capabilities}
      insightsCategory="AI & ML"
    />
  )
}
