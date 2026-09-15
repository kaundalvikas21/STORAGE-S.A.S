import Link from "next/link";
import { ArrowRight, CheckCircle, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/Reveal";
import { sedePage, segmentLabels as l, type SegmentCopy } from "@/content/site";

/** The three capabilities every sede shares (sedes.ts baseFeatures), labelled from sedePage.features. */
const capabilities = ["candado", "registro", "cctv"] as const;

/** Segment block 5 (spec T3 security block → /seguridad/). Capability, never fear (R5): the segment's own
 *  sentence and the link left, the three shared capabilities as a checklist right at lg. The page's one
 *  dark cell. /seguridad/ is in the company silo: this link is the brief's explicit T3 block. */
export default function SecurityTeaser({ security }: { security: SegmentCopy["security"] }) {
  return (
    <section aria-labelledby="security-title" className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10">
      <Reveal className="dark-cell grid gap-8 rounded-lg p-7 shadow-3 md:p-10 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-14">
        <div>
          <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-md bg-primary-soft text-primary">
            <ShieldCheck size={26} />
          </span>
          <h2 id="security-title" className="mt-5 max-w-[24ch] font-display text-3xl font-semibold text-ink">{security.title}</h2>
          <p className="mt-3 max-w-[56ch] text-[16px] leading-relaxed text-ink-2">{security.body}</p>
          <Link
            href={l.security.href}
            className="group mt-4 inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-[2px] text-[15px] font-medium text-primary hover:text-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="link-draw">{l.security.label}</span>
            <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
          </Link>
        </div>
        <ul role="list" className="flex flex-col gap-3">
          {capabilities.map((id) => (
            <li key={id} className="flex items-center gap-3 rounded-md border border-line bg-surface px-4 py-3.5 text-[15px] font-medium text-ink">
              <CheckCircle size={20} aria-hidden="true" className="shrink-0 text-primary" />
              {sedePage.features[id]}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
