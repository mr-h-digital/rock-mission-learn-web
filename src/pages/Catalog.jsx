import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import CourseCard from '../components/CourseCard'
import Marquee from '../components/Marquee'
import ThemedPage from '../components/ThemedPage'

export default function Catalog() {
  const [courses, setCourses] = useState(null)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    api
      .get('/api/courses', { auth: false })
      .then(setCourses)
      .catch((err) => setError(err.message))
  }, [])

  const filteredCourses = (courses || []).filter((course) => {
    const haystack = `${course.title} ${course.description} ${course.createdByName}`.toLowerCase()
    return haystack.includes(query.trim().toLowerCase())
  })

  return (
    <ThemedPage variant="catalog">
      <Marquee items={['Equipped by Truth', 'Pick your path', 'Learn at your pace', 'Grow in Christ']} />

      <div className="armory-shell py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
          <div>
            <p className="armory-eyebrow">Training Paths</p>
            <h1 className="mt-3 max-w-3xl font-display text-display-4 tracking-[-0.03em] text-rock-cream">
              Discover a path that helps you understand Scripture and grow with purpose.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-rock-muted">
              Explore guided discipleship journeys built for believers starting out, growing steadily, and going deeper in faith.
            </p>
          </div>

          <div className="armory-card p-5">
            <p className="armory-eyebrow">Start here</p>
            <h2 className="mt-3 font-display text-display-2 tracking-[-0.03em] text-rock-cream">Foundations first</h2>
            <p className="mt-2 text-sm leading-6 text-rock-muted">
              Begin with the basics of Scripture, salvation, identity in Christ, prayer, and discipleship.
            </p>
            <Link to="/courses" className="armory-button-secondary mt-5 w-full">
              View available paths
            </Link>
          </div>
        </div>

        <div className="armory-card mt-10 p-5 sm:p-6">
          <label className="block">
            <span className="armory-eyebrow">Search training paths</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, topic, or educator"
              className="armory-input"
            />
          </label>
          <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-rock-muted2">
            <span className="rounded-full border border-rock-border px-3 py-1.5">Starting out</span>
            <span className="rounded-full border border-rock-border px-3 py-1.5">Growing</span>
            <span className="rounded-full border border-rock-border px-3 py-1.5">Going deeper</span>
          </div>
        </div>

        {error && <p className="mt-6 text-sm text-rock-ember">Couldn't load courses: {error}</p>}

        {!courses && !error && <p className="mt-10 text-sm text-rock-muted">Loading training paths…</p>}

        {courses && courses.length === 0 && (
          <div className="armory-card mt-10 p-8 text-center">
            <p className="text-sm text-rock-muted">No training paths are published yet. Check back soon.</p>
          </div>
        )}

        {courses && courses.length > 0 && filteredCourses.length === 0 && (
          <div className="armory-card mt-10 p-8 text-center">
            <p className="text-sm text-rock-muted">No training paths matched your search.</p>
          </div>
        )}

        {courses && filteredCourses.length > 0 && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        )}
      </div>
    </ThemedPage>
  )
}
