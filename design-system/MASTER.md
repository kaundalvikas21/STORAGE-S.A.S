# DESIGN.md — Storage S.A.S · storagebogota.com
Variant: «La Bóveda» · Premium Trust (Soft Luxury) · Soft UI Evolution
Dials: DESIGN_VARIANCE 4 · MOTION_INTENSITY 4 · VISUAL_DENSITY 3

> Generated first with `ui-ux-pro-max` (`design-system/storage-sas/MASTER.md`: Flat Design, blue/orange, Inter + Playfair). That output is **overridden** here per the creative brief. This file is the single source of truth; `app/globals.css` mirrors it 1:1. Brand hex codes are pending from the client — every value is a CSS variable so the swap is one edit.

## 1. Colors (CSS variables, `:root`)
| Token | Value | Use |
|---|---|---|
| `--bg` | `#FAF8F5` | page background, warm off-white |
| `--bg-deep` | `#F3EFE9` | alternate section band, outer bezel shell |
| `--surface` | `#FFFFFF` | cards, inner cores |
| `--ink` | `#1A1F24` | headings, primary text (contrast on bg 15.2:1) |
| `--ink-2` | `#3D454D` | body text (9.4:1) |
| `--muted` | `#5F6973` | secondary text (5.6:1 on bg, ≥4.5 ok) |
| `--muted-2` | `#8A939C` | decorative only, never body text |
| `--line` | `rgba(26,31,36,0.08)` | hairlines |
| `--primary` | `#1E4D3B` | deep trust green — bands, secondary CTA outline, chips |
| `--primary-deep` | `#153829` | hover / overlay |
| `--primary-soft` | `#E4EEE8` | tinted surfaces |
| `--on-primary` | `#FAF8F5` | text on green |
| `--accent` | `#C8963E` | warm brass — primary CTA, numerals, rings, stars |
| `--accent-deep` | `#A87B2C` | CTA hover |
| `--accent-soft` | `#F5EBD8` | brass tints, badges |
| `--on-accent` | `#1A1F24` | text on brass (7.6:1) |
| `--ring` | `#C8963E` | focus-visible ring |

## 2. Typography
- Display: **Fraunces** (variable, opsz 9–144, wght 600) — `--font-display`. H1/H2/closing band/trust labels. `font-optical-sizing: auto`.
- Body: **Inter** — `--font-body`. 400/500/600. Numbers: `font-variant-numeric: tabular-nums` via `.tnum`.
- Scale (fluid, rem): `--t-xs .75` · `--t-sm .875` · `--t-base 1` · `--t-lg 1.125` · `--t-xl 1.375` · `--t-2xl clamp(1.75rem,1.3rem+1.6vw,2.25rem)` · `--t-3xl clamp(2.25rem,1.6rem+2.6vw,3.25rem)` · `--t-display clamp(2.5rem,1.5rem+4.2vw,4.5rem)`.
- Display line-height 1.05, letter-spacing -0.015em. Body 1.6. Eyebrow: 11px uppercase tracking .2em, weight 500.

## 3. Spacing
4-pt base. Section padding: `py-20` mobile → `py-28` md → `py-36` lg. Container max 1200px, gutters 20px mobile / 32px md / 40px lg. Card inner padding 24–32px. Grid gaps 16 mobile / 24 desktop.

## 4. Radius
`--r-sm 12px` · `--r-md 16px` · `--r-lg 24px` · `--r-xl 32px` (outer bezel) · `--r-pill 9999px`. Nested (double-bezel): inner = outer − shell padding.

## 5. Shadow (soft, layered, never harsh)
- `--sh-1`: `0 1px 2px rgba(26,31,36,.04), 0 4px 12px rgba(26,31,36,.05)`
- `--sh-2`: `0 2px 4px rgba(26,31,36,.04), 0 12px 32px rgba(26,31,36,.08)`
- `--sh-3` (hover bloom): `0 4px 8px rgba(26,31,36,.05), 0 24px 56px rgba(26,31,36,.12)`
- `--sh-brass`: `0 8px 24px rgba(200,150,62,.28)`
- Inset highlight on inner cores: `inset 0 1px 0 rgba(255,255,255,.6)`.

## 6. Motion
- Easing: `--ease: cubic-bezier(.32,.72,0,1)`. Springs (Framer): `stiffness 260, damping 28, mass .9`.
- Durations: `--d-fast 220ms` · `--d 320ms` · `--d-slow 420ms`. Reveal: opacity 0→1 + translateY 8px→0, stagger 60ms, once.
- Hover: CTAs translateY(-2px) + shadow bloom; photos scale 1.03 in a fixed frame; nothing bounces hard.
- `prefers-reduced-motion: reduce` → all transitions/animations 0ms, reveals render static, count-ups show final value.
- Only `transform` / `opacity` animate. `backdrop-blur` only on fixed elements (nav pill, hero glass badge is static inside a card — fine).

## 7. Component rules
- **Buttons**: pill, `px-6 py-3`, 15px/600. Primary = brass bg + ink text; Secondary = green 1.5px outline + green text; Ghost on dark = off-white outline. Trailing icon sits in its own 32px circle (`bg-black/5`). `cursor-pointer`, `focus-visible:ring-2 ring-offset-2`.
- **Cards**: double bezel — outer shell `bg-bg-deep ring-1 ring-line p-1.5 rounded-[--r-xl]`, inner core `bg-surface rounded-[calc(var(--r-xl)-6px)] shadow-sh-1`. Hover → `shadow-sh-2`, translateY(-2px).
- **Chips**: pill, `px-3 py-1`, 12px/500, `primary-soft` bg + primary text; wrap freely (`flex-wrap`, no `whitespace-nowrap` on long Spanish words).
- **Badges** carry an icon + text (meaning never by color alone).
- **Eyebrow** precedes every H2.
- **Imagery**: warm, human; `next/image`, Spanish descriptive alt, `sizes` set; never carries copy.
- **Icons**: Phosphor `weight="light"`, 1.25–1.5rem.
- **Banned**: dark mode, neon, glassmorphism panels over content, purple/pink gradients, thin gray text on white, `linear`/`ease-in-out`, hex in JSX.
