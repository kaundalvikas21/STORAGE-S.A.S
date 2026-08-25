import Link from "next/link";
import { ArrowUpRight, Star } from "@phosphor-icons/react/dist/ssr";
import Photo from "@/components/Photo";
import Reveal, { RevealItem } from "@/components/Reveal";
import { sizePhotos } from "@/content/images";
import { sizes } from "@/content/site";

/* No lift: the illustration carries the hover (scale-zoom inside a fixed well) and the ring warms
   to brass. `ring-1` sits in the shared string so every cell shares one hover ring; the rest colour
   comes from the variant below. Chip = the arrow badge that fills on hover. */
const card =
  "group flex h-full flex-col overflow-hidden rounded-lg cursor-pointer ring-1 shadow-1 transition-[transform,box-shadow,background-color] duration-DEFAULT ease-premium hover:ring-accent/40 hover:shadow-2 active:scale-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";
const chip =
  "flex h-7 w-7 items-center justify-center rounded-full transition-[transform,background-color,color] duration-DEFAULT ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-px";
/* Gradient well behind each transparent illustration. Regular tiers sit on the warm ground
   (bg-deep → surface, with a brass breath at the corner); the differential tier's well is the
   green of its own shell, so its illustration reads as lit from inside the card. */
const well = "relative aspect-[4/3] w-full p-1 md:p-2 bg-gradient-to-br transition-[background-color] duration-DEFAULT ease-premium";
const wellRegular = "from-bg-deep via-surface to-accent-soft/70";
const wellDifferential = "from-primary-deep via-primary to-primary-soft/25";

export default function SizeStrip() {
  return (
    <section aria-labelledby="sizes-title" className="order-6 bg-bg-deep/60">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-20 md:py-28 lg:py-36">
        <Reveal>
          <p className="eyebrow mb-3">Por tamaño</p>
          <h2 id="sizes-title" className="font-display text-3xl font-semibold text-ink max-w-[18ch]">Minibodegas del tamaño justo</h2>
          <p className="mt-3 text-[15px] text-muted max-w-[52ch]">Bodegas por meses desde 1 m³. Cambias de tamaño cuando tu necesidad cambia.</p>
        </Reveal>

        {/* "Personalizados" is the dark differential cell: same illustration treatment, inverted
            palette, so the row never reads as four identical cards (MASTER.md §8.6). */}
        <Reveal group as="ul" className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {sizes.map((s) => {
            const img = sizePhotos[s.href];
            return (
              <RevealItem as="li" key={s.href}>
                <Link href={s.href} className={`${card} ${s.differential ? "bg-primary text-on-primary ring-primary hover:bg-primary-deep" : "bg-surface ring-line"}`}>
                  {img && (
                    <div className={`${well} ${s.differential ? wellDifferential : wellRegular}`}>
                      {/* Soft radial glow anchors the illustration to the well's floor. */}
                      <span aria-hidden="true" className={`absolute inset-x-6 bottom-3 h-1/3 rounded-[100%] blur-xl ${s.differential ? "bg-accent/25" : "bg-accent-soft"}`} />
                      <Photo
                        img={img}
                        sizes="(min-width: 1024px) 290px, (min-width: 640px) 50vw, 100vw"
                        className="h-full w-full"
                        fit="contain"
                        tint={false}
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className={`font-display text-xl font-semibold break-words ${s.differential ? "text-on-primary" : "text-ink"}`}>{s.name}</h3>
                      {s.differential && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-on-accent">
                          <Star size={11} weight="fill" aria-hidden="true" /> Diferencial
                        </span>
                      )}
                    </div>
                    <p className={`tnum mt-3 text-2xl font-semibold ${s.differential ? "text-accent" : "text-primary"}`}>{s.range}</p>
                    <p className={`mt-2 text-[14px] ${s.differential ? "text-on-primary/85" : "text-ink-2"}`}>{s.fits}</p>
                    <span className={`mt-auto pt-5 inline-flex items-center gap-2 text-[14px] font-semibold ${s.differential ? "text-on-primary" : "text-primary"}`}>
                      Ver {s.name.toLowerCase()}
                      <span className={`${chip} ${s.differential ? "bg-on-primary/15 group-hover:bg-accent group-hover:text-on-accent" : "bg-primary/10 group-hover:bg-primary group-hover:text-on-primary"}`}>
                        <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                      </span>
                    </span>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
