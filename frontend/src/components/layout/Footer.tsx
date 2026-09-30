import Link from 'next/link'

const PUBLIC_SANS = { fontFamily: "'Public Sans', system-ui, sans-serif" }
const POPPINS = { fontFamily: "'Poppins', system-ui, sans-serif" }

const columns = [
  {
    title: 'Solutions',
    links: [
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
      { label: 'Case Studies', href: '/insights/case-studies' },
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
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'Digital Financial Services', href: '/industries/digital-financial-services' },
      { label: 'E-Governance', href: '/industries/e-governance' },
      { label: 'Banks & Digital Banks', href: '/industries/banking' },
      { label: 'Government & Public Sector', href: '/industries/government' },
      { label: 'Telecoms & MFIs', href: '/industries/telecom' },
      { label: 'Enterprise', href: '/industries/enterprise' },
      { label: "FinTech's & Startup's", href: '/industries/fintech-startups' },
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
                        className="text-base leading-6 text-[#8C8C8C] transition-colors hover:text-[#0040C1]"
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
