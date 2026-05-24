import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminStore } from '@/store/adminStore'
import { adminLogin } from '@/services/adminApi'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const setAuth = useAdminStore(s => s.setAuth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await adminLogin(email, password)
      setAuth(res.token, res.admin)
      navigate('/admin')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center p-4 font-['Public_Sans',sans-serif]">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/next_logo_lightbackgorund.png"
            alt="Innovation Next"
            className="h-10 w-auto object-contain mx-auto mb-4"
          />
          <p className="text-sm text-black/40 mt-1">Admin dashboard</p>
        </div>

        {/* Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-black/[0.08] p-8 shadow-sm">
          <h2 className="text-base font-semibold text-black/80 mb-6">Sign in to continue</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-black/50 mb-1.5 uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-black/[0.1] text-sm text-black/80 bg-white focus:outline-none focus:ring-2 focus:ring-[#0072BC]/20 focus:border-[#0072BC]/50 transition-all placeholder:text-black/20"
                placeholder="admin@innovationnext.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-black/50 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-black/[0.1] text-sm text-black/80 bg-white focus:outline-none focus:ring-2 focus:ring-[#0072BC]/20 focus:border-[#0072BC]/50 transition-all placeholder:text-black/20"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-[#0072BC] hover:bg-[#005a96] text-white text-sm font-semibold py-2.5 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-[11px] text-black/25 mt-6">
          Innovation Next · Admin Only
        </p>
      </div>
    </div>
  )
}
