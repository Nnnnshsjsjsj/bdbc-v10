import { useState } from 'react'
import Placard from '../components/Placard'
import { Link } from '../lib/router'
import { COMMITTEES, EVENT, FORM_OPTIONS } from '../lib/data'
import { CAN_SUBMIT, postForm } from '../lib/forms'
import { useDocumentTitle, useSeat } from '../lib/util'
import { Field } from './Contact'

const EMPTY = {
  dateOfBirth: '',
  fullName: '',
  email: '',
  phone: '',
  countryCity: '',
  socialMedia: '',
  educationLevel: '',
  educationOther: '',
  institution: '',
  experience: '',
  committee1: '',
  committee2: '',
  committee3: '',
  countries1: '',
  countries2: '',
  countries3: '',
  dietary: '',
  dietaryOther: '',
  motivation: '',
  paymentMethod: '',
}

export default function Apply() {
  useDocumentTitle('Apply')
  const { seat } = useSeat()
  const pre = COMMITTEES.find((c) => c.id === seat)
  const [f, setF] = useState(() => ({ ...EMPTY, committee1: pre?.formValue || '' }))
  const [state, setState] = useState('idle')
  const set = (e) => setF((v) => ({ ...v, [e.target.name]: e.target.value }))

  const placardCommittee = COMMITTEES.find((c) => c.formValue === f.committee1)?.placard
  const placardCountry = f.countries1.split(/[,;\n]/)[0]?.trim() || null

  const submit = async (e) => {
    e.preventDefault()
    // Payload identical to bdbc-v9, so the Apps Script and Sheet need no changes.
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
    try {
      await postForm(payload)
      setState('done')
      window.scrollTo(0, 0)
    } catch (err) {
      setState(err.message === 'preview' ? 'preview' : 'done')
    }
  }

  if (state === 'done') {
    return (
      <section className="on-ink min-h-[80vh] bg-ink text-white">
        <div className="mx-auto grid max-w-[90rem] items-center gap-14 px-5 pb-24 pt-36 sm:px-8 md:grid-cols-2">
          <div role="status">
            <h1 className="font-display t-1">Application received.</h1>
            <p className="t-lede mt-6 max-w-lg text-white/80">
              We have sent an email to {f.email}. If you chose bank transfer, it has the payment instructions. If it is not in your inbox within ten minutes, check your spam folder.
            </p>
            <Link to="/committees" className="link mt-8 inline-block text-white">
              Read about your committees while you wait
            </Link>
          </div>
          <div className="flex justify-center">
            <Placard className="w-[min(80vw,24rem)]" committee={placardCommittee} country={placardCountry} name={f.fullName} />
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <header className="on-ink bg-ink text-white">
        <div className="mx-auto max-w-[90rem] px-5 pb-14 pt-36 sm:px-8">
          <h1 className="font-display t-1">Claim your seat.</h1>
          <p className="t-lede mt-6 max-w-2xl text-white/80">
            Fill in the application and choose how to pay. Prepaying €{EVENT.feeTransfer} by bank transfer saves you €{EVENT.feeCash - EVENT.feeTransfer} and confirms your seat. Paying €{EVENT.feeCash} in cash on the first day does not guarantee a seat until you pay.
          </p>
        </div>
      </header>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-[90rem] gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_24rem]">
          <form onSubmit={submit} className="max-w-2xl space-y-12">
            <fieldset className="space-y-6">
              <legend className="font-display t-2 mb-2 text-ink">About you</legend>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Full legal name" name="fullName" value={f.fullName} onChange={set} placeholder="As written in your documents" autoComplete="name" />
                <Field label="Date of birth" name="dateOfBirth" type="date" value={f.dateOfBirth} onChange={set} autoComplete="bday" />
              </div>
              <Field
                label="Email"
                name="email"
                type="email"
                value={f.email}
                onChange={set}
                autoComplete="email"
                placeholder="your@email.com"
                hint="Use a personal address, not a school one. School mail servers often block our messages, including payment instructions and confirmations."
              />
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Phone number" name="phone" type="tel" value={f.phone} onChange={set} autoComplete="tel" placeholder="+381 ..." />
                <Field label="Country and city of residence" name="countryCity" value={f.countryCity} onChange={set} placeholder="e.g. Serbia, Belgrade" />
              </div>
              <Field label="Social media accounts" name="socialMedia" value={f.socialMedia} onChange={set} placeholder="@yourhandle on Instagram, TikTok, X..." />
            </fieldset>

            <fieldset className="space-y-6">
              <legend className="font-display t-2 mb-2 text-ink">School or work</legend>
              <Radios label="Current level of education" name="educationLevel" options={FORM_OPTIONS.education} value={f.educationLevel} onChange={set} />
              {f.educationLevel === 'Other' && <Field label="Please describe" name="educationOther" value={f.educationOther} onChange={set} />}
              <Field label="Current school, university or employer" name="institution" value={f.institution} onChange={set} />
              <label className="block">
                <span className="font-semibold text-ink">Past MUN or business experience and awards</span>
                <span className="mt-1 block text-sm text-muted">Include the conference, year, committee and country. Write “None” if this is your first.</span>
                <textarea name="experience" required rows={4} value={f.experience} onChange={set} className="field mt-2" />
              </label>
            </fieldset>

            <fieldset className="space-y-6">
              <legend className="font-display t-2 mb-2 text-ink">Committees and countries</legend>
              <p className="text-muted">
                Not sure which committee fits you?{' '}
                <Link to="/committees" className="link text-ink">
                  Read the committee guide
                </Link>
                .
              </p>
              {[1, 2, 3].map((n) => (
                <div key={n} className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="font-semibold text-ink">{['First', 'Second', 'Third'][n - 1]} committee choice</span>
                    <select name={`committee${n}`} required value={f[`committee${n}`]} onChange={set} className="field mt-2">
                      <option value="">Choose a committee</option>
                      {COMMITTEES.map((c) => {
                        const taken = [1, 2, 3].some((m) => m !== n && f[`committee${m}`] === c.formValue)
                        return (
                          <option key={c.id} value={c.formValue} disabled={taken}>
                            {c.name}
                          </option>
                        )
                      })}
                    </select>
                  </label>
                  <Field label={`Five preferred countries for choice ${n}`} name={`countries${n}`} value={f[`countries${n}`]} onChange={set} placeholder="Japan, Brazil, ..." />
                </div>
              ))}
            </fieldset>

            <fieldset className="space-y-6">
              <legend className="font-display t-2 mb-2 text-ink">The conference</legend>
              <Radios label="Dietary restrictions" name="dietary" options={FORM_OPTIONS.dietary} value={f.dietary} onChange={set} />
              {f.dietary === 'Other' && <Field label="Please describe" name="dietaryOther" value={f.dietaryOther} onChange={set} />}
              <label className="block">
                <span className="font-semibold text-ink">Why do you want to take part in BDBC?</span>
                <span className="mt-1 block text-sm text-muted">Optional.</span>
                <textarea name="motivation" rows={4} value={f.motivation} onChange={set} className="field mt-2" />
              </label>
            </fieldset>

            <fieldset>
              <legend className="font-display t-2 mb-5 text-ink">Payment</legend>
              <div className="grid gap-3">
                {FORM_OPTIONS.payment.map((p) => (
                  <label key={p.value} className={`flex cursor-pointer gap-4 border p-5 ${f.paymentMethod === p.value ? 'border-ink bg-white' : 'border-ink/20 hover:border-ink/50'}`}>
                    <input type="radio" name="paymentMethod" value={p.value} required checked={f.paymentMethod === p.value} onChange={set} className="mt-1 h-4 w-4 accent-[var(--color-navy)]" />
                    <span>
                      <span className="block font-semibold text-ink">{p.label}</span>
                      <span className="mt-1 block text-sm text-muted">{p.note}</span>
                    </span>
                  </label>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted">Applications close 7 days before the conference. The exact deadline will be announced.</p>
            </fieldset>

            <div className="border-t-2 border-ink pt-8">
              <p className="mb-6 text-sm text-muted">
                By applying you agree to the{' '}
                <Link to="/terms" className="link text-ink">
                  terms
                </Link>{' '}
                and confirm you have read how we use your data in the{' '}
                <Link to="/privacy" className="link text-ink">
                  privacy notice
                </Link>
                .
              </p>
              <button className="btn btn-apply text-lg" disabled={state === 'submitting'}>
                {state === 'submitting' ? 'Sending application…' : 'Send application'}
              </button>
              {state === 'preview' && (
                <p role="status" className="mt-4 text-crimson">
                  This is the preview build, so the application was not sent. On bdbconference.com it goes to the same Google Sheet as before.
                </p>
              )}
              {!CAN_SUBMIT && state !== 'preview' && <p className="mt-4 text-sm text-muted">Preview build: sending is switched off.</p>}
            </div>
          </form>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-5 text-sm text-muted">Your placard fills in as you go.</p>
              <Placard committee={placardCommittee} country={placardCountry} name={f.fullName || null} tilt={false} />
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

function Radios({ label, name, options, value, onChange }) {
  return (
    <fieldset>
      <legend className="font-semibold text-ink">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className={`cursor-pointer rounded-[var(--radius-ui)] border px-4 py-2 text-[0.95rem] ${value === o ? 'border-ink bg-ink text-white' : 'border-ink/25 hover:border-ink'}`}>
            <input type="radio" name={name} value={o} required checked={value === o} onChange={onChange} className="sr-only" />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
