import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/Button";
import Photo from "@/components/Photo";
import type { Photo as PhotoData } from "@/content/images";
import { CALC_URL, QUOTE_URL } from "@/content/facts";

type Props = {
  h1: string;
  /** Answer-first prose: the page's question is answered in the first paragraph (inner-page shell). */
  intro: string[];
  /** Optional up-link into the page's silo parent (R3), a text link under the prose. */
  link?: { label: string; href: string };
  photo?: PhotoData;
  /** Show the whole 3:2 plate, centred, instead of filling the text column's height (a crop would cut
   *  the photo's subject, e.g. the four units on /precios/). */
  wholePhoto?: boolean;
  /** A functional right-hand cell instead of a photo (the FAQ hub's theme index). */
  aside?: ReactNode;
  /** The two CTA temperatures (default). The /blog/ hub drops them: its closing band carries both intents. */
  actions?: boolean;
  /** Cotizar target, e.g. /cotizar/?tamano= on a size page. */
  quoteHref?: string;
};

/** Block 1 of every inner page: h1 + direct answer, then the two CTA temperatures (R4). Static: it is
 *  the first paint. With a photo: prose left, photo right at lg (fills the text column's height), the
 *  photo stacks under the buttons below lg. With an `aside`: the same split, the cell vertically
 *  centred. With neither: a single column. */
export default function PageIntro({ h1, intro, link, photo, wholePhoto = false, aside, actions = true, quoteHref = QUOTE_URL }: Props) {
  const cols = photo ? "lg:grid-cols-[1.15fr_1fr]" : aside ? "lg:grid-cols-[1.4fr_1fr] lg:items-center" : "";
  return (
    <section aria-labelledby="page-h1" className={`mx-auto grid max-w-site gap-8 px-5 pb-14 pt-2 md:px-8 md:pb-20 lg:gap-14 lg:px-10 ${cols}`}>
      <div>
        <h1 id="page-h1" className="font-display text-3xl font-semibold text-ink">{h1}</h1>
        <div className="mt-5 flex max-w-[65ch] flex-col gap-4 text-[16px] leading-relaxed text-ink-2">
          {intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        {link && (
          <Link
            href={link.href}
            className="group mt-3 inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-[2px] text-[15px] font-medium text-primary hover:text-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="link-draw">{link.label}</span>
            <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
          </Link>
        )}
        {actions && (
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
            <Button href={quoteHref} intent="cotizar">Cotizar</Button>
            <Button href={CALC_URL} variant="secondary" intent="calcular">
              Calcular mi espacio
            </Button>
          </div>
        )}
      </div>
      {photo && (
        <Photo
          img={photo}
          sizes="(min-width: 1024px) 45vw, 100vw"
          zoom={false}
          className={`w-full rounded-lg border border-line shadow-2 ${wholePhoto ? "aspect-[3/2] lg:self-center" : "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[380px]"}`}
        />
      )}
      {!photo && aside}
    </section>
  );
}
