import { useEffect, useState } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function CourseDetail() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [course, setCourse] = useState(null)
  const [modules, setModules] = useState([])
  const [error, setError] = useState(null)
  const [enrolling, setEnrolling] = useState(false)
  const [enrollError, setEnrollError] = useState(null)
  const [enrolled, setEnrolled] = useState(false)

  useEffect(() => {
    api
      .get(`/api/courses/${slug}`, { auth: false })
      .then((c) => {
        setCourse(c)
        return api.get(`/api/courses/${c.id}/modules`, { auth: false })
      })
      .then(setModules)
      .catch((err) => setError(err.message))
  }, [slug])

  useEffect(() => {
    if (course && user && searchParams.get('action') === 'enroll' && !enrolled) {
      handleEnroll()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course, user])

  async function handleEnroll() {
    if (!user) {
      sessionStorage.setItem('rm_redirect_after_auth', `/courses/${slug}?action=enroll`)
      navigate('/sign-in')
      return
    }

    setEnrolling(true)
    setEnrollError(null)
    try {
      await api.post(`/api/enrollments/${slug}`)
      setEnrolled(true)
    } catch (err) {
      if (err.message.toLowerCase().includes('already enrolled')) {
        setEnrolled(true)
      } else {
        setEnrollError(err.message)
      }
    } finally {
      setEnrolling(false)
    }
  }

  if (error) {
    return <p className="mx-auto max-w-3xl px-6 py-20 text-sm text-rock-ember">{error}</p>
  }

  if (!course) {
    return <p className="mx-auto max-w-3xl px-6 py-20 text-sm text-rock-muted">Loading…</p>
  }

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0)

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-rock-gold">
        Taught by {course.createdByName}
      </p>
      <h1 className="mt-2 font-display text-5xl">{course.title}</h1>
      <p className="mt-4 text-rock-muted">{course.description}</p>

      <div className="mt-6 flex items-center gap-4 text-xs text-rock-muted/70">
        <span>{modules.length} modules</span>
        <span>·</span>
        <span>{totalLessons} lessons</span>
        <span>·</span>
        <span>{course.enrolledCount} enrolled</span>
      </div>

      <div className="mt-8">
        {enrolled ? (
          <button
            onClick={() => navigate(`/courses/${slug}/learn`)}
            className="rounded-full bg-grad-gold px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-[#0b1220] shadow-[0_12px_28px_rgba(32,227,207,0.32)] hover:opacity-90 transition-opacity"
          >
            You're enrolled — start learning
          </button>
        ) : (
          <button
            onClick={handleEnroll}
            disabled={enrolling}
            className="rounded-full bg-grad-gold px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-[#0b1220] shadow-[0_12px_28px_rgba(255,47,165,0.32)] hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {enrolling ? 'Enrolling…' : 'Enroll in this course'}
          </button>
        )}
        {enrollError && <p className="mt-3 text-sm text-rock-ember">{enrollError}</p>}
      </div>

      <div className="mt-14 border-t border-rock-border pt-8">
        <h2 className="font-display text-3xl">Syllabus</h2>

        <ol className="mt-6 space-y-6">
          {modules.map((m, i) => (
            <li key={m.id} className="rounded-2xl border border-rock-border bg-rock-panel p-5">
              <p className="font-body text-xs font-bold uppercase tracking-wide text-rock-gold">
                Module {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-1 font-display text-2xl">{m.title}</h3>
              <ul className="mt-3 space-y-1.5">
                {m.lessons.map((lesson) => (
                  <li key={lesson.id} className="flex items-center gap-2 text-sm text-rock-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-rock-gold/50" />
                    {lesson.title}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        {modules.length === 0 && (
          <p className="mt-4 text-sm text-rock-muted">Content for this course is coming soon.</p>
        )}
      </div>
    </div>
  )
}
