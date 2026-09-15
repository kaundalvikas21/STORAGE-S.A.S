import Link from "next/link";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import IsoBox, { unitContents } from "@/components/sections/IsoBox";
import { CALC_URL, segmentLabels as l, sizes, type SegmentCopy } from "@/content/site";

/** Unit scale per tier: the three drawings share one frame and grow inside it, so they read as a ladder. */
const ladder = [0.6, 0.8, 1];

/** Segment block 3 (spec T3, "the block that converts"): nobody knows what 8 m³ looks like, so each tier
 *  draws an open IsoBox unit (MASTER.md §8.1) with its m³ figure, the client's size band and a "Cabe
 *  aproximadamente" list. Stepped column widths from md (0.85/1/1.15fr) so it reads as a size ladder, not
 *  three equal cards; the largest tier is tinted. Phones stack. Closes with the calculator link. */
export default function M3Guide({ guide }: { guide: SegmentCopy["guide"] }) {
  return (
    <section aria-labelledby="guide-title" className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10">
      <Reveal>
        <h2 id="guide-title" className="max-w-[24ch] font-display text-3xl font-semibold text-ink">{guide.title}</h2>
        <p className="mt-3 max-w-[65ch] text-[15px] text-muted">{guide.body}</p>
      </Reveal>
      <Reveal group as="ul" role="list" className="mt-10 grid gap-4 md:grid-cols-[0.85fr_1fr_1.15fr] md:gap-5">
        {guide.tiers.map((tier, i) => {
          const band = sizes.find((s) => (tier.m3 ?? Infinity) <= s.maxM3) ?? sizes[sizes.length - 1];
          return (
            <RevealItem as="li" key={tier.name ?? tier.m3} className={`flex h-full flex-col rounded-lg border border-line p-6 shadow-1 md:p-7 ${i === 2 ? "bg-primary-soft" : "bg-surface"}`}>
              <IsoBox items={unitContents[tier.art]} k={ladder[i]} className="h-[136px] w-[146px]" />
              <p className="tnum mt-5 font-display text-3xl font-semibold leading-none text-ink">{tier.name ?? `${tier.m3} m³`}</p>
              <p className="mt-2 text-[14px] text-muted">
                {l.band} {band.label} · <span className="tnum">{band.range}</span>
              </p>
              <p className="mt-5 text-[14px] font-semibold text-ink">{l.fits}</p>
              <ul role="list" className="mt-2 flex flex-col gap-2 text-[15px] leading-snug text-ink-2">
                {tier.fits.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </RevealItem>
          );
        })}
      </Reveal>
      <Link
        href={CALC_URL}
        className="group mt-6 inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-[2px] text-[15px] font-medium text-primary hover:text-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="link-draw">{l.calcLink}</span>
        <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
      </Link>
    </section>
  );
}
