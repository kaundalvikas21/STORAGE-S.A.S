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
- Durations: `--d-fast 220ms` · `--d 320ms` · `--d-slow 420ms`. Reveal: opacity 0→1 + translateY 8px→0, stagger 70ms after a 100ms delayChildren, `once: true` everywhere. Hero choreography runs on load (word rise 40ms apart, subline +150ms, CTAs +250ms, photo scale 1.04→1 over 1.2s); the hero photo is the only parallax on the page, capped at 6%.
- Hover: CTAs translateY(-2px) + shadow bloom; photos scale 1.05 in a fixed frame; nothing bounces hard.

### 6.1 Interaction tokens
Every hover/press/focus value is a variable — no magic numbers in JSX.
| Token | Value | Use |
|---|---|---|
| `--hover-lift` | `2px` | CTA / card `translateY(-var)` on hover |
| `--hover-scale` | `1.02` | card inner core swell on hover |
| `--press-scale` | `0.98` | `:active` on every tappable element (touch parity) |
| `--photo-zoom` | `1.05` | photo scale inside an `overflow-hidden` frame that never grows |
| `--ease-premium` | `var(--ease)` | alias — La Bóveda's curve is already the premium ease-out |
| `--transition-fast` | `var(--d-fast)` | alias — hover colour / underline draw |
| `--transition-base` | `var(--d)` | alias — lift, shadow bloom, icon nudge |

**Matrix** (every interactive element matches its row):
- Primary button: lift + `--sh-brass` bloom + `accent-deep`; `:active` press; focus ring 2px `--ring` offset 2.
- Ghost/secondary: tint fades in, ring darkens.
- Linked card: lift + shadow 1→2, photo zooms inside its frame, arrow nudges x+2px; the whole card is the `<Link>`.
- Text link: underline draws left→right (`.link-underline`, `--transition-fast`).
- Nav item: underline-draw + colour shift; `aria-current` keeps a persistent accent marker.
- FAQ row: background tint on hover; open rotates the `+` 45°, content height animates (`interpolate-size`).
- Sede card: reveals the "Cómo llegar" action row on hover; always visible on touch (`@media (hover: none)`).
- Logo row: opacity 60 → 100; track pauses on hover **and** `:focus-within`.
- Inputs: ring + label colour shift. *No form exists on this page yet (quote/calculator are external URLs) — the rule is recorded for when one lands.*
- `prefers-reduced-motion: reduce` → all transitions/animations 0ms, reveals render static, count-ups show final value.
- Only `transform` / `opacity` animate. `backdrop-blur` only on fixed elements (nav pill, hero glass badge is static inside a card — fine).

## 7. Component rules
- **Buttons**: pill, `px-6 py-3`, 15px/600. Primary = brass bg + ink text; Secondary = green 1.5px outline + green text; Ghost on dark = off-white outline. Trailing icon sits in its own 32px circle (`bg-black/5`). `cursor-pointer`, `focus-visible:ring-2 ring-offset-2`.
- **Cards**: double bezel — outer shell `bg-bg-deep ring-1 ring-line p-1.5 rounded-[--r-xl]`, inner core `bg-surface rounded-[calc(var(--r-xl)-6px)] shadow-sh-1`. Hover → `shadow-sh-2`, translateY(-2px).
- **Chips**: pill, `px-3 py-1`, 12px/500, `primary-soft` bg + primary text; wrap freely (`flex-wrap`, no `whitespace-nowrap` on long Spanish words).
- **Badges** carry an icon + text (meaning never by color alone).
- **Eyebrow** precedes every H2.
- **Imagery**: warm, human; `next/image`, Spanish descriptive alt, `sizes` set; never carries copy.
  Every slot lives in `content/images.ts` and renders through `<Photo>` — one warm `--accent-soft` multiply wash unifies mixed sources into one art-directed set. Images always sit **under** text in the hierarchy; HTML text carries the message.
- **Icons**: Phosphor `weight="light"`, 1.25–1.5rem.
- **Banned**: dark mode, neon, glassmorphism panels over content, purple/pink gradients, thin gray text on white, `linear`/`ease-in-out`, hex in JSX.

## 8. Declared rule-breaks
1. **Fraunces + beige/brass/ink** are on taste-skill's banned-default lists. Kept deliberately: the brief is vault / heritage trust, founded 2011. A real brand palette swaps in `globals.css` variables only.
2. **`--ease-premium` / `--transition-fast` / `--transition-base` are aliases**, not new values. The spec names them; La Bóveda already had `--ease` / `--d-fast` / `--d` for the same concepts. Aliasing keeps one speed per concept instead of two competing ones.
3. **WhatsApp is text, never a link.** The spec asks for click-to-contact; the CRO rule outranks it — every CTA routes to `/cotizar/` so the qualifying form is never bypassed.
4. **Hand-rolled line-art SVGs in `IntentCards`.** Phosphor has no "apartaestudio vs apartamento volume" glyph; the four illustrations encode growing scale, which is the section's whole point.
5. **`SizeStrip` shows four cards, only three carry photos.** "Personalizados" is the dark differential cell — photo-less by design, so the row never reads as four identical cards.
