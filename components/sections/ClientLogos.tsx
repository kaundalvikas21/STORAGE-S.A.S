import Reveal, { RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { clients } from "@/content/site";

/** Strict ruled grid. Wordmark placeholders until vector logos arrive; swap each <span> for <Image> with the same alt. */
export default function ClientLogos() {
  return (
    <section aria-labelledby="clients-title" className="order-10 border-y-[1.5px] border-ink bg-bg-deep/60">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-12 md:py-14">
        <Reveal><h2 id="clients-title" className="font-display text-2xl font-bold uppercase text-ink mb-8">Empresas que guardan con Storage</h2></Reveal>
        <RevealStagger as="ul" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px border-[1.5px] border-ink bg-ink" role="list">
          {clients.map((c) => (
            <RevealItem as="li" key={c} className="group flex min-h-[96px] items-center justify-center bg-bg p-5">
              {/* Logo-row state: muted at rest, full strength on hover (MASTER.md §8). */}
              <span className="font-display text-lg font-bold uppercase text-center text-muted opacity-60 transition-all duration-slow ease-soft group-hover:text-ink group-hover:opacity-100">{c}</span>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
