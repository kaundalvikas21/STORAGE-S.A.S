import Link from "next/link";
import { ArrowRight, Calculator, Key, Receipt } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem, RevealRule } from "@/components/Reveal";
import { steps } from "@/content/site";

const icons = [Calculator, Receipt, Key];

/**
 * "Cómo funciona", ported from el-sistema (client checklist §1). The heading follows the page's
 * section hierarchy (left-aligned display h2 at text-3xl, same padding as its neighbours); the
 * steps keep el-sistema's timeline: icon tiles on a hairline that draws in on scroll, centered
 * columns and 01/02/03 badges marking the sequence (declared exception, MASTER.md §8.17), in the
 * logo yellow. Calculas and Cotizas link to their tools; "Guardas con nosotros" is the outcome,
 * so it stays plain text. Placed right after the calculator cards.
 */
export default function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="order-2">
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10 lg:py-24">
        <Reveal group>
          <RevealItem>
            <h2 id="how-title" className="max-w-[20ch] font-display text-3xl font-semibold text-ink">
              Cómo funciona
            </h2>
          </RevealItem>
          <ol className="relative mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
            <RevealRule className="absolute inset-x-[16%] top-7 hidden md:block" />
            {steps.map((s, i) => {
              const Icon = icons[i];
              return (
                <RevealItem as="li" key={s.verb} className="relative flex gap-4 md:flex-col md:items-center md:gap-0 md:text-center">
                  <div className="relative flex shrink-0 md:mb-5">
                    <span className="flex h-14 w-14 items-center justify-center rounded-lg border border-line bg-surface text-primary shadow-1">
                      <Icon size={26} weight="regular" aria-hidden="true" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="tnum absolute -left-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full border border-brand-deep bg-brand px-1.5 text-[11px] font-semibold text-on-brand"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    {s.href ? (
                      <Link
                        href={s.href}
                        {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-sm text-xl font-semibold text-ink transition-colors duration-fast ease-soft hover:text-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span className="link-draw">{s.verb}</span>
                        <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
                      </Link>
                    ) : (
                      <p className="flex min-h-[44px] items-center text-xl font-semibold text-ink md:justify-center">{s.verb}</p>
                    )}
                    <p className="mt-1 max-w-[36ch] text-[15px] text-muted md:mx-auto">{s.body}</p>
                  </div>
                </RevealItem>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
