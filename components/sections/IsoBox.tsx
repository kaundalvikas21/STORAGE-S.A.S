// Open isometric storage unit with contents inside. Hand-rolled SVG ILLUSTRATION (MASTER.md
// §8.1; the Phosphor-only rule covers icons). Server-safe: no hooks, all fills are tokens.

type Pt = [number, number];
const pts = (a: Pt[]) => a.map((p) => p.join(",")).join(" ");

/** [x, y, w, d, h] from the item's front-bottom corner, in unit space (floor spans x 10-62, y 28-56). */
export type Item = readonly [number, number, number, number, number];

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
