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
- Scale: `--t-display clamp(2.75rem, 1.9rem + 4vw, 4.75rem)` (hero + closing) · `--t-3xl clamp(1.75rem,…,2.5rem)` · `--t-2xl clamp(1.25rem,…,1.5rem)`.
- Every m³ figure, range and stat in tabular numerals (`.tnum`).
- `.eyebrow`: 12px/500, tracking 0.08em, uppercase, `--muted`. Max 4 of 12 sections.

## 3. Spacing
8-pt system. Section padding `py-14` mobile → `py-20` md → `py-24` lg. Container max 1280px, gutters 20/32/40px. Bento bands: `gap-4 md:gap-5` between cells, cell padding 24-40px.

## 4. Radius
`--r-sm 8px` (chips, pills, slider) · `--r-md 12px` (buttons, inputs, inner elements) · `--r-lg 16px` (bento cells) · `--r-xl 24px` (hero visualizer cell, mega-menu). One system: cells 16, buttons 12, chips 8.

## 5. Shadow (dimensional, not glassy)
- `--sh-1: 0 1px 2px rgba(20,22,27,0.06)` resting cells · `--sh-2: 0 4px 16px rgba(20,22,27,0.07)` cell hover lift (pairs with `-translate-y-0.5`) · `--sh-3: 0 12px 32px rgba(20,22,27,0.10)` mega-menu, dark cells · `--sh-brass: var(--sh-1)` (legacy alias, unused).
- `:active` on buttons: `scale-[0.98]`. Layered subtle noise: `body::after` fixed grain overlay at 4% (feTurbulence data URI, `pointer-events-none`).

## 6. Motion (springy but disciplined)
- Easing `--ease: cubic-bezier(0.22, 1, 0.36, 1)` (spring-out). Durations `--d-fast 150ms` · `--d 300ms` · `--d-slow 450ms`.
- Reveals: opacity + 12px rise, 300ms spring (`bounce 0.2`), stagger 60ms, once (`whileInView`, -10% margin).
- Exactly three hero-level interactive moments: (1) hero word-stagger + live m³ visualizer (slider fills an isometric unit); (2) intent cards morph the visualizer via shared store; (3) sede map pins highlight from card hover/focus (pure CSS `:has()`), Calle 197 pin pulses once.
- Restrained elsewhere: cell hover lift, marquee (single, pausable), snap-scroll reviews, magnetic Cotizar (≤8px, motion values only), count-ups once.
- `prefers-reduced-motion: reduce` → everything instant: H1 static, visualizer swaps without transition, showcase frozen, marquee becomes a static wrapped row, count-ups show final value, magnetic inert.

## 7. Component rules
- **Buttons**: `--r-md`, ≥48px tall, sentence case, max 3 words, `font-medium`. Primary = indigo bg + white text; Secondary = white bg + `--line` border; Ghost = borderless neutral. `cursor-pointer`, visible focus ring.
- **Cells/cards**: `--r-lg`, `--surface` fill, `1px --line` border, `--sh-1`; hover `--sh-2` + `-translate-y-0.5`. One dark featured cell max per band. Background diversity per band: white + dark + indigo-soft/photo.
- **Lime**: availability and positive states only ("Alta disponibilidad" chips, dark-cell stat numerals). Never body text, never on light without `--on-accent` treatment, never decorative.
- **Numbers**: `.tnum` always; `--primary` on light, `--accent` on dark cells.
- **Imagery**: `next/image` with Spanish alt in sede cards and the Bodegaje showcase; illustrations (iso unit, map) are inline SVG consuming tokens.
- **Icons**: Phosphor 16-24px `weight="regular"` (stars `fill`). One family; no hand-rolled SVG icons.
- **Banned**: glass/backdrop-blur, gradient text, neon glows, three.js, scroll-jacking, autoplay video, second marquee, cursor gimmicks.

## 8. Declared exceptions (do not "fix")
1. **Hand-rolled SVG illustrations** (isometric unit in `IsoUnit`, Bogotá map in `SedeMap`, noise data-URI): brief-mandated illustrations. The Phosphor-only rule covers *icons* and still stands.
2. **Marquee** (`ClientLogos`): the single permitted marquee. CSS-only, pauses on hover/focus, static wrapped row under reduced motion.
3. **Dark inverted cells** (`.dark-cell`: SiloDoors featured, TrustBar, FAQ left): core to this variant's bento rhythm. A local variable scope, not a theme flip — the page theme stays light, locked.
4. **Second accent** (lime `--accent`): deliberately breaks the single-accent aliasing of El Sistema. Scope-limited to availability/positive states; contrast rules in §1.
5. **Hero 5th element**: the m³ visualizer (an interactive tool, not copy) — same precedent as El Sistema's segmented control. Its "Calcular con precisión →" is a contextual deep link into the calculator with state pre-filled, not a third CTA; the hero's CTA pair stays `Calcular mi espacio` + `Ver sedes`.
6. **Auto-cycling showcase** (Bodegaje featured cell): pausable via button + hover/focus, static under reduced motion. Not autoplay video.
7. **Client logos as text wordmarks** inside the marquee: placeholder until real vector marks arrive.
8. Em/en dash ban upheld in new copy (`·` and `→` only); the `—` before `PENDIENTE CONFIRMAR` in placeholder addresses leaves with the real addresses.
9. **Closing ghost CTA**: brief asked for "No estoy seguro · calcular" (5 words). Adapted to microcopy "¿No estás seguro?" + ghost `Calcular mi espacio` to respect the 3-word CTA cap and single Calcular wording.
10. `AnimatedNumber` uses framer motion values (`useMotionValue` + `animate`), not a rAF loop touching React state.
