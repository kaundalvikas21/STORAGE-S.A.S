# DESIGN.md — Storage S.A.S · storagebogota.com
Variant: «El Calculista» · Kinetic Interactive (bento, tool-first, Prompt 4)
Dials: DESIGN_VARIANCE 7 · MOTION_INTENSITY 7 · VISUAL_DENSITY 6

> Generated first with `ui-ux-pro-max` (`design-system/storage-sas/MASTER.md`: Flat Design, blue/orange, Inter + Playfair). That output is **overridden** here per the «El Calculista» brief. This file is the single source of truth; `app/globals.css` mirrors it 1:1. Brand hex codes are pending from the client — every value is a CSS variable so the swap is one edit. Supersedes «El Sistema» (kept on branch `el-sistema`); «El Contenedor» on `el-contenedor`, «La Bóveda» on `la-boveda`.

## 1. Colors (CSS variables, `:root`)
| Token | Value | Use |
|---|---|---|
| `--bg` | `#F5F6F8` | page canvas (cool gray between bento cells) |
| `--bg-deep` | `#14161B` | the dark featured-cell fill (one per band) |
| `--surface` | `#FFFFFF` | bento cells, cards |
| `--ink` | `#14161B` | headings (16.7:1 on bg) |
| `--ink-2` | `#333845` | body text (10.8:1 on bg) |
| `--muted` | `#565D6B` | secondary text (6.1:1) |
| `--muted-2` | `#5F6673` | captions (5.3:1 — passes AA everywhere) |
| `--line` | `#E3E6EC` | cell hairlines |
| `--primary` | `#3D5AFE` | electric indigo: CTAs, links, slider, active states (5.13:1 on white, 4.75:1 on bg) |
| `--primary-deep` | `#2A3EB1` | hover/pressed only (8.67:1) |
| `--primary-soft` | `#EAEDFF` | indigo tints: selected cells, iso-unit volume prism, Empresa cell |
| `--on-primary` | `#FFFFFF` | white on indigo (5.13:1) |
| `--accent` | `#C6F432` | lift lime — availability/positive FILLS only. Never text on light (1.28:1 on white) |
| `--accent-deep` | `#A9D71E` | lime chip border/hover |
| `--accent-soft` | `#F2FBD8` | lime tint (dark text on it: 16.9:1) |
| `--on-accent` | `#14161B` | dark text on lime (14.1:1) |
| `--ring` | `#3D5AFE` | focus-visible ring |

**Dark cells** (`.dark-cell` in globals.css): a local CSS-variable scope, not a dark mode. Inside it the same tokens resolve to: bg `#14161B`, surface `#1B1E26`, ink `#F5F6F8` (16.7:1), ink-2 `#C3C9D6`, muted `#9BA3B5` (7.2:1), line `rgba(255,255,255,.12)`, primary `#93A5FF` (7.8:1), on-primary `#14161B`, ring `#93A5FF`. Lime is NOT overridden — `--accent` on dark = 13-14:1, so lime numerals/chips work unchanged. Components stay zero-hex.

## 2. Typography
- Display: **Bricolage Grotesque** (variable, opsz 12-96) — `--font-display`. Headings 600-700, tracking -0.02em. Kinetic type ONLY in the hero (word-level rise on load); static everywhere else.
- Body: **Inter** — `--font-body`. `--font-mono` aliases body (safety net, unused).
- Scale: `--t-display clamp(2.75rem, 1.75rem + 3.5vw, 4.25rem)` (hero + closing; capped so the H1 holds 2 lines in the hero's left column) · `--t-3xl clamp(1.75rem,…,2.5rem)` · `--t-2xl clamp(1.25rem,…,1.5rem)`.
- Every m³ figure, range and stat in tabular numerals (`.tnum`).
- `.eyebrow`: 12px/500, tracking 0.08em, uppercase, `--muted`. Max 4 of 12 sections, and all 4 are now spent: Hero (the stats pill above the H1, `rounded-lg` while it wraps, `rounded-full` from `md`), SedeGrid, Reviews, FAQ. Adding a fifth means removing one.

## 3. Spacing
8-pt system. Section padding `py-14` mobile → `py-20` md → `py-24` lg. Container max 1280px, gutters 20/32/40px. Bento bands: `gap-4 md:gap-5` between cells, cell padding 24-40px.

## 4. Radius
`--r-sm 8px` (chips, pills, slider) · `--r-md 12px` (buttons, inputs, inner elements) · `--r-lg 16px` (bento cells) · `--r-xl 24px` (closing frosted panel, mega-menu). One system: cells 16, buttons 12, chips 8.

## 5. Shadow (dimensional, not glassy)
- `--sh-1: 0 1px 2px rgba(20,22,27,0.06)` resting cells · `--sh-2: 0 4px 16px rgba(20,22,27,0.07)` cell hover lift (pairs with `-translate-y-0.5`) · `--sh-3: 0 12px 32px rgba(20,22,27,0.10)` mega-menu, dark cells · `--sh-brass: var(--sh-1)` (legacy alias, unused).
- `:active` on buttons: `scale-[0.98]`. Layered subtle noise: `body::after` fixed grain overlay at 4% (feTurbulence data URI, `pointer-events-none`).

## 6. Motion (springy but disciplined)
- Easing `--ease: cubic-bezier(0.22, 1, 0.36, 1)` (spring-out). Durations `--d-fast 150ms` · `--d 300ms` · `--d-slow 450ms`.
- Reveals: opacity + 12px rise, 300ms spring (`bounce 0.2`), stagger 60ms, once (`whileInView`, -10% margin).
- Exactly three hero-level interactive moments: (1) hero word-stagger over the backdrop plate; (2) intent cards select an m³ profile and pre-fill the calculator deep link; (3) sede map pins highlight from card hover/focus (pure CSS `:has()`), Calle 197 pin pulses once.
- Restrained elsewhere: cell hover lift, marquee (single, pausable), snap-scroll reviews, magnetic Cotizar (≤8px, motion values only), count-ups once.
- `prefers-reduced-motion: reduce` → everything instant: H1 static, showcase frozen, marquee becomes a static wrapped row, count-ups show final value, magnetic inert.
- **Interaction tokens**: `--hover-lift: 2px` (card/button hover rise; the existing `-translate-y-0.5` utility equals it, so current card classes are conformant) · `--hover-scale: 1.02` (reserved for scale-based hover where lift doesn't fit) · `--photo-zoom: 1.05` (image scale inside an `overflow-hidden` frame on card hover, `--d-slow` timing; the frame never grows). Aliases NOT added: the polish brief's `--ease-premium` / `--transition-fast` / `--transition-base` are already `--ease` / `--d-fast` / `--d`; never duplicate them. Text links use an underline-draw (`.link-draw`, background-size 0→100% left→right, `--d-fast`); it never applies to buttons or cards.

## 7. Component rules
- **Buttons**: `--r-md`, ≥48px tall, sentence case, max 3 words, `font-medium`. Primary = indigo bg + white text; Secondary = white bg + `--line` border; Ghost = borderless neutral. `cursor-pointer`, visible focus ring.
- **Accordion** (`.faq-item`): native `<details name="faq">`, exclusive by HTML, no JS. Opening one panel closes its sibling; browsers without `name` support degrade to multi-open. Height animates via `::details-content` behind `@supports (interpolate-size: allow-keywords)`.
- **Cells/cards**: `--r-lg`, `--surface` fill, `1px --line` border, `--sh-1`; hover `--sh-2` + `-translate-y-0.5`. One dark featured cell max per band. Background diversity per band: white + dark + indigo-soft/photo.
- **Sede cards** (`SedeGrid`): photo band (`aspect-[16/7]`, `border-b --line`) over a `p-5` body: chips row, then a title row pairing the h3 with a persistent `ArrowRight` (no hover-revealed action row, so nothing reserves invisible space), address, then a `--line` divider pinned with `mt-auto` above the sizes and coverage lines so all cards share one bottom band.
- **Lime**: availability and positive states only ("Alta disponibilidad" chips, dark-cell stat numerals). Never body text, never on light without `--on-accent` treatment, never decorative.
- **Numbers**: `.tnum` always; `--primary` on light, `--accent` on dark cells.
- **Imagery**: `next/image` with Spanish alt in sede cards and the Bodegaje showcase; the iso-unit illustration is inline SVG consuming tokens. The sede map is a real Leaflet map (desktop-only cell): grayscale-filtered tiles (`.sede-tiles`), token-styled divIcon pins and popups, scroll-zoom off. Photography lives in one manifest (`content/images.ts`: src, Spanish alt, credit; the client's real sede photos swap there). Every photo renders through the `<Photo>` wrapper: `overflow-hidden` token-radius frame, `object-cover`, blur placeholder, a unifying `--primary-soft` multiply tint so mixed sources read as one art-directed set, optional bottom scrim (`--bg-deep` gradient) when text sits above, and `--photo-zoom` on card hover. Text is never baked into images. Exactly one photo carries `priority`: the hero backdrop, which IS the LCP element now that the hero has one; every other slot stays lazy so nothing competes with it.
- **Icons**: Phosphor 16-24px `weight="regular"` (stars `fill`). One family; no hand-rolled SVG icons.
- **Banned**: glass/backdrop-blur, gradient text, neon glows, three.js, scroll-jacking, autoplay video, second marquee, cursor gimmicks.

## 8. Declared exceptions (do not "fix")
1. **Hand-rolled SVG illustrations** (the `IsoBox` volume ladder in `IntentCards`, plus the noise data-URI): token-filled, `aria-hidden`, and stepped 0.55-1.0 so the four tiers read as a size ladder rather than four identical cards; each open unit holds the contents its hint copy names (cajas / cama + nevera / sofá + mesa / estibas apiladas) so picture and words agree. The scale steps replace the description "rather than four identical cards. The Phosphor-only rule covers *icons* and still stands.
1b. **External map tiles** (`SedeLeafletMap`): the only external asset host on the page. OSM tiles are a DEV PLACEHOLDER (OSMF policy forbids hard-coded commercial production use); the client's free MapTiler/Stadia key is PENDIENTE and swaps in `content/site.ts` `mapTiles` only. Attribution control must stay visible. Map chunk + tiles load only at lg+ (mobile never pays for them).
2. **Marquee** (`ClientLogos`): the single permitted marquee. CSS-only, pauses on hover/focus, static wrapped row under reduced motion.
3. **Dark inverted cells** (`.dark-cell`: SiloDoors featured, TrustBar, FAQ left): core to this variant's bento rhythm. A local variable scope, not a theme flip — the page theme stays light, locked.
4. **Second accent** (lime `--accent`): deliberately breaks the single-accent aliasing of El Sistema. Scope-limited to availability/positive states; contrast rules in §1.
5. ~~Hero 5th element~~ **(withdrawn)**: the hero carried an m³ visualizer as a declared fifth element. It was removed at the client's request; the hero is back to the canonical four (eyebrow, headline, subtext, CTAs) and the backdrop plate carries the right-hand side. Number kept so the §8.x references in code stay stable.
6. **Auto-cycling showcase** (Bodegaje featured cell): pausable via button + hover/focus, static under reduced motion. Not autoplay video.
7. **Client logos as text wordmarks** inside the marquee: placeholder until real vector marks arrive.
8. Em/en dash ban upheld in new copy (`·` and `→` only); the `—` before `PENDIENTE CONFIRMAR` in placeholder addresses leaves with the real addresses.
9. **Closing CTA pair**: brief asked for "No estoy seguro · calcular" (5 words). Adapted to an inline button row, primary `Cotizar` (magnetic) + secondary `Calcular mi espacio`, with the microcopy merged into one muted line *after* the buttons ("¿No estás seguro?" + the reassurance sentence). Respects the 3-word CTA cap and the single Calcular wording. The closing band's backdrop photo is the one `<Photo>` with `zoom={false}`: a full-bleed band is not a card, so `--photo-zoom` has no frame to move inside.
10. `AnimatedNumber` uses framer motion values (`useMotionValue` + `animate`), not a rAF loop touching React state.
11. **Frosted panel** (`ClosingBand`): the §7 glass/backdrop-blur ban holds everywhere except the closing band, where the message sits on `bg-surface/40 backdrop-blur-xl` inside a `--line` hairline at `--r-xl`. Justified because the band is the page's only full-bleed photo: the panel separates message from photograph without stacking another flat scrim. Measured against rendered pixels, the brightest backdrop under the panel is rgb(50,43,42), giving 12.8:1 / 8.4:1 / 5.5:1 for headline / body / microcopy. Where `backdrop-filter` is unsupported the 40% fill alone still clears AA.
12. **Hero backdrop photo** (`heroBackdrop` -> `/img/hero_img_bg.png`): the hero was photo-free by design; it now carries a full-bleed minibodega corridor. The plate is built with a bare light wall on the left, exactly where the H1 and CTAs sit, so the veil only has to cool it toward `--bg`: `bg-bg/80 lg:bg-bg/55` plus a `from-bg via-bg/85 to-bg/45 lg:via-bg/70 lg:to-bg/20` gradient. Heavier below `lg`, where `object-cover` crops the empty left band away. Measured on the rendered page with the text hidden, the darkest backdrop under the H1 is rgb(235,232,231) at 1280 and rgb(224,222,223) at 375, i.e. 14.9:1 and 13.5:1 for `--ink`. It is the LCP element and therefore the one `priority` photo (§7).
13. **Sede card overlay** (`SedeGrid`): the CLAUDE.md ban on pills/labels over images targets decorative editorial captions (`Plate · Brand`, `Field notes`). The sede card overlays three functional things on the photo scrim: the sede name, its zone, and the lime availability badge, which is the same signal the Leaflet map already overlays on the Calle 197 pin. Text uses `--on-primary` (the palette's white) because the light card's `--ink` is near-black. Measured on all four photos, the brightest point of the scrim under the name is rgb(41-49), giving 12.8-14.5:1 for the name and 7.0-7.9:1 for the zone at 75%. Scope-limited to these cards.
14. **FAQ row hover**: no background fill. `hover:bg-bg` painted the page background inside a `--surface` card, reading as a hole and colliding with the card's own corner radius on the first row. The row now shifts title and icon to `--primary`, matching the SiloDoors and SedeGrid card titles.
