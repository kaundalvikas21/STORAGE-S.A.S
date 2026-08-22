import Image from "next/image";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/Button";
import { CALC_URL, SEDES_URL, company } from "@/content/site";

/** Server component. H1 is static HTML with no animation — it is the LCP element. */
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 pt-10 pb-12 md:pt-16 md:pb-20 lg:pt-24 lg:pb-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-5">Desde {company.founded} en Bogotá</p>
            <h1 id="hero-title" className="font-display text-display font-semibold text-ink max-w-[14ch]">
              Minibodegas y bodegaje en Bogotá
            </h1>
            <p className="mt-5 text-lg md:text-xl text-ink-2 max-w-[44ch] leading-relaxed">
              7 sedes · más de 500 bodegas · desde 1 m³ · sin permanencia mínima
            </p>
            <p className="mt-3 text-[15px] text-muted max-w-[52ch]">
              Mini bodegas independientes con tu propio candado, por meses, para guardar trasteos, inventario o lo que no cabe en casa.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button href={CALC_URL}>Calcular mi espacio</Button>
              <Button href={SEDES_URL} variant="secondary">Ver sedes</Button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-xl bg-bg-deep ring-1 ring-line p-1.5 shadow-2">
              <div className="relative aspect-[4/3] lg:aspect-[5/4] overflow-hidden rounded-xl-inner shadow-inset">
                <Image
                  src="/img/hero-familia.svg"
                  alt="Una familia sella una caja de cartón en un pasillo luminoso de minibodegas Storage en Bogotá"
                  fill
                  priority
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute left-4 bottom-4 md:left-6 md:bottom-6 flex items-center gap-3 rounded-full bg-surface/80 backdrop-blur-md ring-1 ring-line shadow-2 pl-2 pr-4 py-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-on-primary">
                <ShieldCheck size={20} weight="light" aria-hidden="true" />
              </span>
              <span className="text-[14px] font-medium text-ink tnum">Desde 2011 · 7 sedes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
