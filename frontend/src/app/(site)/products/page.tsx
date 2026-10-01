import { ComingSoon } from '@/components/sections/ComingSoon'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Our Products',
  description: 'This page is being built.',
  path: '/products',
  noindex: true,
})

export default function Page() {
  return <ComingSoon title='Our Products' />
}
