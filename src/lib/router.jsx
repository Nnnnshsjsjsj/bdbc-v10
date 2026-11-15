import { createContext, useContext, useEffect, useState, useCallback } from 'react'

// Production uses real paths (/about). The review build (VITE_PREVIEW=1) runs
// where only plain hashes work, so there /about becomes #about.
export const HASH_MODE = import.meta.env.VITE_PREVIEW === '1'
const REDIRECTS = { '/agenda': '/program' }

function readPath() {
  if (HASH_MODE) {
    const h = window.location.hash.replace(/^#/, '')
    return h && h !== 'home' ? '/' + h : '/'
  }
  return window.location.pathname.replace(/\/+$/, '') || '/'
}
const norm = (p) => REDIRECTS[p] || p

export function href(to) {
  if (!HASH_MODE) return to
  return to === '/' ? '#home' : '#' + to.replace(/^\//, '')
}

const Ctx = createContext({ path: '/', go: () => {} })

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() => norm(readPath()))
  useEffect(() => {
    const ev = HASH_MODE ? 'hashchange' : 'popstate'
    const on = () => setPath(norm(readPath()))
    window.addEventListener(ev, on)
    return () => window.removeEventListener(ev, on)
  }, [])
  const go = useCallback((to) => {
    if (HASH_MODE) window.location.hash = href(to).slice(1)
    else {
      window.history.pushState({}, '', to)
      setPath(norm(to))
    }
  }, [])
  return <Ctx.Provider value={{ path, go }}>{children}</Ctx.Provider>
}

export const useRoute = () => useContext(Ctx)

export function Link({ to, children, onClick, ...rest }) {
  const { go } = useRoute()
  return (
    <a
      href={href(to)}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        go(to)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
