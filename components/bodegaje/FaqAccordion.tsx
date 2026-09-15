import FaqList from "@/components/FaqList";
import Reveal from "@/components/Reveal";
import type { FaqItem } from "@/content/site";

/** Stacked h2 + the shared native accordion (FaqList). The page emits the matching FAQPage JSON-LD
 *  from the same items, so the visible answers and the schema never disagree. */
export default function FaqAccordion({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <section aria-labelledby="faq-title" className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10">
      <Reveal>
        <h2 id="faq-title" className="max-w-[24ch] font-display text-3xl font-semibold text-ink">{title}</h2>
      </Reveal>
      <FaqList items={items} name="faq" className="mt-8 lg:max-w-[880px]" />
    </section>
  );
}
