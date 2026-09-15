# CLAUDE.md
# storagebogota - Project Guidelines

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # next dev on :3000
npm run build   # next build — the only type-check; run before declaring work done
npm run lint    # eslint . (eslint.config.mjs, eslint-config-next + max-lines)
node --experimental-strip-types scripts/check-conversion.mjs   # asserts for lib/calculator.ts + lib/lead.ts
```

No test suite beyond that self-check. Git repo; design variants live on branches.

## What this is

Marketing site for Storage S.A.S (minibodegas, Bogotá), Spanish (`es-CO`). Next.js 16 App Router (`searchParams` is a Promise), React 19, Tailwind 3, framer-motion, Phosphor icons. Routes: `/` (`app/(site)/page.tsx`), `/bodegaje-bogota/` silo pillar (`app/(site)/bodegaje-bogota/page.tsx`, blocks `PillarIntro`/`AxisChooser`/`IncludedGrid`/`PriceBand`/`FaqAccordion` in `components/bodegaje/` plus the homepage `SegmentStrip` reused with `title`/`body`/`href` props, copy in `bodegajePillar`; size and segment cards point at `/cotizar/` until those pages ship, marked `SWAP`), `/sedes/` hub (`app/(site)/sedes/page.tsx`, blocks in `components/sedes/`, copy in `sedesHub`), the four sede pages `/sedes/{slug}/` (`app/(site)/sedes/[slug]/page.tsx`, static params from `sedePages`, unknown slugs 404; per-page data in `sedeDetails`, shared labels in `sedePage`, blocks `SedeHero`/`SedeGallery`/`SizesAtSede`/`AccessSecurity`/`SedeLocation`/`ZonesServed`/`SedeReviews` in `components/sedes/`, one `selfStorage()` JSON-LD per physical point), `/cotizar/` and `/calculadora-de-espacio/` (`app/(conversion)/`), `POST /api/lead` (`app/api/lead/route.ts`). `trailingSlash: true`. Brief and wireframe: `Storage_SAS_Wireframe_Silo_Spec.xlsx` / `Storage_SAS_Wireframe_Visual.html`; inner pages use the spec's URLs only, never invented slugs. The site may be rebuilt in WordPress after approval: content stays in plain typed objects, sections stay self-contained blocks, calculator/lead logic stays framework-free, no server actions.

## Architecture (the parts that span files)

**Content is split by domain, imported through `content/site.ts`.** `facts.ts` (URLs, `company`/NAP, size bands `sizes` with `id`/`label`/`maxM3`, `trust` stats, `securityLine`), `sedes.ts`, `segments.ts`, `faqs.ts` (`faq`, `calcFaq`), `conversion.ts` (page copy for /cotizar/ and the calculator), `engagement.ts`, `bodegaje.ts` (pillar copy); `site.ts` keeps nav/footer/silos/steps/reviews/clients and re-exports the rest. Components import from it (client components may import the domain file directly to keep bundles small); no prose or contact data hardcoded in JSX. Values tagged `PENDIENTE CONFIRMAR` are awaiting the client: swap them there only. Never invent prices, dimensions, reviewer names or phone numbers.
- `sedes[]`: one entry per physical point (7), each with its map coordinates; `allAddresses` and `sedePages` (one per sede page, for menus) are derived from it. Names/addresses come from the client's "Estamos en toda Bogotá" banner (Toberín 1/2/4, Paloquemao 1/2), nomenclature still PENDIENTE CONFIRMAR. Autopista Norte (id `autopista-norte-197`) must stay first in the array and in the server-rendered order. The only re-sort is `SedeList`'s opt-in "Ordenar por cercanía" after the visitor grants location (client checklist 2026-09). Never randomize. Card↔pin highlight rules in `globals.css` are keyed by sede `id`: add one when adding a sede.
- Engagement config (newsletter / exit pop-ups, social feed) lives in `content/engagement.ts`, re-exported from `site.ts`.
- Every CTA goes to `QUOTE_URL` / `CALC_URL`. **The only wa.me link in rendered pages is the floating WhatsApp bubble** (`components/WhatsAppWidget.tsx`, mounted once in `app/layout.tsx`, `BackToTop` in its column; client request 2026-09-15, declared R4 exception in MASTER.md §8.18): on every route, greeting "Estamos disponibles, chatea ahora" after load until dismissed (session), click opens WhatsApp with `company.whatsapp` + `whatsappWidget.message`. No bot yet (chatbot integration later). Every other CTA (header, hero, Cotizas step, ContactBand, exit pop-up) stays on `/cotizar/` / the calculator. WhatsApp URLs are built only by `waChatUrl()` in `lib/lead.ts`. The /cotizar/ form submits: POST `/api/lead` (forwards to `LEAD_WEBHOOK_URL` when set; CRM endpoint is spec Open Item 12) → `dataLayer.push` (GTM ID TODO) → WhatsApp prefilled. If the POST fails WhatsApp still opens. Calculator hands off with `/cotizar/?tamano=<band id>`; `?sede=<id or slug>` pre-selects the sede.
- `lib/calculator.ts`, `lib/lead.ts` and `lib/maps.ts` (Google Maps / Waze deep links by address) have zero imports (data passed in as arguments) so they port verbatim to a WordPress widget; keep them that way and extend `scripts/check-conversion.mjs` when their logic changes.
- Chrome lives in route-group layouts, never in pages: `app/(site)/layout.tsx` (Header, Footer, MobileStickyBar, Popups) and `app/(conversion)/layout.tsx` (`ConversionHeader` logo + phone, `NapBand` footer, sticky bar with Llamar only). The root `app/layout.tsx` has fonts, skip link, Organization/WebSite JSON-LD and the WhatsApp bubble. Every page's `<main>` needs `id="main" tabIndex={-1}`. Inner pages add `<Breadcrumb>` (emits BreadcrumbList), `export const metadata = pageMeta(...)` (sets canonical; the root sets none) and `SchemaScript` + builders from `lib/schema.ts`.
- The social feed is a post grid rendered from `content/social-posts.ts` (a dated SNAPSHOT of the client's real posts; images in `public/social/`). Profiles + `snapshotDate` live in `content/engagement.ts`. `npm run social:sync` (`scripts/fetch-social.mjs`, needs `INSTAGRAM_TOKEN`/`IG_USER_ID`, optional `FACEBOOK_TOKEN`/`FB_PAGE_ID`) regenerates both from the Graph API; without tokens it is a no-op. No iframes, no keys in the repo.
- `faq`/`calcFaq` and `company`/`nav` also feed JSON-LD (`app/(site)/page.tsx` and the calculator page FAQPage, `app/layout.tsx` Organization/WebSite/ItemList), so edits propagate to schema automatically.

**Design tokens flow MASTER.md → globals.css → tailwind.config.ts.** `design-system/MASTER.md` (currently the «El Calculista» variant; other variants live on the `la-boveda` / `el-contenedor` / `el-sistema` branches) is the source of truth; `app/globals.css` mirrors it 1:1 as CSS variables; `tailwind.config.ts` maps every color/radius/shadow/font/duration to those variables. Add a token in all three, in that order. `design-system/storage-sas/` is the superseded ui-ux-pro-max baseline — don't use it. The palette now comes from the client's logo (yellow `--brand` CTA fill, near-black `--primary`, kraft `--accent`); everything stays a variable so a refined brand spec is still a one-file swap.

**Fonts:** Bricolage Grotesque (`--font-display`, variable opsz) + Inter (`--font-body`) loaded via `next/font/google` in `app/layout.tsx`.

**Motion:** `lib/motion.ts` defines the shared `snap`/`rise`/`stagger` variants. `components/Reveal.tsx` (`Reveal`, `RevealItem` named export — not `Reveal.Item`) is the scroll-reveal wrapper; it renders static markup under `prefers-reduced-motion`. Use it rather than hand-rolled `motion.*` in sections.

**Server/client split:** sections are server components by default. Only `Header` (+ `header/MegaMenu`, `header/MobileDrawer`), `Reveal`, `AnimatedNumber`, `IntentCards`, `ShowcaseCycler`, `ScrollRow`, `Magnetic`, `SedeMap` + `SedeLeafletMap` (Leaflet, lg-only lazy chunk), `SedeList` (lays out the sedes header tools, map and cards it receives server-rendered as props; owns the nearest-first sort) `SocialGrid` (post filter; `SocialTile` itself is a server component), `Popups` (newsletter + exit-intent `<dialog>`, mounted in `app/(site)/layout.tsx`), `WhatsAppWidget` + `BackToTop` (mounted in `app/layout.tsx`) and `conversion/QuoteForm` + `conversion/Calculator` are `"use client"`. `Photo` (components/Photo.tsx, renders content/images.ts slots) is a server component. Keep that boundary — importing a client-only hook into a section without the directive is the build error that bit last time.

**Page order is SEO-locked.** `app/(site)/page.tsx` DOM order follows wireframe T1; mobile reorders (zone selector under hero) use CSS `order-*` on the flex column, never JSX reordering.

`public/img/` holds the hero background plates (`hero_img_bg*.png`, 1672x941, shot with an empty left band for the headline); the hero uses `hero_bg.png` (yellow-door facility, forklift, Monserrate; the earlier `hero_img_bg_1..3` plates are unused). Every other photo slot (Bodegaje showcase `showcase-1..3`, Mudanzas `silo-mudanzas`, segments `segment-hogar`/`segment-empresa`, closing `cta-closing`, 7 sede thumbnails `sede-*`) is a generated local image mapped in `content/images.ts`; `sede-alt-3` is the /sedes/ coverage photo (`coveragePhoto`); sede page galleries are `sedeGallery` (keyed by slug, 4 each, no photo repeated across pages: the sede facades, `sede-alt-2` on Autopista Norte, `segment-empresa-alt` on Paloquemao, plus the 1536x1024 `sede-autopista-norte-acceso/-pasillo`, `sede-toberin-pasillo`, `sede-spring-entrada/-pasillo/-bodega`, `sede-paloquemao-carga`); `zonePhotos` (keyed by slug) is the catchment photo beside each sede page's ZonesServed prose (`zona-sabana-norte`, `zona-usaquen-cedritos`, `zona-suba-colina`, `zona-centro-paloquemao`; a slug without one keeps the band in one column); `sede-alt-1` is the /bodegaje-bogota/ intro photo (`pillarPhoto`). No external image host remains (the Unsplash `remotePatterns` entry was removed from `next.config.mjs`). Social posts live in `public/social/`.

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
- Two CTAs with the same intent. Here: one "Calcular" intent (`CALC_URL`) and one "Cotizar" intent (`QUOTE_URL`, plus "Ver mi cotización" as the calculator hand-off only); do not add another wording of either. The /cotizar/ submit "Enviar y continuar por WhatsApp" is the declared 5-word exception (MASTER.md §8.18).
- CTA label that wraps at desktop. Max 3 words.
- Button/form contrast below WCAG AA (4.5:1 body, 3:1 large). No ghost buttons over photos without a scrim.
- Hero stack beyond 4 text elements (eyebrow, headline, subtext, CTAs). Trust strips, logo rows, pricing teasers, taglines under CTAs all move below the hero.
- Eyebrow micro-labels (`uppercase tracking-*`) on more than `ceil(sections/3)` sections.
- Decoration tells: section-number eyebrows (`01 · Sedes`), version labels/footers, scroll cues, colored status dots, crosshair grid lines, locale/time/weather strips, hero-bottom word strips (`BODEGAS · BOGOTÁ · 2011`), rotated vertical text, `<br>`-split italic headlines, pills/credits overlaid on photos, generic step labels (`Paso 1/2/3`), "Quietly trusted by" style headers, micro-meta sentences under eyebrows.
- `border-t` + `border-b` on every row of a list; `<ul divide-y>` for lists over 5 items.
- Fake data: generic names, egg avatars, round numbers (`99.99%`, `50%`), filler verbs (Eleva, Revoluciona, Sin fricción). Reviews and stats must look organic.
- ui-ux-pro-max CRITICAL tier: removing focus rings, icon-only buttons without `aria-label`, tap targets under 44×44, hover-only affordances, emoji as icons, placeholder-only form labels, disabling zoom, horizontal page scroll, raw hex in components (use the Tailwind token names).

**Declared exceptions (justified in `design-system/MASTER.md` §8, do not "fix" them):**
- The current variant's knowing rule-breaks (hand-rolled SVG volume boxes + noise, single marquee, dark cells, kraft/yellow second accent, auto-cycling showcase, PNG client logos, closing frosted panel, hero backdrop photo, sede name/badge over the card photo) are enumerated and defended in MASTER.md §8. Read it before "correcting" any of them.
- If the client's real brand hex codes arrive, the palette swap happens in `globals.css` variables only.

**Known open placeholders:** sede street nomenclature and coordinates in `content/sedes.ts` are PENDIENTE CONFIRMAR, as are the phone/email in `content/facts.ts` (Open Item 7), the CRM webhook (Open Item 12), the GTM container ID and the response-time promise.

## File Line-Count Limits

Enforced via ESLint `max-lines` (`eslint.config.mjs` overrides) on every `npm run lint`. Blank lines and comments don't count. No Husky hook yet; wire lint-staged when needed.
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
