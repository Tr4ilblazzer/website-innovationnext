'use client'


import { SolutionPageTemplate } from '@/components/sections/SolutionPageTemplate'

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
      title="Bespoke Software Development"
      description="Bespoke Software Development covers mobile, web, and backend platforms, security engineering, and legacy modernisation for banks, governments, and fintechs — built to the standard of our live national systems."
      heroImage="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1600&q=80"
      heroImageAlt="Software development"
      featuresSubheadline="Solutions to the technology challenges that hold businesses back, from outdated systems to operational challenges, supporting them through long-term operations."
      features={features}
      capabilitiesSubtext="The stacks and methods we deliver with across banks, government agencies, fintechs, telecoms, and microfinance institutions."
      capabilities={capabilities}
      showTechOrbit
      insightsCategory="Software Engineering"
    />
  )
}
