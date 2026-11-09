# Bexceed recurring visual cast

Source: client brief, 6 November 2026. Applies to future commissioned/generated team scenes, customer interactions and their video adaptations. Existing official publisher videos are external resources, not depictions of Bexceed staff.

Reference sheet: `design/team-media-2026-11-06/cast-reference.png`. This cast is used in the four banners approved by the user; do not silently regenerate unrelated faces. These are fictional illustrative characters, not verified portraits of actual named employees.

| ID | Fixed identity | Wardrobe range |
| --- | --- | --- |
| A | Chinese woman; approximately 39; oval face, dark eyes, shoulder-length side-parted dark brown hair, silver studs | Navy soft tailoring, ivory or pale-blue blouse; composed and approachable |
| B | White man; approximately 44; lightly freckled longer face, short brown hair with grey temples, hazel eyes, neat stubble | Pale-blue Oxford shirts, navy trousers, optional informal navy jacket; open collar, no tie |
| C | Asian man; approximately 38; gently stocky build, round cheeks, short black hair, dark rounded rectangular glasses, clean-shaven | Dusty-blue shirt, charcoal/navy knitwear; practical and friendly; retain his fuller build |
| D | Malaysian Malay woman; approximately 35; softly oval face, warm medium-brown skin, dark eyes, hijab | Dusty teal/slate-blue hijab, cream modest long sleeves, navy soft jacket; clear and professional |

Always provide the reference sheet (and the approved shot image when available) to the generator. A/B/C/D may appear alone, paired or together. Vary clothing within the recorded style; do not change face, age, body build, hair, glasses or hijab identity between assets. Match each output against the reference; generation does not guarantee perfect identity consistency.

Client scenes should emphasize diverse families and small businesses: multigenerational or mixed-heritage households, couples, local shops, cafés, florists and everyday bookkeeping. Family members are clients, not additional advisers. Avoid making every scene the same family, the same room or the same seated meeting. Use candid gestures, normal skin texture, modest premises and believable working materials. Avoid glossy corporate boardrooms, fantasy composites, false signage, legible invented private data and charts on the back of laptop lids.

## Review boundaries

The four page banners (`about`, `services`, `pricing`, `insights`) were approved in the side conversation on 6 November 2026 for local implementation. Their tracked originals use `public/assets/pages/*-team-hero.png`, with responsive WebP exports and entries in `src/page-assets.json`. Phone layouts place the photo below the text to preserve faces. Homepage Hero is 15 seconds (1280×720 / 30 fps): a five-second meeting with all four advisers and four adult family-business clients, followed by the existing produce-shop and florist scenes. The current edit and production record are in `design/hero-meeting-2026-11-09/`. Why Bexceed remains 6 seconds (1280×720 / 30 fps). Stills are storyboard/keyframes only; do not report them as generated live-action video or publish a slideshow as if it were that video. Video generation and integration are handed to the main chat via `docs/video-handoff-google-flow.md`.

Detailed prompts, storyboards, and review page are under `design/team-media-2026-11-06/`. That directory is local design material and is excluded by the existing `.gitignore`; production-selected assets must later be copied into tracked asset paths.
