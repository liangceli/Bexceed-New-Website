# Bexceed Tax & Accounting

Responsive multi-page website built with Vite and vanilla JavaScript.

Production: https://bexceed-new-website.vercel.app/

## Design authority

Use the approved homepage and the four 30 October 2026 v3 concepts for About, Services, Pricing and Insights. The user approved implementing these concepts and their corresponding child pages. Earlier rejected interior proposals are not authoritative. Do not access or use the website-design-to-pixel-perfect skill.

Shared palette: navy `#194973`, cyan `#00b0f0`, amber `#f3a50a`, pale blue `#f1f8fc`. Fonts: Manrope and Source Sans 3. Use only the supplied original-color client logo, with a pale backing where necessary. Keep adjacent content sections white/pale blue in alternation. About's contact form deliberately uses white after the pale benefits section.

## Run and verify

Requires Node.js 22.12 or newer.

```sh
npm ci
npm run dev -- --port 4191
npm test
npm run build
npm run preview -- --port 4192
```

`npm run test:browser` uses installed Chrome and defaults to the local site at port 4191. Set `QA_BASE_URL` to test another preview or deployed build. It checks all 25 routes, three languages, six viewport widths and the core interactions. See `design-qa.md` for recorded evidence and limits.

## Pages

- Home and About.
- Services landing page plus Individuals & Families, Businesses, SMSF, Compliance, Business Solutions and Advisory.
- Pricing landing page and three directly linkable service categories.
- Insights landing page, four archived articles, video/resource library and four topic categories.
- Contact, Privacy and an unknown-route fallback.

Navigation order is Home, About, Services, Pricing, Insights. All primary actions lead to real pages or the full enquiry form. Legacy article/service URLs resolve to their replacements.

## Behavior and content

- English, Simplified Chinese and Traditional Chinese; no Vietnamese menu option. Old Vietnamese preferences fall back to English. Language changes retain form values. The legacy Chinese homepage defaults to Chinese unless an explicit language is provided.
- The contact form validates fields and opens a draft to `admin@bexceed.com.au`. Visitors send it from their own email application. No backend submission or enquiry database is configured.
- All fees remain TBC. Do not invent or publish amounts until the client confirms them.
- Home retains the approved 10-second hero and 6-second adviser videos. Videos respect reduced motion and data saving. `?still=1` uses posters for visual review.
- Insights retains publication dates and marks historical material. Seven original YouTube videos have publicly accessible metadata; four inaccessible originals are represented by the same topics with official resource links. Players load only on request and have direct YouTube links. External playback remains under the publisher's control.
- Our Office stays commented out. The testimonial carousel and the removed homepage trust strip remain absent.
- Page images have responsive WebP exports and intrinsic dimensions. `npm run assets:export` recreates exports from the preserved originals. Font files are served locally. Traditional Chinese is prepared at build time, without shipping OpenCC's large runtime dictionary.

## Editing and deployment

`src/main.js` owns shared navigation, form, footer, routing events and video behavior. `src/home.js` preserves the homepage. `src/pages.js` and `src/pages.css` render inner pages. `src/page-data.js` and `src/article-data.js` contain paired English/Chinese content; build regenerates Traditional Chinese and the sitemap.

Vercel builds with `npm run build`, publishes `dist`, and serves direct page URLs using the rewrite in `vercel.json`. No environment secrets are required. Use the existing GitHub repository/deployment connection. Do not modify the client's original site at bexceed.com.au.

Design explorations and screenshot evidence remain local in `design/` and `qa/` and are ignored by Git. Production assets, source content, test scripts and project documentation are tracked. See `docs/content-coverage.md`, `docs/project-handoff.md`, and `ASSET_LICENSES.md`.
