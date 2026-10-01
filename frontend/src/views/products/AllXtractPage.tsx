'use client'


import { ProductPageTemplate } from '@/components/sections/ProductPageTemplate'

const stats = [
  { value: '39', label: 'Ready-made workflow steps' },
  { value: '7', label: 'Actions that run on arrival' },
  { value: '51', label: 'Compliance comparison operators' },
  { value: 'API', label: 'Every workflow publishable as an authenticated endpoint' },
]

const features = [
  { title: 'Capture & Understand', desc: 'Documents arrive by upload, S3, Google Drive, Azure, shared mailbox, or API. Layout, tables, signatures, stamps and photographs are read — including scans and skewed phone photos.' },
  { title: 'Schema-Governed Extraction', desc: 'Define fields once in Extract Studio, or let AutoSchema draft them from a single example. Validation rules are enforced during extraction.' },
  { title: 'Search & Ask', desc: 'Ask questions in plain English across the whole corpus. Answers cite the page and highlight the exact region on the document.' },
  { title: 'Compare', desc: 'A three-phase diff between two versions of a document, with changes classed as material or cosmetic and scan noise ignored.' },
  { title: 'Layout-Preserving Translation', desc: 'Translated copies keep the original layout and tables. Amounts, dates and identifiers are protected, and names are transliterated across scripts.' },
  { title: 'Workflows & Automations', desc: 'Build pipelines in a steps view or on a canvas, or describe the outcome and let the AI builder draft it. Approval gates, branches, retries, schedules and webhooks included.' },
  { title: 'Compliance Rules', desc: 'Write rules as sentences, check document sets for completeness, and get pass/fail verdicts that show the exact values compared.' },
  { title: 'E-Sign', desc: 'Envelopes with sequential or parallel routing, reminders and expiry, a certificate of completion, and a tamper-evident SHA-256 seal.' },
  { title: 'Redaction & Privacy', desc: 'Three tiers of visibility — organisation rules, managed policies and personal sets — with expiring share links. Redacted content is removed, not hidden.' },
]

const capabilities = [
  'Documents in, decisions out — no manual data entry',
  'Workflows published as authenticated APIs',
  'Immutable audit trail on every step',
  'Role-based access and workspace isolation',
  'S3, Google Drive, Azure, SFTP, IMAP and PostgreSQL connectors',
  'Face and layout similarity search',
  'Custom functions in a WASM sandbox',
  'API access to every capability',
]

const relatedProducts = [
  { name: 'Onboarding Platform', href: '/products/onboarding', desc: 'KYC, KYB, and Video KYC' },
  { name: 'Groot Neo', href: '/products/groot-neo', desc: 'Neo-banking platform' },
  { name: 'Groot Pay', href: '/products/groot-pay', desc: 'Digital wallet infrastructure' },
]

export default function AllXtractPage() {
  return (
    <ProductPageTemplate
      tag="Document Intelligence Platform"
      headline="Documents in."
      headlineAccent="Decisions out."
      quote="Your documents, read, checked, and routed without a data-entry team."
      description="allXtract is a document operating system: it captures documents, understands their layout and content, extracts structured data, checks it against your rules, and routes the result — to approval, to your ERP, or out for e-signature."
      mockup="/allxtract-mockup.svg"
      mockupAlt="allXtract workspace"
      mockupHeight="h-[460px]"
      stats={stats}
      featuresSubheadline="Capture, understand, decide, act — one platform, with an audit trail on every step."
      features={features}
      capabilitiesSubtext="Built for invoices, contracts, identity papers, claims and customs forms — in finance, banking, legal and operations."
      capabilities={capabilities}
      relatedProducts={relatedProducts}
      insightsCategory="AI & ML"
    />
  )
}
