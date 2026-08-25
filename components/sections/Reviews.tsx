import { GoogleLogo } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem, RevealRule, RevealStagger } from "@/components/motion/Reveal";
import { reviews as seed, type Review } from "@/content/site";

/** Pass `reviews` from a server fetch (Google Places / reviews API) to replace the seed data. */
export default function Reviews({ reviews = seed }: { reviews?: Review[] }) {
  return (
    <section aria-labelledby="reviews-title" className="order-9">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-14 md:py-20 lg:py-24">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">Reseñas en Google</p>
            <h2 id="reviews-title" className="font-display text-3xl font-bold uppercase text-ink max-w-[18ch]">Lo que dicen quienes ya guardan con nosotros</h2>
            <RevealRule className="mt-5 max-w-[320px]" />
          </div>
          <p className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.08em] text-muted">
            <GoogleLogo size={18} weight="regular" aria-hidden="true" /> Reseñas verificadas de Google
          </p>
        </Reveal>

        <RevealStagger as="ul" className="mt-10 grid gap-5 md:grid-cols-3" role="list">
          {reviews.map((r) => (
            <RevealItem as="li" key={`${r.author}-${r.date}`}>
              <article className="h-full border-[1.5px] border-ink bg-surface shadow-2 p-6 md:p-7 flex flex-col">
                <p role="img" aria-label={`Calificación: ${r.rating} de 5`} className="font-mono text-[15px] tracking-[0.25em] text-ink">
                  <span aria-hidden="true">{"■".repeat(r.rating)}{"□".repeat(5 - r.rating)}</span>
                </p>
                <blockquote className="mt-4 text-[15px] text-ink-2 leading-relaxed">
                  <p>“{r.text}”</p>
                </blockquote>
                <footer className="mt-auto pt-5 flex items-center justify-between gap-3 border-t border-line">
                  <span className="pt-3 text-[13px] font-semibold text-ink">{r.author}</span>
                  <span className="pt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{r.sede}</span>
                </footer>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
