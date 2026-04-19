import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function CompanyPage() {
  return (
    <main className="pt-32 pb-0 relative">
      <div className="glow-orb glow-blue w-[600px] h-[600px] top-0 left-1/4 opacity-10 pointer-events-none" />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pb-20 border-b border-white/[0.06]">
        <div className="max-w-3xl">
          <div className="section-tag mb-6">About Innovation Next</div>
          <h1 className="hero-heading text-white mb-6">
            Built by operators.
            <br />
            <span className="gradient-text">For operators.</span>
          </h1>
          <p className="text-white/50 text-xl leading-relaxed mb-4">
            Innovation Next is a full-stack digital technology company headquartered in Dubai, with a technology and delivery hub in Kathmandu, Nepal. We operate across six domains: Digital Financial Services, E-Governance, AI & ML, BI & Data, IT Services, and Staff Augmentation.
          </p>
          <p className="text-white/40 text-lg leading-relaxed">
            What separates us from every other technology vendor is operational depth. Our founders didn't just advise on digital finance — they co-founded South Asia's first digital wallet and Nepal's national payment switch. We bring that infrastructure-grade experience to every engagement.
          </p>
        </div>
      </section>

      {/* Key facts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { value: '20+', label: 'Years building at scale', sub: 'Since 2002' },
              { value: '13M+', label: 'End users on our platforms', sub: 'Across South Asia' },
              { value: '$275M+', label: 'Monthly transactions', sub: 'Processed on our infrastructure' },
              { value: '7+', label: 'Live gov\'t products', sub: 'In production today' },
            ].map(s => (
              <div key={s.label} className="glass-card p-7 text-center">
                <div className="stat-number gradient-text mb-2">{s.value}</div>
                <div className="text-sm font-semibold text-white mb-1">{s.label}</div>
                <div className="text-xs text-white/30">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder credentials */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#e5e5e5] rounded-t-[4rem]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="section-tag mb-6" style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.08)', color: '#040404' }}>
            Founder Credentials
          </div>
          <h2 className="font-black text-[#040404] mb-4" style={{ fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.03em' }}>
            Not consultants. Builders.
          </h2>
          <p className="text-[#040404]/60 text-lg max-w-2xl mb-12 leading-relaxed">
            Our leadership team co-founded two of South Asia's most consequential financial infrastructure platforms — under central bank regulation, at national scale, from zero to millions of users.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: 'eSewa',
                sub: 'South Asia\'s First Digital Wallet',
                desc: 'Launched in 2009 as Nepal\'s first licensed Payment Service Provider. Scaled to 13M+ customers, 80%+ market share, and 3.5M+ daily transactions. Pioneer of digital remittance, connecting to HomeSend (2011), Western Union (2013), and 20+ global remittance companies.',
                stats: [['13M+', 'Customers'], ['80%+', 'Market share'], ['250K', 'Agents'], ['3M+', 'Merchants']],
                color: '#3C53FF',
              },
              {
                name: 'Fonepay',
                sub: 'Nepal\'s National Payment Switch',
                desc: 'Co-founded as the first non-card-based PSO licensed by Nepal Rastra Bank. The first payment infrastructure in Nepal to achieve PCI DSS certification. The interoperable backbone connecting virtually all of Nepal\'s banking institutions across QR, interbank, NFC, and card rails.',
                stats: [['52+', 'Banks integrated'], ['$275M+', 'Monthly txns'], ['PCI DSS', 'Certified'], ['20M+', 'Customers']],
                color: '#10b981',
              },
            ].map(c => (
              <div key={c.name} className="bg-[#040404] rounded-3xl p-8">
                <div className="text-white/30 text-xs font-mono uppercase tracking-widest mb-2">Founder Credential</div>
                <h3 className="text-white font-black text-2xl mb-1">{c.name}</h3>
                <p className="text-white/40 text-sm mb-4">{c.sub}</p>
                <p className="text-white/55 text-sm leading-relaxed mb-6">{c.desc}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {c.stats.map(([v, l]) => (
                    <div key={l} className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.06] text-center">
                      <div className="font-black text-lg" style={{ color: c.color }}>{v}</div>
                      <div className="text-white/30 text-xs">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-tag mb-6">Our Offices</div>
          <h2 className="section-heading text-white mb-10">
            Dubai + Kathmandu.
            <br />
            <span className="gradient-text">Global reach.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { city: 'Dubai', country: 'United Arab Emirates', flag: '🇦🇪', role: 'Global Headquarters & Business Development', desc: 'Our commercial and client-facing hub — serving financial institutions and governments across the Middle East, Southeast Asia, and beyond.', badge: 'HQ' },
              { city: 'Kathmandu', country: 'Nepal', flag: '🇳🇵', role: 'Technology & Delivery Hub', desc: 'Our engineering and product delivery centre — home to senior developers, data engineers, and product specialists with deep domain expertise.' },
            ].map(o => (
              <div key={o.city} className="glass-card p-8">
                <div className="flex items-start justify-between mb-5">
                  <span className="text-4xl">{o.flag}</span>
                  {o.badge && (
                    <span className="text-xs px-2.5 py-1 rounded-full gradient-bg text-black font-bold uppercase tracking-wider">{o.badge}</span>
                  )}
                </div>
                <h3 className="text-xl font-black text-white mb-1">{o.city}</h3>
                <p className="text-white/40 text-sm mb-3">{o.country} · {o.role}</p>
                <p className="text-white/45 text-sm leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-card p-12 text-center relative overflow-hidden">
            <div className="glow-orb glow-blue w-64 h-64 absolute top-0 left-1/2 -translate-x-1/2 opacity-30" />
            <div className="relative z-10">
              <h2 className="section-heading text-white mb-4">
                Ready to work with us?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="btn-primary text-base py-3.5 px-8">
                  Get in Touch <ArrowRight size={16} />
                </Link>
                <Link to="/careers" className="btn-secondary text-base py-3.5 px-8">
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
