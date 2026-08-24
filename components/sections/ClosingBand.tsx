import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { QUOTE_URL, reassurance } from "@/content/site";

export default function ClosingBand() {
  return (
    <section aria-labelledby="cta-title" className="order-12 border-t border-line bg-surface">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-20 md:py-24 text-center">
        <Reveal className="mx-auto flex max-w-[52ch] flex-col items-center">
          <h2 id="cta-title" className="font-display text-3xl font-semibold text-ink">¿Listo para liberar espacio?</h2>
          <p className="mt-4 text-[15px] text-ink-2">Cuéntanos qué necesitas guardar y en qué zona. Te enviamos la sede y el tamaño que mejor se ajustan, el mismo día.</p>
          <div className="mt-8">
            <Button href={QUOTE_URL}>Cotizar</Button>
          </div>
          <p className="mt-4 text-[14px] text-muted">{reassurance}</p>
        </Reveal>
      </div>
    </section>
  );
}
