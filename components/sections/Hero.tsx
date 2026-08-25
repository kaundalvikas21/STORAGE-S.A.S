import { Fragment } from "react";
import Button from "@/components/Button";
import Photo from "@/components/Photo";
import Parallax from "@/components/motion/Parallax";
import { CALC_URL, SEDES_URL } from "@/content/site";

const headline = "Minibodegas y bodegaje en Bogotá";

/**
 * Server component. The H1 is static HTML and is the LCP text: its words rise with a CSS
 * animation (40ms apart, delay set inline), so nothing here waits on hydration and the whole
 * hero is readable with JavaScript disabled.
 *
 * The photograph is the section background, washed back behind a paper scrim so the ink
 * headline and body keep their contrast — the image illustrates, the HTML carries the message.
 * Only its parallax drift is client-side.
 */
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden border-b-[1.5px] border-ink">
      <Parallax className="absolute inset-0 -z-10">
        <Photo slot="heroMain" className="absolute inset-0" sizes="100vw" priority quality={70} scrim="paper" />
      </Parallax>
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 pt-14 pb-16 md:pt-20 md:pb-24 lg:pt-28 lg:pb-32">
        <h1 id="hero-title" className="font-display text-display font-bold uppercase text-ink max-w-[14ch]">
          {headline.split(" ").map((w, i, all) => (
            <Fragment key={`${w}-${i}`}>
              {/* The clipping mask holds the word only. A trailing space inside an
                  inline-block with overflow-hidden gets collapsed away, which welds
                  the words together — so the separator lives outside the mask. */}
              <span className="inline-block overflow-hidden align-bottom">
                <span className="rise-in inline-block" style={{ "--rise-delay": `${i * 40}ms` } as React.CSSProperties}>
                  {w}
                </span>
              </span>
              {i < all.length - 1 ? " " : null}
            </Fragment>
          ))}
        </h1>
        <p
          className="rise-in mt-6 font-mono text-[13px] md:text-sm font-medium uppercase tracking-[0.08em] text-ink-2 tnum"
          style={{ "--rise-delay": "150ms" } as React.CSSProperties}
        >
          7 sedes · más de 500 bodegas · desde 1 m³ · sin permanencia mínima
        </p>
        <p
          className="rise-in mt-4 text-base md:text-lg text-ink-2 max-w-[52ch] leading-relaxed"
          style={{ "--rise-delay": "200ms" } as React.CSSProperties}
        >
          Mini bodegas independientes con tu propio candado, por meses, para guardar trasteos, inventario o lo que no cabe en casa.
        </p>
        <div
          className="rise-in mt-9 flex flex-col sm:flex-row gap-4"
          style={{ "--rise-delay": "250ms" } as React.CSSProperties}
        >
          <Button href={CALC_URL}>Calcular mi espacio</Button>
          <Button href={SEDES_URL} variant="secondary">Ver sedes</Button>
        </div>
      </div>
    </section>
  );
}
