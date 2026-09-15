// Open isometric storage unit with contents inside. Hand-rolled SVG ILLUSTRATION (MASTER.md
// §8.1; the Phosphor-only rule covers icons). Server-safe: no hooks, all fills are tokens.
import type { ArtId } from "@/content/segments";

type Pt = [number, number];
const pts = (a: Pt[]) => a.map((p) => p.join(",")).join(" ");

/** [x, y, w, d, h] from the item's front-bottom corner, in unit space (floor spans x 10-62, y 28-56). */
export type Item = readonly [number, number, number, number, number];

/** What sits inside each unit, mirroring the intent cards' hint copy: cajas → two boxes;
 *  apartaestudio → bed + nevera; apartamento → sofá + mesa + caja; empresa → estibas apiladas.
 *  Shared by IntentCards (homepage) and M3Guide (segment pages); lives here because IntentCards is a
 *  client module and a server component can't read plain values out of one. */
export const unitContents = {
  cajas: [[30, 50, 8, 8, 8], [40, 46, 7, 7, 7]],
  apartaestudio: [[22, 50, 16, 9, 5], [44, 46, 7, 7, 16]],
  apartamento: [[20, 51, 13, 7, 7], [36, 51, 9, 9, 5], [45, 43, 6, 6, 6]],
  empresa: [[24, 51, 10, 10, 8], [24, 43, 10, 10, 8], [36, 46, 10, 10, 8], [36, 38, 10, 10, 8]],
} as const satisfies Record<ArtId, readonly Item[]>;

// 2:1 isometric box: returns the three visible faces.
function faces(px: number, py: number, w: number, d: number, h: number) {
  const a: Pt = [px, py], b: Pt = [px + w, py - w / 2], dd: Pt = [px - d, py - d / 2];
  const c: Pt = [b[0] - d, b[1] - d / 2];
  const up = (p: Pt): Pt => [p[0], p[1] - h];
  return { a, b, c, dd, up, left: pts([a, dd, up(dd), up(a)]), right: pts([a, b, up(b), up(a)]), top: pts([up(a), up(b), up(c), up(dd)]) };
}

type Props = {
  items: readonly Item[];
  /** 0.5-1: scales the whole unit so a row of them reads as a size ladder. */
  k: number;
  /** Selected state: unit and contents recolour in --primary. */
  active?: boolean;
  className?: string;
};

export default function IsoBox({ items, k, active = false, className = "h-[60px] w-20" }: Props) {
  const u = faces(32, 56, 30, 22, 28);
  const stroke = active ? "var(--primary)" : "var(--muted-2)";
  const item = active
    ? { left: "var(--primary-soft)", right: "var(--primary)", top: "var(--primary)", ro: 0.55, to: 0.85 }
    : { left: "var(--primary-soft)", right: "var(--line)", top: "var(--surface)", ro: 1, to: 1 };
  return (
    <svg viewBox="0 0 64 60" aria-hidden="true" className={`shrink-0 transition-transform duration ease-soft group-hover:-translate-y-1 ${className}`}>
      <g transform={`translate(32 56) scale(${k}) translate(-32 -56)`} strokeLinejoin="round" className="transition-all duration ease-soft">
        {/* far walls + floor: the unit is open toward the viewer */}
        <g stroke={stroke} strokeWidth="1.25" strokeOpacity={active ? 0.7 : 0.55}>
          <polygon points={pts([u.dd, u.c, u.up(u.c), u.up(u.dd)])} fill="var(--bg)" />
          <polygon points={pts([u.c, u.b, u.up(u.b), u.up(u.c)])} fill={active ? "var(--primary-soft)" : "var(--surface)"} />
          <polygon points={pts([u.a, u.b, u.c, u.dd])} fill={active ? "var(--primary-soft)" : "var(--bg)"} />
        </g>
        <g stroke={stroke} strokeWidth="1">
          {items.map(([x, y, w, d, h], i) => {
            const f = faces(x, y, w, d, h);
            return (
              <g key={i}>
                <polygon points={f.left} fill={item.left} />
                <polygon points={f.right} fill={item.right} fillOpacity={item.ro} />
                <polygon points={f.top} fill={item.top} fillOpacity={item.to} />
              </g>
            );
          })}
        </g>
      </g>
    </svg>
  );
}
