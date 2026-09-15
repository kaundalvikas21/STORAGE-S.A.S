import Breadcrumb from "@/components/Breadcrumb";
import PageIntro from "@/components/PageIntro";
import SchemaScript from "@/components/SchemaScript";
import AxisChooser from "@/components/bodegaje/AxisChooser";
import FaqAccordion from "@/components/bodegaje/FaqAccordion";
import ClosingBand from "@/components/sections/ClosingBand";
import BlogTeasers from "@/components/segmento/BlogTeasers";
import M3Guide from "@/components/segmento/M3Guide";
import SecurityTeaser from "@/components/segmento/SecurityTeaser";
import SizeRecommender from "@/components/segmento/SizeRecommender";
import UseCases from "@/components/segmento/UseCases";
import { segmentPhotos } from "@/content/images";
import { bodegajePillar, segmentLabels as l, segmentPages, silos, type SegmentCopy, type SegmentSlug } from "@/content/site";
import { faqPage, pageMeta, service } from "@/lib/schema";

/** Metadata for a segment route (title ≤60, description ≤155, canonical with trailing slash). */
export const segmentMeta = (slug: SegmentSlug) => {
  const t = segmentPages[slug];
  return pageMeta({ title: t.metaTitle, description: t.description, path: t.path });
};

/** Spec T3, one template for the five silo-1A pages; each route passes its slug and all copy comes from
 *  content/segments.ts. Blocks: breadcrumb (Bodegaje › segment) → situation-led intro with the up-link to
 *  the pillar → use cases → m³ guide → size recommender (1B) → security teaser → nearest sede (1C, 197
 *  first) → blog teasers (secondary, to /blog/ posts) → segment FAQ → CTA band led by "Calcular mi espacio".
 *  Silo law (R3): up to /bodegaje-bogota/, sideways to the size and sede axes only; never to mudanzas. */
export default function SegmentTemplate({ slug }: { slug: SegmentSlug }) {
  const t: SegmentCopy = segmentPages[slug];
  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <SchemaScript data={service({ name: t.h1, description: t.description, path: t.path })} />
      <SchemaScript data={faqPage(t.faq)} />
      <Breadcrumb items={[{ name: bodegajePillar.crumb, href: silos.bodegaje.href }, { name: t.crumb, href: t.path }]} />
      <PageIntro h1={t.h1} intro={t.intro} link={l.up} photo={segmentPhotos[slug]} />
      <UseCases useCases={t.useCases} />
      <M3Guide guide={t.guide} />
      <SizeRecommender recommender={t.recommender} />
      <SecurityTeaser security={t.security} />
      <AxisChooser variant="sede" title={t.sede.title} body={t.sede.body} />
      <BlogTeasers blog={t.blog} />
      <FaqAccordion title={t.faqTitle} items={t.faq} path={t.path} />
      <ClosingBand title={t.cta.title} body={t.cta.body} primary="calcular" />
    </main>
  );
}
