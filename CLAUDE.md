# CLAUDE.md
# storagebogota - Project Guidelines

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # next dev on :3000
npm run build   # next build — the only type-check; run before declaring work done
npm run lint    # next lint (eslint-config-next)
```

No test suite. Not a git repo.

## What this is

Single-page marketing site for Storage S.A.S (minibodegas, Bogotá), Spanish (`es-CO`). Next.js 14 App Router, React 18, Tailwind 3, framer-motion, Phosphor icons. One route: `app/page.tsx`. Brief and wireframe: `Storage_SAS_Wireframe_Silo_Spec.xlsx` / `Storage_SAS_Wireframe_Visual.html`.

## Architecture (the parts that span files)

**Content lives in one file.** `content/site.ts` holds all copy, NAP, sedes, FAQ, nav, reviews, URLs. Components import from it; nothing else hardcodes contact data. Values tagged `PENDIENTE CONFIRMAR` are awaiting the client — swap them there only.
- `sedes[]`: Calle 197 must stay first. Never sort/randomize.
- CTAs go to `QUOTE_URL` / `CALC_URL`; WhatsApp is displayed as text only.
- `faq` and `company`/`nav` also feed JSON-LD (`app/page.tsx` FAQPage, `app/layout.tsx` Organization/WebSite/ItemList), so edits propagate to schema automatically.

**Design tokens flow MASTER.md → globals.css → tailwind.config.ts.** `design-system/MASTER.md` (currently the «El Calculista» variant; other variants live on the `la-boveda` / `el-contenedor` / `el-sistema` branches) is the source of truth; `app/globals.css` mirrors it 1:1 as CSS variables; `tailwind.config.ts` maps every color/radius/shadow/font/duration to those variables. Add a token in all three, in that order. `design-system/storage-sas/` is the superseded ui-ux-pro-max baseline — don't use it. Brand hex codes are pending from client, hence everything is a variable.

**Fonts:** Bricolage Grotesque (`--font-display`, variable opsz) + Inter (`--font-body`) loaded via `next/font/google` in `app/layout.tsx`.

**Motion:** `lib/motion.ts` defines the shared `snap`/`rise`/`stagger` variants. `components/Reveal.tsx` (`Reveal`, `RevealItem` named export — not `Reveal.Item`) is the scroll-reveal wrapper; it renders static markup under `prefers-reduced-motion`. Use it rather than hand-rolled `motion.*` in sections.

**Server/client split:** sections are server components by default. Only `Header`, `Reveal`, `AnimatedNumber`, `IntentCards`, `HeroVisualizer`, `ShowcaseCycler`, `ScrollRow`, `Magnetic` are `"use client"` (one interactive moment each). Keep that boundary — importing a client-only hook into a section without the directive is the build error that bit last time.

**Page order is SEO-locked.** `app/page.tsx` DOM order follows wireframe T1; mobile reorders (zone selector under hero) use CSS `order-*` on the flex column, never JSX reordering.

Images are placeholder SVGs in `public/img/`.

## The Anti-Slop Ban System

Source of truth: `.claude/skills/design-taste-frontend/SKILL.md` (taste-skill, tasteskill.dev) sections 4, 9.F, 9.G, 14 and `.claude/skills/ui-ux-pro-max/SKILL.md`. Load `design-taste-frontend` before any UI work; run its Section 14 Pre-Flight Check before declaring a UI change done. The rules below are the ones that bite on this project.

**Hard bans (Pre-Flight Fail, no exceptions):**
- Em-dash `—` and separator en-dash `–` anywhere user-visible: headlines, body, captions, alt text, button labels, address strings. Use `-`, `,`, `.`, `:` or a line break. `·` is fine.
- `window.addEventListener("scroll")`. Use framer-motion `useScroll`/`whileInView`, IntersectionObserver, or CSS `animation-timeline`.
- Hand-rolled SVG icons. Phosphor only (already installed).
- Div-built fake screenshots / fake dashboards / fake terminals.
- Pure `#000000`, neon glows, gradient text on large headings, custom cursors.
- Three identical equal-width feature cards in a row.
- Split-header (big headline left, small explainer paragraph right). Stack vertically, body `max-w-[65ch]`.
- 3+ consecutive image+text zigzag sections. Break with full-width, bento, marquee, or stacked layout.
- Same layout family used twice on the page (8 sections need at least 4 families).
- Two CTAs with the same intent. Here: one "Calcular" intent (`CALC_URL`) and one "Cotizar" intent (`QUOTE_URL`); do not add a third wording of either.
- CTA label that wraps at desktop. Max 3 words.
- Button/form contrast below WCAG AA (4.5:1 body, 3:1 large). No ghost buttons over photos without a scrim.
- Hero stack beyond 4 text elements (eyebrow, headline, subtext, CTAs). Trust strips, logo rows, pricing teasers, taglines under CTAs all move below the hero.
- Eyebrow micro-labels (`uppercase tracking-*`) on more than `ceil(sections/3)` sections.
- Decoration tells: section-number eyebrows (`01 · Sedes`), version labels/footers, scroll cues, colored status dots, crosshair grid lines, locale/time/weather strips, hero-bottom word strips (`BODEGAS · BOGOTÁ · 2011`), rotated vertical text, `<br>`-split italic headlines, pills/credits overlaid on photos, generic step labels (`Paso 1/2/3`), "Quietly trusted by" style headers, micro-meta sentences under eyebrows.
- `border-t` + `border-b` on every row of a list; `<ul divide-y>` for lists over 5 items.
- Fake data: generic names, egg avatars, round numbers (`99.99%`, `50%`), filler verbs (Eleva, Revoluciona, Sin fricción). Reviews and stats must look organic.
- ui-ux-pro-max CRITICAL tier: removing focus rings, icon-only buttons without `aria-label`, tap targets under 44×44, hover-only affordances, emoji as icons, placeholder-only form labels, disabling zoom, horizontal page scroll, raw hex in components (use the Tailwind token names).

**Declared exceptions (justified in `design-system/MASTER.md` §8, do not "fix" them):**
- The current variant's knowing rule-breaks (hand-rolled SVG illustrations, single marquee, dark cells, lime second accent, hero visualizer as 5th element, auto-cycling showcase, text wordmark logos) are enumerated and defended in MASTER.md §8. Read it before "correcting" any of them.
- If the client's real brand hex codes arrive, the palette swap happens in `globals.css` variables only.

**Known open violations:** visible address strings in `content/site.ts` (`sedes[]`, `allAddresses[]`) contain `—` before `PENDIENTE CONFIRMAR`. They are client placeholders; when real addresses land, the dashes go with them. Do not add new ones.

## File Line-Count Limits

Enforced via ESLint `max-lines` (`.eslintrc.json` overrides) on every `npm run lint`. Blank lines and comments don't count. No Husky hook yet: this folder is not a git repo; wire lint-staged when it becomes one.
Tailwind inline classes add ~30–50 lines vs CSS modules, so limits are adjusted accordingly.

| File type | Limit | Location pattern |
|---|---|---|
| Page / layout files | **120 lines** | `app/**/*.tsx` |
| Section & feature components | **200 lines** | `components/**/*.tsx` |
| Custom hooks | **40 lines** | `lib/hooks/**/*.ts` |
| Data & content | **300 lines** | `content/**/*.ts` |
| Type definitions | **200 lines** | `lib/types/**/*.ts` |
| Utility files | **80 lines** | `lib/**/*.ts` (excl. hooks & types) |

**Hook creation rule:** Only create a hook file when it has 3+ consumers OR contains genuinely complex logic (multiple state values, effects with cleanup). Do NOT create hooks that wrap fewer lines than they contain.

**Data file split rule:** When a data file exceeds 300 lines, split by domain, e.g. `content/sedes.ts`, `content/faq.ts`, re-exported from `content/site.ts`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
