import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../api/client'
import FormField from '../components/FormField'
import ThemedPage from '../components/ThemedPage'

export default function CourseBuilder() {
  const { slug } = useParams()
  const [course, setCourse] = useState(null)
  const [modules, setModules] = useState([])
  const [roster, setRoster] = useState(null)
  const [pageError, setPageError] = useState(null)
  const [actionError, setActionError] = useState(null)
  const [actionSuccess, setActionSuccess] = useState(null)
  const [newModuleTitle, setNewModuleTitle] = useState('')
  const [addingModule, setAddingModule] = useState(false)

  useEffect(() => {
    if (!actionSuccess) return
    const timer = setTimeout(() => setActionSuccess(null), 3000)
    return () => clearTimeout(timer)
  }, [actionSuccess])

  function loadCourse() {
    api
      .get(`/api/courses/${slug}`, { auth: false })
      .then((c) => {
        setPageError(null)
        setCourse(c)
        return api.get(`/api/courses/${c.id}/modules`)
        // authenticated call, but modules GET is public too — fine either way
      })
      .then(setModules)
      .catch((err) => setPageError(err.message))
  }

  useEffect(loadCourse, [slug])

  useEffect(() => {
    if (course) {
      api.get(`/api/courses/${course.id}/roster`).then(setRoster).catch(() => {})
    }
  }, [course])

  async function handleAddModule(e) {
    e.preventDefault()
    const title = newModuleTitle.trim()
    if (!title) {
      setActionSuccess(null)
      setActionError('Please enter a module title.')
      return
    }

    setActionError(null)
    setActionSuccess(null)
    setAddingModule(true)
    try {
      await api.post(`/api/courses/${course.id}/modules`, { title })
      setNewModuleTitle('')
      setActionSuccess('Module added successfully.')
      loadCourse()
    } catch (err) {
      setActionSuccess(null)
      setActionError(err.message)
    } finally {
      setAddingModule(false)
    }
  }

  async function handleDeleteModule(moduleId) {
    try {
      setActionError(null)
      setActionSuccess(null)
      await api.del(`/api/courses/${course.id}/modules/${moduleId}`)
      setActionSuccess('Module removed successfully.')
      loadCourse()
    } catch (err) {
      setActionSuccess(null)
      setActionError(err.message)
    }
  }

  async function handlePublish() {
    try {
      setActionError(null)
      setActionSuccess(null)
      const updated = await api.patch(`/api/courses/${course.id}/publish`)
      setCourse(updated)
      setActionSuccess('Course published successfully.')
    } catch (err) {
      setActionSuccess(null)
      setActionError(err.message)
    }
  }

  if (pageError) {
    return (
      <ThemedPage variant="builder">
        <p className="mx-auto max-w-3xl px-6 py-20 text-sm text-rock-ember">{pageError}</p>
      </ThemedPage>
    )
  }

  if (!course) {
    return (
      <ThemedPage variant="builder">
        <p className="mx-auto max-w-3xl px-6 py-20 text-sm text-rock-muted">Loading…</p>
      </ThemedPage>
    )
  }

  return (
    <ThemedPage variant="builder">
      <div className="armory-shell max-w-5xl py-16">
        <Link to="/teach" className="text-xs font-bold uppercase tracking-[0.18em] text-rock-muted hover:text-rock-gold">
          ← Back to Educator Studio
        </Link>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div>
            <p className="armory-eyebrow">Path Builder</p>
            <h1 className="mt-3 font-display text-display-4 tracking-[-0.03em] text-rock-cream">{course.title}</h1>
            <span
              className={`mt-3 inline-block rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] ${
                course.status === 'PUBLISHED' ? 'bg-rock-gold/15 text-rock-goldlight' : 'bg-white/10 text-rock-muted'
              }`}
            >
              {course.status}
            </span>
          </div>
          {course.status === 'DRAFT' && (
            <button
              onClick={handlePublish}
              className="armory-button-primary w-full sm:w-auto"
            >
              Publish path
            </button>
          )}
        </div>

        <div className="mt-10 space-y-5">
          {modules.map((m, i) => (
            <ModuleEditor key={m.id} module={m} index={i} onChanged={loadCourse} onDelete={() => handleDeleteModule(m.id)} />
          ))}
        </div>

        <form onSubmit={handleAddModule} className="armory-card mt-6 flex flex-col gap-3 p-5 sm:flex-row sm:items-end">
          <input
            value={newModuleTitle}
            onChange={(e) => setNewModuleTitle(e.target.value)}
            placeholder="New module title"
            className="armory-input flex-1"
          />
          <button
            type="submit"
            disabled={addingModule}
            className="armory-button-secondary w-full text-xs disabled:opacity-50 sm:w-auto"
          >
            {addingModule ? 'Adding…' : 'Add module'}
          </button>
        </form>
        {actionSuccess && <p className="mt-3 text-sm text-rock-goldlight">{actionSuccess}</p>}
        {actionError && <p className="mt-3 text-sm text-rock-ember">{actionError}</p>}

        <div className="mt-14 border-t border-rock-border pt-8">
          <h2 className="font-display text-display-3 tracking-[-0.03em] text-rock-cream">Learner roster</h2>
          {!roster && <p className="mt-4 text-sm text-rock-muted">Loading…</p>}
          {roster && roster.length === 0 && <p className="mt-4 text-sm text-rock-muted">No one has enrolled yet.</p>}
          {roster && roster.length > 0 && (
            <div className="armory-card mt-4 overflow-x-auto p-4">
              <table className="min-w-[560px] w-full text-left text-sm">
              <thead>
                <tr className="border-b border-rock-border text-xs font-bold uppercase tracking-wide text-rock-muted">
                  <th className="py-2 font-bold">Student</th>
                  <th className="py-2 font-bold">Status</th>
                  <th className="py-2 font-bold">Progress</th>
                </tr>
              </thead>
              <tbody>
                {roster.map((r) => (
                  <tr key={r.userId} className="border-b border-white/5">
                    <td className="py-3">
                      <div>{r.displayName}</div>
                      <div className="text-xs text-rock-muted">{r.email}</div>
                    </td>
                    <td className="py-3 text-rock-muted">{r.enrollmentStatus}</td>
                    <td className="py-3 text-xs text-rock-goldlight">
                      {r.completedLessons}/{r.totalLessons}
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </ThemedPage>
  )
}

function ModuleEditor({ module, index, onChanged, onDelete }) {
  const [showAddLesson, setShowAddLesson] = useState(false)
  const [lessonForm, setLessonForm] = useState({ title: '', videoRef: '', durationSeconds: '' })
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState(null)

  async function handleAddLesson(e) {
    e.preventDefault()
    setAdding(true)
    setError(null)
    try {
      await api.post(`/api/modules/${module.id}/lessons`, {
        title: lessonForm.title,
        videoProvider: 'YOUTUBE',
        videoRef: lessonForm.videoRef,
        durationSeconds: lessonForm.durationSeconds ? Number(lessonForm.durationSeconds) : null,
      })
      setLessonForm({ title: '', videoRef: '', durationSeconds: '' })
      setShowAddLesson(false)
      onChanged()
    } catch (err) {
      setError(err.message)
    } finally {
      setAdding(false)
    }
  }

  async function handleDeleteLesson(lessonId) {
    try {
      await api.del(`/api/modules/${module.id}/lessons/${lessonId}`)
      onChanged()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="armory-card p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="armory-eyebrow">
            Module {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="mt-2 font-display text-display-2 tracking-[-0.03em] text-rock-cream">{module.title}</h3>
        </div>
        <button onClick={onDelete} className="w-fit text-xs font-bold uppercase tracking-wide text-rock-ember hover:underline">
          Delete
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {module.lessons.map((lesson) => (
          <li
            key={lesson.id}
            className="flex flex-col gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-3.5 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="min-w-0 break-words">{lesson.title}</span>
            <button
              onClick={() => handleDeleteLesson(lesson.id)}
              className="text-xs font-bold uppercase tracking-wide text-rock-ember hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
        {module.lessons.length === 0 && <p className="text-sm text-rock-muted">No lessons yet.</p>}
      </ul>

      {showAddLesson ? (
        <form onSubmit={handleAddLesson} className="mt-4 space-y-3 rounded-xl border border-rock-border bg-white/[0.02] p-4">
          <FormField
            label="Lesson title"
            value={lessonForm.title}
            onChange={(v) => setLessonForm((f) => ({ ...f, title: v }))}
            required
          />
          <FormField
            label="YouTube video ID"
            value={lessonForm.videoRef}
            onChange={(v) => setLessonForm((f) => ({ ...f, videoRef: v }))}
            hint="The part after v= in the YouTube URL, e.g. pm3kChroXDk"
            required
          />
          <FormField
            label="Duration (seconds, optional)"
            type="number"
            value={lessonForm.durationSeconds}
            onChange={(v) => setLessonForm((f) => ({ ...f, durationSeconds: v }))}
          />
          {error && <p className="text-sm text-rock-ember">{error}</p>}
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <button
              type="submit"
              disabled={adding}
              className="armory-button-primary px-5 py-2 text-xs disabled:opacity-60"
            >
              {adding ? 'Adding…' : 'Add lesson'}
            </button>
            <button
              type="button"
              onClick={() => setShowAddLesson(false)}
              className="armory-button-secondary px-5 py-2 text-xs"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowAddLesson(true)}
          className="mt-4 text-xs font-bold uppercase tracking-wide text-rock-gold hover:underline"
        >
          + Add lesson
        </button>
      )}
    </div>
  )
}
