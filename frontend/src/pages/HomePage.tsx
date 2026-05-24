import { HeroSection } from '@/components/sections/HeroSection'
import { DomainsSection } from '@/components/sections/DomainsSection'
import { TrustedBySection } from '@/components/sections/TrustedBySection'
import { ProductsSection } from '@/components/sections/ProductsSection'
import { InsightsSection } from '@/components/sections/InsightsSection'
import { Testimonials } from '@/components/ui/testimonials'
import { AboutSection } from '@/components/ui/about-section'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DomainsSection />
      <AboutSection />
      <TrustedBySection />
      <ProductsSection />
      <Testimonials />
      <InsightsSection />
    </>
  )
}
