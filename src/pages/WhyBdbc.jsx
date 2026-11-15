import { ApplyBand, Eyebrow, Lines, PageHero } from '../components/ui'
import { COMPARE, FIRST, REASONS } from '../lib/data'
import { useTitle } from '../lib/util'

export default function WhyBdbc() {
  useTitle('Why BDBC')
  return (
    <>
      <PageHero
        eyebrow="Why choose BDBC"
        lines={['Why BDBC?']}
        image="gallery/2026/delegate-speaking"
        intro="There are many conferences. There is only one that combines diplomacy, business, and humanitarian impact under one roof — here in Belgrade."
      />

      <section className="on-light bg-paper py-24 md:py-40">
        <div className="wrap">
          <Eyebrow className="mb-8 text-crimson">What you gain</Eyebrow>
          <Lines className="display t-xl text-ink" lines={['Six Reasons', 'to Apply']} />
          <ol className="mt-16">
            {REASONS.map(([t, d, stat], i) => (
              <li key={t} className="rule group grid gap-4 border-ink/20 py-10 transition-colors duration-500 last:border-b hover:bg-white md:grid-cols-12 md:gap-8 md:px-6 md:py-14" data-fade>
                <span className="display text-3xl text-crimson md:col-span-1">0{i + 1}</span>
                <h3 className="display t-md text-ink transition-transform duration-500 group-hover:translate-x-3 md:col-span-4">{t}</h3>
                <p className="lede text-text/80 md:col-span-4">{d}</p>
                <p className="label self-start text-muted md:col-span-3 md:text-right">{stat}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="on-dark bg-ink py-24 text-white md:py-40">
        <div className="wrap">
          <Eyebrow className="mb-8 text-gold">How we compare</Eyebrow>
          <Lines className="display t-xl" lines={['BDBC vs.', 'a Typical MUN']} />
          <div className="mt-16 overflow-x-auto" data-fade>
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <thead>
                <tr className="label text-white/50">
                  <th className="py-4 pr-4 font-semibold">Feature</th>
                  <th className="w-40 bg-crimson px-6 py-4 text-center font-semibold text-white">BDBC</th>
                  <th className="w-40 px-6 py-4 text-center font-semibold">Typical MUN</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([f, a, b]) => (
                  <tr key={f} className="border-t border-white/15">
                    <th scope="row" className="py-5 pr-4 text-xl font-medium md:text-2xl">
                      {f}
                    </th>
                    <td className="bg-crimson/90 px-6 py-5 text-center text-2xl font-bold">{a}</td>
                    <td className={`px-6 py-5 text-center ${b === '✓' ? 'text-2xl' : 'text-white/50'}`}>{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="on-light bg-paper py-28 md:py-48">
        <div className="wrap">
          <p className="statement mx-auto max-w-5xl text-center text-ink" data-words>
            “By Youth, For Youth” is not a tagline. It’s a standard we hold ourselves to every single day.
          </p>
        </div>
      </section>

      <section className="on-dark bg-navy py-24 text-white md:py-40">
        <div className="wrap grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow className="mb-8 text-gold">Your first conference?</Eyebrow>
            <Lines className="display t-xl" lines={['No experience', 'required.', <span className="serif-it text-gold">Seriously.</span>]} />
          </div>
          <div className="prose lede text-white/80 md:col-span-6 md:col-start-7">
            <p data-fade>Many BDBC delegates sit down at their first committee having never attended a conference. Three days later they have spoken in front of a full room, defended a position they received that morning, and written a resolution with delegates from four countries.</p>
            <p data-fade>English is the working language. The rules of procedure take an afternoon to learn, chairs guide you through your first sessions, and every committee has a study guide that tells you exactly what to prepare.</p>
          </div>
        </div>
        <dl className="wrap mt-20 grid gap-x-12 md:grid-cols-2">
          {FIRST.map(([t, d]) => (
            <div key={t} className="rule py-10" data-fade>
              <dt className="display t-md">{t}</dt>
              <dd className="mt-5 max-w-xl leading-relaxed text-white/75">{d}</dd>
            </div>
          ))}
        </dl>
      </section>

      <ApplyBand label="Start with BDBC 2027" title={['Ready to experience', 'it for yourself?']} />
    </>
  )
}
