import { Fragment } from "react";
import { CalendarCheck, Calculator, Cube, MapPin, MapTrifold, Warehouse } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/Button";
import Parallax from "@/components/Parallax";
import Photo from "@/components/Photo";
import { photos } from "@/content/images";
import { CALC_URL, SEDES_URL, company } from "@/content/site";

/**
 * Server component, full-bleed photographic band with the light overlay: the page background
 * bleeds in from the left so ink copy reads over it, and the photograph is untouched on the right.
 *
 * The load choreography (word rise 40ms apart, subline +150ms, CTAs +250ms, photo settling from
 * 1.04) is pure CSS in app/globals.css, so the hero is fully readable with JS off and the H1 never
 * ships an opacity:0 inline style. Text stack is the permitted four: eyebrow, H1, subtext, CTAs -
 * the stats line lives in the strip along the bottom edge, below the stack rather than inside it.
 */
const HEADLINE = "Minibodegas y bodegaje en Bogotá";
const words = HEADLINE.split(" ");

/** The four fragments of the existing stats line, split so each can carry an icon. */
const proof = [
  { icon: MapPin, label: "7 sedes" },
  { icon: Warehouse, label: "más de 500 bodegas" },
  { icon: Cube, label: "desde 1 m³" },
  { icon: CalendarCheck, label: "sin permanencia mínima" },
];

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[86svh] flex-col overflow-hidden bg-bg">
      {/* -inset-[3%] gives the parallax headroom so the frame edge never shows. */}
      <Parallax className="absolute -inset-[3%] -z-10">
        <Photo img={photos.heroMain} sizes="100vw" className="photo-settle h-full w-full" scrim="hero" priority zoom={false} />
      </Parallax>

      <div className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-site px-5 md:px-8 lg:px-10 pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-24">
          <div className="max-w-[52ch]">
            <p className="eyebrow load-rise">Desde {company.founded} en Bogotá</p>
            <h1 id="hero-title" className="mt-5 font-display text-display font-semibold text-ink max-w-[13ch]">
              {words.map((w, i) => (
                // The space is a sibling text node, never inside the inline-block: a trailing
                // space inside the box collapses, and the H1 must still read as one sentence.
                <Fragment key={w}>
                  <span className="word-rise" style={{ "--i": i } as React.CSSProperties}>{w}</span>
                  {i < words.length - 1 ? " " : null}
                </Fragment>
              ))}
            </h1>
            <p className="load-rise mt-6 text-lg md:text-xl text-ink-2 max-w-[46ch] leading-relaxed" style={{ "--delay": "150ms" } as React.CSSProperties}>
              Mini bodegas independientes con tu propio candado, por meses, para guardar trasteos, inventario o lo que no cabe en casa.
            </p>
            <div className="load-rise mt-9 flex flex-col sm:flex-row gap-3" style={{ "--delay": "250ms" } as React.CSSProperties}>
              <Button href={CALC_URL} icon={Calculator}>Calcular mi espacio</Button>
              <Button href={SEDES_URL} variant="secondary" icon={MapTrifold}>Ver sedes</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust strip: seats the band on the photo and carries the proof points below the stack. */}
      <div className="relative border-t border-line bg-bg/85">
        <ul className="mx-auto flex max-w-site flex-wrap items-center gap-x-8 gap-y-3 px-5 md:px-8 lg:px-10 py-4 md:py-5" role="list">
          {proof.map(({ icon: Icon, label }, i) => (
            <li
              key={label}
              className="load-rise inline-flex items-center gap-2.5 text-[14px] md:text-[15px] font-medium text-ink-2"
              style={{ "--delay": `${350 + i * 70}ms` } as React.CSSProperties}
            >
              <Icon size={20} weight="light" aria-hidden="true" className="shrink-0 text-accent-deep" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
