import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout, isAdmin, isEducator } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  function handleLogout() {
    logout()
    closeMenu()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-10 border-b border-rock-border bg-rock-bg/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          to="/"
          className="font-display text-xl leading-none tracking-wide sm:text-2xl"
          onClick={closeMenu}
        >
          ROCK<span className="text-rock-gold">MISSION</span>{' '}
          <span className="hidden align-middle font-body text-[10px] font-bold uppercase tracking-[0.2em] text-rock-muted sm:inline">
            Bible Study
          </span>
        </Link>

        <nav className="hidden items-center gap-6 font-body text-sm md:flex">
          <Link to="/" className="text-rock-muted hover:text-rock-gold transition-colors">
            Home
          </Link>
          <Link to="/courses" className="text-rock-muted hover:text-rock-gold transition-colors">
            Courses
          </Link>
          <a
            href="https://rockmission.co.za"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rock-muted hover:text-rock-gold transition-colors"
          >
            Main site
          </a>

          {user ? (
            <>
              <Link to="/dashboard" className="text-rock-muted hover:text-rock-gold transition-colors">
                My learning
              </Link>
              <Link to="/settings" className="text-rock-muted hover:text-rock-gold transition-colors">
                Settings
              </Link>
              {isEducator && (
                <Link to="/teach" className="text-rock-muted hover:text-rock-gold transition-colors">
                  Teach
                </Link>
              )}
              {isAdmin && (
                <Link to="/admin" className="text-rock-muted hover:text-rock-gold transition-colors">
                  Admin
                </Link>
              )}
              <span className="text-white/20">|</span>
              <span className="text-rock-cream/80">{user.displayName}</span>
              <button
                onClick={handleLogout}
                className="rounded-full border border-rock-border px-3 py-1.5 text-xs text-rock-cream transition-colors hover:border-rock-gold hover:text-rock-gold"
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

        <button
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-rock-border text-rock-cream md:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-5 flex-col gap-1.5">
            <span
              className={`h-0.5 bg-current transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span className={`h-0.5 bg-current transition-opacity ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span
              className={`h-0.5 bg-current transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </span>
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-rock-border bg-rock-bg/95 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 font-body text-sm sm:px-6">
            <Link to="/" onClick={closeMenu} className="text-rock-muted hover:text-rock-gold transition-colors">
              Home
            </Link>
            <Link to="/courses" onClick={closeMenu} className="text-rock-muted hover:text-rock-gold transition-colors">
              Courses
            </Link>
            <a
              href="https://rockmission.co.za"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="text-rock-muted hover:text-rock-gold transition-colors"
            >
              Main site
            </a>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="text-rock-muted hover:text-rock-gold transition-colors"
                >
                  My learning
                </Link>
                <Link
                  to="/settings"
                  onClick={closeMenu}
                  className="text-rock-muted hover:text-rock-gold transition-colors"
                >
                  Settings
                </Link>
                {isEducator && (
                  <Link to="/teach" onClick={closeMenu} className="text-rock-muted hover:text-rock-gold transition-colors">
                    Teach
                  </Link>
                )}
                {isAdmin && (
                  <Link to="/admin" onClick={closeMenu} className="text-rock-muted hover:text-rock-gold transition-colors">
                    Admin
                  </Link>
                )}
                <span className="truncate text-xs uppercase tracking-wide text-rock-muted">{user.displayName}</span>
                <button
                  onClick={handleLogout}
                  className="w-full rounded-full border border-rock-border px-3 py-2 text-left text-xs text-rock-cream transition-colors hover:border-rock-gold hover:text-rock-gold"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/sign-in" onClick={closeMenu} className="text-rock-muted hover:text-rock-gold transition-colors">
                  Sign in
                </Link>
                <Link
                  to="/sign-up"
                  onClick={closeMenu}
                  className="rounded-full bg-grad-gold px-5 py-2 text-center text-xs font-extrabold uppercase tracking-wide text-[#0b1220] shadow-[0_10px_26px_rgba(32,227,207,0.28)] hover:opacity-90 transition-opacity"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
