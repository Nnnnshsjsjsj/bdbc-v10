import { ApplyBand, Eyebrow, Lines, PageHero, Photo } from '../components/ui'
import { BOARD, FOUNDERS, GUESTS, MODULES, VALUES, WHAT_WE_ARE } from '../lib/data'
import { img, useTitle } from '../lib/util'

export default function About() {
  useTitle('About')
  return (
    <>
      <PageHero
        eyebrow="About BDBC"
        lines={['Two Modules.', 'One Vision.']}
        image="gallery/2026/audience"
        intro="BDBC is a youth conference built on two simulations — the rigour of Model UN committee debate and a hands-on business simulation — one of the first of its kind in Eastern Europe."
      />

      <section className="on-light bg-paper py-24 md:py-40">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow className="mb-8 text-crimson">What we are</Eyebrow>
            <Lines className="display t-lg text-ink" lines={['Eastern Europe’s', 'First MUN +', 'Business', 'Conference']} />
          </div>
          <div className="prose md:col-span-6 md:col-start-7">
            <p className="lede" data-fade>
              {WHAT_WE_ARE[0]}
            </p>
            <p className="lede" data-fade>
              {WHAT_WE_ARE[1]}
            </p>
            <p className="statement mt-12 text-ink" data-words>
              {WHAT_WE_ARE[2]}
            </p>
          </div>
        </div>
        <div className="wrap mt-24 grid gap-px bg-ink/15 md:grid-cols-2">
          {MODULES.map((m) => (
            <article key={m.name} className="bg-paper py-12 md:p-14" data-fade>
              <p className="label text-crimson">{m.label}</p>
              <h3 className="display t-md mt-4 text-ink">{m.name}</h3>
              <p className="mt-6 text-lg text-muted">{m.skills.join(' · ')}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="on-dark bg-ink py-24 text-white md:py-40">
        <div className="wrap">
          <Eyebrow className="mb-8 text-gold">The people behind everything</Eyebrow>
          <Lines className="display t-xl" lines={['Founded', 'with Purpose']} />
          <p className="lede mt-10 max-w-3xl text-white/75" data-fade>
            BDBC wasn’t built on resumes. It was built on a belief that youth in Eastern Europe deserve a world-class platform to grow, lead, and give back to the community.
          </p>
          <div className="mt-20">
            {FOUNDERS.map((f) => (
              <figure key={f.name} className="rule grid gap-6 py-10 md:grid-cols-12 md:items-start md:gap-10 md:py-14" data-fade>
                <div className="md:col-span-3">
                  <img src={img(f.photo)} alt="" loading="lazy" className="h-28 w-28 rounded-full object-cover grayscale transition duration-700 hover:grayscale-0 md:h-36 md:w-36" />
                </div>
                <blockquote className="statement !text-[clamp(1.35rem,0.9rem+1.5vw,2.3rem)] md:col-span-6">“{f.quote}”</blockquote>
                <figcaption className="md:col-span-3 md:text-right">
                  <p className="text-xl font-bold">{f.name}</p>
                  <p className="label mt-2 text-gold">Founder</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="on-light bg-paper py-24 md:py-40">
        <div className="wrap">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow className="mb-8 text-crimson">This year’s team</Eyebrow>
              <Lines className="display t-xl text-ink" lines={['Organising', 'Board 2027']} />
            </div>
            <p className="lede text-muted md:col-span-5" data-fade>
              Five young leaders carry each edition of BDBC from idea to opening gavel. The board is renewed every year — passing the torch is part of the mission.
            </p>
          </div>
          <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-5 md:gap-x-6">
            {BOARD.map((b, i) => (
              <li key={b.name} className={i % 2 ? 'md:mt-16' : ''}>
                <Photo src={b.photo} alt={b.name} className="aspect-[3/4]" imgClass="grayscale hover:grayscale-0 transition duration-700" delay={i * 0.08} />
                <p className="mt-4 text-lg font-bold text-ink">{b.name}</p>
                <p className="label mt-1 text-crimson">{b.role}</p>
              </li>
            ))}
          </ul>
          <p className="mt-14 text-sm text-muted" data-fade>
            The Organising Board changes with every edition — this section is updated annually.
          </p>
        </div>
      </section>

      <section className="on-light bg-sun py-24 text-ink md:py-40">
        <div className="wrap">
          <Eyebrow className="mb-8 text-ink">What we stand for</Eyebrow>
          <Lines className="display t-xl" lines={['Mission', '& Values']} />
          <dl className="mt-16 grid gap-x-12 md:grid-cols-2">
            {VALUES.map(([t, d]) => (
              <div key={t} className="border-t-2 border-ink py-10" data-fade>
                <dt className="display t-md">{t}</dt>
                <dd className="lede mt-5 max-w-lg text-ink/80">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="on-light bg-paper py-24 md:py-40">
        <div className="wrap">
          <Eyebrow className="mb-8 text-crimson">Distinguished guests</Eyebrow>
          <Lines className="display t-lg text-ink" lines={['Guest Speakers Who', 'Supported the Event']} />
          <p className="lede mt-8 max-w-2xl text-muted" data-fade>
            Distinguished voices from diplomacy, European youth policy, and political science.
          </p>
          <ul className="mt-16 grid gap-10 md:grid-cols-3">
            {GUESTS.map((g, i) => (
              <li key={g.name}>
                <Photo src={g.photo} alt={g.name} className="aspect-[4/5]" imgClass="object-top" delay={i * 0.1} />
                <p className="mt-5 text-2xl font-bold text-ink">{g.name}</p>
                <p className="mt-1 text-muted">{g.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ApplyBand title={['Ready to be part', 'of the movement?']} />
    </>
  )
}
