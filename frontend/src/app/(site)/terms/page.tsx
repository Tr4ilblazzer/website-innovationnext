import { LegalPage } from '@/components/sections/LegalPage'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Terms of Service',
  description: 'The terms that apply when you use the Innovation Next website.',
  path: '/terms',
})

export default function Page() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="23 October 2026"
      intro="By using this website you agree to these terms. If you do not agree, please do not use the site."
      sections={[
        { heading: 'About this website', body: ['This website is operated by Innovation Next and provides general information about our company, solutions and products. It is not an offer or a contract. Any work we do for you is covered by a separate written agreement.'] },
        { heading: 'Using the site', body: ['You may use the site for lawful purposes only. You must not try to disrupt it, gain unauthorised access to it, or submit false or harmful content through its forms.'] },
        { heading: 'Our content', body: ['The text, logos, images and designs on this site belong to Innovation Next or its licensors. You may view and share pages for your own non-commercial use, but you may not copy or republish our content without permission. Third-party names and logos belong to their owners.'] },
        { heading: 'Accuracy', body: ['We take care to keep the information on this site accurate, but we give no guarantee that it is complete or up to date. Details about our products and services may change.'] },
        { heading: 'Links', body: ['This site may link to other websites. We are not responsible for their content or practices.'] },
        { heading: 'Liability', body: ['To the extent the law allows, Innovation Next is not liable for any loss that results from using this website or relying on its content.'] },
        { heading: 'Changes and contact', body: ['We may update these terms and will change the date above when we do. Questions can be sent to info@innovationnxt.com.'] },
      ]}
    />
  )
}
