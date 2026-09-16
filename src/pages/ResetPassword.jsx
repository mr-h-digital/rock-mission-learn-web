import { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import AuthShell from '../components/AuthShell'
import FormField from '../components/FormField'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const tokenFromQuery = searchParams.get('token') || ''

  const [token, setToken] = useState(tokenFromQuery)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  function validate() {
    if (!token.trim()) return 'Reset token is required'
    if (newPassword.length < 8) return 'New password must be at least 8 characters'
    if (!/[A-Z]/.test(newPassword)) return 'New password must include an uppercase letter'
    if (!/[a-z]/.test(newPassword)) return 'New password must include a lowercase letter'
    if (!/\d/.test(newPassword)) return 'New password must include a number'
    if (!/[^A-Za-z0-9]/.test(newPassword)) return 'New password must include a symbol'
    if (newPassword !== confirmPassword) return 'Password and confirmation do not match'
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setSubmitting(true)
    try {
      const res = await api.post(
        '/api/auth/reset-password',
        { token: token.trim(), newPassword },
        { auth: false }
      )
      setSuccess(res.message || 'Password reset successful. Please sign in.')
      setTimeout(() => navigate('/sign-in'), 1200)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthShell
      eyebrow="Account recovery"
      title="Set your new password."
      description="Use your reset token to secure your account again and continue your discipleship journey."
      footer={(
        <>
          Need another link?{' '}
          <Link to="/forgot-password" className="text-rock-gold hover:underline">
            Request reset token
          </Link>
        </>
      )}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField
          label="Reset token"
          value={token}
          onChange={setToken}
          autoComplete="off"
          required
        />
        <FormField
          label="New password"
          type="password"
          value={newPassword}
          onChange={setNewPassword}
          autoComplete="new-password"
          hint="At least 8 chars, including upper/lowercase, number and symbol"
          allowReveal
          required
        />
        <FormField
          label="Confirm new password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          autoComplete="new-password"
          allowReveal
          required
        />

        {error && <p className="text-sm text-rock-ember">{error}</p>}
        {success && <p className="text-sm text-rock-goldlight">{success}</p>}

        <button type="submit" disabled={submitting} className="armory-button-primary w-full">
          {submitting ? 'Updating password…' : 'Update password'}
        </button>
      </form>
    </AuthShell>
  )
}
