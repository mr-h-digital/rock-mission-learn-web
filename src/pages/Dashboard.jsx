import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'
import ProgressPath from '../components/ProgressPath'

export default function Dashboard() {
  const { user } = useAuth()
  const [enrollments, setEnrollments] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .get('/api/enrollments/me')
      .then(setEnrollments)
      .catch((err) => setError(err.message))
  }, [])

  const coursesCompleted = enrollments?.filter((e) => e.status === 'COMPLETED').length ?? 0

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-rock-gold">
        Welcome back, {user?.displayName?.split(' ')[0]}
      </p>
      <h1 className="mt-2 font-display text-5xl">Your learning path</h1>

      {enrollments && enrollments.length > 0 && (
        <div className="mt-6 flex gap-8">
          <StatChip num={enrollments.length} label="Enrolled" />
          <StatChip num={coursesCompleted} label="Completed" />
        </div>
      )}

      {error && <p className="mt-8 text-sm text-rock-ember">{error}</p>}

      {enrollments && enrollments.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-rock-border p-10 text-center">
          <p className="text-rock-muted">You haven't enrolled in a course yet.</p>
          <Link
            to="/courses"
            className="mt-4 inline-block rounded-full bg-grad-gold px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-[#0b1220] hover:opacity-90 transition-opacity"
          >
            Browse courses
          </Link>
        </div>
      )}

      {enrollments && enrollments.length > 0 && (
        <div className="mt-10 space-y-4">
          {enrollments.map((e) => (
            <div
              key={e.enrollmentId}
              className="flex items-center justify-between rounded-2xl border border-rock-border bg-rock-panel p-6"
            >
              <div>
                <h3 className="font-display text-2xl">{e.courseTitle}</h3>
                <div className="mt-2">
                  <ProgressPath completed={e.completedLessons} total={e.totalLessons} />
                </div>
              </div>

              {e.status === 'COMPLETED' ? (
                <span className="rounded-full bg-rock-gold/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-rock-goldlight">
                  Completed
                </span>
              ) : (
                <Link
                  to={`/courses/${e.courseSlug}/learn`}
                  className="rounded-full border-2 border-rock-gold px-5 py-2.5 text-xs font-bold uppercase tracking-wide hover:bg-rock-gold/10 transition-colors"
                >
                  Continue
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function StatChip({ num, label }) {
  return (
    <div>
      <div className="font-display text-3xl leading-none text-rock-gold">{num}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wide text-rock-muted">{label}</div>
    </div>
  )
}
