export function CredentialsSection() {
  const cards = [
    {
      label: 'Founder Credential · Fintech',
      title: "South Asia's First Digital Wallet",
      subtitle: 'Co-founded by Innovation Next leadership · Licensed by central bank',
      accent: '#3C53FF',
      glowColor: 'rgba(60,83,255,0.35)',
      stats: [
        { v: '13M+', l: 'Customers' },
        { v: '80%+', l: 'Market share' },
        { v: '3.5M+', l: 'Daily txns' },
      ],
    },
    {
      label: 'Founder Credential · Fintech',
      title: 'National Payment Switch',
      subtitle: 'First non-card PSO · Nepal Rastra Bank licensed',
      accent: '#10b981',
      glowColor: 'rgba(16,185,129,0.35)',
      stats: [
        { v: '52+', l: 'Banks' },
        { v: '$275M+', l: 'Monthly' },
        { v: 'PCI DSS', l: 'Certified' },
      ],
    },
    {
      label: 'Live Deployment · E-Governance',
      title: 'Government of Nepal',
      subtitle: '7 platforms live across ministries and agencies',
      accent: '#8b5cf6',
      glowColor: 'rgba(139,92,246,0.35)',
      stats: [
        { v: '7+', l: 'Live platforms' },
        { v: '5M+', l: 'Citizens served' },
        { v: '10+', l: 'Gov. agencies' },
      ],
    },
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Light contrast bg */}
      <div className="absolute inset-0 bg-[#e8e8e8] rounded-t-[4rem]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <h2 className="text-[#040404] font-black leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', maxWidth: '36rem' }}
          >
            Built by operators who{' '}
            <span
              className="italic"
              style={{
                background: 'linear-gradient(135deg, #3C53FF, #0DFFFF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              transformed how nations
            </span>{' '}
            work and pay.
          </h2>
          <p className="text-[#040404]/55 text-base leading-relaxed max-w-sm lg:text-right">
            Not consultants who advised on it. Builders who designed, launched, and operated digital infrastructure at national scale — across finance, government, and enterprise.
          </p>
        </div>

        {/* Process steps — horizontal row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {[
            { num: '01', title: "Built South Asia's first digital wallet", body: 'eSewa — first licensed digital payment platform, scaling to 13M+ users and 80%+ market share.' },
            { num: '02', title: "Launched Nepal's national payment switch", body: 'Fonepay — first non-card PSO by Nepal Rastra Bank — connecting 52+ banks, $275M+ monthly.' },
            { num: '03', title: 'Delivered live e-governance platforms', body: 'Seven government platforms in production, serving 5M+ citizens across Nepal.' },
            { num: '04', title: 'Now deploying that experience globally', body: 'Infrastructure-grade expertise for banks, governments, and enterprises across Southeast Asia and the Middle East.' },
          ].map(step => (
            <div key={step.num} className="flex flex-col gap-3">
              <div className="w-9 h-9 rounded-full bg-[#040404] flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-black text-white font-mono">{step.num}</span>
              </div>
              <h4 className="text-[#040404] font-bold text-sm leading-snug">{step.title}</h4>
              <p className="text-[#040404]/50 text-xs leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>

        {/* Credential cards — flex row inspired by prebuilt feature-sections layout */}
        <div className="flex flex-wrap items-start justify-center gap-6 mb-10">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex-1 min-w-[280px] max-w-[360px] hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Visual top — dark card with stats */}
              <div className="rounded-2xl bg-[#040404] p-6 relative overflow-hidden mb-4">
                {/* Accent glow */}
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[60px] pointer-events-none"
                  style={{ background: card.glowColor }}
                />
                {/* Top line accent */}
                <div
                  className="w-8 h-0.5 rounded-full mb-5 relative z-10"
                  style={{ background: `linear-gradient(90deg, ${card.accent}, transparent)` }}
                />
                <div className="relative z-10 grid grid-cols-3 gap-3">
                  {card.stats.map(s => (
                    <div key={s.l} className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.06]">
                      <div className="text-lg font-black leading-none mb-0.5" style={{ color: card.accent }}>{s.v}</div>
                      <div className="text-white/35 text-xs">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Text below — mirrors prebuilt component's title + desc below image */}
              <div className="text-[#040404]/40 text-xs font-mono uppercase tracking-widest mb-1">{card.label}</div>
              <h3 className="text-[#040404] font-bold text-base leading-snug mb-1">{card.title}</h3>
              <p className="text-[#040404]/50 text-sm leading-relaxed">{card.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="bg-gradient-to-br from-[#3C53FF] to-[#0DFFFF] rounded-3xl p-8 max-w-3xl mx-auto text-center">
          <p className="text-black font-semibold text-base leading-relaxed italic mb-4">
            "We don't just advise on digital transformation. We've built the infrastructure that runs a country's financial system and government services — and we deploy that same capability for you."
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-black/40" />
            <span className="text-black/60 text-xs font-semibold tracking-wide uppercase">Innovation Next Leadership</span>
          </div>
        </div>

      </div>
    </section>
  )
}
