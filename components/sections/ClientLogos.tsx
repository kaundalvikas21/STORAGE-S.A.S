import RevealStagger, { RevealItem } from "@/components/motion/RevealStagger";
import { clients } from "@/content/site";

/** Single muted row. Wordmark placeholders until vector logos arrive; swap each <span> for <Image> with the same alt, keep `.logo`. */
export default function ClientLogos() {
  return (
    <section aria-labelledby="clients-title" className="order-10 border-y border-line bg-surface">
      <div className="mx-auto max-w-site px-5 py-10 md:px-8 md:py-12 lg:px-10">
        <h2 id="clients-title" className="sr-only">
          Empresas que guardan con Storage
        </h2>
        <RevealStagger as="ul" role="list" className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4" gap={0.05}>
          {clients.map((c) => (
            <RevealItem as="li" key={c}>
              <span className="logo inline-block text-[15px] font-medium text-ink">
                {c}
              </span>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
