import Button from "@/components/Button";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { showcase } from "@/content/images";
import { mudanzasPillar } from "@/content/site";

/*
 * THE ONE AUTHORIZED CROSS-SILO LINK (spec tab 06 rule 2, wireframe T2 note, brief T2b).
 * ONE DIRECTION ONLY: mudanzas → bodegaje. Nothing in the bodegaje silo (the pillar, segment, size or sede
 * pages) may link back to mudanzas in body copy; header and footer are the only way across. People who are
 * moving are the highest-intent storage audience there is, and mudanzas terms carry roughly 4× the search
 * volume of storage terms in this market, so this block feeds that traffic into the money silo.
 * Never add a reverse block, and never add a second bridge on mudanzas pages.
 */

/** /mudanzas-bogota/, between HowItWorks and PriceBand. A --primary-soft cell: an open unit full of boxes
 *  left (it answers "almacenamiento" before the words do), question + one sentence + the single CTA right at
 *  lg; the photo stacks on top below lg. */
export default function BridgeToBodegaje() {
  const t = mudanzasPillar.bridge;
  return (
    <section aria-labelledby="bridge-title" className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10">
      <Reveal className="grid overflow-hidden rounded-lg border border-line bg-primary-soft shadow-1 lg:grid-cols-[1fr_1.2fr]">
        <Photo img={showcase[1]} sizes="(min-width: 1024px) 45vw, 100vw" zoom={false} className="aspect-[16/9] w-full lg:aspect-auto lg:h-full lg:min-h-[320px]" />
        <div className="flex flex-col items-start justify-center p-7 md:p-10 lg:p-12">
          <h2 id="bridge-title" className="max-w-[22ch] font-display text-3xl font-semibold text-ink">{t.title}</h2>
          <p className="mt-3 max-w-[52ch] text-[16px] leading-relaxed text-ink-2">{t.body}</p>
          <Button href={t.href} variant="secondary" intent="minibodegas" className="mt-7">
            {t.cta}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
