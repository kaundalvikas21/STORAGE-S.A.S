import { clients } from "@/content/site";

const Row = ({ hidden = false }: { hidden?: boolean }) => (
  <ul className="flex items-center gap-x-12 pr-12" role="list" aria-hidden={hidden || undefined}>
    {clients.map((c) => (
      <li key={c} className="whitespace-nowrap">
        <span className="text-[15px] font-medium text-muted-2">{c}</span>
      </li>
    ))}
  </ul>
);

/** The page's single marquee (MASTER.md §8.2): CSS-only, pauses on hover/focus,
 *  static wrapped row under reduced motion (the aria-hidden duplicate disappears).
 *  Wordmark placeholders until vector logos arrive; swap each <span> for <Image>. */
export default function ClientLogos() {
  return (
    <section aria-labelledby="clients-title" className="order-10 border-y border-line bg-surface">
      <div className="mx-auto max-w-site px-5 py-10 md:px-8 md:py-12 lg:px-10">
        <h2 id="clients-title" className="sr-only">Empresas que guardan con Storage</h2>
        <div className="marquee" aria-label="Clientes">
          <div className="marquee-track">
            <Row />
            <Row hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
