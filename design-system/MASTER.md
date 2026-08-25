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
- **Imagery**: full colour, unified by one contrast curve plus a light steel `mix-blend-multiply` cast (`soft`/`base`); `deep` + `mono` (grayscale) is reserved for photos carrying display copy, currently the closing CTA band, `paper` washes a bright photo back behind ink body text. `next/image`, Spanish alt; never carries copy.
- **Icons**: Phosphor `weight="regular"`, 16–22px. Stars in reviews are text glyphs `■/□` with an aria-label rating.
- **Banned**: gradients, glass/backdrop-blur, soft/blurred shadows, radius >2px, decorative dots, springs, serif fonts, cuteness. Style never reduces legibility of prices, addresses or hours.

## 8. Interaction tokens + state matrix
Aliases so the premium-polish matrix has names while §6 keeps the real values (one source, no second scale):
| Token | Value | Use |
|---|---|---|
| `--transition-fast` | `var(--d-fast)` 150ms | colour / border / underline draw |
| `--transition-base` | `var(--d-slow)` 240ms | photo zoom, accordion open |
| `--ease-premium` | `var(--ease)` | every interaction transition |
| `--hover-lift` | `-2px` | translateY on hover — in hard-offset language a "lift" is the ink shadow growing under the element, never a blur bloom |
| `--hover-press` | `4px` | `:active` translate, matches the `--sh-2` offset so the element lands flat on its own shadow |
| `--photo-zoom` | `1.05` | image scale inside a fixed `overflow-hidden` frame; the frame never grows |
| `--underline-d` | `200ms` | left→right underline draw on text links |

Matrix (utilities live in `app/globals.css`, applied by class — no per-component improvisation):
- **Primary / secondary / ghost button** (`.press`): hover `translateY(--hover-lift)` + shadow `--sh-2`→`--sh-3`; `:active` translate(4px,4px) + shadow none, 0ms (1-frame mechanical press, §5); focus-visible 2px `--ring` offset 2px.
- **Linked card** (`.cell-hover` + `group`): hover lifts to `--sh-2`, border/background strengthen, title takes `--primary-deep`, `→` affordance shifts; whole cell is the link.
- **Photo inside a card** (`.photo-frame`): scales to `--photo-zoom` on group hover/focus, `1.02` on `:active` for touch parity.
- **Text link / footer link** (`.link-draw`): underline draws left→right in `--underline-d`.
- **Nav item**: `.link-draw` + colour shift; `aria-current` gets a persistent orange marker.
- **FAQ row**: hover background tint; open rotates the `+` 45° into `×` and animates height via `::details-content` (progressive enhancement, instant open where unsupported).
- **Sede card**: the `Cómo llegar` action row is always visible (touch parity is the baseline, hover only strengthens it).
- **Logo row**: 60% opacity at rest → 100% on hover, `--transition-base`.
- Every hover state has an `:active` equivalent so touch gets feedback, and a `focus-visible` state that matches the hover intent.
- No form inputs exist on the homepage; the input row of the matrix lands with `/cotizar/`.

## 9. Photography
`content/images.ts` is the manifest: one entry per slot (`heroMain`, `siloBodegaje`, `siloMudanzas`, `sedeCalle197`…`sedePaloquemao`, `segmentHogar`, `segmentEmpresa`, `sizeSmall`…`sizeCustom`, `ctaClosing`, `bogotaBand`), each `{ src, alt, credit, blur }`. Client sede photographs swap in there and nowhere else (spec Open Item 1).
`components/Photo.tsx` is the only place `next/image` is configured: fill + `sizes`, `placeholder="blur"` from the manifest's 4 dominant-colour quadrants, and the §7 photo treatment (one contrast curve + a light steel `mix-blend-multiply` cast) so mixed sources read as one art-directed set. `priority` is passed on the hero image only. Images never carry copy.

## 10. Footer
- **Orange never fills the footer.** It appears only as the 8px keyline on the NAP plate and as
  label text on ink (`--primary` on `--ink` = 5.14:1). The plate itself is ink.
- **No alpha on any orange surface, ever.** Ink-on-orange starts at 5.14:1, so `ink/90` = 4.68 and
  `ink/80` = 4.12 — both below AA. The previous orange NAP block failed on three of five text
  styles for exactly this reason. Alpha de-emphasis stays legal on ink, where paper starts at
  16.57:1 (`bg/75` = 9.53, `bg/65` = 7.39, `bg/55` = 5.61 all pass).
- **Labels are 12px minimum**, mono, uppercase. 11px is below the floor for metadata/legal text.
- **Focus rings use the standard `--ring`.** Orange is visible on ink, so the `ring-ink` swap the
  old orange block needed is gone.
- **Four equal columns at `lg`, 2x2 at `md`.** Order is Bodegaje, Sedes en Bogotá, Mudanzas,
  Empresa: the sede index sits second so the two location-led lists read together. Its zones
  stack single-column inside the ~270px track. Known tradeoff, measured: a quarter-width sede
  index runs about 726px against a 208px neighbour, leaving dead space above the NAP plate. The
  earlier two-tier layout cut that to 102px and was traded away for the adjacency. Roughly half
  the height is placeholder bloat — every address still ends in `PENDIENTE CONFIRMAR`, forcing a
  3-line wrap; re-measure once the real addresses land before reopening the layout.
- **Columns are accordions below `md`, plain columns at and above it.** Progressive enhancement
  only: the server renders every `<details>` open, and JS collapses all but the first once it
  knows the viewport is narrow. Never invert this — forcing them open with `::details-content`
  would hide desktop content in browsers lacking that selector. `open` is set imperatively on the
  element, never as a React prop, so React does not fight the user's clicks.
- **All seven addresses stay as text**, each its own `label + <address>` pair, including the three
  identical Toberín strings. `content/images.ts`-style grouping by `zone` is visual only; the
  repetition is the local-SEO consistency signal (spec §01-3). Never dedupe.
- `.press` and `RevealRule` are unusable on the footer: both are ink-coloured
  (`--sh-2` is an ink shadow, `RevealRule` is `bg-ink/30`) and vanish on an ink surface. Use a
  paper-border invert for controls.
- **Rules are structural only — never decoration under a heading.** The footer earns exactly
  three at desktop: the footer boundary (`border-bg/25`), the masthead under the wordmark
  (`border-bg/15`), and the NAP plate frame (`border-bg/25`). Nothing else. Eight hairlines at four different widths read as noise;
  display type and the orange zone labels carry the hierarchy on their own, and spacing does
  the separating. Below `md` each accordion row keeps its own rule as tap affordance — that one
  is functional, not decorative. Boundary rules use `/25`, internal rules `/15`; do not mix.

## 11. Declared exceptions (do not "fix")
- Em/en dash ban upheld: every `—` from the brief is rendered `·` (ticker, sede codes, tags, marquee).
- Sede codes (`SEDE 01 · …`) are functional spec-sheet metadata per the brief, not section-number eyebrows.
- The closing-band marquee (`COTIZA HOY ·`) is brief-mandated, decorative (`aria-hidden`), pausable, and not a third CTA wording — the button says «Cotizar».
- Orange `#E8541D` is used only as block fill (with ink text) or large numerals on ink; small orange text on paper uses `--primary-deep`.
