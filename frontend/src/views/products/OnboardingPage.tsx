'use client'


import { ProductPageTemplate } from '@/components/sections/ProductPageTemplate'

const stats = [
  { value: '9', label: 'Core modules' },
  { value: '6', label: 'Entity types onboarded' },
  { value: 'No-code', label: 'Flow builder' },
  { value: 'Mar 2026', label: 'Live at Boost, Malaysia' },
]

const features = [
  { title: 'Document Intelligence', desc: 'Document classification, OCR, field extraction, and authenticity checks — powered by allXtract.' },
  { title: 'Identity Verification', desc: 'Selfie capture, liveness detection, and face match against the ID document.' },
  { title: 'Video KYC', desc: 'Video-based identity verification for remote onboarding, where a regulator or risk rule requires it.' },
  { title: 'Business Verification (KYB)', desc: 'Business registration validation against registries, plus director and beneficial-owner checks.' },
  { title: 'Screening', desc: 'Sanctions, PEP, and adverse-media screening as part of any flow.' },
  { title: 'Risk Scoring & Decisioning', desc: 'A multi-factor risk score; rules decide approve, review, step-up, or reject.' },
  { title: 'No-Code Flow Builder', desc: 'Configure steps, order, conditions, and step-up rules per country, entity type, and risk tier — without code changes.' },
  { title: 'Case Management', desc: 'A manual review queue for flagged applications, with reviewer notes and decisions.' },
  { title: 'Audit & Compliance Reporting', desc: 'A full audit trail, KYC and KYB records, and regulatory reports.' },
]

const capabilities = [
  'Risk-based step-up: auto-approve, review, or Video KYC',
  'One platform for customers, merchants, agents, businesses, citizens, and suppliers',
  'Flows configured per country, entity type, and risk tier',
  'REST API for core banking, wallets, and portals',
  'Web and mobile SDKs for document and selfie capture',
  'Webhooks for status and decision events',
  'Admin console — flows and cases without code',
  'SaaS, on-premise, or sovereign deployment',
  'Manual review queue for flagged cases',
  'Full audit trail and regulatory reports',
]

const relatedProducts = [
  { name: 'Groot Neo', href: '/products/groot-neo', desc: 'KYC and onboarding modules' },
  { name: 'Groot Pay', href: '/products/groot-pay', desc: 'KYC for wallet users and agents' },
  { name: 'Loyalty Engine', href: '/products/loyalty', desc: 'Merchant-funded rewards' },
]

export default function OnboardingPage() {
  return (
    <ProductPageTemplate
      tag="AI Onboarding & Verification Platform"
      headline="Onboard anyone,"
      headlineAccent="set by your risk rules."
      quote="Live in production at Boost (Axiata), Malaysia — merchant onboarding since March 2026."
      description="A configurable onboarding and verification platform for any customer, merchant, agent, or business. Each check is a building block, arranged into flows per country, entity type, and risk tier — from instant AI checks to live Video KYC."
      mockup="/merchant-ai-mockup.png"
      mockupAlt="Onboarding Platform"
      stats={stats}
      featuresSubheadline="Low-risk users complete automated eKYC in minutes; high-risk or regulator-mandated cases step up to Video KYC automatically."
      features={features}
      capabilitiesSubtext="Merchant onboarding was the first live use case. The same platform onboards customers, agents, businesses, citizens, and suppliers."
      capabilities={capabilities}
      relatedProducts={relatedProducts}
      ctaHeadline="Ready to automate onboarding?"
      insightsCategory="AI & ML"
    />
  )
}
