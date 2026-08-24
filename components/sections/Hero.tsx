import Button from "@/components/Button";
import { CALC_URL, SEDES_URL } from "@/content/site";

/** Server component. H1 is static HTML with no animation — it is the LCP element. */
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="blueprint-grid border-b-[1.5px] border-ink">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 pt-14 pb-16 md:pt-20 md:pb-24 lg:pt-24 lg:pb-28">
        <h1 id="hero-title" className="font-display text-display font-bold uppercase text-ink max-w-[12ch]">
          Minibodegas y bodegaje en Bogotá
        </h1>
        <p className="mt-6 font-mono text-[13px] md:text-sm font-medium uppercase tracking-[0.08em] text-ink-2 tnum">
          7 sedes · más de 500 bodegas · desde 1 m³ · sin permanencia mínima
        </p>
        <p className="mt-4 text-base md:text-lg text-ink-2 max-w-[52ch] leading-relaxed">
          Mini bodegas independientes con tu propio candado, por meses, para guardar trasteos, inventario o lo que no cabe en casa.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row gap-4">
          <Button href={CALC_URL}>Calcular mi espacio</Button>
          <Button href={SEDES_URL} variant="secondary">Ver sedes</Button>
        </div>
      </div>
    </section>
  );
}
