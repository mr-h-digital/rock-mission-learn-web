import { useEffect, useState } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'
import ThemedPage from '../components/ThemedPage'

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
    return (
      <ThemedPage variant="detail">
        <p className="mx-auto max-w-3xl px-6 py-20 text-sm text-rock-ember">{error}</p>
      </ThemedPage>
    )
  }

  if (!course) {
    return (
      <ThemedPage variant="detail">
        <p className="mx-auto max-w-3xl px-6 py-20 text-sm text-rock-muted">Loading…</p>
      </ThemedPage>
    )
  }

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0)

  return (
    <ThemedPage variant="detail">
      <div className="armory-shell py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="armory-eyebrow">Path overview · by {course.createdByName}</p>
            <h1 className="mt-3 max-w-3xl font-display text-display-4 tracking-[-0.03em] text-rock-cream">{course.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-rock-muted">{course.description}</p>

            <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-rock-muted2">
              <span className="rounded-full border border-rock-border px-3 py-1.5">Starting out</span>
              <span className="rounded-full border border-rock-border px-3 py-1.5">{modules.length} modules</span>
              <span className="rounded-full border border-rock-border px-3 py-1.5">{totalLessons} lessons</span>
              <span className="rounded-full border border-rock-border px-3 py-1.5">{course.enrolledCount} enrolled</span>
            </div>
          </div>

          <aside className="armory-card p-6">
            <p className="armory-eyebrow">Prepared for purpose</p>
            <h2 className="mt-3 font-display text-display-2 tracking-[-0.03em] text-rock-cream">
              {enrolled ? 'Your next session is ready.' : 'Begin training when you are ready.'}
            </h2>
            <p className="mt-3 text-sm leading-6 text-rock-muted">
              Move through guided teaching, structured modules, and focused sessions that help you understand and apply Scripture.
            </p>
            <div className="mt-6">
              {enrolled ? (
                <button onClick={() => navigate(`/courses/${slug}/learn`)} className="armory-button-primary w-full">
                  Continue your path
                </button>
              ) : (
                <button onClick={handleEnroll} disabled={enrolling} className="armory-button-primary w-full disabled:opacity-50">
                  {enrolling ? 'Beginning training…' : 'Begin training'}
                </button>
              )}
              {enrollError && <p className="mt-3 text-sm text-rock-ember">{enrollError}</p>}
            </div>
          </aside>
        </div>

        <div className="mt-14 border-t border-rock-border pt-8">
          <h2 className="font-display text-display-3 tracking-[-0.03em] text-rock-cream">Path modules</h2>

          <ol className="mt-6 space-y-6">
            {modules.map((m, i) => (
              <li key={m.id} className="armory-card p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-rock-goldlight">
                  Module {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-2 font-display text-display-2 tracking-[-0.03em] text-rock-cream">{m.title}</h3>
                <ul className="mt-3 space-y-1.5">
                  {m.lessons.map((lesson) => (
                    <li key={lesson.id} className="flex items-center gap-2 text-sm text-rock-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-rock-kingdom/70" />
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
    </ThemedPage>
  )
}
