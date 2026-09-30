export const trustedClients: { name: string; logo: string; height?: string }[] = [
  { name: 'Global IME Bank',    logo: '/logos/global-ime-bank.png' },
  { name: 'Groot Intel',        logo: '/logos/groot-intel.png' },
  { name: 'NMB Bank',           logo: '/logos/nmb-bank.png',   height: 'h-10' },
  { name: 'n-able',             logo: '/logos/n-able.png' },
  { name: 'RisingPoint',        logo: '/logos/risingpoint.png', height: 'h-12' },
  { name: 'Sunlife',            logo: '/logos/sunlife.png',    height: 'h-12' },
]

// Duplicate enough times for a seamless infinite scroll
const repeat = <T,>(arr: T[], times = 6) =>
  Array.from({ length: times }).flatMap(() => arr)

const row1 = repeat(trustedClients)

function LogoChip({ name, logo, height = 'h-8' }: { name: string; logo: string; height?: string }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center px-8">
      <img
        src={logo}
        alt={name}
        className={`${height} w-auto object-contain`}
      />
    </div>
  )
}

export function LogoMarquee() {
  return (
    <div className="relative overflow-hidden bg-white py-10">
      <div className="flex animate-marquee w-max items-center">
        {row1.map((c, i) => <LogoChip key={i} name={c.name} logo={c.logo} height={c.height} />)}
      </div>
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
    </div>
  )
}

export function TrustedBySection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-14">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0A0A0A]/30 mb-4">
          Proven at scale
        </p>
        <h2 className="section-heading text-[#0A0A0A]">
          Trusted by enterprises,<br />banks, and startups.
        </h2>
      </div>

      {/* Logos — scrolls left */}
      <div className="relative">
        <div className="flex gap-4 animate-marquee w-max">
          {row1.map((c, i) => <LogoChip key={i} name={c.name} logo={c.logo} height={c.height} />)}
        </div>
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>

    </section>
  )
}
