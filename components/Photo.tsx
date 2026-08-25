import Image from "next/image";
import { BLUR, type Photo as PhotoData } from "@/content/images";

type Props = {
  img: PhotoData;
  /** Required: forces a deliberate per-slot sizes attribute. */
  sizes: string;
  /** Frame styling: aspect ratio, radius, borders. The frame is overflow-hidden. */
  className?: string;
  /** "bottom": dark gradient scrim (--bg-deep) so HTML text above stays AA-readable. */
  scrim?: "bottom" | "none";
  /** Unifying --primary-soft multiply wash so mixed sources read as one set (MASTER.md §7). */
  tint?: boolean;
  /** --photo-zoom on the ancestor card's hover; the frame never grows. */
  zoom?: boolean;
  /** Preload + fetchpriority=high. Only for a photo that IS the LCP element (the hero
   *  backdrop). Every other slot stays lazy so it never competes with the H1. */
  priority?: boolean;
};

/**
 * The page's single photo treatment (MASTER.md §7 Imagery). Every photo lazy-loads with a
 * token-color blur placeholder. Only the hero backdrop opts into `priority`: it is the page's
 * LCP element, so it preloads; every other slot stays lazy (MASTER.md §7).
 */
export default function Photo({ img, sizes, className = "", scrim = "none", tint = true, zoom = true, priority = false }: Props) {
  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        placeholder="blur"
        blurDataURL={BLUR}
        priority={priority}
        className={`object-cover ${zoom ? "transition-transform duration-slow ease-soft group-hover:scale-zoom" : ""}`}
      />
      {tint && <span aria-hidden="true" className="absolute inset-0 bg-primary-soft/25 mix-blend-multiply" />}
      {scrim === "bottom" && (
        <>
          {/* Two layers: a flat wash guarantees AA anywhere on the photo; the gradient adds depth. */}
          <span aria-hidden="true" className="absolute inset-0 bg-bg-deep/55" />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-bg-deep/90 via-bg-deep/45 to-bg-deep/20" />
        </>
      )}
    </span>
  );
}
