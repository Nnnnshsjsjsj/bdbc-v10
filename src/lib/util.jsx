import { createContext, useContext, useEffect, useState } from 'react'

export const asset = (p) => `${import.meta.env.BASE_URL}${p}`
export const img = (name, size) => asset(`img/${name}${size ? '-' + size : ''}.webp`)

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
