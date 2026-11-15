import { useEffect, useRef, useState } from 'react'
import { PageHero } from '../components/ui'
import { GALLERY } from '../lib/data'
import { img, useTitle } from '../lib/util'

const FILTERS = [
  ['all', 'All Editions'],
  ['2025', 'GPMUN 2025'],
  ['2026', 'BDBC 2026'],
]
const GROUPS = [
  ['2026', 'BDBC 2026', null],
  ['2025', 'GPMUN 2025', '— Where it all began'],
]

export default function Gallery() {
  useTitle('Gallery')
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState(null)
  const dlg = useRef(null)
  const items = GALLERY.filter((g) => filter === 'all' || g.year === filter)

  useEffect(() => {
    const d = dlg.current
    if (open === null) d?.open && d.close()
    else if (!d.open) d.showModal()
  }, [open])
  useEffect(() => {
    if (open === null) return
    const on = (e) => {
      if (e.key === 'ArrowRight') setOpen((i) => (i + 1) % items.length)
      if (e.key === 'ArrowLeft') setOpen((i) => (i - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [open, items.length])

  const cur = open !== null ? items[open] : null
  return (
    <>
      <PageHero eyebrow="Gallery" lines={['Two Editions.', 'One Growing', 'Legacy.']} image="gallery/2025/flag-tradition" intro="From opening ceremonies to closing galas — captured moments from GPMUN 2025 and BDBC 2026." />
      <section className="on-light bg-paper py-16 md:py-24">
        <div className="wrap">
          <div role="group" aria-label="Filter by edition" className="flex flex-wrap items-center gap-2">
            {FILTERS.map(([v, l]) => (
              <button key={v} aria-pressed={filter === v} onClick={() => setFilter(v)} className={`btn !py-3 ${filter === v ? 'bg-ink text-white' : 'btn-line text-ink'}`}>
                <span>{l}</span>
              </button>
            ))}
            <span className="label ml-auto text-muted">{items.length} photos</span>
          </div>

          {GROUPS.filter(([y]) => filter === 'all' || filter === y).map(([y, title, sub]) => (
            <div key={y} className="mt-20">
              <h2 className="display t-lg text-ink">
                {title} {sub && <span className="serif-it text-crimson">{sub}</span>}
              </h2>
              <ul className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 md:gap-6">
                {items
                  .map((g, i) => [g, i])
                  .filter(([g]) => g.year === y)
                  .map(([g, i]) => (
                    <li key={g.src} className="mb-4 break-inside-avoid md:mb-6">
                      <button className="group block w-full overflow-hidden text-left" onClick={() => setOpen(i)} data-cursor="View">
                        <span className="block overflow-hidden">
                          <img src={img(g.src, 'sm')} alt={g.caption} loading="lazy" className="w-full transition-transform duration-[900ms] ease-out group-hover:scale-110" />
                        </span>
                        <span className="mt-3 block text-sm text-muted transition-colors group-hover:text-ink">
                          {g.year} — {g.caption}
                        </span>
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <dialog ref={dlg} onClose={() => setOpen(null)} className="m-auto max-h-none max-w-none bg-transparent p-0 text-white" aria-label="Photo viewer">
        {cur && (
          <figure className="flex max-h-[94vh] w-[min(94vw,84rem)] flex-col">
            <img src={img(cur.src)} alt={cur.caption} className="max-h-[80vh] w-full object-contain" />
            <figcaption className="mt-5 flex flex-wrap items-center gap-3">
              <span className="mr-auto text-lg">
                {cur.year} — {cur.caption}
              </span>
              <button className="btn btn-line on-dark !py-3" onClick={() => setOpen((open - 1 + items.length) % items.length)}>
                <span>Previous</span>
              </button>
              <button className="btn btn-line on-dark !py-3" onClick={() => setOpen((open + 1) % items.length)}>
                <span>Next</span>
              </button>
              <button className="btn btn-red !py-3" onClick={() => setOpen(null)} autoFocus>
                <span>Close</span>
              </button>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  )
}
