import { ContactSection } from '@/components/sections/ContactSection'

export default function ContactPage() {
  return (
    <main className="pt-24 pb-24 relative grid-bg">
      <div className="glow-orb glow-blue w-96 h-96 top-20 left-1/4 opacity-15 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <ContactSection />
      </div>
    </main>
  )
}
