import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout, isEducator } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-10 border-b border-rock-border bg-rock-bg/85 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl tracking-wide">
          ROCK<span className="text-rock-gold">MISSION</span>{' '}
          <span className="align-middle font-body text-[10px] font-bold uppercase tracking-[0.2em] text-rock-muted">
            Bible Study
          </span>
        </Link>

        <nav className="flex items-center gap-6 font-body text-sm">
          <Link to="/courses" className="text-rock-muted hover:text-rock-gold transition-colors">
            Courses
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" className="text-rock-muted hover:text-rock-gold transition-colors">
                My learning
              </Link>
              {isEducator && (
                <Link to="/teach" className="text-rock-muted hover:text-rock-gold transition-colors">
                  Teach
                </Link>
              )}
              <span className="text-white/20">|</span>
              <span className="text-rock-cream/80">{user.displayName}</span>
              <button
                onClick={() => {
                  logout()
                  navigate('/')
                }}
                className="rounded-full border border-rock-border px-3 py-1.5 text-xs text-rock-cream hover:border-rock-gold hover:text-rock-gold transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/sign-in" className="text-rock-muted hover:text-rock-gold transition-colors">
                Sign in
              </Link>
              <Link
                to="/sign-up"
                className="rounded-full bg-grad-gold px-5 py-2 text-xs font-extrabold uppercase tracking-wide text-[#0b1220] shadow-[0_10px_26px_rgba(32,227,207,0.28)] hover:opacity-90 transition-opacity"
              >
                Get started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
