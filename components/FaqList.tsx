import Link from "next/link";
import { ArrowRight, Plus } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import type { FaqItem } from "@/content/site";

/** Exclusive native `<details name>` accordion in a white cell (MASTER.md §7 Accordion). Shared by
 *  the homepage `Faq` and the calculator page. Row hover is a title + icon colour shift, never a
 *  background fill (§8.14). The page emits the matching FAQPage JSON-LD via lib/schema.ts. */
export default function FaqList({ items, name, className = "" }: { items: FaqItem[]; name: string; className?: string }) {
  return (
    <Reveal group className={`rounded-lg border border-line bg-surface px-6 shadow-1 md:px-7 ${className}`}>
      {items.map((f, i) => (
        <RevealItem key={f.q}>
          <details name={name} className={`group faq-item ${i < items.length - 1 ? "border-b border-line" : ""}`} open={i === 0}>
            <summary className="-mx-2 flex cursor-pointer items-center justify-between gap-4 rounded-md px-2 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
              <h3 className="text-lg font-semibold text-ink transition-colors duration-fast ease-soft group-hover:text-primary">{f.q}</h3>
              <Plus size={18} weight="bold" aria-hidden="true" className="shrink-0 text-muted transition-all duration ease-soft group-hover:text-primary group-open:rotate-45" />
            </summary>
            <div className="pb-8">
              <p className="max-w-[65ch] text-[15px] leading-relaxed text-ink-2">{f.a}</p>
              {f.link && (
                <Link href={f.link.href} className="group/link mt-3 inline-flex items-center gap-1.5 rounded-[2px] text-[14px] font-medium text-primary hover:text-primary-deep cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <span className="link-draw">{f.link.label}</span> <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover/link:translate-x-1" />
                </Link>
              )}
            </div>
          </details>
        </RevealItem>
      ))}
    </Reveal>
  );
}
