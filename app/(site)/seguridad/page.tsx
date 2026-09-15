import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import PageIntro from "@/components/PageIntro";
import SchemaScript from "@/components/SchemaScript";
import FaqAccordion from "@/components/bodegaje/FaqAccordion";
import ClosingBand from "@/components/sections/ClosingBand";
import SecurityFeatures from "@/components/seguridad/SecurityFeatures";
import { seguridadPhoto } from "@/content/images";
import { seguridadPage as t } from "@/content/site";
import { faqPage, pageMeta, webPage } from "@/lib/schema";

export const metadata: Metadata = pageMeta({ title: t.metaTitle, description: t.description, path: t.path });

/** /seguridad/ (spec T6, the primary purchase objection). Blocks: breadcrumb → h1 + direct answer →
 *  five capabilities bento (+ link to /sedes/) → FAQ → closing CTA band. Capability, never fear (R5).
 *  /seguros-y-polizas/ is not linked until that page exists. */
export default function SeguridadPage() {
  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <SchemaScript data={webPage({ name: t.h1, description: t.description, path: t.path })} />
      <SchemaScript data={faqPage(t.faq)} />
      <Breadcrumb items={[{ name: t.crumb, href: t.path }]} />
      <PageIntro h1={t.h1} intro={t.intro} link={t.link} photo={seguridadPhoto} />
      <SecurityFeatures />
      <FaqAccordion title={t.faqTitle} items={t.faq} path={t.path} />
      <ClosingBand title={t.cta.title} body={t.cta.body} />
    </main>
  );
}
