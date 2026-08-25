import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem, RevealRule, RevealStagger } from "@/components/motion/Reveal";
import { faq } from "@/content/site";

/** Ledger accordion — exclusive: a shared `name` makes the browser close the open row
 *  when another is opened (HTML spec, zero JS). Native <details>, open state marked by an orange left rule + mono +/− indicator. Content mirrored in FAQPage JSON-LD (app/page.tsx). */
export default function Faq() {
  return (
    <section aria-labelledby="faq-title" className="order-11">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-14 md:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-3">Preguntas frecuentes</p>
            <h2 id="faq-title" className="font-display text-3xl font-bold uppercase text-ink max-w-[16ch]">Lo que todos preguntan antes de guardar</h2>
            <RevealRule className="mt-5 max-w-[280px]" />
            <p className="mt-4 text-[15px] text-muted max-w-[40ch]">Precios, tamaños y acceso. Si tu duda no está aquí, la respondemos en la página completa.</p>
            <Link href="/preguntas-frecuentes/" className="link-draw mt-6 inline-flex items-center gap-2 font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-ink hover:text-primary-deep cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Ver todas las preguntas <ArrowRight size={16} weight="bold" aria-hidden="true" />
            </Link>
          </Reveal>

          <RevealStagger className="border-t-[1.5px] border-ink">
            {faq.map((f, i) => (
              <RevealItem key={f.q}>
                <details name="faq" className="group border-b border-line border-l-[3px] border-l-transparent transition-colors duration-fast ease-soft hover:bg-bg-deep/70 open:border-l-primary open:bg-surface" open={i === 0}>
                  <summary className="flex items-center justify-between gap-4 px-4 py-5 md:px-5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
                    <h3 className="font-display text-lg md:text-xl font-bold text-ink">{f.q}</h3>
                    {/* One glyph, rotated 45° into a close mark — no swap, so it can animate. */}
                    <span className="font-mono text-2xl leading-none text-ink shrink-0 transition-transform duration ease-soft group-open:rotate-45 group-open:text-primary-deep" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="px-4 pb-6 md:px-5 text-[15px] text-ink-2 leading-relaxed max-w-[65ch]">{f.a}</p>
                </details>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
