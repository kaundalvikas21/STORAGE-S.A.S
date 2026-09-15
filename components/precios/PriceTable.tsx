import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/Reveal";
import { QUOTE_URL, preciosPage } from "@/content/site";

const t = preciosPage.table;
const [, colM3, colPrice, colFits] = t.cols;

/** Visible column name inside a cell below md, where the header row is visually hidden. aria-hidden:
 *  the real <th scope="col"> still labels the cell for screen readers. */
const CellLabel = ({ children }: { children: string }) => (
  <span aria-hidden="true" className="mb-1 block text-[12px] font-normal text-muted md:hidden">
    {children}
  </span>
);

/** /precios/ block 1 (spec T6): the price table by size band, a real <table> in a white cell. md+: the
 *  four columns. Below md each row stacks as a small grid (size on top, m³ + monthly range side by side,
 *  "ideal para" below) so the quote link is never scrolled out of view; explicit ARIA roles keep the
 *  table semantics that `display` changes would drop. "Rango mensual" shows `priceRange` once the client
 *  confirms it (Open Item 4); until then each cell links to /cotizar/ with the band pre-selected. */
export default function PriceTable() {
  return (
    <section aria-labelledby="table-title" className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10">
      <Reveal>
        <h2 id="table-title" className="font-display text-3xl font-semibold text-ink">{t.title}</h2>
        <p className="mt-3 max-w-[65ch] text-[15px] text-muted">{t.body}</p>
      </Reveal>
      <Reveal className="mt-10 overflow-hidden rounded-lg border border-line bg-surface shadow-1">
        <table role="table" className="w-full text-left max-md:block">
          <caption className="sr-only">{t.caption}</caption>
          <thead role="rowgroup" className="max-md:sr-only">
            <tr role="row" className="border-b border-line bg-primary-soft">
              {t.cols.map((c) => (
                <th key={c} role="columnheader" scope="col" className="px-6 py-4 text-[13px] font-medium text-ink-2">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody role="rowgroup" className="max-md:block">
            {t.rows.map((r, i) => (
              <tr
                key={r.id}
                role="row"
                className={`max-md:grid max-md:grid-cols-2 max-md:gap-x-4 max-md:gap-y-3 max-md:px-5 max-md:py-5 ${i < t.rows.length - 1 ? "border-b border-line" : ""}`}
              >
                <th role="rowheader" scope="row" className="px-6 py-5 align-top font-display text-lg font-semibold text-ink max-md:col-span-2 max-md:p-0">
                  {r.name}
                </th>
                <td role="cell" className="tnum whitespace-nowrap px-6 py-5 align-top text-[16px] font-semibold text-ink max-md:block max-md:p-0">
                  <CellLabel>{colM3}</CellLabel>
                  {r.range}
                </td>
                <td role="cell" className="px-6 py-3 align-top max-md:block max-md:p-0">
                  <CellLabel>{colPrice}</CellLabel>
                  {r.priceRange ? (
                    <span className="tnum inline-flex min-h-[44px] items-center text-[16px] font-semibold text-ink max-md:min-h-0">{r.priceRange}</span>
                  ) : (
                    <Link
                      href={`${QUOTE_URL}?tamano=${r.id}`}
                      className="group -my-2.5 inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[2px] text-[15px] font-medium text-primary hover:text-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:my-0"
                    >
                      <span className="link-draw">{t.quoteLink}</span>
                      <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
                    </Link>
                  )}
                </td>
                <td role="cell" className="px-6 py-5 align-top text-[15px] leading-relaxed text-ink-2 max-md:col-span-2 max-md:block max-md:p-0">
                  <CellLabel>{colFits}</CellLabel>
                  {r.fits}
                  {r.differential && <span className="mt-1 block text-[13px] text-muted">{r.hint}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </section>
  );
}
