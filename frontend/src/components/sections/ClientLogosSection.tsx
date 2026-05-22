const clients = [
  { name: 'National Cooperative Bank', abbr: 'NCB' },
  { name: 'Ministry of Digital Affairs', abbr: 'MoDA' },
  { name: 'Khaleeji Fintech', abbr: 'KFT' },
  { name: 'Lumi Payments', abbr: 'LP' },
  { name: 'Nepal Rastra Bank', abbr: 'NRB' },
  { name: 'Government of Nepal', abbr: 'GoN' },
  { name: 'Office of PM & CoM', abbr: 'OPMCM' },
  { name: 'Department of Immigration', abbr: 'DoI' },
]

export function ClientLogosSection() {
  return (
    <section className="py-14 bg-white border-y border-black/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0A0A0A]/25 text-center">
          Trusted by banks, governments, and fintechs
        </p>
      </div>

      {/* Marquee track */}
      <div className="relative flex">
        <div className="flex animate-marquee gap-12 whitespace-nowrap">
          {[...clients, ...clients].map((client, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-12 px-6 rounded-xl border border-black/[0.07] bg-black/[0.02] flex items-center justify-center"
            >
              {/* Replace the div below with <img src="..." alt={client.name} className="h-6 w-auto object-contain opacity-60" /> */}
              <span className="text-sm font-semibold text-[#0A0A0A]/40 tracking-wide">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
