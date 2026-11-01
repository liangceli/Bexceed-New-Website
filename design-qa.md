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

Local implementation and QA passed. GitHub/Vercel release verification is recorded separately after publishing.
