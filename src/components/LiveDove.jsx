import { useEffect, useRef, useState } from 'react'
import { useRoute } from '../lib/router'
import { asset, useReady } from '../lib/util'

/*
  Mir, the BDBC dove. "Mir" is Serbian for peace.

  A mascot with a home: he hovers in the bottom-right corner of every page
  (real white-dove footage, keyed and packed into two sprite sheets) and only
  leaves it for a quick trick, always flying straight back.

  - Turns and leans towards the pointer, flaps harder when it comes close.
  - Click him: a loop and a line.
  - Point at an Apply button: he hops and cheers.
  - Application page: a hop for every answer, a spin and a comment for every
    committee, a lap of the screen with feathers and confetti on submit.
  - Says one line when you arrive on some pages.

  Other code talks to him with
    window.dispatchEvent(new CustomEvent('dove', { detail: { move: 'hop' | 'spin' | 'loop' | 'dance' | 'celebrate', say: 'text' } }))
*/

const SHEETS = {
  side: { src: 'dove/side.webp', frames: 39, cols: 8, w: 440, h: 323 },
  hover: { src: 'dove/hover.webp', frames: 30, cols: 6, w: 460, h: 348 },
}
const BOX_W = 460
const BOX_H = 350

const GREETINGS = {
  '/': 'Hi, I’m Mir, the BDBC dove. Applications for 2027 are open!',
  '/committees': 'Five committees, five rooms. Pick one and I’ll save you a seat.',
  '/apply': 'Let’s do this. I’ll cheer you on.',
  '/impact': 'Every fee goes to children who need it most.',
  '/program': 'Three days. Stay for the closing gavel.',
  '/why-bdbc': 'First conference? Most of us started that way.',
}
const CLICK_LINES = ['Coo!', 'Mir means peace.', 'By youth, for youth!', 'See you in Belgrade.', 'Careful, I bruise easily.']

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
const rand = (a, b) => a + Math.random() * (b - a)

// Moves done at home. Offsets in px / degrees for progress t (0..1).
const MOVES = {
  hop: { dur: 0.8, fn: (t) => ({ dy: -46 * Math.abs(Math.sin(t * Math.PI * 2)) }) },
  spin: { dur: 1.1, fn: (t) => ({ flip: Math.cos(ease(t) * Math.PI * 4), dy: -24 * Math.sin(t * Math.PI) }) },
  dance: { dur: 2.2, fn: (t) => ({ rot: 14 * Math.sin(t * Math.PI * 8), dy: -20 * Math.abs(Math.sin(t * Math.PI * 8)) }) },
  wiggle: { dur: 0.9, fn: (t) => ({ rot: 10 * Math.sin(t * Math.PI * 6) * (1 - t) }) },
}

// Short flights away from home that always end back at home (offset 0,0).
const FLIGHTS = {
  loop: {
    dur: 1.6,
    fn: (t, vw) => {
      const a = ease(t) * Math.PI * 2
      const R = Math.min(130, vw * 0.16)
      return { dx: -R * Math.sin(a), dy: -R * (1 - Math.cos(a)) }
    },
  },
  lap: {
    dur: 4.2,
    fn: (t, vw, vh) => {
      const a = ease(t) * Math.PI * 2
      const rx = vw * 0.4
      const ry = vh * 0.5
      return { dx: -rx * (1 - Math.cos(a)), dy: -ry * Math.sin(a / 2) - ry * 0.35 * Math.sin(a) }
    },
  },
}

export default function LiveDove() {
  const ready = useReady()
  const { path } = useRoute()
  const canvas = useRef(null)
  const wrap = useRef(null)
  const fx = useRef(null)
  const disc = useRef(null)
  const bubbleBox = useRef(null)
  const api = useRef({})
  const pathRef = useRef(path)
  pathRef.current = path
  const [on, setOn] = useState(() => {
    try {
      return localStorage.getItem('bdbc-dove') !== 'off'
    } catch {
      return true
    }
  })
  const [bubble, setBubble] = useState(null)
  const bubbleTimer = useRef(0)
  const greeted = useRef(new Set())

  api.current.say = (text, ms = 3800) => {
    clearTimeout(bubbleTimer.current)
    setBubble({ text, id: Math.random() })
    bubbleTimer.current = setTimeout(() => setBubble(null), ms)
  }

  useEffect(() => {
    try {
      localStorage.setItem('bdbc-dove', on ? 'on' : 'off')
    } catch {
      /* storage unavailable */
    }
  }, [on])

  // one line when arriving on a page (once per page per visit)
  useEffect(() => {
    if (!ready || !on) return
    const line = GREETINGS[path]
    if (!line || greeted.current.has(path)) return
    greeted.current.add(path)
    const t = setTimeout(() => {
      api.current.say(line, 5200)
      window.dispatchEvent(new CustomEvent('dove', { detail: { move: 'hop' } }))
    }, 1500)
    return () => clearTimeout(t)
  }, [path, ready, on])

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

    let W = 0
    let H = 0
    let D = 0
    let MARGIN = 0
    const resize = () => {
      W = clamp(window.innerWidth * 0.11, 116, 176)
      H = (W * BOX_H) / BOX_W
      D = Math.round(W * 0.56)
      MARGIN = window.innerWidth < 640 ? 12 : 22
      disc.current.style.width = disc.current.style.height = D + 'px'
      disc.current.style.right = disc.current.style.bottom = MARGIN + 'px'
      bubbleBox.current.style.bottom = MARGIN + D + H * 0.42 + 'px'
      bubbleBox.current.style.right = MARGIN - 4 + 'px'
      cv.width = Math.round(W * dpr * 1.5)
      cv.height = Math.round(H * dpr * 1.5)
      cv.style.width = W + 'px'
      cv.style.height = H + 'px'
      fxc.width = window.innerWidth * dpr
      fxc.height = window.innerHeight * dpr
    }
    resize()
    window.addEventListener('resize', resize)

    const home = () => ({ x: window.innerWidth - MARGIN - D / 2, y: window.innerHeight - MARGIN - D / 2 - D * 0.28 })

    const s = {
      enter: 0,
      moves: [],
      flight: null,
      dir: -1,
      mix: 0,
      fSide: 0,
      fHover: 0,
      excite: 0,
      lean: 0,
      pointer: { x: -9999, y: -9999 },
      particles: [],
      lastScroll: window.scrollY,
      scrollV: 0,
    }
    const pos = home()

    const addMove = (name) => {
      if (!MOVES[name]) return
      if (s.moves.length > 1) s.moves.shift()
      s.moves.push({ ...MOVES[name], t0: performance.now() / 1000 })
    }
    const fly = (name) => {
      if (reduced || !FLIGHTS[name] || s.flight) return
      s.flight = { ...FLIGHTS[name], t0: performance.now() / 1000 }
    }

    const burst = (x, y, n, confetti) => {
      const colours = ['#ffffff', '#ffffff', '#b0202a', '#c08f1c', '#152a7c', '#1d5687', '#0b4c3a']
      for (let i = 0; i < n; i++) {
        const a = rand(0, Math.PI * 2)
        const sp = rand(80, 420)
        s.particles.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 140,
          r: rand(0, 6.3),
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
      const d = typeof e.detail === 'string' ? { move: e.detail } : e.detail || {}
      if (d.say) api.current.say(d.say, d.ms)
      if (d.move === 'celebrate') {
        fly('lap')
        burst(window.innerWidth / 2, window.innerHeight * 0.35, 140, true)
        setTimeout(() => {
          addMove('spin')
          const h = home()
          burst(h.x, h.y, 40, true)
        }, 4300)
      } else if (d.move === 'loop') fly('loop')
      else if (d.move) {
        addMove(d.move)
        if (d.move === 'hop' || d.move === 'spin') burst(pos.x, pos.y + 10, d.move === 'spin' ? 14 : 5)
      }
    }
    window.addEventListener('dove', onEvent)

    const onMove = (e) => {
      s.pointer.x = e.clientX
      s.pointer.y = e.clientY
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    let lastCheer = 0
    const onOver = (e) => {
      const btn = e.target.closest?.('a[href$="apply"], a[href="/apply"], [data-cursor="Apply"]')
      if (!btn || pathRef.current === '/apply') return
      const now = performance.now()
      if (now - lastCheer < 8000) return
      lastCheer = now
      addMove('hop')
      api.current.say('Go on, claim your seat!', 2600)
    }
    document.addEventListener('pointerover', onOver)

    api.current.poke = () => {
      fly('loop')
      burst(pos.x, pos.y, 10)
      api.current.say(CLICK_LINES[(Math.random() * CLICK_LINES.length) | 0], 2600)
    }

    let lastDance = performance.now() / 1000

    const drawSheet = (key, frame, alpha) => {
      if (alpha <= 0.01) return
      const sh = SHEETS[key]
      const f = Math.floor(frame) % sh.frames
      const scale = cv.width / BOX_W
      const dw = sh.w * scale
      const dh = sh.h * scale
      ctx.globalAlpha = alpha
      ctx.drawImage(imgs[key], (f % sh.cols) * sh.w, Math.floor(f / sh.cols) * sh.h, sh.w, sh.h, (cv.width - dw) / 2, (cv.height - dh) / 2, dw, dh)
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
      const h = home()

      // fly in to his spot the first time
      s.enter = Math.min(1, s.enter + dt / 1.8)
      const e = reduced ? 1 : ease(s.enter)
      let x = h.x + (1 - e) * (W * 2.5)
      let y = h.y - (1 - e) * vh * 0.4
      let flying = e < 0.92
      if (flying) s.dir = -1

      if (s.flight) {
        const t = (now - s.flight.t0) / s.flight.dur
        if (t >= 1) s.flight = null
        else {
          const a = s.flight.fn(t, vw, vh)
          const b = s.flight.fn(Math.min(1, t + 0.01), vw, vh)
          x += a.dx
          y += a.dy
          flying = true
          if (Math.abs(b.dx - a.dx) > 0.05) s.dir = b.dx > a.dx ? 1 : -1
        }
      }

      // pointer awareness: turn and lean towards it, excited when close
      const pdx = s.pointer.x - h.x
      const pdy = s.pointer.y - h.y
      const pd = Math.hypot(pdx, pdy)
      const near = clamp(1 - (pd - 80) / 420, 0, 1)
      s.excite += (near - s.excite) * Math.min(1, dt * 3)
      const leanTo = s.pointer.x < 0 ? 0 : clamp(-pdx / vw, -1, 1) * -14 * (0.4 + near)
      s.lean += (leanTo - s.lean) * Math.min(1, dt * 3)
      if (!flying && s.pointer.x >= 0 && Math.abs(pdx) > 40) s.dir = pdx > 0 ? 1 : -1

      const sv = window.scrollY - s.lastScroll
      s.lastScroll = window.scrollY
      s.scrollV += (clamp(Math.abs(sv) / 40, 0, 1) - s.scrollV) * Math.min(1, dt * 4)

      if (!reduced) y += Math.sin(now * 2.4) * (3 + 4 * s.excite) - s.scrollV * 6

      if (pathRef.current === '/apply' && !reduced && now - lastDance > 9 && !s.moves.length && !s.flight) {
        lastDance = now
        addMove(['dance', 'hop', 'spin', 'wiggle'][(Math.random() * 4) | 0])
      }

      let mrot = 0
      let flip = 1
      s.moves = s.moves.filter((m) => {
        const t = (now - m.t0) / m.dur
        if (t >= 1) return false
        const o = m.fn(t)
        x += o.dx || 0
        y += o.dy || 0
        mrot += o.rot || 0
        if (o.flip !== undefined) flip *= o.flip
        return true
      })
      pos.x = x
      pos.y = y

      s.mix += ((flying ? 0 : 1) - s.mix) * Math.min(1, dt * 6)
      s.fSide += dt * 26
      s.fHover += dt * (reduced ? 0 : 18 + 14 * s.excite + 10 * s.scrollV)

      ctx.clearRect(0, 0, cv.width, cv.height)
      drawSheet('side', s.fSide, 1 - s.mix)
      drawSheet('hover', s.fHover, s.mix)
      ctx.globalAlpha = 1

      // the flying clip faces right; the hovering clip's head turns left, so it flips the other way
      const sx = (s.mix < 0.5 ? s.dir : -s.dir) * flip
      wrap.current.style.transform = `translate3d(${x - W / 2}px, ${y - H / 2}px, 0) rotate(${s.lean + mrot}deg) scaleX(${sx})`

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
        } else fctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
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
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [ready, on])

  if (!on) {
    return (
      <button
        onClick={() => setOn(true)}
        className="fixed bottom-4 right-4 z-[97] rounded-full bg-ink/80 px-4 py-2.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md transition-colors hover:bg-crimson"
      >
        Bring Mir back
      </button>
    )
  }

  return (
    <>
      <canvas ref={fx} className="pointer-events-none fixed inset-0 z-[95] h-screen w-screen" aria-hidden="true" />
      {/* his perch: a small navy disc in the corner */}
      <div ref={disc} className="pointer-events-none fixed bottom-5 right-5 z-[94] rounded-full bg-ink shadow-[0_14px_30px_-10px_rgba(4,12,26,.6)] ring-2 ring-gold/70" aria-hidden="true">
        <div className="absolute inset-0 animate-[ping_2.8s_cubic-bezier(0,0,.2,1)_infinite] rounded-full ring-2 ring-gold/40" />
      </div>
      <div ref={wrap} className="fixed left-0 top-0 z-[96] will-change-transform" style={{ transform: 'translate3d(-400px,-400px,0)' }}>
        <button onClick={() => api.current.poke?.()} className="block rounded-full" aria-label="Mir, the BDBC dove. Click for a trick.">
          <canvas ref={canvas} className="block drop-shadow-[0_14px_18px_rgba(4,12,26,.35)]" />
        </button>
      </div>

      <div ref={bubbleBox} className="pointer-events-none fixed bottom-40 right-5 z-[97] flex max-w-[min(78vw,19rem)] justify-end" aria-live="polite">
        {bubble && (
          <div key={bubble.id} className="dove-bubble relative rounded-2xl bg-white px-4 py-3 text-[0.92rem] font-semibold leading-snug text-ink shadow-[0_18px_40px_-12px_rgba(4,12,26,.5)]">
            {bubble.text}
            <span className="absolute -bottom-1.5 right-[clamp(22px,2.6vw,38px)] h-3.5 w-3.5 rotate-45 bg-white" aria-hidden="true" />
          </div>
        )}
      </div>

      <button
        onClick={() => setOn(false)}
        className="fixed bottom-1.5 right-1.5 z-[98] grid h-6 w-6 place-items-center rounded-full bg-ink/70 text-xs font-bold leading-none text-white opacity-50 backdrop-blur-md transition hover:bg-crimson hover:opacity-100"
        aria-label="Hide Mir the dove"
        title="Hide Mir"
      >
        ×
      </button>
    </>
  )
}
