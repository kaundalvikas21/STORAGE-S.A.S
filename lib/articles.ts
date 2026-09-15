// Blog helpers (spec T9). No imports, like lib/calculator.ts: they port verbatim to a WordPress theme.
// Self-check: scripts/check-conversion.mjs.

export type Segment = { text: string; href?: string };

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** "[label](/ruta/)" markers in article text → plain and link segments, in reading order. */
export function splitLinks(text: string): Segment[] {
  const out: Segment[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ text: text.slice(last, i) });
    out.push({ text: m[1], href: m[2] });
    last = i + m[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out;
}

/** Spanish heading → anchor id for the TOC: NFKD strips accents and turns "m³" into "m3", lowercase,
 *  every other run of characters collapses to "-". */
export function headingId(text: string) {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type TextBlock = { text: string } | { items: string[] };

/** Reading time at 200 words per minute, never under one minute. A link counts as its label. */
export function readingMinutes(blocks: TextBlock[]) {
  const text = blocks.map((b) => ("items" in b ? b.items.join(" ") : b.text)).join(" ");
  const words = text.replace(LINK, "$1").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
