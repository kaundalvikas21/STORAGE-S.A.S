import { SEDES_URL, footerCols, needs, sedes, sizes } from "@/content/site";

export type MenuItem = { label: string; href: string; badge?: string };
export type MenuCol = {
  title: string;
  items: MenuItem[];
  more?: MenuItem;
  /** "Por sede" is the money column — accent border + tinted background (wireframe §01). */
  priority?: boolean;
};

const pick = (list: MenuItem[], hrefs: string[]) => hrefs.map((h) => list.find((l) => l.href === h)!).filter(Boolean);

/** Calle 197 is first everywhere by array order (content/site.ts commercial rule). */
const sedeItems: MenuItem[] = sedes.map((s) => ({
  label: s.name,
  href: `/sedes/${s.slug}/`,
  badge: s.badge ? "Nueva sede" : undefined,
}));
const verLasSiete: MenuItem = { label: "Ver las 7 sedes", href: SEDES_URL };

export const menus: Record<string, MenuCol[]> = {
  "/bodegaje-bogota/": [
    { title: "Por tamaño", items: sizes.map((s) => ({ label: s.name, href: s.href })) },
    { title: "Por necesidad", items: needs },
    { title: "Por sede", items: sedeItems, more: verLasSiete, priority: true },
  ],
  [SEDES_URL]: [
    { title: "Sedes en Bogotá", items: sedes.map((s) => ({ label: `${s.name} · ${s.zone}`, href: `/sedes/${s.slug}/` })), more: verLasSiete },
  ],
  "/mudanzas-bogota/": [
    { title: "Mudanzas", items: pick(footerCols.mudanzas, ["/trasteos-bogota/", "/mudanzas-empresariales/"]) },
  ],
  "/quienes-somos/": [
    { title: "Empresa", items: pick(footerCols.empresa, ["/quienes-somos/", "/seguridad/", "/preguntas-frecuentes/", "/contacto/"]) },
  ],
};
