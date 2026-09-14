"use client";
import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import SocialTile from "@/components/sections/SocialTile";
import type { SocialPost } from "@/content/social-posts";
import { social } from "@/content/site";

type Net = SocialPost["network"] | "";
const filters: { label: string; value: Net }[] = [
  { label: "Todo", value: "" },
  { label: "Instagram", value: "Instagram" },
  { label: "Facebook", value: "Facebook" },
];

/**
 * Post grid with a network filter (approved artifact). Bento rhythm: the newest post is a 2x2
 * feature, then 3 Instagram + 3 Facebook squares; 5 columns at lg (feature + 6 = two full rows),
 * 3 at md, 2 on phones. The filter fades the other network instead of hiding it, so nothing
 * reflows. Tiles (SocialTile) link out and reveal their caption on hover/focus. The foot
 * link follows the active tab: "Ver todas en Instagram" by default, Facebook on that tab.
 */
export default function SocialGrid({ posts }: { posts: SocialPost[] }) {
  const [net, setNet] = useState<Net>("");
  const target = social.profiles.find((p) => p.network === (net || "Instagram")) ?? social.profiles[0];
  return (
    <>
      <div className="mt-6 inline-flex rounded-md border border-line bg-surface p-1 shadow-1" role="group" aria-label="Filtrar publicaciones">
        {filters.map((f) => (
          <button
            key={f.label}
            type="button"
            aria-pressed={net === f.value}
            onClick={() => setNet(f.value)}
            className={`min-h-[40px] cursor-pointer rounded-sm px-4 text-[14px] font-medium transition-colors duration-fast ease-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              net === f.value ? "bg-primary text-on-primary" : "text-ink-2 hover:bg-bg"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul role="list" className="mt-4 grid grid-flow-dense grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {posts.map((p, i) => (
          <SocialTile key={`${p.network}-${i}`} post={p} dim={!!net && net !== p.network} />
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-[13px] text-muted">
        <p>Publicaciones recientes de Storage S.A.S. Instantánea del {social.snapshotDate}.</p>
        <a
          href={target.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-h-[44px] items-center gap-1.5 rounded-sm text-[14px] font-medium text-primary hover:text-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span className="link-draw">Ver todas en {target.network}</span>
          <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
          <span className="sr-only">(se abre en una pestaña nueva)</span>
        </a>
      </div>
    </>
  );
}
