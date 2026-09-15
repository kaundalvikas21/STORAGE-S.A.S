import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import FaqList from "@/components/FaqList";
import SchemaScript from "@/components/SchemaScript";
import Calculator from "@/components/conversion/Calculator";
import { CALC_URL, calcFaq, calcPage as t } from "@/content/site";
import { faqPage, pageMeta, webApplication } from "@/lib/schema";

const description =
  "Selecciona tus muebles y objetos y te decimos qué tamaño de bodega necesitas. Resultado inmediato y cotización sin compromiso.";

export const metadata: Metadata = pageMeta({ title: "Calculadora de Espacio | ¿Qué Bodega Necesito?", description, path: CALC_URL });

/** /calculadora-de-espacio/ (spec T7). Blocks: breadcrumb → h1 + indexable intro → calculator
 *  tool → size FAQ (targets "cuánto espacio necesito bodega"). Intro and FAQ are server HTML; the
 *  tool server-renders at zero and hydrates. */
export default function CalculatorPage() {
  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <SchemaScript data={webApplication({ name: t.h1, description, path: CALC_URL })} />
      <SchemaScript data={faqPage(calcFaq)} />
      <Breadcrumb items={[{ name: t.crumb, href: CALC_URL }]} />
      <div className="mx-auto max-w-site px-5 pb-14 pt-2 md:px-8 md:pb-20 lg:px-10">
        <h1 className="max-w-[22ch] font-display text-3xl font-semibold text-ink">{t.h1}</h1>
        <p className="mt-3 max-w-[65ch] text-[16px] leading-relaxed text-ink-2">{t.intro}</p>
        <div className="mt-8">
          <Calculator />
        </div>
        <section aria-labelledby="calc-faq-title" className="mt-16 max-w-3xl">
          <h2 id="calc-faq-title" className="font-display text-2xl font-semibold text-ink">{t.faqTitle}</h2>
          <FaqList items={calcFaq} name="calc-faq" className="mt-6" />
        </section>
      </div>
    </main>
  );
}
