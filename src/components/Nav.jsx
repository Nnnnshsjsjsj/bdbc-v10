import { useEffect, useState } from 'react'
import { Link, useRoute } from '../lib/router'
import Dove from './Dove'

const LINKS = [
  ['/about', 'About'],
  ['/committees', 'Committees'],
  ['/program', 'Agenda'],
  ['/impact', 'Impact'],
]

export default function Nav() {
  const { path } = useRoute()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => setOpen(false), [path])

  return (
    <header className={`on-ink fixed inset-x-0 top-0 z-50 text-white transition-colors duration-300 ${solid || open ? 'bg-ink' : 'bg-transparent'}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:bg-white focus:px-3 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <nav className="mx-auto flex h-16 max-w-[90rem] items-center gap-6 px-5 sm:px-8" aria-label="Main">
        <Link to="/" className="mr-auto flex items-center gap-2.5" aria-label="BDBC home">
          <span data-nav-dove className="block h-8 w-8">
            <Dove className="h-8 w-8" stroke="#0c2340" width={12} />
          </span>
          <span className="font-display text-xl tracking-wide">BDBC</span>
        </Link>
        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map(([to, label]) => (
            <li key={to}>
              <Link to={to} className={`text-[0.95rem] hover:text-white ${path === to ? 'text-white underline decoration-2 underline-offset-8' : 'text-white/75'}`} aria-current={path === to ? 'page' : undefined}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/apply" className="btn btn-apply hidden !py-2.5 sm:inline-flex">
          Apply
        </Link>
        <button className="md:hidden -mr-2 px-2 py-2 text-[0.95rem] font-semibold" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-white/10 px-5 pb-8 pt-4 md:hidden">
          <ul className="space-y-1">
            {[...LINKS, ['/gallery', 'Gallery'], ['/contact', 'Contact']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="font-display block py-2 text-4xl">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/apply" className="btn btn-apply mt-6 w-full justify-center">
            Apply for BDBC 2027
          </Link>
        </div>
      )}
    </header>
  )
}
