import Link from "next/link";
import { ArrowRight, BookOpen } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import type { SegmentCopy } from "@/content/site";

/** Segment block 7 (spec T3 "packing tips → blog"): a clearly secondary row list, since commercial pages link
 *  out to articles only here (never the reverse of the blog's up-links). Teasers come from content/segments.ts
 *  `articles`, which reads title + href from content/articles.ts; one without an href is skipped. */
export default function BlogTeasers({ blog }: { blog: SegmentCopy["blog"] }) {
  const live = blog.teasers.filter((a): a is { title: string; href: string } => Boolean(a.href));
  if (!live.length) return null;
  return (
    <section aria-labelledby="blog-title" className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10">
      <Reveal>
        <h2 id="blog-title" className="max-w-[28ch] font-display text-3xl font-semibold text-ink">{blog.title}</h2>
      </Reveal>
      <Reveal group as="ul" role="list" className="mt-8 flex flex-col gap-3 lg:max-w-[880px]">
        {live.map((a) => (
          <RevealItem as="li" key={a.href}>
            <Link
              href={a.href}
              className="group flex min-h-[56px] cursor-pointer items-center gap-4 rounded-lg border border-line bg-surface px-5 py-4 shadow-1 transition-[transform,box-shadow] duration ease-soft hover:-translate-y-0.5 hover:shadow-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <BookOpen size={22} aria-hidden="true" className="shrink-0 text-primary" />
              <span className="flex-1 text-[16px] font-semibold text-ink transition-colors duration-fast ease-soft group-hover:text-primary">{a.title}</span>
              <ArrowRight size={16} aria-hidden="true" className="shrink-0 text-primary transition-transform duration-fast ease-soft group-hover:translate-x-1" />
            </Link>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
