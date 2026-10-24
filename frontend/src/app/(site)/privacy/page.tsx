import { LegalPage } from '@/components/sections/LegalPage'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Privacy Policy',
  description: 'How Innovation Next collects, uses and protects personal information submitted through this website.',
  path: '/privacy',
})

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="23 October 2026"
      intro="This policy explains what personal information Innovation Next collects through this website, why we collect it, and the choices you have."
      sections={[
        { heading: 'Who we are', body: ['Innovation Next is a digital technology company headquartered in Kathmandu, Nepal. You can reach us about this policy at info@innovationnxt.com.'] },
        { heading: 'What we collect', body: [
          'Contact form: your name, email address, company, phone number, area of interest and message.',
          'Job applications: your name, contact details, the role you apply for, your CV and any details you include in your application.',
          'Newsletter: your email address.',
          'Technical data: basic request information such as IP address and browser type, used to keep the site secure and to limit abuse of our forms.',
        ] },
        { heading: 'How we use it', body: ['We use your information to reply to your enquiry, to assess your job application, to send the newsletter you signed up for, and to keep the website secure. We do not sell personal information.'] },
        { heading: 'Who we share it with', body: ['We use service providers to run the website: email delivery, file storage for CVs, and hosting. They process information only on our behalf and for these purposes.'] },
        { heading: 'How long we keep it', body: ['We keep information for as long as we need it to handle your enquiry or application, and then delete it unless the law requires us to keep it longer.'] },
        { heading: 'Your choices', body: ['You can ask us to show you, correct or delete the personal information we hold about you, and you can unsubscribe from the newsletter at any time. Email us and we will respond.'] },
        { heading: 'Cookies', body: ['See our Cookie Policy for how this website uses browser storage.'] },
        { heading: 'Changes to this policy', body: ['If we change this policy, we will update the date at the top of this page.'] },
      ]}
    />
  )
}
