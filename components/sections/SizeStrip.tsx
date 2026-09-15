import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import { sizes } from "@/content/site";

/** Transparent PNG illustrations (public/img), one per tier, same order as `sizes`. Also used by sede pages. */
export const sizeArt =["/img/small.png", "/img/medium.png", "/img/big.png", "/img/customized.png"];

/**
 * 4-up on lg (2-col below), illustration well on top. The well is a token gradient (lime for the hot tier,
 * primary-soft otherwise); the art sits on its own GPU layer and scales by --photo-zoom on hover.
 * The card transitions only transform/shadow/border (no transition-all), so nothing repaints.
 */
export default function SizeStrip() {
  return (
    <section aria-labelledby="sizes-title" className="order-6">
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10 lg:py-24">
        <Reveal>
          <h2 id="sizes-title" className="max-w-[20ch] font-display text-3xl font-semibold text-ink">Minibodegas del tamaño justo</h2>
          <p className="mt-3 max-w-[52ch] text-[15px] text-muted">Bodegas por meses desde 2 m³. Cambias de tamaño cuando tu necesidad cambia.</p>
        </Reveal>

        <Reveal group as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4" role="list">
          {sizes.map((s, i) => (
            <RevealItem as="li" key={s.href} className="min-w-0">
              <Link
                href={s.href}
                className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-1 transition-[transform,box-shadow,border-color] duration ease-soft hover:-translate-y-0.5 hover:border-muted-2 hover:shadow-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <span
                  aria-hidden="true"
                  className={`relative flex aspect-[4/3] items-end justify-center overflow-hidden bg-gradient-to-br to-surface ${
                    s.hot ? "from-accent-soft via-accent-soft/40" : "from-primary-soft via-primary-soft/40"
                  }`}
                >
                  {/* Square art with an empty top band: oversize + drop it so the objects fill the well. */}
                  <Image
                    src={sizeArt[i]}
                    alt=""
                    width={1254}
                    height={1254}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="h-[118%] w-auto max-w-none translate-y-[8%] transform-gpu will-change-transform transition-transform duration-slow ease-soft group-hover:scale-zoom"
                  />
                </span>
                <span className="flex flex-1 flex-col p-6">
                  <span className="flex flex-wrap items-center gap-2">
                    <h3 className="break-words text-lg font-semibold text-ink transition-colors duration-fast ease-soft group-hover:text-primary">{s.name}</h3>
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
          ))}
        </Reveal>
        <p className="mt-6 text-[13px] text-muted">Los espacios personalizados son un diferencial de Storage: ningún competidor los ofrece.</p>
      </div>
    </section>
  );
}
