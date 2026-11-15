import { COMMITTEES } from '../lib/data'

// Top-down plan of the conference floor: the chairs' dais and five committee
// tables on an arc. Each table is a button; choosing one selects that committee.
const CX = 500
const CY = 70
const R = 400
const ANGLES = [160, 125, 90, 55, 20] // degrees, left to right
const SHORT = { 'security-crisis': 'CRISIS', business: 'BUSINESS', ecosoc: 'ECOSOC', asean: 'ASEAN', 'european-council': 'EU COUNCIL' }

export default function SeatingPlan(props) {
  return (
    <>
      <div className="hidden sm:block">
        <Plan {...props} />
      </div>
      <TableList {...props} />
    </>
  )
}

// On phones the plan is too small to read, so the tables become a list.
function TableList({ selected, onSelect }) {
  return (
    <ul className="space-y-2 sm:hidden" aria-label="Committees">
      {COMMITTEES.map((c) => {
        const active = selected === c.id
        return (
          <li key={c.id}>
            <button
              aria-pressed={active}
              onClick={() => onSelect(c.id)}
              className={`flex w-full items-center justify-between border-[1.5px] px-4 py-4 text-left ${active ? 'border-navy bg-navy text-white' : 'border-navy/70 bg-[#fbfbf8] text-navy'}`}
            >
              <span className="font-display text-xl uppercase">{SHORT[c.id]}</span>
              <span className="flex gap-1.5" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((k) => (
                  <span key={k} className={`h-2.5 w-2.5 rounded-full border ${active ? 'border-crimson bg-crimson' : 'border-navy bg-paper-2'}`} />
                ))}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

function Plan({ selected, onSelect, focused, onFocus }) {
  return (
    <svg viewBox="0 0 1000 560" className="h-auto w-full" role="group" aria-label="Conference floor plan. Choose a committee table.">
      {/* floor */}
      <rect x="10" y="10" width="980" height="540" fill="none" stroke="currentColor" strokeOpacity=".18" />
      {/* dais */}
      <g aria-hidden="true">
        <rect x={CX - 160} y="30" width="320" height="46" fill="var(--color-navy)" />
        <text x={CX} y="59" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="600" letterSpacing=".04em">
          Chairs and secretariat
        </text>
        {/* arc of the room */}
        <path d={arc(CX, CY, R + 70, 10, 170)} fill="none" stroke="currentColor" strokeOpacity=".15" strokeDasharray="4 8" />
      </g>
      {COMMITTEES.map((c, i) => {
        const a = (ANGLES[i] * Math.PI) / 180
        const x = CX + R * Math.cos(a)
        const y = CY + R * Math.sin(a)
        const rot = (ANGLES[i] - 90) * 0.4
        const active = selected === c.id
        return (
          <g
            key={c.id}
            className="seat-table"
            role="button"
            tabIndex={0}
            aria-pressed={active}
            aria-label={c.name}
            transform={`translate(${x} ${y}) rotate(${rot})`}
            onClick={() => onSelect(c.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelect(c.id)
              }
            }}
            onMouseEnter={() => onFocus?.(c.id)}
            onFocus={() => onFocus?.(c.id)}
            onMouseLeave={() => onFocus?.(null)}
            onBlur={() => onFocus?.(null)}
          >
            {/* chairs on the outer side */}
            {[-2, -1, 0, 1, 2].map((k) => (
              <circle key={k} className="chair" cx={k * 38} cy={52} r={12} />
            ))}
            <rect className="tbl" x={-112} y={-30} width={224} height={60} />
            <text className="lbl" x={0} y={8} textAnchor="middle" fontSize="27" transform={`rotate(${-rot})`}>
              {SHORT[c.id]}
            </text>
            {focused === c.id && !active ? <rect x={-117} y={-35} width={234} height={70} fill="none" stroke="var(--color-sea)" strokeWidth="2" /> : null}
          </g>
        )
      })}
    </svg>
  )
}

function arc(cx, cy, r, a0, a1) {
  const p = (a) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)]
  const [x0, y0] = p(a0)
  const [x1, y1] = p(a1)
  return `M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`
}
