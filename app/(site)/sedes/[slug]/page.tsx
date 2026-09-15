import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import SchemaScript from "@/components/SchemaScript";
import ClosingBand from "@/components/sections/ClosingBand";
import AccessSecurity from "@/components/sedes/AccessSecurity";
import SedeGallery from "@/components/sedes/SedeGallery";
import SedeHero from "@/components/sedes/SedeHero";
import SedeLocation from "@/components/sedes/SedeLocation";
import SedeReviews from "@/components/sedes/SedeReviews";
import SizesAtSede from "@/components/sedes/SizesAtSede";
import ZonesServed from "@/components/sedes/ZonesServed";
import { sedeGallery, sedePhotos, zonePhotos } from "@/content/images";
import { QUOTE_URL, SEDES_URL, sedeDetails, sedePage as t, sedePages } from "@/content/site";
import { pageMeta, selfStorage } from "@/lib/schema";

type Params = Promise<{ slug: string }>;

// The four spec URLs only (P5); any other slug 404s.
export const dynamicParams = false;
export const generateStaticParams = () => sedePages.map((s) => ({ slug: s.slug }));

const find = (slug: string) => {
  const page = sedePages.find((s) => s.slug === slug);
  return page && { page, detail: sedeDetails[slug] };
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const f = find(slug);
  return f ? pageMeta({ title: f.detail.metaTitle, description: f.detail.description, path: `/sedes/${slug}/` }) : {};
}

/** /sedes/{slug}/ (spec T5). Blocks: breadcrumb → h1 + actions → gallery → sizes → access & security →
 *  map + directions → zones served → reviews (renders once GBP data exists) → closing CTA band.
 *  One SelfStorage JSON-LD per physical point. Links go up only (/sedes/, /bodegaje-bogota/, R3).
 *  `.sede-band` on <main> scopes the Leaflet styles and lets a point card light its pin. */
export default async function SedeRoute({ params }: { params: Params }) {
  const { slug } = await params;
  const f = find(slug);
  if (!f) notFound();
  const { page, detail } = f;
  const quoteHref = `${QUOTE_URL}?sede=${slug}`;

  return (
    <main id="main" tabIndex={-1} className="sede-band focus:outline-none">
      {page.points.map((p) => (
        <SchemaScript key={p.id} data={selfStorage(p, sedePhotos[p.id].src)} />
      ))}
      <Breadcrumb items={[{ name: t.crumb, href: SEDES_URL }, { name: page.title, href: `/sedes/${slug}/` }]} />
      <SedeHero page={page} detail={detail} />
      <SedeGallery photos={sedeGallery[slug]} />
      <SizesAtSede slug={slug} detail={detail} />
      <AccessSecurity detail={detail} />
      <SedeLocation points={page.points} />
      <ZonesServed detail={detail} photo={zonePhotos[slug]} />
      <SedeReviews />
      <ClosingBand title={t.ctaTitle} body={t.ctaBody} quoteHref={quoteHref} />
    </main>
  );
}
