import { Link } from 'react-router-dom'

export default function CourseCard({ course }) {
  const moduleCount = Array.isArray(course.modules) ? course.modules.length : null

  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group block overflow-hidden rounded-[24px] border border-rock-border bg-rock-panel/90 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-rock-gold hover:shadow-[var(--shadow-glow-teal)]"
    >
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-rock-panel2">
        <div className="absolute inset-0 bg-grad-kingdom" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,17,32,0.04),rgba(10,17,32,0.58))]" />
        {course.thumbnailUrl ? (
          <img src={course.thumbnailUrl} alt="" className="relative z-[1] h-full w-full object-cover" />
        ) : (
          <div className="relative z-[1] flex h-full w-full flex-col justify-between p-5">
            <span className="armory-eyebrow">Training Path</span>
            <div className="max-w-[12rem]">
              <span className="font-display text-5xl text-rock-goldlight/80">{course.title.charAt(0)}</span>
            </div>
            <span className="inline-flex w-fit rounded-full border border-rock-border bg-rock-night/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-rock-kingdom">
              Equipped by Truth
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-rock-muted2">
          <span className="rounded-full border border-rock-border px-3 py-1">Starting out</span>
          <span className="rounded-full border border-rock-border px-3 py-1">{moduleCount ?? 'Path'} modules</span>
        </div>
        <h3 className="mt-4 font-display text-display-2 tracking-[-0.03em] text-rock-cream transition-colors group-hover:text-rock-gold">
          {course.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-rock-muted">{course.description}</p>
        <div className="mt-5 flex items-center justify-between gap-4 text-xs text-rock-muted/80">
          <span className="truncate">By {course.createdByName}</span>
          <span>{course.enrolledCount} enrolled</span>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm font-semibold text-rock-goldlight">Explore path</span>
          <span className="text-rock-kingdom transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  )
}
