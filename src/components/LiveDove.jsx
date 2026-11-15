import { useEffect, useRef, useState } from 'react'
import { useRoute } from '../lib/router'
import { asset, useReady } from '../lib/util'

/*
  A real white dove (filmed footage, keyed and packed into two sprite sheets)
  that lives on every page.

  - Flies on its own: picks spots on screen, glides there, hovers, moves on.
  - Follows the visitor's pointer loosely, and darts away if you rush at it.
  - Click or tap it and it does a loop.
  - Point at any "Apply" button and it flies over to it.
  - On the application page it dances: a hop for every answer, a spin for every
    committee picked, a full celebration when the application is sent.

  Other code can make it move with: window.dispatchEvent(new CustomEvent('dove', { detail: 'hop' | 'spin' | 'loop' | 'dance' | 'celebrate' }))
*/

const SHEETS = {
  side: { src: 'dove/side.webp', frames: 39, cols: 8, w: 440, h: 323 },
  hover: { src: 'dove/hover.webp', frames: 30, cols: 6, w: 460, h: 348 },
}
const BOX_W = 460
const BOX_H = 350

const rand = (a, b) => a + Math.random() * (b - a)
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

// One-off moves layered over the flight. Each returns offsets for progress t (0..1).
const MOVES = {
  hop: { dur: 0.9, hover: true, fn: (t) => ({ dy: -70 * Math.abs(Math.sin(t * Math.PI * 2)) }) },
  spin: { dur: 1.1, hover: true, fn: (t) => ({ flip: Math.cos(ease(t) * Math.PI * 4), dy: -30 * Math.sin(t * Math.PI) }) },
  loop: {
    dur: 1.3,
    hover: false,
    fn: (t) => {
      const a = ease(t) * Math.PI * 2
      return { dx: 90 * Math.sin(a), dy: -90 * (1 - Math.cos(a)), rot: (ease(t) * 360) % 360 }
    },
  },
  dance: {
    dur: 2.4,
    hover: true,
    fn: (t) => ({ rot: 16 * Math.sin(t * Math.PI * 8), dy: -26 * Math.abs(Math.sin(t * Math.PI * 8)), dx: 30 * Math.sin(t * Math.PI * 4) }),
  },
  wiggle: { dur: 1, hover: true, fn: (t) => ({ rot: 12 * Math.sin(t * Math.PI * 6) * (1 - t) }) },
}

export default function LiveDove() {
  const ready = useReady()
  const { path } = useRoute()
  const canvas = useRef(null)
  const wrap = useRef(null)
  const fx = useRef(null)
  const pathRef = useRef(path)
  const [on, setOn] = useState(() => {
    try {
      return localStorage.getItem('bdbc-dove') !== 'off'
    } catch {
      return true
    }
  })
  pathRef.current = path

  useEffect(() => {
    try {
      localStorage.setItem('bdbc-dove', on ? 'on' : 'off')
    } catch {
      /* storage unavailable */
    }
  }, [on])

  useEffect(() => {
    if (!ready || !on) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cv = canvas.current
    const ctx = cv.getContext('2d')
    const fxc = fx.current
    const fctx = fxc.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const imgs = {}
    let loaded = 0
    for (const k of Object.keys(SHEETS)) {
      const im = new Image()
      im.onload = () => loaded++
      im.src = asset(SHEETS[k].src)
      imgs[k] = im
    }

    // size of the dove on screen
    let W = 0
    let H = 0
    const resize = () => {
      W = clamp(window.innerWidth * 0.16, 130, 270)
      H = (W * BOX_H) / BOX_W
      cv.width = Math.round(W * dpr * 1.5)
      cv.height = Math.round(H * dpr * 1.5)
      cv.style.width = W + 'px'
      cv.style.height = H + 'px'
      fxc.width = window.innerWidth * dpr
      fxc.height = window.innerHeight * dpr
    }
    resize()
    window.addEventListener('resize', resize)

    // flight state
    const s = {
      x: -W,
      y: window.innerHeight * 0.3,
      vx: 0,
      vy: 0,
      tx: window.innerWidth * 0.72,
      ty: window.innerHeight * 0.28,
      maxSpeed: 260,
      dir: 1,
      mix: 0, // 0 = side flight, 1 = hovering
      fSide: 0,
      fHover: 0,
      pause: 0,
      nextPick: 3,
      moves: [],
      lastPointer: { x: -1, y: -1, t: 0, vx: 0, vy: 0 },
      perch: null,
      particles: [],
    }

    const pickTarget = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const p = s.lastPointer
      const onApply = pathRef.current === '/apply'
      if (onApply) {
        const el = document.querySelector('[data-dove-perch]')
        if (el) {
          const r = el.getBoundingClientRect()
          if (r.bottom > 0 && r.top < vh) {
            s.tx = clamp(r.left + r.width * rand(0.2, 0.8), 60, vw - 60)
            s.ty = clamp(r.top + rand(-40, 60), 90, vh - 90)
            return
          }
        }
      }
      if (p.t && performance.now() - p.t < 6000 && Math.random() < 0.45) {
        // keep the visitor company: come close but never sit on the pointer
        s.tx = clamp(p.x + rand(70, 140) * (Math.random() < 0.5 ? -1 : 1), 60, vw - 60)
        s.ty = clamp(p.y + rand(-140, -60), 90, vh - 90)
      } else {
        // edges of the screen more often than the middle, to keep text readable
        const edge = Math.random() < 0.7
        s.tx = edge ? (Math.random() < 0.5 ? rand(60, vw * 0.22) : rand(vw * 0.78, vw - 60)) : rand(vw * 0.25, vw * 0.75)
        s.ty = rand(100, vh - 120)
      }
      s.maxSpeed = rand(200, 330)
    }

    const addMove = (name) => {
      const m = MOVES[name]
      if (!m) return
      if (s.moves.length > 2) s.moves.shift()
      s.moves.push({ name, t0: performance.now() / 1000, ...m })
    }

    const burst = (x, y, n = 40, confetti = false) => {
      const colours = ['#ffffff', '#ffffff', '#b0202a', '#c08f1c', '#152a7c', '#1d5687', '#0b4c3a']
      for (let i = 0; i < n; i++) {
        const a = rand(0, Math.PI * 2)
        const sp = rand(80, 420)
        s.particles.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 120,
          r: rand(0, Math.PI * 2),
          vr: rand(-4, 4),
          life: rand(1.6, 3.2),
          age: 0,
          size: rand(6, 14),
          feather: !confetti || Math.random() < 0.4,
          c: confetti ? colours[(Math.random() * colours.length) | 0] : '#ffffff',
        })
      }
    }

    const onEvent = (e) => {
      const what = e.detail
      if (what === 'celebrate') {
        addMove('loop')
        setTimeout(() => addMove('spin'), 1300)
        setTimeout(() => addMove('dance'), 2400)
        burst(s.x, s.y, 90, true)
        setTimeout(() => burst(window.innerWidth / 2, window.innerHeight * 0.35, 120, true), 400)
        s.tx = window.innerWidth * 0.5
        s.ty = window.innerHeight * 0.4
        s.pause = 5
      } else {
        addMove(what)
        if (what === 'hop' || what === 'spin') burst(s.x, s.y + 10, what === 'spin' ? 16 : 6)
      }
    }
    window.addEventListener('dove', onEvent)

    const onMove = (e) => {
      const now = performance.now()
      const p = s.lastPointer
      const dt = Math.max(16, now - (p.t || now - 16)) / 1000
      p.vx = (e.clientX - p.x) / dt
      p.vy = (e.clientY - p.y) / dt
      p.x = e.clientX
      p.y = e.clientY
      p.t = now
      // startle: rushing at the dove sends it off
      const d = Math.hypot(p.x - s.x, p.y - s.y)
      if (d < W * 0.6 && Math.hypot(p.vx, p.vy) > 900 && !s.moves.length) {
        const ang = Math.atan2(s.y - p.y, s.x - p.x)
        s.tx = clamp(s.x + Math.cos(ang) * 420, 60, window.innerWidth - 60)
        s.ty = clamp(s.y + Math.sin(ang) * 300, 90, window.innerHeight - 90)
        s.maxSpeed = 620
        s.pause = 0
        s.nextPick = 2
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    // Apply buttons attract the dove
    const onOver = (e) => {
      const btn = e.target.closest?.('a[href$="apply"], a[href="/apply"], [data-cursor="Apply"]')
      if (!btn) return
      const r = btn.getBoundingClientRect()
      s.tx = clamp(r.left + r.width / 2, 60, window.innerWidth - 60)
      s.ty = clamp(r.top - H * 0.55, 80, window.innerHeight - 80)
      s.maxSpeed = 520
      s.perch = btn
      s.pause = 0
      s.nextPick = 4
    }
    document.addEventListener('pointerover', onOver)

    // click or tap the dove for a loop; tap empty space on touch screens to call it
    const onDown = (e) => {
      const d = Math.hypot(e.clientX - s.x, e.clientY - s.y)
      if (d < W * 0.5) {
        addMove(Math.random() < 0.5 ? 'loop' : 'spin')
        burst(s.x, s.y, 10)
        return
      }
      if (e.pointerType === 'touch' && !e.target.closest('a,button,input,select,textarea,label')) {
        s.tx = e.clientX
        s.ty = clamp(e.clientY - H * 0.5, 80, window.innerHeight - 80)
        s.maxSpeed = 420
        s.pause = 0
        s.nextPick = 4
      }
    }
    window.addEventListener('pointerdown', onDown)

    // dancing while applying: a little routine every few seconds
    let lastDance = performance.now() / 1000

    const drawSheet = (key, frame, alpha) => {
      if (alpha <= 0.01) return
      const sh = SHEETS[key]
      const im = imgs[key]
      const f = Math.floor(frame) % sh.frames
      const sx = (f % sh.cols) * sh.w
      const sy = Math.floor(f / sh.cols) * sh.h
      const scale = cv.width / BOX_W
      const dw = sh.w * scale
      const dh = sh.h * scale
      ctx.globalAlpha = alpha
      ctx.drawImage(im, sx, sy, sh.w, sh.h, (cv.width - dw) / 2, (cv.height - dh) / 2, dw, dh)
    }

    let last = performance.now() / 1000
    let raf = 0
    let running = true
    const tick = () => {
      if (!running) return
      raf = requestAnimationFrame(tick)
      const now = performance.now() / 1000
      const dt = Math.min(0.05, now - last)
      last = now
      if (loaded < 2) return
      const vw = window.innerWidth
      const vh = window.innerHeight

      // --- flight ---
      if (reduced) {
        s.x = vw - W * 0.7
        s.y = vh - H * 0.9
        s.vx = s.vy = 0
      } else {
        s.nextPick -= dt
        const dx = s.tx - s.x
        const dy = s.ty - s.y
        const dist = Math.hypot(dx, dy)
        if (dist < 30) {
          s.pause -= dt
          if (s.perch && !s.moves.length) {
            addMove('wiggle')
            s.perch = null
            s.pause = 1.6
          }
          if (s.pause <= 0 || s.nextPick <= 0) {
            pickTarget()
            s.pause = rand(0.8, 2.6)
            s.nextPick = rand(5, 9)
          }
        } else if (s.nextPick <= 0) {
          pickTarget()
          s.nextPick = rand(5, 9)
        }
        const arrive = clamp(dist / 220, 0, 1)
        const desX = dist > 1 ? (dx / dist) * s.maxSpeed * arrive : 0
        const desY = dist > 1 ? (dy / dist) * s.maxSpeed * arrive : 0
        const k = 2.2
        s.vx += (desX - s.vx) * k * dt
        s.vy += (desY - s.vy) * k * dt
        // a little life when hovering in place
        s.vy += Math.sin(now * 2.3) * 14 * dt
        s.x += s.vx * dt
        s.y += s.vy * dt
      }

      const speed = Math.hypot(s.vx, s.vy)
      const wantHover = speed < 70 || s.moves.some((m) => m.hover)
      s.mix += ((wantHover ? 1 : 0) - s.mix) * Math.min(1, dt * 5)
      if (Math.abs(s.vx) > 25) s.dir = s.vx > 0 ? 1 : -1

      // flap speed follows flight speed
      s.fSide += dt * (16 + speed * 0.05)
      s.fHover += dt * 22

      // --- moves ---
      let mx = 0
      let my = 0
      let mrot = 0
      let flip = 1
      s.moves = s.moves.filter((m) => {
        const t = (now - m.t0) / m.dur
        if (t >= 1) return false
        const o = m.fn(t)
        mx += o.dx || 0
        my += o.dy || 0
        mrot += o.rot || 0
        if (o.flip !== undefined) flip *= o.flip
        return true
      })

      // routine on the application page
      if (pathRef.current === '/apply' && !reduced && now - lastDance > 7 && !s.moves.length) {
        lastDance = now
        addMove(['dance', 'hop', 'spin', 'loop'][Math.floor(Math.random() * 4)])
      }

      // --- draw the dove ---
      ctx.clearRect(0, 0, cv.width, cv.height)
      drawSheet('side', s.fSide, 1 - s.mix)
      drawSheet('hover', s.fHover, s.mix)
      ctx.globalAlpha = 1

      const tilt = clamp((Math.atan2(s.vy, Math.abs(s.vx) + 60) * 180) / Math.PI, -28, 28) * (1 - s.mix) * s.dir
      const sx = s.dir * flip
      wrap.current.style.transform = `translate3d(${s.x + mx - W / 2}px, ${s.y + my - H / 2}px, 0) rotate(${tilt + mrot}deg) scaleX(${sx})`

      // --- feathers and confetti ---
      fctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      fctx.clearRect(0, 0, vw, vh)
      s.particles = s.particles.filter((p) => {
        p.age += dt
        if (p.age > p.life) return false
        p.vy += (p.feather ? 160 : 520) * dt
        p.vx *= p.feather ? 0.97 : 0.99
        p.vy *= p.feather ? 0.95 : 0.99
        p.x += (p.vx + (p.feather ? Math.sin(p.age * 4 + p.r) * 40 : 0)) * dt
        p.y += p.vy * dt
        p.r += p.vr * dt
        fctx.save()
        fctx.globalAlpha = 1 - p.age / p.life
        fctx.translate(p.x, p.y)
        fctx.rotate(p.r)
        fctx.fillStyle = p.c
        if (p.feather) {
          fctx.beginPath()
          fctx.ellipse(0, 0, p.size * 0.35, p.size, 0, 0, Math.PI * 2)
          fctx.fill()
          fctx.strokeStyle = 'rgba(120,130,150,.5)'
          fctx.lineWidth = 0.8
          fctx.beginPath()
          fctx.moveTo(0, -p.size)
          fctx.lineTo(0, p.size * 1.2)
          fctx.stroke()
        } else {
          fctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
        }
        fctx.restore()
        return true
      })
    }
    raf = requestAnimationFrame(tick)

    const onVis = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!running) {
        running = true
        last = performance.now() / 1000
        raf = requestAnimationFrame(tick)
      }
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('dove', onEvent)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [ready, on])

  return (
    <>
      {on && (
        <>
          <canvas ref={fx} className="pointer-events-none fixed inset-0 z-[95] h-screen w-screen" aria-hidden="true" />
          <div ref={wrap} className="pointer-events-none fixed left-0 top-0 z-[96] will-change-transform" style={{ transform: 'translate3d(-400px,-400px,0)' }} aria-hidden="true">
            <canvas ref={canvas} className="block drop-shadow-[0_18px_22px_rgba(4,12,26,.35)]" />
          </div>
        </>
      )}
      <button
        onClick={() => setOn((v) => !v)}
        className="fixed bottom-4 right-4 z-[97] rounded-full bg-ink/70 px-3.5 py-2 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md transition-colors hover:bg-crimson"
        aria-pressed={on}
      >
        {on ? 'Hide the dove' : 'Bring the dove back'}
      </button>
    </>
  )
}
