import Reveal, { RevealItem, RevealRule } from "@/components/Reveal";

const steps = [
  { n: "01", verb: "Calculas", body: "Usa la calculadora y conoce tu tamaño en dos minutos." },
  { n: "02", verb: "Cotizas", body: "Recibe el valor exacto el mismo día." },
  { n: "03", verb: "Te mudas", body: "Llegas con tu candado y entras cuando quieras." },
];

/** Slim 3-step row in the old calculator-entry slot. The drawn hairline is signature moment #2. */
export default function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="order-2">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-14 md:py-16">
        <h2 id="how-title" className="sr-only">
          Cómo funciona
        </h2>
        <Reveal group>
          <RevealRule className="mb-8 hidden md:block" />
          <ol className="grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <RevealItem key={step.n} as="li">
                <p className="tnum text-[13px] font-medium text-primary">{step.n}</p>
                <p className="mt-1 text-xl font-semibold text-ink">{step.verb}</p>
                <p className="mt-2 max-w-[36ch] text-[15px] text-muted">{step.body}</p>
              </RevealItem>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
