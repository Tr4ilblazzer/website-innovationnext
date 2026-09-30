import { SolutionPageTemplate } from '@/components/sections/SolutionPageTemplate'

const stats = [
  { value: '7', label: 'Engineering service areas' },
  { value: '3', label: 'Engagement models' },
  { value: 'WCAG 2.1 AA', label: 'Accessibility standard' },
  { value: 'OWASP Top 10', label: 'Built into delivery' },
]

const features = [
  { title: 'Custom Software Development', desc: 'Architecture, backend and microservices, integrations, agile delivery, QA, and warranty — starting from your BRD/SRS or a short discovery.' },
  { title: 'Mobile Applications', desc: 'Native iOS and Android, or React Native and Flutter, with offline capability, push notifications, and store deployment.' },
  { title: 'Web Platforms', desc: 'Progressive web apps, single-page applications, server-rendered sites, and government and bank portals.' },
  { title: 'Security Engineering', desc: 'Zero-trust design, threat modelling, penetration testing, identity and access management, and encryption and key management.' },
  { title: 'Legacy Modernisation', desc: 'Assessment, migration strategy, re-platforming, re-architecture, data migration, and cutover with parallel running.' },
  { title: 'QA & Testing', desc: 'Test strategy, manual and automated testing, performance and security testing, and CI/CD-integrated reporting.' },
  { title: 'DevOps & Platform Engineering', desc: 'CI/CD pipelines, release management, GitOps, developer portals, and observability.' },
]

const capabilities = [
  'Node.js / Python / Java / Go / .NET',
  'React / Vue.js / Angular',
  'React Native / Flutter / Swift / Kotlin',
  'PostgreSQL / MySQL / MongoDB / Redis',
  'Kafka / RabbitMQ',
  'AWS / Azure / GCP',
  'CI/CD — GitHub Actions / GitLab CI / Jenkins',
  'Playwright / Cypress / Appium',
  'JMeter / k6 performance testing',
  'Penetration testing',
  'Fixed-scope, time & materials, or hybrid',
  'Hand-over to Managed Services',
]

export default function BespokeSoftwareSolutionPage() {
  return (
    <SolutionPageTemplate
      tag="Bespoke Software Development"
      headline="Software made for how"
      headlineAccent="your institution works."
      quote="Where a need matches one of our platforms, we start from that product instead of from zero."
      description="Bespoke Software Development covers mobile, web, and backend platforms, security engineering, and legacy modernisation for banks, governments, and fintechs — built to the standard of our live national systems."
      heroImage="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=80"
      heroImageAlt="Software development"
      stats={stats}
      featuresSubheadline="Requirements come in from consulting, and live systems hand over to Managed Services for long-term operation."
      features={features}
      capabilitiesSubtext="The stacks and methods we deliver with across banks, government agencies, fintechs, telecoms, and microfinance institutions."
      capabilities={capabilities}
      showTechOrbit
      insightsCategory="Software Engineering"
    />
  )
}
