import { Link } from 'react-router-dom'
import Marquee from '../components/Marquee'

export default function Home() {
  return (
    <div>
      <Marquee />

      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="inline-flex -rotate-3 items-center rounded-full bg-rock-ember px-4 py-2 font-body text-xs font-extrabold uppercase tracking-wide text-[#2a0619] shadow-[0_8px_20px_rgba(255,47,165,0.35)]">
              for real this time
            </span>

            <h1 className="mt-6 font-display text-[58px] leading-[0.88] sm:text-[84px] lg:text-[100px]">
              Study the Word
              <span className="block text-rock-gold">on your own terms.</span>
              <span className="mt-2.5 block font-italic text-[0.34em] italic text-rock-emberlight">
                Restoration Of Christ's Kingdom
              </span>
            </h1>

            <p className="mt-6 max-w-md text-lg text-rock-muted">
              Real talk, real teaching. Bible study built for how you actually learn —
              bite-sized video, no pressure, your pace.
            </p>

            <div className="mt-9 flex flex-wrap gap-3.5">
              <Link
                to="/courses"
                className="rounded-full bg-grad-gold px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-[#0b1220] shadow-[0_12px_28px_rgba(255,47,165,0.32)] hover:opacity-90 transition-opacity"
              >
                Start a course
              </Link>
              <Link
                to="/sign-up"
                className="rounded-full border-2 border-rock-gold px-7 py-4 text-sm font-bold uppercase tracking-wide hover:bg-rock-gold/10 transition-colors"
              >
                See what's up
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-7">
              <Stat num="12+" label="Courses live" />
              <Stat num="300+" label="Students learning" />
              <Stat num="4.9" label="Avg rating" />
            </div>
          </div>

          <div className="relative">
            <div className="rotate-2 rounded-[28px] border border-rock-border bg-rock-panel p-3.5 shadow-2xl">
              <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[20px] bg-gradient-to-br from-[#182335] to-[#223148]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(32,227,207,0.35),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(255,47,165,0.3),transparent_55%)]" />
                <button
                  aria-label="Play preview"
                  className="relative z-[1] flex h-16 w-16 items-center justify-center rounded-full bg-grad-gold shadow-[0_10px_30px_rgba(32,227,207,0.4)]"
                >
                  <span className="ml-1 h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-[#0b1220]" />
                </button>
                <span className="absolute bottom-4 left-4 z-[1] rounded-full bg-rock-bg/60 px-3.5 py-2 font-display text-sm backdrop-blur-sm">
                  Ep. 01 — Genesis
                </span>
              </div>
            </div>

            <div className="absolute -right-4 -top-4 -rotate-6 rounded-2xl border border-rock-border bg-rock-panel2 px-4 py-3.5 shadow-xl">
              <div className="font-display text-2xl leading-none text-rock-ember">5</div>
              <div className="mt-0.5 text-[10px] uppercase tracking-wide text-rock-muted">Day streak</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-rock-border py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-10 font-display text-4xl sm:text-5xl">
            How it <span className="text-rock-gold">works</span>
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            <StepCard n="01" title="Enroll" desc="Pick a course and jump in — every session is recorded, no FOMO." />
            <StepCard n="02" title="Walk the path" desc="Every lesson lights up another stone. Watch your streak grow." />
            <StepCard n="03" title="Level up" desc="Finish a course, get a certificate, unlock badges as you go." />
          </div>
        </div>
      </section>
    </div>
  )
}

function Stat({ num, label }) {
  return (
    <div>
      <div className="font-display text-3xl leading-none text-rock-gold">{num}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wide text-rock-muted">{label}</div>
    </div>
  )
}

function StepCard({ n, title, desc }) {
  return (
    <div className="rounded-2xl border border-rock-border bg-rock-panel p-6">
      <p className="font-display text-4xl leading-none text-rock-gold">{n}</p>
      <h3 className="mt-2.5 font-display text-2xl">{title}</h3>
      <p className="mt-2 text-sm text-rock-muted">{desc}</p>
    </div>
  )
}
