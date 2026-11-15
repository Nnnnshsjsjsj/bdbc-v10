import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// A dot that follows the pointer and grows over links. Fine pointers only.
export default function Cursor() {
  const el = useRef(null)
  const label = useRef(null)
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    document.documentElement.classList.add('has-cursor')
    const x = gsap.quickTo(el.current, 'x', { duration: 0.35, ease: 'power3.out' })
    const y = gsap.quickTo(el.current, 'y', { duration: 0.35, ease: 'power3.out' })
    const move = (e) => {
      x(e.clientX)
      y(e.clientY)
      const t = e.target.closest?.('[data-cursor], a, button, label, input, select, textarea')
      const text = t?.closest('[data-cursor]')?.dataset.cursor
      el.current.classList.toggle('is-label', !!text)
      el.current.classList.toggle('is-link', !!t && !text)
      if (text) label.current.textContent = text
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])
  return (
    <div ref={el} className="cursor hidden [@media(pointer:fine)]:grid" aria-hidden="true">
      <span ref={label} />
    </div>
  )
}
