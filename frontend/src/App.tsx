import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroThemeProvider } from '@/context/HeroThemeContext'
import { ErrorBoundary } from '@/components/ui/error-boundary'

// ── Lazy-loaded pages (route-level code splitting) ───────────────────────────
const HomePage            = lazy(() => import('@/pages/HomePage'))
const ContactPage         = lazy(() => import('@/pages/ContactPage'))
const CareersPage         = lazy(() => import('@/pages/CareersPage'))
const InsightsPage        = lazy(() => import('@/pages/InsightsPage'))
const InsightDetailPage   = lazy(() => import('@/pages/InsightDetailPage'))
const CompanyPage         = lazy(() => import('@/pages/CompanyPage'))
const IndustriesPage      = lazy(() => import('@/pages/IndustriesPage'))
const GrootNeoPage        = lazy(() => import('@/pages/products/GrootNeoPage'))
const GrootPayPage        = lazy(() => import('@/pages/products/GrootPayPage'))
const PfmPage             = lazy(() => import('@/pages/products/PfmPage'))
const LoyaltyPage         = lazy(() => import('@/pages/products/LoyaltyPage'))
const MerchantAiPage      = lazy(() => import('@/pages/products/MerchantAiPage'))
const FintechSolutionPage = lazy(() => import('@/pages/solutions/FintechSolutionPage'))
const EGovSolutionPage    = lazy(() => import('@/pages/solutions/EGovSolutionPage'))
const AiMlSolutionPage    = lazy(() => import('@/pages/solutions/AiMlSolutionPage'))
const BiDataSolutionPage  = lazy(() => import('@/pages/solutions/BiDataSolutionPage'))
const ItServicesSolutionPage  = lazy(() => import('@/pages/solutions/ItServicesSolutionPage'))
const StaffAugSolutionPage    = lazy(() => import('@/pages/solutions/StaffAugSolutionPage'))

// ── Page skeleton shown while lazy chunks load ───────────────────────────────
function PageSkeleton() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="max-w-7xl mx-auto px-6 pt-40">
        <div className="h-3 bg-black/[0.04] rounded-full w-1/5 mb-8" />
        <div className="h-14 bg-black/[0.04] rounded-2xl w-3/4 mb-4" />
        <div className="h-14 bg-black/[0.04] rounded-2xl w-1/2 mb-8" />
        <div className="h-4 bg-black/[0.04] rounded-full w-2/3 mb-3" />
        <div className="h-4 bg-black/[0.04] rounded-full w-1/2" />
      </div>
    </div>
  )
}

// ── Stub for pages under construction ────────────────────────────────────────
function ComingSoon({ title }: { title: string }) {
  return (
    <main className="pt-40 pb-24 text-center">
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0A0A0A]/30 mb-4">
        Coming Soon
      </p>
      <h1 className="section-heading text-[#0A0A0A] mb-4">{title}</h1>
      <p className="text-[#0A0A0A]/40">This page is being built. Check back soon.</p>
    </main>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <HeroThemeProvider>
        <div className="flex flex-col min-h-screen bg-white">
          <Navbar />
          <div className="flex-1">
            <ErrorBoundary>
              <Suspense fallback={<PageSkeleton />}>
                <Routes>
                  <Route path="/"                         element={<HomePage />} />

                  {/* Solutions */}
                  <Route path="/solutions"                element={<Navigate to="/solutions/fintech" replace />} />
                  <Route path="/solutions/fintech"        element={<FintechSolutionPage />} />
                  <Route path="/solutions/egovernance"    element={<EGovSolutionPage />} />
                  <Route path="/solutions/ai-ml"          element={<AiMlSolutionPage />} />
                  <Route path="/solutions/bi-data"        element={<BiDataSolutionPage />} />
                  <Route path="/solutions/it-services"    element={<ItServicesSolutionPage />} />
                  <Route path="/solutions/staff-augmentation" element={<StaffAugSolutionPage />} />

                  {/* Products */}
                  <Route path="/products"                 element={<ComingSoon title="Our Products" />} />
                  <Route path="/products/groot-neo"       element={<GrootNeoPage />} />
                  <Route path="/products/groot-pay"       element={<GrootPayPage />} />
                  <Route path="/products/pfm"             element={<PfmPage />} />
                  <Route path="/products/loyalty"         element={<LoyaltyPage />} />
                  <Route path="/products/merchant-ai"     element={<MerchantAiPage />} />
                  <Route path="/products/:slug"           element={<ComingSoon title="Product Detail" />} />

                  {/* Industries & Use Cases */}
                  <Route path="/industries"               element={<IndustriesPage />} />
                  <Route path="/industries/:slug"         element={<ComingSoon title="Industry Page" />} />
                  <Route path="/use-cases"                element={<ComingSoon title="Use Cases" />} />
                  <Route path="/use-cases/:slug"          element={<ComingSoon title="Use Case" />} />

                  {/* Company & Insights */}
                  <Route path="/company"                  element={<CompanyPage />} />
                  <Route path="/insights"                 element={<InsightsPage />} />
                  <Route path="/insights/case-studies"    element={<ComingSoon title="Case Studies" />} />
                  <Route path="/insights/:slug"           element={<InsightDetailPage />} />

                  {/* Misc */}
                  <Route path="/careers"                  element={<CareersPage />} />
                  <Route path="/contact"                  element={<ContactPage />} />
                  <Route path="/privacy"                  element={<ComingSoon title="Privacy Policy" />} />
                  <Route path="/terms"                    element={<ComingSoon title="Terms of Service" />} />
                  <Route path="/cookies"                  element={<ComingSoon title="Cookie Policy" />} />

                  {/* 404 */}
                  <Route path="*" element={
                    <main className="pt-40 pb-24 text-center">
                      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0A0A0A]/30 mb-4">
                        404
                      </p>
                      <h1 className="section-heading text-[#0A0A0A] mb-4">Page not found</h1>
                      <p className="text-[#0A0A0A]/40 mb-8">
                        The page you're looking for doesn't exist or has been moved.
                      </p>
                      <a href="/" className="btn-primary inline-flex mx-auto">
                        Back to Home
                      </a>
                    </main>
                  } />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </div>
          <Footer />
        </div>
      </HeroThemeProvider>
    </BrowserRouter>
  )
}
