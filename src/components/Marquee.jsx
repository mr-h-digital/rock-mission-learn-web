const DEFAULT_ITEMS = ['New season dropping soon', 'Walk the path', 'Earn your badges', 'Go deeper']

export default function Marquee({ items = DEFAULT_ITEMS }) {
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden border-y border-rock-border bg-white/[0.03] py-3">
      <div className="marquee-track flex gap-10 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-sm uppercase tracking-[0.18em] text-rock-goldlight"
          >
            {item}
            <span className="text-rock-kingdom" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
