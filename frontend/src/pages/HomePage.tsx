import { HeroSection } from '@/components/sections/HeroSection'
import { DomainsSection } from '@/components/sections/DomainsSection'
import { TrustedBySection } from '@/components/sections/TrustedBySection'
import { ProductsSection } from '@/components/sections/ProductsSection'
import { InsightsSection } from '@/components/sections/InsightsSection'
import { Testimonials } from '@/components/ui/testimonials'
import { About3 } from '@/components/ui/about-3'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DomainsSection />
      <About3 />
      <TrustedBySection />
      <ProductsSection />
      <Testimonials />
      <InsightsSection />
    </>
  )
}
