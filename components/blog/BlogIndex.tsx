"use client";
import { useEffect, useState } from "react";
import ArticleCard, { type CardData } from "@/components/blog/ArticleCard";
import Reveal, { RevealItem } from "@/components/Reveal";

type Props = {
  cards: CardData[];
  categories: { id: string; label: string }[];
  labels: { gridTitle: string; filter: string; all: string; results: string; cardLink: string };
};

const PARAM = "categoria";

/**
 * /blog/ blocks 1-3 (wireframe T9): real category chips, the featured article, the article grid. Server HTML is
 * the complete unfiltered index (P3); the chips filter in place and mirror the choice in ?categoria=, so an
 * article's category crumb deep-links here. Unfiltered: featured split card, then the other posts as equal
 * cards, 3 columns at lg, 2 at md, 1 on phones (client request 2026-09-15). Filtered: the matches in the same
 * grid, no featured card. Props only: no content imports.
 */
export default function BlogIndex({ cards, categories, labels }: Props) {
  const [cat, setCat] = useState("");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get(PARAM) ?? "";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- post-hydration read of the deep link; the server HTML stays the full index
    if (categories.some((c) => c.id === q)) setCat(q);
  }, [categories]);

  const choose = (id: string) => {
    setCat(id);
    const url = new URL(window.location.href);
    if (id) url.searchParams.set(PARAM, id);
    else url.searchParams.delete(PARAM);
    window.history.replaceState(null, "", url);
  };

  const [featured, ...rest] = cards;
  const shown = cat ? cards.filter((c) => c.category === cat) : rest;

  return (
    <section aria-labelledby="articles-title" className="mx-auto max-w-site px-5 pb-14 md:px-8 md:pb-20 lg:px-10">
      <h2 id="articles-title" className="sr-only">{labels.gridTitle}</h2>
      <div role="group" aria-label={labels.filter} className="flex flex-wrap gap-2">
        {[{ id: "", label: labels.all }, ...categories].map((c) => (
          <button
            key={c.id || "all"}
            type="button"
            aria-pressed={cat === c.id}
            onClick={() => choose(c.id)}
            className={`min-h-[44px] cursor-pointer rounded-full border px-4 text-[14px] font-medium transition-colors duration-fast ease-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              cat === c.id ? "border-primary bg-primary text-on-primary" : "border-line bg-surface text-ink-2 hover:border-ink hover:text-ink"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="sr-only">{`${cat ? shown.length : cards.length} ${labels.results}`}</p>

      {!cat && featured && (
        <Reveal className="mt-8">
          <ArticleCard a={featured} variant="featured" linkLabel={labels.cardLink} />
        </Reveal>
      )}
      <Reveal key={cat} group as="ul" role="list" className={`grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 ${cat ? "mt-8" : "mt-5"}`}>
        {shown.map((c) => (
          <RevealItem as="li" key={c.slug}>
            <ArticleCard a={c} linkLabel={labels.cardLink} />
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
