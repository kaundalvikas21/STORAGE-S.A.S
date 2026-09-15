import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import PageIntro from "@/components/PageIntro";
import SchemaScript from "@/components/SchemaScript";
import AxisChooser from "@/components/bodegaje/AxisChooser";
import FaqAccordion from "@/components/bodegaje/FaqAccordion";
import IncludedGrid from "@/components/bodegaje/IncludedGrid";
import PriceBand from "@/components/bodegaje/PriceBand";
import BridgeToBodegaje from "@/components/mudanzas/BridgeToBodegaje";
import ClosingBand from "@/components/sections/ClosingBand";
import HowItWorks from "@/components/sections/HowItWorks";
import { siloMudanzas } from "@/content/images";
import { mudanzasPillar as t } from "@/content/site";
import { faqPage, pageMeta, service } from "@/lib/schema";

export const metadata: Metadata = pageMeta({ title: t.metaTitle, description: t.description, path: t.path });

/** /mudanzas-bogota/ (spec T2b, supporting silo pillar): the /bodegaje-bogota/ pillar kit. Blocks:
 *  breadcrumb → intro → choose your service (3 children, SWAP to /cotizar/) → what we do → how it works →
 *  BridgeToBodegaje (the one cross-silo link, mudanzas → bodegaje only) → price band → FAQ → CTA band.
 *  Mudanzas keeps the traffic and routes it into storage; it must never out-link the storage silo. */
export default function MudanzasPage() {
  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <SchemaScript data={service({ name: t.h1, description: t.description, path: t.path })} />
      <SchemaScript data={faqPage(t.faq)} />
      <Breadcrumb items={[{ name: t.crumb, href: t.path }]} />
      <PageIntro h1={t.h1} intro={t.intro} photo={siloMudanzas} />
      <AxisChooser variant="services" />
      <IncludedGrid title={t.included.title} items={t.included.items} />
      <HowItWorks steps={t.steps} />
      <BridgeToBodegaje />
      <PriceBand title={t.price.title} body={t.price.body} link={null} />
      <FaqAccordion title={t.faqTitle} items={t.faq} />
      <ClosingBand title={t.cta.title} body={t.cta.body} />
    </main>
  );
}
