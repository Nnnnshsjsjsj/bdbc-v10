import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Dove from '../components/Dove'
import Placard from '../components/Placard'
import SeatingPlan from '../components/SeatingPlan'
import FogTrophy from '../components/FogTrophy'
import { Link } from '../lib/router'
import { AWARDS, COMMITTEES, EVENT, FACTS, MODULES, PARTNERS } from '../lib/data'
import { img, JumpLink, useDocumentTitle, usePrefersReducedMotion, useSeat } from '../lib/util'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  useDocumentTitle(null)
  return (
    <>
      <Hero />
      <Room />
      <Seats />
      <Proof />
      <Awards />
      <Impact />
      <FirstConference />
      <FinalCall />
    </>
  )
}

/* ---------- 1. Hero: the dove ---------- */
function Hero() {
  const root = useRef(null)
  const doveWrap = useRef(null)
  const dove = useRef(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return
      // One entrance: the dove arrives, the headline settles. Under 1.2 s.
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from(doveWrap.current, { x: '-18vw', y: '22vh', rotate: 12, scale: 0.7, opacity: 0, duration: 1.15 }, 0)
        .from('[data-hero-line]', { yPercent: 105, duration: 0.8, stagger: 0.08 }, 0.15)
        .from('[data-hero-fade]', { opacity: 0, duration: 0.6 }, 0.55)

      // Scrolling away: the dove lifts off up and to the right.
      gsap.to(doveWrap.current, {
        x: '22vw',
        y: '-48vh',
        scale: 0.45,
        rotate: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
          onUpdate: (st) => dove.current?.speed(1 + st.getVelocity() / 900),
        },
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  // The dove leans gently toward the pointer.
  useEffect(() => {
    if (reduced) return
    const el = doveWrap.current?.querySelector('[data-lean]')
    if (!el) return
    const qx = gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3.out' })
    const qy = gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3.out' })
    const on = (e) => {
      qx((e.clientX / window.innerWidth - 0.5) * 40)
      qy((e.clientY / window.innerHeight - 0.5) * 28)
    }
    window.addEventListener('pointermove', on)
    return () => window.removeEventListener('pointermove', on)
  }, [reduced])

  return (
    <section ref={root} className="on-ink relative isolate min-h-[100svh] overflow-hidden bg-ink text-white">
      {/* globe meridians from the logo */}
      <svg className="absolute -right-[18vw] top-1/2 -z-10 h-[130vh] w-[130vh] -translate-y-1/2 text-globe opacity-[0.16] md:-right-[8vw]" viewBox="0 0 400 400" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="200" cy="200" r="190" />
          {[40, 80, 120, 160].map((rx) => (
            <ellipse key={rx} cx="200" cy="200" rx={rx} ry="190" />
          ))}
          {[-120, -60, 0, 60, 120].map((dy) => {
            const w = Math.sqrt(190 * 190 - dy * dy)
            return <line key={dy} x1={200 - w} x2={200 + w} y1={200 + dy} y2={200 + dy} />
          })}
        </g>
      </svg>

      <div ref={doveWrap} className="pointer-events-none absolute right-[5vw] top-[9svh] w-[48vw] max-w-[40rem] sm:top-[7svh] sm:w-[38vw] lg:right-[-2vw] lg:top-[10vh] lg:w-[44vw]">
        <div data-lean>
          <Dove ref={dove} animate={!reduced} stroke="#0c2340" width={7} className="h-auto w-full drop-shadow-[0_30px_50px_rgba(0,0,0,.35)]" />
        </div>
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[90rem] flex-col justify-end px-5 pb-10 pt-28 sm:px-8 lg:justify-center lg:pb-24">
        <p data-hero-fade className="mb-6 text-white/75">
          {EVENT.where}, end of February 2027
        </p>
        <h1 className="font-display t-hero">
          <span className="block overflow-hidden pb-[0.04em]">
            <span data-hero-line className="block">
              Lead the debate.
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block">
              Close the deal.
            </span>
          </span>
        </h1>
        <p data-hero-fade className="t-lede mt-7 max-w-[34rem] text-white/85">
          Three days of Model UN committee debate and a business simulation, in one youth conference. Every euro it raises goes to children who need it.
        </p>
        <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link to="/apply" className="btn btn-apply">
            Apply for BDBC 2027
          </Link>
          <JumpLink to="seats" className="link text-white/90 hover:text-white">
            See the five committees
          </JumpLink>
        </div>
        <dl data-hero-fade className="mt-14 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-4 border-t border-white/15 pt-5 text-sm text-white/70 sm:grid-cols-4">
          <div>
            <dt className="sr-only">Edition</dt>
            <dd>
              <span className="font-semibold text-white">Third</span> edition
            </dd>
          </div>
          <div>
            <dt className="sr-only">Committees</dt>
            <dd>
              <span className="font-semibold text-white">{FACTS.committees}</span> committees
            </dd>
          </div>
          <div>
            <dt className="sr-only">Applicants</dt>
            <dd>
              <span className="font-semibold text-white">{FACTS.applicants}</span> applicants so far
            </dd>
          </div>
          <div>
            <dt className="sr-only">Nationalities</dt>
            <dd>
              <span className="font-semibold text-white">{FACTS.nationalities}</span> nationalities
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

/* ---------- 2. The room: the placard fills in as you scroll ---------- */
const STEPS = [
  {
    title: 'Two simulations under one roof.',
    body: `${MODULES[0].name}: you represent a country and argue its position until a resolution passes. ${MODULES[1].name}: you run a company through crises with an executive team. Both happen in the same three days.`,
  },
  {
    title: 'Five committees to choose from.',
    body: 'Security Crisis, Business, ECOSOC, ASEAN and the Model European Council. You rank three when you apply.',
  },
  {
    title: 'A country to speak for.',
    body: 'You name five countries you would like to represent in each committee. The chairs assign one, and its policy becomes yours for the weekend.',
  },
  {
    title: 'Then the card has your name on it.',
    body: 'English is the working language, the rules of procedure take an afternoon to learn, and no experience is needed.',
  },
]

function Room() {
  const { seat } = useSeat()
  const reduced = usePrefersReducedMotion()
  const [step, setStep] = useState(0)
  const [ci, setCi] = useState(0)
  const refs = useRef([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setStep(Number(e.target.dataset.step))),
      { rootMargin: '-45% 0px -45% 0px' },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const committee = COMMITTEES.find((c) => c.id === seat) || COMMITTEES[2]

  // On the country step the placard cycles through a few delegations.
  useEffect(() => {
    if (step !== 2 || reduced) return
    const t = setInterval(() => setCi((i) => (i + 1) % committee.sample.length), 1100)
    return () => clearInterval(t)
  }, [step, reduced, committee])

  return (
    <section className="on-ink relative bg-ink text-white" aria-labelledby="room-h">
      <h2 id="room-h" className="sr-only">
        How BDBC works
      </h2>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <img src={img('gallery/2026/committee-vote')} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        <div className="absolute inset-x-0 top-20 flex justify-center px-6 md:inset-y-0 md:left-auto md:right-[6vw] md:top-0 md:w-[44vw] md:items-center">
          <Placard
            className="w-[min(64vw,20rem)] md:w-full md:max-w-[26rem]"
            committee={step >= 1 ? committee.placard : null}
            country={step >= 2 ? committee.sample[step === 2 ? ci : 0] : null}
            name={step >= 3 ? 'Your name' : null}
          />
        </div>
      </div>
      <div className="relative -mt-[100svh]">
        {STEPS.map((s, i) => (
          <div
            key={s.title}
            ref={(el) => (refs.current[i] = el)}
            data-step={i}
            className="mx-auto flex min-h-[100svh] max-w-[90rem] items-end px-5 pb-16 sm:px-8 md:items-center md:pb-0"
          >
            <div className="max-w-xl bg-ink/85 p-5 md:bg-transparent md:p-0">
              <p className="font-display text-sm text-white/55">
                {i + 1} of {STEPS.length}
              </p>
              <h3 className="font-display t-1 mt-3">{s.title}</h3>
              <p className="t-lede mt-6 text-white/80">{s.body}</p>
              {i === STEPS.length - 1 && (
                <JumpLink to="seats" className="btn btn-quiet mt-8 text-white">
                  Choose your committee
                </JumpLink>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- 3. Pick your seat ---------- */
function Seats() {
  const { seat, setSeat } = useSeat()
  const [focused, setFocused] = useState(null)
  const shown = COMMITTEES.find((c) => c.id === (focused || seat)) || null

  return (
    <section id="seats" className="scroll-mt-16 bg-paper" aria-labelledby="seats-h">
      <div className="mx-auto max-w-[90rem] px-5 py-24 sm:px-8 md:py-32">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
          <h2 id="seats-h" className="font-display t-1 text-ink">
            Take a seat.
          </h2>
          <p className="t-lede measure text-muted">
            This is the conference floor. Each table is a committee. Choose one to read what happens there, and it will be filled in on your placard and your application.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div className="text-navy">
            <SeatingPlan selected={seat} onSelect={setSeat} focused={focused} onFocus={setFocused} />
          </div>
          <div aria-live="polite" className="lg:pt-6">
            {shown ? (
              <article>
                <p className="text-sm font-semibold text-sea">{shown.kind} committee</p>
                <h3 className="font-display t-2 mt-2 text-ink">{shown.name}</h3>
                <p className="mt-5 text-[1.05rem] leading-relaxed">{shown.about}</p>
                <p className="mt-4 leading-relaxed text-muted">{shown.why}</p>
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                  {seat === shown.id ? (
                    <Link to="/apply" className="btn btn-apply">
                      Apply with {shown.placard}
                    </Link>
                  ) : (
                    <button className="btn btn-quiet text-ink" onClick={() => setSeat(shown.id)}>
                      Choose this committee
                    </button>
                  )}
                  <Link to="/committees" className="link text-ink">
                    All committee details
                  </Link>
                </div>
              </article>
            ) : (
              <div className="border-l-2 border-ink/15 pl-6">
                <p className="t-3 text-ink">Choose a table on the plan.</p>
                <p className="mt-3 text-muted">You can also move between tables with the Tab key and press Enter to choose.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- 4. Proof ---------- */
function Proof() {
  return (
    <section className="on-ink relative isolate overflow-hidden bg-ink text-white" aria-labelledby="proof-h">
      <h2 id="proof-h" className="sr-only">
        Recognition
      </h2>
      <img src={img('gallery/2026/guest-visit')} alt="H.E. Florence Ferrari, Ambassador of France to Serbia, with the BDBC 2026 organisers" className="absolute inset-0 -z-10 h-full w-full object-cover object-[50%_30%] opacity-45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
      <div className="mx-auto max-w-[90rem] px-5 pb-20 pt-[38vh] sm:px-8 md:pb-28">
        <blockquote className="max-w-4xl">
          <p className="font-serif text-[clamp(1.7rem,1.1rem+2.4vw,3.3rem)] leading-[1.15] italic">
            “I was impressed by the dedication and the professionalism of the organisers as well as the enthusiasm of all participants.”
          </p>
          <footer className="mt-6 text-white/80">
            H.E. Florence Ferrari, Ambassador of France to Serbia, who opened BDBC 2026 in person
          </footer>
        </blockquote>
        <p className="mt-14 max-w-2xl border-t border-white/20 pt-6 text-white/75">
          The German Embassy in Serbia featured BDBC for hosting a delegation of students and their professor from Gymnasium Am Löhrtor in Siegen.{' '}
          <Link to="/about" className="link text-white">
            Read about our recognition
          </Link>
        </p>
      </div>
      <div className="bg-paper text-ink">
        <div className="mx-auto max-w-[90rem] px-5 py-12 sm:px-8">
          <h3 className="text-sm font-semibold text-muted">Sponsors and partners of BDBC 2026</h3>
          <ul className="mt-6 grid grid-cols-3 items-center gap-x-8 gap-y-6 sm:grid-cols-5 lg:grid-cols-10">
            {PARTNERS.map((p) => (
              <li key={p.name} className="flex justify-center">
                <img src={img(p.logo)} alt={p.name} title={`${p.name}, ${p.role}`} className="h-12 w-auto max-w-[7rem] object-contain mix-blend-multiply" loading="lazy" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ---------- 5. Awards and the trophy in the fog ---------- */
function Awards() {
  return (
    <section className="on-ink bg-[#0a1c33] text-white" aria-labelledby="awards-h">
      <div className="mx-auto grid max-w-[90rem] items-center gap-12 px-5 py-24 sm:px-8 md:grid-cols-2 md:py-32">
        <FogTrophy />
        <div>
          <h2 id="awards-h" className="font-display t-1">
            Three awards. The trophy stays hidden until February.
          </h2>
          <p className="t-lede mt-6 max-w-lg text-white/80">
            Chairs recognise the strongest delegates in each committee. Every delegate leaves with a certificate of participation.
          </p>
          <ul className="mt-10 divide-y divide-white/15 border-y border-white/15">
            {AWARDS.map((a) => (
              <li key={a} className="font-display-wide py-4 text-[1.35rem] text-brass">
                {a}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-white/55">Move your pointer over the fog. It will not tell you much.</p>
        </div>
      </div>
    </section>
  )
}

/* ---------- 6. Where the money goes ---------- */
function Impact() {
  return (
    <section className="bg-paper" aria-labelledby="impact-h">
      <div className="mx-auto max-w-[90rem] px-5 py-24 sm:px-8 md:py-32">
        <h2 id="impact-h" className="font-display t-1 max-w-3xl text-ink">
          Where your fee goes.
        </h2>
        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1fr_1.1fr]">
          <div>
            <p className="font-display text-[clamp(4rem,3rem+5vw,8rem)] leading-none text-ink">100%</p>
            <p className="mt-4 max-w-sm text-lg leading-relaxed">
              of the 2026 proceeds funded a scholarship through the Ana and Vlade Divac Foundation for a child whose family could not otherwise afford their education.
            </p>
          </div>
          <div>
            <p className="font-display text-[clamp(4rem,3rem+5vw,8rem)] leading-none text-ink">
              {FACTS.foodKg}
              <span className="text-[0.45em]"> kg</span>
            </p>
            <p className="mt-4 max-w-sm text-lg leading-relaxed">of surplus food, approximately, went to the Zvečanska Centre for the Protection of Infants, Children and Youth after the conference.</p>
          </div>
          <figure>
            <img src={img('impact/donation-sorting')} alt="Boxes of donated food stacked for the Zvečanska centre" className="aspect-[4/3] w-full object-cover" loading="lazy" />
            <figcaption className="mt-3 text-sm text-muted">The food donation, ready to leave for Zvečanska.</figcaption>
          </figure>
        </div>
        <Link to="/impact" className="link mt-12 inline-block text-ink">
          Read the full impact report
        </Link>
      </div>
    </section>
  )
}

/* ---------- 7. First conference ---------- */
const FIRST = [
  ['Universities read it', 'Admissions officers skim thousands of near-identical applications. “Represented Japan at an international conference in Belgrade” stands out, and you can talk about it in an interview for ten minutes without running out of material.'],
  ['Skills school never grades', 'Public speaking in English. Negotiating with someone who wants the opposite of what you want. Holding a room’s attention. A committee demands all three in one weekend.'],
  ['A network across borders', `Delegates come from ${FACTS.nationalities} nationalities. The person seated next to you might study law in Vienna or run a student business in Skopje.`],
  ['Proof you can show', 'Every delegate receives a participation certificate. Chairs award Best Delegate, Best Speaker and Honourable Mention in each committee.'],
]

function FirstConference() {
  return (
    <section className="bg-paper-2" aria-labelledby="first-h">
      <div className="mx-auto grid max-w-[90rem] gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 id="first-h" className="font-display t-1 text-ink">
            First conference? You will be fine.
          </h2>
          <p className="t-lede mt-6 max-w-md text-muted">
            Many BDBC delegates sit down at their first committee having never attended a conference. Three days later they have spoken in front of a full room and written a resolution with delegates from four countries.
          </p>
        </div>
        <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {FIRST.map(([t, d]) => (
            <div key={t} className="border-t-2 border-ink pt-4">
              <dt className="t-3 font-semibold text-ink">{t}</dt>
              <dd className="mt-3 leading-relaxed text-text/85">{d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* ---------- 8. Final call ---------- */
function FinalCall() {
  const { seat } = useSeat()
  const c = COMMITTEES.find((x) => x.id === seat)
  return (
    <section className="on-ink overflow-hidden bg-ink text-white" aria-labelledby="final-h">
      <div className="mx-auto grid max-w-[90rem] items-center gap-14 px-5 py-24 sm:px-8 md:grid-cols-[1.1fr_1fr] md:py-32">
        <div>
          <h2 id="final-h" className="font-display t-1">
            Your seat is waiting.
          </h2>
          <p className="t-lede mt-6 max-w-lg text-white/80">
            Applications for {EVENT.edition} are open. Pay €{EVENT.feeTransfer} by bank transfer after you apply, or €{EVENT.feeCash} in cash on the first day.
          </p>
          <Link to="/apply" className="btn btn-apply mt-9">
            {c ? `Apply for ${c.placard}` : 'Apply for BDBC 2027'}
          </Link>
        </div>
        <div className="flex justify-center md:justify-end">
          <Placard className="w-[min(80vw,24rem)]" committee={c?.placard} country={null} name="Your name" />
        </div>
      </div>
    </section>
  )
}
