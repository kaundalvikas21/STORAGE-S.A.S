import { SEDES_URL, footerCols, needs, sedes, sizes } from "@/content/site";

export type MenuItem = { label: string; href: string; badge?: string };
export type MenuCol = {
  title: string;
  items: MenuItem[];
  more?: MenuItem;
  /** "Por sede" is the priority column in the wireframe: accent border + tinted background. */
  priority?: boolean;
};

/**
 * Dropdown contents, all derived from content/site.ts so nothing here can drift.
 * Calle 197 comes first everywhere by the array order rule in content/site.ts.
 */
export const menus: Record<string, MenuCol[]> = {
  "/bodegaje-bogota/": [
    { title: "Por tamaño", items: sizes.map((s) => ({ label: s.name, href: s.href })) },
    { title: "Por necesidad", items: needs },
    {
      title: "Por sede",
      priority: true,
      items: sedes.map((s) => ({
        label: s.name,
        href: `/sedes/${s.slug}/`,
        badge: s.badge ? "Nueva sede" : undefined,
      })),
      more: { label: "Ver las 7 sedes", href: SEDES_URL },
    },
  ],
  [SEDES_URL]: [
    {
      title: "Sedes en Bogotá",
      items: sedes.map((s) => ({ label: `${s.name} · ${s.zone}`, href: `/sedes/${s.slug}/`, badge: s.badge ? "Nueva sede" : undefined })),
      more: { label: "Ver las 7 sedes", href: SEDES_URL },
    },
  ],
  "/mudanzas-bogota/": [{ title: "Mudanzas", items: footerCols.mudanzas.slice(0, 3) }],
  "/quienes-somos/": [{ title: "Empresa", items: footerCols.empresa.slice(0, 4) }],
};
