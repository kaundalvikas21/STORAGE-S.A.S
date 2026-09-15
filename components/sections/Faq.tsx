import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/Reveal";
import FaqList from "@/components/FaqList";
import { faq, sizeSummary } from "@/content/site";

/** Bento pair: dark cell restates the size bands and what the price depends on (no figures until
 *  spec Open Item 4 is closed); white cell holds the exclusive
 *  native <details name="faq"> accordion (FaqList). Content mirrored in FAQPage JSON-LD (app/(site)/page.tsx).
 *  Row hover is a title + icon colour shift, the same idiom as the SiloDoors and SedeGrid
 *  cards: a background fill here would paint --bg inside a --surface card, reading as a hole
 *  and colliding with the card's own corner radius on the first row. */
export default function Faq() {
  return (
    <section aria-labelledby="faq-title" className="order-11">
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10 lg:py-24">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-5">
          <Reveal className="dark-cell self-start rounded-lg p-7 shadow-3 md:p-8">
            <p className="eyebrow mb-3">Preguntas frecuentes</p>
            <h2 id="faq-title" className="max-w-[16ch] font-display text-3xl font-semibold text-ink">Lo que todos preguntan antes de guardar</h2>
            <p className="mt-5 text-[15px] text-muted">Sin rodeos: el valor depende del tamaño y de la sede.</p>
            <p className="tnum mt-3 text-lg font-semibold leading-relaxed text-accent">
              {sizeSummary.split(" · ").map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p className="mt-3 max-w-[44ch] text-[13px] text-muted">Cada espacio se cotiza según sede y tamaño, sin costos ocultos. Te enviamos el valor exacto el mismo día.</p>
            <Link href="/preguntas-frecuentes/" className="group mt-6 inline-flex min-h-[44px] items-center gap-1.5 rounded-[2px] text-[14px] font-medium text-primary hover:text-primary-deep cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span className="link-draw">Ver todas las preguntas</span> <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <FaqList items={faq} name="faq" />
        </div>
      </div>
    </section>
  );
}
