import Button from "@/components/Button";
import Photo from "@/components/Photo";
import Reveal, { RevealItem } from "@/components/Reveal";
import { photos } from "@/content/images";
import { CALC_URL, QUOTE_URL } from "@/content/site";

export default function ClosingBand() {
  return (
    <section aria-labelledby="cta-title" className="order-12 relative overflow-hidden bg-primary-deep">
      {/* -inset-2 so the reveal's 8px rise never exposes the band edge. */}
      <Reveal className="absolute -inset-2">
        <Photo img={photos.ctaClosing} sizes="100vw" className="h-full w-full" scrim="dark" zoom={false} tint={false} />
      </Reveal>
      <div className="relative mx-auto max-w-site px-5 md:px-8 lg:px-10 py-24 md:py-32 lg:py-40 text-on-primary">
        <Reveal group delay={0.12} className="max-w-[36ch]">
          <RevealItem>
            <h2 id="cta-title" className="font-display text-display font-semibold leading-[1.02]">¿Listo para liberar espacio?</h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-5 text-lg text-on-primary/90">Cuéntanos qué necesitas guardar y en qué zona. Te enviamos la sede y el tamaño que mejor se ajustan, el mismo día.</p>
          </RevealItem>
          <RevealItem className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button href={QUOTE_URL}>Cotizar ahora</Button>
            <Button href={CALC_URL} variant="ghost">Calcular mi espacio</Button>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
