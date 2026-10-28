'use client'

import { useEffect, useState } from 'react'
import {
  getAdminUsers, createAdminUser, updateAdminUser, changeAdminPassword, deleteAdminUser,
  type AdminUser,
} from '@/services/adminApi'
import { useAdminStore } from '@/store/adminStore'
import { AdminPageHeader } from '@/components/admin/AdminLayout'
import { Plus, Pencil, KeyRound, Trash2, X } from 'lucide-react'

const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-black/[0.1] text-sm text-black/80 bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4FD6]/20 focus:border-[#0A4FD6]/50 transition-all placeholder:text-black/20'
const labelCls = 'block text-xs font-semibold text-black/50 mb-1.5 uppercase tracking-wide'

function isAdminName(name: string): boolean {
  return name.trim().toLowerCase() === 'admin'
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

type ModalState =
  | { mode: 'create' }
  | { mode: 'edit'; user: AdminUser }
  | { mode: 'password'; user: AdminUser }
  | null

interface Notice {
  type: 'success' | 'error'
  text: string
}

export default function AdminUsersPage() {
  const currentAdmin = useAdminStore(s => s.admin)
  const token = useAdminStore(s => s.token)
  const setAuth = useAdminStore(s => s.setAuth)

  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [modal, setModal] = useState<ModalState>(null)
  const [notice, setNotice] = useState<Notice | null>(null)
  const canResetOthers = !!currentAdmin && isAdminName(currentAdmin.name)

  function load() {
    setLoading(true)
    setLoadError('')
    getAdminUsers()
      .then(r => setUsers(r.data))
      .catch(err => setLoadError(err instanceof Error ? err.message : 'Failed to load admin users'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  function created(user: AdminUser) {
    setUsers(prev => [user, ...prev])
    setModal(null)
    setNotice({ type: 'success', text: `${user.name} can now sign in to the admin panel.` })
  }

  function updated(user: AdminUser) {
    setUsers(prev => prev.map(u => u.id === user.id ? user : u))
    if (user.id === currentAdmin?.id && token) setAuth(token, user)
    setModal(null)
    setNotice({ type: 'success', text: 'User updated.' })
  }

  async function remove(user: AdminUser) {
    if (!confirm(`Delete ${user.name} (${user.email})? This cannot be undone.`)) return
    try {
      await deleteAdminUser(user.id)
      setUsers(prev => prev.filter(u => u.id !== user.id))
      setNotice({ type: 'success', text: 'User deleted.' })
    } catch (err) {
      setNotice({ type: 'error', text: err instanceof Error ? err.message : 'Failed to delete user' })
    }
  }

  return (
    <div className="p-8">
      <AdminPageHeader
        title="Admin users"
        subtitle={`${users.length} admin${users.length === 1 ? '' : 's'} with dashboard access`}
        breadcrumb="Users"
        action={
          <button
            onClick={() => setModal({ mode: 'create' })}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0A4FD6] text-white text-sm font-semibold rounded-xl hover:bg-[#0841B3] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add user
          </button>
        }
      />

      {notice && (
        <div className={`mx-8 mb-4 flex items-center justify-between gap-4 px-4 py-2.5 rounded-xl text-xs font-medium ${
          notice.type === 'success'
            ? 'bg-green-50 text-green-600 border border-green-200'
            : 'bg-red-50 text-red-500 border border-red-200'
        }`}>
          <span>{notice.text}</span>
          <button onClick={() => setNotice(null)} className="opacity-60 hover:opacity-100">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-black/[0.07] overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-14 bg-black/[0.04] rounded-xl animate-pulse" />
            ))}
          </div>
        ) : loadError ? (
          <div className="py-16 text-center">
            <p className="text-sm text-red-500 mb-4">{loadError}</p>
            <button onClick={load} className="text-xs font-semibold text-[#0A4FD6] hover:underline">
              Try again
            </button>
          </div>
        ) : users.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-black/25 text-sm mb-4">No admin users found</p>
            <button
              onClick={() => setModal({ mode: 'create' })}
              className="text-xs font-semibold text-[#0A4FD6] hover:underline"
            >
              Add your first admin →
            </button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/[0.06]">
                <th className="text-left px-5 py-3 text-xs font-semibold text-black/40 uppercase tracking-wide">Name</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-black/40 uppercase tracking-wide">Email</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-black/40 uppercase tracking-wide">Added</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {users.map(user => {
                const isSelf = user.id === currentAdmin?.id
                const isSpecialAdmin = isAdminName(user.name)
                const canEdit = !isSpecialAdmin || canResetOthers
                const canChangePassword = isSelf || canResetOthers
                return (
                  <tr key={user.id} className="border-b border-black/[0.04] last:border-0 hover:bg-black/[0.015]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#EBF5FF] flex items-center justify-center text-[#0A4FD6] text-xs font-bold shrink-0">
                          {user.name[0]?.toUpperCase() ?? 'A'}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-black/80">{user.name}</span>
                          {isSelf && (
                            <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold border border-blue-300 text-blue-600">
                              You
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-black/50">{user.email}</td>
                    <td className="px-5 py-4 text-xs text-black/40">{formatDate(user.createdAt)}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 justify-end">
                        {canChangePassword && (
                          <button
                            onClick={() => setModal({ mode: 'password', user })}
                            className="p-1.5 rounded-lg text-black/30 hover:text-[#0A4FD6] hover:bg-[#EBF5FF] transition-colors"
                            title={isSelf ? 'Change password' : 'Reset password'}
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => setModal({ mode: 'edit', user })}
                          disabled={!canEdit}
                          className="p-1.5 rounded-lg text-black/30 hover:text-[#0A4FD6] hover:bg-[#EBF5FF] transition-colors disabled:opacity-30 disabled:hover:text-black/30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                          title={canEdit ? 'Edit' : 'Only the Admin account can edit this account'}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => remove(user)}
                          disabled={isSelf || users.length <= 1 || isSpecialAdmin}
                          className="p-1.5 rounded-lg text-black/30 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-30 disabled:hover:text-black/30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                          title={
                            isSpecialAdmin
                              ? 'The Admin account cannot be deleted'
                              : isSelf
                                ? 'You cannot delete your own account'
                                : 'Delete'
                          }
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {modal?.mode === 'create' && (
        <CreateUserForm onClose={() => setModal(null)} onCreated={created} />
      )}
      {modal?.mode === 'edit' && (
        <EditUserForm user={modal.user} onClose={() => setModal(null)} onUpdated={updated} />
      )}
      {modal?.mode === 'password' && (
        <PasswordForm
          user={modal.user}
          isSelf={modal.user.id === currentAdmin?.id}
          onClose={() => setModal(null)}
          onSuccess={() => {
            const wasSelf = modal.user.id === currentAdmin?.id
            setModal(null)
            setNotice({
              type: 'success',
              text: wasSelf ? 'Your password has been changed.' : `Password reset for ${modal.user.name}.`,
            })
          }}
        />
      )}
    </div>
  )
}

// ── Modal shell ───────────────────────────────────────────────────

function Modal({
  title, subtitle, onClose, children,
}: {
  title: string
  subtitle?: string
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl border border-black/[0.08] shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-6 pt-6 pb-4">
          <div>
            <h2 className="text-base font-semibold text-black/80">{title}</h2>
            {subtitle && <p className="text-xs text-black/40 mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 -mr-1.5 -mt-1 rounded-lg text-black/30 hover:text-black/60 hover:bg-black/[0.04] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

function FormError({ error }: { error: string }) {
  if (!error) return null
  return <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
}

// ── Create ────────────────────────────────────────────────────────

function CreateUserForm({
  onClose, onCreated,
}: {
  onClose: () => void
  onCreated: (user: AdminUser) => void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (name.trim().length < 2) return setError('Name must be at least 2 characters')
    if (isAdminName(name)) return setError('That name is reserved for the Admin account')
    if (password.length < 8) return setError('Password must be at least 8 characters')
    if (password !== confirm) return setError('Passwords do not match')

    setSaving(true)
    try {
      const res = await createAdminUser({ name: name.trim(), email: email.trim(), password })
      onCreated(res.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal title="Add admin user" subtitle="They can sign in immediately with these credentials." onClose={onClose}>
      <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
        <div>
          <label className={labelCls}>Name</label>
          <input value={name} onChange={e => setName(e.target.value)} required className={inputCls} placeholder="Jane Doe" />
        </div>
        <div>
          <label className={labelCls}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className={inputCls} placeholder="jane@innovationnext.com" />
        </div>
        <div>
          <label className={labelCls}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} className={inputCls} placeholder="At least 8 characters" />
        </div>
        <div>
          <label className={labelCls}>Confirm password</label>
          <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required minLength={8} className={inputCls} placeholder="Repeat password" />
        </div>

        <FormError error={error} />

        <div className="flex items-center justify-end gap-2 pt-1">
          <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-black/50 hover:bg-black/[0.04] transition-colors">
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2.5 rounded-xl bg-[#0A4FD6] text-white text-sm font-semibold hover:bg-[#0841B3] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? 'Creating…' : 'Create user'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

// ── Edit ──────────────────────────────────────────────────────────

function EditUserForm({
  user, onClose, onUpdated,
}: {
  user: AdminUser
  onClose: () => void
  onUpdated: (user: AdminUser) => void
}) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const lockedName = isAdminName(user.name)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (name.trim().length < 2) return setError('Name must be at least 2 characters')
    if (!lockedName && isAdminName(name)) return setError('That name is reserved for the Admin account')

    setSaving(true)
    try {
      const res = await updateAdminUser(user.id, { name: name.trim(), email: email.trim() })
      onUpdated(res.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal title="Edit admin user" subtitle={user.email} onClose={onClose}>
      <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
        <div>
          <label className={labelCls}>Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            required
            disabled={lockedName}
            className={`${inputCls} disabled:bg-black/[0.03] disabled:text-black/40 disabled:cursor-not-allowed`}
          />
          {lockedName && (
            <p className="text-[11px] text-black/35 mt-1.5">
              The Admin account name cannot be changed.
            </p>
          )}
        </div>
        <div>
          <label className={labelCls}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className={inputCls} />
        </div>

        <FormError error={error} />

        <div className="flex items-center justify-end gap-2 pt-1">
          <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-black/50 hover:bg-black/[0.04] transition-colors">
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2.5 rounded-xl bg-[#0A4FD6] text-white text-sm font-semibold hover:bg-[#0841B3] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

// ── Password ──────────────────────────────────────────────────────

function PasswordForm({
  user, isSelf, onClose, onSuccess,
}: {
  user: AdminUser
  isSelf: boolean
  onClose: () => void
  onSuccess: () => void
}) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (isSelf && !currentPassword) return setError('Enter your current password')
    if (newPassword.length < 8) return setError('New password must be at least 8 characters')
    if (newPassword !== confirm) return setError('Passwords do not match')

    setSaving(true)
    try {
      await changeAdminPassword(user.id, {
        ...(isSelf ? { currentPassword } : {}),
        newPassword,
      })
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update password')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      title={isSelf ? 'Change your password' : 'Reset password'}
      subtitle={isSelf ? 'Confirm your current password to set a new one.' : `Set a new password for ${user.name}.`}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
        {isSelf && (
          <div>
            <label className={labelCls}>Current password</label>
            <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required className={inputCls} placeholder="••••••••" />
          </div>
        )}
        <div>
          <label className={labelCls}>New password</label>
          <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={8} className={inputCls} placeholder="At least 8 characters" />
        </div>
        <div>
          <label className={labelCls}>Confirm new password</label>
          <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required minLength={8} className={inputCls} placeholder="Repeat new password" />
        </div>

        <FormError error={error} />

        <div className="flex items-center justify-end gap-2 pt-1">
          <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-black/50 hover:bg-black/[0.04] transition-colors">
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2.5 rounded-xl bg-[#0A4FD6] text-white text-sm font-semibold hover:bg-[#0841B3] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving…' : isSelf ? 'Change password' : 'Reset password'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
