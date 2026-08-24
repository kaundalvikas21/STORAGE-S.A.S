// Isometric storage unit for the hero visualizer. Hand-rolled SVG ILLUSTRATION,
// declared in MASTER.md §8.1 (the Phosphor-only rule covers icons). All fills are
// tokens; the volume prism and furniture react to `m3` with CSS transitions only.

type Pt = [number, number];
const pts = (arr: Pt[]) => arr.map((p) => p.join(",")).join(" ");

// 2:1 isometric axes from a box's front (lowest) corner: right = (1,-0.5), left = (-1,-0.5).
function isoBox(px: number, py: number, w: number, d: number, h: number) {
  const a: Pt = [px, py];
  const b: Pt = [px + w, py - w / 2];
  const dd: Pt = [px - d, py - d / 2];
  const c: Pt = [b[0] - d, b[1] - d / 2];
  const up = (p: Pt): Pt => [p[0], p[1] - h];
  return {
    top: pts([up(a), up(b), up(c), up(dd)]),
    right: pts([a, b, up(b), up(a)]),
    left: pts([a, dd, up(dd), up(a)]),
  };
}

// Furniture appears stepwise as the slider fills the unit: cajas → maleta →
// nevera → sofá → escritorio → estantería → estibas de inventario.
const pieces = [
  { at: 1, box: [150, 205, 22, 22, 20] },
  { at: 3, box: [186, 196, 20, 20, 16] },
  { at: 5, box: [120, 196, 26, 16, 24] },
  { at: 8, box: [212, 180, 22, 22, 60] },
  { at: 11, box: [94, 182, 58, 24, 26] },
  { at: 14, box: [160, 178, 40, 26, 30] },
  { at: 17, box: [112, 160, 26, 18, 64] },
  { at: 20, box: [202, 152, 40, 30, 48] },
] as const;

export default function IsoUnit({ m3 }: { m3: number }) {
  const fill = Math.max(0.06, m3 / 50);
  return (
    <svg viewBox="0 0 320 240" role="presentation" aria-hidden="true" className="mt-4 w-full">
      {/* Open unit: two back walls + floor */}
      <g stroke="var(--line)" strokeWidth="1.5" strokeLinejoin="round">
        <polygon points="50,75 160,20 160,110 50,165" fill="var(--bg)" />
        <polygon points="160,20 270,75 270,165 160,110" fill="var(--surface)" />
        <polygon points="50,165 160,110 270,165 160,220" fill="var(--bg)" />
      </g>
      {/* Volume prism: scaleY tracks m³ (a stylized gauge, not geometry) */}
      <g
        style={{
          transform: `scaleY(${fill})`,
          transformOrigin: "center bottom",
          transformBox: "fill-box",
          transition: "transform var(--d) var(--ease)",
        }}
      >
        <polygon points="50,165 160,220 160,140 50,85" fill="var(--primary)" fillOpacity="0.16" />
        <polygon points="160,220 270,165 270,85 160,140" fill="var(--primary)" fillOpacity="0.1" />
        <polygon points="50,85 160,30 270,85 160,140" fill="var(--primary)" fillOpacity="0.24" />
      </g>
      {/* Furniture pieces pop in by m³ threshold */}
      {pieces.map(({ at, box }, i) => {
        const [px, py, w, d, h] = box;
        const f = isoBox(px, py, w, d, h);
        const visible = m3 >= at;
        return (
          <g
            key={i}
            stroke="var(--muted-2)"
            strokeWidth="1"
            strokeLinejoin="round"
            className={`transition-all duration ease-soft ${visible ? "opacity-100 translate-y-0" : "translate-y-1 opacity-0"}`}
          >
            <polygon points={f.left} fill="var(--primary-soft)" />
            <polygon points={f.right} fill="var(--line)" />
            <polygon points={f.top} fill="var(--surface)" />
          </g>
        );
      })}
    </svg>
  );
}
