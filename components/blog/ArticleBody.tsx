import Link from "next/link";
import { Check, X } from "@phosphor-icons/react/dist/ssr";
import ArticleToc from "@/components/blog/ArticleToc";
import InlineCta from "@/components/blog/InlineCta";
import type { Block } from "@/content/articles";
import { headingId, splitLinks } from "@/lib/articles";

// Prose links carry a resting underline (not the hover-only .link-draw): inside body text the affordance
// must be visible without hovering.
const linkCls =
  "rounded-sm font-medium text-ink underline decoration-muted-2 decoration-1 underline-offset-[5px] transition-colors duration-fast ease-soft hover:decoration-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function Rich({ text }: { text: string }) {
  return (
    <>
      {splitLinks(text).map((s, i) =>
        s.href ? (
          <Link key={i} href={s.href} className={linkCls}>
            {s.text}
          </Link>
        ) : (
          s.text
        ),
      )}
    </>
  );
}

/** Article block 2: the post body from content/blog/{slug}.ts in the homepage type scale, with its table of
 *  contents. lg: 65ch prose column left (aligned with the hero), sticky ArticleToc right. Below lg: the TOC card
 *  first, then the prose. No reveal on reading text. `ul` rows lead with a Phosphor Check (or X for "no se
 *  puede"), `cta` blocks render InlineCta. Server component: zero client JS for the prose. */
export default function ArticleBody({ blocks, tocLabel }: { blocks: Block[]; tocLabel: string }) {
  const headings = blocks.flatMap((b) => (b.type === "h2" ? [{ id: headingId(b.text), text: b.text }] : []));
  return (
    <div className="mx-auto grid max-w-site gap-8 px-5 py-10 text-[17px] md:px-8 md:py-14 lg:grid-cols-[minmax(0,65ch)_260px] lg:justify-between lg:gap-12 lg:px-10">
      <div className="max-w-[65ch] lg:col-start-2 lg:row-start-1 lg:max-w-none">
        <ArticleToc headings={headings} label={tocLabel} />
      </div>
      <div className="flex min-w-0 max-w-[65ch] flex-col leading-relaxed text-ink-2 lg:col-start-1 lg:row-start-1">
        {blocks.map((b, i) => {
          switch (b.type) {
            case "h2":
              return (
                <h2 key={i} id={headingId(b.text)} className="mt-12 scroll-mt-28 font-display text-2xl font-semibold text-ink first:mt-0">
                  {b.text}
                </h2>
              );
            case "p":
              return (
                <p key={i} className="mt-5 first:mt-0">
                  <Rich text={b.text} />
                </p>
              );
            case "ul": {
              const Mark = b.mark === "x" ? X : Check;
              return (
                <ul key={i} role="list" className="mt-5 flex flex-col gap-3 first:mt-0">
                  {b.items.map((it) => (
                    <li key={it} className="flex gap-3">
                      <Mark size={20} aria-hidden="true" className={`mt-[3px] shrink-0 ${b.mark === "x" ? "text-muted" : "text-ink"}`} />
                      <span>
                        <Rich text={it} />
                      </span>
                    </li>
                  ))}
                </ul>
              );
            }
            case "cta":
              return <InlineCta key={i} text={b.text} intent={b.intent} />;
          }
        })}
      </div>
    </div>
  );
}
