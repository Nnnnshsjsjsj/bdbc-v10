import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Placard from '../components/Placard'
import SeatingPlan from '../components/SeatingPlan'
import { Link } from '../lib/router'
import { COMMITTEES } from '../lib/data'
import { img, scrollToId, useDocumentTitle, useSeat } from '../lib/util'

export default function Committees() {
  useDocumentTitle('Committees')
  const { seat, setSeat } = useSeat()
  const [focused, setFocused] = useState(null)
  const chosen = COMMITTEES.find((c) => c.id === seat)

  return (
    <>
      <PageHeader
        title="Five committees at BDBC 2027."
        intro="Each committee is built to test a different set of skills, from rapid crisis response to the slow work of a regional agreement. Choose one on the plan to jump to it."
        image={img('gallery/2026/committee-session')}
      />
      <section className="bg-paper">
        <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.6fr_1fr] lg:items-center">
          <div className="text-navy">
            <SeatingPlan
              selected={seat}
              focused={focused}
              onFocus={setFocused}
              onSelect={(id) => {
                setSeat(id)
                scrollToId(id)
              }}
            />
          </div>
          <div className="flex justify-center">
            <Placard className="w-[min(80vw,22rem)]" committee={chosen?.placard} country={null} name={null} />
          </div>
        </div>
      </section>

      <div className="bg-paper">
        {COMMITTEES.map((c, i) => (
          <section key={c.id} id={c.id} className={`scroll-mt-16 ${i % 2 ? 'bg-paper' : 'bg-paper-2'}`} aria-labelledby={`${c.id}-h`}>
            <div className="mx-auto grid max-w-[90rem] gap-10 px-5 py-20 sm:px-8 md:grid-cols-[1fr_1.3fr] md:py-24">
              <div>
                <p className="text-sm font-semibold text-sea">{c.kind} committee</p>
                <h2 id={`${c.id}-h`} className="font-display t-1 mt-3 text-ink">
                  {c.name}
                </h2>
              </div>
              <div>
                <p className="text-[1.1rem] leading-relaxed">{c.about}</p>
                <h3 className="mt-8 font-semibold text-ink">Why apply</h3>
                <p className="mt-2 leading-relaxed text-text/85">{c.why}</p>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  {seat === c.id ? (
                    <Link to="/apply" className="btn btn-apply">
                      Apply with {c.placard}
                    </Link>
                  ) : (
                    <button className="btn btn-quiet text-ink" onClick={() => setSeat(c.id)}>
                      Make this my first choice
                    </button>
                  )}
                  <span className="text-sm text-muted">Study guide published closer to the conference.</span>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
