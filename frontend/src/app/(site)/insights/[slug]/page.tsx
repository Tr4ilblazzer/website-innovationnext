import { notFound } from 'next/navigation'
import InsightDetailPage from '@/views/InsightDetailPage'
import { getBlogPost, getBlogPosts } from '@/services/api'
import { pageMeta, SITE_NAME, SITE_URL } from '@/lib/seo'

export const revalidate = 300

type Props = { params: Promise<{ slug: string }> }

async function load(slug: string) {
  try {
    return await getBlogPost(slug)
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await load(slug)
  if (!post) return { title: 'Article not found', robots: { index: false } }
  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/insights/${post.slug}`,
    image: post.image,
    type: 'article',
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const post = await load(slug)
  if (!post) notFound()

  const related = (await getBlogPosts(post.category)).filter(p => p.slug !== slug).slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`,
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: post.author.name },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/insights/${post.slug}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <InsightDetailPage post={post} related={related} />
    </>
  )
}
