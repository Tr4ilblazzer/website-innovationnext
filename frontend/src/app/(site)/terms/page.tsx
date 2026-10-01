import { ComingSoon } from '@/components/sections/ComingSoon'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Terms of Service',
  description: 'This page is being built.',
  path: '/terms',
  noindex: true,
})

export default function Page() {
  return <ComingSoon title='Terms of Service' />
}
