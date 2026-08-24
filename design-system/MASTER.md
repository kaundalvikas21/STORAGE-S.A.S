# DESIGN.md — Storage S.A.S · storagebogota.com
Variant: «El Contenedor» · Industrial Swiss (Refined Brutalism, conversion-safe)
Dials: DESIGN_VARIANCE 8 · MOTION_INTENSITY 5 · VISUAL_DENSITY 7

> Generated first with `ui-ux-pro-max` (`design-system/storage-sas/MASTER.md`: Flat Design, blue/orange, Inter + Playfair). That output is **overridden** here per the «El Contenedor» brief. This file is the single source of truth; `app/globals.css` mirrors it 1:1. Brand hex codes are pending from the client — every value is a CSS variable so the swap is one edit. Supersedes the «La Bóveda» variant (kept on `main`).

## 1. Colors (CSS variables, `:root`)
| Token | Value | Use |
|---|---|---|
| `--bg` | `#F2F0EA` | paper substrate, page background |
| `--bg-deep` | `#E9E6DE` | alternate bands, hover fill |
| `--surface` | `#FAF9F4` | cards / cells |
| `--ink` | `#111111` | carbon ink: text, 1.5–2px borders, dark bands (contrast on bg 16.4:1) |
| `--ink-2` | `#2B3033` | body text (12.4:1) |
| `--muted` | `#4A5459` | steel: secondary text (6.7:1) |
| `--muted-2` | `#7D868B` | decorative only, never body text |
| `--line` | `rgba(17,17,17,0.15)` | hairline rules |
| `--primary` | `#E8541D` | safety orange — CTAs + priority markers ONLY. 3.2:1 on paper → blocks/large text only, never small text on paper |
| `--primary-deep` | `#C43F10` | hover; 4.5:1 on paper, ok for links |
| `--primary-soft` | `#FBE3D8` | rare tint |
| `--on-primary` | `#111111` | ink on orange (5.2:1) — text on orange is always ink |
| `--accent` | `#4A5459` | steel — duotone overlays, secondary UI |
| `--accent-deep` | `#333B3F` | steel hover |
| `--accent-soft` | `#DDE1E2` | steel tint |
| `--on-accent` | `#F2F0EA` | paper on steel |
| `--ring` | `#E8541D` | focus-visible ring |

## 2. Typography
- Display + body: **Space Grotesk** — `--font-display` (`--font-body` aliases it). Display 700, tracking -0.03em, line-height 0.92–0.95, UPPERCASE via CSS (`text-transform`), never in source text. H1 clamps to ~110px desktop.
- Metadata / numbers / addresses / eyebrows / nav: **IBM Plex Mono** — `--font-mono`, 400/500/700, 11–14px, tracking 0.06–0.14em, uppercase.
- Scale: `--t-2xl clamp(1.5rem,…,2rem)` · `--t-3xl clamp(2rem,…,3.25rem)` · `--t-display clamp(2.75rem,…,6.875rem)`. Body 15–16px, line-height 1.6.
- Eyebrows: mono functional labels, max 4 sections (IntentCards, SedeGrid, Reviews, FAQ).

## 3. Spacing
4-pt base, denser than La Bóveda: section padding `py-14` mobile → `py-20` md → `py-24` lg. Container max 1280px, gutters 20/32/40px. Cell padding 20–36px. Grids use `gap-px` over an ink parent for razor-thin rules.

## 4. Radius
`--r-sm 0` · `--r-md/lg/xl 2px`. Corners are 90°; 2px only where a hard corner aliases badly.

## 5. Shadow (hard offsets, zero blur)
- `--sh-1: 2px 2px 0 var(--ink)` · `--sh-2: 4px 4px 0 var(--ink)` · `--sh-3: 6px 6px 0 var(--ink)` · `--sh-brass: 4px 4px 0 var(--primary)` (orange offset, name kept so `tailwind.config.ts` is untouched).
- Buttons carry `--sh-2` and press flat: `:active { translate(4px,4px); shadow none }`, no transition (1-frame mechanical).

## 6. Motion
- Easing `--ease: cubic-bezier(0,0,.2,1)` (ease-out) or linear. Durations `--d-fast 150ms` · `--d 180ms` · `--d-slow 240ms`. No springs, no blur, no bounce.
- Reveals: opacity + 10px hard rise, stagger 40ms, once. Signature move: hairline rule line-draw (`scaleX 0→1`, linear 250ms) under section headers.
- Marquee (`.marquee-track`): closing band only, pauses on hover and under `prefers-reduced-motion` (→ static, fully legible).
- `prefers-reduced-motion: reduce` → everything 0ms, count-ups show final value.

## 7. Component rules
- **Buttons**: square (radius 0–2px), `1.5px` ink border, uppercase, ≥48px tall. Primary = orange bg + ink text; Secondary = paper bg + ink border; Ghost (on ink bands) = paper outline. All use the press effect. `cursor-pointer`, visible focus ring.
- **Cards/cells**: `1.5px` ink border, flat `--surface`; grids compartmentalized with `gap-px` ink rules. Reviews cards add `--sh-2` offset. No double bezels.
- **Metadata**: mono uppercase — sede codes (`SEDE 01 · …`), m³ ranges, addresses, hours. Functional labels, not decoration.
- **Imagery**: documentary duotone — `grayscale` + steel `mix-blend-multiply` overlay; `next/image`, Spanish alt; never carries copy.
- **Icons**: Phosphor `weight="regular"`, 16–22px. Stars in reviews are text glyphs `■/□` with an aria-label rating.
- **Banned**: gradients, glass/backdrop-blur, soft/blurred shadows, radius >2px, decorative dots, springs, serif fonts, cuteness. Style never reduces legibility of prices, addresses or hours.

## 8. Declared exceptions (do not "fix")
- Em/en dash ban upheld: every `—` from the brief is rendered `·` (ticker, sede codes, tags, marquee).
- Sede codes (`SEDE 01 · …`) are functional spec-sheet metadata per the brief, not section-number eyebrows.
- The closing-band marquee (`COTIZA HOY ·`) is brief-mandated, decorative (`aria-hidden`), pausable, and not a third CTA wording — the button says «Cotizar».
- Orange `#E8541D` is used only as block fill (with ink text) or large numerals on ink; small orange text on paper uses `--primary-deep`.
