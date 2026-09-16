import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import AuthShell from '../components/AuthShell'
import FormField from '../components/FormField'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setResult(null)

    const cleanEmail = email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError('Please enter a valid email address')
      return
    }

    setSubmitting(true)
    try {
      const res = await api.post('/api/auth/forgot-password', { email: cleanEmail }, { auth: false })
      setResult(res)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthShell
      eyebrow="Account recovery"
      title="Reset your password."
      description="Enter your email address and we will prepare a password reset link so you can continue your training."
      footer={(
        <>
          Remembered your password?{' '}
          <Link to="/sign-in" className="text-rock-gold hover:underline">
            Back to sign in
          </Link>
        </>
      )}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          required
        />

        {error && <p className="text-sm text-rock-ember">{error}</p>}

        {result && (
          <div className="armory-card-muted p-4 text-sm text-rock-muted">
            <p>{result.message}</p>
            {result.resetUrl && (
              <p className="mt-3">
                <a href={result.resetUrl} className="text-rock-gold hover:underline">
                  Open reset link
                </a>
              </p>
            )}
          </div>
        )}

        <button type="submit" disabled={submitting} className="armory-button-primary w-full">
          {submitting ? 'Preparing link…' : 'Send reset link'}
        </button>
      </form>
    </AuthShell>
  )
}
