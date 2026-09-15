import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import { QUOTE_URL, segmentLabels as l, sizes, type SegmentCopy } from "@/content/site";

const rows = ["pequena", "mediana", "grande"] as const;

/** Segment block 4 (spec T3 → size axis 1B). Pequeña / Mediana / Grande as rows in one white cell (a list,
 *  not cards), each with the segment's own "for your case" line; the segment's typical size carries the kraft
 *  "Recomendado" chip. Heading left of the cell at lg, stacked below. Row hover shifts the title colour only
 *  (§8.14). SWAP each href to sizes[].href when the T8 size pages ship; until then it pre-selects /cotizar/. */
export default function SizeRecommender({ recommender: r }: { recommender: SegmentCopy["recommender"] }) {
  return (
    <section aria-labelledby="recommender-title" className="mx-auto grid max-w-site gap-8 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1fr_1.7fr] lg:gap-14 lg:px-10">
      <Reveal>
        <h2 id="recommender-title" className="max-w-[20ch] font-display text-3xl font-semibold text-ink">{r.title}</h2>
        <p className="mt-3 max-w-[40ch] text-[15px] text-muted">{r.body}</p>
      </Reveal>
      <Reveal group as="ul" role="list" className="rounded-lg border border-line bg-surface px-6 shadow-1 md:px-7">
        {rows.map((id, i) => {
          const s = sizes.find((b) => b.id === id)!;
          return (
            <RevealItem as="li" key={id} className={i < rows.length - 1 ? "border-b border-line" : ""}>
              <Link
                href={`${QUOTE_URL}?tamano=${id}`}
                className="group -mx-2 flex cursor-pointer items-center gap-4 rounded-md px-2 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-lg font-semibold text-ink transition-colors duration-fast ease-soft group-hover:text-primary">{s.name}</h3>
                    <span className="tnum text-[15px] font-medium text-muted">{s.range}</span>
                    {id === r.recommended && <span className="rounded-full bg-accent px-2.5 py-0.5 text-[12px] font-medium text-on-accent">{l.recommended}</span>}
                  </div>
                  <p className="mt-1 max-w-[52ch] text-[15px] leading-relaxed text-ink-2">{r.rows[id]}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-medium text-primary group-hover:text-primary-deep">
                  <span className="hidden sm:inline">{l.sizeLink}</span>
                  <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
                </span>
              </Link>
            </RevealItem>
          );
        })}
      </Reveal>
    </section>
  );
}
