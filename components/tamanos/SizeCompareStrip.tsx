import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import { sizes } from "@/content/facts";
import { sizePage as t, type SizeId } from "@/content/tamanos";

type Size = (typeof sizes)[number];

const card =
  "group flex h-full cursor-pointer flex-col rounded-lg border border-line bg-surface p-6 shadow-1 transition-[transform,box-shadow,border-color] duration ease-soft hover:-translate-y-0.5 hover:border-muted-2 hover:shadow-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const arrow = "shrink-0 text-primary transition-transform duration-fast ease-soft";

function Body({ s }: { s: Size }) {
  return (
    <>
      <span className="tnum mt-1 text-[15px] font-semibold text-ink-2">{s.range}</span>
      <span className="mt-2 text-[14px] leading-relaxed text-ink-2">{s.fits}</span>
    </>
  );
}

/** Size page block 5 (spec T8, "compare with adjacent sizes"): ← previous | this size | next →, in facts.ts
 *  order. Neighbours link sideways within silo 1B (R3); the current size is tinted, wider (1/1.3/1fr from md,
 *  never three equal cards) and not a link. Pequeña has no previous and personalizada no next: the current
 *  cell keeps the middle column so the strip reads the same on every page. Phones stack in order. */
export default function SizeCompareStrip({ id }: { id: SizeId }) {
  const i = sizes.findIndex((s) => s.id === id);
  const [prev, current, next] = [sizes[i - 1], sizes[i], sizes[i + 1]];
  return (
    <section aria-labelledby="compare-title" className="mx-auto max-w-site px-5 pb-14 md:px-8 md:pb-20 lg:px-10">
      <Reveal>
        <h2 id="compare-title" className="font-display text-3xl font-semibold text-ink">{t.compareTitle}</h2>
      </Reveal>
      <Reveal group as="ul" role="list" className="mt-8 grid gap-4 md:grid-cols-[1fr_1.3fr_1fr] md:gap-5">
        {prev && (
          <RevealItem as="li">
            <Link href={prev.href} className={card}>
              <span className="flex items-center gap-2">
                <ArrowLeft size={16} aria-hidden="true" className={`${arrow} group-hover:-translate-x-1`} />
                <h3 className="text-lg font-semibold text-ink transition-colors duration-fast ease-soft group-hover:text-primary">{prev.name}</h3>
              </span>
              <Body s={prev} />
            </Link>
          </RevealItem>
        )}
        <RevealItem as="li" className={prev ? "" : "md:col-start-2"}>
          <div aria-current="page" className="flex h-full flex-col rounded-lg border border-line bg-primary-soft p-6 shadow-1">
            <h3 className="text-lg font-semibold text-ink">{current.name}</h3>
            <Body s={current} />
          </div>
        </RevealItem>
        {next && (
          <RevealItem as="li">
            <Link href={next.href} className={card}>
              <span className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-ink transition-colors duration-fast ease-soft group-hover:text-primary">{next.name}</h3>
                <ArrowRight size={16} aria-hidden="true" className={`${arrow} group-hover:translate-x-1`} />
              </span>
              <Body s={next} />
            </Link>
          </RevealItem>
        )}
      </Reveal>
    </section>
  );
}
