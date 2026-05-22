import { SolutionPageTemplate } from '@/components/sections/SolutionPageTemplate'

const stats = [
  { value: '100+', label: 'Projects delivered' },
  { value: '6', label: 'Specialist domains' },
  { value: 'Full-stack', label: 'Design through infrastructure' },
  { value: '20+', label: 'Technology partnerships' },
]

const features = [
  { title: 'UI/UX Design & Brand', desc: 'Visual identities, design systems, and product interfaces that communicate with clarity — built for your users, not for awards.' },
  { title: 'Consumer & Enterprise Software', desc: 'Bespoke web and mobile applications built from user research — from SaaS platforms to internal enterprise tooling.' },
  { title: 'Mobile App Development', desc: 'Native iOS and Android, cross-platform Flutter and React Native — production-quality apps with deep backend integration.' },
  { title: 'Frontend Web Development', desc: 'High-performance, accessible web applications in React, Next.js, and Vue — optimised for speed, SEO, and conversion.' },
  { title: 'Backend & API Development', desc: 'Scalable microservices and REST/GraphQL APIs in Node.js, Go, Python, Java, and .NET — built for high throughput and reliability.' },
  { title: 'Infrastructure & Cloud', desc: 'Cloud architecture on AWS, Azure, or GCP — containerised with Kubernetes, secured, monitored, and designed to scale.' },
  { title: 'Security & Compliance', desc: 'Penetration testing, security audits, ISO 27001 alignment, GDPR/data privacy compliance, and ongoing security monitoring.' },
  { title: 'Legacy Modernisation', desc: 'Systematic migration from monolith or legacy systems to modern, cloud-native architectures — without disrupting live operations.' },
  { title: 'DevOps & CI/CD', desc: 'Full DevOps pipeline — CI/CD automation, infrastructure-as-code, monitoring, alerting, and on-call engineering support.' },
]

const capabilities = [
  'React / Next.js / Vue.js',
  'Node.js / Go / Python / Java / .NET',
  'Flutter / React Native',
  'AWS / Azure / GCP',
  'Kubernetes / Docker / Terraform',
  'PostgreSQL / MongoDB / Redis',
  'REST / GraphQL / gRPC',
  'Figma / Design systems',
  'CI/CD — GitHub Actions / Jenkins',
  'ISO 27001 security alignment',
  'Penetration testing',
  'Performance & load testing',
]

export default function ItServicesSolutionPage() {
  return (
    <SolutionPageTemplate
      tag="IT Services"
      headline="From design to deploy —"
      headlineAccent="we build it all."
      quote="A full-service digital and technology partner. From infrastructure to interfaces."
      description="Innovation Next delivers end-to-end IT services — software development, mobile and web applications, infrastructure management, security, and legacy modernisation. We design, build, and secure the products and platforms that power your business."
      heroImage="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=80"
      heroImageAlt="Software development and IT services"
      stats={stats}
      featuresSubheadline="Every service has been delivered in production environments — from regulated fintech platforms to large-scale government systems."
      features={features}
      capabilitiesSubtext="Every capability listed has been delivered in real, live systems — not in proof-of-concept environments."
      capabilities={capabilities}
      showTechOrbit
      insightsCategory="IT Services"
    />
  )
}
