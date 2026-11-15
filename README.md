# bdbc-v10

Redesign of bdbconference.com for BDBC 2027. Vite + React + Tailwind 4, GSAP and Lenis for motion, fonts self-hosted.

## Run

```
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

`VITE_PREVIEW=1 npm run build` makes the sandboxed preview (hash routes, relative paths, forms switched off). Do not deploy that build.

## Draft review on GitHub Pages

Every push to `main` publishes the preview build to GitHub Pages (`.github/workflows/pages.yml`). Forms are switched off there.

## Deploy (Cloudflare Pages)

Build command `npm run build`, output folder `dist`. `public/_redirects` sends the old v9 URLs (`/recognition`, `/why-bdbc`, `/agenda`) to their new homes and serves `index.html` for every other path.

Deploy to a preview URL first, submit one test application, and check the Sheet gets exactly one row and the applicant exactly one email before switching the domain.

## Forms

`.env` holds `VITE_FORM_ENDPOINT`, the same Google Apps Script web app v9 posts to. `src/pages/Apply.jsx` sends the same JSON as v9 (same field names, same option strings, `formType: 'application'`), and the contact form sends `formType: 'contact'`. The Apps Script and the Sheet need no changes.

## Where things are

- `src/lib/data.js` holds the site copy, carried over word for word from v9.
- `src/lib/motion.js` holds the scroll animations (declared in markup with `data-lines`, `data-fade`, `data-img`, `data-words`, `data-count`, `data-parallax`).
- `src/components/` has the preloader, cursor, full-screen menu, delegate badge and the trophy in the fog.
- `public/logo.png` is the original logo, untouched, with a round mask.
- `public/video/belgrade.mp4` is the hero clip (Pexels, free licence: "Aerial View of Belgrade Cityscape at Dusk").
- `public/img/` holds every photo from v9, converted to WebP.
- `src/components/LiveDove.jsx` is the live dove. Its frames are in `public/dove/` (side.webp = flying, hover.webp = hovering), keyed from two Pixabay green-screen clips (free Pixabay Content License): "Dove, White Dove, Dove Green Screen" (318501) and "White Dove, Flying Dove, 4K" (366117). Any page can make it move with `window.dispatchEvent(new CustomEvent('dove', { detail: 'hop' | 'spin' | 'loop' | 'dance' | 'celebrate' }))`.

## Still to do before launch

1. Privacy and Terms are drafts. Decide retention, consent for under-18s and refunds, and have the text checked.
2. Make a proper share image for `public/og.jpg` (currently a crop of a committee photo).
3. Add study-guide links to each committee when they exist.
4. Swap the trophy for the real one when it is designed (or keep the fog until the reveal).
5. Move application emails to an address on bdbconference.com with SPF, DKIM and DMARC. Do this as a separate step after launch.
