import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { SEDES_URL } from "@/content/facts";
import type { Photo as PhotoData } from "@/content/images";
import { sedePage as t, type SedeDetail } from "@/content/sedes";
import { silos } from "@/content/site";

const link =
  "group inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-sm text-[15px] font-medium text-primary hover:text-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** Sede page block 7 (spec T5 note 6): the catchment unique to this sede, so the four pages are never
 *  copies of each other. Chips + zoneProse from content; no neighbourhood links (doorway-page risk).
 *  Silo law R3: the only body links go up, to /sedes/ and the Bodegaje pillar.
 *  With a `photo` (content/images.ts zonePhotos) it becomes the hub CoverageProse split: prose left,
 *  the catchment photo right at lg filling the text column's height, stacked below on mobile. */
export default function ZonesServed({ detail, photo }: { detail: SedeDetail; photo?: PhotoData }) {
  return (
    <section aria-labelledby="zones-title" className="border-t border-line bg-primary-soft">
      <div className={`mx-auto grid max-w-site gap-8 px-5 py-14 md:px-8 md:py-20 lg:px-10 ${photo ? "lg:grid-cols-[1.15fr_1fr] lg:gap-14" : ""}`}>
        <Reveal>
          <h2 id="zones-title" className="max-w-[28ch] text-balance font-display text-3xl font-semibold text-ink">
            {t.zonesHeading}: {detail.zonesTitle}
          </h2>
          <ul role="list" className="mt-5 flex flex-wrap gap-2">
            {detail.zones.map((z) => (
              <li key={z} className="rounded-full border border-line bg-surface px-3 py-1 text-[14px] text-ink-2">{z}</li>
            ))}
          </ul>
          <div className="mt-6 flex max-w-[65ch] flex-col gap-4 text-[16px] leading-relaxed text-ink-2">
            {detail.zoneProse.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-x-8">
            <Link href={SEDES_URL} className={link}>
              <span className="link-draw">{t.allSedes}</span>
              <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
            </Link>
            <Link href={silos.bodegaje.href} className={link}>
              <span className="link-draw">{silos.bodegaje.title}</span>
              <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
        {photo && (
          <Reveal delay={0.1} className="h-full">
            <Photo
              img={photo}
              sizes="(min-width: 1024px) 45vw, 100vw"
              zoom={false}
              className="aspect-[4/3] w-full rounded-lg border border-line shadow-2 lg:aspect-auto lg:h-full lg:min-h-[380px]"
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
