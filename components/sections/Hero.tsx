import { Fragment, type CSSProperties } from "react";
import Button from "@/components/Button";
import Photo from "@/components/Photo";
import Parallax from "@/components/motion/Parallax";
import SizeChecker from "@/components/sections/SizeChecker";
import { CALC_URL, SEDES_URL } from "@/content/site";

const words = "Minibodegas y bodegaje en Bogotá".split(" ");
const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/**
 * Server component. Load choreography is pure CSS (globals.css `.hero-rise` / `.hero-photo`) so the H1 text
 * is in the DOM immediately and only transform/opacity animate: words 40ms apart, subline +150ms, CTAs +250ms,
 * photo settles 1.04→1 over 1.2s. On lg the photo is the full-bleed background under a left-weighted ink scrim
 * and the text stack turns `--on-photo`; below lg the photo is a framed image under the (ink) text.
 */
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line bg-surface lg:bg-ink">
      <div className="hero-photo absolute inset-0 hidden lg:block">
        <Parallax className="h-full">
          <Photo slot="heroMain" className="h-full [&_img]:object-left" sizes="100vw" priority scrim="hero" />
        </Parallax>
      </div>

      <div className="relative mx-auto max-w-site px-5 pb-16 pt-14 md:px-8 md:pb-20 md:pt-20 lg:min-h-[720px] lg:px-10 lg:py-24">
        <div className="lg:max-w-[42%]">
          <h1 id="hero-title" className="font-display text-display font-semibold text-ink max-w-[16ch] lg:text-on-photo">
            {words.map((w, i) => (
              <Fragment key={w}>
                {i > 0 && " "}
                <span className="hero-rise inline-block" style={delay(i * 40)}>
                  {w}
                </span>
              </Fragment>
            ))}
          </h1>
          <p className="hero-rise tnum mt-5 text-lg text-ink-2 lg:text-on-photo/90" style={delay(150)}>
            7 sedes · más de 500 bodegas · desde 1 m³ · sin permanencia mínima
          </p>
          <p className="hero-rise mt-3 max-w-[52ch] text-base leading-relaxed text-muted lg:text-on-photo/85" style={delay(200)}>
            Mini bodegas independientes con tu propio candado, por meses, para guardar trasteos, inventario o lo que no cabe en casa.
          </p>
          <div className="hero-rise mt-8 flex flex-col gap-3 sm:flex-row" style={delay(250)}>
            <Button href={CALC_URL} className="lg:focus-visible:ring-offset-ink">
              Calcular mi espacio
            </Button>
            <Button
              href={SEDES_URL}
              variant="secondary"
              className="lg:border-on-photo/40 lg:bg-on-photo/10 lg:text-on-photo lg:hover:border-on-photo lg:hover:bg-on-photo/20 lg:focus-visible:ring-offset-ink"
            >
              Ver sedes
            </Button>
          </div>
          <div className="hero-rise" style={delay(320)}>
            <SizeChecker />
          </div>
        </div>

        <div className="hero-photo mt-10 overflow-hidden rounded-lg border border-line lg:hidden">
          <Photo slot="heroMain" className="aspect-[16/9] [&_img]:object-[70%_center]" sizes="100vw" scrim="none" />
        </div>
      </div>
    </section>
  );
}
