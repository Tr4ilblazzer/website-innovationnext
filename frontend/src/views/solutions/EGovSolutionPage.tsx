'use client'


import { SolutionPageTemplate } from '@/components/sections/SolutionPageTemplate'

const features = [
  { title: 'Government Super App', desc: 'A single citizen entry point built as a Container App with a Mini-App framework — agencies publish their own services into it, instead of each running a separate app.' },
  { title: 'Digital Identity & Documents', desc: 'National digital ID integration and government documents — licences, permits, registrations — issued and accessed digitally as verifiable credentials.' },
  { title: 'Offline Verification', desc: 'Field officers verify citizen documents by QR without an internet connection, using W3C Verifiable Credentials.' },
  { title: 'Digital Revenue Collection', desc: 'Fees, fines, and charges paid through a national digital payment layer — connecting government services to the payment platforms citizens already use.' },
  { title: 'Traffic Violation Management', desc: 'Camera-based number-plate recognition, violation detection, digital penalty notices, online fine payment, and analytics on hotspots and revenue.' },
  { title: 'Governance Monitoring', desc: "Monitoring dashboards for programme delivery, KPIs, and ministry-level reporting — the analytics layer behind national programmes." },
]

const capabilities = [
  'Container App + Mini-App SDK',
  'National digital identity (OIDC / OAuth 2.0)',
  'W3C Verifiable Credentials',
  'Offline QR verification',
  'Flutter (iOS + Android) and React / Next.js web',
  'Government payment integration',
  'Push and SMS notifications',
  'ANPR and camera systems',
  'IoT sensor integration',
  'Government cloud and sovereign deployment',
  'Multi-year SLA support and maintenance',
  'Requirements to live operation, one team',
]

export default function EGovSolutionPage() {
  return (
    <SolutionPageTemplate
      title="E-Governance"
      description="We build government systems that citizens and public offices rely on every day: citizen apps, digital documents, monitoring dashboards, smart infrastructure and revenue collection."
      accentColor="#0A4FD6"
      heroImage="https://images.unsplash.com/photo-1550510537-89d5433de5cb?w=1600&q=80"
      heroImageAlt="A glass office tower seen from below against a blue sky"
      featuresSubheadline="The digital backbone of a modern government."
      features={features}
      capabilitiesSubtext="Delivered and operated in live government environments — not pilots or prototypes."
      capabilities={capabilities}
      insightsCategory="E-Governance"
    />
  )
}
