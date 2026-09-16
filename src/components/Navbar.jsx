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
      <div className="armory-shell flex items-center justify-between gap-3 py-3 sm:py-4">
        <Link
          to="/"
          className="group flex items-center gap-3 leading-none"
          onClick={closeMenu}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-rock-border bg-rock-night/80 p-2 sm:h-14 sm:w-14">
            <img
              src="/brand/armory-mark.png"
              alt="The Armory by Rock Mission"
              className="h-full w-full object-contain"
            />
          </span>
          <span className="flex flex-col">
            <span className="font-display text-base tracking-[0.06em] text-rock-cream sm:text-xl">
              THE <span className="bg-grad-gold bg-clip-text text-transparent">ARMORY</span>
            </span>
            <span className="mt-1 hidden font-body text-[9px] font-bold uppercase tracking-[0.24em] text-rock-muted lg:inline">
              Equipped by Truth
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 font-body text-sm md:flex">
          <Link to="/" className="text-rock-muted hover:text-rock-gold transition-colors">
            Home
          </Link>
          <Link to="/courses" className="text-rock-muted hover:text-rock-gold transition-colors">
            Training Paths
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
                Dashboard
              </Link>
              <Link to="/settings" className="text-rock-muted hover:text-rock-gold transition-colors">
                Settings
              </Link>
              {isEducator && (
                <Link to="/teach" className="text-rock-muted hover:text-rock-gold transition-colors">
                  Educator Studio
                </Link>
              )}
              {isAdmin && (
                <Link to="/admin" className="text-rock-muted hover:text-rock-gold transition-colors">
                  Platform Admin
                </Link>
              )}
              <span className="text-white/20">|</span>
              <span className="text-rock-cream/80">{user.displayName}</span>
              <button
                onClick={handleLogout}
                className="armory-button-secondary px-4 py-2 text-xs"
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
                className="armory-button-primary px-5 py-2 text-xs"
              >
                Begin training
              </Link>
            </>
          )}
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-rock-border text-rock-cream md:hidden"
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
          <div className="armory-shell flex flex-col gap-3 py-4 font-body text-sm">
            <Link to="/" onClick={closeMenu} className="text-rock-muted hover:text-rock-gold transition-colors">
              Home
            </Link>
            <Link to="/courses" onClick={closeMenu} className="text-rock-muted hover:text-rock-gold transition-colors">
              Training Paths
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
                  Dashboard
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
                    Educator Studio
                  </Link>
                )}
                {isAdmin && (
                  <Link to="/admin" onClick={closeMenu} className="text-rock-muted hover:text-rock-gold transition-colors">
                    Platform Admin
                  </Link>
                )}
                <span className="truncate text-xs uppercase tracking-wide text-rock-muted">{user.displayName}</span>
                <button
                  onClick={handleLogout}
                  className="armory-button-secondary w-full justify-start px-4 py-2 text-left text-xs"
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
                  className="armory-button-primary text-center text-xs"
                >
                  Begin training
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
