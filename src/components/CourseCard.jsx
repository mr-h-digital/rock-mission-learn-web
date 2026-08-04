import { Link } from 'react-router-dom'

export default function CourseCard({ course }) {
  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group block overflow-hidden rounded-2xl border border-rock-border bg-rock-panel transition-all hover:border-rock-gold hover:shadow-[0_16px_36px_rgba(32,227,207,0.12)]"
    >
      <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-gradient-to-br from-[#182335] to-[#223148]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(32,227,207,0.28),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(255,47,165,0.24),transparent_55%)]" />
        {course.thumbnailUrl ? (
          <img src={course.thumbnailUrl} alt="" className="relative z-[1] h-full w-full object-cover" />
        ) : (
          <span className="relative z-[1] font-display text-5xl text-rock-goldlight/80">
            {course.title.charAt(0)}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl transition-colors group-hover:text-rock-gold">{course.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-rock-muted">{course.description}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-rock-muted/70">
          <span>{course.createdByName}</span>
          <span>{course.enrolledCount} enrolled</span>
        </div>
      </div>
    </Link>
  )
}
