# Client Insights resources implementation plan

> **For agentic workers:** Use superpowers:executing-plans for this approved integration. Keep the existing workspace and do not switch branches.

**Goal:** Integrate Belinda's 10 November Insights content while preserving the existing site layout; omit the two new TED talks and replace the Arabic retirement video with the official English version.

**Architecture:** Extend the existing video library and topic routes. Reuse existing cards and contact form, with optional expanded descriptions and relevant service links. Keep the header, footer, hero assets, pricing and credentials unchanged.

**Tech Stack:** Vite, vanilla JavaScript, localised data, CSS, Node tests.

**Spec:** User approved the preceding content-mapping proposal on 12 November. Seven videos belong to Technology & Cloud Accounting, Australian economy & markets, and Superannuation & Retirement. No empty Leadership category while TED is deferred. One existing homepage card may feature the new Xero resource; do not add homepage sections.

## Global constraints
- Brand #194973 / #00b0f0 / #f3a50a; retain white/pale-blue section alternation.
- English, Simplified Chinese and Traditional Chinese.
- Keep old content and URLs. Preserve month-only dates without inventing a day.
- No autoplay or third-party iframe until playback requested. Keep source links.
- No changes to credential components, video hero or approved imagery.
- Inspect source metadata; never invent upload dates or claim an external player works without checking.

## Review focus
- New category routes, Chinese translations, narrow viewport overflow.
- External source attribution and English retirement replacement.
- Long descriptions and month-only dates.
- Contact CTAs select the relevant existing service without sending anything.
- Seven new videos, two requested TED items absent, old article routes retained.

## Tasks
- [x] Verify official English retirement URL and seven video sources; save local poster images and provenance.
- [x] Extend resource data, category route, date formatting, card descriptions and source/CTA links; add focused tests for route and rendering behaviour.
- [x] Integrate within existing Insights section; replace one home card with an Xero resource and add related links within business/SMSF topics.
- [x] Build translations/sitemap, run existing tests/build, inspect mobile/desktop and playback; save review screenshots and provide preview.

## Execution notes
- Initial git status clean. Existing shared-workspace instructions prohibit branch switching or overwriting unrelated changes.
- Official English source: Moneysmart retirement-cost page links to https://www.youtube.com/watch?v=pz3XvxgcC4k (title confirmed in browser).

## Completed validation
- 12 tests passed; build and generated translations/sitemap completed.
- 40 English route/viewport checks across 320, 390, 768, 1440 and 1920 px; 12 Simplified/Traditional Chinese checks at 390 and 1440 px. No document overflow, missing visible images or missing translated strings.
- Six in-page videos started playback. ABC original plays but embed is unavailable; its card opens the publisher video directly.
- Existing 11-video archive retained; seven new resources present; players load only after a click.
- Xero enquiry link selects Business Services in the existing contact form. No form submitted.
- Publication dates verified from each publisher YouTube page; ABC corrected from email month to 27 September 2026.
- Desktop/mobile screenshots and detailed checks saved under qa/insights-client-2026-11-12/.
- Independent code review found no critical, important or minor issues; subsequent ABC fallback covered by a focused test.
