import { useRef } from 'react'

// The 2027 trophy has not been designed yet, so it stays in the fog.
// Moving the pointer thins one layer of fog; the other two never clear.
export default function FogTrophy() {
  const box = useRef(null)
  const move = (e) => {
    const r = box.current.getBoundingClientRect()
    box.current.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
    box.current.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
  }
  return (
    <div
      ref={box}
      onPointerMove={move}
      className="relative isolate h-full min-h-[70vh] w-full overflow-hidden bg-ink"
      role="img"
      aria-label="A trophy hidden in fog. The 2027 design has not been revealed."
    >
      {/* back light */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 45% 40% at 50% 46%, rgba(176,138,67,.22), transparent 70%)' }} />
      {/* the trophy, deliberately soft */}
      <svg viewBox="0 0 300 400" className="absolute left-1/2 top-[14%] h-[68%] -translate-x-1/2" style={{ filter: 'blur(9px) brightness(.8)' }} aria-hidden="true">
        <defs>
          <linearGradient id="brass" x1="0" x2="1">
            <stop offset="0" stopColor="#5b4520" />
            <stop offset=".45" stopColor="#d9b46a" />
            <stop offset=".6" stopColor="#f3dca2" />
            <stop offset="1" stopColor="#6b5226" />
          </linearGradient>
        </defs>
        <g fill="url(#brass)">
          <path d="M70 40 H230 C232 120 210 175 168 196 L162 250 H138 L132 196 C90 175 68 120 70 40 Z" />
          <path d="M70 58 C30 58 26 120 84 140 L88 128 C52 116 54 76 72 74 Z" />
          <path d="M230 58 C270 58 274 120 216 140 L212 128 C248 116 246 76 228 74 Z" />
          <rect x="112" y="250" width="76" height="16" />
          <path d="M96 266 H204 L214 330 H86 Z" />
          <rect x="74" y="330" width="152" height="22" />
        </g>
      </svg>
      <div className="fog-layer fog-b" />
      <div className="fog-layer fog-a" />
      <div className="fog-hole absolute inset-0 overflow-hidden">
        <div className="fog-layer fog-c" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
    </div>
  )
}
