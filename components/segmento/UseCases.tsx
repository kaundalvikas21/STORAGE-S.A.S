import Reveal from "@/components/Reveal";
import type { SegmentCopy } from "@/content/site";

/** Segment block 2 (spec T3): the situations people actually arrive with, as chips. A slim white band:
 *  heading left of the chips at lg, stacked below. Chips are labels, not links (no doorway pages). */
export default function UseCases({ useCases }: { useCases: SegmentCopy["useCases"] }) {
  return (
    <section aria-labelledby="uses-title" className="border-y border-line bg-surface">
      <Reveal className="mx-auto flex max-w-site flex-col gap-5 px-5 py-10 md:px-8 md:py-12 lg:flex-row lg:items-center lg:gap-10 lg:px-10">
        <h2 id="uses-title" className="shrink-0 font-display text-2xl font-semibold text-ink">{useCases.title}</h2>
        <ul role="list" className="flex flex-wrap gap-2">
          {useCases.items.map((u) => (
            <li key={u} className="rounded-full border border-line bg-bg px-4 py-2 text-[15px] text-ink-2">{u}</li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
