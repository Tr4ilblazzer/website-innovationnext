import { TestimonialSlider } from '@/components/ui/testimonial-slider-1'

const reviews = [
  {
    id: 1,
    name: 'Rajan Karmacharya',
    affiliation: 'Chief Technology Officer, National Cooperative Bank',
    quote: 'The payment-switch integration connected 40+ member banks on day one, and the platform has handled every volume spike since without a single incident.',
    imageSrc: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=700&fit=crop&crop=faces&q=80',
    thumbnailSrc: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=160&fit=crop&crop=faces&q=80',
  },
  {
    id: 2,
    name: 'Priya Shrestha',
    affiliation: 'Director, Ministry of Digital Affairs',
    quote: 'The e-governance portal they delivered reduced citizen wait time at government offices by over 70%. Five million citizens are now on the platform.',
    imageSrc: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=700&fit=crop&crop=faces&q=80',
    thumbnailSrc: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&h=160&fit=crop&crop=faces&q=80',
  },
  {
    id: 3,
    name: 'Amir Hassan',
    affiliation: 'Head of Data, Khaleeji Fintech',
    quote: 'Their AI/ML team productionised our credit-scoring model in six weeks. The model is live across our mobile app and has improved approval accuracy by 22%.',
    imageSrc: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=700&fit=crop&crop=faces&q=80',
    thumbnailSrc: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=160&fit=crop&crop=faces&q=80',
  },
  {
    id: 4,
    name: 'Sara Mathema',
    affiliation: 'VP Engineering, Lumi Payments',
    quote: 'Staff augmentation at exactly the right skill level — four senior engineers embedded with our team inside two weeks. Zero ramp-up overhead.',
    imageSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=700&fit=crop&crop=faces&q=80',
    thumbnailSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=160&fit=crop&crop=faces&q=80',
  },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0A0A0A]/30 mb-4">
            Client Feedback
          </p>
          <h2 className="section-heading text-[#0A0A0A] max-w-lg">
            Trusted by teams building at scale
          </h2>
        </div>
        <TestimonialSlider reviews={reviews} />
      </div>
    </section>
  )
}
