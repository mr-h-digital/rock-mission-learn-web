/**
 * ProgressPath — the app's signature visual motif.
 * Renders progress through a course as a row of stepping stones, lighting
 * up teal (completed) with the current lesson marked in ember, rather than
 * a generic progress bar — a path being walked.
 */
export default function ProgressPath({ completed, total, size = 'md' }) {
  const safeTotal = Math.max(total, 1)
  const percentage = Math.min(100, Math.round((completed / safeTotal) * 100))
  const stones = Array.from({ length: safeTotal }, (_, i) => {
    if (i < completed) return 'lit'
    if (i === completed) return 'ember'
    return 'off'
  })
  const dimension = size === 'sm' ? 'h-2.5 w-2.5' : 'h-3.5 w-3.5'
  const gap = size === 'sm' ? 'gap-1' : 'gap-1.5'

  return (
    <div className="flex items-center gap-3">
      <div className={`flex ${gap} flex-wrap`} role="img" aria-label={`${completed} of ${total} lessons complete`}>
        {stones.map((state, i) => (
          <span
            key={i}
            className={`${dimension} rounded-full transition-colors duration-500 ${
              state === 'lit'
                ? 'bg-rock-gold shadow-[0_0_8px_rgba(32,227,207,0.7)]'
                : state === 'ember'
                  ? 'bg-rock-ember shadow-[0_0_8px_rgba(255,47,165,0.6)]'
                  : 'bg-white/10'
            }`}
          />
        ))}
      </div>
      <span className="font-body whitespace-nowrap text-xs text-rock-muted">
        {completed}/{total} · {percentage}%
      </span>
    </div>
  )
}
