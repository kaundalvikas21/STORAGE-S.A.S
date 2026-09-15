import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import PageIntro from "@/components/PageIntro";
import SchemaScript from "@/components/SchemaScript";
import BlogIndex from "@/components/blog/BlogIndex";
import ClosingBand from "@/components/sections/ClosingBand";
import { articles, blogCategoryLabels, blogHub as t, type BlogCategory } from "@/content/articles";
import { articleContent } from "@/content/blog";
import { readingMinutes } from "@/lib/articles";
import { pageMeta } from "@/lib/schema";
import { blog } from "@/lib/schema-blog";

export const metadata: Metadata = pageMeta({ title: t.metaTitle, description: t.description, path: t.path });

// Cards and chips are resolved here, so the client filter receives plain props and never bundles post bodies.
const cards = articles.map((a) => ({
  slug: a.slug,
  path: a.path,
  title: a.title,
  excerpt: a.excerpt,
  photo: a.photo,
  category: a.category,
  categoryLabel: blogCategoryLabels[a.category],
  readTime: `${readingMinutes(articleContent[a.slug].body)} ${t.minutes}`,
}));
const categories = (Object.keys(blogCategoryLabels) as BlogCategory[]).map((id) => ({ id, label: blogCategoryLabels[id] }));

/** /blog/ (spec T9, silo 5). Blocks: breadcrumb → h1 + intro (no CTA pair: the band below carries both
 *  intents) → category chips + featured article + article bento → CTA band led by "Calcular mi espacio".
 *  Blog JSON-LD lists every post. The hub links only down to its own articles (R3). */
export default function BlogHub() {
  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <SchemaScript data={blog({ name: t.h1, description: t.description, path: t.path, posts: articles })} />
      <Breadcrumb items={[{ name: t.crumb, href: t.path }]} />
      <PageIntro h1={t.h1} intro={t.intro} actions={false} />
      <BlogIndex cards={cards} categories={categories} labels={t.index} />
      <ClosingBand title={t.cta.title} body={t.cta.body} primary="calcular" />
    </main>
  );
}
