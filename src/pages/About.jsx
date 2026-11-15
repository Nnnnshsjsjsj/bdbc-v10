import PageHeader from '../components/PageHeader'
import { Link } from '../lib/router'
import { BOARD, FOUNDERS, GUESTS, MODULES, PARTNERS } from '../lib/data'
import { img, useDocumentTitle } from '../lib/util'

export default function About() {
  useDocumentTitle('About')
  return (
    <>
      <PageHeader
        title="Two modules. One conference."
        intro="BDBC is a youth conference built on two simulations: the rigour of Model UN committee debate and a hands-on business simulation. It is one of the first of its kind in Eastern Europe."
        image={img('gallery/2026/audience')}
      />

      <section className="bg-paper">
        <div className="mx-auto grid max-w-[90rem] gap-14 px-5 py-20 sm:px-8 md:grid-cols-2 md:py-28">
          {MODULES.map((m, i) => (
            <article key={m.name} className="border-t-2 border-ink pt-5">
              <p className="text-sm font-semibold text-sea">Module {i + 1}</p>
              <h2 className="font-display t-2 mt-2 text-ink">{m.name}</h2>
              <p className="mt-5 text-[1.05rem] leading-relaxed">{m.text}</p>
              <p className="mt-5 text-sm text-muted">{m.skills.join(', ')}</p>
            </article>
          ))}
          <p className="t-3 measure text-ink md:col-span-2">
            Together, these two modules create something the region has never had before: a space where the next generation of diplomats, entrepreneurs, and changemakers learn side by side.
          </p>
        </div>
      </section>

      <section className="bg-paper-2" aria-labelledby="founders-h">
        <div className="mx-auto max-w-[90rem] px-5 py-20 sm:px-8 md:py-28">
          <h2 id="founders-h" className="font-display t-1 text-ink">
            Founded with purpose.
          </h2>
          <p className="t-lede measure mt-5 text-muted">
            BDBC wasn’t built on resumes. It was built on a belief that youth in Eastern Europe deserve a world-class platform to grow, lead, and give back to the community.
          </p>
          <div className="mt-14 grid gap-x-14 gap-y-14 md:grid-cols-2">
            {FOUNDERS.map((f) => (
              <figure key={f.name} className="grid grid-cols-[5.5rem_1fr] gap-5">
                <img src={img(f.photo)} alt={f.name} className="aspect-square w-full object-cover grayscale-[20%]" loading="lazy" />
                <div>
                  <blockquote className="font-serif text-[1.15rem] leading-relaxed">“{f.quote}”</blockquote>
                  <figcaption className="mt-3 text-sm">
                    <span className="font-semibold text-ink">{f.name}</span>, co-founder
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper" aria-labelledby="board-h">
        <div className="mx-auto max-w-[90rem] px-5 py-20 sm:px-8 md:py-28">
          <div className="grid gap-6 md:grid-cols-2 md:items-end">
            <h2 id="board-h" className="font-display t-1 text-ink">
              Organising Board 2027.
            </h2>
            <p className="measure text-muted">Five young leaders carry each edition of BDBC from idea to opening gavel. The board is renewed every year. Passing the torch is part of the mission.</p>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {BOARD.map((b) => (
              <li key={b.name}>
                <img src={img(b.photo)} alt="" className="aspect-[4/5] w-full object-cover" loading="lazy" />
                <p className="mt-3 font-semibold text-ink">{b.name}</p>
                <p className="text-sm text-muted">{b.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-ink bg-ink text-white" aria-labelledby="guests-h">
        <div className="mx-auto max-w-[90rem] px-5 py-20 sm:px-8 md:py-28">
          <h2 id="guests-h" className="font-display t-1">
            Guests who spoke at BDBC.
          </h2>
          <ul className="mt-12 grid gap-10 sm:grid-cols-3">
            {GUESTS.map((g) => (
              <li key={g.name}>
                <img src={img(g.photo)} alt="" className="aspect-[4/3] w-full object-cover object-top" loading="lazy" />
                <p className="mt-4 text-lg font-semibold">{g.name}</p>
                <p className="text-white/70">{g.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="recognition" className="bg-paper" aria-labelledby="rec-h">
        <div className="mx-auto max-w-[90rem] px-5 py-20 sm:px-8 md:py-28">
          <h2 id="rec-h" className="font-display t-1 text-ink">
            Recognised by embassies.
          </h2>
          <div className="mt-12 grid gap-14 lg:grid-cols-2">
            <article>
              <h3 className="t-3 font-semibold text-ink">French Embassy in Serbia</h3>
              <blockquote className="mt-4 font-serif text-xl leading-relaxed italic">
                “I was impressed by the dedication and the professionalism of the organisers as well as the enthusiasm of all participants.”
              </blockquote>
              <p className="mt-3 text-sm text-muted">H.E. Florence Ferrari, Ambassador of France to Serbia</p>
              <p className="mt-5 leading-relaxed">H.E. Florence Ferrari was a guest speaker at the opening ceremony of BDBC 2026, addressing delegates in person before the first committee sessions began.</p>
              <a className="link mt-4 inline-block text-ink" href="https://www.instagram.com/p/DY-Ay2ICEEM/" target="_blank" rel="noreferrer">
                The Embassy’s post on Instagram
              </a>
            </article>
            <article>
              <h3 className="t-3 font-semibold text-ink">German Embassy in Serbia</h3>
              <p className="mt-4 leading-relaxed">
                The German Embassy featured BDBC on its official Instagram for the conference’s collaboration with Gymnasium Am Löhrtor (Siegen, Germany): BDBC welcomed a delegation of students and their professor from Siegen and supported them throughout the conference.
              </p>
              <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                <a className="link text-ink" href="https://www.instagram.com/p/DY68rRwC1SA/" target="_blank" rel="noreferrer">
                  German Embassy’s post
                </a>
                <a className="link text-ink" href="https://www.instagram.com/p/DZpmlX3CH9S/" target="_blank" rel="noreferrer">
                  Gymnasium Am Löhrtor’s post
                </a>
              </p>
              <img src={img('gallery/2026/german-delegation')} alt="The Gymnasium Am Löhrtor delegation with BDBC organisers" className="mt-6 aspect-[3/2] w-full object-cover" loading="lazy" />
            </article>
          </div>

          <h3 className="t-2 mt-24 font-display text-ink">Sponsors and partners</h3>
          <ul className="mt-8 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
            {PARTNERS.map((p) => (
              <li key={p.name} className="flex items-center gap-4 bg-paper p-5">
                <img src={img(p.logo)} alt="" className="h-12 w-12 shrink-0 object-contain mix-blend-multiply" loading="lazy" />
                <div>
                  <p className="font-semibold leading-tight text-ink">{p.name}</p>
                  <p className="text-sm text-muted">{p.role}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-14 max-w-2xl">
            <p className="t-3 text-ink">Want to partner with BDBC 2027?</p>
            <p className="mt-3 text-muted">Reach an engaged audience of ambitious students and young professionals, and put your name behind a fully humanitarian conference.</p>
            <Link to="/contact" className="btn btn-quiet mt-6 text-ink">
              Write to the organisers
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
