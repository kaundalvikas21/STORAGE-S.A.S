import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { CALC_URL, QUOTE_URL } from "@/content/site";

const ticker = Array.from({ length: 10 }, (_, i) => i);

export default function ClosingBand() {
  return (
    <section aria-labelledby="cta-title" className="order-12 border-t-[1.5px] border-ink">
      {/* Decorative marquee — brief-mandated; pauses on hover, static under reduced motion. */}
      <div className="overflow-hidden border-b-[1.5px] border-ink bg-primary text-on-primary" aria-hidden="true">
        <div className="marquee-track flex w-max">
          {[0, 1].map((half) => (
            <p key={half} className="flex shrink-0 items-center py-2.5 font-mono text-[13px] font-bold uppercase tracking-[0.14em]">
              {ticker.map((i) => (
                <span key={i} className="px-5">Cotiza hoy ·</span>
              ))}
            </p>
          ))}
        </div>
      </div>

      <div className="bg-ink text-bg">
        <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-20 md:py-28">
          <Reveal>
            <h2 id="cta-title" className="text-outline font-display text-display font-bold uppercase max-w-[14ch]">¿Listo para liberar espacio?</h2>
            <p className="mt-6 text-lg text-bg/80 max-w-[52ch]">Cuéntanos qué necesitas guardar y en qué zona. Te enviamos la sede y el tamaño que mejor se ajustan, el mismo día.</p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Button href={QUOTE_URL}>Cotizar</Button>
              <Button href={CALC_URL} variant="ghost">Calcular mi espacio</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
