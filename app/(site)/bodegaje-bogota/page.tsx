import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import PageIntro from "@/components/PageIntro";
import SchemaScript from "@/components/SchemaScript";
import AxisChooser from "@/components/bodegaje/AxisChooser";
import FaqAccordion from "@/components/bodegaje/FaqAccordion";
import IncludedGrid from "@/components/bodegaje/IncludedGrid";
import PriceBand from "@/components/bodegaje/PriceBand";
import ClosingBand from "@/components/sections/ClosingBand";
import HowItWorks from "@/components/sections/HowItWorks";
import SegmentStrip from "@/components/sections/SegmentStrip";
import { pillarPhoto } from "@/content/images";
import { QUOTE_URL, bodegajePillar as t, silos } from "@/content/site";
import { faqPage, pageMeta } from "@/lib/schema";

/*
 * CANNIBALIZATION PROTOCOL (spec 02, T2): the homepage currently ranks #9 for "bodegaje bogotá".
 * Keep the homepage title brand + "storage" focused so this pillar owns "bodegaje", and watch both
 * positions for 60 days after launch.
 */
export const metadata: Metadata = pageMeta({ title: t.metaTitle, description: t.description, path: silos.bodegaje.href });

/** /bodegaje-bogota/ (spec T2 money-silo pillar). Blocks: breadcrumb → intro → choose by size /
 *  segment / sede → included → how it works → price band → FAQ → dual CTA band. Silo law (R3): the
 *  axis cards link down into silo 1; the only other body links are /precios/ (spec block 7) and the
 *  two conversion tools. */
export default function BodegajePage() {
  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <SchemaScript data={faqPage(t.faq)} />
      <Breadcrumb items={[{ name: t.crumb, href: silos.bodegaje.href }]} />
      <PageIntro h1={t.h1} intro={t.intro} photo={pillarPhoto} />
      <AxisChooser variant="size" />
      {/* SWAP: drop `href` when the T3 segment pages ship, so each card uses its own segments[].href. */}
      <SegmentStrip title={t.segment.title} body={t.segment.body} href={QUOTE_URL} />
      <AxisChooser variant="sede" />
      <IncludedGrid />
      <HowItWorks />
      <PriceBand />
      <FaqAccordion title={t.faqTitle} items={t.faq} />
      <ClosingBand title={t.cta.title} body={t.cta.body} />
    </main>
  );
}
