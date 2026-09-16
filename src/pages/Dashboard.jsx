import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'
import ProgressPath from '../components/ProgressPath'
import ThemedPage from '../components/ThemedPage'

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
    <ThemedPage variant="dashboard">
      <div className="armory-shell py-16">
        <p className="armory-eyebrow">
          Welcome back, {user?.displayName?.split(' ')[0]}
        </p>
        <h1 className="mt-3 font-display text-display-4 tracking-[-0.03em] text-rock-cream">Your training</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-rock-muted">
          Continue building strong foundations through guided Scripture learning, steady progress, and purposeful next steps.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <QuickActionCard
            title="Explore training paths"
            description="Browse guided studies that help you keep growing in Scripture."
            ctaLabel="View paths"
            to="/courses"
          />

          {isEducator && (
            <QuickActionCard
              title="Educator Studio"
              description="Manage paths, publish content, and support learner progress."
              ctaLabel="Open studio"
              to="/teach"
            />
          )}

          {isAdmin && (
            <QuickActionCard
              title="Platform administration"
              description="Manage roles and support the wider ministry platform."
              ctaLabel="Open admin"
              to="/admin"
            />
          )}
        </div>

        {enrollments && enrollments.length > 0 && (
          <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="armory-card p-6">
              <p className="armory-eyebrow">Continue your path</p>
              {nextUp ? (
                <>
                  <h2 className="mt-3 font-display text-display-3 tracking-[-0.03em] text-rock-cream">{nextUp.courseTitle}</h2>
                  <p className="mt-3 text-sm leading-6 text-rock-muted">Your next session is ready. Pick up where you left off and continue learning at a steady pace.</p>
                  <div className="mt-4">
                    <ProgressPath completed={nextUp.completedLessons} total={nextUp.totalLessons} />
                  </div>
                  <Link
                    to={`/courses/${nextUp.courseSlug}/learn`}
                    className="armory-button-primary mt-5"
                  >
                    Continue training
                  </Link>
                </>
              ) : (
                <>
                  <h2 className="mt-3 font-display text-display-3 tracking-[-0.03em] text-rock-cream">Your current paths are complete</h2>
                  <p className="mt-3 text-sm leading-6 text-rock-muted">You have finished your current learning. Explore another path to keep growing in Scripture.</p>
                  <Link
                    to="/courses"
                    className="armory-button-secondary mt-5 text-xs"
                  >
                    Start another path
                  </Link>
                </>
              )}
            </div>

            <div className="armory-card p-6">
              <p className="armory-eyebrow">Recent activity</p>
              <ul className="mt-3 space-y-3">
                {recentActivity.map((item, idx) => (
                  <li key={`${item.title}-${idx}`} className="rounded-panel border border-white/10 bg-white/[0.02] px-3.5 py-2.5">
                    <p className="text-sm text-rock-cream">{item.title}</p>
                    <p className="mt-1 text-xs text-rock-muted">{item.meta}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {enrollments && enrollments.length > 0 && (
          <div className="mt-6 grid gap-3 sm:inline-flex sm:gap-8">
            <StatChip num={enrollments.length} label="Enrolled" />
            <StatChip num={coursesCompleted} label="Completed" />
          </div>
        )}

        {error && <p className="mt-8 text-sm text-rock-ember">{error}</p>}

        {enrollments && enrollments.length === 0 && (
          <div className="armory-card mt-10 border-dashed p-6 text-center sm:p-10">
            <p className="text-rock-muted">You haven't enrolled in a course yet.</p>
            <Link
              to="/courses"
              className="armory-button-primary mt-4"
            >
              Explore training paths
            </Link>
          </div>
        )}

        {enrollments && enrollments.length > 0 && (
          <div className="mt-10 space-y-4">
            {enrollments.map((e) => (
              <div
                key={e.enrollmentId}
                className="armory-card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-display text-display-2 tracking-[-0.03em] text-rock-cream">{e.courseTitle}</h3>
                  <div className="mt-2">
                    <ProgressPath completed={e.completedLessons} total={e.totalLessons} />
                  </div>
                </div>

                {e.status === 'COMPLETED' ? (
                  <span className="rounded-full bg-rock-kingdom/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-rock-kingdom">
                    Completed
                  </span>
                ) : (
                  <Link
                    to={`/courses/${e.courseSlug}/learn`}
                    className="armory-button-secondary text-xs"
                  >
                    Continue
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </ThemedPage>
  )
}

function StatChip({ num, label }) {
  return (
    <div className="rounded-panel border border-rock-border bg-black/10 px-4 py-4">
      <div className="font-display text-3xl leading-none text-rock-gold">{num}</div>
      <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-rock-muted">{label}</div>
    </div>
  )
}

function QuickActionCard({ title, description, ctaLabel, to }) {
  return (
    <div className="armory-card p-5">
      <h2 className="font-display text-display-2 tracking-[-0.03em] text-rock-cream">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-rock-muted">{description}</p>
      <Link
        to={to}
        className="armory-button-secondary mt-4 text-xs"
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
