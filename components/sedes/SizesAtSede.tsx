import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import { sizeArt } from "@/components/sections/SizeStrip";
import { QUOTE_URL, sizes } from "@/content/facts";
import { sedePage as t, type SedeDetail } from "@/content/sedes";

const card =
  "group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-1 transition-[transform,box-shadow,border-color] duration ease-soft hover:-translate-y-0.5 hover:border-muted-2 hover:shadow-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

/** Sede page block 3 (spec T5): the four size bands with this sede's availability chip
 *  (content/sedes.ts sizesAvailable: kraft "Disponible", muted "Consultar"). Same card idiom as the
 *  homepage SizeStrip, with a shorter illustration well. Every card pre-fills sede + tamaño on the form. */
export default function SizesAtSede({ slug, detail }: { slug: string; detail: SedeDetail }) {
  return (
    <section aria-labelledby="sizes-title" className="border-t border-line">
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10">
        <Reveal>
          <h2 id="sizes-title" className="font-display text-3xl font-semibold text-ink">{t.sizesTitle}</h2>
          <p className="mt-3 max-w-[65ch] text-[15px] text-muted">{t.sizesNote}</p>
        </Reveal>
        <Reveal group as="ul" role="list" className="mt-8 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {sizes.map((s, i) => {
            const status = detail.sizesAvailable[s.id];
            return (
              <RevealItem as="li" key={s.id} className="min-w-0">
                {/* T8: swap href to s.href once the size pages ship; until then every card lands on the quote form. */}
                <Link href={`${QUOTE_URL}?sede=${slug}&tamano=${s.id}`} className={card}>
                  {/* The PNGs' drawn content spans ~10-87% of the square. Full well height, dropped 10%:
                      objects sit between 20% and 97% of the well, leaving headroom for the hover zoom,
                      which grows upward from the bottom edge so nothing is ever clipped. */}
                  <span aria-hidden="true" className="relative flex aspect-[16/10] items-end justify-center overflow-hidden bg-gradient-to-b from-primary-soft to-surface">
                    <Image
                      src={sizeArt[i]}
                      alt=""
                      width={1254}
                      height={1254}
                      sizes="(min-width: 1024px) 18vw, (min-width: 640px) 40vw, 80vw"
                      className="h-full w-auto max-w-none origin-bottom translate-y-[10%] transition-transform duration-slow ease-soft group-hover:scale-zoom"
                    />
                  </span>
                  <span className="flex flex-1 flex-col px-5 pb-5 pt-4">
                    <h3 className="text-lg font-semibold leading-snug text-ink transition-colors duration-fast ease-soft group-hover:text-primary">{s.name}</h3>
                    <span className="tnum mt-0.5 text-[15px] font-semibold text-ink-2">{s.range}</span>
                    <span className="mt-3 text-[14px] leading-relaxed text-ink-2">{s.fits}</span>
                    <span className="mt-auto flex items-center justify-between pt-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[12px] font-medium ${status === "Disponible" ? "bg-accent text-on-accent" : "border border-line bg-bg text-muted"}`}
                      >
                        {status}
                      </span>
                      <ArrowRight size={16} aria-hidden="true" className="text-primary transition-transform duration-fast ease-soft group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
