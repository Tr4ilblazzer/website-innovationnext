import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const TESTIMONIALS = {
  featured: {
    logo: null,
    logoAlt: 'National Bank',
    quote:
      'Innovation Next built our core digital banking infrastructure in under eight months. The payment-switch integration connected 40+ member banks on day one, and the platform has handled every volume spike since without a single incident. It is genuinely the most reliable fintech partnership we have had.',
    name: 'Rajan Karmacharya',
    role: 'Chief Technology Officer, National Cooperative Bank',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=faces',
    initials: 'RK',
  },
  cards: [
    {
      quote:
        'The e-governance portal they delivered reduced citizen wait time at government offices by over 70 %. Five million citizens are now on the platform and the uptime has never dipped below 99.9 %.',
      name: 'Priya Shrestha',
      role: 'Director, Ministry of Digital Affairs',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=faces',
      initials: 'PS',
    },
    {
      quote:
        'Their AI/ML team productionised our credit-scoring model in six weeks. The model is live across our mobile app and has improved approval accuracy by 22 %.',
      name: 'Amir Hassan',
      role: 'Head of Data, Khaleeji Fintech',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=faces',
      initials: 'AH',
    },
    {
      quote:
        'Staff augmentation at exactly the right skill level — four senior engineers embedded with our team inside two weeks. Zero ramp-up overhead.',
      name: 'Sara Mathema',
      role: 'VP Engineering, Lumi Payments',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
      initials: 'SM',
    },
  ],
}

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      {/* Subtle ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(ellipse, #3C53FF 0%, transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">

        {/* Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center md:mb-20">
          <h2 className="section-heading text-white mb-4">
            Trusted by teams building{' '}
            <span className="gradient-text italic">at scale</span>
          </h2>
          <p className="text-white/50 text-base leading-relaxed">
            From central banks to government ministries — the teams that rely on
            critical infrastructure rely on us.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2">

          {/* Featured card — spans 2 cols × 2 rows */}
          <Card className="glass-card border-white/[0.06] grid grid-rows-[auto_1fr] gap-6 sm:col-span-2 sm:p-8 lg:row-span-2">
            <CardHeader className="p-0">
              {/* Decorative quote mark */}
              <svg width="32" height="24" viewBox="0 0 32 24" fill="none" aria-hidden="true">
                <path
                  d="M0 24V14.4C0 6.4 4.8 1.6 14.4 0L16 3.2C11.2 4.267 8.533 7.2 8 12H14.4V24H0ZM17.6 24V14.4C17.6 6.4 22.4 1.6 32 0L33.6 3.2C28.8 4.267 26.133 7.2 25.6 12H32V24H17.6Z"
                  fill="url(#qg)"
                />
                <defs>
                  <linearGradient id="qg" x1="0" y1="0" x2="33.6" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3C53FF" />
                    <stop offset="1" stopColor="#0DFFFF" />
                  </linearGradient>
                </defs>
              </svg>
            </CardHeader>
            <CardContent className="p-0">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-8">
                <p className="text-lg font-medium text-white/90 leading-relaxed">
                  {TESTIMONIALS.featured.quote}
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="size-11 ring-1 ring-white/10">
                    <AvatarImage
                      src={TESTIMONIALS.featured.avatar}
                      alt={TESTIMONIALS.featured.name}
                    />
                    <AvatarFallback>{TESTIMONIALS.featured.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <cite className="not-italic text-sm font-semibold text-white">
                      {TESTIMONIALS.featured.name}
                    </cite>
                    <span className="block text-xs text-white/40 mt-0.5">
                      {TESTIMONIALS.featured.role}
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>

          {/* Top-right card — spans 2 cols */}
          <Card className="glass-card border-white/[0.06] md:col-span-2">
            <CardContent className="h-full pt-6 px-6 pb-6">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p className="text-base text-white/80 leading-relaxed">
                  {TESTIMONIALS.cards[0].quote}
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="size-10 ring-1 ring-white/10">
                    <AvatarImage
                      src={TESTIMONIALS.cards[0].avatar}
                      alt={TESTIMONIALS.cards[0].name}
                    />
                    <AvatarFallback>{TESTIMONIALS.cards[0].initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <cite className="not-italic text-sm font-semibold text-white">
                      {TESTIMONIALS.cards[0].name}
                    </cite>
                    <span className="block text-xs text-white/40 mt-0.5">
                      {TESTIMONIALS.cards[0].role}
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>

          {/* Bottom-right card 1 */}
          <Card className="glass-card border-white/[0.06]">
            <CardContent className="h-full pt-6 px-6 pb-6">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p className="text-sm text-white/75 leading-relaxed">
                  {TESTIMONIALS.cards[1].quote}
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="size-10 ring-1 ring-white/10">
                    <AvatarImage
                      src={TESTIMONIALS.cards[1].avatar}
                      alt={TESTIMONIALS.cards[1].name}
                    />
                    <AvatarFallback>{TESTIMONIALS.cards[1].initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <cite className="not-italic text-sm font-semibold text-white">
                      {TESTIMONIALS.cards[1].name}
                    </cite>
                    <span className="block text-xs text-white/40 mt-0.5">
                      {TESTIMONIALS.cards[1].role}
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>

          {/* Bottom-right card 2 */}
          <Card className="glass-card border-white/[0.06]">
            <CardContent className="h-full pt-6 px-6 pb-6">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p className="text-sm text-white/75 leading-relaxed">
                  {TESTIMONIALS.cards[2].quote}
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="size-10 ring-1 ring-white/10">
                    <AvatarImage
                      src={TESTIMONIALS.cards[2].avatar}
                      alt={TESTIMONIALS.cards[2].name}
                    />
                    <AvatarFallback>{TESTIMONIALS.cards[2].initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <cite className="not-italic text-sm font-semibold text-white">
                      {TESTIMONIALS.cards[2].name}
                    </cite>
                    <span className="block text-xs text-white/40 mt-0.5">
                      {TESTIMONIALS.cards[2].role}
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  )
}
