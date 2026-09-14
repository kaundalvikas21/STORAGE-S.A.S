import type { CSSProperties } from "react";
import { Fragment } from "react";
import Button from "@/components/Button";
import Photo from "@/components/Photo";
import { heroBackdrop } from "@/content/images";
import { CALC_URL, SEDES_URL } from "@/content/site";

const H1 = "Minibodegas y bodegaje en Bogotá";

/**
 * Server component. The H1 is static SSR HTML (LCP element); the word-level rise
 * is pure CSS (.hero-word) animating transform/opacity only, so text paint is
 * never delayed. The stats line is the hero's eyebrow: an `.eyebrow` pill above the H1
 * (rounded-lg while it wraps on small screens, rounded-full once it fits one line).
 * Single column: the backdrop plate carries the right-hand side, so the hero is back to
 * the canonical four elements (eyebrow, headline, subtext, CTAs). Sized to 78dvh from md
 * so it dominates the fold while the next section still peeks below it (dvh, not vh, so
 * the mobile address bar does not push the peek off-screen).
 */
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Backdrop: a white (--surface) veil, not a grey --bg wash, so the corridor stays clean
          and bright; the left-weighted gradient holds the H1's contrast. Heavier below lg, where
          object-cover crops the empty left band away and the corridor slides under the text. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Photo img={heroBackdrop} sizes="100vw" tint={false} zoom={false} priority className="h-full w-full" />
        <span className="absolute inset-0 bg-surface/40 lg:bg-surface/15" />
        <span className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-surface/10 lg:via-surface/60 lg:to-transparent" />
        {/* Dissolve into --bg before the section ends: overflow-hidden would otherwise cut the
            photo off as a hard rule right above the intent cards. */}
        <span className="absolute inset-0 bg-gradient-to-b from-transparent from-55% to-bg" />
      </div>
      <div className="relative mx-auto flex max-w-site items-center px-5 pb-20 pt-14 md:min-h-[78dvh] md:px-8 md:pb-24 md:pt-20 lg:px-10 lg:py-24">
        <div>
          <p className="hero-fade" style={{ "--hd": "0ms" } as CSSProperties}>
            <span className="tnum eyebrow inline-flex rounded-lg border border-line bg-surface px-4 py-2 md:rounded-full">
              7 sedes · más de 1000 bodegas · desde 2&nbsp;m³ · sin permanencia mínima
            </span>
          </p>
          <h1 id="hero-title" className="mt-6 max-w-[19ch] font-display text-display font-semibold text-ink">
            {H1.split(" ").map((w, i) => (
              <Fragment key={i}>
                <span className="hero-word" style={{ "--i": i } as CSSProperties}>
                  {w}
                </span>{" "}
              </Fragment>
            ))}
          </h1>
          <p className="hero-fade mt-5 max-w-[52ch] text-base leading-relaxed text-muted" style={{ "--hd": "400ms" } as CSSProperties}>
            Mini bodegas independientes con tu propio candado, por meses, para guardar trasteos, inventario o lo que no cabe en casa.
          </p>
          <div className="hero-fade mt-8 flex flex-col gap-3 sm:flex-row" style={{ "--hd": "480ms" } as CSSProperties}>
            <Button href={CALC_URL} intent="calcular">Calcular mi espacio</Button>
            <Button href={SEDES_URL} variant="secondary" intent="sedes">
              Ver sedes
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
