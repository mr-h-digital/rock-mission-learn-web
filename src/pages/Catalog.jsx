import { useEffect, useState } from 'react'
import { api } from '../api/client'
import CourseCard from '../components/CourseCard'
import Marquee from '../components/Marquee'

export default function Catalog() {
  const [courses, setCourses] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .get('/api/courses', { auth: false })
      .then(setCourses)
      .catch((err) => setError(err.message))
  }, [])

  return (
    <div>
      <Marquee items={['New season dropping soon', 'Pick your path', 'Learn at your pace']} />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-rock-gold">Courses</p>
        <h1 className="mt-2 font-display text-5xl">Bible study, at your pace</h1>

        {error && <p className="mt-6 text-sm text-rock-ember">Couldn't load courses: {error}</p>}

        {!courses && !error && <p className="mt-10 text-sm text-rock-muted">Loading courses…</p>}

        {courses && courses.length === 0 && (
          <p className="mt-10 text-sm text-rock-muted">No courses are published yet — check back soon.</p>
        )}

        {courses && courses.length > 0 && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
