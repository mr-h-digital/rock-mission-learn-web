import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthShell from '../components/AuthShell'
import FormField from '../components/FormField'

export default function SignIn() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  function validate() {
    const email = form.email.trim()
    if (!email) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address'
    if (!form.password) return 'Password is required'
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validationError = validate()
    setError(validationError)
    if (validationError) return
    setSubmitting(true)
    try {
      await login(form.email.trim(), form.password)
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
      eyebrow="Welcome back"
      title="Continue your training."
      description="Sign in to return to your learning path, pick up your next session, and keep growing in Scripture."
      footer={(
        <>
          New here?{' '}
          <Link to="/sign-up" className="text-rock-gold hover:underline">
            Begin your journey
          </Link>
        </>
      )}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
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
          allowReveal
          required
        />

        <div className="-mt-1 text-right">
          <Link to="/forgot-password" className="text-xs text-rock-gold hover:underline">
            Forgot password?
          </Link>
        </div>

        {error && <p className="text-sm text-rock-ember">{error}</p>}

        <button type="submit" disabled={submitting} className="armory-button-primary w-full">
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </AuthShell>
  )
}
