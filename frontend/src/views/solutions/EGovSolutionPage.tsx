'use client'


import { SolutionPageTemplate } from '@/components/sections/SolutionPageTemplate'

const stats = [
  { value: '7', label: 'Live national deployments' },
  { value: '15M+', label: 'Citizens served' },
  { value: '99.99%', label: 'Availability SLA (Sri Lanka)' },
  { value: 'Sri Lanka', label: 'Super App now in delivery' },
]

const features = [
  { title: 'Government Super App', desc: 'A single citizen entry point built as a Container App with a Mini-App framework — agencies publish their own services into it, instead of each running a separate app.' },
  { title: 'Digital Identity & Documents', desc: 'National digital ID integration and government documents — licences, permits, registrations — issued and accessed digitally as verifiable credentials.' },
  { title: 'Offline Verification', desc: 'Field officers verify citizen documents by QR without an internet connection, using W3C Verifiable Credentials.' },
  { title: 'e-Services & Grievance Redressal', desc: 'Online applications for government services, complaint submission and tracking, and push notifications from departments.' },
  { title: 'Digital Revenue Collection', desc: 'Fees, fines, and charges paid through a national digital payment layer — connecting government services to the payment platforms citizens already use.' },
  { title: 'Traffic Violation Management', desc: 'Camera-based number-plate recognition, violation detection, digital penalty notices, online fine payment, and analytics on hotspots and revenue.' },
  { title: 'Governance Monitoring', desc: "Monitoring dashboards for programme delivery, KPIs, and ministry-level reporting — the analytics layer behind national programmes." },
  { title: 'Smart Infrastructure', desc: 'IoT-based public infrastructure with real-time monitoring, automated billing, and remote management.' },
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
      tag="E-Governance"
      headline="Seven live national deployments,"
      headlineAccent="from citizen app to PMO."
      quote="Systems built for daily use by millions of citizens and tens of thousands of government officers."
      description="Innovation Next delivers complete, live, national-scale government systems — citizen super-apps, digital documents, governance monitoring, smart infrastructure, and digital revenue collection. The Government Super App is now in delivery in Sri Lanka."
      accentColor="#0040C1"
      heroImage="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900&q=80"
      heroImageAlt="E-Governance and digital government"
      stats={stats}
      featuresSubheadline="The same engineering discipline that built national payment systems, applied to citizen services, security, and public infrastructure."
      features={features}
      capabilitiesSubtext="Delivered and operated in live government environments — not pilots or prototypes."
      capabilities={capabilities}
      insightsCategory="E-Governance"
    />
  )
}
