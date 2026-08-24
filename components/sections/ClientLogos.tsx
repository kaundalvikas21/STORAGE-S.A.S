import { clients } from "@/content/site";

/** Strict ruled grid. Wordmark placeholders until vector logos arrive; swap each <span> for <Image> with the same alt. */
export default function ClientLogos() {
  return (
    <section aria-labelledby="clients-title" className="order-10 border-y-[1.5px] border-ink bg-bg-deep/60">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-12 md:py-14">
        <h2 id="clients-title" className="font-display text-2xl font-bold uppercase text-ink mb-8">Empresas que guardan con Storage</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px border-[1.5px] border-ink bg-ink" role="list" aria-label="Clientes">
          {clients.map((c) => (
            <li key={c} className="flex min-h-[96px] items-center justify-center bg-bg p-5">
              <span className="font-display text-lg font-bold uppercase text-muted text-center">{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
