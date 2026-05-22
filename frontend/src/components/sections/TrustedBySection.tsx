const clients = [
  { name: 'Global IME Bank',    logo: '/logos/global-ime-bank.png' },
  { name: 'Groot Intel',        logo: '/logos/groot-intel.png' },
  { name: 'Four Symmetrons',    logo: '/logos/four-symmetrons.png' },
  { name: 'Ambition Guru',      logo: '/logos/ambition-guru.png' },
  { name: 'YAJ Tech',           logo: '/logos/yaj-tech.png' },
  { name: 'Sociair',            logo: '/logos/sociair.png' },
]

// Duplicate enough times for a seamless infinite scroll
const repeat = <T,>(arr: T[], times = 6) =>
  Array.from({ length: times }).flatMap(() => arr)

const row1 = repeat(clients)

function LogoChip({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center px-8">
      <img
        src={logo}
        alt={name}
        className="h-8 w-auto object-contain"
      />
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
          {row1.map((c, i) => <LogoChip key={i} name={c.name} logo={c.logo} />)}
        </div>
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>

    </section>
  )
}
