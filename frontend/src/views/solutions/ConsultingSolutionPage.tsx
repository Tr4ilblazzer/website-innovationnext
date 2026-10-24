'use client'


import { SolutionPageTemplate } from '@/components/sections/SolutionPageTemplate'

const features = [
  { title: 'Strategy & Transformation Advisory', desc: 'Digital readiness assessment, phased transformation roadmap, sector strategy, regulatory and licensing preparation, and vendor or technology selection.' },
  { title: 'Business Requirements & Specifications', desc: 'BRDs, SRSs, and API and integration specifications — with atomic, testable functional requirements and acceptance criteria.' },
  { title: 'End-to-End Traceability', desc: 'User flows for citizens, customers, and operators, and a requirements traceability matrix from requirement to design, build, and test.' },
  { title: 'Process Optimisation', desc: 'AS-IS mapping, TO-BE design around digital channels, gap analysis, automation opportunities, and change and adoption planning.' },
  { title: 'Architecture & Compliance Assurance', desc: 'Solution architecture documents, independent technical review, and compliance gap assessment against ISO 27001, PCI DSS, and SOC 2.' },
  { title: 'Project Management Consultancy', desc: 'Programme governance, vendor oversight against scope and SLA, and progress reporting for funded programmes and ministries.' },
]

const capabilities = [
  'Business Requirements Documents (BRD)',
  'Software Requirements Specifications (SRS)',
  'Functional requirements register',
  'Requirements traceability matrix (RTM)',
  'User flows and journeys',
  'API and integration specifications',
  'AS-IS / TO-BE process design',
  'Gap analysis',
  'Solution architecture documents',
  'Compliance gap assessment',
  'Programme governance and reporting',
  'Vendor oversight',
]

export default function ConsultingSolutionPage() {
  return (
    <SolutionPageTemplate
      title="Digital Transformation Consulting"
      description="Digital Transformation Consulting helps banks and governments define what to build before they build it — business requirements, system specifications, and redesigned processes, written by the team that builds and runs national systems."
      accentColor="#0A4FD6"
      heroImage="https://images.unsplash.com/photo-1617526738882-1ea945ce3e56?w=1600&q=80"
      heroImageAlt="Consulting workshop"
      featuresSubheadline="Consulting — a flexible standalone engagement or a path into build and run, with the same team carrying the context throughout."
      features={features}
      capabilitiesSubtext="The method our own delivery teams work from — and where requirements match one of our platforms, the specification maps directly to that product's modules."
      capabilities={capabilities}
      insightsCategory="Consulting"
    />
  )
}
