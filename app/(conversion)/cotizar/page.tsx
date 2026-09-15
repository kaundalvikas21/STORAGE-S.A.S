import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import SchemaScript from "@/components/SchemaScript";
import QuoteForm from "@/components/conversion/QuoteForm";
import TrustRail from "@/components/conversion/TrustRail";
import { QUOTE_URL, quotePage as t, sedes, sizes } from "@/content/site";
import { pageMeta, webPage } from "@/lib/schema";

const description = t.lead;

export const metadata: Metadata = pageMeta({ title: "Cotiza tu Bodega en Bogotá | Storage S.A.S", description, path: QUOTE_URL });

type Search = Promise<Record<string, string | string[] | undefined>>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

/** /cotizar/ (spec T7), the qualifying form in front of WhatsApp. Blocks: breadcrumb → h1 + form →
 *  trust rail. ?tamano= (band id, from the calculator) and ?sede= (sede id or page slug, from any
 *  inner page) pre-select answers; only values that exist in content are accepted. */
export default async function QuotePage({ searchParams }: { searchParams: Search }) {
  const q = await searchParams;
  const tamano = sizes.find((b) => b.id === first(q.tamano))?.id ?? "";
  const s = first(q.sede);
  const sede = (sedes.find((x) => x.id === s) ?? sedes.find((x) => x.slug === s))?.id ?? "";

  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <SchemaScript data={webPage({ name: t.h1, description, path: QUOTE_URL })} />
      <Breadcrumb items={[{ name: t.crumb, href: QUOTE_URL }]} />
      <div className="mx-auto grid max-w-site gap-8 px-5 pb-14 pt-2 md:px-8 md:pb-20 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-10 lg:px-10">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">{t.h1}</h1>
          <p className="mt-3 max-w-[60ch] text-[16px] leading-relaxed text-ink-2">{t.lead}</p>
          <div className="mt-8 rounded-lg border border-line bg-surface p-5 shadow-1 md:p-8">
            <QuoteForm initial={{ sede, tamano }} />
          </div>
        </div>
        <TrustRail />
      </div>
    </main>
  );
}
