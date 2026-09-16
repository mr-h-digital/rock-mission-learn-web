export default function AuthShell({ eyebrow, title, description, children, footer }) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img
          src="/images/auth-bg-designer-59.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(32,217,194,0.14),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(183,120,255,0.14),transparent_24%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1320]/26 via-[#0e1628]/56 to-[#060a12]/84" />
      </div>

      <div className="armory-shell grid min-h-screen items-center gap-10 py-10 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="armory-card order-2 p-6 sm:p-8 lg:order-1 lg:p-10">
          <p className="armory-eyebrow">{eyebrow}</p>
          <h1 className="mt-3 font-display text-display-4 tracking-[-0.03em] text-rock-cream">{title}</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-rock-muted">{description}</p>

          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-sm text-rock-muted">{footer}</div>}
        </section>

        <aside className="order-1 lg:order-2">
          <div className="armory-card p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] border border-rock-border bg-rock-night/80 p-3 sm:h-20 sm:w-20">
                <img
                  src="/brand/armory-mark.png"
                  alt="The Armory by Rock Mission"
                  className="h-full w-full object-contain"
                />
              </span>
              <div>
                <p className="armory-eyebrow">The Armory by Rock Mission</p>
                <h2 className="mt-2 font-display text-display-3 tracking-[-0.04em] text-rock-cream">The Armory</h2>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.22em] text-rock-goldlight">by Rock Mission</p>
              </div>
            </div>
            <h2 className="mt-5 font-display text-display-3 tracking-[-0.03em] text-rock-cream">Equipped by Truth.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-rock-muted">
              Train in Scripture. Strengthen your faith. Step into your purpose through a focused digital discipleship experience designed for steady growth.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <AuthValue title="Structured paths" body="Clear study journeys that reduce overwhelm and help you know where to begin." />
              <AuthValue title="Focused sessions" body="Short, purposeful lessons that fit real life and encourage consistent return." />
              <AuthValue title="Growth with purpose" body="Progress that supports spiritual formation without turning faith into a scoreboard." />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function AuthValue({ title, body }) {
  return (
    <div className="armory-card-muted p-4">
      <p className="text-sm font-semibold text-rock-cream">{title}</p>
      <p className="mt-2 text-sm leading-6 text-rock-muted">{body}</p>
    </div>
  )
}
