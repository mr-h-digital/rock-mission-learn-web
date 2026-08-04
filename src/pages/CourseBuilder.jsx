import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../api/client'
import FormField from '../components/FormField'

export default function CourseBuilder() {
  const { slug } = useParams()
  const [course, setCourse] = useState(null)
  const [modules, setModules] = useState([])
  const [roster, setRoster] = useState(null)
  const [error, setError] = useState(null)
  const [newModuleTitle, setNewModuleTitle] = useState('')
  const [addingModule, setAddingModule] = useState(false)

  function loadCourse() {
    api
      .get(`/api/courses/${slug}`, { auth: false })
      .then((c) => {
        setCourse(c)
        return api.get(`/api/courses/${c.id}/modules`)
        // authenticated call, but modules GET is public too — fine either way
      })
      .then(setModules)
      .catch((err) => setError(err.message))
  }

  useEffect(loadCourse, [slug])

  useEffect(() => {
    if (course) {
      api.get(`/api/courses/${course.id}/roster`).then(setRoster).catch(() => {})
    }
  }, [course])

  async function handleAddModule(e) {
    e.preventDefault()
    if (!newModuleTitle.trim()) return
    setAddingModule(true)
    try {
      await api.post(`/api/courses/${course.id}/modules`, { title: newModuleTitle })
      setNewModuleTitle('')
      loadCourse()
    } catch (err) {
      setError(err.message)
    } finally {
      setAddingModule(false)
    }
  }

  async function handleDeleteModule(moduleId) {
    try {
      await api.del(`/api/courses/${course.id}/modules/${moduleId}`)
      loadCourse()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handlePublish() {
    try {
      const updated = await api.patch(`/api/courses/${course.id}/publish`)
      setCourse(updated)
    } catch (err) {
      setError(err.message)
    }
  }

  if (error) return <p className="mx-auto max-w-3xl px-6 py-20 text-sm text-rock-ember">{error}</p>
  if (!course) return <p className="mx-auto max-w-3xl px-6 py-20 text-sm text-rock-muted">Loading…</p>

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link to="/teach" className="text-xs font-bold uppercase tracking-wide text-rock-muted hover:text-rock-gold">
        ← Your courses
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-5xl">{course.title}</h1>
          <span
            className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
              course.status === 'PUBLISHED' ? 'bg-rock-gold/15 text-rock-goldlight' : 'bg-white/10 text-rock-muted'
            }`}
          >
            {course.status}
          </span>
        </div>
        {course.status === 'DRAFT' && (
          <button
            onClick={handlePublish}
            className="rounded-full bg-grad-gold px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-[#0b1220] hover:opacity-90 transition-opacity"
          >
            Publish course
          </button>
        )}
      </div>

      <div className="mt-10 space-y-5">
        {modules.map((m, i) => (
          <ModuleEditor key={m.id} module={m} index={i} onChanged={loadCourse} onDelete={() => handleDeleteModule(m.id)} />
        ))}
      </div>

      <form onSubmit={handleAddModule} className="mt-6 flex gap-3">
        <input
          value={newModuleTitle}
          onChange={(e) => setNewModuleTitle(e.target.value)}
          placeholder="New module title"
          className="flex-1 rounded-lg border border-rock-border bg-white/5 px-4 py-2.5 text-sm text-rock-cream outline-none placeholder:text-rock-muted/50 focus:border-rock-gold"
        />
        <button
          type="submit"
          disabled={addingModule}
          className="rounded-full border-2 border-rock-gold px-5 py-2.5 text-xs font-bold uppercase tracking-wide hover:bg-rock-gold/10 transition-colors disabled:opacity-50"
        >
          Add module
        </button>
      </form>

      <div className="mt-14 border-t border-rock-border pt-8">
        <h2 className="font-display text-3xl">Roster</h2>
        {!roster && <p className="mt-4 text-sm text-rock-muted">Loading…</p>}
        {roster && roster.length === 0 && <p className="mt-4 text-sm text-rock-muted">No one has enrolled yet.</p>}
        {roster && roster.length > 0 && (
          <table className="mt-4 w-full text-left text-sm">
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
        )}
      </div>
    </div>
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
    <div className="rounded-2xl border border-rock-border bg-rock-panel p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-body text-xs font-bold uppercase tracking-wide text-rock-gold">
            Module {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="mt-1 font-display text-2xl">{module.title}</h3>
        </div>
        <button onClick={onDelete} className="text-xs font-bold uppercase tracking-wide text-rock-ember hover:underline">
          Delete
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {module.lessons.map((lesson) => (
          <li
            key={lesson.id}
            className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3.5 py-2.5 text-sm"
          >
            <span>{lesson.title}</span>
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
          <div className="flex gap-2.5">
            <button
              type="submit"
              disabled={adding}
              className="rounded-full bg-grad-gold px-5 py-2 text-xs font-extrabold uppercase tracking-wide text-[#0b1220] hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {adding ? 'Adding…' : 'Add lesson'}
            </button>
            <button
              type="button"
              onClick={() => setShowAddLesson(false)}
              className="rounded-full border border-rock-border px-5 py-2 text-xs font-bold uppercase tracking-wide text-rock-muted hover:text-rock-cream"
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
