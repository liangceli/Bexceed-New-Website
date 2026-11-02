# Bexceed full website QA

Date: 2 November 2026 (Australia/Adelaide)

final result: passed

## Scope and design authority

The existing approved homepage and four approved v3 concepts are the visual authority. The full site now exposes 25 routes in English, Simplified Chinese and Traditional Chinese, including all service, pricing, article and video category pages. The old homepage-only QA is preserved in docs/homepage-qa-history.md; its former language/logo/section descriptions are historical, not current requirements.

References: design/page-concepts-2026-10-30-v3-concept/{about,services,pricing,insights}-desktop.png. These local approved references are ignored by Git. The prohibited website-design-to-pixel-perfect skill was not used.

## Visual comparison

The source and Chrome implementation were opened together in side-by-side comparison boards at equal displayed widths. Desktop implementation screenshots use a 1440 x 1000 viewport, device scale 1, full page. Phone screenshots use 390 x 844. The source/render pixel dimensions are:

| Page | Approved source | Browser render |
| --- | --- | --- |
| About | 850 x 1851 | 1440 x 2848 |
| Services | 780 x 2014 | 1440 x 3727 |
| Pricing | 773 x 2033 | 1440 x 3598 |
| Insights | 769 x 2045 | 1440 x 3690 |

Evidence: qa/full-site/comparisons/{about,services,pricing,insights}.png, the corresponding -focus.png comparisons, mobile-pages.png, and individual desktop/mobile screenshots under qa/full-site/.

| Surface | Verification |
| --- | --- |
| Hierarchy and layout | Four distinct conceptual heroes, approved section order, service imagery and expertise tabs, pricing rows and scope image, article archive and video resources. Real content is rendered as HTML, never a flattened mockup. |
| Typography | Manrope headings and Source Sans 3 body; coordinated desktop and phone scales. About hero line wrapping corrected. Shared header, footer, buttons and forms retain established homepage dimensions. |
| Color and contrast | Navy #194973, cyan #00b0f0, amber #f3a50a, white and uniform pale #f1f8fc. About benefits remain pale and the following contact section is white. Representative section boundaries were checked programmatically and visually. |
| Imagery and icons | Unique page hero concepts, context-specific audience/contact photographs, original article covers and bespoke illustrated icons. Original-color client logo only. A sprite-row edge found in the final Services mobile review was clipped without altering the icon; final evidence is qa/full-site/service-icons-final.png. |
| Responsive behavior | All 25 routes, three languages and six widths checked. Desktop grids become appropriate phone stacks; tabs wrap within their panels; long headings, contact details and form fields stay inside the viewport. |

Intentional differences from generated concepts: shared navigation/form/footer dimensions follow the approved live homepage; the About contact background changes to white at the user's request; uniform brand surfaces replace texture in generated concepts. Full original service coverage can produce additional text wrapping. These comparisons are a visual implementation review, not a claim of zero numerical pixel difference.

## Automated and interaction evidence

- npm test: 8 passing tests, zero failures.
- npm run build: production build passed after the final illustration-edge adjustment. Final bundles: index-CL8DzGwv.js and index-BgPeH-Fg.css.
- tests/browser.mjs against production preview http://127.0.0.1:4192: 25 routes x 3 languages x 6 widths (320, 390, 768, 1024, 1440, 1920) = 450 layout combinations. No detected horizontal overflow, missing images, invalid internal routes or application page errors. Evidence: qa/full-site/results.json.
- Final Services-only illustration adjustment rechecked at 320, 390, 768 and 1440 in all three languages (12 additional combinations); only clip-path changed after the full matrix.
- Navigation, direct child routes, breadcrumbs, Back/Forward, legacy Chinese aliases, same-route filter history, keyboard tabs, pricing selection, quote preselection, search and empty states passed.
- Three-language switching and form-value preservation passed; Vietnamese is not offered and a saved unsupported locale falls back safely.
- Form validation and captured mailto draft generation passed. No test enquiry was sent. The approved form opens an email draft and does not claim server delivery.
- Mobile menu, Escape focus, FAQ expansion, unknown-route view and reduced-motion behavior passed.
- Reviewer found a legacy alias locale issue on browser Back; it was fixed and covered by a browser regression. No unresolved blocking review findings.

## Media and external resources

Evidence: qa/full-site/media-checks.json. The homepage hero (10 seconds) and adviser video (6 seconds) played at 390 and 1440 widths. Hero pause button remains removed; adviser pause/resume works. Reduced motion suppresses autoplay. Mobile Services image transfer measured approximately 0.95 MB; interior images use responsive WebP exports and intrinsic dimensions.

The 11 original video references were checked against their publishers' YouTube metadata. Seven remain publicly available with local original thumbnails. Four unavailable originals are represented by honest official-resource cards rather than broken players. One representative original RBA embed was actually played and reached 0:03; playback of all seven was not individually claimed. The deterministic browser interaction test separately verifies click-to-load and 16:9 player layout. Third-party availability can change.

Historical article dates are retained, and old SMSF member limits are not presented as current guidance. See docs/content-coverage.md and ASSET_LICENSES.md for sources.

## Agreed content/service limits

Fees remain TBC until the client supplies amounts. Contact delivery remains the approved email-draft approach. These do not represent unfinished site pages. Source website and Notion content were not modified.

## Release

Published application commit: 6e87ec37a3f532155e3009d530f611adf15665c1 on GitHub main. The remote branch was checked after push.

Production https://bexceed-new-website.vercel.app/ serves the verified index-CL8DzGwv.js build. All 25 page URLs plus sitemap, robots and a responsive image returned HTTP 200 with the expected content. Six representative live pages passed a 390px Traditional Chinese browser check with no missing images, horizontal overflow or script errors. The live About desktop screenshot was inspected. Evidence: qa/full-site/release.json and qa/full-site/about-production.png.

## Footer option 2 — 2 November 2026

Status: **passed**. User selected `design/footer-concepts-2026-11-02/02-practice-right.png`. The shared footer now has Quick links left, Our services middle, and the genuine supplied CPA logo, full company name and contact details right. Navigation spacing and footer height are increased. The original Bexceed header logo and other site sections remain as approved. The separate two-row credentials module is still awaiting selection.

Visual comparison: source normalized to 1440px width versus the 1440px browser render, `qa/footer-option-2/comparison.png` (source above, implementation below). Desktop, 1024px tablet and 390/320px mobile captures were inspected. The implementation uses actual site fonts and the unmodified client CPA asset, preserving the layout, hierarchy, navy surface and divider from the selected concept. On smaller screens, the practice block moves below both navigation columns with a horizontal divider. Footer-only screenshots hide the fixed header for an unobstructed capture; product header behavior is unchanged.

Verification: eight unit tests pass; production build passes (`index-CxMQxxut.js`, `index-CmEilLsR.css`). Chrome checked all 25 routes × three locales × six widths (320, 390, 768, 1024, 1440, 1920), totaling 450 footer layouts. No horizontal overflow, out-of-bounds footer elements, broken internal footer destinations, missing footer images or application errors. Footer navigation, SMSF service link, privacy route, language selection, contact destinations and keyboard-visible focus passed. Evidence: `qa/footer-option-2/results.json` and the numbered width PNGs. The initial keyboard assertion used programmatic focus after a mouse click; it was corrected to actual Tab navigation without altering product behavior. Independent code review found no actionable issues.

## Credentials gallery option 2 — 2 November 2026

Final result: **passed**. The user subsequently selected the separate icons/logos option 2, `design/credentials-two-rows-2026-11-02/02-centered-gallery.png`. A single shared gallery appears immediately after the Home and About heroes. Four professional credentials (TPB, CPA, company-agent illustration, AFSL SMSF) sit above a divider; Xero Certified Advisor and NTAA form the centered second row. HKABA is excluded. The already approved footer remains unchanged.

Visual evidence: `qa/credentials-option-2/comparison.png` normalizes the selected source and actual gallery to 1440px, source above implementation. First comparison found the rows spread too widely and the vertical spacing too tall. The final layout reduces upper-row width to 1140px, partner pair to 480px, and tightens padding and heading/logo spacing. Re-captured comparison passed. Manrope headings and Source Sans 3 labels follow the established site, with navy text, amber rules and a white surface. Supplied/source marks replace the approximate marks in the generated concept; their native proportions and colors are preserved. The supplied standalone TPB seal is paired with readable HTML registration number 25691635. AFSL retains exactly AFSL (SMSF), delivered as a 600px transparent WebP; source remains intact.

Responsive/accessibility: four credentials become a 2×2 grid at 700px and below; the partner pair remains in two columns. English, Simplified and Traditional Chinese captions were checked. The two pages use the same rendering function and image sizes. About alternates white gallery, pale-blue approach, white benefits and pale-blue contact; images and content remain present. The full-page screenshot is captured after decoding lazy images, avoiding a misleading blank adviser image in the initial capture.

Chrome evidence: Home/About × three locales × nine widths (320, 390, 600, 700, 701, 768, 1024, 1440, 1920) = 54 combinations. No horizontal overflow, escaped gallery elements, missing gallery images or application errors; grouping, registration number, typography parity, neighboring background contrast, locale switching and internal navigation passed. See `qa/credentials-option-2/results.json`, desktop/mobile PNGs and `about-overview.png`. All eight existing unit tests and production build pass. This static presentation change adds no new controls or integrations.

### Follow-up: increase space above and below the gallery

Final result: **passed**. The user requested more separation from the hero and following section on both pages. Shared outer padding is now 64px at desktop, 56px at tablet widths and 48px on phones. Logo sizes and internal layout are unchanged. Production build (`index-WjTGC9Ey.js`, `index-CW_baROW.css`) and the same 54 browser layout/locale checks passed; desktop and phone captures were visually inspected. This explicit revision supersedes the earlier concept's compact outer padding.

## Footer relative typography — 2 November 2026

Final result: **passed**. User approved a quieter footer type hierarchy and requested relative sizing. Footer link/contact copy is 1rem, headings use a bounded 1.125–1.25rem clamp, company copy 1.0625–1.125rem, and legal copy .75–.8125rem. Source Sans 3 and the approved columns remain. Related spacing uses rem, contact icons use em, and responsive breakpoints use em. No fixed root font size was introduced. Link targets remain at least 2.5rem high (40px at the default root size). Thin rules and supplied logo dimensions are intentionally independent of text sizing.

Production build passes (`index-DOIaoPse.js`, `index-xTkfC-qN.css`). The 25-route × three-locale × six-width footer check passed all 450 combinations and footer navigation/language/contact interactions. A separate 45-case check covered five widths and three locales with simulated 16px, 20px and 32px root font sizes (100%, 125%, 200%). Footer body text followed root size, bounded headings stayed within the agreed rem range, targets remained usable, and no footer element overflowed. Desktop, phone and enlarged-text screenshots were inspected. Evidence: `qa/footer-relative-type/results.json`, its screenshot set, and refreshed `qa/footer-option-2/results.json`. The updated hierarchy intentionally supersedes the oversized text in the original footer mockup.
