import { ApplyBand, Eyebrow, Lines, PageHero } from '../components/ui'
import { AGENDA } from '../lib/data'
import { useTitle } from '../lib/util'

const KIND = {
  Committee: 'bg-navy text-white',
  Ceremony: 'bg-crimson text-white',
  'Break / Social': 'bg-sun text-ink',
  Logistics: 'bg-ink/10 text-muted',
}

export default function Program() {
  useTitle('Agenda')
  return (
    <>
      <PageHero
        eyebrow="Conference layout"
        lines={['The Agenda']}
        image="gallery/2026/committee-session"
        intro="Three days of committee sessions, debate, and closing celebration — the same structure that has run every BDBC edition so far."
      />
      <section className="on-light bg-paper py-20 md:py-32">
        <div className="wrap">
          <div className="flex flex-wrap items-center gap-3" data-fade>
            <span className="label mr-2 text-muted">Session legend:</span>
            {Object.entries(KIND).map(([k, c]) => (
              <span key={k} className={`label rounded-full px-3 py-2 text-[0.65rem] ${c}`}>
                {k}
              </span>
            ))}
          </div>
          {AGENDA.map((d, di) => (
            <article key={d.title} className="mt-20 grid gap-8 md:mt-28 md:grid-cols-12">
              <header className="md:sticky md:top-28 md:col-span-5 md:self-start">
                <Eyebrow className="mb-6 text-crimson">{d.tag}</Eyebrow>
                <p className="display text-[clamp(6rem,16vw,15rem)] leading-[0.75]" style={{ color: ['#d4232c', '#1b3fc2', '#0b7f58'][di] }} aria-hidden="true">
                  0{di + 1}
                </p>
                <Lines as="h2" className="display t-md mt-4 text-ink" lines={[d.title.split(': ')[0] + ':', d.title.split(': ')[1]]} />
              </header>
              <ol className="md:col-span-7">
                {d.items.map(([time, what, kind, note]) => (
                  <li key={time + what} className="rule grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-ink/20 py-6 last:border-b md:grid-cols-[10rem_1fr_auto]" data-fade>
                    <span className="tabular-nums text-muted">{time}</span>
                    <span>
                      <span className={`text-xl md:text-2xl ${kind === 'Committee' || kind === 'Ceremony' ? 'font-bold text-ink' : 'text-ink/70'}`}>{what}</span>
                      {note && <span className="mt-2 block text-muted">{note}</span>}
                    </span>
                    <span className={`label col-start-2 w-fit rounded-full px-3 py-2 text-[0.62rem] md:col-start-3 ${KIND[kind]}`}>{kind}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
          <p className="mt-20 max-w-3xl border-l-2 border-crimson pl-6 text-muted" data-fade>
            This timetable follows the day-by-day structure of the BDBC 2026 edition. BDBC 2027 takes place at the end of February 2027 — exact dates and any schedule changes will be announced closer to the conference.
          </p>
        </div>
      </section>
      <ApplyBand title={['Secure your place', 'at the table.']} />
    </>
  )
}
