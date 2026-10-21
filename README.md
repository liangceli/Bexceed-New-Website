# Bexceed-New-Website

Current design authority: the approved homepage plus the current global website Skill. All previous interior designs were rejected by the user on 20 October 2026 and are withdrawn.

See [the current design baseline](design/full-site-design-location.md). Do not continue or implement the old interior proposals.

## Homepage implementation — 21 October 2026

Live site: https://bexceed-new-website.vercel.app/

The root project implements the approved V7 homepage, including its uniform pale-blue Our Office section. Vite serves and builds a lightweight vanilla JavaScript site. Design exploration files remain local and are excluded from the production repository.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Use Node.js 22.12 or newer. Local development uses port 4191. Vercel builds with `npm run build` and publishes `dist`.

- English, Simplified Chinese, Traditional Chinese and Vietnamese are in `src/content.js`. Language selection updates the page, URL and local preference without discarding entered form values.
- The contact form validates required fields and opens an email draft addressed to `admin@bexceed.com.au`. The visitor sends it from their email application. There is no mail server, stored enquiry database, analytics or automatic sending.
- The homepage includes working service dialogs, price tabs, all-pricing overview, feedback carousel, mobile navigation, and privacy information. Separate interior pages are outside this implementation phase.
- Fees remain TBC until the client confirms them. Edit the locale content together when fees are approved.
- The 10-second hero and 6-second adviser videos are muted, pausable and respect reduced-motion/data-saving preferences. Poster images are retained for fallback. `?still=1` disables automatic playback for visual comparison.
- Images and videos are illustrative; replace them with approved Bexceed photography when supplied. Asset sources and licences are in `ASSET_LICENSES.md` and `public/licenses/`.

See `design-qa.md` for verification and scope. No environment secrets are required.
