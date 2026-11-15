import PageHeader from '../components/PageHeader'
import { Link } from '../lib/router'
import { AGENDA } from '../lib/data'
import { useDocumentTitle } from '../lib/util'

const KIND = {
  committee: { label: 'Committee', cls: 'bg-navy text-white' },
  ceremony: { label: 'Ceremony', cls: 'bg-crimson text-white' },
  social: { label: 'Break', cls: 'bg-globe/50 text-ink' },
  logistics: { label: 'Logistics', cls: 'bg-paper-2 text-muted' },
}

export default function Program() {
  useDocumentTitle('Agenda')
  return (
    <>
      <PageHeader
        title="Three days, start to closing gavel."
        intro="This timetable follows the structure of the BDBC 2026 edition. BDBC 2027 takes place at the end of February 2027. Exact dates and any schedule changes will be announced closer to the conference."
      />
      <section className="bg-paper">
        <div className="mx-auto max-w-[90rem] space-y-20 px-5 py-20 sm:px-8 md:py-28">
          {AGENDA.map((d) => (
            <article key={d.day} className="grid gap-8 lg:grid-cols-[16rem_1fr]">
              <header>
                <p className="font-display text-5xl text-ink">{d.day}</p>
                <h2 className="mt-2 text-lg text-muted">{d.title}</h2>
              </header>
              <ol className="divide-y divide-ink/10 border-y border-ink/10">
                {d.items.map(([from, to, what, kind, note]) => (
                  <li key={from + what} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 py-4 sm:grid-cols-[9rem_1fr_7rem]">
                    <span className="tabular-nums text-muted">
                      {from}
                      {to && `–${to}`}
                    </span>
                    <span>
                      <span className={kind === 'committee' || kind === 'ceremony' ? 'font-semibold text-ink' : ''}>{what}</span>
                      {note && <span className="mt-1 block text-sm text-muted">{note}</span>}
                    </span>
                    <span className={`hidden w-fit rounded-[var(--radius-ui)] px-2 py-1 text-xs font-semibold sm:block ${KIND[kind].cls}`}>{KIND[kind].label}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
          <div className="flex flex-wrap items-center gap-6 border-t-2 border-ink pt-8">
            <p className="t-3 text-ink">Secure your place at the table.</p>
            <Link to="/apply" className="btn btn-apply">
              Apply for BDBC 2027
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
