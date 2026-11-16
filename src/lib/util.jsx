import { createContext, useContext, useEffect, useState } from 'react'

export const asset = (p) => `${import.meta.env.BASE_URL}${p}`
// Phones get lighter copies of the large photos (1280px instead of 1600-2000px).
export const PHONE = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
const HAS_M = new Set(["gallery/2025/committee-room", "gallery/2025/crisis-simulation", "gallery/2025/flag-tradition", "gallery/2025/gpmun-sign", "gallery/2025/opening-audience", "gallery/2025/venue-hall", "gallery/2026/audience", "gallery/2026/awards-ceremony", "gallery/2026/business-track", "gallery/2026/celebration", "gallery/2026/committee-session", "gallery/2026/committee-vote", "gallery/2026/delegate-speaking", "gallery/2026/german-delegation", "gallery/2026/guest-visit", "gallery/2026/networking", "impact/donation-boxes", "impact/donation-sorting", "impact/zahvalnica", "people/nazar"])
export const img = (name, size) => asset(`img/${name}${size ? '-' + size : PHONE && HAS_M.has(name) ? '-m' : ''}.webp`)

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
export const usePrefersReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)')

// The committee a visitor picks travels with them to the application form.
const SeatCtx = createContext({ seat: null, setSeat: () => {} })
export function SeatProvider({ children }) {
  const [seat, set] = useState(() => {
    try {
      return sessionStorage.getItem('bdbc-seat')
    } catch {
      return null
    }
  })
  const setSeat = (id) => {
    set(id)
    try {
      id ? sessionStorage.setItem('bdbc-seat', id) : sessionStorage.removeItem('bdbc-seat')
    } catch {
      /* storage unavailable */
    }
  }
  return <SeatCtx.Provider value={{ seat, setSeat }}>{children}</SeatCtx.Provider>
}
export const useSeat = () => useContext(SeatCtx)

// True once the preloader has lifted; page animations wait for it.
export const ReadyCtx = createContext(true)
export const useReady = () => useContext(ReadyCtx)

export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | BDBC` : 'BDBC — Belgrade Diplomacy & Business Conference'
  }, [title])
}
