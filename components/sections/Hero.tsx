import Button from "@/components/Button";
import SizeChecker from "@/components/sections/SizeChecker";
import { CALC_URL, SEDES_URL } from "@/content/site";

/** Server component. H1 is static HTML with no animation — it is the LCP element. */
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="border-b border-line">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 pt-14 pb-16 md:pt-20 md:pb-20 lg:pt-24">
        <h1 id="hero-title" className="font-display text-display font-semibold text-ink max-w-[16ch]">
          Minibodegas y bodegaje en Bogotá
        </h1>
        <p className="mt-5 text-lg text-ink-2 tnum">
          7 sedes · más de 500 bodegas · desde 1 m³ · sin permanencia mínima
        </p>
        <p className="mt-3 text-base text-muted max-w-[52ch] leading-relaxed">
          Mini bodegas independientes con tu propio candado, por meses, para guardar trasteos, inventario o lo que no cabe en casa.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button href={CALC_URL}>Calcular mi espacio</Button>
          <Button href={SEDES_URL} variant="secondary">Ver sedes</Button>
        </div>
        <SizeChecker />
      </div>
    </section>
  );
}
