'use client'


import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { TrustedBySection } from '@/components/sections/TrustedBySection'
import { InsightsSection } from '@/components/sections/InsightsSection'
import { TechOrbit } from '@/components/ui/tech-orbit'

const ACCENT = '#0040C1'

const stats = [
  { value: '10', label: 'Government systems under maintenance' },
  { value: '36 mo', label: 'SLA term, Sri Lanka' },
  { value: '99.99%', label: 'Availability SLA, Sri Lanka' },
  { value: '2–4 wks', label: 'Team onboarding time' },
]

const features = [
  { title: 'Dedicated Engineers', desc: 'Pre-vetted engineers from Kathmandu embedded in your team — backend, frontend, mobile, data, QA, DevOps, and fintech specialists.' },
  { title: 'Team Pods', desc: 'A complete pod of engineering, QA, and project management, managed by Innovation Next for product squads.' },
  { title: 'Embedded Leadership', desc: 'A senior architect or tech lead embedded to lead your engineering work.' },
  { title: 'Application Management', desc: 'Tiered L1–L3 support, annual maintenance contracts, incident and release management, and monthly SLA reporting.' },
  { title: 'Infrastructure Management', desc: 'Cloud and hybrid operations, managed Kubernetes, backup and disaster recovery, monitoring, and sovereign-cloud environments.' },
  { title: 'Managed Security', desc: 'SIEM operation, incident response, and security training for development and operations teams.' },
]

const engagements = [
  {
    title: 'Dedicated Engineer(s)',
    desc: 'Individual engineers embedded in your team, billed per resource per month, integrated into your tools and stand-ups.',
    tags: ['Per resource per month', 'Full integration', 'Ongoing extension'],
    image: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&q=80',
  },
  {
    title: 'Dedicated Team Pod',
    desc: 'A complete pod — engineering, QA, and project management — managed by Innovation Next, working on your product.',
    tags: ['Monthly team rate', 'Tech lead included', 'Product squads'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  },
  {
    title: 'Embedded Leadership',
    desc: 'A senior architect or tech lead embedded to lead your engineering, where you need technical leadership.',
    tags: ['Senior rate', 'Architecture', 'Technical direction'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  },
  {
    title: 'Application & Infrastructure Management',
    desc: 'We operate your live systems against an agreed SLA — support, maintenance, infrastructure, and reporting. We own the outcome.',
    tags: ['SLA-governed', 'AMC', 'L1–L3 support'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
  },
]

const capabilities = [
  'Node.js / Python / Java / Go / .NET',
  'React / Vue.js / Angular / Next.js',
  'React Native / Flutter / Swift / Kotlin',
  'AWS / Azure / GCP',
  'Kubernetes / Terraform / CI/CD',
  'Power BI / Tableau / data engineering',
  'TensorFlow / PyTorch / MLOps',
  'Payment switch and QR / card rails',
  'Core banking integration',
  'SIEM and incident response',
  'PCI DSS / KYC-AML compliance engineering',
  'Replacement guarantee',
]

export default function ManagedServicesSolutionPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="bg-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">

            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-5" style={{ color: ACCENT }}>
                Managed Services
              </p>
              <h1 className="hero-heading text-[#0A0A0A] mb-5">
                Managed teams and
                <br />
                <span className="gradient-text">managed operations.</span>
              </h1>
              <p className="text-[#0A0A0A]/40 italic text-lg leading-relaxed mb-4">
                "We keep national systems running — and put the engineers you need on your team."
              </p>
              <p className="text-[#0A0A0A]/55 leading-relaxed mb-8">
                Managed Services has two service lines. Managed Teams: dedicated engineers and pods from Kathmandu work inside your programme while you direct the work. Application & Infrastructure Management: we operate your live systems against an agreed SLA and own the outcome. Our team works from Kathmandu (UTC+5:45), overlapping the Middle East and Asia.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/company" className="btn-secondary">Our Credentials</Link>
              </div>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
                alt="Managed services team"
                className="w-full h-[520px] object-cover rounded-3xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-14 border-t border-black/[0.06] text-center">
            {stats.map(s => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-medium mb-1" style={{ color: ACCENT }}>{s.value}</div>
                <div className="text-sm text-[#575757]">{s.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Talent Roles ──────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 grid md:grid-cols-2 md:items-end gap-6">
            <h2 className="section-heading text-[#0A0A0A]">
              What we <span className="section-accent">deliver.</span>
            </h2>
            <p className="text-[#0A0A0A]/50 text-base leading-relaxed">
              Two service lines under one roof — people for your programme, and operations for your live systems.
            </p>
          </div>
          <div className="rounded-3xl bg-[#EBF5FF] p-8 md:p-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map(f => (
                <div key={f.title} className="bg-white rounded-2xl p-7">
                  <div className="w-1.5 h-6 rounded-full mb-5" style={{ background: ACCENT }} />
                  <h3 className="text-base font-bold text-[#0A0A0A] mb-2">{f.title}</h3>
                  <p className="text-sm text-[#0A0A0A]/50 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Engagement Models ─────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 grid md:grid-cols-2 md:items-end gap-6">
            <h2 className="section-heading text-[#0A0A0A]">
              How we <span className="section-accent">engage.</span>
            </h2>
            <p className="text-[#0A0A0A]/50 text-base leading-relaxed">
              From a single embedded engineer to full operation of a live system.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {engagements.map(e => (
              <div key={e.title} className="relative rounded-3xl overflow-hidden h-[380px]">
                <img
                  src={e.image}
                  alt={e.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute inset-x-4 bottom-4 rounded-2xl p-6"
                  style={{ background: 'rgba(255,255,255,0.76)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' }}
                >
                  <div className="w-1.5 h-5 rounded-full mb-4" style={{ background: ACCENT }} />
                  <h3 className="text-base font-bold text-[#0A0A0A] mb-2">{e.title}</h3>
                  <p className="text-sm text-[#0A0A0A]/55 leading-relaxed mb-4">{e.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {e.tags.map(t => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/80 text-[#0040C1] font-medium border border-[#0040C1]/15">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ────────────────────────────────── */}
      <section className="py-16 bg-[#EBF5FF] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="section-heading text-[#0A0A0A] mb-4">
              Stacks we work{' '}
              <span style={{ color: ACCENT }}>with.</span>
            </h2>
            <p className="text-[#0A0A0A]/50 max-w-xl mx-auto">
              36 technologies across frontend, backend, data, and cloud.
            </p>
          </div>
          <TechOrbit />
        </div>
      </section>


      {/* ── Trusted By ── */}
      <TrustedBySection />
      <InsightsSection category="Managed Services" />

      {/* ── Technical depth + CTA ─────────────────────── */}
      <section className="bg-[#FAFAFA] py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-14">
          <div className="max-w-3xl text-center">
            <p className="text-xs font-medium mb-2" style={{ color: ACCENT }}>Capabilities</p>
            <h2 className="text-3xl md:text-[38px] md:leading-[46px] font-medium text-[#0A0A0A] mb-4">
              Built for <span style={{ color: ACCENT }}>production.</span>
            </h2>
            <p className="text-base leading-6 text-[#575757]">
              Our engineers and operators work with the stacks that run production systems.
            </p>
          </div>
          <div className="w-full flex flex-wrap justify-center gap-x-10 gap-y-5">
            {capabilities.map(c => (
              <div key={c} className="flex items-center gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: ACCENT }}>
                  <Check size={14} className="text-white" />
                </span>
                <span className="text-base text-[#0A0A0A]">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="relative overflow-hidden rounded-3xl p-12 text-center" style={{ background: '#0040C1' }}>
            <AnimatedBackground />
            <div className="relative z-10">
              <h2 className="section-heading text-white mb-3">Ready to get started?</h2>
              <p className="text-white/70 mb-8 max-w-lg mx-auto leading-relaxed">
                Talk to our team about your requirements. We'll tell you straight whether we're the right fit.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-[#040404] font-semibold text-sm py-3.5 px-8 hover:bg-white/90 transition-colors"
                >
                  Get in Touch <ArrowRight size={14} />
                </Link>
                <Link
                  href="/insights/case-studies"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 text-white font-semibold text-sm py-3.5 px-8 hover:bg-white/10 transition-colors"
                >
                  View Case Studies
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
