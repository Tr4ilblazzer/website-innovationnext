import { ScrollableGallery, GalleryItem } from '@/components/ui/scrollable-gallery'

const industries: GalleryItem[] = [
  {
    id: 'banking',
    title: 'Banks & Digital Banks',
    description: 'Launch neo-banks, upgrade legacy cores, deploy payment rails — with a team that has done it under central bank oversight.',
    href: '/industries/banking',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
  },
  {
    id: 'government',
    title: 'Governments & Public Sector',
    description: 'Citizen platforms, immigration systems, smart infrastructure, and e-payment layers — built by teams that delivered for national governments.',
    href: '/industries/government',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
  },
  {
    id: 'telecom',
    title: 'Telecoms & MFIs',
    description: 'Mobile money, agent networks, USSD integration, microfinance platforms — bridging digital finance for underserved populations.',
    href: '/industries/telecom',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  },
  {
    id: 'enterprise',
    title: 'Enterprises & Corporates',
    description: 'Digital transformation, bespoke software, BI dashboards, API integrations, and IT infrastructure for enterprise-scale operations.',
    href: '/industries/enterprise',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  {
    id: 'fintech-startups',
    title: 'Fintechs & Startups',
    description: 'Accelerate your build with senior engineers, white-label products, and infrastructure you can grow into — without starting from scratch.',
    href: '/industries/fintech-startups',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  },
]

export function IndustriesSection() {
  return (
    <ScrollableGallery
      title="Industries that trust production-grade teams."
      description="From central banks to citizen super-apps — we work with the teams building the critical infrastructure that millions depend on."
      items={industries}
    />

  )
}
