import { SolutionPageTemplate } from '@/components/sections/SolutionPageTemplate'

export default function EGovSolutionPage() {
  return (
    <SolutionPageTemplate
      tag="E-Governance & Digital Government"
      headline="We don't just design"
      headlineAccent="digital government."
      subheadline='"We built the citizen platforms, immigration systems, and smart infrastructure that a government runs on — and we deploy that same production experience for you."'
      description="Innovation Next has built and deployed seven live e-governance products for the Government of Nepal — including the national Nagarik App, the Immigration System with Interpol integration, the PMO Monitoring System, and IoT-based smart infrastructure. These are live national systems, not case studies."
      accentColor="#10b981"
      icon=""
      features={[
        {
          title: 'Citizen Super-App (Nagarik)',
          description: 'National citizen platform covering national ID, PAN, voter card, driving licence, vehicle tax, KYC, vaccination certificates, and municipality services.',
        },
        {
          title: 'Immigration & Border Control',
          description: 'Production border security platform with e-Visa, Interpol integration, Passport Reading Machines (PRM), biometric fingerprint, and camera systems.',
        },
        {
          title: 'Government e-Payment Platform',
          description: 'Centralised digital payment gateway for government services — fee collection, tax clearance, fine payment, and utility billing at national scale.',
        },
        {
          title: 'PMO Monitoring System',
          description: 'Centralised monitoring dashboard for the Prime Minister\'s Office — tracking program delivery, KPIs, ministry-level reporting, and citizen feedback.',
        },
        {
          title: 'Traffic Violation Management',
          description: 'ANPR-enabled traffic violation detection, automated fine issuance, digital payment integration, and violation history management across traffic authorities.',
        },
        {
          title: 'Smart Water Metering (IoT)',
          description: 'IoT-based smart water infrastructure with real-time consumption monitoring, automated billing, leak detection, and remote valve control.',
        },
        {
          title: 'NOC Online Portal',
          description: 'Digital No-Objection Certificate portal — online application, workflow routing, authority review, digital signature, and citizen notification.',
        },
        {
          title: 'Land Registration & Digitisation',
          description: 'Land record digitisation, cadastral mapping, ownership transfer workflows, and integration with national identity databases.',
        },
        {
          title: 'Multi-Ministry Interoperability',
          description: 'API-first integration layer connecting ministries, municipalities, banks, and national databases — enabling cross-agency service delivery.',
        },
      ]}
      deployments={[
        {
          name: 'Nagarik App — National Citizen Super-App',
          description: 'The Government of Nepal\'s unified digital citizen platform. Single access point for national ID, PAN, voter card, driving licence, vehicle tax, vaccination certificates, online KYC, and direct government benefit access. Available on Android and iOS.',
          tags: ['15M+ citizens', 'GoN certified', 'Android & iOS', 'National deployment'],
        },
        {
          name: 'Immigration System — Interpol Integrated',
          description: 'Full production border control system integrated with Interpol\'s international database. Covers e-Visa issuance, visa verification, PRM hardware integration, biometric fingerprint scanning, and national border security access control.',
          tags: ['Interpol integrated', 'Biometric', 'e-Visa', 'Border security'],
        },
        {
          name: 'PMO Monitoring System',
          description: 'Executive monitoring platform for the Prime Minister\'s Office of Nepal — tracking government program delivery, ministry KPIs, and citizen outcome metrics in real time.',
          tags: ['OPMCM', 'Executive dashboard', 'Ministry-wide', 'Real-time KPIs'],
        },
        {
          name: 'Traffic Violation Management System',
          description: 'ANPR-enabled automated traffic enforcement system with fine issuance, digital payment integration via national payment rails, and violation record management.',
          tags: ['ANPR', 'Digital payments', 'Automated enforcement', 'GoN'],
        },
        {
          name: 'Smart Water Meter (IoT)',
          description: 'IoT-based smart water infrastructure deployed with the Government of Nepal — real-time consumption monitoring, automated billing, and remote management.',
          tags: ['IoT', 'Smart infrastructure', 'Real-time billing', 'GoN'],
        },
        {
          name: 'Government e-Payment Platform',
          description: 'National digital payment gateway for government service fees — integrating with NRB payment rails and connecting citizens, municipalities, and ministries.',
          tags: ['National payment gateway', 'NRB rails', 'Municipality integration'],
        },
      ]}
      capabilities={[
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
      ]}
    />
  )
}
