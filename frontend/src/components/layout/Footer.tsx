import Link from 'next/link'

const PUBLIC_SANS = { fontFamily: "'Public Sans', system-ui, sans-serif" }
const POPPINS = { fontFamily: "'Poppins', system-ui, sans-serif" }

const columns = [
  {
    title: 'Solutions',
    links: [
      { label: 'Digital Financial Services', href: '/solutions/digital-financial-services' },
      { label: 'E-Governance', href: '/solutions/e-governance' },
      { label: 'AI & Machine Learning', href: '/solutions/ai-ml' },
      { label: 'BI & Data Solutions', href: '/solutions/bi-data' },
      { label: 'Digital Transformation Consulting', href: '/solutions/consulting' },
      { label: 'Bespoke Software Development', href: '/solutions/bespoke-software' },
      { label: 'Managed Services', href: '/solutions/managed-services' },
    ],
  },
  {
    title: 'Quick link',
    links: [
      { label: 'About us', href: '/company' },
      { label: 'Careers', href: '/careers' },
      { label: 'Insights', href: '/insights' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'Groot Neo', href: '/products/groot-neo' },
      { label: 'Groot Pay', href: '/products/groot-pay' },
      { label: 'PFM', href: '/products/pfm' },
      { label: 'Loyalty Engine', href: '/products/loyalty' },
      { label: 'Onboarding Platform', href: '/products/onboarding' },
      { label: 'allXtract', href: '/products/allxtract' },
      { label: 'Summa', href: '/products/summa' },
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'Banking & Finance', href: '/industries#banking-finance' },
      { label: 'Hospitality & Retail', href: '/industries#hospitality-retail' },
      { label: 'E-Governance & Digital Government', href: '/industries#e-governance' },
      { label: 'Enterprise', href: '/industries#enterprise' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="overflow-hidden bg-[#FAFAFA] pt-16 md:pt-[120px]" style={PUBLIC_SANS}>
      <div className="mx-auto flex w-full max-w-[1312px] flex-col gap-[60px] px-6">
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          {/* Brand */}
          <div className="flex w-full max-w-[304px] flex-none flex-col gap-4">
            <Link href="/" aria-label="Innovation Next home">
              <img src="/next_logo_lightbackgorund.png" alt="Innovation Next" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-base leading-6 text-[#8C8C8C]">
              Full-stack digital technology company with a technology hub in Kathmandu, Nepal.
            </p>
            <a
              href="https://www.linkedin.com/company/innovation-next1/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Innovation Next on LinkedIn"
              className="w-fit text-[#8C8C8C] transition-colors hover:text-[#0A4FD6]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden>
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
            </a>
          </div>

          {/* Link columns */}
          <div className="grid min-w-0 grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {columns.map(col => (
              <div key={col.title} className="flex min-w-0 flex-col gap-4">
                <p className="text-lg font-medium leading-[26px] text-black">{col.title}</p>
                <ul className="flex flex-col gap-[10px]">
                  {col.links.map(link => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-base leading-6 text-[#8C8C8C] transition-colors hover:text-[#0A4FD6]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Oversized wordmark, cropped at the bottom edge. Sized from its own container width (cqw) so it never overflows. */}
        <div className="w-full overflow-hidden" style={{ containerType: 'inline-size' }}>
          <p
            aria-hidden
            className="select-none whitespace-nowrap text-center font-medium text-[#E6E6E6]"
            style={{ ...POPPINS, fontSize: 'min(166px, 12.4cqw)', height: '0.96em', lineHeight: '1.47em' }}
          >
            Innovation Next
          </p>
        </div>
      </div>
    </footer>
  )
}
