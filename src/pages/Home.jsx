import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/motion'
import { Link } from '../lib/router'
import { Btn, Eyebrow, Lines, Marquee, Photo } from '../components/ui'
import Badge from '../components/Badge'
import FogTrophy from '../components/FogTrophy'
import { AWARDS, COMMITTEES, DISCOVER, PARTNERS, STATS } from '../lib/data'
import { asset, img, useTitle } from '../lib/util'

export default function Home() {
  useTitle(null)
  return (
    <>
      <Hero />
      <Slogan />
      <Moments />
      <Stats />
      <MoreThan />
      <Rooms />
      <Discover />
      <Awards />
      <Seat />
      <Sponsors />
    </>
  )
}

/* ---------- Hero ---------- */
function Hero() {
  const root = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('[data-hero-media]', { yPercent: 18, scale: 1.12, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('[data-hero-copy]', { yPercent: -12, autoAlpha: 0.2, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} className="on-dark grain relative isolate h-[100svh] min-h-[660px] overflow-hidden bg-ink text-white">
      <div data-hero-media className="absolute inset-0 -z-10">
        <video className="h-full w-full object-cover" autoPlay muted loop playsInline poster={asset('video/belgrade.jpg')} aria-hidden="true">
          <source src={asset('video/belgrade.mp4')} type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/50" />
      <div className="absolute inset-0 -z-10 bg-navy/35 mix-blend-multiply" />

      <div data-hero-copy className="wrap flex h-full flex-col justify-end pb-8 pt-28 md:pb-10">
        <p className="label mb-5 flex items-center gap-3 text-white/85 md:mb-7" data-fade>
          <span className="h-2 w-2 rounded-full bg-crimson" />
          Belgrade · End of February 2027
        </p>
        <div className="relative [container-type:inline-size]">
          <Lines as="h1" className="display whitespace-nowrap text-[14.6cqw]" lines={['Lead the debate.', 'Close the deal.']} />
          <p className="script mt-3 text-[2.6rem] md:absolute md:-top-[1.05em] md:right-[6%] md:mt-0 md:-rotate-6 md:text-[clamp(2.2rem,5.2vw,6rem)]" data-fade data-delay="0.7">
            By Youth, For Youth
          </p>
        </div>
        <div className="rule mt-8 grid gap-6 pt-6 md:mt-10 md:grid-cols-[1.3fr_1fr_auto] md:items-end md:gap-12">
          <p className="max-w-xl text-[1.05rem] leading-relaxed text-white/85" data-fade data-delay="0.35">
            One of Europe’s first conferences uniting Model UN diplomacy with a real-world business simulation — three days of debate, negotiation, and ideas in the heart of Belgrade.
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-white/70" data-fade data-delay="0.45">
            <strong className="font-semibold text-gold">A fully humanitarian conference</strong> — 100% of the proceeds go to children who need them most.
          </p>
          <div className="flex flex-wrap gap-3" data-fade data-delay="0.55">
            <Btn to="/apply" data-cursor="Apply">
              Apply for BDBC 2027
            </Btn>
            <Btn to="/about" kind="line">
              Learn more
            </Btn>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Slogan band ---------- */
function Slogan() {
  const item = (
    <span className="flex items-center">
      <span className="display px-[0.25em] text-[clamp(3rem,9vw,9rem)]">By Youth</span>
      <span className="serif-it px-[0.2em] text-[clamp(3rem,9vw,9rem)] leading-none text-crimson">for youth</span>
      <img src={asset('logo.png')} alt="" className="mx-[2vw] h-[clamp(2.6rem,7vw,7rem)] w-auto" />
    </span>
  )
  return (
    <section className="on-light overflow-hidden bg-paper py-10 text-ink md:py-16" aria-label="By Youth, For Youth">
      <Marquee dur={28}>
        {item}
        {item}
      </Marquee>
    </section>
  )
}

/* ---------- Three moments ---------- */
function Moments() {
  return (
    <section className="on-light bg-paper pb-24 md:pb-40">
      <div className="wrap grid grid-cols-12 gap-x-4 gap-y-10 md:gap-x-8">
        <figure className="col-span-12 md:col-span-6">
          <Photo src="gallery/2026/committee-vote" alt="Delegates raising their placards in a vote" className="aspect-[4/3]" parallax="7" cursor="2026" />
          <figcaption className="label mt-4 text-muted">2026 — A motion put to the vote</figcaption>
        </figure>
        <figure className="col-span-7 md:col-span-3 md:mt-40">
          <Photo src="gallery/2026/audience" alt="The opening ceremony audience" className="aspect-[3/4]" parallax="10" delay="0.1" cursor="2026" />
          <figcaption className="label mt-4 text-muted">2026 — Opening ceremony audience</figcaption>
        </figure>
        <figure className="col-span-5 mt-16 md:col-span-3 md:mt-12">
          <Photo src="gallery/2026/awards-ceremony" alt="Delegates with certificates and awards" className="aspect-[3/4]" parallax="6" delay="0.2" cursor="2026" />
          <figcaption className="label mt-4 text-muted">2026 — Certificates and awards at FMK</figcaption>
        </figure>
      </div>
    </section>
  )
}

/* ---------- Stats ---------- */
function Stats() {
  return (
    <section className="on-dark bg-ink text-white">
      <div className="wrap grid grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.label} className={`border-white/15 py-14 md:py-24 ${i % 2 ? 'border-l pl-5 md:pl-10' : ''} ${i > 1 ? 'border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l lg:pl-10' : ''}`}>
            <p className="display text-[clamp(4rem,10.5vw,11rem)] leading-[0.8]">
              <span data-count={s.n}>{s.n}</span>
              <span className="text-crimson">{s.suffix}</span>
            </p>
            <p className="label mt-6" data-fade>
              {s.label}
            </p>
            <p className="mt-2 text-sm text-white/55" data-fade>
              {s.sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- More than a conference ---------- */
function MoreThan() {
  return (
    <section className="on-light bg-paper py-28 md:py-48">
      <div className="wrap grid gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <Eyebrow className="text-crimson">More than a conference</Eyebrow>
        </div>
        <div className="md:col-span-9">
          <Lines
            className="statement text-ink"
            lines={[
              <>
                <span className="serif-it">“By Youth, For Youth”</span> —
              </>,
              'in the most literal sense.',
            ]}
          />
          <p className="statement mt-12 text-ink" data-words>
            BDBC doesn’t just educate — it acts. 100% of the conference proceeds fund a scholarship through the Ana and Vlade Divac Foundation, and roughly 300 kg of surplus food went to the Zvečanska children’s centre. Every edition gives everything back.
          </p>
          <div className="mt-14" data-fade>
            <Btn to="/impact" kind="line" className="text-ink">
              See our impact
            </Btn>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Five committees, five rooms ---------- */
function Rooms() {
  const section = useRef(null)
  const track = useRef(null)
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const dist = () => track.current.scrollWidth - window.innerWidth
      const tween = gsap.to(track.current, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: { trigger: section.current, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 0.7, invalidateOnRefresh: true, anticipatePin: 1 },
      })
      gsap.utils.toArray('[data-room-img]', track.current).forEach((el) => {
        gsap.fromTo(el, { xPercent: -8 }, { xPercent: 8, ease: 'none', scrollTrigger: { trigger: el.parentElement, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } })
      })
    })
    return () => mm.revert()
  }, [])
  return (
    <section ref={section} className="on-dark overflow-hidden bg-ink-2 text-white" aria-labelledby="rooms-h">
      <div ref={track} className="flex snap-x snap-mandatory overflow-x-auto lg:h-screen lg:w-max lg:snap-none lg:overflow-visible">
        <div className="flex w-screen shrink-0 snap-start flex-col justify-end px-[clamp(1.1rem,3.2vw,3.2rem)] pb-14 pt-32 lg:w-[62vw]">
          <Eyebrow className="mb-8 text-gold">Five committees · One conference</Eyebrow>
          <Lines id="rooms-h" className="display t-xl" lines={['Committees', 'at BDBC 2027']} />
          <p className="lede mt-8 max-w-xl text-white/75" data-fade>
            At BDBC 2027, delegates will step into five dynamic committees, each designed to challenge their diplomatic, analytical, and strategic skills while offering real-world insights into global affairs.
          </p>
          <p className="label mt-10 hidden items-center gap-3 text-white/50 lg:flex" data-fade>
            Scroll <span className="inline-block h-px w-16 bg-current" /> every committee has its own room
          </p>
        </div>
        {COMMITTEES.map((c) => (
          <article key={c.id} className="relative flex w-[88vw] shrink-0 snap-start flex-col border-l border-white/15 lg:h-screen lg:w-[46vw]">
            <div className="relative h-[42vh] overflow-hidden lg:h-[56%]">
              <img data-room-img src={img(c.img)} alt="" loading="lazy" className="absolute inset-y-0 -left-[10%] h-full w-[120%] max-w-none object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-transparent to-ink/30" />
              <p className="display absolute left-6 top-24 text-[clamp(5rem,11vw,11rem)] leading-none text-white/90 mix-blend-overlay lg:left-10">{c.no}</p>
            </div>
            <div className="flex flex-1 flex-col px-6 pb-10 pt-6 lg:px-10">
              <p className="label text-gold">Committee {c.no}</p>
              <h3 className="display mt-3 text-[clamp(2rem,3.4vw,3.6rem)]">{c.name}</h3>
              <p className="mt-5 max-w-xl leading-relaxed text-white/75">{c.about}</p>
              <Link to="/committees" className="label ulink mt-auto self-start pt-6 text-white" data-cursor="Open">
                Why apply?
              </Link>
            </div>
          </article>
        ))}
        <div className="flex w-screen shrink-0 snap-start flex-col justify-center border-l border-white/15 px-[clamp(1.1rem,3.2vw,3.2rem)] py-24 lg:w-[58vw]">
          <p className="statement max-w-2xl">Become part of the next generation of global leaders</p>
          <div className="mt-12 flex flex-wrap gap-3">
            <Btn to="/apply" data-cursor="Apply">
              Apply Now
            </Btn>
            <Btn to="/committees" kind="line">
              All committees
            </Btn>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Discover ---------- */
function Discover() {
  const [hover, setHover] = useState(null)
  return (
    <section className="on-light bg-paper py-28 md:py-44">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-12">
          <Eyebrow className="text-crimson md:col-span-3">Discover BDBC</Eyebrow>
          <Lines className="display t-lg text-ink md:col-span-9" lines={['Everything You', 'Need to Know']} />
        </div>
        <ul className="relative mt-16 md:mt-24">
          {DISCOVER.map((d, i) => (
            <li key={d.to} className="rule border-ink/20 last:border-b last:border-ink/20" data-fade>
              <Link to={d.to} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} className="group relative grid items-center gap-4 py-8 transition-colors duration-500 hover:text-crimson md:grid-cols-12 md:py-12" data-cursor="Open">
                <h3 className="display text-[clamp(2rem,5vw,5.2rem)] transition-transform duration-500 group-hover:translate-x-4 md:col-span-7">{d.title}</h3>
                <p className="max-w-sm text-muted md:col-span-3">{d.text}</p>
                <span className="label md:col-span-2 md:justify-self-end">Learn more →</span>
              </Link>
            </li>
          ))}
          <div className="pointer-events-none absolute right-[18%] top-1/2 hidden aspect-[4/5] w-[22vw] -translate-y-1/2 overflow-hidden md:block" aria-hidden="true">
            {DISCOVER.map((d, i) => (
              <img key={d.to} src={img(d.img, d.img.startsWith('gallery') ? 'sm' : undefined)} alt="" className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ${hover === i ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`} style={{ rotate: `${(i - 1) * 3}deg` }} />
            ))}
          </div>
        </ul>
      </div>
    </section>
  )
}

/* ---------- Awards ---------- */
function Awards() {
  return (
    <section className="on-dark grid bg-ink text-white lg:grid-cols-2">
      <FogTrophy />
      <div className="flex flex-col justify-center px-[clamp(1.1rem,3.2vw,3.2rem)] py-24 lg:py-32">
        <Eyebrow className="mb-8 text-gold">Awards</Eyebrow>
        <Lines className="display t-lg" lines={['A trophy still', 'in the fog.']} />
        <p className="lede mt-8 max-w-lg text-white/75" data-fade>
          The BDBC 2027 trophy has not been revealed yet. What we can tell you is who takes one home in every committee.
        </p>
        <ul className="mt-12">
          {AWARDS.map((a) => (
            <li key={a} className="rule flex items-baseline justify-between py-5 last:border-b last:border-white/15" data-fade>
              <span className="display text-[clamp(1.8rem,3.2vw,3.2rem)] text-gold">{a}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------- Claim your seat ---------- */
function Seat() {
  return (
    <section className="on-dark relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 opacity-60" style={{ background: 'radial-gradient(ellipse 60% 70% at 75% 40%, rgba(2,79,133,.9), transparent 70%)' }} />
      <div className="wrap relative grid items-center gap-16 py-28 md:grid-cols-2 md:py-40">
        <div>
          <Eyebrow className="mb-8 text-gold">BDBC 2027</Eyebrow>
          <Lines className="display t-xl" lines={['Claim', 'Your Seat.']} />
          <p className="lede mt-8 max-w-md text-white/80" data-fade>
            Complete the application and confirm your place with payment. Spots are limited.
          </p>
          <div className="mt-10 flex flex-wrap gap-3" data-fade>
            <Btn to="/apply" data-cursor="Apply">
              Apply for BDBC 2027
            </Btn>
            <Btn to="/why-bdbc" kind="line">
              Why BDBC
            </Btn>
          </div>
        </div>
        <Badge className="pt-24 md:pt-10" />
      </div>
    </section>
  )
}

/* ---------- Sponsors ---------- */
function Sponsors() {
  const eight = PARTNERS.slice(0, 8)
  return (
    <section className="on-light bg-paper-2 py-16 md:py-20">
      <p className="label mb-10 text-center text-crimson">Sponsors &amp; Partners</p>
      <Marquee dur={45}>
        {eight.map((p) => (
          <span key={p.name} className="mx-3 flex shrink-0 items-center gap-4 bg-white px-6 py-4">
            <img src={img(p.logo)} alt="" className="h-10 w-10 object-contain" />
            <span className="whitespace-nowrap font-medium text-ink">{p.name}</span>
          </span>
        ))}
      </Marquee>
    </section>
  )
}
