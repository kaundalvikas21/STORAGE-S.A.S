import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import SchemaScript from "@/components/SchemaScript";
import ArticleBody from "@/components/blog/ArticleBody";
import ArticleHeader from "@/components/blog/ArticleHeader";
import NextStepBand from "@/components/blog/NextStepBand";
import { articles, blogCategoryLabels, blogHub as t } from "@/content/articles";
import { articleContent } from "@/content/blog";
import { readingMinutes } from "@/lib/articles";
import { pageMeta } from "@/lib/schema";
import { article as articleSchema } from "@/lib/schema-blog";

type Params = Promise<{ slug: string }>;

// The six launch articles only (spec tab 06); any other slug 404s.
export const dynamicParams = false;
export const generateStaticParams = () => articles.map((a) => ({ slug: a.slug }));

const find = (slug: string) => articles.find((a) => a.slug === slug);

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const a = find((await params).slug);
  if (!a) return {};
  const meta = pageMeta({ title: a.metaTitle, description: a.description, path: a.path });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", publishedTime: a.published, images: [{ url: a.photo.src }] } };
}

/** /blog/{slug}/ (spec T9 article template). Blocks: breadcrumb (Inicio › Blog › categoría › título; the
 *  category crumb deep-links the hub filter) → hero (chip, reading time, h1, lead, container-width banner) → body
 *  with its table of contents and one InlineCta → NextStepBand, the required up-link into the commercial silo. Article JSON-LD.
 *  No closing band: the NextStepBand is the ending. */
export default async function ArticleRoute({ params }: { params: Params }) {
  const a = find((await params).slug);
  if (!a) notFound();
  const content = articleContent[a.slug];
  const category = blogCategoryLabels[a.category];

  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <SchemaScript data={articleSchema(a)} />
      <Breadcrumb
        items={[
          { name: t.crumb, href: t.path },
          { name: category, href: `${t.path}?categoria=${a.category}` },
          { name: a.title, href: a.path },
        ]}
      />
      <article>
        <ArticleHeader article={a} category={category} readTime={`${readingMinutes(content.body)} ${t.minutes}`} />
        <ArticleBody blocks={content.body} tocLabel={t.toc} />
      </article>
      <NextStepBand next={content.next} label={t.nextLabel} />
    </main>
  );
}
