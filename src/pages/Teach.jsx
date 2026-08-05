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
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-rock-gold">Educator</p>
            <h1 className="mt-2 font-display text-5xl">Your courses</h1>
          </div>
          <button
            onClick={() => setShowCreate((s) => !s)}
            className="rounded-full bg-grad-gold px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-[#0b1220] hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            {showCreate ? 'Cancel' : '+ New course'}
          </button>
        </div>

        {error && <p className="mt-6 text-sm text-rock-ember">{error}</p>}

        {showCreate && (
          <form
            onSubmit={handleCreate}
            className="mt-8 space-y-4 rounded-2xl border border-rock-border bg-rock-panel p-6"
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
                className="mt-1.5 w-full rounded-lg border border-rock-border bg-white/5 px-4 py-2.5 text-sm text-rock-cream outline-none placeholder:text-rock-muted/50 focus:border-rock-gold"
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
              className="rounded-full bg-grad-gold px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-[#0b1220] hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {creating ? 'Creating…' : 'Create course (draft)'}
            </button>
          </form>
        )}

        <div className="mt-8 space-y-3">
          {courses?.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between rounded-2xl border border-rock-border bg-rock-panel p-5"
            >
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="font-display text-xl">{c.title}</h3>
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
              <div className="flex items-center gap-2.5">
                {c.status === 'DRAFT' && (
                  <button
                    onClick={() => handlePublish(c.id)}
                    className="rounded-full border-2 border-rock-ember px-4 py-2 text-xs font-bold uppercase tracking-wide text-rock-emberlight hover:bg-rock-ember/10 transition-colors"
                  >
                    Publish
                  </button>
                )}
                <Link
                  to={`/teach/${c.slug}`}
                  className="rounded-full border-2 border-rock-gold px-4 py-2 text-xs font-bold uppercase tracking-wide hover:bg-rock-gold/10 transition-colors"
                >
                  Manage
                </Link>
              </div>
            </div>
          ))}

          {courses && courses.length === 0 && !showCreate && (
            <p className="text-sm text-rock-muted">You haven't created any courses yet.</p>
          )}
        </div>
      </div>
    </ThemedPage>
  )
}
