import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import { EVENT } from '../lib/data'
import { CAN_SUBMIT, postForm } from '../lib/forms'
import { useDocumentTitle } from '../lib/util'

export default function Contact() {
  useDocumentTitle('Contact')
  const [f, setF] = useState({ name: '', email: '', message: '' })
  const [state, setState] = useState('idle')
  const set = (e) => setF((v) => ({ ...v, [e.target.name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setState('sending')
    try {
      await postForm({ formType: 'contact', ...f })
      setState('sent')
    } catch (err) {
      setState(err.message === 'preview' ? 'preview' : 'sent')
    }
  }

  return (
    <>
      <PageHeader title="Write to the organisers." intro="For delegates, schools, partners and anyone curious about BDBC 2027." />
      <section className="bg-paper">
        <div className="mx-auto grid max-w-[90rem] gap-16 px-5 py-20 sm:px-8 md:grid-cols-[1fr_1.4fr]">
          <dl className="space-y-8">
            <div>
              <dt className="text-sm font-semibold text-muted">Email</dt>
              <dd className="t-3 mt-1">
                <a className="link text-ink" href={`mailto:${EVENT.email}`}>
                  {EVENT.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-muted">Instagram</dt>
              <dd className="t-3 mt-1">
                <a className="link text-ink" href={EVENT.instagram} target="_blank" rel="noreferrer">
                  {EVENT.handle}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-muted">TikTok</dt>
              <dd className="t-3 mt-1">
                <a className="link text-ink" href={EVENT.tiktok} target="_blank" rel="noreferrer">
                  {EVENT.handle}
                </a>
              </dd>
            </div>
          </dl>

          {state === 'sent' ? (
            <div role="status" className="border-l-4 border-ink pl-6">
              <p className="t-2 font-display text-ink">Message sent.</p>
              <p className="mt-3 text-muted">We will reply to {f.email}.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-6">
              <Field label="Name" name="name" value={f.name} onChange={set} autoComplete="name" />
              <Field label="Email" name="email" type="email" value={f.email} onChange={set} autoComplete="email" />
              <label className="block">
                <span className="font-semibold text-ink">Message</span>
                <textarea name="message" required rows={6} value={f.message} onChange={set} className="field mt-2" />
              </label>
              <button className="btn btn-apply" disabled={state === 'sending'}>
                {state === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              {state === 'preview' && <p role="status" className="text-sm text-crimson">This is the preview build, so nothing was sent. On bdbconference.com this form sends to the organisers.</p>}
              {!CAN_SUBMIT && state !== 'preview' && <p className="text-sm text-muted">Preview build: sending is switched off.</p>}
            </form>
          )}
        </div>
      </section>
    </>
  )
}

export function Field({ label, hint, className = '', ...p }) {
  return (
    <label className={`block ${className}`}>
      <span className="font-semibold text-ink">{label}</span>
      {hint && <span className="mt-1 block text-sm text-muted">{hint}</span>}
      <input required className="field mt-2" {...p} />
    </label>
  )
}
