import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { TrustedBySection } from '@/components/sections/TrustedBySection'
import { InsightsSection } from '@/components/sections/InsightsSection'
import { TechOrbit } from '@/components/ui/tech-orbit'

const ACCENT = '#0072BC'

const stats = [
  { value: '2–4 wks', label: 'Average onboarding time' },
  { value: '< 1 wk', label: 'Average time to match' },
  { value: '100%', label: 'Pre-screened talent' },
  { value: '4', label: 'Engagement models available' },
]

const features = [
  { title: 'AI & Data Engineers', desc: 'Python, PyTorch, TensorFlow, MLOps, data engineering, computer vision, NLP, and LLM integration specialists.' },
  { title: 'Frontend Developers', desc: 'React, Next.js, Vue.js, TypeScript, React Native — senior engineers who ship clean, production-grade UIs.' },
  { title: 'Backend Engineers', desc: 'Node.js, Go, Java, Python, .NET, Laravel — API design, microservices, payment systems, and high-throughput backends.' },
  { title: 'Mobile Developers', desc: 'Flutter, React Native, iOS (Swift), Android (Kotlin) — cross-platform and native mobile with fintech and enterprise experience.' },
  { title: 'Cloud & DevOps', desc: 'AWS, Azure, GCP, Kubernetes, Docker, CI/CD, infrastructure-as-code, and security hardening specialists.' },
  { title: 'Data & BI Engineers', desc: 'Power BI, Tableau, data warehousing, ETL pipelines, big data (Spark, Kafka), and master data management.' },
]

const engagements = [
  {
    title: 'Monthly Contract',
    desc: 'A dedicated developer on your payroll rhythm — billed monthly, with full integration into your team workflow, tools, and stand-ups.',
    tags: ['Flexible hours', 'Full integration', 'Cancel anytime'],
    image: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&q=80',
  },
  {
    title: 'Dedicated Team Model',
    desc: 'A full embedded team — engineers, a tech lead, and QA — working exclusively on your product as an extension of your organisation.',
    tags: ['Full team', 'Tech lead included', 'Aligned timezone'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  },
  {
    title: 'Project-Based',
    desc: 'Fixed-scope delivery for defined milestones. We scope, staff, build, and deliver — from discovery to handover.',
    tags: ['Fixed scope', 'Milestone delivery', 'Full accountability'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  },
  {
    title: 'On-Demand Support',
    desc: 'Ad-hoc technical resource for peak periods, specialist needs, or short-term gaps. Available within days.',
    tags: ['Fast activation', 'Short-term', 'Specialist roles'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
  },
]

const capabilities = [
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
]

export default function StaffAugSolutionPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="bg-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">

            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-5" style={{ color: ACCENT }}>
                Staff Augmentation
              </p>
              <h1 className="hero-heading text-[#0A0A0A] mb-5">
                Nepal's top tech talent,
                <br />
                <span className="gradient-text">on your team fast.</span>
              </h1>
              <p className="text-[#0A0A0A]/40 italic text-lg leading-relaxed mb-4">
                "Skip the hiring hassles. Work with vetted senior developers. Onboard in 2–4 weeks."
              </p>
              <p className="text-[#0A0A0A]/55 leading-relaxed mb-8">
                Put pre-screened senior engineers from Nepal's top talent pool directly on your team. Every developer is evaluated for technical proficiency, industry experience, and reliability. We match you to the right engineer within days — and our flexible contract terms let you ramp up or down as your project evolves.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/company" className="btn-secondary">Our Credentials</Link>
              </div>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
                alt="Staff augmentation team"
                className="w-full h-[520px] object-cover rounded-3xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-14 border-t border-black/[0.06]">
            {stats.map(s => (
              <div key={s.label}>
                <div className="text-3xl font-black mb-1" style={{ color: ACCENT }}>{s.value}</div>
                <div className="text-sm text-[#0A0A0A]/45 uppercase tracking-wide">{s.label}</div>
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
              Roles we <span className="section-accent">place.</span>
            </h2>
            <p className="text-[#0A0A0A]/50 text-base leading-relaxed">
              Every engineer has been evaluated against real production codebases — not just resumes and coding tests.
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
              Four flexible models — from a single embedded engineer to a full dedicated product team.
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
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/80 text-[#0072BC] font-medium border border-[#0072BC]/15">{t}</span>
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
              Stacks our engineers{' '}
              <span style={{ color: ACCENT }}>ship with.</span>
            </h2>
            <p className="text-[#0A0A0A]/50 max-w-xl mx-auto">
              36 technologies across frontend, backend, data, and cloud — every engineer is evaluated against real production codebases.
            </p>
          </div>
          <TechOrbit />
        </div>
      </section>


      {/* ── Trusted By ── */}
      <TrustedBySection />
      <InsightsSection category="Staff Augmentation" />

      {/* ── Technical depth + CTA ─────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="section-heading text-[#0A0A0A] mb-4">
                Built for production.
              </h2>
              <p className="text-[#0A0A0A]/50 text-lg leading-relaxed">
                Every engineer we place has hands-on experience with the stacks that run production systems.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {capabilities.map(c => (
                <div key={c} className="flex items-center gap-2.5">
                  <CheckCircle size={14} style={{ color: ACCENT }} className="flex-shrink-0" />
                  <span className="text-sm text-[#0A0A0A]/60">{c}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl p-12 text-center" style={{ background: ACCENT }}>
            <AnimatedBackground />
            <div className="relative z-10">
              <h2 className="section-heading text-white mb-3">Ready to get started?</h2>
              <p className="text-white/70 mb-8 max-w-lg mx-auto leading-relaxed">
                Talk to our team about your requirements. We'll tell you straight whether we're the right fit.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-[#040404] font-semibold text-sm py-3.5 px-8 hover:bg-white/90 transition-colors"
                >
                  Get in Touch <ArrowRight size={14} />
                </Link>
                <Link
                  to="/insights/case-studies"
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
