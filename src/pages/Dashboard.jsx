import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'
import ProgressPath from '../components/ProgressPath'

export default function Dashboard() {
  const { isAdmin, isEducator, user } = useAuth()
  const [enrollments, setEnrollments] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .get('/api/enrollments/me')
      .then(setEnrollments)
      .catch((err) => setError(err.message))
  }, [])

  const coursesCompleted = enrollments?.filter((e) => e.status === 'COMPLETED').length ?? 0
  const activeEnrollments = enrollments?.filter((e) => e.status !== 'COMPLETED') ?? []
  const nextUp = activeEnrollments[0] || null
  const recentActivity = buildRecentActivity(enrollments)

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-rock-gold">
        Welcome back, {user?.displayName?.split(' ')[0]}
      </p>
      <h1 className="mt-2 font-display text-5xl">Your learning path</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <QuickActionCard
          title="Keep learning"
          description="Jump back into the catalog and keep your momentum going."
          ctaLabel="Browse courses"
          to="/courses"
        />

        {isEducator && (
          <QuickActionCard
            title="Teach"
            description="Manage your courses, publish content, and view learner progress."
            ctaLabel="Open teach hub"
            to="/teach"
          />
        )}

        {isAdmin && (
          <QuickActionCard
            title="Admin"
            description="Promote users, manage roles, and support your ministry team."
            ctaLabel="Open admin"
            to="/admin"
          />
        )}
      </div>

      {enrollments && enrollments.length > 0 && (
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-rock-border bg-rock-panel p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-rock-gold">Continue where you left off</p>
            {nextUp ? (
              <>
                <h2 className="mt-2 font-display text-3xl">{nextUp.courseTitle}</h2>
                <p className="mt-2 text-sm text-rock-muted">Pick up your next lesson and keep your streak alive.</p>
                <div className="mt-4">
                  <ProgressPath completed={nextUp.completedLessons} total={nextUp.totalLessons} />
                </div>
                <Link
                  to={`/courses/${nextUp.courseSlug}/learn`}
                  className="mt-5 inline-block rounded-full bg-grad-gold px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-[#0b1220] transition-opacity hover:opacity-90"
                >
                  Continue now
                </Link>
              </>
            ) : (
              <>
                <h2 className="mt-2 font-display text-3xl">All current courses complete</h2>
                <p className="mt-2 text-sm text-rock-muted">Great momentum. Start a new path to keep growing.</p>
                <Link
                  to="/courses"
                  className="mt-5 inline-block rounded-full border-2 border-rock-gold px-6 py-3 text-xs font-bold uppercase tracking-wide transition-colors hover:bg-rock-gold/10"
                >
                  Start another course
                </Link>
              </>
            )}
          </div>

          <div className="rounded-2xl border border-rock-border bg-rock-panel p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-rock-gold">Recent activity</p>
            <ul className="mt-3 space-y-3">
              {recentActivity.map((item, idx) => (
                <li key={`${item.title}-${idx}`} className="rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-2.5">
                  <p className="text-sm text-rock-cream">{item.title}</p>
                  <p className="mt-1 text-xs text-rock-muted">{item.meta}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

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

function QuickActionCard({ title, description, ctaLabel, to }) {
  return (
    <div className="rounded-2xl border border-rock-border bg-rock-panel p-5">
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="mt-2 text-sm text-rock-muted">{description}</p>
      <Link
        to={to}
        className="mt-4 inline-block rounded-full border-2 border-rock-gold px-4 py-2 text-xs font-bold uppercase tracking-wide hover:bg-rock-gold/10 transition-colors"
      >
        {ctaLabel}
      </Link>
    </div>
  )
}

function buildRecentActivity(enrollments) {
  if (!enrollments || enrollments.length === 0) {
    return [
      {
        title: 'No activity yet',
        meta: 'Enroll in a course to start your learning timeline.',
      },
    ]
  }

  const items = enrollments.slice(0, 4).map((e) => {
    if (e.status === 'COMPLETED') {
      return {
        title: `Completed ${e.courseTitle}`,
        meta: `${e.completedLessons}/${e.totalLessons} lessons finished`,
      }
    }

    return {
      title: `In progress: ${e.courseTitle}`,
      meta: `${e.completedLessons}/${e.totalLessons} lessons completed`,
    }
  })

  return items
}
