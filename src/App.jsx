import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { RouterProvider, useRoute, Link } from './lib/router'
import { SeatProvider, usePrefersReducedMotion } from './lib/util'
import Home from './pages/Home'
import About from './pages/About'
import Committees from './pages/Committees'
import Program from './pages/Program'
import Impact from './pages/Impact'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Apply from './pages/Apply'
import { Privacy, Terms } from './pages/Legal'

gsap.registerPlugin(ScrollTrigger)

const PAGES = {
  '/': Home,
  '/about': About,
  '/committees': Committees,
  '/program': Program,
  '/impact': Impact,
  '/gallery': Gallery,
  '/contact': Contact,
  '/apply': Apply,
  '/privacy': Privacy,
  '/terms': Terms,
}

function useSmoothScroll() {
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true })
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

function Page() {
  const { path } = useRoute()
  const P = PAGES[path]
  useEffect(() => {
    window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [path])
  return (
    <main id="main" key={path}>
      {P ? (
        <P />
      ) : (
        <section className="on-ink min-h-[70vh] bg-ink px-5 pt-40 text-white sm:px-8">
          <div className="mx-auto max-w-[90rem]">
            <h1 className="font-display t-1">This page is not on the floor plan.</h1>
            <Link to="/" className="link mt-6 inline-block">
              Go to the home page
            </Link>
          </div>
        </section>
      )}
    </main>
  )
}

export default function App() {
  useSmoothScroll()
  return (
    <RouterProvider>
      <SeatProvider>
        <Nav />
        <Page />
        <Footer />
      </SeatProvider>
    </RouterProvider>
  )
}
