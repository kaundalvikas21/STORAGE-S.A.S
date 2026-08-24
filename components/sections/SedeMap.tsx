import { sedePins } from "@/content/site";

/**
 * Stylized Bogotá map with the 7 physical points. Hand-rolled SVG ILLUSTRATION,
 * declared in MASTER.md §8.1. The whole cell is aria-hidden: the sede card list
 * alone carries the information; pins light up from card hover/focus via the
 * `.sede-band:has()` rules in globals.css (interactive moment 3, zero JS).
 */
export default function SedeMap() {
  const featured = sedePins[0];
  return (
    <div aria-hidden="true" className="relative hidden h-full min-h-[420px] overflow-hidden rounded-lg border border-line bg-surface shadow-1 lg:block">
      <svg viewBox="0 0 240 300" className="absolute inset-0 h-full w-full p-6">
        {/* City silhouette (stylized, not cartographic) */}
        <path
          d="M150 18 C170 30 178 60 168 92 C190 120 196 160 180 200 C170 245 140 275 105 282 C75 286 52 268 48 236 C44 205 58 180 66 150 C74 122 84 95 104 70 C118 48 132 26 150 18 Z"
          fill="var(--bg)"
          stroke="var(--line)"
          strokeWidth="1.5"
        />
        {/* Autopista Norte: the axis the northern sedes hang from */}
        <path d="M112 270 C118 220 130 160 140 110 C145 85 148 62 150 40" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="1 6" strokeLinecap="round" />
        {sedePins.slice(1).map((p) => (
          <g key={p.label} data-pin={p.slug} transform={`translate(${p.x}, ${p.y})`}>
            <circle r="6" fill="var(--muted-2)" opacity="0.9" />
            <circle r="2.5" fill="var(--surface)" />
          </g>
        ))}
        {/* Calle 197: larger pin, single pulse (not looping) */}
        <g data-pin={featured.slug} transform={`translate(${featured.x}, ${featured.y})`} className="pin-pulse">
          <circle r="12" fill="var(--primary)" opacity="0.18" />
          <circle r="8" fill="var(--primary)" />
          <circle r="3" fill="var(--on-primary)" />
        </g>
      </svg>
      <span
        className="absolute rounded-full bg-accent px-2.5 py-1 text-[12px] font-medium text-on-accent shadow-1"
        style={{ left: `${(featured.x / 240) * 100}%`, top: `${(featured.y / 300) * 100}%`, transform: "translate(14px, -50%)" }}
      >
        Nueva sede · Alta disponibilidad
      </span>
    </div>
  );
}
