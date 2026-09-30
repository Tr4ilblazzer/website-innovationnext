import { ComingSoon } from '@/components/sections/ComingSoon'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Use Cases',
  description: 'This page is being built.',
  path: '/use-cases',
  noindex: true,
})

export default function Page() {
  return <ComingSoon title='Use Cases' />
}
