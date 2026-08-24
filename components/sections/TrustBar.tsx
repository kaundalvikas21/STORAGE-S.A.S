import Reveal, { RevealItem } from "@/components/Reveal";
import AnimatedNumber from "./AnimatedNumber";
import { trust } from "@/content/site";

/** Full-bleed ink band: orange mono numerals with count-up, uppercase mono labels. */
export default function TrustBar() {
  return (
    <section aria-labelledby="trust-title" className="order-8 border-y-[1.5px] border-ink bg-ink text-bg">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-14 md:py-16">
        <h2 id="trust-title" className="sr-only">Storage S.A.S en cifras</h2>
        <Reveal group as="ul" className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-10" role="list">
          {trust.map((t) => (
            <RevealItem as="li" key={t.label} className="flex flex-col items-start md:items-center md:text-center">
              <AnimatedNumber value={t.value} suffix={t.suffix} className="font-mono text-3xl md:text-[3rem] font-bold leading-none text-primary" />
              <span className="mt-3 font-mono text-[12px] uppercase tracking-[0.12em] text-bg/75">{t.label}</span>
            </RevealItem>
          ))}
        </Reveal>
        <p className="mt-10 text-[14px] text-bg/70 max-w-[70ch] md:mx-auto md:text-center">
          Monitoreo por CCTV 24/7, registro individual de ingreso y candado propio en cada bodega: sabes en todo momento cómo está tu espacio.
        </p>
      </div>
    </section>
  );
}
