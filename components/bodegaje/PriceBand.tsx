import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { QUOTE_URL, bodegajePillar as t } from "@/content/site";

/** /bodegaje-bogota/ block 7: honest price framing (R5). No numbers and no cheapest claim; the quote
 *  answers the price intent and /precios/ (spec block 7) carries the ranges. Full-width band: message
 *  left, Cotizar + the /precios/ link right at lg; stacked below lg. The mudanzas pillar passes its own
 *  copy and no `link` (/precios/ lists storage prices only). Size pages pass `quoteHref` with ?tamano=. */
export default function PriceBand({
  title = t.price.title,
  body = t.price.body,
  link = t.price.link,
  quoteHref = QUOTE_URL,
}: {
  title?: string;
  body?: string;
  link?: { label: string; href: string } | null;
  quoteHref?: string;
}) {
  return (
    <section aria-labelledby="price-title" className="border-y border-line bg-surface">
      <Reveal className="mx-auto flex max-w-site flex-col gap-6 px-5 py-12 md:px-8 md:py-16 lg:flex-row lg:items-end lg:justify-between lg:gap-14 lg:px-10">
        <div>
          <h2 id="price-title" className="font-display text-3xl font-semibold text-ink">{title}</h2>
          <p className="mt-3 max-w-[60ch] text-[16px] leading-relaxed text-ink-2">{body}</p>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
          <Button href={quoteHref} intent="cotizar">Cotizar</Button>
          {link && (
            <Link
              href={link.href}
              className="group inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-[2px] text-[15px] font-medium text-primary hover:text-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="link-draw">{link.label}</span>
              <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </Reveal>
    </section>
  );
}
