import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import PageIntro from "@/components/PageIntro";
import SchemaScript from "@/components/SchemaScript";
import PriceBand from "@/components/bodegaje/PriceBand";
import ClosingBand from "@/components/sections/ClosingBand";
import { sizeArt } from "@/components/sections/SizeStrip";
import M3Guide from "@/components/segmento/M3Guide";
import AvailabilityBySede from "@/components/tamanos/AvailabilityBySede";
import SizeCompareStrip from "@/components/tamanos/SizeCompareStrip";
import { QUOTE_URL, bodegajePillar, segmentLabels, silos, sizePage as l, sizePages, sizes, type SizeId } from "@/content/site";
import { pageMeta, service } from "@/lib/schema";

/* UNBLOCK CHECKLIST (spec Open Item 2, the occupancy file):
 *  1) Fill the real m³ bands, units per band and price range per band into content/facts.ts `sizes` (and the
 *     real per-sede availability into content/sedes.ts `sizesAvailable`); drop the SWAP in content/tamanos.ts.
 *  2) Flip `robots` below to index, and swap the service() JSON-LD for Product/Offer once a price exists.
 *  3) Swap the size hrefs from /cotizar/?tamano= to sizes[].href in components/bodegaje/AxisChooser.tsx
 *     (SizeCards), components/segmento/SizeRecommender.tsx, components/sedes/SizesAtSede.tsx and
 *     content/blog/cuanto-espacio-necesito.ts `next.links` (each already marked SWAP / T8). */

const find = (id: SizeId) => sizes.findIndex((s) => s.id === id);

/** Metadata for a size route. noindex until the checklist above closes: a size page with invented
 *  dimensions is worse than no size page at all. */
export const sizeMeta = (id: SizeId): Metadata => {
  const t = sizePages[id];
  return { ...pageMeta({ title: t.metaTitle, description: t.description, path: sizes[find(id)].href }), robots: { index: false, follow: true } };
};

/** Intro aside: the band's illustration, its m³ range as the big figure and what fits. No `hint`: the homepage's
 *  "Disponible en todas las sedes" would contradict the per-sede "Consultar" rows further down. */
function RangeCell({ i }: { i: number }) {
  const s = sizes[i];
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-2">
      <div aria-hidden="true" className="relative flex aspect-[16/10] items-end justify-center overflow-hidden bg-gradient-to-b from-primary-soft to-surface">
        <Image src={sizeArt[i]} alt="" width={1254} height={1254} priority sizes="(min-width: 1024px) 35vw, 100vw" className="h-full w-auto max-w-none translate-y-[10%]" />
      </div>
      <div className="p-6 md:p-7">
        <p className="tnum font-display text-display font-semibold text-ink">{s.range}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{s.fits}</p>
      </div>
    </div>
  );
}

/** Spec T8, one template for the four silo-1B routes; each route passes its size id, copy in content/tamanos.ts.
 *  Blocks: breadcrumb (Bodegaje › size) → intro with the range cell and the up-link to the pillar → what fits
 *  (M3Guide, three references inside the band) → price band ("Cotiza tu tarifa", no numbers, R5) → availability
 *  by sede (197 first, R6) → compare with the neighbouring sizes → dual CTA band.
 *  Silo law (R3): up to /bodegaje-bogota/, sideways to the other sizes and the sedes; nothing cross-silo. */
export default function SizeTemplate({ id }: { id: SizeId }) {
  const i = find(id);
  const s = sizes[i];
  const t = sizePages[id];
  const quoteHref = `${QUOTE_URL}?tamano=${id}`;
  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <SchemaScript data={service({ name: t.h1, description: t.description, path: s.href })} />
      <Breadcrumb items={[{ name: bodegajePillar.crumb, href: silos.bodegaje.href }, { name: t.h1, href: s.href }]} />
      <PageIntro h1={t.h1} intro={t.intro} link={segmentLabels.up} aside={<RangeCell i={i} />} quoteHref={quoteHref} />
      <M3Guide guide={t.guide} />
      <PriceBand title={l.priceTitle} body={t.priceBody} link={null} quoteHref={quoteHref} />
      <AvailabilityBySede id={id} />
      <SizeCompareStrip id={id} />
      <ClosingBand title={t.cta.title} body={t.cta.body} quoteHref={quoteHref} />
    </main>
  );
}
