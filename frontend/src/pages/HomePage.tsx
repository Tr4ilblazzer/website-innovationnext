import { HeroSection } from '@/components/sections/HeroSection'
import { DomainsSection } from '@/components/sections/DomainsSection'
import { CredentialsSection } from '@/components/sections/CredentialsSection'
import { ProductsSection } from '@/components/sections/ProductsSection'
import { IndustriesSection } from '@/components/sections/IndustriesSection'
import { Testimonials } from '@/components/ui/testimonials'
import { TeamSection } from '@/components/sections/TeamSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DomainsSection />
      <CredentialsSection />
      <TeamSection />
      <Testimonials />
      <ProductsSection />
      <IndustriesSection />
    </>
  )
}
