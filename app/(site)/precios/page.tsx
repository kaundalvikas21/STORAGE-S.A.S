import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import PageIntro from "@/components/PageIntro";
import SchemaScript from "@/components/SchemaScript";
import FaqAccordion from "@/components/bodegaje/FaqAccordion";
import IncludedVsExtra from "@/components/precios/IncludedVsExtra";
import PriceFactors from "@/components/precios/PriceFactors";
import PriceTable from "@/components/precios/PriceTable";
import ClosingBand from "@/components/sections/ClosingBand";
import { preciosPhoto } from "@/content/images";
import { preciosPage as t } from "@/content/site";
import { faqPage, pageMeta } from "@/lib/schema";

export const metadata: Metadata = pageMeta({ title: t.metaTitle, description: t.description, path: t.path });

/** /precios/ (spec T6, the dominant search intent). Blocks: breadcrumb → h1 + direct answer → price table
 *  → what defines the price → included vs extra → FAQ → closing CTA band. Spec block 5 (cost of moving to
 *  a bigger home) waits for real figures. Links: up to /bodegaje-bogota/, down to the calculator. */
export default function PreciosPage() {
  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <SchemaScript data={faqPage(t.faq)} />
      <Breadcrumb items={[{ name: t.crumb, href: t.path }]} />
      <PageIntro h1={t.h1} intro={t.intro} link={t.link} photo={preciosPhoto} wholePhoto />
      <PriceTable />
      <PriceFactors />
      <IncludedVsExtra />
      <FaqAccordion title={t.faqTitle} items={t.faq} path={t.path} />
      <ClosingBand title={t.cta.title} body={t.cta.body} />
    </main>
  );
}
