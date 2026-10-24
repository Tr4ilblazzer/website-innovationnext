'use client'

import { ProductPageTemplate } from '@/components/sections/ProductPageTemplate'

const features = [
  { title: 'Every Channel, One Inbox', desc: 'Reviews, comments, direct messages and email from delivery apps, Google, Facebook, Instagram, WhatsApp, TikTok, Tripadvisor, LinkedIn, X and YouTube.' },
  { title: 'Matched to Brand and Kitchen', desc: 'Every item arrives with rating, text, language, brand, kitchen, platform and order date, so complaints reach the right owner.' },
  { title: 'Source Health', desc: 'Delivery platforms do not always share data openly. Gaps are shown for every source instead of going silent.' },
  { title: 'Mention Map', desc: 'See what customers talk about at a glance. Tile size shows mentions and colour shows praise or criticism, with the underlying reviews one click away.' },
  { title: 'Kitchen View', desc: 'Problems are grouped by the physical kitchen as well as the brand, so one cause is seen once and fixed once.' },
  { title: 'Reply, Ticket or Lead', desc: 'Reply in Arabic or English with AI-assisted drafts, route a ticket to the kitchen lead with an SLA clock, or hand a lead to sales.' },
  { title: 'Alerts', desc: 'Mentions that cross a weekly threshold raise an alert, so a spreading problem is spotted in minutes.' },
  { title: 'SLA Tracking', desc: 'Overdue tickets escalate to the area manager. Nothing goes quiet.' },
  { title: 'Fix Confirmation', desc: "A kitchen's ratings are watched for two weeks after the fix, as proof the fix held." },
]

const capabilities = [
  'One screen across every brand, not a report per brand',
  'Arabic and English, including spelling variants',
  'Tickets with evidence attached and a clock running',
  'Google reviews through the official API',
  'Dashboard, kitchen view and mention map',
  'New brands and kitchens added in minutes',
]

const relatedProducts = [
  { name: 'allXtract', href: '/products/allxtract', desc: 'Document intelligence platform' },
  { name: 'Onboarding Platform', href: '/products/onboarding', desc: 'KYC, KYB, and Video KYC' },
  { name: 'Loyalty Engine', href: '/products/loyalty', desc: 'Points & rewards platform' },
]

export default function SummaPage() {
  return (
    <ProductPageTemplate
      title="Summa"
      description="Summa collects reviews, comments and messages from delivery apps and social channels, matches each to the right brand and kitchen, and turns what customers say into replies, tickets and leads."
      mockup="/summa-mockup.svg"
      mockupAlt="Summa mention map and kitchen view"
      mockupHeight="h-[460px]"
      featuresSubheadline="Collected, matched, sorted and acted on — with the cause of a problem visible once."
      features={features}
      capabilitiesSubtext="Built for restaurant, cafe and retail groups running many brands and locations."
      capabilities={capabilities}
      relatedProducts={relatedProducts}
      insightsCategory="AI & ML"
    />
  )
}
