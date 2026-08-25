import CountUp from "@/components/motion/CountUp";
import RevealStagger, { RevealItem } from "@/components/motion/RevealStagger";
import { trust } from "@/content/site";

/** Quiet inline stat row on hairline top/bottom borders; accent tabular numbers count up once. */
export default function TrustBar() {
  return (
    <section aria-labelledby="trust-title" className="order-8 border-y border-line">
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-16 lg:px-10">
        <h2 id="trust-title" className="sr-only">
          Storage S.A.S en cifras
        </h2>
        <RevealStagger as="ul" role="list" className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-5">
          {trust.map((t) => (
            <RevealItem as="li" key={t.label} className="flex flex-col items-start md:items-center md:text-center">
              <CountUp value={t.value} suffix={t.suffix} className="text-3xl font-semibold leading-none text-primary md:text-[2.5rem]" />
              <span className="mt-3 text-[13px] text-muted">{t.label}</span>
            </RevealItem>
          ))}
        </RevealStagger>
        <p className="mt-10 max-w-[70ch] text-[14px] text-muted md:mx-auto md:text-center">
          Monitoreo por CCTV 24/7, registro individual de ingreso y candado propio en cada bodega: sabes en todo momento cómo está tu espacio.
        </p>
      </div>
    </section>
  );
}
