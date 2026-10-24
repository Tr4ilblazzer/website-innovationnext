interface LegalSection { heading: string; body: string[] }

export function LegalPage({ title, updated, intro, sections }: {
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}) {
  return (
    <main className="bg-white pt-32 pb-16 md:pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="hero-heading gradient-text mb-3">{title}</h1>
        <p className="text-sm text-[#0A0A0A]/60 mb-8">Last updated {updated}</p>
        <p className="text-[#0A0A0A]/70 leading-relaxed mb-12">{intro}</p>
        <div className="space-y-10">
          {sections.map(s => (
            <section key={s.heading}>
              <h2 className="text-xl font-medium text-[#0A0A0A] mb-3">{s.heading}</h2>
              <div className="space-y-3">
                {s.body.map(p => (
                  <p key={p} className="text-[#0A0A0A]/65 leading-relaxed">{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
