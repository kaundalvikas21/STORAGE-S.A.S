import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Photo from "@/components/Photo";
import Reveal from "@/components/motion/Reveal";
import RevealStagger, { RevealItem } from "@/components/motion/RevealStagger";
import type { ImageKey } from "@/content/images";
import { sizes } from "@/content/site";

const slots: ImageKey[] = ["sizeSmall", "sizeMedium", "sizeLarge", "sizeCustom"];

/**
 * Comparison row: 4 illustrated size cards. Each transparent illustration floats over `.illus-wash`
 * (token gradient that drifts on hover) with the m³ range pinned as a chip; text carries the message below.
 */
export default function SizeStrip() {
  return (
    <section aria-labelledby="sizes-title" className="order-6 border-y border-line bg-surface">
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10 lg:py-24">
        <Reveal>
          <h2 id="sizes-title" className="font-display text-3xl font-semibold text-ink max-w-[20ch]">
            Minibodegas del tamaño justo
          </h2>
          <p className="mt-3 max-w-[52ch] text-[15px] text-muted">Bodegas por meses desde 1 m³. Cambias de tamaño cuando tu necesidad cambia.</p>
        </Reveal>

        <RevealStagger as="ul" role="list" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sizes.map((s, i) => (
            <RevealItem as="li" key={s.href}>
              <Link href={s.href} className="card h-full">
                <div className="illus-wash relative aspect-square border-b border-line">
                  <Photo slot={slots[i]} fit="contain" className="absolute inset-5 md:inset-6" sizes="(min-width: 1024px) 290px, (min-width: 640px) 50vw, 100vw" />
                  <span className="tnum absolute left-4 top-4 rounded-full border border-line bg-bg/90 px-3 py-1 text-[13px] font-semibold text-primary">{s.range}</span>
                  {s.differential && (
                    <span className="absolute right-4 top-4 rounded-full bg-primary px-2.5 py-1 text-[12px] font-medium text-on-primary">Diferencial</span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="card-title text-xl font-semibold text-ink">{s.name}</h3>
                  <p className="mt-2 text-[14px] text-ink-2">Cabe aprox.: {s.fits}</p>
                  <p className="mt-1 text-[13px] text-muted">{s.hint}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-medium text-primary">
                    Ver bodegas <ArrowRight size={14} aria-hidden="true" className="card-arrow" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
        <p className="mt-6 text-[13px] text-muted">Los espacios personalizados son un diferencial de Storage: ningún competidor los ofrece.</p>
      </div>
    </section>
  );
}
