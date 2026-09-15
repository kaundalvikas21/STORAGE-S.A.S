import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Photo from "@/components/Photo";
import type { Photo as PhotoData } from "@/content/images";

/** Everything a card shows, resolved on the server (the hub page), so the client BlogIndex never imports content. */
export type CardData = {
  slug: string;
  path: string;
  title: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  readTime: string;
  photo: PhotoData;
};

type Variant = "featured" | "grid";

const frame =
  "group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-1 transition-[transform,box-shadow,border-color] duration ease-soft hover:-translate-y-0.5 hover:border-muted-2 hover:shadow-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

// featured: split card (photo left at lg). grid: the equal index cards, photo on top.
const shape: Record<Variant, { link: string; photo: string; sizes: string; title: string; body: string; more: string }> = {
  featured: {
    link: "lg:grid lg:grid-cols-[1.2fr_1fr]",
    photo: "aspect-[16/10] w-full lg:aspect-auto lg:h-full lg:min-h-[380px]",
    sizes: "(min-width: 1024px) 55vw, 100vw",
    title: "text-3xl",
    body: "p-6 md:p-8 lg:justify-center lg:p-10",
    more: "pt-6",
  },
  grid: {
    link: "",
    photo: "aspect-[16/10] w-full",
    sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
    title: "text-xl",
    body: "p-5 md:p-6",
    more: "mt-auto pt-5",
  },
};

/** One article teaser on /blog/: the whole card is one link. Kraft category chip + reading time, title, excerpt,
 *  "Leer artículo →" (text-link affordance, not a button). */
export default function ArticleCard({ a, variant = "grid", linkLabel }: { a: CardData; variant?: Variant; linkLabel: string }) {
  const s = shape[variant];
  return (
    <Link href={a.path} className={`${frame} ${s.link}`}>
      <Photo img={a.photo} sizes={s.sizes} className={s.photo} />
      <div className={`flex flex-1 flex-col ${s.body}`}>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted">
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-[12px] font-medium text-on-accent">{a.categoryLabel}</span>
          <span className="tnum">{a.readTime}</span>
        </p>
        <h3 className={`mt-3 font-display ${s.title} font-semibold text-ink transition-colors duration-fast ease-soft group-hover:text-primary-deep`}>{a.title}</h3>
        <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-ink-2">{a.excerpt}</p>
        <span className={`inline-flex items-center gap-1.5 text-[14px] font-medium text-primary group-hover:text-primary-deep ${s.more}`}>
          {linkLabel} <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
