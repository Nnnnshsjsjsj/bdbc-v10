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

- `src/lib/data.js` holds all content: committees, people, partners, agenda, gallery, facts. Change numbers here and they change everywhere.
- `src/components/Dove.jsx` is the logo dove, redrawn in four parts so the wings move.
- `src/components/Placard.jsx` is the delegate placard that fills in on the home page and the application.
- `src/components/SeatingPlan.jsx` is the conference floor plan; on phones it becomes a list.
- `src/components/FogTrophy.jsx` is the trophy in the fog.
- `public/img/` holds every photo from v9, converted to WebP.

## Still to do before launch

1. Privacy and Terms are drafts. Decide retention, consent for under-18s and refunds, and have the text checked.
2. Make a proper share image for `public/og.jpg` (currently a crop of a committee photo).
3. Add study-guide links to each committee when they exist.
4. Swap the trophy for the real one when it is designed (or keep the fog until the reveal).
5. Move application emails to an address on bdbconference.com with SPF, DKIM and DMARC. Do this as a separate step after launch.
