import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Scroll-driven reveals, declared in markup with data attributes:
//   data-lines   heading whose .ln > span lines rise into place
//   data-fade    block that fades up
//   data-img     wrapper whose image wipes in
//   data-parallax="12"   element drifts by that percentage while in view
//   data-words   paragraph whose words light up as you scroll
//   data-count="220"     number that counts up
export function initReveals(root) {
  if (!root || reduced()) return () => {}
  const ctx = gsap.context(() => {
    root.querySelectorAll('[data-lines]').forEach((el) => {
      const inner = el.querySelectorAll('.ln > span')
      gsap.set(inner, { yPercent: 118 })
      ScrollTrigger.create({
        trigger: el,
        start: 'top 92%',
        once: true,
        onEnter: () => gsap.to(inner, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.09, delay: Number(el.dataset.delay || 0) }),
      })
    })
    root.querySelectorAll('[data-fade]').forEach((el) => {
      gsap.set(el, { autoAlpha: 0, y: 28 })
      ScrollTrigger.create({
        trigger: el,
        start: 'top 94%',
        once: true,
        onEnter: () => gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: Number(el.dataset.delay || 0) }),
      })
    })
    root.querySelectorAll('[data-img]').forEach((el) => {
      const im = el.querySelector('img, video')
      gsap.set(el, { clipPath: 'inset(0 0 100% 0)' })
      if (im) gsap.set(im, { scale: 1.25 })
      ScrollTrigger.create({
        trigger: el,
        start: 'top 92%',
        once: true,
        onEnter: () => {
          gsap.to(el, { clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'expo.out', delay: Number(el.dataset.delay || 0) })
          if (im) gsap.to(im, { scale: 1, duration: 1.6, ease: 'expo.out' })
        },
      })
    })
    root.querySelectorAll('[data-parallax]').forEach((el) => {
      const p = Number(el.dataset.parallax || 10)
      gsap.fromTo(el, { yPercent: -p }, { yPercent: p, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } })
    })
    root.querySelectorAll('[data-words]').forEach((el) => {
      const words = el.textContent.trim().split(/\s+/)
      el.setAttribute('aria-label', el.textContent.trim())
      el.innerHTML = words.map((w) => `<span aria-hidden="true" class="w">${w}</span>`).join(' ')
      gsap.fromTo(el.querySelectorAll('.w'), { opacity: 0.14 }, { opacity: 1, ease: 'none', stagger: 0.5, scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 45%', scrub: 0.4 } })
    })
    root.querySelectorAll('[data-count]').forEach((el) => {
      const end = Number(el.dataset.count)
      const o = { v: 0 }
      el.textContent = '0'
      ScrollTrigger.create({
        trigger: el,
        start: 'top 92%',
        once: true,
        onEnter: () => gsap.to(o, { v: end, duration: 1.8, ease: 'power3.out', onUpdate: () => (el.textContent = Math.round(o.v)) }),
      })
    })
  }, root)
  return () => ctx.revert()
}

export { gsap, ScrollTrigger }
