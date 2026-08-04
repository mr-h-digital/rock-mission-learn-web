import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import FormField from '../components/FormField'

export default function SignIn() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await login(form.email, form.password)
      const redirect = sessionStorage.getItem('rm_redirect_after_auth')
      sessionStorage.removeItem('rm_redirect_after_auth')
      navigate(redirect || '/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <h1 className="font-display text-5xl">Welcome back</h1>
      <p className="mt-2 text-sm text-rock-muted">Sign in to continue your studies.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <FormField
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
          autoComplete="email"
          required
        />
        <FormField
          label="Password"
          type="password"
          value={form.password}
          onChange={(v) => setForm({ ...form, password: v })}
          autoComplete="current-password"
          required
        />

        {error && <p className="text-sm text-rock-ember">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-grad-gold px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-[#0b1220] hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="mt-6 text-sm text-rock-muted">
        New here?{' '}
        <Link to="/sign-up" className="text-rock-gold hover:underline">
          Create a profile
        </Link>
      </p>
    </div>
  )
}
