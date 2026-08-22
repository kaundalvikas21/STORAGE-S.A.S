import Image from "next/image";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { CALC_URL, QUOTE_URL } from "@/content/site";

export default function ClosingBand() {
  return (
    <section aria-labelledby="cta-title" className="order-12 relative overflow-hidden">
      <Image
        src="/img/cierre-pasillo.svg"
        alt="Corredor de bodegas iluminado con luz suave en una sede Storage de Bogotá"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-primary-deep/85" />
      <div className="relative mx-auto max-w-site px-5 md:px-8 lg:px-10 py-24 md:py-32 lg:py-40 text-on-primary">
        <Reveal className="max-w-[36ch]">
          <h2 id="cta-title" className="font-display text-display font-semibold leading-[1.02]">¿Listo para liberar espacio?</h2>
          <p className="mt-5 text-lg text-on-primary/85">Cuéntanos qué necesitas guardar y en qué zona. Te enviamos la sede y el tamaño que mejor se ajustan, el mismo día.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button href={QUOTE_URL}>Cotizar ahora</Button>
            <Button href={CALC_URL} variant="ghost">Calcular mi espacio</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
