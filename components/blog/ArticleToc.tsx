"use client";
import { useEffect, useState } from "react";
import { CaretDown, ListBullets } from "@phosphor-icons/react/dist/ssr";

type Heading = { id: string; text: string };

// A section is "current" once its h2 passes this line under the sticky header (h2s carry scroll-mt-28 = 112px).
const LINE = 140;

function Links({ headings, active }: { headings: Heading[]; active: string }) {
  return (
    <ol role="list" className="flex flex-col border-l border-line">
      {headings.map((h) => {
        const on = h.id === active;
        return (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              aria-current={on ? "location" : undefined}
              className={`-ml-px flex min-h-[44px] items-center rounded-sm border-l-2 py-2 pl-4 text-[14px] leading-snug transition-colors duration-fast ease-soft hover:border-ink hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                on ? "border-ink font-medium text-ink" : "border-transparent text-ink-2"
              }`}
            >
              {h.text}
            </a>
          </li>
        );
      })}
    </ol>
  );
}

/** Article table of contents, built from the post's h2s (ids from lib/articles.ts headingId). Tracks the
 *  section being read: an IntersectionObserver fires whenever an h2 crosses the band's top edge (LINE), and the
 *  current section is the last h2 above that line (no scroll listener). The links are plain anchors, so the
 *  TOC still works before hydration. lg: a sticky column beside the prose; below lg: a closed native <details>
 *  card above the prose. Renders nothing for a post with fewer than two sections. */
export default function ArticleToc({ headings, label }: { headings: Heading[]; label: string }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;
    const update = () => setActive(els.filter((el) => el.getBoundingClientRect().top <= LINE).pop()?.id ?? "");
    const io = new IntersectionObserver(update, { rootMargin: `-${LINE}px 0px 0px 0px` });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;
  return (
    <>
      <nav aria-label={label} className="lg:hidden">
        <details className="group rounded-lg border border-line bg-surface shadow-1">
          <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-3 rounded-lg px-5 text-[15px] font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-2">
              <ListBullets size={18} aria-hidden="true" />
              {label}
            </span>
            <CaretDown size={16} aria-hidden="true" className="transition-transform duration-fast ease-soft group-open:rotate-180" />
          </summary>
          <div className="px-5 pb-4">
            <Links headings={headings} active={active} />
          </div>
        </details>
      </nav>
      <nav aria-label={label} className="hidden lg:sticky lg:top-28 lg:block">
        <p className="text-[14px] font-semibold text-ink">{label}</p>
        <div className="mt-3">
          <Links headings={headings} active={active} />
        </div>
      </nav>
    </>
  );
}
