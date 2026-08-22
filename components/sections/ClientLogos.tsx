import { clients } from "@/content/site";

/** Wordmark placeholders until vector logos arrive; swap each <span> for <Image> with the same alt. */
export default function ClientLogos() {
  const row = [...clients, ...clients];
  return (
    <section aria-labelledby="clients-title" className="order-10 border-y border-line bg-bg-deep/60 overflow-hidden">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-12 md:py-14">
        <h2 id="clients-title" className="text-center text-[11px] font-medium uppercase tracking-[0.2em] text-muted mb-8">Empresas que guardan con Storage</h2>
        <div className="relative">
          <ul className="logo-track flex w-max items-center gap-12 md:gap-20" role="list" aria-label="Clientes">
            {row.map((c, i) => (
              <li key={`${c}-${i}`} aria-hidden={i >= clients.length ? "true" : undefined} className="shrink-0">
                <span className="font-display text-xl md:text-2xl font-semibold text-ink opacity-60 grayscale transition-opacity duration-DEFAULT ease-soft hover:opacity-100 whitespace-nowrap">
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
