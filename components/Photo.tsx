import Image from "next/image";
import { BLUR, type Photo as PhotoData } from "@/content/images";

type Props = {
  img: PhotoData;
  /** Required: forces a deliberate per-slot sizes attribute. */
  sizes: string;
  /** Frame styling: aspect ratio, radius, borders. The frame is always overflow-hidden. */
  className?: string;
  /** Dark gradient + flat wash so HTML text laid over the photo stays AA-readable. */
  scrim?: "dark" | "none";
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
  const tinted = tint && scrim !== "dark";
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
