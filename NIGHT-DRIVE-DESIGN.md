# Aref — Night Drive, 2026-10-28

Luxury nocturnal personal portfolio: near-black #08060d, aubergine #24102c, warm gold #d8b77a and violet highlights. Local Yekan Bakh typography; original user portraits. All new copy is translated into Persian, English and German. Resume used for 7+ years, tools, career, certificate, language levels and professional email.

## Motion system
Native scroll controls a section-relative path across nine chapters. Three transparent motorcycle views crossfade while position, scale and lean interpolate. This is 2.5D compositing, not a real 3D model or interactive vehicle simulation. Canvas renders depth-layered neon rain, a fading gold/violet path and short smoke particles. Effects stop on hidden tabs, respect reduced motion and the existing pause control. Rain is capped at 48 mobile / 105 desktop streaks with a 30fps draw target and capped pixel ratio.

New infographics show five production stages, six tool connections, a career timeline, and genuine certificate figures. Decorative bars do not represent measured performance. Counters use existing profile figures only.

## Assets and generation record
- User casual portrait: assets/aref-portrait.jpg
- User formal portrait: assets/aref-formal.png
- User resume: assets/Aref-Jalali-Resume-EN.pdf
- User fonts: assets/fonts/yekan-*.ttf. CSS weights 100/200/300/400/500/700/900/1000. Source heavy and fat metadata correspond to 900 and 1000 despite export filenames 800 and 900.
- Generated top view: assets/superbike-gold.png (earlier Nocturne generation).
- Generated front three-quarter: assets/superbike-front.png.
- Generated rear three-quarter: assets/superbike-rear.png.

Front/rear prompts used the top-view bike as reference: keep the same luxury superbike identity, sculpted metallic gold fairings, aubergine panels, dark carbon mechanical detail and gold wheels. Produce an isolated photoreal CGI studio render with transparent background, no rider, road, labels, logo, smoke or trail. Front: low front three-quarter, nose lower-left and rear upper-right. Rear: low rear three-quarter, rear lower-left and nose upper-right. Full bike contained in landscape frame; crisp geometry and consistent materials. All glow, rain and smoke are composed in website code.

## Files to edit
- dist/index.html: page structure.
- dist/content.js: original translations and STUDIO_PROJECTS project data.
- dist/resume-content.js: updated resume facts and new section translations.
- dist/cinematic.css: foundational layouts and original motion graphics.
- dist/night-drive.css: local fonts, luxury styling and new responsive sections.
- dist/studio.js: languages, work filtering/dialog, scroll scenes and controls.
- dist/night-drive.js: motorcycle/rain/smoke/infographic motion.

The source is buildless; deploy dist as static files. No database, upload backend or secret is required. Project additions are edited in STUDIO_PROJECTS. Never put API keys in browser scripts.
