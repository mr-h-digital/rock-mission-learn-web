import { useState } from 'react'
import { api } from '../api/client'
import ThemedPage from '../components/ThemedPage'

const ROLE_OPTIONS = ['STUDENT', 'EDUCATOR', 'ADMIN']

export default function AdminUsers() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('EDUCATOR')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setResult(null)
    setSubmitting(true)

    try {
      const res = await api.patch('/api/admin/users/role', {
        email: email.trim().toLowerCase(),
        role,
      })
      setResult(res)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <ThemedPage variant="admin">
      <div className="armory-shell py-16">
        <p className="armory-eyebrow">Platform administration</p>
        <h1 className="mt-3 font-display text-display-4 tracking-[-0.03em] text-rock-cream">User role management</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-rock-muted">
          Promote registered users to educator or admin, or return them to student access.
        </p>

        <form onSubmit={handleSubmit} className="armory-card mt-8 space-y-4 p-6">
          <label className="block">
            <span className="text-sm font-semibold text-rock-cream">User email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              required
              className="armory-input"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-rock-cream">Role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="armory-input"
            >
              {ROLE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" disabled={submitting} className="armory-button-primary">
            {submitting ? 'Updating role…' : 'Update role'}
          </button>
        </form>

        {error && <p className="mt-5 text-sm text-rock-ember">{error}</p>}

        {result && (
          <div className="armory-card mt-6 p-5">
            <p className="armory-eyebrow">Updated user</p>
            <p className="mt-3 text-sm text-rock-cream">{result.displayName}</p>
            <p className="text-sm text-rock-muted">{result.email}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-rock-goldlight">Role: {result.role}</p>
          </div>
        )}
      </div>
    </ThemedPage>
  )
}
