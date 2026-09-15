import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { coveragePhoto } from "@/content/images";
import { sedesHub } from "@/content/sedes";
import { silos } from "@/content/site";

/** /sedes/ block 4: orientation prose from content, not a keyword list and no neighbourhood links
 *  (spec T4 note 4: zone pages would be doorway pages). One up-link to the Bodegaje pillar (R3).
 *  Prose left, a sede-beside-the-avenue photo right at lg (fills the text column's height);
 *  below lg the photo stacks under the text. */
export default function CoverageProse() {
  return (
    <section aria-labelledby="coverage-title" className="border-t border-line bg-primary-soft">
      <div className="mx-auto grid max-w-site gap-8 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-14 lg:px-10">
        <Reveal>
          <h2 id="coverage-title" className="max-w-[24ch] font-display text-3xl font-semibold text-ink">{sedesHub.coverageTitle}</h2>
          <div className="mt-5 flex max-w-[65ch] flex-col gap-4 text-[16px] leading-relaxed text-ink-2">
            {sedesHub.coverage.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <Link
            href={silos.bodegaje.href}
            className="group mt-6 inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-[2px] text-[15px] font-medium text-primary hover:text-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="link-draw">{silos.bodegaje.title}</span>
            <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
          </Link>
        </Reveal>
        <Reveal delay={0.1} className="h-full">
          <Photo
            img={coveragePhoto}
            sizes="(min-width: 1024px) 45vw, 100vw"
            zoom={false}
            className="aspect-[4/3] w-full rounded-lg border border-line shadow-2 lg:aspect-auto lg:h-full lg:min-h-[380px]"
          />
        </Reveal>
      </div>
    </section>
  );
}
