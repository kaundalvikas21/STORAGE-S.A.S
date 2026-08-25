import Image from "next/image";
import { blurDataURL, images, type ImageKey } from "@/content/images";

type Props = {
  slot: ImageKey;
  /** Frame classes: aspect ratio / height / radius. The frame is `relative overflow-hidden`. */
  className?: string;
  sizes: string;
  priority?: boolean;
  /** "soft" = bottom gradient (cards); "deep" = flat scrim for text-over-photo bands; "none" for plain frames. */
  scrim?: "soft" | "deep" | "hero" | "none";
  /** "contain" for transparent illustrations: no blur placeholder, no saturate, drop shadow instead. */
  fit?: "cover" | "contain";
};

/**
 * The one photo treatment (MASTER.md §7): next/image fill + dominant-colour blur + token scrim,
 * so mixed sources read as a single art-directed set. Images only ever sit under HTML text.
 */
/* Full class names on purpose: Tailwind only keeps @layer components classes it can see verbatim in source. */
const scrims = { soft: "photo-scrim", deep: "photo-scrim-deep", hero: "photo-scrim-hero" };

export default function Photo({ slot, className = "", sizes, priority = false, scrim = "soft", fit = "cover" }: Props) {
  const img = images[slot];
  const illus = fit === "contain";
  return (
    <div className={`photo ${illus ? "photo-illus" : ""} ${className}`}>
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        quality={70}
        priority={priority}
        placeholder={illus ? "empty" : "blur"}
        blurDataURL={illus ? undefined : blurDataURL(img.blur)}
        className={illus ? "object-contain" : "object-cover"}
      />
      {scrim !== "none" && !illus && <div aria-hidden="true" className={`absolute inset-0 ${scrims[scrim]}`} />}
    </div>
  );
}
