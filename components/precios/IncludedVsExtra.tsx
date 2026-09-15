import { CheckCircle, PlusCircle } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/Reveal";
import { preciosPage } from "@/content/site";

const t = preciosPage.included;

/** /precios/ blocks 3-4 (wireframe T6 "Included vs extra"): two unequal columns. What is included sits
 *  on --primary-soft and is wider (six items in two sub-columns); what costs extra stays white, with
 *  the note that it is quoted only on request. Stacks below md. */
export default function IncludedVsExtra() {
  return (
    <section aria-labelledby="included-title" className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10">
      <Reveal>
        <h2 id="included-title" className="max-w-[28ch] font-display text-3xl font-semibold text-ink">{t.title}</h2>
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-[1.5fr_1fr] md:gap-5">
        <Reveal className="rounded-lg border border-line bg-primary-soft p-7 shadow-1 md:p-8">
          <h3 className="font-display text-2xl font-semibold text-ink">{t.in.title}</h3>
          <ul role="list" className="mt-6 grid gap-4 lg:grid-cols-2 lg:gap-x-8">
            {t.in.items.map((it) => (
              <li key={it} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink">
                <CheckCircle size={22} aria-hidden="true" className="mt-px shrink-0 text-primary" />
                {it}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.06} className="flex flex-col rounded-lg border border-line bg-surface p-7 shadow-1 md:p-8">
          <h3 className="font-display text-2xl font-semibold text-ink">{t.extra.title}</h3>
          <ul role="list" className="mt-6 grid gap-4">
            {t.extra.items.map((it) => (
              <li key={it} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink">
                <PlusCircle size={22} aria-hidden="true" className="mt-px shrink-0 text-muted" />
                {it}
              </li>
            ))}
          </ul>
          <p className="mt-auto pt-6 text-[14px] text-muted">{t.extra.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
