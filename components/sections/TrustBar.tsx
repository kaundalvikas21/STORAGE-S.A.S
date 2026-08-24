import Reveal, { RevealItem } from "@/components/Reveal";
import AnimatedNumber from "./AnimatedNumber";
import { trust } from "@/content/site";

/** Dark bento strip: lime tabular numerals count up once (lime on dark = 13:1, MASTER.md §1). */
export default function TrustBar() {
  return (
    <section aria-labelledby="trust-title" className="dark-cell order-8">
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-16 lg:px-10">
        <h2 id="trust-title" className="sr-only">Storage S.A.S en cifras</h2>
        <Reveal group as="ul" className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-5" role="list">
          {trust.map((t) => (
            <RevealItem as="li" key={t.label} className="flex flex-col items-start md:items-center md:text-center">
              <AnimatedNumber value={t.value} suffix={t.suffix} className="font-display text-3xl font-semibold leading-none text-accent md:text-[2.5rem]" />
              <span className="mt-3 text-[13px] text-muted">{t.label}</span>
            </RevealItem>
          ))}
        </Reveal>
        <p className="mt-10 max-w-[70ch] text-[14px] text-muted md:mx-auto md:text-center">
          Monitoreo por CCTV 24/7, registro individual de ingreso y candado propio en cada bodega: sabes en todo momento cómo está tu espacio.
        </p>
      </div>
    </section>
  );
}
