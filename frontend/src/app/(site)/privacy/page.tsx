import { ComingSoon } from '@/components/sections/ComingSoon'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Privacy Policy',
  description: 'This page is being built.',
  path: '/privacy',
  noindex: true,
})

export default function Page() {
  return <ComingSoon title='Privacy Policy' />
}
