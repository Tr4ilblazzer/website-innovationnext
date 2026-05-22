import { SolutionPageTemplate } from '@/components/sections/SolutionPageTemplate'

const stats = [
  { value: '7+', label: 'Live government platforms' },
  { value: '5M+', label: 'Citizens served' },
  { value: '10+', label: 'Government agencies' },
  { value: 'Interpol', label: 'Integrated border security' },
]

const features = [
  { title: 'Citizen Super-App (Nagarik)', desc: 'National citizen platform covering national ID, PAN, voter card, driving licence, vehicle tax, KYC, vaccination certificates, and municipality services.' },
  { title: 'Immigration & Border Control', desc: 'Production border security platform with e-Visa, Interpol integration, Passport Reading Machines, biometric fingerprint, and camera systems.' },
  { title: 'Government e-Payment Platform', desc: 'Centralised digital payment gateway for government services — fee collection, tax clearance, fine payment, and utility billing at national scale.' },
  { title: 'PMO Monitoring System', desc: "Centralised monitoring dashboard for the Prime Minister's Office — tracking program delivery, KPIs, ministry-level reporting, and citizen feedback." },
  { title: 'Traffic Violation Management', desc: 'ANPR-enabled traffic violation detection, automated fine issuance, digital payment integration, and violation history management.' },
  { title: 'Smart Water Metering (IoT)', desc: 'IoT-based smart water infrastructure with real-time consumption monitoring, automated billing, leak detection, and remote valve control.' },
  { title: 'NOC Online Portal', desc: 'Digital No-Objection Certificate portal — online application, workflow routing, authority review, digital signature, and citizen notification.' },
  { title: 'Land Registration & Digitisation', desc: 'Land record digitisation, cadastral mapping, ownership transfer workflows, and integration with national identity databases.' },
  { title: 'Multi-Ministry Interoperability', desc: 'API-first integration layer connecting ministries, municipalities, banks, and national databases — enabling cross-agency service delivery.' },
]

const capabilities = [
  'National identity database integration',
  'Interpol API connectivity',
  'Biometric hardware integration',
  'eKYC and digital document fetch',
  'QR-based certificate issuance',
  'Offline-capable mobile platform',
  'USSD / low-bandwidth modes',
  'Multi-ministry API layer',
  'ANPR and camera systems',
  'IoT sensor & remote management',
  'Sovereign data compliance',
  'Government procurement navigation',
]

export default function EGovSolutionPage() {
  return (
    <SolutionPageTemplate
      tag="E-Governance & Digital Government"
      headline="We don't just design"
      headlineAccent="digital government."
      quote="We built the citizen platforms, immigration systems, and smart infrastructure that a government runs on."
      description="Innovation Next has built and deployed seven live e-governance products for the Government of Nepal — including the national Nagarik App, the Immigration System with Interpol integration, the PMO Monitoring System, and IoT-based smart infrastructure. These are live national systems, not case studies."
      heroImage="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900&q=80"
      heroImageAlt="E-Governance and digital government"
      stats={stats}
      featuresSubheadline="Every platform has been built and is live in production — serving millions of citizens under sovereign government oversight."
      features={features}
      capabilitiesSubtext="Every capability listed has been delivered in real, live systems — not in proof-of-concept environments."
      capabilities={capabilities}
      insightsCategory="E-Governance"
    />
  )
}
