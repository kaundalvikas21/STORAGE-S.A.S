import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import SchemaScript from "@/components/SchemaScript";
import ClosingBand from "@/components/sections/ClosingBand";
import CoverageProse from "@/components/sedes/CoverageProse";
import SedeFeatured from "@/components/sedes/SedeFeatured";
import SedeGrid from "@/components/sedes/SedeGrid";
import SedesHero from "@/components/sedes/SedesHero";
import { SEDES_URL, sedePages, sedesHub as t } from "@/content/site";
import { itemList, pageMeta } from "@/lib/schema";

export const metadata: Metadata = pageMeta({ title: t.metaTitle, description: t.description, path: SEDES_URL });

/** /sedes/ (spec T4 location hub). Blocks: breadcrumb → h1 + map → featured Autopista Norte →
 *  remaining sede cards → coverage prose → closing CTA band. Links down to the four sede pages only
 *  (R3). `.sede-band` on <main> scopes the Leaflet styles and lets card hover light its map pin. */
export default function SedesPage() {
  return (
    <main id="main" tabIndex={-1} className="sede-band focus:outline-none">
      <SchemaScript data={itemList(sedePages.map((s) => ({ name: `Sede ${s.title}`, path: `/sedes/${s.slug}/` })))} />
      <Breadcrumb items={[{ name: t.crumb, href: SEDES_URL }]} />
      <SedesHero />
      <SedeFeatured />
      <SedeGrid />
      <CoverageProse />
      <ClosingBand title={t.cta.title} body={t.cta.body} />
    </main>
  );
}
