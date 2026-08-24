import Button from "@/components/Button";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";
import { CALC_URL, QUOTE_URL, reassurance } from "@/content/site";

/** Oversized close; magnetic Cotizar + the two-temperature rule as UI (MASTER.md §8.9). */
export default function ClosingBand() {
  return (
    <section aria-labelledby="cta-title" className="order-12 border-t border-line">
      <div className="mx-auto max-w-site px-5 py-20 text-center md:px-8 md:py-28 lg:px-10">
        <Reveal className="mx-auto flex max-w-[24ch] flex-col items-center md:max-w-[52ch]">
          <h2 id="cta-title" className="font-display text-display font-semibold text-ink">¿Listo para liberar espacio?</h2>
          <p className="mt-5 max-w-[48ch] text-[15px] text-ink-2">Cuéntanos qué necesitas guardar y en qué zona. Te enviamos la sede y el tamaño que mejor se ajustan, el mismo día.</p>
          <div className="mt-9">
            <Magnetic>
              <Button href={QUOTE_URL}>Cotizar</Button>
            </Magnetic>
          </div>
          <p className="mt-5 text-[14px] text-muted">¿No estás seguro?</p>
          <Button href={CALC_URL} variant="ghost" size="md" className="mt-1">
            Calcular mi espacio
          </Button>
          <p className="mt-6 text-[14px] text-muted">{reassurance}</p>
        </Reveal>
      </div>
    </section>
  );
}
