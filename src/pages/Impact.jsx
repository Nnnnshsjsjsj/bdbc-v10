import PageHeader from '../components/PageHeader'
import { Link } from '../lib/router'
import { img, useDocumentTitle } from '../lib/util'

export default function Impact() {
  useDocumentTitle('Impact')
  return (
    <>
      <PageHeader
        title="Real help for real people."
        intro="Every delegate fee, every delegate present and every session held creates a ripple that reaches the communities that need it most."
        image={img('impact/donation-sorting')}
      />

      <article className="bg-paper">
        <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[1fr_22rem]">
          <div className="prose-serif measure-serif">
            <h2 className="font-display t-2 mb-8 text-ink">A scholarship through the Ana and Vlade Divac Foundation</h2>
            <p>At Belgrade Diplomacy &amp; Business Conference (BDBC), we believe that education has the power to transform lives. Guided by our motto, “By Youth, For Youth,” we wanted our impact to extend beyond the conference itself.</p>
            <p>That is why we donated 100% of the conference proceeds to the Ana and Vlade Divac Foundation, funding a scholarship for a child in need whose financial circumstances make access to education more difficult. Through this contribution, we hope to help create opportunities for a young person to pursue their education and future aspirations.</p>
            <p>Supporting educational access is a natural extension of our mission and a reminder that leadership is measured not only by what we achieve, but also by the opportunities we create for others.</p>
            <p>We are deeply grateful to every participant, partner, and supporter who made this initiative possible. By attending BDBC, you became part of a collective effort to invest in another young person’s future, living our vision of By Youth, For Youth.</p>
          </div>
          <aside className="space-y-6 text-sm">
            <img src={img('partners/foundation_ana_i_vlade_')} alt="Ana and Vlade Divac Foundation" className="w-48 mix-blend-multiply" />
            <p className="text-muted">Read more</p>
            <ul className="space-y-2">
              <li>
                <a className="link text-ink" href="https://www.divac.com/Vesti/3861/Mladi-za-mlade-Prihod-sa-konferencije-Belgrade.shtml" target="_blank" rel="noreferrer">
                  The Foundation’s article, “Mladi za mlade”
                </a>
              </li>
              <li>
                <a className="link text-ink" href="https://www.instagram.com/p/DY18OC4sqyp/" target="_blank" rel="noreferrer">
                  Partnership announcement on Instagram
                </a>
              </li>
              <li>
                <a className="link text-ink" href="https://www.instagram.com/p/DZIN1dWCtYM/" target="_blank" rel="noreferrer">
                  The Foundation’s post on Instagram
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </article>

      <section className="on-ink bg-ink text-white">
        <div className="mx-auto grid max-w-[90rem] items-end gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:py-28">
          <div>
            <p className="font-display text-[clamp(5rem,3rem+8vw,11rem)] leading-none">
              300<span className="text-[0.4em]"> kg</span>
            </p>
            <p className="t-lede mt-4 max-w-md text-white/80">of surplus food, approximately, donated to the Centre for the Protection of Infants, Children and Youth “Zvečanska” in Belgrade.</p>
          </div>
          <img src={img('impact/donation-boxes')} alt="Organisers carrying boxes of donated food" className="aspect-[4/5] w-full max-w-md object-cover md:justify-self-end" loading="lazy" />
        </div>
      </section>

      <article className="bg-paper">
        <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[1fr_22rem]">
          <div className="prose-serif measure-serif">
            <h2 className="font-display t-2 mb-8 text-ink">Helping those who need it the most</h2>
            <p>Creating a successful conference also means taking responsibility for what remains after it ends. At BDBC, we believe that even the smallest actions can have a meaningful impact, especially when they help children who need it most.</p>
            <p>Following the conference, we donated approximately 300 kilograms of surplus food to the Centre for the Protection of Infants, Children and Youth “Zvečanska” in Belgrade. Instead of allowing quality food to go to waste, we chose to ensure it reached children and young people who rely on the Centre’s care and support every day.</p>
            <p>For us, social responsibility is an essential part of what BDBC stands for. We believe that a conference dedicated to shaping future leaders should also inspire compassion, solidarity, and a commitment to giving back.</p>
            <p>We hope this contribution brought not only practical support, but also a reminder that a community is strongest when it cares for its youngest members.</p>
          </div>
          <figure>
            <img src={img('impact/zahvalnica')} alt="Certificate of appreciation awarded to BDBC" className="w-full border border-ink/10" loading="lazy" />
            <figcaption className="mt-3 text-sm text-muted">Certificate of appreciation, awarded to BDBC for its contribution to the “Družimo se i učimo zajedno” programme for children without parental care.</figcaption>
          </figure>
        </div>
      </article>

      <section className="bg-paper-2">
        <div className="mx-auto flex max-w-[90rem] flex-wrap items-center justify-between gap-6 px-5 py-16 sm:px-8">
          <p className="t-3 max-w-xl text-ink">When you apply to BDBC, your fee joins this work.</p>
          <Link to="/apply" className="btn btn-apply">
            Apply for BDBC 2027
          </Link>
        </div>
      </section>
    </>
  )
}
