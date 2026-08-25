"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { RevealItem, RevealStagger } from "@/components/motion/Reveal";

type Props = { columns: { title: string; body: ReactNode; full?: boolean }[] };

/**
 * No rule under the heading at desktop. Eight hairlines at four different widths read as
 * noise, not structure — the display type and the orange zone labels already carry the
 * hierarchy. Spacing separates the heading from its list instead. The only rules left in the
 * footer are the ones doing structural work: the footer boundary, the masthead, the tier
 * divider and the NAP plate. Below `md` the accordion keeps its row rule as tap affordance.
 */
const summaryCls =
  "flex items-center justify-between gap-4 py-4 md:py-0 md:mb-5 " +
  "md:pointer-events-none md:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/**
 * Footer link columns: plain columns at md+, accordion below it.
 *
 * A single <details open> attribute cannot be "closed on mobile, open on desktop", and forcing
 * it open with ::details-content would leave desktop CONTENT HIDDEN in browsers that lack that
 * selector. So the enhancement runs in the safe direction instead: the server renders every
 * column open — crawlers, no-JS visitors and desktop all get the full list — and the only thing
 * JS does is collapse the extra columns once it knows the viewport is small.
 *
 * `open` is set imperatively on the element, never passed as a React prop, so React does not
 * fight the user's own clicks afterwards.
 */
export default function FooterNav({ columns }: Props) {
  const refs = useRef<(HTMLDetailsElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => refs.current.forEach((el, i) => el && (el.open = !mq.matches || i === 0));
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <nav aria-label="Enlaces del pie">
      {/* Two tiers: the short link lists sit side by side, and the sede index — which is 3x
          taller than any of them — spans the full width instead of leaving a ragged void
          under its neighbours. Same accordion mechanism for both. */}
      <RevealStagger className="grid gap-y-2 md:gap-x-10 md:gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {columns.map((col, i) => (
          <RevealItem
            key={col.title}
            className={col.full ? "md:col-span-2 lg:col-span-3 md:mt-2 md:border-t md:border-bg/15 md:pt-12" : undefined}
          >
            <details
              ref={(el) => {
                refs.current[i] = el;
              }}
              open
              className="group border-b border-bg/15 md:border-b-0"
            >
              <summary className={summaryCls}>
                <h2 className="font-display text-[15px] font-bold uppercase tracking-[0.06em]">{col.title}</h2>
                <span
                  className="font-mono text-2xl leading-none text-primary shrink-0 transition-transform duration ease-soft group-open:rotate-45 md:hidden"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="pb-5 md:pb-0">{col.body}</div>
            </details>
          </RevealItem>
        ))}
      </RevealStagger>
    </nav>
  );
}
