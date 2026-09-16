import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../api/client'
import ProgressPath from '../components/ProgressPath'
import ThemedPage from '../components/ThemedPage'

export default function CoursePlayer() {
  const { slug } = useParams()
  const [course, setCourse] = useState(null)
  const [modules, setModules] = useState([])
  const [activeLesson, setActiveLesson] = useState(null)
  const [progressByLesson, setProgressByLesson] = useState({})
  const [error, setError] = useState(null)
  const [showModules, setShowModules] = useState(false)

  useEffect(() => {
    api
      .get(`/api/courses/${slug}`, { auth: false })
      .then((c) => {
        setCourse(c)
        return api.get(`/api/courses/${c.id}/modules`, { auth: false })
      })
      .then((mods) => {
        setModules(mods)
        const firstLesson = mods.find((m) => m.lessons.length > 0)?.lessons[0]
        if (firstLesson) setActiveLesson(firstLesson)
      })
      .catch((err) => setError(err.message))
  }, [slug])

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0)
  const completedCount = Object.values(progressByLesson).filter(Boolean).length

  const markComplete = useCallback((lessonId) => {
    api
      .put(`/api/lessons/${lessonId}/progress`, { watchTimeSeconds: 0, markComplete: true })
      .then(() => setProgressByLesson((prev) => ({ ...prev, [lessonId]: true })))
      .catch(() => {})
  }, [])

  if (error) {
    return (
      <ThemedPage variant="player">
        <p className="mx-auto max-w-3xl px-6 py-20 text-sm text-rock-ember">{error}</p>
      </ThemedPage>
    )
  }

  if (!course) {
    return (
      <ThemedPage variant="player">
        <p className="mx-auto max-w-3xl px-6 py-20 text-sm text-rock-muted">Loading…</p>
      </ThemedPage>
    )
  }

  return (
    <ThemedPage variant="player">
      <div className="armory-shell py-10">
        <p className="armory-eyebrow">{course.title}</p>
        <div className="mt-3">
          <ProgressPath completed={completedCount} total={totalLessons} size="sm" />
        </div>

        <div className="mt-6 lg:hidden">
          <button
            type="button"
            onClick={() => setShowModules((value) => !value)}
            className="armory-button-secondary w-full"
            aria-expanded={showModules}
          >
            {showModules ? 'Hide module list' : 'Show module list'}
          </button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            {activeLesson ? (
              <>
                <div className="aspect-video overflow-hidden rounded-[24px] border border-rock-border bg-rock-panel shadow-[var(--shadow-card)]">
                  <iframe
                    key={activeLesson.id}
                    className="h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${activeLesson.videoRef}?rel=0`}
                    title={activeLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="armory-eyebrow">Training session</p>
                    <h2 className="mt-2 font-display text-display-3 tracking-[-0.03em] text-rock-cream">{activeLesson.title}</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-rock-muted">
                      Take a moment to engage with the lesson, reflect on the teaching, and mark the session complete when you are ready to move on.
                    </p>
                  </div>
                  <button
                    onClick={() => markComplete(activeLesson.id)}
                    disabled={!!progressByLesson[activeLesson.id]}
                    className="armory-button-gold w-full text-xs disabled:opacity-50 sm:w-auto"
                  >
                    {progressByLesson[activeLesson.id] ? 'Marked complete' : 'Mark as complete'}
                  </button>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <SessionBlock title="Scripture Focus" tone="text-rock-goldlight" body="Stay attentive to the key passage and how it shapes understanding, obedience, and faith in everyday life." />
                  <SessionBlock title="Apply It" tone="text-rock-kingdom" body="Pause after the lesson to consider one practical step you can carry into prayer, relationships, or service this week." />
                </div>
              </>
            ) : (
              <p className="text-sm text-rock-muted">This course doesn't have any lessons yet.</p>
            )}
          </div>

          <aside className={`armory-card space-y-6 p-5 ${showModules ? 'block' : 'hidden'} lg:block`}>
            <div>
              <p className="armory-eyebrow">Module navigation</p>
              <h3 className="mt-2 font-display text-display-2 tracking-[-0.03em] text-rock-cream">Continue your path</h3>
            </div>
            {modules.map((m, i) => (
              <div key={m.id}>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-rock-goldlight">
                  Module {String(i + 1).padStart(2, '0')} · {m.title}
                </p>
                <ul className="mt-2 space-y-1">
                  {m.lessons.map((lesson) => {
                    const isActive = activeLesson?.id === lesson.id
                    const isDone = !!progressByLesson[lesson.id]
                    return (
                      <li key={lesson.id}>
                        <button
                          onClick={() => setActiveLesson(lesson)}
                          className={`flex min-h-11 w-full items-center gap-2.5 rounded-xl px-3 py-3 text-left text-sm transition-colors ${
                            isActive
                              ? 'border border-rock-gold bg-rock-panel2 text-rock-cream'
                              : 'text-rock-muted hover:bg-white/5'
                          }`}
                        >
                          <span
                            className={`h-2 w-2 shrink-0 rounded-full ${
                              isDone ? 'bg-rock-gold' : isActive ? 'bg-rock-ember' : 'bg-white/15'
                            }`}
                          />
                          {lesson.title}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </ThemedPage>
  )
}

function SessionBlock({ title, tone, body }) {
  return (
    <section className="armory-card-muted p-5">
      <p className={`text-[11px] font-bold uppercase tracking-[0.22em] ${tone}`}>{title}</p>
      <p className="mt-3 text-sm leading-6 text-rock-muted">{body}</p>
    </section>
  )
}
