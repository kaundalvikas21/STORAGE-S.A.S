import Link from "next/link";
import { ArrowRight, Plus } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealRule } from "@/components/motion/Reveal";
import RevealStagger, { RevealItem } from "@/components/motion/RevealStagger";
import { faq } from "@/content/site";

const link = "group inline-flex items-center gap-1.5 text-[14px] font-medium text-primary hover:text-primary-deep cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-[2px]";
const arrow = "transition-transform duration-fast ease-premium group-hover:translate-x-1";

/**
 * Borderless accordion on native <details> (readable with JS off). Row hover tints, the + rotates 45° on open,
 * content height animates via ::details-content where supported (globals.css). Mirrored in FAQPage JSON-LD.
 */
export default function Faq() {
  return (
    <section aria-labelledby="faq-title" className="order-11">
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-3">Preguntas frecuentes</p>
            <h2 id="faq-title" className="font-display text-3xl font-semibold text-ink max-w-[16ch]">
              Lo que todos preguntan antes de guardar
            </h2>
            <RevealRule className="mt-5 max-w-[280px]" />
            <p className="mt-4 max-w-[40ch] text-[15px] text-muted">Precios, tamaños y acceso. Si tu duda no está aquí, la respondemos en la página completa.</p>
            <Link href="/preguntas-frecuentes/" className={`${link} mt-6`}>
              <span className="link-draw">Ver todas las preguntas</span> <ArrowRight size={15} aria-hidden="true" className={arrow} />
            </Link>
          </Reveal>

          <RevealStagger>
            {faq.map((f, i) => (
              <RevealItem key={f.q}>
                <details className="faq border-b border-line" open={i === 0}>
                  <summary className="faq-row -mx-3 flex items-center justify-between gap-4 rounded-sm px-3 py-6 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
                    <h3 className="text-lg font-semibold text-ink">{f.q}</h3>
                    <Plus size={20} weight="regular" aria-hidden="true" className="faq-icon shrink-0 text-muted" />
                  </summary>
                  <div className="faq-body pb-8">
                    <p className="max-w-[65ch] text-[15px] leading-relaxed text-ink-2">{f.a}</p>
                    <Link href={f.link.href} className={`${link} mt-3`}>
                      <span className="link-draw">{f.link.label}</span> <ArrowRight size={14} aria-hidden="true" className={arrow} />
                    </Link>
                  </div>
                </details>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
