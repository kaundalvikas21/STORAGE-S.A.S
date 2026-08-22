import Link from "next/link";
import { ArrowRight, CaretDown } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import { faq } from "@/content/site";

/** Native <details> accordion — no JS state; open/close is animated by the browser. Content mirrored in FAQPage JSON-LD (app/page.tsx). */
export default function Faq() {
  return (
    <section aria-labelledby="faq-title" className="order-11">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-20 md:py-28 lg:py-36">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-3">Preguntas frecuentes</p>
            <h2 id="faq-title" className="font-display text-3xl font-semibold text-ink max-w-[16ch]">Lo que todos preguntan antes de guardar</h2>
            <p className="mt-4 text-[15px] text-muted max-w-[40ch]">Precios, tamaños y acceso. Si tu duda no está aquí, la respondemos en la página completa.</p>
            <Link href="/preguntas-frecuentes/" className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-primary cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Ver todas las preguntas <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal group className="flex flex-col gap-3">
            {faq.map((f, i) => (
              <RevealItem key={f.q}>
                <details className="group rounded-lg bg-surface ring-1 ring-line shadow-1 open:shadow-2 transition-shadow duration-DEFAULT ease-soft" open={i === 0}>
                  <summary className="flex items-center justify-between gap-4 p-5 md:p-6 rounded-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <h3 className="font-display text-lg md:text-xl font-semibold text-ink">{f.q}</h3>
                    <span className="faq-chevron flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary transition-transform duration-DEFAULT ease-soft">
                      <CaretDown size={16} weight="bold" aria-hidden="true" />
                    </span>
                  </summary>
                  <div className="px-5 pb-5 md:px-6 md:pb-6 -mt-1">
                    <p className="text-[15px] text-ink-2 leading-relaxed">{f.a}</p>
                  </div>
                </details>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
