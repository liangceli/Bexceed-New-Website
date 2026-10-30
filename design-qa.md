# Bexceed homepage implementation QA

Date: 21 October 2026

final result: passed

## Reference and comparison

Authority: `design/our-office-v7-2026-10-21/bexceed-home-desktop-v7-2x.png` (2880 × 8494), the approved 1440px desktop homepage. It incorporates the final uniform pale-blue office panel between client feedback and the contact form. No withdrawn interior concepts were used.

The browser-rendered implementation was compared at 1440px in English, first pricing tab and poster state (`?still=1`). The complete implementation export is `qa/desktop.png` (2880 × 8514). The 10 CSS-pixel overall height difference comes from the functional form/feedback content. The reference, full render and a side-by-side overview were opened and inspected. Live browser screenshots were also inspected because DOM-to-image exports can differ from browser rendering in grid margins and line wrapping; the live browser is authoritative for layout.

### Visual checks

| Area | Result |
| --- | --- |
| Hierarchy and layout | Approved header, hero, trust strip, three services, Why Bexceed, tabbed pricing, feedback, office, contact and footer remain in the same order with the original desktop rhythm. |
| Typography | Manrope headings and Source Sans 3 body copy; consistent hierarchy, line height and button sizing. Chinese uses a suitable system fallback. |
| Brand | #194973 navy, #00B0F0 cyan and #F3A50A amber. White logo over hero/footer, navy logo over scrolled header. |
| Office | Clean pale-blue background with no directional vignette or centre-light gradient. All text is live and translates. |
| Imagery and icons | Approved imagery retained, four transparent navy/cyan/amber illustrations, no circular backgrounds. Optimised web formats. |
| Responsive | 1440, 1280, 768, 390, 375 and 320px checked for all four locales: 24 combinations with no document or tested content/control horizontal overflow. Mobile header, contact region, service cards, pricing and footer visually inspected. |
| Copy | No invented prices; fees TBC. Original business contact details and three client-feedback entries retained. |

## Functional verification

- Price category buttons and keyboard arrow navigation update the correct cards and selected state.
- Service/about/pricing/privacy dialogs open and close, including Escape. Consultation CTAs lead to the form and can preselect the service.
- Feedback next control scrolls to subsequent reviews; horizontal native scrolling is available.
- Header changes to light background on scroll; mobile menu opens and contact selection closes it.
- All four locale dictionaries have matching complete structures. Language switching preserves existing form values, updates document language and saves the selection. Invalid/prototype-property locale parameters safely fall back to English.
- Empty required fields trigger a visible validation message. Draft generation preserves multilingual text and reserved URI characters, uses a fixed recipient and cannot append mail headers. No enquiry was sent during testing.
- Hero browser media state: 10 seconds, muted, playing, readyState 4. Adviser video: 6 seconds, playing when visible, readyState 4. Both have pause/play controls. Reduced motion suppresses autoplay and is rechecked by the visibility observer.
- Live application browser console inspected: no application errors or warnings. A QA-wrapper MutationObserver notification was not present in the production application.
- `npm test`: 5 tests passed. `npm run build`: production bundle successfully generated.

## Review and scope

Independent code review found an unsafe inherited-property locale lookup; fixed with an own-property allowlist and regression coverage. Minor reduced-motion and Escape-focus issues were also corrected. No remaining P0/P1/P2 findings.

Deployment smoke test: https://bexceed-new-website.vercel.app/ loads the complete homepage and plays the 10-second hero. The carousel's mandatory snap initially removed its leading gutter; explicit responsive scroll padding now preserves it (browser check at 1280px: scrollLeft 0, first card x 96, matching the content container). A follow-up production build passed.

This release is the homepage. Separate interior pages and confirmed fee amounts remain future work by agreement. The contact form opens an email draft in the visitor's mail client, as expressly approved; it does not claim that a message has been sent.

---

# Header and footer logo contrast — design QA

**Final result: passed**

## Scope and evidence

The approved reference is `design/logo-contrast-concept/header-footer-concept.png`. The comparison covers the header and footer only; the reference is an AI concept combining these regions into one 1504 × 1045 image, while the implementation screenshots use the existing site at a 1280 × 720 viewport: `qa/logo-header-footer/header.jpg` and `qa/logo-header-footer/footer.jpg`. The existing hero video, hero copy, real business details, navigation links and footer information are intentionally retained rather than replacing them with the concept's generated placeholders.

## Checks

- Typography and layout: original site fonts and navigation hierarchy retained; the header's dark text and footer's logo panel are legible without clipping.
- Colour and states: pale header and dark blue navigation at the top, on scroll and when the mobile menu is open; footer retains the dark blue background with a light logo panel; hover and focus treatments remain visible.
- Asset fidelity: both logo instances use the exact customer-supplied PNG, with no CSS colour filter; the original and deployed asset SHA-256 hashes match.
- Content: existing correct Adelaide contact information and current website copy are preserved; the concept image's fabricated contact details were not adopted.
- Responsive and interactions: 390 px mobile header and expanded menu checked with no document overflow; language chooser opened and switched to Simplified Chinese, and the logo remained unfiltered.

No outstanding P0, P1 or P2 findings within the requested header/footer scope.

---

# Homepage pricing section — design QA

**Final result: passed**

Compared the approved `design/pricing-concept/pricing-section-concept.png` against `qa/pricing-layout/desktop.jpg`, and checked `qa/pricing-layout/mobile.jpg`. The reference combines a larger pricing photo with the list; the user explicitly requested the existing Why Bexceed section's container and image dimensions, so the implementation follows those dimensions instead.

- Layout and imagery: the desktop pricing and Why Bexceed containers are both 1088 px at a 1280 px viewport; both image regions are 520 × 522 px. On a 390 px viewport both are 350 × 330 px. The photo is a separately generated interpretation of the approved concept and is cropped with `object-fit: cover`.
- Typography and colour: the site fonts, navy headings, pale-blue surface, cyan link and amber selected indicator/button are retained. All three service rows remain legible and fees remain unconfirmed.
- Content and interactions: the category tabs change the service list and support keyboard navigation; the complete existing pricing dialog still displays all nine service cards; the quote link preselects the active category.
- Responsive: all four languages and all three categories were checked at 320 px with no horizontal overflow or clipped tab/row text; the 390 px mobile layout stacks the image after the pricing content.

No outstanding P0, P1 or P2 findings within the requested homepage pricing scope.
