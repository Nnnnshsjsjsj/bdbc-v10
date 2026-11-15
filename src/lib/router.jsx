import { createContext, useContext, useEffect, useState, useCallback } from 'react'

// Tiny router. Production uses real paths (/about) served by Cloudflare Pages.
// The preview build (VITE_PREVIEW=1) runs inside a sandbox that only allows
// plain hashes, so there /about becomes #about.
export const HASH_MODE = import.meta.env.VITE_PREVIEW === '1'

const ROUTES = ['/', '/about', '/committees', '/program', '/impact', '/gallery', '/contact', '/apply', '/privacy', '/terms']

// Old v9 URLs that no longer have their own page.
const REDIRECTS = { '/recognition': '/about', '/why-bdbc': '/', '/agenda': '/program' }

function readPath() {
  if (HASH_MODE) {
    const h = window.location.hash.replace(/^#/, '')
    return h && h !== 'home' ? '/' + h : '/'
  }
  const p = window.location.pathname.replace(/\/+$/, '') || '/'
  return p
}

function normalise(p) {
  if (REDIRECTS[p]) return REDIRECTS[p]
  return p
}

export function href(to) {
  if (!HASH_MODE) return to
  return to === '/' ? '#home' : '#' + to.replace(/^\//, '')
}

const Ctx = createContext({ path: '/', go: () => {} })

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() => normalise(readPath()))

  useEffect(() => {
    const on = () => setPath(normalise(readPath()))
    window.addEventListener(HASH_MODE ? 'hashchange' : 'popstate', on)
    return () => window.removeEventListener(HASH_MODE ? 'hashchange' : 'popstate', on)
  }, [])

  const go = useCallback((to) => {
    if (HASH_MODE) {
      window.location.hash = href(to).slice(1)
    } else {
      window.history.pushState({}, '', to)
      setPath(normalise(to))
    }
  }, [])

  return <Ctx.Provider value={{ path, go }}>{children}</Ctx.Provider>
}

export const useRoute = () => useContext(Ctx)
export const isKnownRoute = (p) => ROUTES.includes(p)

export function Link({ to, children, className, onClick, ...rest }) {
  const { go } = useRoute()
  return (
    <a
      href={href(to)}
      className={className}
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
