import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import gsap from 'gsap'

// The dove from the BDBC logo, redrawn as four parts so the wings can move.
// Shoulder pivots are in the 560 x 560 drawing space.
const P = {
  far: 'M 330 262 C 300 220, 268 150, 266 70 Q 288.7 75.5 300 96 Q 320 106.3 326 128 Q 344.4 142.6 346 166 Q 360.8 183.4 358 206 Q 367.8 225.6 360 246 Z',
  tail: 'M 290 400 C 250 420, 186 440, 128 452 Q 145 455.4 150 472 Q 167.6 469.6 178 484 Q 194.6 475.4 210 486 Q 223.4 469.8 244 474 Q 251.4 454.6 272 452 Q 275.6 430.8 296 424 Z',
  body: 'M 296 306 C 330 268, 370 250, 398 236 C 410 220, 428 216, 444 220 C 456 224, 462 236, 464 248 L 486 260 L 462 266 C 456 300, 432 342, 396 374 C 360 404, 312 418, 262 410 C 238 404, 232 386, 248 370 C 264 350, 280 326, 296 306 Z',
  near: 'M 336 296 C 290 220, 190 110, 84 58 Q 102.1 83.3 90 112 Q 111.4 131.5 106 160 Q 131.3 174.7 132 204 Q 160.2 214.5 166 244 Q 196.5 249.2 208 278 Q 238.7 276.6 256 302 Q 285.8 291.9 310 312 C 322 312, 332 306, 336 296 Z',
}

const Dove = forwardRef(function Dove({ animate = false, stroke = '#113158', fill = '#ffffff', width = 8, className = '', title = 'Dove from the BDBC logo' }, ref) {
  const root = useRef(null)
  const near = useRef(null)
  const far = useRef(null)
  const tail = useRef(null)
  const tl = useRef(null)

  useImperativeHandle(ref, () => ({
    el: root.current,
    speed: (s) => tl.current && gsap.to(tl.current, { timeScale: s, duration: 0.4, overwrite: true }),
  }))

  useEffect(() => {
    if (!animate) return
    const ctx = gsap.context(() => {
      gsap.set(near.current, { svgOrigin: '330 300' })
      gsap.set(far.current, { svgOrigin: '342 258' })
      gsap.set(tail.current, { svgOrigin: '286 410' })
      // One wing beat: a quick downstroke, a slower recovery, then a short glide.
      tl.current = gsap
        .timeline({ repeat: -1, repeatDelay: 0.5 })
        .to(near.current, { rotation: -38, scaleY: 0.82, duration: 0.42, ease: 'power2.in' }, 0)
        .to(far.current, { rotation: -14, scaleY: 0.7, duration: 0.42, ease: 'power2.in' }, 0)
        .to(tail.current, { rotation: 5, duration: 0.42, ease: 'sine.inOut' }, 0)
        .to(root.current, { y: -10, duration: 0.42, ease: 'power1.out' }, 0)
        .to(near.current, { rotation: 0, scaleY: 1, duration: 0.7, ease: 'power2.out' }, 0.42)
        .to(far.current, { rotation: 0, scaleY: 1, duration: 0.7, ease: 'power2.out' }, 0.42)
        .to(tail.current, { rotation: 0, duration: 0.7, ease: 'sine.inOut' }, 0.42)
        .to(root.current, { y: 6, duration: 1.2, ease: 'sine.inOut' }, 0.42)
    })
    return () => ctx.revert()
  }, [animate])

  return (
    <svg ref={root} viewBox="70 44 430 456" className={className} role="img" aria-label={title} overflow="visible">
      <g fill={fill} stroke={stroke} strokeWidth={width} strokeLinejoin="round" strokeLinecap="round">
        <path ref={far} d={P.far} />
        <path ref={tail} d={P.tail} />
        <path d={P.body} />
        <path ref={near} d={P.near} />
      </g>
      <circle cx="438" cy="238" r="5.5" fill={stroke} />
    </svg>
  )
})

export default Dove
