import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { TrustedBySection } from '@/components/sections/TrustedBySection'
import { GlassLocationCard } from '@/components/ui/glass-location-card'

const ACCENT = '#0072BC'

const pillars = [
  {
    label: 'We Partner',
    body: 'We work as an extension of your organization, not above it. From strategy to deployment, we share accountability for outcomes — not just deliverables.',
  },
  {
    label: 'We Illuminate',
    body: 'Experience from regulated, high-stakes environments shapes how we think. We bring that perspective to every problem — challenging assumptions and asking the questions that lead to better results.',
  },
  {
    label: 'We Grow',
    body: 'Every engagement is designed to leave your organization stronger. We are invested in your independence, not your dependency on us.',
  },
]

export default function CompanyPage() {
  return (
    <main className="bg-white">

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="bg-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">

            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-5" style={{ color: ACCENT }}>
                About Innovation Next
              </p>
              <h1 className="hero-heading text-[#0A0A0A] mb-5">
                Built by operators.
                <br />
                <span className="gradient-text">For operators.</span>
              </h1>
              <p className="text-[#0A0A0A]/40 italic text-lg leading-relaxed mb-4">
                "What separates us from every other technology vendor is operational depth."
              </p>
              <p className="text-[#0A0A0A]/55 leading-relaxed mb-8">
                Innovation Next is a full-stack digital technology company headquartered in Dubai, with a technology and delivery hub in Kathmandu, Nepal. We operate across six domains: Digital Financial Services, E-Governance, AI & ML, BI & Data, IT Services, and Staff Augmentation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn-secondary">Get in Touch</Link>
              </div>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80"
                alt="Innovation Next headquarters"
                className="w-full h-[520px] object-cover rounded-3xl"
              />
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-14 border-t border-black/[0.06]">
            {[
              { value: '20+', label: 'Years building at scale' },
              { value: '13M+', label: 'End users on our platforms' },
              { value: '$275M+', label: 'Monthly transactions processed' },
              { value: '7+', label: "Live gov't products" },
            ].map(s => (
              <div key={s.label}>
                <div className="text-3xl font-black mb-1" style={{ color: ACCENT }}>{s.value}</div>
                <div className="text-sm text-[#0A0A0A]/45 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Do / How We Work ──────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-3xl bg-[#EBF5FF] p-8 md:p-10 flex flex-col gap-5">
            <div className="grid md:grid-cols-2 gap-5">
              {/* What We Do */}
              <div className="bg-white rounded-2xl p-7">
                <div className="w-1.5 h-6 rounded-full mb-5" style={{ background: ACCENT }} />
                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>What We Do</p>
                <h2 className="text-xl font-black text-[#0A0A0A] leading-snug mb-3">
                  Full-stack technology, end to end.
                </h2>
                <p className="text-[#0A0A0A]/55 text-sm leading-relaxed">
                  We partner with banks, financial institutions, large enterprises, and governments to solve problems that matter. From architecture to launch, from scaling to ongoing operation — we own the outcome end to end.
                </p>
              </div>

              {/* How We Work */}
              <div className="bg-white rounded-2xl p-7">
                <div className="w-1.5 h-6 rounded-full mb-5" style={{ background: ACCENT }} />
                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>How We Work</p>
                <h2 className="text-xl font-black text-[#0A0A0A] leading-snug mb-3">
                  Not consultants. Partners.
                </h2>
                <p className="text-[#0A0A0A]/55 text-sm leading-relaxed">
                  We think alongside your leadership, bring domain expertise earned through real deployments, and stay to build, scale, and operate what we design together.
                </p>
              </div>
            </div>

            {/* Pillars */}
            <div className="grid md:grid-cols-3 gap-5">
              {pillars.map(p => (
                <div key={p.label} className="bg-white rounded-2xl p-7">
                  <div className="w-1.5 h-6 rounded-full mb-5" style={{ background: ACCENT }} />
                  <h4 className="text-base font-bold text-[#0A0A0A] mb-2">{p.label}</h4>
                  <p className="text-[#0A0A0A]/50 text-sm leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── Offices ───────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 grid md:grid-cols-2 md:items-end gap-6">
            <h2 className="section-heading text-[#0A0A0A]">
              Dubai + Kathmandu.
              <br />
              <span className="section-accent">Global reach.</span>
            </h2>
            <p className="text-[#0A0A0A]/50 text-base leading-relaxed">
              Headquartered in the Gulf, built in the Himalayas — serving clients across the Middle East, South Asia, and Southeast Asia.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                city: 'Dubai',
                country: 'United Arab Emirates',
                flag: '🇦🇪',
                role: 'Global Headquarters & Business Development',
                desc: 'Our commercial and client-facing hub — serving financial institutions and governments across the Middle East, Southeast Asia, and beyond.',
                badge: 'HQ',
                image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80',
              },
              {
                city: 'Kathmandu',
                country: 'Nepal',
                flag: '🇳🇵',
                role: 'Technology & Delivery Hub',
                desc: 'Our engineering and product delivery centre — home to senior developers, data engineers, and product specialists with deep domain expertise.',
                image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=900&q=80',
              },
            ].map(o => (
              <GlassLocationCard key={o.city} {...o} />
            ))}
          </div>
        </div>
      </section>


      {/* ── Trusted By ── */}
      <TrustedBySection />

      {/* ── Capabilities checklist ────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="section-heading text-[#0A0A0A] mb-4">
                Six domains.
                <br />
                <span style={{ color: ACCENT }}>One partner.</span>
              </h2>
              <p className="text-[#0A0A0A]/50 text-lg leading-relaxed">
                From regulated fintech infrastructure to national e-governance platforms — every domain has been delivered in production.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Digital Financial Services',
                'E-Governance & Digital Gov',
                'AI & Machine Learning',
                'BI & Data Solutions',
                'IT Services & Engineering',
                'Staff Augmentation',
                'PCI DSS certified infrastructure',
                'Central bank compliance',
                'Interpol-integrated systems',
                'National QR scheme deployment',
                'IoT & smart infrastructure',
                'Sovereign data compliance',
              ].map(c => (
                <div key={c} className="flex items-center gap-2.5">
                  <CheckCircle size={14} style={{ color: ACCENT }} className="flex-shrink-0" />
                  <span className="text-sm text-[#0A0A0A]/60">{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="relative overflow-hidden rounded-3xl p-12 text-center" style={{ background: ACCENT }}>
            <AnimatedBackground />
            <img
              src="/skyline.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
              style={{ mixBlendMode: 'multiply', opacity: 0.35, filter: 'hue-rotate(-30deg) saturate(2) brightness(1.3)' }}
            />
            <div className="relative z-10">
              <h2 className="section-heading text-white mb-3">Ready to work with us?</h2>
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
                  to="/careers"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 text-white font-semibold text-sm py-3.5 px-8 hover:bg-white/10 transition-colors"
                >
                  Join Our Team
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  )
}
