import IntroAnimation from '@/components/ui/scroll-morph-hero'

export function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-white">

      {/* Scroll-morph animation fills the entire section */}
      <div className="absolute inset-0 z-0">
        <IntroAnimation />
      </div>

    </section>
  )
}
