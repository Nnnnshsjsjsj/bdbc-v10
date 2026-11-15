import { ApplyBand, Eyebrow, Lines, PageHero, Photo } from '../components/ui'
import { img, useTitle } from '../lib/util'

const A = ({ href, children }) => (
  <a className="ulink text-ink" href={href} target="_blank" rel="noreferrer">
    {children}
  </a>
)

export default function Impact() {
  useTitle('Impact')
  return (
    <>
      <PageHero eyebrow="Humanitarian impact" lines={['More Than Words.', 'Real Help.', 'Real People.']} image="impact/donation-sorting" />

      <section className="on-light bg-paper py-24 md:py-40">
        <div className="wrap grid gap-10 md:grid-cols-12">
          <p className="statement text-ink md:col-span-10" data-words>
            BDBC was founded on the conviction that youth leadership isn’t just about debate halls and certificates — it’s about making a measurable difference in the world around us.
          </p>
          <p className="lede text-muted md:col-span-6 md:col-start-7" data-fade>
            Every delegate fee, every delegate present, every session held — creates a ripple that reaches communities that need it the most.
          </p>
        </div>
      </section>

      <section className="on-dark bg-emerald py-24 text-white md:py-40">
        <div className="wrap grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow className="mb-8 text-sun">Humanitarian partnership</Eyebrow>
            <Lines className="display t-lg" lines={['Ana and Vlade', 'Divac', 'Foundation']} />
            <p className="display mt-14 text-[clamp(6rem,15vw,14rem)] leading-[0.78] text-sun">
              <span data-count="100">100</span>%
            </p>
            <p className="label mt-4 text-white/60">of the conference proceeds donated</p>
            <div className="mt-12 inline-block bg-white p-5" data-fade>
              <img src={img('partners/foundation_ana_i_vlade_')} alt="Ana and Vlade Divac Foundation" className="w-44" />
            </div>
          </div>
          <div className="prose lede text-white/90 md:col-span-6 md:col-start-7">
            <p data-fade>At Belgrade Diplomacy &amp; Business Conference (BDBC), we believe that education has the power to transform lives. Guided by our motto, “By Youth, For Youth,” we wanted our impact to extend beyond the conference itself.</p>
            <p data-fade>That is why we donated 100% of the conference proceeds to the Ana and Vlade Divac Foundation, funding a scholarship for a child in need whose financial circumstances make access to education more difficult. Through this contribution, we hope to help create opportunities for a young person to pursue their education and future aspirations.</p>
            <p data-fade>Supporting educational access is a natural extension of our mission and a reminder that leadership is measured not only by what we achieve, but also by the opportunities we create for others.</p>
            <p data-fade>We are deeply grateful to every participant, partner, and supporter who made this initiative possible. By attending BDBC, you became part of a collective effort to invest in another young person’s future — living our vision of By Youth, For Youth.</p>
            <ul className="mt-10 space-y-3 text-base [&_a]:text-white" data-fade>
              <li>
                <A href="https://www.divac.com/Vesti/3861/Mladi-za-mlade-Prihod-sa-konferencije-Belgrade.shtml">The Foundation’s article: “Mladi za mlade” →</A>
              </li>
              <li>
                <A href="https://www.instagram.com/p/DY18OC4sqyp/">Instagram: partnership announcement →</A>
              </li>
              <li>
                <A href="https://www.instagram.com/p/DZIN1dWCtYM/">Instagram: the Foundation’s post →</A>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="on-light bg-paper py-24 md:py-40">
        <div className="wrap grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="display text-[clamp(7rem,19vw,18rem)] leading-[0.76] text-ink">
              <span data-count="300">300</span>
            </p>
            <p className="display t-md mt-2 text-crimson">kilograms</p>
            <p className="lede mt-3 text-muted">of surplus food donated (approx.)</p>
            <div className="rule mt-10 border-ink/20 pt-6" data-fade>
              <p className="label text-crimson">Donated to Zvečanska</p>
              <p className="mt-2 text-lg text-ink">
                Center for the Protection of Infants,
                <br />
                Children and Youth
              </p>
              <img src={img('impact/zvecanska-logo')} alt="Zvečanska centre" className="mt-6 w-40 mix-blend-multiply" />
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Eyebrow className="mb-8 text-crimson">Food donation initiative</Eyebrow>
            <Lines className="display t-lg text-ink" lines={['Helping Those', 'Who Need It', 'the Most']} />
            <div className="prose lede mt-10 text-text/85">
              <p data-fade>Creating a successful conference also means taking responsibility for what remains after it ends. At Belgrade Diplomacy &amp; Business Conference (BDBC), we believe that even the smallest actions can have a meaningful impact — especially when they help children who need it most.</p>
              <p data-fade>Following the conference, we donated approximately 300 kilograms of surplus food to the Centre for the Protection of Infants, Children and Youth “Zvečanska” in Belgrade. Instead of allowing quality food to go to waste, we chose to ensure it reached children and young people who rely on the Centre’s care and support every day.</p>
              <p data-fade>For us, social responsibility is not an afterthought — it is an essential part of what BDBC stands for. We believe that a conference dedicated to shaping future leaders should also inspire compassion, solidarity, and a commitment to giving back. Supporting vulnerable children is one way we can turn our values into meaningful action.</p>
              <p data-fade>We hope this contribution brought not only practical support, but also a reminder that a community is strongest when it cares for its youngest members. Together with our participants, partners, and supporters, we are proud to create an impact that extends far beyond the conference itself.</p>
            </div>
          </div>
        </div>
        <div className="wrap mt-24 grid grid-cols-12 gap-4 md:gap-8">
          <figure className="col-span-12 md:col-span-6">
            <Photo src="impact/donation-sorting" alt="Boxes of donated food" className="aspect-[4/3]" parallax="6" />
            <figcaption className="label mt-4 text-muted">From the Donation</figcaption>
          </figure>
          <figure className="col-span-6 md:col-span-3 md:mt-24">
            <Photo src="impact/donation-boxes" alt="Organisers sorting the donation" className="aspect-[3/4]" parallax="8" delay="0.1" />
            <figcaption className="label mt-4 text-muted">From the Donation</figcaption>
          </figure>
          <figure className="col-span-6 md:col-span-3">
            <Photo src="impact/zahvalnica" alt="Certificate of appreciation" className="aspect-[3/4]" delay="0.2" />
            <figcaption className="mt-4 text-sm text-muted">
              <span className="label block text-crimson">Certificate of Appreciation</span>
              Awarded to BDBC for its contribution to the “Družimo se i učimo zajedno” programme for children without parental care
            </figcaption>
          </figure>
        </div>
      </section>

      <ApplyBand
        title={['Every delegate', 'contributes to', 'something larger.']}
        text="When you apply to BDBC, you’re not just joining a conference — you’re joining a movement that believes youth are the most powerful force for change in the world."
        cta="Apply & Make an Impact"
      />
    </>
  )
}
