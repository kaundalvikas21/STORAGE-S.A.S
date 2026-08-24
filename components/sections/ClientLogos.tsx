import { clients } from "@/content/site";

/** Single muted row. Wordmark placeholders until vector logos arrive; swap each <span> for <Image> with the same alt. */
export default function ClientLogos() {
  return (
    <section aria-labelledby="clients-title" className="order-10 border-y border-line bg-surface">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-10 md:py-12">
        <h2 id="clients-title" className="sr-only">Empresas que guardan con Storage</h2>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4" role="list" aria-label="Clientes">
          {clients.map((c) => (
            <li key={c}>
              <span className="text-[15px] font-medium text-muted-2">{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
