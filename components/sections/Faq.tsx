import Link from "next/link";
import { ArrowRight, Plus } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import { faq, priceSummary } from "@/content/site";

/** Bento pair: dark cell restates the honest price range; white cell holds the
 *  native <details> accordion. Content mirrored in FAQPage JSON-LD (app/page.tsx). */
export default function Faq() {
  return (
    <section aria-labelledby="faq-title" className="order-11">
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10 lg:py-24">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-5">
          <Reveal className="dark-cell self-start rounded-lg p-7 shadow-3 md:p-8">
            <p className="eyebrow mb-3">Preguntas frecuentes</p>
            <h2 id="faq-title" className="max-w-[16ch] font-display text-3xl font-semibold text-ink">Lo que todos preguntan antes de guardar</h2>
            <p className="mt-5 text-[15px] text-muted">Sin rodeos: esto cuesta una minibodega al mes.</p>
            <p className="tnum mt-3 text-lg font-semibold leading-relaxed text-accent">
              {priceSummary.split(" · ").map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p className="mt-3 max-w-[44ch] text-[13px] text-muted">Valores de referencia. Cada espacio se cotiza según sede y tamaño, sin costos ocultos.</p>
            <Link href="/preguntas-frecuentes/" className="group mt-6 inline-flex min-h-[44px] items-center gap-1.5 rounded-[2px] text-[14px] font-medium text-primary hover:text-primary-deep cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span className="link-draw">Ver todas las preguntas</span> <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal group className="rounded-lg border border-line bg-surface px-6 shadow-1 md:px-7">
            {faq.map((f, i) => (
              <RevealItem key={f.q}>
                <details className={`group faq-item ${i < faq.length - 1 ? "border-b border-line" : ""}`} open={i === 0}>
                  <summary className="-mx-2 flex cursor-pointer items-center justify-between gap-4 rounded-md px-2 py-6 transition-colors duration-fast ease-soft hover:bg-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
                    <h3 className="text-lg font-semibold text-ink">{f.q}</h3>
                    <Plus size={18} weight="bold" aria-hidden="true" className="shrink-0 text-muted transition-transform duration ease-soft group-open:rotate-45" />
                  </summary>
                  <div className="pb-8">
                    <p className="max-w-[65ch] text-[15px] leading-relaxed text-ink-2">{f.a}</p>
                    <Link href={f.link.href} className="group/link mt-3 inline-flex items-center gap-1.5 rounded-[2px] text-[14px] font-medium text-primary hover:text-primary-deep cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <span className="link-draw">{f.link.label}</span> <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover/link:translate-x-1" />
                    </Link>
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
