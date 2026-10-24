import { LegalPage } from '@/components/sections/LegalPage'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Cookie Policy',
  description: 'How the Innovation Next website uses cookies and browser storage.',
  path: '/cookies',
})

export default function Page() {
  return (
    <LegalPage
      title="Cookie Policy"
      updated="23 October 2026"
      intro="This page explains how this website uses cookies and similar browser storage."
      sections={[
        { heading: 'What we use', body: ['This website does not use advertising or analytics cookies. The only browser storage it uses is essential: it keeps staff signed in to the admin area of the site.'] },
        { heading: 'Your choices', body: ['Because we do not use optional cookies, there is nothing to switch on or off. You can clear your browser storage at any time in your browser settings.'] },
        { heading: 'If this changes', body: ['If we add analytics or other optional cookies, we will ask for your consent first and update this page.'] },
        { heading: 'Contact', body: ['Questions about this policy can be sent to info@innovationnxt.com.'] },
      ]}
    />
  )
}
