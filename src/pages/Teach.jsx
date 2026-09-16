import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import FormField from '../components/FormField'
import ThemedPage from '../components/ThemedPage'

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export default function Teach() {
  const [courses, setCourses] = useState(null)
  const [error, setError] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState({ title: '', slug: '', description: '', thumbnailUrl: '' })
  const [slugTouched, setSlugTouched] = useState(false)
  const [creating, setCreating] = useState(false)

  function loadCourses() {
    api.get('/api/courses/mine').then(setCourses).catch((err) => setError(err.message))
  }

  useEffect(loadCourses, [])

  function handleTitleChange(title) {
    setForm((f) => ({ ...f, title, slug: slugTouched ? f.slug : slugify(title) }))
  }

  async function handleCreate(e) {
    e.preventDefault()
    setError(null)
    setCreating(true)
    try {
      await api.post('/api/courses', form)
      setForm({ title: '', slug: '', description: '', thumbnailUrl: '' })
      setSlugTouched(false)
      setShowCreate(false)
      loadCourses()
    } catch (err) {
      setError(err.message)
    } finally {
      setCreating(false)
    }
  }

  async function handlePublish(courseId) {
    try {
      await api.patch(`/api/courses/${courseId}/publish`)
      loadCourses()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <ThemedPage variant="teach">
      <div className="armory-shell py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="armory-eyebrow">Educator Studio</p>
            <h1 className="mt-3 font-display text-display-4 tracking-[-0.03em] text-rock-cream">Your training paths</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-rock-muted">
              Create, shape, and publish learning paths that guide people through Scripture with clarity and purpose.
            </p>
          </div>
          <button
            onClick={() => setShowCreate((s) => !s)}
            className="armory-button-primary w-full px-5 py-3 text-xs sm:w-auto"
          >
            {showCreate ? 'Cancel' : '+ Create path'}
          </button>
        </div>

        {error && <p className="mt-6 text-sm text-rock-ember">{error}</p>}

        {showCreate && (
          <form
            onSubmit={handleCreate}
            className="armory-card mt-8 space-y-4 p-6"
          >
            <FormField label="Title" value={form.title} onChange={handleTitleChange} required />
            <FormField
              label="Slug"
              value={form.slug}
              onChange={(v) => {
                setSlugTouched(true)
                setForm((f) => ({ ...f, slug: slugify(v) }))
              }}
              hint="Used in the course URL — auto-filled from the title, editable"
              required
            />
            <label className="block">
              <span className="text-sm font-semibold text-rock-cream">Description</span>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                className="armory-input"
              />
            </label>
            <FormField
              label="Thumbnail URL (optional)"
              value={form.thumbnailUrl}
              onChange={(v) => setForm((f) => ({ ...f, thumbnailUrl: v }))}
            />
            <button
              type="submit"
              disabled={creating}
              className="armory-button-primary"
            >
              {creating ? 'Creating…' : 'Create path draft'}
            </button>
          </form>
        )}

        <div className="mt-8 space-y-3">
          {courses?.map((c) => (
            <div
              key={c.id}
              className="armory-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2.5">
                  <h3 className="font-display text-display-2 tracking-[-0.03em] text-rock-cream">{c.title}</h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      c.status === 'PUBLISHED' ? 'bg-rock-gold/15 text-rock-goldlight' : 'bg-white/10 text-rock-muted'
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-rock-muted">{c.enrolledCount} enrolled</p>
              </div>
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                {c.status === 'DRAFT' && (
                  <button
                    onClick={() => handlePublish(c.id)}
                    className="armory-button-secondary w-full px-4 py-2 text-xs text-rock-emberlight hover:border-rock-ember sm:w-auto"
                  >
                    Publish
                  </button>
                )}
                <Link
                  to={`/teach/${c.slug}`}
                  className="armory-button-secondary w-full px-4 py-2 text-xs sm:w-auto"
                >
                  Manage
                </Link>
              </div>
            </div>
          ))}

          {courses && courses.length === 0 && !showCreate && (
            <div className="armory-card p-8 text-center">
              <p className="text-sm text-rock-muted">You haven't created any training paths yet.</p>
            </div>
          )}
        </div>
      </div>
    </ThemedPage>
  )
}
