import { ComingSoon } from '@/components/sections/ComingSoon'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Cookie Policy',
  description: 'This page is being built.',
  path: '/cookies',
  noindex: true,
})

export default function Page() {
  return <ComingSoon title='Cookie Policy' />
}
