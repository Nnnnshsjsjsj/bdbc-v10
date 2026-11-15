import { Link } from '../lib/router'
import { EVENT } from '../lib/data'
import Dove from './Dove'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="on-ink bg-ink text-white">
      <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Dove className="h-10 w-10" stroke="#0c2340" width={11} />
            <p className="font-display text-2xl">BDBC</p>
          </div>
          <p className="mt-4 max-w-sm text-white/70">
            Belgrade Diplomacy &amp; Business Conference. One of Eastern Europe’s first conferences uniting Model UN diplomacy with real-world business. By youth, for youth.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white/55">Pages</h2>
          <ul className="mt-4 grid grid-cols-2 gap-y-2 text-white/85">
            {[
              ['/about', 'About'],
              ['/committees', 'Committees'],
              ['/program', 'Agenda'],
              ['/impact', 'Impact'],
              ['/gallery', 'Gallery'],
              ['/contact', 'Contact'],
              ['/apply', 'Apply'],
            ].map(([to, l]) => (
              <li key={to}>
                <Link to={to} className="hover:text-white hover:underline">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white/55">Write to us</h2>
          <ul className="mt-4 space-y-2 text-white/85">
            <li>
              <a className="hover:underline" href={`mailto:${EVENT.email}`}>
                {EVENT.email}
              </a>
            </li>
            <li>
              <a className="hover:underline" href={EVENT.instagram} target="_blank" rel="noreferrer">
                Instagram {EVENT.handle}
              </a>
            </li>
            <li>
              <a className="hover:underline" href={EVENT.tiktok} target="_blank" rel="noreferrer">
                TikTok {EVENT.handle}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-[90rem] flex-wrap gap-x-6 gap-y-2 border-t border-white/10 px-5 py-6 text-sm text-white/50 sm:px-8">
        <span>© {year} Belgrade Diplomacy &amp; Business Conference</span>
        <Link to="/privacy" className="hover:text-white">
          Privacy
        </Link>
        <Link to="/terms" className="hover:text-white">
          Terms
        </Link>
      </div>
    </footer>
  )
}
