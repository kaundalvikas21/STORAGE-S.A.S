import Button from "@/components/Button";
import Magnetic from "@/components/Magnetic";
import Photo from "@/components/Photo";
import Reveal, { RevealItem } from "@/components/Reveal";
import { ctaClosing } from "@/content/images";
import { CALC_URL, QUOTE_URL, reassurance } from "@/content/site";

/** Oversized close; magnetic Cotizar paired inline with the calculator CTA (MASTER.md §8.9).
 *  Bogotá night photo as a static backdrop under a dark scrim (no hover zoom on this band);
 *  the message sits on a frosted panel (§8.11). Reveal order: headline, copy, buttons, microcopy. */
export default function ClosingBand() {
  return (
    <section aria-labelledby="cta-title" className="dark-cell relative order-12 overflow-hidden border-t border-line">
      <div aria-hidden="true" className="absolute inset-0">
        <Photo img={ctaClosing} sizes="100vw" scrim="bottom" tint={false} zoom={false} className="h-full w-full" />
      </div>
      <div className="relative mx-auto max-w-site px-5 py-20 md:px-8 md:py-28 lg:px-10">
        {/* Frosted panel: --surface at 40% over the scrimmed photo, blurred, with the --line hairline.
            Where backdrop-filter is unsupported the fill alone still carries the text at AA. */}
        <div className="mx-auto max-w-[74ch] rounded-xl border border-line bg-surface/40 px-6 py-12 text-center shadow-3 backdrop-blur-xl md:px-14 md:py-14">
          <Reveal group className="mx-auto flex max-w-[46ch] flex-col items-center md:max-w-[52ch]">
            <RevealItem>
              <h2 id="cta-title" className="max-w-[24ch] font-display text-display font-semibold text-ink">¿Listo para liberar espacio?</h2>
            </RevealItem>
            <RevealItem className="mt-5 max-w-[48ch]">
              <p className="text-[15px] text-ink-2">Cuéntanos qué necesitas guardar y en qué zona. Te enviamos la sede y el tamaño que mejor se ajustan, el mismo día.</p>
            </RevealItem>
            <RevealItem className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
              <Magnetic>
                <Button href={QUOTE_URL} intent="cotizar">Cotizar</Button>
              </Magnetic>
              <Button href={CALC_URL} variant="secondary" intent="calcular">
                Calcular mi espacio
              </Button>
            </RevealItem>
            <RevealItem className="mt-5">
              <p className="text-[14px] text-muted">¿No estás seguro? {reassurance}</p>
            </RevealItem>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
