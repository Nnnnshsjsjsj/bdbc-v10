import { useEffect, useRef, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { GALLERY } from '../lib/data'
import { img, useDocumentTitle } from '../lib/util'

const FILTERS = [
  ['all', 'All editions'],
  ['2026', 'BDBC 2026'],
  ['2025', 'GPMUN 2025'],
]

export default function Gallery() {
  useDocumentTitle('Gallery')
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
      <PageHeader title="Two editions, one growing legacy." intro="From opening ceremonies to closing awards: moments from GPMUN 2025, the edition that became BDBC, and BDBC 2026." />
      <section className="bg-paper">
        <div className="mx-auto max-w-[90rem] px-5 py-14 sm:px-8">
          <div role="group" aria-label="Filter by edition" className="flex flex-wrap gap-2">
            {FILTERS.map(([v, l]) => (
              <button key={v} aria-pressed={filter === v} onClick={() => setFilter(v)} className={`rounded-[var(--radius-ui)] border px-4 py-2 text-sm font-semibold ${filter === v ? 'border-ink bg-ink text-white' : 'border-ink/25 text-ink hover:border-ink'}`}>
                {l}
              </button>
            ))}
            <span className="ml-auto self-center text-sm text-muted">{items.length} photos</span>
          </div>
          <ul className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {items.map((g, i) => (
              <li key={g.src} className="mb-4 break-inside-avoid">
                <button className="group block w-full text-left" onClick={() => setOpen(i)}>
                  <img src={img(g.src, 'sm')} alt={g.caption} className="w-full" loading="lazy" />
                  <span className="mt-2 block text-sm text-muted group-hover:text-ink">
                    {g.year}: {g.caption}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <dialog ref={dlg} onClose={() => setOpen(null)} className="m-auto max-h-none max-w-none bg-transparent p-0 text-white backdrop:bg-ink/90" aria-label="Photo viewer">
        {cur && (
          <figure className="flex max-h-[92vh] w-[min(94vw,80rem)] flex-col">
            <img src={img(cur.src)} alt={cur.caption} className="max-h-[80vh] w-full object-contain" />
            <figcaption className="mt-4 flex flex-wrap items-center gap-4">
              <span className="mr-auto">
                {cur.year}: {cur.caption}
              </span>
              <button className="btn btn-quiet !py-2" onClick={() => setOpen((open - 1 + items.length) % items.length)}>
                Previous
              </button>
              <button className="btn btn-quiet !py-2" onClick={() => setOpen((open + 1) % items.length)}>
                Next
              </button>
              <button className="btn btn-quiet !py-2" onClick={() => setOpen(null)} autoFocus>
                Close
              </button>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  )
}
