import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem, RevealRule } from "@/components/Reveal";
import { SEDES_URL, sedes } from "@/content/site";

/** Manifest / spec-sheet cards. Order comes from content/site.ts — Calle 197 first, by commercial rule. */
export default function SedeGrid() {
  return (
    <section aria-labelledby="sedes-title" className="order-5">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-14 md:py-20 lg:py-24">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">Red de sedes</p>
            <h2 id="sedes-title" className="font-display text-3xl font-bold uppercase text-ink max-w-[18ch]">Una bodega cerca de donde estás</h2>
            <RevealRule className="mt-5 max-w-[320px]" />
          </div>
          <Link href={SEDES_URL} className="inline-flex items-center gap-2 font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-ink hover:text-primary-deep cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Ver las 7 sedes <ArrowRight size={16} weight="bold" aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal group as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {sedes.map((s, i) => (
            <RevealItem as="li" key={s.slug}>
              <Link
                href={`/sedes/${s.slug}/`}
                className={`group relative flex h-full flex-col bg-surface cursor-pointer transition-colors duration-fast ease-soft hover:bg-bg-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  s.badge ? "border-2 border-primary" : "border-[1.5px] border-ink"
                }`}
              >
                {s.badge && (
                  <span className="absolute right-3 top-3 z-10 -rotate-3 border-[1.5px] border-ink bg-primary px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-on-primary">
                    {s.badge}
                  </span>
                )}
                <div className={`relative aspect-[4/3] overflow-hidden ${s.badge ? "border-b-2 border-primary" : "border-b-[1.5px] border-ink"}`}>
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 1024px) 290px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover grayscale contrast-125"
                  />
                  <div className="absolute inset-0 bg-accent/40 mix-blend-multiply" aria-hidden="true" />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted tnum">{`Sede 0${i + 1}`} · {s.zone}</p>
                  <h3 className="font-display text-xl font-bold uppercase text-ink">{s.name}</h3>
                  <address className="not-italic font-mono text-[12px] leading-relaxed text-ink-2">{s.address}</address>
                  <p className="text-[13px] text-muted leading-snug">{s.coverage}</p>
                  <span className="mt-auto pt-3 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-ink group-hover:text-primary-deep">→ Cómo llegar</span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
