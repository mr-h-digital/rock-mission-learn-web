import { Link } from 'react-router-dom'
import Marquee from '../components/Marquee'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { user } = useAuth()

  const firstName = user?.displayName?.trim()?.split(/\s+/)?.[0] || 'friend'
  const featuredPaths = [
    { title: 'Foundations', desc: 'Start with the core truths of Scripture and build a strong walk with Christ.', tone: 'Beginner path', accent: 'text-rock-gold' },
    { title: 'Christian Living', desc: 'Explore faith in everyday life, decisions, prayer, relationships, and purpose.', tone: 'Life application', accent: 'text-rock-kingdom' },
    { title: 'Leadership', desc: 'Grow into servant leadership, discipleship, and ministry responsibility.', tone: 'For emerging leaders', accent: 'text-rock-emberlight' },
  ]
  const communityMoments = [
    { value: '300+', label: 'Learners walking the journey' },
    { value: '12+', label: 'Courses guiding growth' },
    { value: '4.9', label: 'Average learner rating' },
  ]

  return (
    <div className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img
          src="/images/home-bg-designer-67.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(33,230,193,0.16),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(232,93,255,0.16),transparent_26%),radial-gradient(circle_at_50%_72%,rgba(0,168,255,0.12),transparent_30%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09111f]/28 via-[#0a1424]/52 to-[#070b14]/82" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(7,11,20,0.35),rgba(7,11,20,0.08)_36%,rgba(7,11,20,0.45)_100%)]" />
      </div>

      <Marquee items={['Walk the path', 'Learn Scripture', 'Grow in Christ', 'Study together']} />

      <section className="mx-auto max-w-6xl px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[28px] border border-rock-border bg-rock-panel/58 p-5 shadow-[0_24px_80px_rgba(2,8,18,0.45)] backdrop-blur-xl sm:rounded-[32px] sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute inset-0 bg-grad-kingdom opacity-90" />
            <div className="pointer-events-none absolute -left-12 top-10 h-40 w-40 rounded-full bg-rock-gold/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 bottom-0 h-52 w-52 rounded-full bg-rock-ember/10 blur-3xl" />
            <div className="relative">
            {user && (
              <p className="mb-5 inline-flex items-center rounded-full border border-rock-border bg-white/6 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-rock-goldlight">
                Welcome back, {firstName}
              </p>
            )}
            <div className="hero-lockup">
              <div className="hero-lockup__mark-wrap">
                <span className="hero-lockup__mark-frame">
                  <img
                    src="/brand/armory-mark.png"
                    alt="The Armory by Rock Mission"
                    className="hero-lockup__mark"
                  />
                </span>
              </div>
              <div className="hero-lockup__the">
                <span className="hero-lockup__line" aria-hidden="true" />
                <span>THE</span>
                <span className="hero-lockup__line" aria-hidden="true" />
              </div>
              <div className="hero-lockup__title-wrap">
                <div className="hero-lockup__title">ARMORY</div>
              </div>
              <div className="hero-lockup__tagline">EQUIPPED BY TRUTH.</div>
              <div className="hero-lockup__endorsement">
                <span className="hero-lockup__line" aria-hidden="true" />
                <span>BY ROCK MISSION</span>
                <span className="hero-lockup__line" aria-hidden="true" />
              </div>
            </div>

            <h1 className="mt-8 max-w-4xl font-display text-[34px] leading-[1.02] tracking-[-0.05em] text-rock-cream sm:mt-10 sm:text-[50px] lg:text-[72px]">
              Build strong foundations, understand Scripture, and grow into your purpose.
            </h1>

            <p className="mt-4 max-w-2xl font-body text-[15px] font-medium leading-7 text-rock-muted sm:mt-5 sm:text-lg">
              The Armory is a cinematic discipleship platform for learners growing in Christ through structured Bible teaching, reflection, and real-life application.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3.5">
              <Link
                to="/courses"
                className="armory-button-primary w-full sm:w-auto"
              >
                Start learning
              </Link>
              <Link
                to="/courses"
                className="armory-button-secondary w-full sm:w-auto"
              >
                Browse courses
              </Link>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {communityMoments.map((item) => (
                <Stat key={item.label} num={item.value} label={item.label} />
              ))}
            </div>
          </div>
          </div>

          <div className="grid gap-4">
            <div className="relative overflow-hidden rounded-[28px] border border-rock-border bg-rock-panel/52 p-4 shadow-[0_24px_60px_rgba(2,8,18,0.42)] backdrop-blur-xl sm:rounded-[30px] sm:p-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(33,230,193,0.18),transparent_36%),radial-gradient(circle_at_78%_24%,rgba(232,93,255,0.16),transparent_32%),linear-gradient(180deg,rgba(20,29,46,0.4),rgba(13,19,35,0.72))]" />
              <div className="relative rounded-[24px] border border-rock-border bg-rock-night/65 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-rock-goldlight">Continue walking</p>
                    <h2 className="mt-2 font-display text-2xl tracking-[-0.03em] text-rock-cream sm:text-3xl">Foundations of Faith</h2>
                  </div>
                  <span className="w-fit rounded-full border border-rock-border bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-rock-kingdom">Week 2</span>
                </div>
                <div className="mt-6 rounded-2xl border border-rock-border bg-black/15 p-4">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-rock-muted">
                    <span>Journey progress</span>
                    <span>68%</span>
                  </div>
                  <div className="mt-3 h-2.5 rounded-full bg-white/8">
                    <div className="h-full w-[68%] rounded-full bg-grad-gold" />
                  </div>
                  <div className="mt-4 grid gap-3 text-sm text-rock-muted sm:grid-cols-3">
                    <PathPill title="Scripture focus" value="Genesis 12" />
                    <PathPill title="Prayer moment" value="Trust the call" />
                    <PathPill title="Next step" value="Reflection prompts" />
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link to="/courses" className="armory-button-secondary w-full bg-white/8 text-xs sm:w-auto">
                    Explore pathways
                  </Link>
                  <Link to={user ? '/dashboard' : '/sign-up'} className="armory-button-secondary w-full text-xs text-rock-goldlight sm:w-auto">
                    {user ? 'Open dashboard' : 'Join the journey'}
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <FeatureCard eyebrow="Grow spiritually" title="Scripture with direction" body="Clear teaching paths help learners know what to study next without feeling overwhelmed." />
              <FeatureCard eyebrow="Study at your pace" title="Moments that fit real life" body="Watch, reflect, and return when you're ready — no pressure, just steady growth." highlight />
              <FeatureCard eyebrow="Walk together" title="Community-shaped learning" body="Courses, milestones, and testimonies create a journey that feels shared, not isolated." />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-rock-border py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-rock-goldlight">Featured learning paths</p>
              <h2 className="mt-3 font-display text-4xl tracking-[-0.03em] text-rock-cream sm:text-5xl">Choose where your walk deepens next.</h2>
            </div>
            <Link to="/courses" className="text-sm font-bold uppercase tracking-[0.18em] text-rock-kingdom hover:text-rock-gold">
              View all courses →
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {featuredPaths.map((path) => (
              <div key={path.title} className="relative overflow-hidden rounded-[28px] border border-rock-border bg-rock-panel/54 p-6 shadow-[0_18px_48px_rgba(2,8,18,0.32)] backdrop-blur-xl">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />
                <div className="relative">
                  <p className={`text-[11px] font-bold uppercase tracking-[0.22em] ${path.accent}`}>{path.tone}</p>
                  <h3 className="mt-3 font-display text-3xl tracking-[-0.03em] text-rock-cream">{path.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-rock-muted">{path.desc}</p>
                  <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-rock-muted2">
                    <span className="rounded-full border border-rock-border px-3 py-1.5">Video lessons</span>
                    <span className="rounded-full border border-rock-border px-3 py-1.5">Reflection</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-rock-border py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-[28px] border border-rock-border bg-rock-panel/58 p-5 shadow-[0_24px_80px_rgba(2,8,18,0.4)] backdrop-blur-xl sm:rounded-[32px] sm:p-10">
            <h2 className="mb-10 font-display text-4xl tracking-[-0.03em] text-rock-cream sm:text-5xl">
              How the <span className="text-rock-gold">journey</span> works
            </h2>
            <div className="grid gap-5 sm:grid-cols-3">
              <StepCard n="01" title="Begin the path" desc="Choose a course and start with confidence through clear guidance, short lessons, and Scripture focus." />
              <StepCard n="02" title="Stay in rhythm" desc="Track progress, return to reflection moments, and keep growing one lesson at a time." />
              <StepCard n="03" title="Live what you learn" desc="Carry the Word into prayer, action, conversation, and community beyond the screen." />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Stat({ num, label }) {
  return (
    <div className="rounded-2xl border border-rock-border bg-black/12 px-4 py-4">
      <div className="font-display text-3xl leading-none text-rock-gold">{num}</div>
      <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-rock-muted">{label}</div>
    </div>
  )
}

function StepCard({ n, title, desc }) {
  return (
    <div className="rounded-[28px] border border-rock-border bg-black/12 p-6">
      <p className="font-display text-4xl leading-none text-rock-kingdom">{n}</p>
      <h3 className="mt-3 font-display text-2xl tracking-[-0.03em] text-rock-cream">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-rock-muted">{desc}</p>
    </div>
  )
}

function FeatureCard({ eyebrow, title, body, highlight = false }) {
  return (
    <div className={`rounded-[28px] border p-5 backdrop-blur-xl ${highlight ? 'border-rock-gold/40 bg-rock-panel2/55 shadow-[0_18px_44px_rgba(33,230,193,0.12)]' : 'border-rock-border bg-rock-panel/42'}`}>
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-rock-goldlight">{eyebrow}</p>
      <h3 className="mt-3 font-display text-2xl tracking-[-0.03em] text-rock-cream">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-rock-muted">{body}</p>
    </div>
  )
}

function PathPill({ title, value }) {
  return (
    <div className="rounded-2xl border border-rock-border bg-white/[0.03] px-3 py-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rock-muted2">{title}</p>
      <p className="mt-1 text-sm font-semibold text-rock-cream">{value}</p>
    </div>
  )
}
