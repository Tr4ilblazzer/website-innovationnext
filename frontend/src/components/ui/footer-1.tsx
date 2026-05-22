import { FC } from 'react'
import { Link } from 'react-router-dom'
import { LucideIcon } from 'lucide-react'

interface FooterLink {
  label: string
  href: string
  badge?: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

interface SocialLink {
  icon: LucideIcon
  href: string
  label: string
}

interface FooterProps {
  logoSrc: string
  logoAlt: string
  description: string
  columns: FooterColumn[]
  socialLinks: SocialLink[]
  copyright?: string
}

export const Footer: FC<FooterProps> = ({
  logoSrc,
  logoAlt,
  description,
  columns,
  socialLinks,
  copyright = `© ${new Date().getFullYear()} Innovation Next. All Rights Reserved.`,
}) => {
  return (
    <footer className="w-full bg-white">

      <div className="max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 md:gap-0">

          {/* Logo + Description + Social */}
          <div className="flex flex-col gap-4 md:w-1/3 md:pr-16">
            <Link to="/">
              <img src={logoSrc} alt={logoAlt} className="h-9 w-auto object-contain" />
            </Link>
            <p className="text-[#0A0A0A]/50 text-sm leading-relaxed">{description}</p>
            <div className="flex items-center gap-4 mt-1">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-[#0A0A0A]/40 hover:text-[#0072BC] hover:border-[#0072BC] transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation columns */}
          <div className="flex flex-wrap gap-10 md:w-2/3 md:justify-end">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-2.5 min-w-[120px]">
                <h4 className="text-xs font-semibold tracking-widest uppercase text-[#0A0A0A]/30 mb-1">
                  {col.title}
                </h4>
                {col.links.map(({ label, href, badge }) => (
                  <Link
                    key={label}
                    to={href}
                    className="text-sm text-[#0A0A0A]/50 hover:text-[#0A0A0A] flex items-center gap-1.5 transition-colors"
                  >
                    {label}
                    {badge && (
                      <span className="bg-[#0072BC]/10 text-[#0072BC] text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-none">
                        {badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#0A0A0A]/30">
          <p>{copyright}</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-[#0A0A0A]/60 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#0A0A0A]/60 transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-[#0A0A0A]/60 transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>

    </footer>
  )
}
