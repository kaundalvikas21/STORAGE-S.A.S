import Button from "@/components/Button";
import Photo from "@/components/Photo";
import { pillarPhoto } from "@/content/images";
import { CALC_URL, QUOTE_URL, bodegajePillar as t } from "@/content/site";

/** /bodegaje-bogota/ block 1 (spec T2): h1 + the answer-first intro written as the search snippet, then
 *  the two CTA temperatures (R4). Static: it is the first paint. Prose left, facility photo right at lg
 *  (fills the text column's height); below lg the photo stacks under the buttons. */
export default function PillarIntro() {
  return (
    <section aria-labelledby="pillar-h1" className="mx-auto grid max-w-site gap-8 px-5 pb-14 pt-2 md:px-8 md:pb-20 lg:grid-cols-[1.15fr_1fr] lg:gap-14 lg:px-10">
      <div>
        <h1 id="pillar-h1" className="font-display text-3xl font-semibold text-ink">{t.h1}</h1>
        <div className="mt-5 flex max-w-[65ch] flex-col gap-4 text-[16px] leading-relaxed text-ink-2">
          {t.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
          <Button href={QUOTE_URL} intent="cotizar">Cotizar</Button>
          <Button href={CALC_URL} variant="secondary" intent="calcular">
            Calcular mi espacio
          </Button>
        </div>
      </div>
      <Photo
        img={pillarPhoto}
        sizes="(min-width: 1024px) 45vw, 100vw"
        zoom={false}
        className="aspect-[4/3] w-full rounded-lg border border-line shadow-2 lg:aspect-auto lg:h-full lg:min-h-[380px]"
      />
    </section>
  );
}
