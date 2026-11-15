import { Link } from '../lib/router'
import { EVENT } from '../lib/data'
import { asset } from '../lib/util'

export default function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-white">
      <div className="h-1 bg-gradient-to-r from-gold via-crimson to-crimson" />
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:py-24">
        <div>
          <img src={asset('logo.png')} alt="BDBC logo" className="h-20 w-20" />
          <p className="mt-6 text-2xl font-bold leading-tight">
            Belgrade Diplomacy &amp; Business
            <br />
            Conference
          </p>
          <p className="mt-4 max-w-sm text-white/65">One of Eastern Europe’s first conferences uniting Model UN diplomacy with real-world business. By Youth, For Youth.</p>
        </div>
        <div>
          <h2 className="label text-white/50">Quick Links</h2>
          <ul className="mt-6 space-y-3 text-lg">
            {[
              ['/about', 'About'],
              ['/program', 'Agenda'],
              ['/impact', 'Impact'],
              ['/recognition', 'Recognition'],
              ['/gallery', 'Gallery'],
              ['/apply', 'Apply Now'],
            ].map(([to, l]) => (
              <li key={to}>
                <Link to={to} className="ulink">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="label text-white/50">Connect</h2>
          <ul className="mt-6 space-y-3 text-lg">
            <li>
              <a className="ulink" href={`mailto:${EVENT.email}`}>
                {EVENT.email}
              </a>
            </li>
            <li>
              <a className="ulink" href={EVENT.instagram} target="_blank" rel="noreferrer">
                Instagram {EVENT.handle}
              </a>
            </li>
            <li>
              <a className="ulink" href={EVENT.tiktok} target="_blank" rel="noreferrer">
                TikTok {EVENT.handle}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center overflow-hidden" aria-hidden="true">
        <p className="display select-none whitespace-nowrap text-[30vw] leading-[0.72] text-white/[0.06]">BDBC</p>
      </div>
      <div className="wrap rule flex flex-wrap gap-x-8 gap-y-2 py-6 text-sm text-white/45">
        <span>© {new Date().getFullYear()} Belgrade Diplomacy &amp; Business Conference. All rights reserved.</span>
        <Link to="/privacy" className="ml-auto hover:text-white">
          Privacy
        </Link>
        <Link to="/terms" className="hover:text-white">
          Terms
        </Link>
      </div>
    </footer>
  )
}
