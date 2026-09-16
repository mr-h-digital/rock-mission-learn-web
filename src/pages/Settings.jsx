import { useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import FormField from '../components/FormField'
import ThemedPage from '../components/ThemedPage'

export default function Settings() {
  const { user, updateProfile } = useAuth()
  const [form, setForm] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const roleLabel = useMemo(() => {
    if (!user?.role) return 'Member'
    return user.role.charAt(0) + user.role.slice(1).toLowerCase()
  }, [user])

  function validate() {
    const displayName = form.displayName.trim()
    const email = form.email.trim()

    if (displayName.length < 2) return 'Display name must be at least 2 characters'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address'

    const hasNewPassword = form.newPassword.length > 0 || form.confirmNewPassword.length > 0
    if (hasNewPassword) {
      if (form.newPassword.length < 8) return 'New password must be at least 8 characters'
      if (!/[A-Z]/.test(form.newPassword)) return 'New password must include an uppercase letter'
      if (!/[a-z]/.test(form.newPassword)) return 'New password must include a lowercase letter'
      if (!/\d/.test(form.newPassword)) return 'New password must include a number'
      if (!/[^A-Za-z0-9]/.test(form.newPassword)) return 'New password must include a symbol'
      if (!form.currentPassword) return 'Current password is required to set a new password'
      if (form.newPassword !== form.confirmNewPassword) return 'New password and confirmation do not match'
    }

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
      const payload = {
        displayName: form.displayName.trim(),
        email: form.email.trim().toLowerCase(),
      }

      if (form.newPassword) {
        payload.currentPassword = form.currentPassword
        payload.newPassword = form.newPassword
      }

      await updateProfile(payload)
      setSuccess('Profile updated successfully')
      setForm((f) => ({ ...f, currentPassword: '', newPassword: '', confirmNewPassword: '' }))
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <ThemedPage variant="settings">
      <div className="armory-shell py-16">
        <p className="armory-eyebrow">Settings</p>
        <h1 className="mt-3 font-display text-display-4 tracking-[-0.03em] text-rock-cream">Your profile</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-rock-muted">Keep your account details secure, current, and ready for continued learning.</p>

        <div className="armory-card mt-6 p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-rock-muted">Signed in as</p>
          <p className="mt-2 text-sm text-rock-cream">{user?.displayName}</p>
          <p className="text-sm text-rock-muted">{user?.email}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-rock-goldlight">Role: {roleLabel}</p>
        </div>

        <form onSubmit={handleSubmit} className="armory-card mt-6 space-y-5 p-6">
          <FormField
            label="Display name"
            value={form.displayName}
            onChange={(v) => setForm((f) => ({ ...f, displayName: v }))}
            autoComplete="name"
            required
          />

          <FormField
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) => setForm((f) => ({ ...f, email: v }))}
            autoComplete="email"
            required
          />

          <div className="pt-2">
            <p className="armory-eyebrow">Change password</p>
          </div>

          <FormField
            label="Current password"
            type="password"
            value={form.currentPassword}
            onChange={(v) => setForm((f) => ({ ...f, currentPassword: v }))}
            autoComplete="current-password"
            allowReveal
          />

          <FormField
            label="New password"
            type="password"
            value={form.newPassword}
            onChange={(v) => setForm((f) => ({ ...f, newPassword: v }))}
            autoComplete="new-password"
            hint="At least 8 chars, including upper/lowercase, number and symbol"
            allowReveal
          />

          <FormField
            label="Confirm new password"
            type="password"
            value={form.confirmNewPassword}
            onChange={(v) => setForm((f) => ({ ...f, confirmNewPassword: v }))}
            autoComplete="new-password"
            allowReveal
          />

          {error && <p className="text-sm text-rock-ember">{error}</p>}
          {success && <p className="text-sm text-rock-goldlight">{success}</p>}

          <button type="submit" disabled={submitting} className="armory-button-primary">
            {submitting ? 'Saving…' : 'Save changes'}
          </button>
        </form>
      </div>
    </ThemedPage>
  )
}
