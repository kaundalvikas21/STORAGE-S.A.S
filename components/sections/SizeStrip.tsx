import Link from "next/link";
import { ArrowRight, Package, Door, Garage, Ruler } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import { sizes } from "@/content/site";

const icons = [Package, Door, Garage, Ruler];

/** 2-col horizontal cards; availability chips (lime = the lever that fills Calle 197). */
export default function SizeStrip() {
  return (
    <section aria-labelledby="sizes-title" className="order-6">
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10 lg:py-24">
        <Reveal>
          <h2 id="sizes-title" className="max-w-[20ch] font-display text-3xl font-semibold text-ink">Minibodegas del tamaño justo</h2>
          <p className="mt-3 max-w-[52ch] text-[15px] text-muted">Bodegas por meses desde 1 m³. Cambias de tamaño cuando tu necesidad cambia.</p>
        </Reveal>

        <Reveal group as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 md:gap-5" role="list">
          {sizes.map((s, i) => {
            const Icon = icons[i];
            return (
              <RevealItem as="li" key={s.href}>
                <Link
                  href={s.href}
                  className="group flex h-full cursor-pointer gap-5 rounded-lg border border-line bg-surface p-6 shadow-1 transition-all duration ease-soft hover:-translate-y-0.5 hover:shadow-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Icon size={24} weight="regular" aria-hidden="true" className="mt-1 shrink-0 text-primary" />
                  <span className="flex flex-1 flex-col">
                    <span className="flex flex-wrap items-center gap-2">
                      <h3 className="break-words text-lg font-semibold text-ink">{s.name}</h3>
                      {s.differential && <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-[12px] font-medium text-primary-deep">Diferencial</span>}
                    </span>
                    <span className="tnum mt-1 text-2xl font-semibold text-ink">{s.range}</span>
                    <span className="mt-2 text-[14px] text-ink-2">Cabe aprox.: {s.fits}</span>
                    <span
                      className={`mt-3 inline-flex self-start rounded-full px-2.5 py-1 text-[12px] font-medium ${
                        s.hot ? "bg-accent text-on-accent" : "border border-line bg-bg text-muted"
                      }`}
                    >
                      {s.hint}
                    </span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[14px] font-medium text-primary group-hover:text-primary-deep">
                      Ver bodegas <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </Reveal>
        <p className="mt-6 text-[13px] text-muted">Los espacios personalizados son un diferencial de Storage: ningún competidor los ofrece.</p>
      </div>
    </section>
  );
}
