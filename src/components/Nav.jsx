import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Link, useRoute } from '../lib/router'
import { EVENT, PAGES } from '../lib/data'
import { asset, img, useMedia } from '../lib/util'

export default function Nav() {
  const { path } = useRoute()
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(0)
  const [solid, setSolid] = useState(false)
  const panel = useRef(null)
  // The menu's photo column only exists on wide screens, and its photos are
  // fetched the first time the menu opens, not with every page.
  const wide = useMedia('(min-width: 768px)')
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    if (open) setSeen(true)
  }, [open])

  useEffect(() => setOpen(false), [path])
  useEffect(() => {
    if (open) setHover(Math.max(0, PAGES.findIndex((p) => p[0] === path)))
  }, [open, path])
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    const p = panel.current
    window.__lenis?.[open ? 'stop' : 'start']()
    if (open) {
      gsap.set(p, { display: 'block' })
      gsap.fromTo(p, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'expo.inOut' })
      gsap.fromTo(p.querySelectorAll('[data-m] > span'), { yPercent: 115 }, { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.045, delay: 0.3 })
      gsap.fromTo(p.querySelectorAll('[data-mf]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, delay: 0.7 })
    } else {
      gsap.to(p, { clipPath: 'inset(0 0 100% 0)', duration: 0.6, ease: 'expo.inOut', onComplete: () => gsap.set(p, { display: 'none' }) })
    }
  }, [open])

  useEffect(() => {
    const on = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[120] transition-[background-color,color,padding] duration-500 ${solid && !open ? 'bg-ink/85 backdrop-blur-md' : ''} ${open && PAGES[hover][4] !== '#ffffff' ? 'on-light' : 'on-dark'}`}
        style={{ color: open ? PAGES[hover][4] : '#ffffff' }}
      >
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:bg-white focus:px-3 focus:py-2 focus:text-ink">
          Skip to content
        </a>
        <nav className={`wrap flex items-center gap-4 transition-[height] duration-500 ${solid ? 'h-16' : 'h-20 md:h-24'}`} aria-label="Main">
          <Link to="/" className="mr-auto flex items-center gap-3" aria-label="BDBC home">
            <img src={asset('logo-256.webp')} alt="BDBC logo" className={`transition-all duration-500 ${solid ? 'h-10 w-10' : 'h-12 w-12 md:h-14 md:w-14'}`} />
            <span className="display text-2xl tracking-wide">BDBC</span>
          </Link>
          <Link to="/apply" className="btn btn-red !hidden !py-3 sm:!inline-flex" data-cursor="Apply">
            <span>Apply Now</span>
            <span className="dot" aria-hidden="true" />
          </Link>
          <button className="btn btn-line !py-3" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((v) => !v)}>
            <span>{open ? 'Close' : 'Menu'}</span>
            <span className="flex flex-col gap-[3px]" aria-hidden="true">
              <i className={`block h-px w-4 bg-current transition-transform duration-300 ${open ? 'translate-y-[2px] rotate-45' : ''}`} />
              <i className={`block h-px w-4 bg-current transition-transform duration-300 ${open ? '-translate-y-[2px] -rotate-45' : ''}`} />
            </span>
          </button>
        </nav>
      </header>

      <div
        id="menu"
        ref={panel}
        className="fixed inset-0 z-[110] hidden overflow-y-auto transition-[background-color,color] duration-500"
        style={{ background: PAGES[hover][3], color: PAGES[hover][4] }}
        data-lenis-prevent
      >
        <div className="wrap grid min-h-full gap-8 pb-8 pt-24 md:grid-cols-[1.25fr_1fr] md:pt-28">
          <ul className="self-center">
            {PAGES.map(([to, label], i) => (
              <li key={to} className="border-t border-current/20 first:border-t-0">
                <Link to={to} onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} className="group flex items-baseline gap-5 py-1" aria-current={path === to ? 'page' : undefined}>
                  <span data-m className="ln display text-[min(13vw,7.4svh)] md:text-[min(6.2vw,7.4svh)]">
                    <span className={`inline-flex items-baseline gap-4 transition-[opacity,transform] duration-300 group-hover:translate-x-3 ${hover === i ? 'opacity-100' : 'opacity-45'}`}>
                      {label}
                      {path === to && <span className="serif-it text-[0.45em] normal-case">you are here</span>}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {wide && <div className="flex flex-col" data-mf>
            <div className="relative flex-1 overflow-hidden">
              {seen && PAGES.map(([to, , src], i) => (
                <img key={to} src={img(src)} alt="" className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${hover === i ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`} />
              ))}
            </div>
          </div>}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-1 text-sm opacity-80 md:col-span-2" data-mf>
            <a className="ulink py-3" href={`mailto:${EVENT.email}`}>
              {EVENT.email}
            </a>
            <a className="ulink py-3" href={EVENT.instagram} target="_blank" rel="noreferrer">
              Instagram {EVENT.handle}
            </a>
            <a className="ulink py-3" href={EVENT.tiktok} target="_blank" rel="noreferrer">
              TikTok {EVENT.handle}
            </a>
            <Link to="/apply" className="btn btn-red ml-auto sm:!hidden">
              <span>Apply Now</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
