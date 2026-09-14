import Image from "next/image";
import { FacebookLogo, InstagramLogo, Play } from "@phosphor-icons/react/dist/ssr";
import { BLUR } from "@/content/images";
import type { SocialPost } from "@/content/social-posts";

const icons = { Instagram: InstagramLogo, Facebook: FacebookLogo };

/**
 * One post tile (approved artifact): the whole tile links to the post in a new tab; hover/focus
 * zooms the photo (--photo-zoom) and raises the caption scrim with "Ver publicación" (always
 * shown on the feature); reels carry a play badge. Image: next/image, lazy by default.
 */
export default function SocialTile({ post, dim }: { post: SocialPost; dim: boolean }) {
  const Icon = icons[post.network];
  return (
    <li
      className={`relative aspect-square overflow-hidden rounded-lg border border-line bg-surface shadow-1 transition-[opacity,box-shadow] duration ease-soft hover:shadow-2 ${post.feature ? "col-span-2 row-span-2" : ""} ${dim ? "opacity-20" : ""}`}
    >
      <a
        href={post.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${post.network}: ${post.caption} (se abre en una pestaña nueva)`}
        className="group absolute inset-0 block text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <Image
          src={post.src}
          alt=""
          fill
          sizes={post.feature ? "(min-width: 1024px) 40vw, (min-width: 768px) 66vw, 100vw" : "(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"}
          placeholder="blur"
          blurDataURL={BLUR}
          className="object-cover transform-gpu transition-transform duration-slow ease-soft group-hover:scale-zoom group-focus-visible:scale-zoom"
        />
        {/* Icon-only network badge; the network name is in the link's aria-label. */}
        <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-bg-deep/70 backdrop-blur-sm">
          <Icon size={16} aria-hidden="true" />
        </span>
        {post.reel && (
          <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-bg-deep/70 backdrop-blur-sm">
            <Play size={16} weight="fill" aria-hidden="true" />
          </span>
        )}
        <span
          className={`absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-bg-deep/85 via-bg-deep/45 to-transparent px-4 pb-3.5 pt-14 transition-[opacity,transform] duration ease-soft ${
            post.feature ? "" : "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
          }`}
        >
          <span className={`leading-snug ${post.feature ? "line-clamp-3 text-[15px]" : "line-clamp-2 text-[13px]"}`}>{post.caption}</span>
          <span className="text-[13px] font-semibold text-brand">Ver publicación →</span>
        </span>
      </a>
    </li>
  );
}
