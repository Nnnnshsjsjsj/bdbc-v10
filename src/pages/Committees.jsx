import { Btn, Eyebrow, Lines, PageHero, ApplyBand } from '../components/ui'
import { COMMITTEES } from '../lib/data'
import { img, useSeat, useTitle } from '../lib/util'

export default function Committees() {
  useTitle('Committees')
  const { seat, setSeat } = useSeat()
  return (
    <>
      <PageHero
        eyebrow="Five committees · One conference"
        lines={['Committees', 'at BDBC 2027']}
        image="gallery/2026/committee-vote"
        intro="At BDBC 2027, delegates will step into five dynamic committees, each designed to challenge their diplomatic, analytical, and strategic skills while offering real-world insights into global affairs. Whether you’re drawn to crisis management, economic policy, or regional cooperation, you’ll find a committee that matches your ambitions — and helps you grow as a leader."
      >
        <ul className="mt-12 flex flex-wrap gap-2" data-fade data-delay="0.4">
          {COMMITTEES.map((c) => (
            <li key={c.id}>
              <a href={`#${c.id}`} onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById(c.id)
                  window.__lenis ? window.__lenis.scrollTo(el) : el.scrollIntoView()
                }} className="btn btn-line !py-3 text-white">
                <span>
                  {c.no} {c.short}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Each committee is its own room: a full-screen panel that the next one slides over. */}
      <div className="relative bg-ink">
        {COMMITTEES.map((c, i) => (
          <section key={c.id} id={c.id} className="on-dark relative isolate overflow-hidden bg-ink text-white lg:sticky lg:top-0 lg:h-screen" style={{ zIndex: i + 1 }} aria-labelledby={`${c.id}-h`}>
            <img src={img(c.img)} alt="" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/75 to-ink/20" />
            <div className="absolute inset-x-0 top-0 h-px bg-white/25" />
            <div className="wrap grid h-full gap-10 pb-16 pt-28 lg:grid-cols-12 lg:items-end lg:pb-20">
              <div className="lg:col-span-7">
                <p className="label text-gold">Committee {c.no}</p>
                <p className="display mt-2 text-[clamp(7rem,20vw,19rem)] leading-[0.74] text-white/15" aria-hidden="true">
                  {c.no}
                </p>
                <h2 id={`${c.id}-h`} className="display t-lg -mt-[0.5em]">
                  {c.name}
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="lede text-white/85">{c.about}</p>
                <div className="mt-8 border-l-2 border-crimson pl-6">
                  <p className="label text-gold">Why apply?</p>
                  <p className="mt-3 leading-relaxed text-white/75">{c.why}</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  {seat === c.id ? (
                    <Btn to="/apply" data-cursor="Apply">
                      Apply with this committee
                    </Btn>
                  ) : (
                    <Btn kind="line" className="text-white" onClick={() => setSeat(c.id)}>
                      Make it my 1st choice
                    </Btn>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="on-light relative z-10 bg-paper py-24 md:py-40">
        <div className="wrap grid gap-10 md:grid-cols-12">
          <Eyebrow className="text-crimson md:col-span-3">BDBC 2027</Eyebrow>
          <p className="statement text-ink md:col-span-9" data-words>
            Every committee at BDBC 2027 is crafted not just to simulate real-world institutions, but to equip you with practical skills, meaningful connections, and a deeper understanding of how diplomacy, business, and economics shape our world.
          </p>
        </div>
      </section>
      <div className="relative z-10">
        <ApplyBand title={['Become part of the', 'next generation of', 'global leaders']} />
      </div>
    </>
  )
}
