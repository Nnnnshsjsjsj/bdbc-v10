import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { asset } from '../lib/util'

// First-visit curtain: the logo, a counter, then the page is uncovered.
export default function Preloader({ onDone }) {
  const root = useRef(null)
  const num = useRef(null)
  useEffect(() => {
    const o = { v: 0 }
    const tl = gsap.timeline({ onComplete: onDone })
    tl.from('[data-pl-logo]', { scale: 0.6, autoAlpha: 0, duration: 0.8, ease: 'expo.out' })
      .to(o, { v: 100, duration: 1.5, ease: 'power2.inOut', onUpdate: () => (num.current.textContent = String(Math.round(o.v)).padStart(3, '0')) }, 0)
      .to('[data-pl-bar]', { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0)
      .to('[data-pl-in]', { yPercent: -110, duration: 0.5, ease: 'power3.in', stagger: 0.04 }, 1.55)
      .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' }, 1.75)
    return () => tl.kill()
  }, [onDone])
  return (
    <div ref={root} className="fixed inset-0 z-[150] flex flex-col bg-ink text-white" style={{ clipPath: 'inset(0 0 0% 0)' }} aria-hidden="true">
      <div className="wrap flex flex-1 items-center justify-center">
        <div className="overflow-hidden">
          <img data-pl-logo data-pl-in src={asset('logo.png')} alt="" className="h-36 w-36 md:h-48 md:w-48" />
        </div>
      </div>
      <div className="wrap flex items-end justify-between pb-8">
        <div className="overflow-hidden">
          <p data-pl-in className="label text-white/70">
            Belgrade Diplomacy &amp; Business Conference
          </p>
        </div>
        <div className="overflow-hidden">
          <p data-pl-in ref={num} className="display text-[18vw] leading-[0.8] md:text-[9vw]">
            000
          </p>
        </div>
      </div>
      <div data-pl-bar className="h-1 origin-left scale-x-0 bg-crimson" />
    </div>
  )
}
