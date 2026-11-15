import { Btn, Eyebrow, Lines, PageHero, Photo } from '../components/ui'
import { PARTNERS } from '../lib/data'
import { img, useTitle } from '../lib/util'

const A = ({ href, children }) => (
  <a className="ulink" href={href} target="_blank" rel="noreferrer">
    {children}
  </a>
)

export default function Recognition() {
  useTitle('Recognition')
  return (
    <>
      <PageHero
        eyebrow="Recognition & partners"
        lines={['Recognised by', 'Those Who Know', 'the Best.']}
        image="gallery/2026/guest-visit"
        intro="BDBC has earned recognition from diplomatic institutions and international partners who see what is possible when youth lead with ambition and purpose."
      />

      <section className="on-light bg-paper py-24 md:py-40">
        <div className="wrap">
          <Eyebrow className="mb-8 text-crimson">Diplomatic recognition</Eyebrow>
          <Lines className="display t-xl text-ink" lines={['Recognised', 'by Embassies']} />

          <article className="rule mt-20 grid gap-10 border-ink/20 pt-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <h3 className="display t-md text-ink">French Embassy in Serbia</h3>
              <p className="label mt-3 text-crimson">Official Recognition</p>
              <Photo src="people/florence" alt="H.E. Florence Ferrari" className="mt-8 aspect-[4/3]" imgClass="object-top" />
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <blockquote className="statement text-ink" data-words>
                “I was impressed by the dedication and the professionalism of the organisers as well as the enthusiasm of all participants.”
              </blockquote>
              <p className="mt-8 text-xl font-bold text-ink" data-fade>
                H.E. Florence Ferrari
              </p>
              <p className="text-muted" data-fade>
                Ambassador of France to Serbia
              </p>
              <p className="lede mt-8 text-text/85" data-fade>
                H.E. Florence Ferrari was a guest speaker at the opening ceremony of BDBC 2026, addressing delegates in person before the first committee sessions began.
              </p>
              <p className="mt-8 text-ink" data-fade>
                <A href="https://www.instagram.com/p/DY-Ay2ICEEM/">The Embassy’s Instagram post →</A>
              </p>
            </div>
          </article>

          <article className="rule mt-20 grid gap-10 border-ink/20 pt-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <h3 className="display t-md text-ink">German Embassy in Serbia</h3>
              <p className="label mt-3 text-crimson">Cross-Border Collaboration</p>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <p className="lede text-text/85" data-fade>
                The German Embassy featured BDBC on its official Instagram for the conference’s collaboration with Gymnasium Am Löhrtor (Siegen, Germany): BDBC welcomed a delegation of students and their professor from Siegen and supported them throughout the conference — cross-border cooperation among young European leaders in practice.
              </p>
              <p className="mt-8 text-xl font-bold text-ink" data-fade>
                Gymnasium Am Löhrtor
              </p>
              <p className="text-muted" data-fade>
                Siegen, Germany — Partner Institution
              </p>
              <p className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-ink" data-fade>
                <A href="https://www.instagram.com/p/DY68rRwC1SA/">German Embassy’s post →</A>
                <A href="https://www.instagram.com/p/DZpmlX3CH9S/">Gymnasium Am Löhrtor’s post →</A>
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="on-dark relative isolate overflow-hidden bg-ink py-28 text-white md:py-48">
        <img src={img('gallery/2026/german-delegation')} alt="The Gymnasium Am Löhrtor delegation with BDBC organisers" data-parallax="8" className="absolute inset-0 -z-10 h-full w-full scale-[1.15] object-cover opacity-40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/75 to-transparent" />
        <div className="wrap">
          <Eyebrow className="mb-8 text-gold">International cooperation</Eyebrow>
          <Lines className="display t-xl" lines={['Belgrade to', 'Siegen —', 'and Beyond']} />
          <p className="lede mt-10 max-w-2xl text-white/85" data-fade>
            The collaboration between BDBC and Gymnasium Am Löhrtor represents exactly what we believe in: young people from different countries, cultures, and systems coming together around shared values of diplomacy, dialogue, and growth.
          </p>
        </div>
      </section>

      <section className="on-light bg-paper py-24 md:py-40">
        <div className="wrap">
          <Eyebrow className="mb-8 text-crimson">Our supporters</Eyebrow>
          <Lines className="display t-xl text-ink" lines={['Sponsors', '& Partners']} />
          <p className="lede mt-8 text-muted" data-fade>
            Organizations that believe in what we’re building.
          </p>
          <ul className="mt-16 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-5">
            {PARTNERS.map((p) => (
              <li key={p.name} className="group flex flex-col gap-6 bg-paper p-6 transition-colors duration-500 hover:bg-white md:p-8" data-fade>
                <img src={img(p.logo)} alt="" loading="lazy" className="h-16 w-16 object-contain mix-blend-multiply" />
                <div>
                  <p className="text-lg font-bold leading-tight text-ink">{p.name}</p>
                  <p className="label mt-2 text-crimson">{p.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-dark bg-crimson py-24 text-white md:py-36">
        <div className="wrap grid gap-10 md:grid-cols-[1.6fr_1fr] md:items-end">
          <div>
            <Eyebrow className="mb-8">Sponsors &amp; partners</Eyebrow>
            <Lines className="display t-lg" lines={['Interested in', 'Partnering', 'with BDBC?']} />
            <p className="lede mt-8 max-w-2xl text-white/85" data-fade>
              Reach a highly engaged audience of ambitious students and young professionals — and put your name behind a fully humanitarian conference.
            </p>
          </div>
          <div className="md:justify-self-end" data-fade>
            <Btn to="/contact" kind="line" className="text-white">
              Become a partner →
            </Btn>
          </div>
        </div>
      </section>
    </>
  )
}
