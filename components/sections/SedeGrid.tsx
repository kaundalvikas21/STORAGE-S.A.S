import Link from "next/link";
import { ArrowRight, NavigationArrow, Sparkle } from "@phosphor-icons/react/dist/ssr";
import Photo from "@/components/Photo";
import Reveal, { RevealItem } from "@/components/Reveal";
import { sedePhotos } from "@/content/images";
import { SEDES_URL, sedes } from "@/content/site";

export default function SedeGrid() {
  return (
    <section aria-labelledby="sedes-title" className="order-5">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-20 md:py-28 lg:py-36">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">7 sedes en Bogotá</p>
            <h2 id="sedes-title" className="font-display text-3xl font-semibold text-ink max-w-[18ch]">Una bodega cerca de donde estás</h2>
          </div>
          <Link href={SEDES_URL} className="link-underline tap-pad inline-flex w-fit items-center gap-2 text-[15px] font-semibold text-primary cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
            Ver las 7 sedes <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </Link>
        </Reveal>

        {/* Order comes from content/site.ts — Calle 197 first, by commercial rule. */}
        <Reveal group as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {sedes.map((s) => (
            <RevealItem as="li" key={s.slug}>
              <Link href={`/sedes/${s.slug}/`} className="group block h-full rounded-xl bg-bg-deep ring-1 ring-line p-1.5 cursor-pointer transition-[transform,box-shadow,background-color] duration-DEFAULT ease-premium hover:bg-accent-soft/50 hover:ring-accent/40 active:scale-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
                <div className="h-full rounded-xl-inner bg-surface shadow-inset overflow-hidden flex flex-col">
                  {/* Hover lives in the photograph (scale-zoom inside a fixed frame), not in the card. */}
                  <div className="relative shrink-0">
                    <Photo
                      img={sedePhotos[s.slug]}
                      sizes="(min-width: 1024px) 290px, (min-width: 640px) 50vw, 100vw"
                      className="aspect-[4/3]"
                    />
                    {/* Full-bleed band on the photo's bottom edge, never a corner pill: the copy gets a
                        whole card width to wrap in, and floating it keeps every card title flush. */}
                    {s.badge && (
                      <p className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-accent px-5 py-2 text-[11px] font-semibold uppercase leading-tight tracking-[0.1em] text-on-accent">
                        <Sparkle size={12} weight="fill" aria-hidden="true" className="shrink-0" />
                        {s.badge}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="font-display text-xl font-semibold text-ink">{s.name}</h3>
                    <span className="inline-flex w-fit rounded-full bg-primary-soft px-3 py-1 text-[12px] font-medium text-primary">{s.zone}</span>
                    <p className="text-[13px] text-muted leading-snug">{s.coverage}</p>
                  </div>
                  {/* Affordance, not a second link: the whole card already routes to the sede page.
                      Always rendered - flex-1 above pins it to the card foot so the row aligns across
                      the grid, and a desktop hover-only action row hid what the card was for. */}
                  <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3.5">
                    <span className="text-[13px] font-semibold text-primary">Cómo llegar</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary transition-colors duration-DEFAULT ease-premium group-hover:bg-primary group-hover:text-on-primary">
                      <NavigationArrow size={14} weight="bold" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
