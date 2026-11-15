import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, initReveals } from './lib/motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import LiveDove from './components/LiveDove'
import { RouterProvider, useRoute, Link } from './lib/router'
import { ReadyCtx, SeatProvider, usePrefersReducedMotion } from './lib/util'
import Home from './pages/Home'
import About from './pages/About'
import Committees from './pages/Committees'
import Program from './pages/Program'
import Impact from './pages/Impact'
import Recognition from './pages/Recognition'
import WhyBdbc from './pages/WhyBdbc'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Apply from './pages/Apply'
import { Privacy, Terms } from './pages/Legal'

const PAGES = {
  '/': Home,
  '/about': About,
  '/committees': Committees,
  '/program': Program,
  '/impact': Impact,
  '/recognition': Recognition,
  '/why-bdbc': WhyBdbc,
  '/gallery': Gallery,
  '/contact': Contact,
  '/apply': Apply,
  '/privacy': Privacy,
  '/terms': Terms,
}

function useSmoothScroll(reduced) {
  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      window.__lenis = null
    }
  }, [reduced])
}

// Shows the current page; on navigation a curtain wipes over, the page swaps
// underneath, and the curtain lifts.
function Stage({ ready }) {
  const { path } = useRoute()
  const reduced = usePrefersReducedMotion()
  const [shown, setShown] = useState(path)
  const curtain = useRef(null)
  const main = useRef(null)

  useEffect(() => {
    if (path === shown) return
    const swap = () => {
      setShown(path)
      window.__lenis ? window.__lenis.scrollTo(0, { immediate: true, force: true }) : window.scrollTo(0, 0)
    }
    if (reduced) return swap()
    const c = curtain.current
    const tl = gsap.timeline()
    tl.set(c, { display: 'block', clipPath: 'inset(100% 0 0 0)' })
      .to(c, { clipPath: 'inset(0% 0 0 0)', duration: 0.55, ease: 'expo.inOut' })
      .add(swap)
      .to(c, { clipPath: 'inset(0 0 100% 0)', duration: 0.65, ease: 'expo.inOut' }, '+=0.12')
      .set(c, { display: 'none' })
    return () => tl.progress(1).kill()
  }, [path, shown, reduced])

  useLayoutEffect(() => {
    if (!ready) return
    const off = initReveals(main.current)
    const t = setTimeout(() => ScrollTrigger.refresh(), 600)
    return () => {
      clearTimeout(t)
      off()
    }
  }, [shown, ready])

  const P = PAGES[shown]
  return (
    <>
      <main id="main" ref={main} key={shown}>
        {P ? (
          <P />
        ) : (
          <section className="on-dark flex min-h-screen items-end bg-ink pb-24 text-white">
            <div className="wrap">
              <h1 className="display t-xl">Page not found.</h1>
              <Link to="/" className="btn btn-line mt-10">
                <span>Back to home</span>
              </Link>
            </div>
          </section>
        )}
      </main>
      <div ref={curtain} className="pointer-events-none fixed inset-0 z-[140] hidden bg-crimson" aria-hidden="true">
        <div className="absolute inset-0 grid place-items-center">
          <span className="display text-[22vw] text-white/15">BDBC</span>
        </div>
      </div>
    </>
  )
}

export default function App() {
  const reduced = usePrefersReducedMotion()
  const [ready, setReady] = useState(reduced)
  const done = useCallback(() => setReady(true), [])
  useSmoothScroll(reduced)
  useEffect(() => {
    const on = () => ScrollTrigger.refresh()
    window.addEventListener('load', on)
    return () => window.removeEventListener('load', on)
  }, [])
  return (
    <RouterProvider>
      <SeatProvider>
        <ReadyCtx.Provider value={ready}>
          {!ready && !reduced && <Preloader onDone={done} />}
          <Cursor />
          <Nav />
          <Stage ready={ready} />
          <Footer />
          <LiveDove />
        </ReadyCtx.Provider>
      </SeatProvider>
    </RouterProvider>
  )
}
