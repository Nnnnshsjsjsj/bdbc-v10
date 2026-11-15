import Dove from './Dove'

// A delegate's tent card. Empty lines are drawn as write-in rules, so the card
// reads as something that gets filled in as you scroll and choose.
export default function Placard({ committee, country, name, className = '', tilt = true }) {
  return (
    <div className={`placard-stage ${className}`} aria-label="Delegate placard">
      <div className={`placard ${tilt ? 'placard--tilt' : ''}`}>
        <div className="placard__face">
          <div className="flex items-center gap-2 border-b border-ink/15 pb-3">
            <Dove className="h-6 w-6 shrink-0" width={14} />
            <span className="text-[0.7rem] font-semibold tracking-[0.02em] text-ink/70">BDBC 2027, Belgrade</span>
          </div>

          <Line label="Committee" value={committee} className="mt-4 text-sm font-medium" />

          <div className="relative mt-3 min-h-[2.4em] overflow-hidden" style={{ fontSize: 'var(--placard-country, 2.6rem)' }}>
            {country ? (
              <div key={country} className="flap font-display leading-none uppercase text-ink">
                {country}
              </div>
            ) : (
              <div className="write-in h-[1.1em] w-4/5" aria-label="Country not chosen yet" />
            )}
          </div>

          <Line label="Delegate" value={name} className="mt-4 font-serif text-lg italic" />
        </div>
        <div className="placard__fold" aria-hidden="true" />
      </div>
    </div>
  )
}

function Line({ label, value, className }) {
  return (
    <div className={className}>
      <span className="sr-only">{label}: </span>
      {value ? (
        <span key={value} className="flap block text-ink">
          {value}
        </span>
      ) : (
        <span className="write-in block h-[1.1em] w-3/5" aria-label={`${label} not chosen yet`} />
      )}
    </div>
  )
}
