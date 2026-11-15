import { useState } from 'react'
import { Btn, Lines, PageHero } from '../components/ui'
import { EVENT } from '../lib/data'
import { CAN_SUBMIT, postForm } from '../lib/forms'
import { useTitle } from '../lib/util'

export function Field({ label, hint, required = true, className = '', ...p }) {
  return (
    <label className={`block ${className}`}>
      <span className="label text-muted">
        {label} {required && <span className="text-crimson">*</span>}
      </span>
      <input required={required} className="field mt-1" {...p} />
      {hint && <span className="mt-2 block text-sm text-crimson">{hint}</span>}
    </label>
  )
}

export default function Contact() {
  useTitle('Contact')
  const [f, setF] = useState({ name: '', email: '', message: '' })
  const [state, setState] = useState('idle')
  const set = (e) => setF((v) => ({ ...v, [e.target.name]: e.target.value }))
  const submit = async (e) => {
    e.preventDefault()
    setState('sending')
    try {
      await postForm({ formType: 'contact', name: f.name, email: f.email, message: f.message })
      setState('sent')
    } catch (err) {
      setState(err.message === 'preview' ? 'preview' : 'sent')
    }
  }
  return (
    <>
      <PageHero eyebrow="Contact" lines={['Get in Touch']} image="gallery/2026/networking" intro="Whether you’re a prospective delegate, potential partner, or just curious — we’d love to hear from you." />
      <section className="on-light bg-paper py-24 md:py-36">
        <div className="wrap grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Lines className="display t-md text-ink" lines={['Reach Us Directly']} />
            <dl className="mt-10">
              {[
                ['Email', EVENT.email, `mailto:${EVENT.email}`],
                ['Instagram', EVENT.handle, EVENT.instagram],
                ['TikTok', EVENT.handle, EVENT.tiktok],
              ].map(([k, v, h]) => (
                <div key={k} className="rule border-ink/20 py-6" data-fade>
                  <dt className="label text-crimson">{k}</dt>
                  <dd className="mt-2 text-2xl font-bold text-ink md:text-3xl">
                    <a className="ulink" href={h} target={h.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                      {v}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3" data-fade>
              <a className="btn btn-line text-ink" href={EVENT.instagram} target="_blank" rel="noreferrer">
                <span>Follow on Instagram</span>
              </a>
              <a className="btn btn-line text-ink" href={EVENT.tiktok} target="_blank" rel="noreferrer">
                <span>Follow on TikTok</span>
              </a>
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            {state === 'sent' ? (
              <div role="status">
                <p className="display t-lg text-ink">Message Sent!</p>
                <p className="lede mt-6 text-muted">We’ll get back to you at {f.email} as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-10">
                <Lines className="display t-md text-ink" lines={['Send a Message']} />
                <Field label="Name" name="name" value={f.name} onChange={set} autoComplete="name" />
                <Field label="Email" name="email" type="email" value={f.email} onChange={set} autoComplete="email" />
                <label className="block">
                  <span className="label text-muted">
                    Message <span className="text-crimson">*</span>
                  </span>
                  <textarea name="message" required rows={5} value={f.message} onChange={set} className="field mt-1" />
                </label>
                <Btn disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send Message'}</Btn>
                {state === 'preview' && <p role="status" className="text-crimson">This is the review build, so nothing was sent. On bdbconference.com this form reaches the organisers.</p>}
                {!CAN_SUBMIT && state !== 'preview' && <p className="text-sm text-muted">Review build: sending is switched off.</p>}
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
