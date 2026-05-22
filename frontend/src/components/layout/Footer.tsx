import { Linkedin, Twitter, Mail } from 'lucide-react'
import { Footer as FooterUI } from '@/components/ui/footer-1'

export function Footer() {
  return (
    <FooterUI
      logoSrc="/next_logo_light.png"
      logoAlt="Innovation Next"
      description="Full-stack digital technology company. Headquartered in Dubai with a technology hub in Kathmandu, Nepal."
      socialLinks={[
        { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
        { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
        { icon: Mail, href: 'mailto:hello@innovationnext.com', label: 'Email' },
      ]}
      columns={[
        {
          title: 'Solutions',
          links: [
            { label: 'Digital Financial Services', href: '/solutions/fintech' },
            { label: 'E-Governance', href: '/solutions/egovernance' },
            { label: 'AI & Machine Learning', href: '/solutions/ai-ml' },
            { label: 'BI & Data Solutions', href: '/solutions/bi-data' },
            { label: 'IT Services', href: '/solutions/it-services' },
            { label: 'Staff Augmentation', href: '/solutions/staff-augmentation' },
          ],
        },
        {
          title: 'Products',
          links: [
            { label: 'Groot Neo', href: '/products/groot-neo' },
            { label: 'Groot Pay', href: '/products/groot-pay' },
            { label: 'PFM', href: '/products/pfm' },
            { label: 'Loyalty Engine', href: '/products/loyalty' },
            { label: 'Merchant AI', href: '/products/merchant-ai', badge: 'New' },
          ],
        },
        {
          title: 'Company',
          links: [
            { label: 'About Us', href: '/company' },
            { label: 'Careers', href: '/careers', badge: 'Hiring' },
            { label: 'Insights', href: '/insights' },
            { label: 'Case Studies', href: '/insights/case-studies' },
            { label: 'Contact', href: '/contact' },
          ],
        },
        {
          title: 'Industries',
          links: [
            { label: 'Banks & Digital Banks', href: '/industries/banking' },
            { label: 'Governments & Public Sector', href: '/industries/government' },
            { label: 'Telecoms & MFIs', href: '/industries/telecom' },
            { label: 'Enterprises', href: '/industries/enterprise' },
            { label: 'Fintechs & Startups', href: '/industries/fintech-startups' },
          ],
        },
      ]}
      copyright={`© ${new Date().getFullYear()} Innovation Next (Four Symmetrons Innovation). All rights reserved.`}
    />
  )
}
