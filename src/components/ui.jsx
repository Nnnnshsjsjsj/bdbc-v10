import { Link, useRoute } from '../lib/router'
import { pageColour } from '../lib/data'
import { img } from '../lib/util'

// Heading whose lines rise into place. Each entry of `lines` is one line; an
// entry may be a string or JSX.
export function Lines({ as: Tag = 'h2', lines, className = '', delay, ...rest }) {
  return (
    <Tag className={className} data-lines data-delay={delay} {...rest}>
      {lines.map((l, i) => (
        <span className="ln" key={i}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  )
}

export function Eyebrow({ children, className = '' }) {
  return (
    <p className={`label flex items-center gap-3 ${className}`} data-fade>
      <span className="inline-block h-px w-8 bg-current opacity-60" />
      {children}
    </p>
  )
}

export function Photo({ src, size, alt = '', className = '', imgClass = '', parallax, delay, cursor }) {
  return (
    <div className={`overflow-hidden ${className}`} data-img data-delay={delay} data-cursor={cursor}>
      <img src={img(src, size)} alt={alt} loading="lazy" data-parallax={parallax} className={`h-full w-full object-cover ${parallax ? 'scale-[1.2]' : ''} ${imgClass}`} />
    </div>
  )
}

export function Btn({ to, children, kind = 'red', className = '', ...rest }) {
  const cls = `btn ${kind === 'red' ? 'btn-red' : 'btn-line'} ${className}`
  const inner = (
    <>
      <span>{children}</span>
      <span className="dot" aria-hidden="true" />
    </>
  )
  return to ? (
    <Link to={to} className={cls} {...rest}>
      {inner}
    </Link>
  ) : (
    <button className={cls} {...rest}>
      {inner}
    </button>
  )
}

// Hero used by every inner page: a block of the page's own colour beside a
// full-brightness photo.
export function PageHero({ eyebrow, lines, intro, image, children }) {
  const { path } = useRoute()
  const { bg, fg } = pageColour(path)
  return (
    <header className={`relative isolate grid lg:min-h-[92svh] lg:grid-cols-12 ${fg === '#ffffff' ? 'on-dark' : 'on-light'}`} style={{ background: bg, color: fg }}>
      <div className="flex flex-col justify-end px-[clamp(1.1rem,3.2vw,3.2rem)] pb-14 pt-36 lg:col-span-7 lg:pb-20">
        {eyebrow && <Eyebrow className="mb-8 opacity-80">{eyebrow}</Eyebrow>}
        <Lines as="h1" className="display t-xl" lines={lines} />
        {intro && (
          <p className="lede mt-10 max-w-2xl opacity-85" data-fade data-delay="0.25">
            {intro}
          </p>
        )}
        {children}
      </div>
      {image && (
        <div className="relative h-[60vh] overflow-hidden lg:col-span-5 lg:h-auto" data-img>
          <img src={img(image)} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      )}
    </header>
  )
}

// Closing call to action, with the page's own original wording.
export function ApplyBand({ title, text, cta = 'Apply Now', label }) {
  return (
    <section className="on-dark relative overflow-hidden bg-crimson text-white">
      <div className="wrap grid gap-10 py-24 md:grid-cols-[1.6fr_1fr] md:items-end md:py-36">
        <div>
          {label && <Eyebrow className="mb-8">{label}</Eyebrow>}
          <Lines className="display t-lg" lines={Array.isArray(title) ? title : [title]} />
          {text && (
            <p className="lede mt-8 max-w-2xl text-white/85" data-fade>
              {text}
            </p>
          )}
        </div>
        <div className="md:justify-self-end" data-fade>
          <Link to="/apply" className="btn bg-white text-crimson before:bg-ink hover:text-white" data-cursor="Apply">
            <span>{cta}</span>
            <span className="dot" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function Marquee({ children, dur = 40, className = '' }) {
  return (
    <div className={`marquee ${className}`} style={{ '--dur': `${dur}s` }}>
      <div>{children}</div>
      <div aria-hidden="true">{children}</div>
    </div>
  )
}
