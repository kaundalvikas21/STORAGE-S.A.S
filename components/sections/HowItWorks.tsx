import { Calculator, Key, Receipt } from "@phosphor-icons/react/dist/ssr";
import { RevealRule } from "@/components/motion/Reveal";
import RevealStagger, { RevealItem } from "@/components/motion/RevealStagger";

const steps = [
  { n: "01", verb: "Calculas", body: "Usa la calculadora y conoce tu tamaño en dos minutos.", Icon: Calculator },
  { n: "02", verb: "Cotizas", body: "Recibe el valor exacto el mismo día.", Icon: Receipt },
  { n: "03", verb: "Te mudas", body: "Llegas con tu candado y entras cuando quieras.", Icon: Key },
];

/**
 * Slim 3-step timeline: icon tiles sit on the hairline that draws in on scroll (signature moment #2),
 * numbered nodes carry the sequence visually. Copy is unchanged.
 */
export default function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="order-2">
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-16 lg:px-10">
        <RevealStagger>
          <RevealItem>
            <h2 id="how-title" className="eyebrow md:block md:text-center">
              Cómo funciona
            </h2>
          </RevealItem>
          <ol className="relative mt-6 grid gap-8 md:grid-cols-3 md:gap-6">
            <RevealRule className="absolute inset-x-[16%] top-7 hidden md:block" />
            {steps.map(({ n, verb, body, Icon }) => (
              <RevealItem key={n} as="li" className="relative flex gap-4 md:flex-col md:items-center md:gap-0 md:text-center">
                <div className="relative flex shrink-0 items-center gap-3 md:mb-5">
                  <span className="flex h-14 w-14 items-center justify-center rounded-lg border border-line bg-bg text-primary shadow-1">
                    <Icon size={26} weight="regular" aria-hidden="true" />
                  </span>
                  <span className="tnum absolute -left-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-on-primary">
                    {n}
                  </span>
                </div>
                <div>
                  <p className="text-xl font-semibold text-ink">{verb}</p>
                  <p className="mt-2 max-w-[36ch] text-[15px] text-muted md:mx-auto">{body}</p>
                </div>
              </RevealItem>
            ))}
          </ol>
        </RevealStagger>
      </div>
    </section>
  );
}
