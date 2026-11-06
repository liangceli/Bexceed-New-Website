# Fixed cast media and single-row credentials

**Goal:** Establish four recurring fictional advisers, prepare realistic page-banner concepts and two distinct video treatments, and put the shared credentials component in one responsive row.

**Spec:** User's five-part brief in the 6 November 2026 side conversation. The four page-banner images require user review before replacement. Actual video generation requires a connected service. No deployment or git operation is part of this side-conversation change.

**Approach:** Reuse an image reference sheet for facial/body continuity; create separate contextual photographs rather than unrelated stock people. For logos use native horizontal scrolling, with a lightweight controller for autoplay and pointer dragging. Retain the six original marks and their category descriptions.

**Files:** `src/credentials.js`, `src/credentials.css`, new `src/credential-carousel.js`, minimal lifecycle integration in `src/main.js`; previews and media production notes under `design/team-media-2026-11-06/`; browser evidence under `qa/team-media-2026-11-06/`.

## Tasks
- [x] Inspect current shared component and media references; generate a four-person identity reference and four independent banner concepts.
- [x] Save cast rules, prompts, and two non-overlapping video scripts. Preserve existing live media pending real video generation / banner approval.
- [x] Verify a failing browser check for the requested single row, then implement the shared component and controller.
- [x] Validate Home and About, three locales, small and large widths, automatic movement, manual dragging, reduced motion, pause, resize, and SPA cleanup.
- [x] Provide a review page with the cast, four banners in the site's visual style, video storyboard frames, and the single-row logo preview.

## Verification / remaining gates

- Browser check first failed because the old gallery had no horizontal viewport; after implementation 36 route/locale/width cases and movement controls passed.
- Additional review check passed four banner previews, nine 200% root-font cases, native mobile touch swiping and autoplay resume.
- Existing eight unit tests and production build passed. Screenshots/reports are in `qa/team-media-2026-11-06/`.
- Ten generated image assets saved locally: one identity sheet, four banner concepts, five video keyframes. One keyframe corrected to remove an unrealistic chart printed on a laptop lid.
- Video work was handed to the main chat at the user's request, using Google Flow free credits. The complete handoff is `docs/video-handoff-google-flow.md`. The side chat could not access the in-app browser and has submitted no video generation tasks or spent video credits. All four banner replacements were subsequently approved for the local website and implemented with new responsive WebP assets and scoped hero styles. No GitHub push or Vercel deployment performed.
- Mobile banner previews now place the photograph below the navy text area, keeping faces visible instead of cropping a 3:1 landscape into a tall phone background. Desktop compositions remain unchanged.
- Approved banners are now served locally from four new source images and sixteen WebP variants (480/960/1440/1920px). New `src/team-media.css` is scoped to the four approved page types, including the existing pricing category routes; service-detail, video-library and privacy heroes retain their independent artwork. The 1920px files are approximately 73–123 KiB each.
- Local implementation was checked across 72 page/language/viewport combinations, 12 enlarged-font cases and three unaffected subpages. The eight unit tests and production build passed. Detailed screenshots and results are in `qa/team-media-2026-11-06/approved-banners-results.json` and `*-live-*.png`.

## Review focus
- Six accessible original logos, no recolouring, no HKABA; repeated visual copies hidden from accessibility APIs.
- User dragging, keyboard focus, reduced motion, tab visibility and manual pause take precedence over automatic scrolling.
- No page overflow at 320px or 200% root font size; desktop remains a single static row.
- Route/language rerenders dispose listeners and animation frames.
- Synthetic reference characters are not labelled as real named staff; consistent A/B/C/D faces must be checked per shot.

## Execution notes
The active side conversation explicitly authorizes these local media/component changes; no unrelated work, agent delegation, branch switching, commits or publishing. Work is carried out inline. User provided a concrete logo layout/interaction specification, so no additional layout-approval gate is needed. Banner publication remains gated by the user's explicit review request.
