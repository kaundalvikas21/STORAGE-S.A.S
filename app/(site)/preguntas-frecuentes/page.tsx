import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import PageIntro from "@/components/PageIntro";
import SchemaScript from "@/components/SchemaScript";
import FaqHub, { FaqIndex } from "@/components/faq/FaqHub";
import ClosingBand from "@/components/sections/ClosingBand";
import { faqHub as t } from "@/content/site";
import { faqPage, pageMeta } from "@/lib/schema";

export const metadata: Metadata = pageMeta({ title: t.metaTitle, description: t.description, path: t.path });

/** /preguntas-frecuentes/ (spec T6 FAQ hub). Blocks: breadcrumb → h1 + direct answer → theme index +
 *  theme index (dark cell beside the prose) → grouped accordions → closing CTA band. ONE FAQPage JSON-LD for every question on the page. The hub
 *  may link into every silo (spec "Links down: All silos"). */
export default function FaqHubPage() {
  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <SchemaScript data={faqPage(t.groups.flatMap((g) => g.items))} />
      <Breadcrumb items={[{ name: t.crumb, href: t.path }]} />
      <PageIntro h1={t.h1} intro={t.intro} aside={<FaqIndex />} />
      <FaqHub />
      <ClosingBand title={t.cta.title} body={t.cta.body} />
    </main>
  );
}
