import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { asset } from '../lib/util'

// The delegate pass from the original home page, hanging on its lanyard.
// It swings toward the pointer; name and country can be filled in live.
export default function Badge({ name = 'Your Name Here', country = 'Your Country Awaits', swing = true, className = '' }) {
  const stage = useRef(null)
  const badge = useRef(null)
  useEffect(() => {
    if (!swing || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const b = badge.current
    const rx = gsap.quickTo(b, 'rotationX', { duration: 1.4, ease: 'elastic.out(1, 0.45)' })
    const ry = gsap.quickTo(b, 'rotationY', { duration: 1.4, ease: 'elastic.out(1, 0.45)' })
    const rz = gsap.quickTo(b, 'rotationZ', { duration: 1.8, ease: 'elastic.out(1, 0.35)' })
    const idle = gsap.to(b, { rotationZ: 2.2, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    const on = (e) => {
      const r = stage.current.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth
      const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight
      idle.pause()
      ry(dx * 34)
      rx(-dy * 22)
      rz(dx * -10)
      b.style.setProperty('--shine', `${dx * 220}%`)
    }
    window.addEventListener('pointermove', on, { passive: true })
    return () => {
      window.removeEventListener('pointermove', on)
      idle.kill()
    }
  }, [swing])
  return (
    <div ref={stage} className={`badge-stage flex justify-center ${className}`}>
      <div ref={badge} className="badge">
        {swing && <div className="badge__strap" aria-hidden="true" />}
        <div className="badge__clip" aria-hidden="true" />
        <div className="badge__card">
          <img src={asset('logo.png')} alt="BDBC logo" className="mx-auto h-24 w-24" />
          <p className="label mt-5 text-crimson">BDBC 2027</p>
          <p className="mt-3 text-[1.7rem] font-bold leading-tight tracking-tight" key={name}>
            {name}
          </p>
          <div className="mx-auto my-5 h-px w-4/5 bg-ink/15" />
          <p className="label text-muted">Delegate</p>
          <p className="mt-2 text-lg font-semibold">{country}</p>
          <p className="label mt-6 inline-block rounded-md bg-paper px-3 py-2 text-[0.62rem] text-muted">Belgrade · Feb 2027</p>
          <div className="badge__shine" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
