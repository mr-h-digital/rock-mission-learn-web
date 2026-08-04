import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import FormField from '../components/FormField'

export default function SignUp() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ displayName: '', email: '', password: '' })
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await signup(form.email, form.password, form.displayName)
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
      <h1 className="font-display text-5xl">Create your profile</h1>
      <p className="mt-2 text-sm text-rock-muted">
        Join Rock Mission's Bible study courses — free for the whole congregation.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <FormField
          label="Full name"
          value={form.displayName}
          onChange={(v) => setForm({ ...form, displayName: v })}
          autoComplete="name"
          required
        />
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
          autoComplete="new-password"
          minLength={8}
          hint="At least 8 characters"
          required
        />

        {error && <p className="text-sm text-rock-ember">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-grad-gold px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-[#0b1220] hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="mt-6 text-sm text-rock-muted">
        Already have a profile?{' '}
        <Link to="/sign-in" className="text-rock-gold hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
