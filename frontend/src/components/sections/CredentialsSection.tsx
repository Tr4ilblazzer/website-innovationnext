export function CredentialsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0A0A0A]/30 mb-5">
              Founder Credentials
            </p>
            <h2
              className="text-[#0A0A0A] font-black leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              Built by operators who ran a nation's financial infrastructure.
            </h2>
            <p className="text-[#0A0A0A]/55 text-base leading-relaxed mb-10">
              Not consultants who advised on it. Not vendors who packaged it. Builders who launched it, scaled it, and operated it under central bank oversight.
            </p>

            <div className="space-y-8">
              {[
                {
                  num: '01',
                  title: "Launched South Asia's first digital wallet",
                  body: "eSewa — co-founded by our leadership — became the first licensed digital payment platform in South Asia, scaling to 13M+ users and 80%+ market share in Nepal.",
                },
                {
                  num: '02',
                  title: "Built Nepal's national payment switch",
                  body: "Fonepay — the first non-card PSO licensed by Nepal Rastra Bank — now connects 52+ banks, processes $275M+ monthly, and holds PCI DSS certification.",
                },
                {
                  num: '03',
                  title: 'Now deploying that experience globally',
                  body: 'Innovation Next brings this infrastructure-grade expertise to banks, governments, and enterprises across Southeast Asia, the Middle East, and beyond.',
                },
              ].map(step => (
                <div key={step.num} className="flex gap-5">
                  <div className="flex-shrink-0 w-px bg-black/[0.08] self-stretch relative">
                    <span className="absolute -top-1 -left-[9px] w-[18px] h-[18px] rounded-full bg-[#0A0A0A] flex items-center justify-center text-[9px] font-black text-white font-mono">
                      {step.num.replace('0', '')}
                    </span>
                  </div>
                  <div className="pb-2">
                    <h4 className="text-[#0A0A0A] font-bold text-sm mb-1.5">{step.title}</h4>
                    <p className="text-[#0A0A0A]/50 text-sm leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — credential cards */}
          <div className="space-y-4">

            {/* eSewa */}
            <div className="border border-black/[0.08] rounded-3xl p-7">
              <div className="mb-5">
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#0A0A0A]/30 mb-1">Founder Credential</p>
                <h3 className="text-[#0A0A0A] font-black text-2xl">eSewa</h3>
                <p className="text-[#0A0A0A]/45 text-sm mt-0.5">South Asia's First Digital Wallet</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { v: '13M+', l: 'Customers' },
                  { v: '80%+', l: 'Market share' },
                  { v: '3.5M+', l: 'Daily txns' },
                ].map(s => (
                  <div key={s.l} className="bg-black/[0.02] rounded-xl p-3.5 border border-black/[0.06]">
                    <div className="text-[#0072BC] text-lg font-black">{s.v}</div>
                    <div className="text-[#0A0A0A]/40 text-xs mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fonepay */}
            <div className="border border-black/[0.08] rounded-3xl p-7">
              <div className="mb-5">
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#0A0A0A]/30 mb-1">Founder Credential</p>
                <h3 className="text-[#0A0A0A] font-black text-2xl">Fonepay</h3>
                <p className="text-[#0A0A0A]/45 text-sm mt-0.5">Nepal's National Payment Switch</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { v: '52+', l: 'Banks' },
                  { v: '$275M+', l: 'Monthly' },
                  { v: 'PCI DSS', l: 'Certified' },
                ].map(s => (
                  <div key={s.l} className="bg-black/[0.02] rounded-xl p-3.5 border border-black/[0.06]">
                    <div className="text-[#0072BC] text-lg font-black">{s.v}</div>
                    <div className="text-[#0A0A0A]/40 text-xs mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div className="border border-black/[0.08] rounded-3xl p-7 bg-black/[0.02]">
              <p className="text-[#0A0A0A]/70 text-base leading-relaxed">
                "We don't just build fintech platforms. We built the infrastructure that runs an entire country's financial system — and we now deploy that same capability for you."
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-6 h-px bg-black/20" />
                <span className="text-[#0A0A0A]/35 text-xs font-semibold tracking-widest uppercase">Innovation Next Leadership</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
