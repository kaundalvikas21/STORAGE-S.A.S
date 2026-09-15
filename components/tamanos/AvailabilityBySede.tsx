import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import { QUOTE_URL, SEDES_URL } from "@/content/facts";
import { sedeDetails, sedePages } from "@/content/sedes";
import { sizePage as t, type SizeId } from "@/content/tamanos";

/** Size page block 4 (spec T8): "availability is the lever that fills Calle 197". One row per sede page in
 *  content/sedes.ts order, never sorted, 197 first with its badge (R6). The status is that sede's
 *  `sizesAvailable` for this size: "Disponible" reads as the kraft "Alta disponibilidad" chip, "Consultar"
 *  stays muted. Rows pre-fill sede + tamaño on /cotizar/. Heading left of one white cell at lg, stacked below. */
export default function AvailabilityBySede({ id }: { id: SizeId }) {
  return (
    <section aria-labelledby="availability-title" className="mx-auto grid max-w-site gap-8 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1fr_1.7fr] lg:gap-14 lg:px-10">
      <Reveal>
        <h2 id="availability-title" className="max-w-[20ch] font-display text-3xl font-semibold text-ink">{t.availabilityTitle}</h2>
        <p className="mt-3 max-w-[40ch] text-[15px] text-muted">{t.availabilityBody}</p>
        <Link
          href={SEDES_URL}
          className="group mt-4 inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-[2px] text-[15px] font-medium text-primary hover:text-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="link-draw">{t.allSedes}</span>
          <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
        </Link>
      </Reveal>
      <Reveal group as="ul" role="list" className="rounded-lg border border-line bg-surface px-6 shadow-1 md:px-7">
        {sedePages.map((s, i) => {
          const status = sedeDetails[s.slug].sizesAvailable[id];
          const high = status === "Disponible";
          return (
            <RevealItem as="li" key={s.slug} className={i < sedePages.length - 1 ? "border-b border-line" : ""}>
              <Link
                href={`${QUOTE_URL}?sede=${s.slug}&tamano=${id}`}
                className="group -mx-2 flex cursor-pointer items-center gap-4 rounded-md px-2 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-lg font-semibold text-ink transition-colors duration-fast ease-soft group-hover:text-primary">{s.title}</h3>
                    {s.badge && <span className="rounded-full bg-brand px-2 py-px text-[11px] font-medium text-on-brand">{s.badge}</span>}
                  </div>
                  <p className="mt-1 text-[14px] text-muted">{s.zone}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[12px] font-medium ${high ? "bg-accent text-on-accent" : "border border-line bg-bg text-muted"}`}>
                  {high ? t.availableHigh : status}
                </span>
                <ArrowRight size={16} aria-hidden="true" className="shrink-0 text-primary transition-transform duration-fast ease-soft group-hover:translate-x-1" />
              </Link>
            </RevealItem>
          );
        })}
      </Reveal>
    </section>
  );
}
