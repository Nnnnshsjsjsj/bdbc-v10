import { useRef, useState } from 'react'
import Badge from '../components/Badge'
import { Btn, Eyebrow, Lines } from '../components/ui'
import { Link } from '../lib/router'
import { COMMITTEES, FORM_OPTIONS } from '../lib/data'
import { CAN_SUBMIT, postForm } from '../lib/forms'
import { useSeat, useTitle } from '../lib/util'
import { COMMITTEE_PICK, DIETARY, FIELD, PAYMENT, PROGRESS, SUBMITTED } from '../lib/mirLines'
import { Field } from './Contact'

const EMPTY = { dateOfBirth: '', fullName: '', email: '', phone: '', countryCity: '', socialMedia: '', educationLevel: '', educationOther: '', institution: '', experience: '', committee1: '', committee2: '', committee3: '', countries1: '', countries2: '', countries3: '', dietary: '', dietaryOther: '', motivation: '', paymentMethod: '' }
const ORD = ['1st', '2nd', '3rd']
const dove = (detail) => window.dispatchEvent(new CustomEvent('dove', { detail: typeof detail === 'string' ? { move: detail } : detail }))

export default function Apply() {
  useTitle('Apply')
  const { seat } = useSeat()
  const pre = COMMITTEES.find((c) => c.id === seat)
  const [f, setF] = useState(() => ({ ...EMPTY, committee1: pre?.formValue || '' }))
  const [state, setState] = useState('idle')
  const set = (e) => {
    const { name, value, type } = e.target
    setF((v) => ({ ...v, [name]: value }))
    // the dove reacts to the application: a spin for committees, a hop for other choices
    if (type !== 'radio') return
    if (name.startsWith('committee')) dove({ move: 'spin', say: COMMITTEE_PICK[value] })
    else if (name === 'paymentMethod') dove({ move: 'dance', say: value.startsWith('Bank') ? PAYMENT.bank : PAYMENT.cash })
    else if (name === 'dietary') dove({ move: 'hop', say: DIETARY[value] })
    else dove({ move: 'hop' })
  }
  // a hop each time a text answer is completed
  const answered = useRef(new Set())
  const done = (e) => {
    const el = e.target
    if (!['INPUT', 'TEXTAREA'].includes(el.tagName) || el.type === 'radio' || !el.value.trim() || answered.current.has(el.name)) return
    answered.current.add(el.name)
    const n = answered.current.size
    dove({ move: 'hop', say: PROGRESS[n] })
  }
  // a comment the first time each field is opened
  const seen = useRef(new Set())
  const focus = (e) => {
    const n = e.target.name
    if (!FIELD[n] || seen.current.has(n)) return
    seen.current.add(n)
    dove({ say: FIELD[n] })
  }
  const country = f.countries1.split(/[,;\n]/)[0]?.trim()

  const submit = async (e) => {
    e.preventDefault()
    // Same payload as bdbc-v9, so the Apps Script and the Sheet need no changes.
    const payload = {
      formType: 'application',
      dateOfBirth: f.dateOfBirth,
      fullName: f.fullName,
      email: f.email,
      phone: f.phone,
      countryCity: f.countryCity,
      socialMedia: f.socialMedia,
      educationLevel: f.educationLevel === 'Other' ? `Other: ${f.educationOther}`.trim() : f.educationLevel,
      institution: f.institution,
      experience: f.experience,
      committee1: f.committee1,
      committee2: f.committee2,
      committee3: f.committee3,
      countries1: f.countries1,
      countries2: f.countries2,
      countries3: f.countries3,
      dietary: f.dietary === 'Other' ? `Other: ${f.dietaryOther}`.trim() : f.dietary,
      motivation: f.motivation,
      paymentMethod: f.paymentMethod,
    }
    setState('submitting')
    dove({ move: 'celebrate', say: SUBMITTED, ms: 6500 })
    try {
      await postForm(payload)
      setState('done')
      window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0)
    } catch (err) {
      setState(err.message === 'preview' ? 'preview' : 'done')
    }
  }

  if (state === 'done') {
    return (
      <section className="on-dark min-h-screen bg-ink text-white">
        <div className="wrap grid min-h-screen items-center gap-14 py-40 md:grid-cols-2">
          <div role="status">
            <h1 className="display t-xl">Application received.</h1>
            <p className="lede mt-8 max-w-lg text-white/80">We have sent an email to {f.email}. If you chose bank transfer, it contains the payment instructions. Check your spam folder if it has not arrived within ten minutes.</p>
          </div>
          <Badge name={f.fullName} country={country || 'Your Country Awaits'} />
        </div>
      </section>
    )
  }

  return (
    <>
      <header className="on-dark relative overflow-hidden bg-ink text-white">
        <div className="wrap grid items-end gap-10 pb-16 pt-40 md:grid-cols-12 md:pb-20">
          <div className="md:col-span-8">
            <Eyebrow className="mb-8 text-gold">Apply to BDBC</Eyebrow>
            <Lines as="h1" className="display t-mega" lines={['Claim', 'Your Seat.']} />
            <p className="lede mt-8 max-w-xl text-white/80" data-fade>
              Complete the application below and confirm your place with payment. Spots are limited.
            </p>
          </div>
        </div>
        <div className="bg-crimson">
          <div className="wrap py-6 text-center">
            <p className="text-lg font-semibold">
              Secure your spot for <span className="display text-2xl">€45</span> — the prepay price. €50 in cash at the conference.
            </p>
            <p className="mt-1 text-sm text-white/85">Prepaying by bank transfer saves you €5 and confirms your seat. Instructions arrive by email after you apply.</p>
          </div>
        </div>
      </header>

      <section className="on-light bg-paper py-20 md:py-32">
        <div className="wrap grid gap-16 lg:grid-cols-12">
          <form onSubmit={submit} onBlur={done} onFocus={focus} className="space-y-12 lg:col-span-7">
            <div>
              <h2 className="display t-lg text-ink">Your Application</h2>
              <p className="mt-3 text-muted">
                Fields marked <span className="text-crimson">*</span> are required.
              </p>
            </div>

            <div className="grid gap-10 sm:grid-cols-2">
              <Field label="Date of Birth" name="dateOfBirth" type="date" value={f.dateOfBirth} onChange={set} />
              <Field label="Full Legal Name" name="fullName" value={f.fullName} onChange={set} placeholder="As written in your documents" autoComplete="name" />
              <Field
                label="Email"
                name="email"
                type="email"
                value={f.email}
                onChange={set}
                placeholder="your@email.com"
                autoComplete="email"
                hint="Important: use your personal email, not your school one — school mail servers often block our messages and you won’t receive any of our emails, including payment instructions and confirmations."
              />
              <Field label="Phone Number" name="phone" type="tel" value={f.phone} onChange={set} placeholder="+381 ..." autoComplete="tel" />
              <Field label="Country and City of Residence" name="countryCity" value={f.countryCity} onChange={set} placeholder="e.g. Serbia, Belgrade" />
              <Field label="Social Media Accounts @ (Instagram, Tiktok, X…)" name="socialMedia" value={f.socialMedia} onChange={set} placeholder="@yourhandle" />
            </div>

            <Chips label="Current Level of Education" name="educationLevel" options={FORM_OPTIONS.education} value={f.educationLevel} onChange={set} />
            {f.educationLevel === 'Other' && <Field label="Please specify" name="educationOther" value={f.educationOther} onChange={set} />}
            <Field label="Current Educational/Employment Institution" name="institution" value={f.institution} onChange={set} />
            <label className="block">
              <span className="label text-muted">
                Past MUN/Business Related Experience, Awards <span className="text-crimson">*</span>
              </span>
              <textarea name="experience" required rows={3} value={f.experience} onChange={set} className="field mt-1" />
              <span className="mt-2 block text-sm text-muted">Include: Conference, Year of the Conference, Committee, Country</span>
            </label>

            <p className="rule border-ink/20 pt-8 text-muted">
              Not sure which committee fits you?{' '}
              <Link to="/committees" className="ulink text-ink">
                Read the committee guide →
              </Link>
            </p>
            {[1, 2, 3].map((n) => (
              <Chips
                key={n}
                label={`${ORD[n - 1]} Committee Choice`}
                name={`committee${n}`}
                options={COMMITTEES.map((c) => c.formValue)}
                value={f[`committee${n}`]}
                onChange={set}
              />
            ))}
            {[1, 2, 3].map((n) => (
              <Field key={n} label={`5 Preferred Countries for ${ORD[n - 1]} Committee Choice`} name={`countries${n}`} value={f[`countries${n}`]} onChange={set} />
            ))}

            <Chips label="Dietary Restrictions" name="dietary" options={FORM_OPTIONS.dietary} value={f.dietary} onChange={set} />
            {f.dietary === 'Other' && <Field label="Please specify" name="dietaryOther" value={f.dietaryOther} onChange={set} />}
            <label className="block">
              <span className="label text-muted">Why Do You Wish to Participate at Belgrade Diplomacy &amp; Business Conference?</span>
              <textarea name="motivation" rows={4} value={f.motivation} onChange={set} className="field mt-1" />
            </label>

            <fieldset>
              <legend className="label text-muted">
                How would you like to pay the participation fee? <span className="text-crimson">*</span>
              </legend>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  ['Bank transfer (€45)', 'Bank transfer — €45', 'Save €5', 'Instructions arrive automatically by email after you apply.'],
                  ['Cash at the conference (€50)', 'Cash at the conference — €50', null, 'Pay on the first day. Spot not guaranteed until payment.'],
                ].map(([value, title, tag, note]) => (
                  <label key={value} className={`relative block cursor-pointer border p-6 transition-colors duration-300 ${f.paymentMethod === value ? 'border-ink bg-ink text-white' : 'border-ink/25 hover:border-ink'}`}>
                    <input type="radio" name="paymentMethod" value={value} required checked={f.paymentMethod === value} onChange={set} className="sr-only" />
                    {tag && <span className="label absolute right-4 top-4 rounded-full bg-crimson px-3 py-1.5 text-[0.6rem] text-white">{tag}</span>}
                    <span className="block text-xl font-bold">{title}</span>
                    <span className={`mt-2 block text-sm ${f.paymentMethod === value ? 'text-white/70' : 'text-muted'}`}>{note}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <p className="mb-6 text-sm text-muted">
                By applying you agree to the{' '}
                <Link to="/terms" className="ulink text-ink">
                  terms
                </Link>{' '}
                and confirm you have read the{' '}
                <Link to="/privacy" className="ulink text-ink">
                  privacy notice
                </Link>
                .
              </p>
              <Btn disabled={state === 'submitting'} data-cursor="Send">
                {state === 'submitting' ? 'Submitting…' : 'Submit Application →'}
              </Btn>
              {state === 'preview' && (
                <p role="status" className="mt-5 text-crimson">
                  This is the review build, so the application was not sent. On bdbconference.com it goes to the same Google Sheet as before.
                </p>
              )}
              {!CAN_SUBMIT && state !== 'preview' && <p className="mt-5 text-sm text-muted">Review build: sending is switched off.</p>}
            </div>
          </form>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28">
              <div className="on-dark hidden bg-navy px-8 pb-12 pt-16 lg:block" data-dove-perch>
                <Badge swing={false} name={f.fullName || 'Your Name Here'} country={country || 'Your Country Awaits'} />
              </div>
              <div className="mt-10">
                <h2 className="display t-md text-ink">Conference Fee</h2>
                <p className="mt-4 text-muted">Prepay by bank transfer for €45 — paying in cash at the conference costs €50. After you apply, payment instructions arrive automatically by email.</p>
                <div className="mt-8 bg-ink p-7 text-white">
                  <p className="label flex justify-between text-gold">
                    <span>Recommended</span>
                    <span>Save €5</span>
                  </p>
                  <p className="label mt-6 text-white/60">Option A · Bank transfer</p>
                  <p className="display mt-2 text-7xl">€45</p>
                  <p className="mt-2 text-sm text-white/60">vs. €50 in cash at the conference</p>
                  <p className="mt-5 text-sm leading-relaxed text-white/80">Apply below — you’ll automatically receive an email with detailed bank transfer instructions. Your seat is confirmed once the transfer arrives.</p>
                </div>
                <div className="mt-4 border border-ink/25 p-7">
                  <p className="label text-muted">Option B · Cash</p>
                  <p className="display mt-2 text-7xl text-ink">€50</p>
                  <p className="mt-2 text-sm text-muted">€5 more than the prepay price</p>
                  <p className="mt-5 text-sm leading-relaxed text-text/80">Pay in cash on the first day of the conference — spot not guaranteed until payment.</p>
                </div>
                <p className="mt-6 text-sm text-muted">Applications close 7 days before the conference. Exact deadline to be announced.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

function Chips({ label, name, options, value, onChange }) {
  return (
    <fieldset>
      <legend className="label text-muted">
        {label} <span className="text-crimson">*</span>
      </legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="chip">
            <input type="radio" name={name} value={o} required checked={value === o} onChange={onChange} className="sr-only" />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
