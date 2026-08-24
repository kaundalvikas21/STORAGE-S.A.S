import Image from "next/image";
import { BLUR, type Photo as PhotoData } from "@/content/images";

type Props = {
  img: PhotoData;
  /** Required: forces a deliberate per-slot sizes attribute. */
  sizes: string;
  /** Frame styling: aspect ratio, radius, borders. The frame is always overflow-hidden. */
  className?: string;
  /**
   * "dark": bottom-weighted, for text sitting in the lower third of a card.
   * "hero": LIGHT, left-weighted plus a bottom fade - the page background bleeds in from the
   *          left so dark ink copy reads over it, and the photograph is left untouched on the
   *          right. For a full-bleed band with its trust strip along the bottom edge.
   */
  scrim?: "dark" | "hero" | "none";
  /** Warm --accent-soft multiply wash: unifies mixed sources into one art-directed set (MASTER.md §7). */
  tint?: boolean;
  /** Zooms to --photo-zoom on the ancestor `.group` hover; the frame itself never grows. */
  zoom?: boolean;
  /** Hero only. Everywhere else the LCP element is HTML text, so photos lazy-load. */
  priority?: boolean;
};

export default function Photo({
  img,
  sizes,
  className = "",
  scrim = "none",
  tint = true,
  zoom = true,
  priority = false,
}: Props) {
  // Under a dark scrim the warm wash only muddies the photo, and the scrim already unifies it.
  const tinted = tint && scrim === "none";
  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={BLUR}
        className={`object-cover ${zoom ? "transition-transform duration-slow ease-premium group-hover:scale-zoom" : ""}`}
      />
      {tinted && <span aria-hidden="true" className="absolute inset-0 bg-accent-soft/30 mix-blend-multiply" />}
      {scrim === "hero" && (
        <>
          {/* Weighted left on desktop so the photograph still reads on the right. Below md the copy
              spans the full width, so the wash goes heavy and the gradient turns vertical - a
              left-to-right fade protects nothing when the text runs the whole way across. */}
          <span aria-hidden="true" className="absolute inset-0 bg-bg/72 md:bg-bg/15" />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-bg via-bg/70 to-bg/40 md:bg-gradient-to-r md:from-bg md:via-bg/72 md:to-transparent"
          />
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/90 to-transparent" />
        </>
      )}
      {scrim === "dark" && (
        <>
          {/* Text only ever sits in the bottom third, so the gradient carries the contrast there
              and the flat wash stays light enough for the photograph to read at the top. */}
          <span aria-hidden="true" className="absolute inset-0 bg-primary-deep/30" />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-primary-deep/95 via-primary-deep/65 to-transparent" />
        </>
      )}
    </span>
  );
}
