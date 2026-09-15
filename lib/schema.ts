// JSON-LD builders and per-page metadata (spec R1/R2). Render through components/SchemaScript.
import { SITE_URL, company } from "@/content/facts";
import type { FaqItem } from "@/content/faqs";

const context = "https://schema.org";
const abs = (path: string) => `${SITE_URL}${path}`;

/** OpenGraph fields every page repeats: a page-level `openGraph` replaces the root one entirely. */
export const ogBase = { type: "website", locale: "es_CO", siteName: company.brand } as const;

/** title ≤60 and description ≤155 per spec R2; canonical keeps the trailing slash. */
export const pageMeta = ({ title, description, path }: { title: string; description: string; path: string }) => ({
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: { ...ogBase, title, description, url: path },
});

export const breadcrumbList = (items: { name: string; href: string }[]) => ({
  "@context": context,
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.href) })),
});

export const itemList = (items: { name: string; path: string }[]) => ({
  "@context": context,
  "@type": "ItemList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: abs(it.path) })),
});

export const faqPage = (items: FaqItem[]) => ({
  "@context": context,
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

type Page = { name: string; description: string; path: string };

export const webPage = ({ name, description, path }: Page) => ({
  "@context": context,
  "@type": "WebPage",
  name,
  description,
  url: abs(path),
  inLanguage: "es-CO",
  isPartOf: { "@id": `${SITE_URL}/#website` },
});

export const webApplication = ({ name, description, path }: Page) => ({
  "@context": context,
  "@type": "WebApplication",
  name,
  description,
  url: abs(path),
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  inLanguage: "es-CO",
  offers: { "@type": "Offer", price: "0", priceCurrency: "COP" },
  provider: { "@id": `${SITE_URL}/#organization` },
});
