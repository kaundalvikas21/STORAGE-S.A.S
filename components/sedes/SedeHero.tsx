import { Clock } from "@phosphor-icons/react/dist/ssr";
import Button, { CtaIcon, btnClass } from "@/components/Button";
import { QUOTE_URL, company } from "@/content/facts";
import { sedePage as t, type SedeDetail, type SedePage } from "@/content/sedes";
import { directionsUrl } from "@/lib/maps";

/** Sede page block 1 (spec T5): h1, every address the page covers, hours, and the three immediate
 *  actions. Kept compact so the gallery lands in the first viewport. The 197 keeps its badge (R6).
 *  "Cómo llegar": one point opens Google Maps directions; several jump to the page's location block. */
export default function SedeHero({ page, detail }: { page: SedePage; detail: SedeDetail }) {
  const single = page.points.length === 1;
  return (
    <section aria-labelledby="sede-h1" className="mx-auto max-w-site px-5 pb-8 pt-2 md:px-8 lg:px-10">
      {page.badge && <span className="mb-3 inline-flex rounded-full bg-accent px-2.5 py-1 text-[12px] font-medium text-on-accent">{page.badge}</span>}
      <h1 id="sede-h1" className="font-display text-3xl font-semibold text-ink">{detail.h1}</h1>
      <div className="mt-3 flex flex-col gap-x-8 gap-y-2 text-[16px] text-ink-2 md:flex-row md:flex-wrap md:items-start">
        <address className="flex flex-col gap-0.5 not-italic">
          {page.points.map((p) => (
            <span key={p.id}>{p.address}</span>
          ))}
        </address>
        <p className="tnum inline-flex items-center gap-2">
          <Clock size={18} aria-hidden="true" className="shrink-0 text-primary" />
          <span>
            <span className="sr-only">{t.hoursLabel}: </span>
            {company.hours}
          </span>
        </p>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href={`${QUOTE_URL}?sede=${page.slug}`} intent="cotizar">{t.quote}</Button>
        {single ? (
          <a href={directionsUrl(page.address)} target="_blank" rel="noopener noreferrer" className={btnClass("secondary")}>
            <CtaIcon intent="sedes" />
            {t.directions}
          </a>
        ) : (
          <a href="#ubicacion" className={btnClass("secondary")}>
            <CtaIcon intent="sedes" />
            {t.directions}
          </a>
        )}
        <a href={`tel:${company.phone.replace(/\s/g, "")}`} className={btnClass("ghost")}>
          <CtaIcon intent="llamar" />
          {t.call}
        </a>
      </div>
    </section>
  );
}
