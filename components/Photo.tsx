import Image from "next/image";
import { images, type ImageKey } from "@/content/images";

/**
 * Scrims (MASTER.md §7). Flat fills — the system bans gradients.
 * Photographs run in full colour; the steel multiply is now only a light unifying cast that
 * keeps a dozen mixed sources in one temperature without draining them. `deep` still carries
 * real weight because display copy sits on top of it.
 */
const scrims = {
  /** Bright photo sitting behind ink body copy — keeps it a texture, not an image. */
  /**
   * Paper wash for a bright photo carrying ink text on top.
   * Measured against this hero photo's actual glyph runs: AA needs >=0.45 at md+ (large text
   * crosses the cardboard boxes) and >=0.53 below md (body copy spans the full width).
   * These values sit just above both, so the photograph reads while text keeps its margin.
   */
  paper: "bg-bg/[0.55] md:bg-bg/[0.48]",
  /**
   * Hero blend: the photograph is left-faded at source, so the scrim only has to finish the
   * job. Opaque paper on the text column, dissolving into the photo on the right. Below md the
   * copy spans the full width, so the veil stays heavier across the frame.
   */
  fade: "bg-gradient-to-r from-bg from-[28%] via-bg/85 via-[58%] to-bg/50 md:from-[22%] md:via-bg/55 md:via-[52%] md:to-bg/0",
  soft: "bg-accent/10 mix-blend-multiply",
  base: "bg-accent/[0.18] mix-blend-multiply",
  deep: "bg-ink/55 mix-blend-multiply",
  none: "",
} as const;

type Props = {
  slot: ImageKey;
  /**
   * The frame's own box. `fill` needs a positioned parent with a size, and this component
   * deliberately does NOT set `position` itself — Tailwind resolves `relative` and `absolute`
   * by stylesheet order, not class order, so a hardcoded default would silently beat an
   * `absolute inset-0` passed in here. Always include one:
   *   in flow  -> "relative aspect-[4/3] w-full"
   *   overlay  -> "absolute inset-0"
   */
  className: string;
  sizes: string;
  /** Hero image only. */
  priority?: boolean;
  scrim?: keyof typeof scrims;
  /** Desaturate this photo. Used where display copy sits on top of it (the closing CTA band). */
  mono?: boolean;
  /** Allowlisted in next.config.mjs: 70 (default) or 65. */
  quality?: 65 | 70;
  /** Transparent illustration: letterbox it, skip the contrast curve and the quadrant blur. */
  contain?: boolean;
  /** CSS object-position, e.g. "right center". */
  position?: string;
};

/**
 * The one place next/image is configured. Every homepage photograph goes through here so
 * a dozen mixed sources read as a single art-directed set: one contrast curve, one steel
 * cast, one radius token, one blur placeholder recipe. `mono` opts a photo out into the
 * grayscale documentary treatment where copy has to sit on top of it.
 *
 * The frame is `overflow-hidden` (.photo-frame): a parent carrying `group` zooms the image
 * to --photo-zoom on hover without the frame ever changing size.
 */
export default function Photo({ slot, className, sizes, priority = false, scrim = "base", mono = false, quality = 70, contain = false, position }: Props) {
  const img = images[slot];
  const [tl, tr, bl, br] = img.blur;
  // 4-quadrant blur built from the manifest's dominant colours. URI-encoded, not base64,
  // so this file stays isomorphic (no Buffer/btoa) if it is ever pulled into a client tree.
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 4" preserveAspectRatio="none">` +
    `<filter id="b"><feGaussianBlur stdDeviation="1"/></filter><g filter="url(#b)">` +
    `<rect width="2" height="2" fill="${tl}"/><rect x="2" width="2" height="2" fill="${tr}"/>` +
    `<rect y="2" width="2" height="2" fill="${bl}"/><rect x="2" y="2" width="2" height="2" fill="${br}"/>` +
    `</g></svg>`;

  return (
    <div className={`photo-frame rounded-sm ${className}`}>
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        quality={quality}
        priority={priority}
        placeholder={contain ? "empty" : "blur"}
        blurDataURL={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`}
        style={position ? { objectPosition: position } : undefined}
        className={contain ? "object-contain" : `object-cover ${mono ? "grayscale contrast-125" : "contrast-[1.08]"}`}
      />
      {scrim !== "none" && <div className={`absolute inset-0 ${scrims[scrim]}`} aria-hidden="true" />}
    </div>
  );
}
