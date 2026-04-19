import { SolutionPageTemplate } from '@/components/sections/SolutionPageTemplate'

export default function AiMlSolutionPage() {
  return (
    <SolutionPageTemplate
      tag="AI & Machine Learning"
      headline="AI that runs in"
      headlineAccent="production."
      subheadline='"Not demos. Not pilots. AI models deployed inside live fintech and government platforms serving millions of users."'
      description="Innovation Next builds and deploys custom AI and machine learning models tuned for financial services and government — from fraud detection and merchant risk scoring to signature verification, document intelligence, and citizen analytics."
      accentColor="#8b5cf6"
      icon="🤖"
      stats={[
        { value: '20+', label: 'AI models in production' },
        { value: '13M+', label: 'Users on AI-powered platforms' },
        { value: 'Real-time', label: 'Inference at transaction scale' },
        { value: '2026', label: 'LLM & GenAI deployments active' },
      ]}
      features={[
        {
          title: 'Fraud Detection & AML',
          description: 'Real-time transaction fraud scoring and AML pattern detection tuned for payment networks, wallets, and banking platforms.',
        },
        {
          title: 'Merchant AI (Risk & Onboarding)',
          description: 'AI-powered merchant document verification, risk scoring, and performance analytics — compressing onboarding from weeks to hours.',
        },
        {
          title: 'Signature Verification',
          description: 'Computer vision-based handwritten signature verification for banking, legal, and government document workflows.',
        },
        {
          title: 'Document Intelligence',
          description: 'OCR + ML pipeline for extracting structured data from identity documents, contracts, and government forms at scale.',
        },
        {
          title: 'PFM & Financial Analytics',
          description: 'AI-driven personal finance insights, spend categorisation, budget recommendations, and financial health scoring.',
        },
        {
          title: 'Custom Model Development',
          description: 'End-to-end model design, training, evaluation, and MLOps deployment — tailored to your domain data and business objective.',
        },
      ]}
      capabilities={[
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
      ]}
    />
  )
}
