import { ComingSoon } from '@/components/sections/ComingSoon'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Case Studies',
  description: 'This page is being built.',
  path: '/insights/case-studies',
  noindex: true,
})

export default function Page() {
  return <ComingSoon title='Case Studies' />
}
