import { createContext, useContext, useEffect, useState } from 'react'

export const img = (name, size) => `${import.meta.env.BASE_URL}img/${name}${size ? '-' + size : ''}.webp`

export function usePrefersReducedMotion() {
  const q = '(prefers-reduced-motion: reduce)'
  const [v, setV] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const m = window.matchMedia(q)
    const on = () => setV(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return v
}

export function useMedia(query) {
  const [v, setV] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const m = window.matchMedia(query)
    const on = () => setV(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [query])
  return v
}

// The committee a visitor picked on the seating plan travels to the application form.
const SeatCtx = createContext({ seat: null, setSeat: () => {} })

export function SeatProvider({ children }) {
  const [seat, setSeatState] = useState(() => {
    try {
      return sessionStorage.getItem('bdbc-seat')
    } catch {
      return null
    }
  })
  const setSeat = (id) => {
    setSeatState(id)
    try {
      id ? sessionStorage.setItem('bdbc-seat', id) : sessionStorage.removeItem('bdbc-seat')
    } catch {
      /* storage unavailable */
    }
  }
  return <SeatCtx.Provider value={{ seat, setSeat }}>{children}</SeatCtx.Provider>
}

export const useSeat = () => useContext(SeatCtx)

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | BDBC 2027` : 'BDBC 2027 | Belgrade Diplomacy & Business Conference'
  }, [title])
}

// In-page jump that works in both routing modes (a plain #id would be read as a route in preview).
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -64 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export function JumpLink({ to, className, children }) {
  return (
    <a
      href={`#${to}`}
      className={className}
      onClick={(e) => {
        e.preventDefault()
        scrollToId(to)
      }}
    >
      {children}
    </a>
  )
}
