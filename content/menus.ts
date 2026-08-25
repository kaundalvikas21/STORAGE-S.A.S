// Header navigation model (wireframe §01 Global header). Bodegaje first: it is the money silo.
// All items derive from content/site.ts so Calle 197 stays first by array order.
import { SEDES_URL, needs, sedes, sizes } from "@/content/site";

export type MenuLink = { label: string; href: string; badge?: string };
export type MenuColumn = { title: string; items: MenuLink[]; more?: MenuLink; priority?: boolean };
export type NavItem = { label: string; href: string; columns?: MenuColumn[] };

const sedeLinks: MenuLink[] = sedes.map((s) => ({ label: s.name, href: `/sedes/${s.slug}/`, badge: s.badge }));
const allSedes: MenuLink = { label: "Ver las 7 sedes", href: SEDES_URL };

export const navItems: NavItem[] = [
  {
    label: "Bodegaje",
    href: "/bodegaje-bogota/",
    columns: [
      { title: "Por tamaño", items: sizes.map((s) => ({ label: s.name, href: s.href })) },
      { title: "Por necesidad", items: needs },
      { title: "Por sede", items: sedeLinks, more: allSedes, priority: true },
    ],
  },
  {
    label: "Sedes",
    href: SEDES_URL,
    columns: [{ title: "Sedes en Bogotá", items: sedeLinks, more: allSedes }],
  },
  {
    label: "Mudanzas",
    href: "/mudanzas-bogota/",
    columns: [
      {
        title: "Mudanzas",
        items: [
          { label: "Trasteos", href: "/trasteos-bogota/" },
          { label: "Mudanzas empresariales", href: "/mudanzas-empresariales/" },
        ],
      },
    ],
  },
  { label: "Precios", href: "/precios/" },
  {
    label: "Empresa",
    href: "/quienes-somos/",
    columns: [
      {
        title: "Empresa",
        items: [
          { label: "Quiénes somos", href: "/quienes-somos/" },
          { label: "Seguridad", href: "/seguridad/" },
          { label: "FAQ", href: "/preguntas-frecuentes/" },
          { label: "Contacto", href: "/contacto/" },
        ],
      },
    ],
  },
];
