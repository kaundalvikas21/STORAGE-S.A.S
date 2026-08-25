import Button from "@/components/Button";
import Photo from "@/components/Photo";
import { RevealItem, RevealStagger } from "@/components/motion/Reveal";
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

      <div className="relative bg-ink text-bg">
        {/* Photograph sits under the ink scrim: it illustrates, the HTML carries the message. */}
        <Photo slot="ctaClosing" className="absolute inset-0" sizes="100vw" scrim="deep" mono quality={65} />
        <div className="relative mx-auto max-w-site px-5 md:px-8 lg:px-10 py-20 md:py-28">
          <RevealStagger>
            <RevealItem>
              <h2 id="cta-title" className="text-outline font-display text-display font-bold uppercase max-w-[14ch]">¿Listo para liberar espacio?</h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 text-lg text-bg/85 max-w-[52ch]">Cuéntanos qué necesitas guardar y en qué zona. Te enviamos la sede y el tamaño que mejor se ajustan, el mismo día.</p>
            </RevealItem>
            <RevealItem className="mt-9 flex flex-col sm:flex-row gap-4">
              <Button href={QUOTE_URL}>Cotizar</Button>
              <Button href={CALC_URL} variant="ghost">Calcular mi espacio</Button>
            </RevealItem>
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
