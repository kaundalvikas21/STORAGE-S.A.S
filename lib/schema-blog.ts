// Blog JSON-LD (spec tab 02 /blog/: Blog · BreadcrumbList; each post: Article). Kept apart from
// lib/schema.ts for its 80-line cap. Render through components/SchemaScript.
import { SITE_URL, company } from "@/content/facts";

const abs = (path: string) => `${SITE_URL}${path}`;
const org = { "@id": `${SITE_URL}/#organization` };

type Post = { title: string; description: string; path: string; photo: { src: string }; published: string };

export const blog = ({ name, description, path, posts }: { name: string; description: string; path: string; posts: Post[] }) => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  name,
  description,
  url: abs(path),
  inLanguage: "es-CO",
  publisher: org,
  blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: abs(p.path), image: abs(p.photo.src), datePublished: p.published })),
});

/** Author and publisher are the Organization: no invented bylines (facts lockdown). */
export const article = (p: Post) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: p.title,
  description: p.description,
  image: abs(p.photo.src),
  datePublished: p.published,
  dateModified: p.published,
  author: { ...org, "@type": "Organization", name: company.brand },
  publisher: org,
  mainEntityOfPage: abs(p.path),
  inLanguage: "es-CO",
});
