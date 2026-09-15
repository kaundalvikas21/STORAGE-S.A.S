import Photo from "@/components/Photo";
import type { ArticleMeta } from "@/content/articles";

/** Article hero: kraft category chip + reading time, the h1 (tab 06 title) and the excerpt as lead, left-aligned
 *  on the site container like every inner page; then the cover banner at full container width (16:10 on
 *  phones, 21:9 from md), the page's one `priority` image (its LCP, like the sede gallery's first photo).
 *  The prose column below starts on the same left edge. Static: first paint. */
export default function ArticleHeader({ article: a, category, readTime }: { article: ArticleMeta; category: string; readTime: string }) {
  return (
    <header className="mx-auto max-w-site px-5 pt-4 md:px-8 lg:px-10">
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted">
        <span className="rounded-full bg-accent px-2.5 py-0.5 text-[12px] font-medium text-on-accent">{category}</span>
        <span className="tnum">{readTime}</span>
      </p>
      <h1 id="page-h1" className="mt-4 max-w-[26ch] font-display text-3xl font-semibold text-ink">{a.title}</h1>
      <p className="mt-5 max-w-[60ch] text-[18px] leading-relaxed text-ink-2">{a.excerpt}</p>
      <Photo
        img={a.photo}
        sizes="(min-width: 1280px) 1200px, 100vw"
        priority
        zoom={false}
        className="mt-10 aspect-[16/10] w-full rounded-lg border border-line shadow-2 md:aspect-[21/9]"
      />
    </header>
  );
}
