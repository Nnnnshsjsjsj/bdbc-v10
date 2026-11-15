import { Btn, Eyebrow, Lines, PageHero, ApplyBand } from '../components/ui'
import { Link } from '../lib/router'
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
                }} className="btn btn-line !py-3">
                <span>
                  {c.no} {c.short}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Each committee is its own room, in its own colour. Rooms stack: the next slides over the last. */}
      <div className="relative">
        {COMMITTEES.map((c, i) => (
          <section
            key={c.id}
            id={c.id}
            data-dove-say={c.id}
            className={`relative grid overflow-hidden lg:sticky lg:top-0 lg:h-screen lg:grid-cols-12 ${c.fg === '#ffffff' ? 'on-dark' : 'on-light'}`}
            style={{ zIndex: i + 1, background: c.bg, color: c.fg }}
            aria-labelledby={`${c.id}-h`}
          >
            <div className="relative h-[52vh] overflow-hidden lg:order-2 lg:col-span-6 lg:h-full">
              <img src={img(c.img)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <p className="display absolute bottom-4 left-6 text-[clamp(6rem,14vw,14rem)] leading-[0.8] text-white drop-shadow-[0_8px_30px_rgba(0,0,0,.35)]" aria-hidden="true">
                {c.no}
              </p>
            </div>
            <div className="flex flex-col justify-end px-[clamp(1.1rem,3.2vw,3.2rem)] pb-14 pt-10 lg:col-span-6 lg:pb-16 lg:pt-28">
              <p className="label opacity-75">Committee {c.no} of 05</p>
              <h2 id={`${c.id}-h`} className="display t-lg mt-4">
                {c.name}
              </h2>
              <p className="lede mt-8 max-w-2xl">{c.about}</p>
              <div className="mt-8 max-w-2xl border-l-2 border-current pl-6">
                <p className="label opacity-75">Why apply?</p>
                <p className="mt-3 leading-relaxed opacity-90">{c.why}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {seat === c.id ? (
                  <Link to="/apply" className="btn bg-ink text-white before:bg-white hover:text-ink" data-cursor="Apply">
                    <span>Apply with this committee</span>
                    <span className="dot" aria-hidden="true" />
                  </Link>
                ) : (
                  <Btn kind="line" onClick={() => setSeat(c.id)}>
                    Make it my 1st choice
                  </Btn>
                )}
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
