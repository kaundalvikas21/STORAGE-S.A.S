# DESIGN.md — Storage S.A.S · storagebogota.com
Variant: «El Sistema» · Editorial Minimal (Linear/Notion register, Prompt 3)
Dials: DESIGN_VARIANCE 3 · MOTION_INTENSITY 3 · VISUAL_DENSITY 5

> Generated first with `ui-ux-pro-max` (`design-system/storage-sas/MASTER.md`: Flat Design, blue/orange, Inter + Playfair). That output is **overridden** here per the «El Sistema» brief. This file is the single source of truth; `app/globals.css` mirrors it 1:1. Brand hex codes are pending from the client — every value is a CSS variable so the swap is one edit. Supersedes «El Contenedor» (kept on branch `el-contenedor`) and «La Bóveda» (`main`).

## 1. Colors (CSS variables, `:root`)
| Token | Value | Use |
|---|---|---|
| `--bg` | `#FFFFFF` | page background |
| `--bg-deep` | `#F7F7F5` | alternate fills, hover fills (same tone as surface — one neutral family) |
| `--surface` | `#F7F7F5` | cards, closing band, footer, segmented-control track |
| `--ink` | `#16181D` | headings, primary text (17.8:1 on white; not pure #000) |
| `--ink-2` | `#343941` | body text (11.6:1) |
| `--muted` | `#5A6069` | secondary text (6.3:1) |
| `--muted-2` | `#6E7480` | captions only, ≥15px (4.69:1) |
| `--line` | `#E6E6E2` | hairline borders — the structural device, instead of shadows |
| `--primary` | `#2456E6` | the single accent: CTAs, links, active states, stat numbers (5.92:1 on white, 5.52:1 on surface) |
| `--primary-deep` | `#1B41B8` | hover (8.4:1) |
| `--primary-soft` | `#EEF2FD` | tints: badges, active segment wash |
| `--on-primary` | `#FFFFFF` | white on blue (5.92:1) |
| `--accent` | `#2456E6` | aliases `--primary` — single-accent rule, see §8 |
| `--accent-deep` | `#1B41B8` | aliases `--primary-deep` |
| `--accent-soft` | `#EEF2FD` | aliases `--primary-soft` |
| `--on-accent` | `#FFFFFF` | aliases `--on-primary` |
| `--ring` | `#2456E6` | focus-visible ring |
| `--on-photo` | `#FFFFFF` | text over `--photo-scrim-deep` photo bands (closing CTA) |

## 2. Typography
- Display + body: **Instrument Sans** (variable) — `--font-display`; `--font-body` and `--font-mono` alias it (mono died with El Contenedor; the alias is a safety net). Headings 600, tracking -0.02em, tight leading; sentence case, no `text-transform`.
- Scale 64/40/24/18/15: `--t-display clamp(2.5rem,…,4rem)` · `--t-3xl clamp(1.75rem,…,2.5rem)` · `--t-2xl clamp(1.25rem,…,1.5rem)`; body `text-lg` (18px) / `text-[15px]`. Type does 90% of the visual work.
- Every m³ figure and stat uses tabular numerals (`.tnum`).
- `.eyebrow`: Instrument Sans 12px/500, tracking 0.08em, uppercase, `--muted`. Max 4 sections (SedeGrid, Reviews, FAQ in use = 3).

## 3. Spacing
8-pt system. Section padding `py-14` mobile → `py-20` md → `py-24` lg (HowItWorks is a slim `py-14/16` row). Container max 1280px, gutters 20/32/40px. Card padding 24–40px. Grids use real `gap-*` with hairline-bordered cells — never `gap-px` over ink.

## 4. Radius
`--r-sm 6px` (buttons, chips, segmented control) · `--r-md 8px` · `--r-lg 8px` (cards) · `--r-xl 12px` (mega-menu panel). One radius system, applied everywhere.

## 5. Shadow (hairlines first, ≤ sm)
- Borders do the separation; shadows are near-invisible depth cues: `--sh-1: 0 1px 2px rgba(22,24,29,0.05)` · `--sh-2: 0 1px 3px rgba(22,24,29,0.06)` · `--sh-3: 0 4px 12px rgba(22,24,29,0.07)` (mega-menu only) · `--sh-brass: var(--sh-1)` (legacy name kept so `tailwind.config.ts` is untouched; unused).
- No hard offsets, no press effect. `:active` on buttons: `scale-[0.98]`.

## 6. Motion (barely there)
- Easing `--ease: cubic-bezier(0,0,.2,1)`. Durations `--d-fast 150ms` · `--d 150ms` · `--d-slow 200ms`.
- Reveals: opacity + 24px rise on a soft spring, stagger 70ms, once (parameters in §6b). Motion clarifies, never decorates.
- Exactly two signature moments: (1) the hero segmented control's 150ms answer fade; (2) the HowItWorks connecting hairline drawing on scroll (`scaleX 0→1`, 300ms ease-out).
- `prefers-reduced-motion: reduce` → everything 0ms, count-ups show final value, answer swaps instantly.

## 6b. Interaction tokens (premium polish pass)
| Token | Value | Use |
|---|---|---|
| `--ease-premium` | `cubic-bezier(0.22, 1, 0.36, 1)` | every hover/press/reveal transition |
| `--transition-fast` | `150ms` | colour, header compress, arrow nudge |
| `--transition-base` | `250ms` | lift, photo zoom, logo, FAQ height |
| `--hover-lift` / `--card-lift` | `2px` / `3px` | primary button translateY (`--card-lift` reserved; image cards do not move) |
| `--hover-scale` | `1.02` | reserved (chips) |
| `--photo-zoom` | `1.05` | photo inside a hovered card, frame never grows |
| `--transition-photo` / `--ease-smooth` | `700ms` / `cubic-bezier(0.33, 1, 0.68, 1)` | hover zooms and the illustration wash crossfade: long, decelerating, GPU-composited (`will-change: transform`), so they glide instead of snapping |
| `--utility-h` | `34px` | header utility bar; the header translates by this on scroll-down |

Interaction matrix (globals.css `@layer components`): PRIMARY BUTTON lift + `--sh-3` bloom + brightness 1.05, active scale .98, focus 2px ring offset 2, arrow x+4 · SECONDARY/GHOST bg tint + border darkens · CARD `.card`: the card never lifts or scales (client rule); border `--muted-2` + `--sh-3`, `.photo img` zooms to `--photo-zoom` inside the frame, `.card-title` → primary, `.card-arrow` slides in (always visible on touch); `:active` border → `--primary` · TEXT LINK / NAV `.link-draw`: underline draws left→right 200ms, `aria-current="page"` keeps it drawn · FAQ `.faq-row` tint, `.faq-icon` rotates 45°, `::details-content` height where supported · SEDE CARD `.card-reveal` action row (hover enhancement, static on touch) · LOGO `.logo` grayscale + 60% → full. Every hover has an `:active` scale .98 twin; every focusable element shows the same ring.

Scroll motion (components/motion/): `<Reveal>` opacity 0→1 + y 24→0, spring 110/20, once, viewport margin -12% · `<RevealStagger>`/`<RevealItem>` staggerChildren 0.07, delayChildren 0.1 on every grid · `<CountUp>` 1.2s ease-out once, `.tnum` · `<Parallax>` ≤6% translateY on the hero and closing photos only. Hero load choreography is CSS (`.hero-rise`, `.hero-photo`), so the H1 is in the DOM immediately. Reduced motion: every primitive becomes a 120ms opacity fade (`lib/motion.ts` `fade`, plus the global media query). No-JS: `<noscript>` in app/layout.tsx forces `[data-motion]` visible.

## 7. Component rules
- **Buttons**: `--r-sm`, ≥48px tall, sentence case, max 3 words, `font-medium`. Primary = blue bg + white text; Secondary = white bg + `--line` border, ink text; Ghost = borderless neutral (hover `--surface`). Arrow icon slides 4px on hover. `cursor-pointer`, visible focus ring.
- **Cards**: `--r-lg`, `1px --line` border, `--surface` or white fill, no shadow. Hover: border darkens to `--muted-2` + arrow slide. SiloDoors' Bodegaje card alone carries a 2px `--primary` top border + «Recomendado».
- **Numbers**: every stat, range and price in `.tnum`; stat numbers in `--primary`.
- **Imagery**: one manifest, `content/images.ts` (semantic slots: heroMain, sede*, silo*, segment*, size*, ctaClosing), rendered only through `<Photo>`: `next/image` fill, `sizes`, quality 70, dominant-colour blur placeholder, `priority` on the hero only. One treatment for every source: `saturate(--photo-saturate)` + token scrim (`--photo-scrim` bottom gradient on cards, `--photo-scrim-deep` flat under text). Images sit under HTML text, never carry it. Alt text is descriptive Colombian Spanish. Client photos replace the Unsplash sources in the manifest only.
- **Icons**: Phosphor 16–24px, `weight="regular"` (stars `weight="fill"` in `--primary`). One family, no hand-rolled SVG.
- **Banned**: gradients, glass/backdrop-blur, shadows deeper than `--sh-3`, second accent colors, italic flourishes, marquees, decorative animation, dark inverted sections.

## 8. Declared exceptions (do not "fix")
- Premium polish pass overrides three §7 bans on purpose: the header gains `backdrop-blur` + `--sh-2` once scrolled past 24px (compressed sticky state), photo frames use a bottom gradient scrim (a photo device, not a decorative gradient), and the closing band is a dark photo band with `--on-photo` text (contrast ≥ 7:1 through `--photo-scrim-deep`). Everywhere else the hairline-first rules stand.
- The hero photo (`/img/hero_img_bg_2.png`, art-directed with an empty light left half) is a full-bleed background on lg under `.photo-scrim-hero` (left-weighted `--ink` gradient, 72%→6%) with the text stack in `--on-photo` (≥ 4.9:1 on the lightest pixels of the text column); below lg it renders as a framed image under the text stack. It is the only `priority` image and the H1 remains the first paint.
- Size cards (`SizeStrip`) show the client's transparent illustrations (`/img/small|medium|big|customized.png`) over `.illus-wash`, a token gradient (`--primary-soft` → `--bg` → `--surface`) that drifts on hover. Client-requested; the only decorative gradient on the page.
- Em/en dash ban upheld: `·` and `→` are the only separators in new copy; the `—` before `PENDIENTE CONFIRMAR` in placeholder addresses (`content/site.ts`) leaves with the real addresses.
- The hero contains a 5th element beyond the 4-text-element cap: the size-checker segmented control. Brief-mandated ("the hero ANSWERS, not just announces"); it replaces the IntentCards section, it is an interactive control, not copy.
- HowItWorks uses numbered verbs `01 Calculas · 02 Cotizas · 03 Te mudas` — brief-mandated 3-step row. These are content verbs, not the banned generic `Paso 1/2/3` labels.
- Single-accent rule: the `accent*` token family aliases `primary*` so the token names (and `tailwind.config.ts`) survive a future brand swap; do not "diversify" it.
- SiloDoors renders 3 cards in a row, but the first (Bodegaje, the money silo) is structurally differentiated: accent top border + «Recomendado» tag. Not three identical cards.
