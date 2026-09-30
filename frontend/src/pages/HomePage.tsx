import { HomeHero } from '@/components/sections/HomeHero'
import { DomainsSection } from '@/components/sections/DomainsSection'
import { ProductsSection } from '@/components/sections/ProductsSection'
import { InsightsSection } from '@/components/sections/InsightsSection'
import { Testimonials } from '@/components/ui/testimonials'
import { AboutSection } from '@/components/ui/about-section'

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <DomainsSection />
      <AboutSection />
      <ProductsSection />
      <Testimonials />
      <InsightsSection />
    </>
  )
}
