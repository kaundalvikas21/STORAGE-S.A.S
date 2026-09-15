import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/Reveal";
import type { ArticleContent } from "@/content/articles";

/** REQUIRED last block of every article (wireframe T9 notes 2-3: "an article that links nowhere is a leaf with
 *  no branch"). The page's one dark cell: label, question and one sentence left; the up-links into the
 *  commercial silo right, as 56px rows with an arrow (text links, not a new CTA wording). Links go up only. */
export default function NextStepBand({ next, label }: { next: ArticleContent["next"]; label: string }) {
  return (
    <section aria-labelledby="next-title" className="mx-auto max-w-site px-5 pb-16 md:px-8 md:pb-24 lg:px-10">
      <Reveal className="dark-cell mx-auto grid max-w-[1040px] gap-7 rounded-xl border border-line p-7 shadow-3 md:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-12">
        <div>
          <p className="text-[14px] font-medium text-accent">{label}</p>
          <h2 id="next-title" className="mt-2 max-w-[22ch] font-display text-3xl font-semibold text-ink">{next.title}</h2>
          <p className="mt-3 max-w-[52ch] text-[16px] leading-relaxed text-ink-2">{next.body}</p>
        </div>
        <ul role="list" className="flex flex-col gap-3">
          {next.links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group flex min-h-[56px] cursor-pointer items-center justify-between gap-4 rounded-md border border-line bg-surface px-5 py-4 text-[16px] font-semibold text-ink transition-colors duration-fast ease-soft hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <span className="link-draw">{l.label}</span>
                <ArrowRight size={18} aria-hidden="true" className="shrink-0 text-accent transition-transform duration-fast ease-soft group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
