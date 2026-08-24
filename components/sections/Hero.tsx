import type { CSSProperties } from "react";
import { Fragment } from "react";
import Button from "@/components/Button";
import HeroVisualizer from "@/components/sections/HeroVisualizer";
import { CALC_URL, SEDES_URL } from "@/content/site";

const H1 = "Minibodegas y bodegaje en Bogotá";

/**
 * Server component. The H1 is static SSR HTML (LCP element); the word-level rise
 * is pure CSS (.hero-word) animating transform/opacity only, so text paint is
 * never delayed. The visualizer is the hero's declared 5th element (MASTER.md §8.5).
 */
export default function Hero() {
  return (
    <section aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-site gap-10 px-5 pb-14 pt-14 md:px-8 md:pb-16 md:pt-20 lg:grid-cols-[1fr_minmax(380px,460px)] lg:items-center lg:gap-14 lg:px-10 lg:pt-24">
        <div>
          <h1 id="hero-title" className="max-w-[19ch] font-display text-display font-semibold text-ink">
            {H1.split(" ").map((w, i) => (
              <Fragment key={i}>
                <span className="hero-word" style={{ "--i": i } as CSSProperties}>
                  {w}
                </span>{" "}
              </Fragment>
            ))}
          </h1>
          <p className="tnum mt-5 text-lg text-ink-2">7 sedes · más de 500 bodegas · desde 1 m³ · sin permanencia mínima</p>
          <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-muted">
            Mini bodegas independientes con tu propio candado, por meses, para guardar trasteos, inventario o lo que no cabe en casa.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={CALC_URL}>Calcular mi espacio</Button>
            <Button href={SEDES_URL} variant="secondary">
              Ver sedes
            </Button>
          </div>
        </div>
        <HeroVisualizer />
      </div>
    </section>
  );
}
