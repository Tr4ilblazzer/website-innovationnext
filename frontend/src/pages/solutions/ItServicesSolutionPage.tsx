import { SolutionPageTemplate } from '@/components/sections/SolutionPageTemplate'
import { TechOrbit } from '@/components/ui/tech-orbit'

export default function ItServicesSolutionPage() {
  return (
    <>
    <SolutionPageTemplate
      tag="IT Services"
      headline="From design to deploy —"
      headlineAccent="we build it all."
      subheadline='"A full-service digital and technology partner. From infrastructure to interfaces."'
      description="Innovation Next delivers end-to-end IT services — software development, mobile and web applications, infrastructure management, security, and legacy modernisation. We design, build, and secure the products and platforms that power your business."
      accentColor="#ef4444"
      icon="⚙️"
      stats={[
        { value: '100+', label: 'Projects delivered' },
        { value: '6', label: 'Specialist domains' },
        { value: 'Full-stack', label: 'Design through infrastructure' },
        { value: '20+', label: 'Technology partnerships' },
      ]}
      features={[
        {
          title: 'UI/UX Design & Brand',
          description: 'Visual identities, design systems, and product interfaces that communicate with clarity and intent — built for your users, not for awards.',
        },
        {
          title: 'Consumer & Enterprise Software',
          description: 'Bespoke web and mobile applications built from user research — from SaaS platforms to internal enterprise tooling.',
        },
        {
          title: 'Mobile App Development',
          description: 'Native iOS and Android, cross-platform Flutter and React Native — production-quality mobile apps with deep backend integration.',
        },
        {
          title: 'Frontend Web Development',
          description: 'High-performance, accessible web applications in React, Next.js, and Vue — optimised for speed, SEO, and conversion.',
        },
        {
          title: 'Backend & API Development',
          description: 'Scalable microservices and REST/GraphQL APIs in Node.js, Go, Python, Java, and .NET — built for high throughput and reliability.',
        },
        {
          title: 'Infrastructure & Cloud',
          description: 'Cloud architecture on AWS, Azure, or GCP — containerised with Kubernetes, secured, monitored, and designed to scale.',
        },
        {
          title: 'Security & Compliance',
          description: 'Penetration testing, security audits, ISO 27001 alignment, GDPR/data privacy compliance, and ongoing security monitoring.',
        },
        {
          title: 'Legacy Modernisation',
          description: 'Systematic migration from monolith or legacy systems to modern, cloud-native architectures — without disrupting live operations.',
        },
        {
          title: 'DevOps & CI/CD',
          description: 'Full DevOps pipeline — CI/CD automation, infrastructure-as-code, monitoring, alerting, and on-call engineering support.',
        },
      ]}
      capabilities={[
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
      ]}
    />

    {/* Tech Stack section */}
    <section className="py-24 border-t border-white/[0.06] relative overflow-hidden">
      <div className="glow-orb glow-blue w-[500px] h-[500px] -bottom-40 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="section-tag mx-auto mb-4" style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.08)' }}>
            Tech Stack
          </div>
          <h2 className="section-heading text-white mb-4">
            Built with the{' '}
            <span className="gradient-text">right tools.</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            24 technologies across frontend, backend, and cloud — chosen for production reliability, not resume padding.
          </p>

          {/* Orbit legend */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {[
              { label: 'Frontend & Mobile', color: '#3C53FF', r: 'Inner' },
              { label: 'Backend & Data',    color: '#8b5cf6', r: 'Middle' },
              { label: 'Cloud & DevOps',    color: '#10b981', r: 'Outer' },
            ].map(({ label, color, r }) => (
              <div key={r} className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                />
                <span className="text-xs text-white/40">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <TechOrbit />
      </div>
    </section>
    </>
  )
}
