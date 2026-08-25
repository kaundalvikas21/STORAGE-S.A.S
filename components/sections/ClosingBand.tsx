import Button from "@/components/Button";
import Photo from "@/components/Photo";
import Parallax from "@/components/motion/Parallax";
import Reveal from "@/components/motion/Reveal";
import RevealStagger, { RevealItem } from "@/components/motion/RevealStagger";
import { QUOTE_URL, reassurance } from "@/content/site";

/** Closing CTA over the padlock photo: scrim fades in first, headline rises, button last (RevealStagger order). */
export default function ClosingBand() {
  return (
    <section aria-labelledby="cta-title" className="relative order-12 overflow-hidden border-t border-line bg-ink">
      <Reveal y={0} className="absolute inset-0">
        <Parallax className="h-full">
          <Photo slot="ctaClosing" className="h-full" sizes="100vw" scrim="deep" />
        </Parallax>
      </Reveal>
      <div className="relative mx-auto max-w-site px-5 py-20 text-center md:px-8 md:py-28 lg:px-10">
        <RevealStagger gap={0.1} delay={0.25} className="mx-auto flex max-w-[52ch] flex-col items-center">
          <RevealItem>
            <h2 id="cta-title" className="font-display text-3xl font-semibold text-on-photo">
              ¿Listo para liberar espacio?
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-4 text-[15px] text-on-photo/85">Cuéntanos qué necesitas guardar y en qué zona. Te enviamos la sede y el tamaño que mejor se ajustan, el mismo día.</p>
          </RevealItem>
          <RevealItem className="mt-8">
            <Button href={QUOTE_URL} className="focus-visible:ring-offset-ink">
              Cotizar
            </Button>
          </RevealItem>
          <RevealItem>
            <p className="mt-4 text-[14px] text-on-photo/80">{reassurance}</p>
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  );
}
