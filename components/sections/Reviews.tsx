import { GoogleLogo, Star } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import { reviews as seed, type Review } from "@/content/site";

/** Pass `reviews` from a server fetch (Google Places / reviews API) to replace the seed data. */
export default function Reviews({ reviews = seed }: { reviews?: Review[] }) {
  return (
    <section aria-labelledby="reviews-title" className="order-9">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-20 md:py-28 lg:py-36">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">Reseñas en Google</p>
            <h2 id="reviews-title" className="font-display text-3xl font-semibold text-ink max-w-[18ch]">Lo que dicen quienes ya guardan con nosotros</h2>
          </div>
          <p className="inline-flex items-center gap-2 text-[14px] text-muted">
            <GoogleLogo size={20} weight="light" aria-hidden="true" /> Reseñas verificadas de Google
          </p>
        </Reveal>

        <Reveal group as="ul" className="mt-10 grid gap-4 md:grid-cols-3" role="list">
          {reviews.map((r) => (
            <RevealItem as="li" key={`${r.author}-${r.date}`}>
              <article className="h-full rounded-xl bg-bg-deep ring-1 ring-line p-1.5">
                <div className="h-full rounded-xl-inner bg-surface shadow-2 p-6 md:p-7 flex flex-col">
                  <div className="flex items-center gap-0.5 text-accent" role="img" aria-label={`${r.rating} de 5 estrellas`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={18} weight={i < r.rating ? "fill" : "light"} aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-[15px] text-ink-2 leading-relaxed">
                    <p>“{r.text}”</p>
                  </blockquote>
                  <footer className="mt-auto pt-5 flex items-center justify-between gap-3 text-[13px]">
                    <span className="font-semibold text-ink">{r.author}</span>
                    <span className="text-muted">{r.sede}</span>
                  </footer>
                </div>
              </article>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
