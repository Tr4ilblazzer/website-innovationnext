import { SolutionPageTemplate } from '@/components/sections/SolutionPageTemplate'

export default function StaffAugSolutionPage() {
  return (
    <SolutionPageTemplate
      tag="Staff Augmentation"
      headline="Nepal's top tech talent,"
      headlineAccent="on your team fast."
      subheadline='"Skip the hiring hassles. Work with vetted senior developers. Onboard in 2–4 weeks."'
      description="Put pre-screened senior engineers from Nepal's top talent pool directly on your team. Every developer is evaluated for technical proficiency, industry experience, and reliability. We match you to the right engineer within days — and our flexible contract terms let you ramp up or down as your project evolves."
      accentColor="#ec4899"
      icon="👥"
      stats={[
        { value: '2–4 wks', label: 'Average onboarding time' },
        { value: '< 1 wk', label: 'Average time to match' },
        { value: '100%', label: 'Pre-screened talent' },
        { value: '4', label: 'Engagement models available' },
      ]}
      features={[
        {
          title: 'AI & Data Engineers',
          description: 'Python, PyTorch, TensorFlow, MLOps, data engineering, computer vision, NLP, and LLM integration specialists.',
        },
        {
          title: 'Frontend Developers',
          description: 'React, Next.js, Vue.js, TypeScript, React Native — senior engineers who ship clean, production-grade UIs.',
        },
        {
          title: 'Backend Engineers',
          description: 'Node.js, Go, Java, Python, .NET, Laravel — API design, microservices, payment systems, and high-throughput backends.',
        },
        {
          title: 'Mobile Developers',
          description: 'Flutter, React Native, iOS (Swift), Android (Kotlin) — cross-platform and native mobile with fintech and enterprise experience.',
        },
        {
          title: 'Cloud & DevOps',
          description: 'AWS, Azure, GCP, Kubernetes, Docker, CI/CD, infrastructure-as-code, and security hardening specialists.',
        },
        {
          title: 'Data & BI Engineers',
          description: 'Power BI, Tableau, data warehousing, ETL pipelines, big data (Spark, Kafka), and master data management.',
        },
      ]}
      deployments={[
        {
          name: 'Monthly Contract',
          description: 'A dedicated developer on your payroll rhythm — billed monthly, with full integration into your team workflow, tools, and stand-ups.',
          tags: ['Flexible hours', 'Full integration', 'Cancel anytime'],
        },
        {
          name: 'Dedicated Team Model',
          description: 'A full embedded team — engineers, a tech lead, and QA — working exclusively on your product as an extension of your own organisation.',
          tags: ['Full team', 'Tech lead included', 'Aligned timezone'],
        },
        {
          name: 'Project-Based',
          description: 'Fixed-scope delivery for defined milestones. We scope, staff, build, and deliver — from discovery to handover.',
          tags: ['Fixed scope', 'Milestone delivery', 'Full accountability'],
        },
        {
          name: 'On-Demand Support',
          description: 'Ad-hoc technical resource for peak periods, specialist needs, or short-term gaps. Available within days.',
          tags: ['Fast activation', 'Short-term', 'Specialist roles'],
        },
      ]}
      capabilities={[
        'React / Next.js / Vue.js',
        'Node.js / Go / Python / Java',
        'Flutter / React Native',
        'AWS / Azure / GCP',
        'Kubernetes / Docker',
        'PostgreSQL / MongoDB / Redis',
        'Power BI / Tableau',
        'PyTorch / TensorFlow',
        'Solidity / Web3',
        'Odoo / ERP development',
        'DevSecOps',
        'Payment systems experience',
      ]}
    />
  )
}
