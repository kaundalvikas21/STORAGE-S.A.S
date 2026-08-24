import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem, RevealRule } from "@/components/Reveal";
import { faq } from "@/content/site";

/** Borderless accordion — native <details>, hairline between items only. Content mirrored in FAQPage JSON-LD (app/page.tsx). */
export default function Faq() {
  return (
    <section aria-labelledby="faq-title" className="order-11">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-14 md:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-3">Preguntas frecuentes</p>
            <h2 id="faq-title" className="font-display text-3xl font-semibold text-ink max-w-[16ch]">Lo que todos preguntan antes de guardar</h2>
            <RevealRule className="mt-5 max-w-[280px]" />
            <p className="mt-4 text-[15px] text-muted max-w-[40ch]">Precios, tamaños y acceso. Si tu duda no está aquí, la respondemos en la página completa.</p>
            <Link href="/preguntas-frecuentes/" className="group mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-primary hover:text-primary-deep cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-[2px]">
              Ver todas las preguntas <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal group>
            {faq.map((f, i) => (
              <RevealItem key={f.q}>
                <details className="group border-b border-line" open={i === 0}>
                  <summary className="flex items-center justify-between gap-4 py-6 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
                    <h3 className="text-lg font-semibold text-ink">{f.q}</h3>
                    <span className="text-xl leading-none text-muted shrink-0" aria-hidden="true">
                      <span className="group-open:hidden">+</span>
                      <span className="hidden group-open:inline">−</span>
                    </span>
                  </summary>
                  <div className="pb-8">
                    <p className="text-[15px] text-ink-2 leading-relaxed max-w-[65ch]">{f.a}</p>
                    <Link href={f.link.href} className="group/link mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium text-primary hover:text-primary-deep cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-[2px]">
                      {f.link.label} <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover/link:translate-x-1" />
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
