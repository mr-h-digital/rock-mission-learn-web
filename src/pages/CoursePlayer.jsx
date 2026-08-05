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
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-rock-gold">{course.title}</p>
        <div className="mt-3">
          <ProgressPath completed={completedCount} total={totalLessons} size="sm" />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            {activeLesson ? (
              <>
                <div className="aspect-video overflow-hidden rounded-2xl border border-rock-border bg-rock-panel">
                  <iframe
                    key={activeLesson.id}
                    className="h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${activeLesson.videoRef}?rel=0`}
                    title={activeLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <h2 className="font-display text-3xl">{activeLesson.title}</h2>
                  <button
                    onClick={() => markComplete(activeLesson.id)}
                    disabled={!!progressByLesson[activeLesson.id]}
                    className="rounded-full bg-grad-gold px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-[#0b1220] hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {progressByLesson[activeLesson.id] ? 'Marked complete' : 'Mark as complete'}
                  </button>
                </div>
              </>
            ) : (
              <p className="text-sm text-rock-muted">This course doesn't have any lessons yet.</p>
            )}
          </div>

          <aside className="space-y-6">
            {modules.map((m, i) => (
              <div key={m.id}>
                <p className="font-body text-[11px] font-bold uppercase tracking-wide text-rock-gold">
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
                          className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
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
