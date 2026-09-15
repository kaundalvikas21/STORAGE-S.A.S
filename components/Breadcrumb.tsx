import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import SchemaScript from "@/components/SchemaScript";
import { breadcrumbList } from "@/lib/schema";

type Crumb = { name: string; href: string };

/** "Inicio › Página" under the header on every inner page (spec R1). Emits its own BreadcrumbList
 *  JSON-LD from the same items, so the visible trail and the schema can never disagree. */
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  const trail = [{ name: "Inicio", href: "/" }, ...items];
  return (
    <nav aria-label="Migas de pan" className="mx-auto max-w-site px-5 pt-4 md:px-8 lg:px-10">
      <SchemaScript data={breadcrumbList(trail)} />
      <ol className="flex flex-wrap items-center gap-x-1.5 text-[13px] text-muted">
        {trail.map((c, i) =>
          i < trail.length - 1 ? (
            <li key={c.href} className="flex items-center gap-1.5">
              <Link
                href={c.href}
                className="inline-flex min-h-[44px] cursor-pointer items-center rounded-sm transition-colors duration-fast ease-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="link-draw">{c.name}</span>
              </Link>
              <CaretRight size={12} aria-hidden="true" />
            </li>
          ) : (
            <li key={c.href} aria-current="page" className="font-medium text-ink">
              {c.name}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}
