import Button from "@/components/Button";
import Magnetic from "@/components/Magnetic";
import Photo from "@/components/Photo";
import Reveal, { RevealItem } from "@/components/Reveal";
import { ctaClosing } from "@/content/images";
import { CALC_URL, QUOTE_URL, reassurance } from "@/content/site";

/** Oversized close; magnetic Cotizar + the two-temperature rule as UI (MASTER.md §8.9).
 *  Bogotá night photo as backdrop under a dark scrim; the message stays HTML text on top.
 *  Reveal order: headline, copy, button, microcopy (60ms stagger). */
export default function ClosingBand() {
  return (
    <section aria-labelledby="cta-title" className="group dark-cell relative order-12 overflow-hidden border-t border-line">
      {/* group + zoom: the photo drifts to --photo-zoom while the band is hovered (subtle, compositor-only). */}
      <div aria-hidden="true" className="absolute inset-0">
        <Photo img={ctaClosing} sizes="100vw" scrim="bottom" tint={false} className="h-full w-full" />
      </div>
      <div className="relative mx-auto max-w-site px-5 py-20 text-center md:px-8 md:py-28 lg:px-10">
        <Reveal group className="mx-auto flex max-w-[24ch] flex-col items-center md:max-w-[52ch]">
          <RevealItem>
            <h2 id="cta-title" className="font-display text-display font-semibold text-ink">¿Listo para liberar espacio?</h2>
          </RevealItem>
          <RevealItem className="mt-5 max-w-[48ch]">
            <p className="text-[15px] text-ink-2">Cuéntanos qué necesitas guardar y en qué zona. Te enviamos la sede y el tamaño que mejor se ajustan, el mismo día.</p>
          </RevealItem>
          <RevealItem className="mt-9">
            <Magnetic>
              <Button href={QUOTE_URL}>Cotizar</Button>
            </Magnetic>
          </RevealItem>
          <RevealItem className="mt-5 flex flex-col items-center">
            <p className="text-[14px] text-muted">¿No estás seguro?</p>
            <Button href={CALC_URL} variant="ghost" size="md" className="mt-1">
              Calcular mi espacio
            </Button>
          </RevealItem>
          <RevealItem className="mt-6">
            <p className="text-[14px] text-muted">{reassurance}</p>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
