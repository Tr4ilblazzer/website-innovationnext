import InsightsPage from '@/views/InsightsPage'
import { getBlogPosts } from '@/services/api'
import { pageMeta } from '@/lib/seo'

export const revalidate = 300

export const metadata = pageMeta({
  title: 'Insights',
  description: 'Articles from Innovation Next on fintech, e-governance, AI, data and software engineering.',
  path: '/insights',
})

export default async function Page() {
  const posts = await getBlogPosts()
  return <InsightsPage initialPosts={posts} />
}
