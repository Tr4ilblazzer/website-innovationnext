import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import HomePage from '@/pages/HomePage'
import ContactPage from '@/pages/ContactPage'
import CareersPage from '@/pages/CareersPage'
import InsightsPage from '@/pages/InsightsPage'
import InsightDetailPage from '@/pages/InsightDetailPage'
import CompanyPage from '@/pages/CompanyPage'
import IndustriesPage from '@/pages/IndustriesPage'
import GrootNeoPage from '@/pages/products/GrootNeoPage'
import GrootPayPage from '@/pages/products/GrootPayPage'
import PfmPage from '@/pages/products/PfmPage'
import LoyaltyPage from '@/pages/products/LoyaltyPage'
import MerchantAiPage from '@/pages/products/MerchantAiPage'
import FintechSolutionPage from '@/pages/solutions/FintechSolutionPage'
import EGovSolutionPage from '@/pages/solutions/EGovSolutionPage'
import AiMlSolutionPage from '@/pages/solutions/AiMlSolutionPage'
import BiDataSolutionPage from '@/pages/solutions/BiDataSolutionPage'
import ItServicesSolutionPage from '@/pages/solutions/ItServicesSolutionPage'
import StaffAugSolutionPage from '@/pages/solutions/StaffAugSolutionPage'

function ComingSoon({ title }: { title: string }) {
  return (
    <main className="pt-40 pb-24 text-center">
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0A0A0A]/30 mb-4">Coming Soon</p>
      <h1 className="section-heading text-[#0A0A0A] mb-4">{title}</h1>
      <p className="text-[#0A0A0A]/40">This page is being built. Check back soon.</p>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/solutions" element={<Navigate to="/solutions/fintech" replace />} />
            <Route path="/solutions/fintech" element={<FintechSolutionPage />} />
            <Route path="/solutions/egovernance" element={<EGovSolutionPage />} />
            <Route path="/solutions/ai-ml" element={<AiMlSolutionPage />} />
            <Route path="/solutions/bi-data" element={<BiDataSolutionPage />} />
            <Route path="/solutions/it-services" element={<ItServicesSolutionPage />} />
            <Route path="/solutions/staff-augmentation" element={<StaffAugSolutionPage />} />
            <Route path="/products" element={<ComingSoon title="Our Products" />} />
            <Route path="/products/groot-neo" element={<GrootNeoPage />} />
            <Route path="/products/groot-pay" element={<GrootPayPage />} />
            <Route path="/products/pfm" element={<PfmPage />} />
            <Route path="/products/loyalty" element={<LoyaltyPage />} />
            <Route path="/products/merchant-ai" element={<MerchantAiPage />} />
            <Route path="/products/:slug" element={<ComingSoon title="Product Detail" />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/industries/:slug" element={<ComingSoon title="Industry Page" />} />
            <Route path="/use-cases" element={<ComingSoon title="Use Cases" />} />
            <Route path="/use-cases/:slug" element={<ComingSoon title="Use Case" />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/insights/:slug" element={<InsightDetailPage />} />
            <Route path="/insights/case-studies" element={<ComingSoon title="Case Studies" />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<ComingSoon title="Privacy Policy" />} />
            <Route path="/terms" element={<ComingSoon title="Terms of Service" />} />
            <Route path="/cookies" element={<ComingSoon title="Cookie Policy" />} />
            <Route path="*" element={
              <main className="pt-40 pb-24 text-center">
                <div className="section-tag mx-auto mb-4">404</div>
                <h1 className="section-heading text-white mb-4">Page not found</h1>
                <a href="/" className="btn-primary inline-flex mx-auto mt-4">Back to Home</a>
              </main>
            } />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
