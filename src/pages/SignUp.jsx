import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthShell from '../components/AuthShell'
import FormField from '../components/FormField'

export default function SignUp() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ displayName: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  function validate() {
    const displayName = form.displayName.trim()
    const email = form.email.trim()
    const password = form.password

    if (displayName.length < 2) return 'Full name must be at least 2 characters'
    if (!email) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address'
    if (password.length < 8) return 'Password must be at least 8 characters'
    if (!/[A-Z]/.test(password)) return 'Password must include at least one uppercase letter'
    if (!/[a-z]/.test(password)) return 'Password must include at least one lowercase letter'
    if (!/\d/.test(password)) return 'Password must include at least one number'
    if (!/[^A-Za-z0-9]/.test(password)) return 'Password must include at least one symbol'
    if (password !== form.confirmPassword) return 'Password and confirmation do not match'
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validationError = validate()
    setError(validationError)
    if (validationError) return
    setSubmitting(true)
    try {
      await signup(form.email.trim(), form.password, form.displayName.trim())
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
    <AuthShell
      eyebrow="Begin your journey"
      title="Create your Armory profile."
      description="Open your account and start growing through Scripture at your own pace in a structured discipleship experience."
      footer={(
        <>
          Already have a profile?{' '}
          <Link to="/sign-in" className="text-rock-gold hover:underline">
            Sign in
          </Link>
        </>
      )}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
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
          hint="At least 8 chars, including upper/lowercase, number and symbol"
          allowReveal
          required
        />
        <FormField
          label="Confirm password"
          type="password"
          value={form.confirmPassword}
          onChange={(v) => setForm({ ...form, confirmPassword: v })}
          autoComplete="new-password"
          allowReveal
          required
        />

        {error && <p className="text-sm text-rock-ember">{error}</p>}

        <button type="submit" disabled={submitting} className="armory-button-primary w-full">
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </AuthShell>
  )
}
