import { ArrowsHorizontal, GoogleLogo, Star } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem, RevealRule } from "@/components/Reveal";
import ScrollRow from "@/components/ScrollRow";
import { reviews as seed, type Review } from "@/content/site";

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

/** Snap-scroll row (touch-friendly, drag-to-scroll on desktop).
 *  Pass `reviews` from a server fetch (Google Places / reviews API) to replace the seed data. */
export default function Reviews({ reviews = seed }: { reviews?: Review[] }) {
  return (
    <section aria-labelledby="reviews-title" className="order-9">
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10 lg:py-24">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">Reseñas en Google</p>
            <h2 id="reviews-title" className="max-w-[20ch] font-display text-3xl font-semibold text-ink">Lo que dicen quienes ya guardan con nosotros</h2>
            <RevealRule className="mt-5 max-w-[320px]" />
          </div>
          <p className="inline-flex items-center gap-2 text-[13px] text-muted">
            <GoogleLogo size={18} weight="regular" aria-hidden="true" /> Reseñas verificadas de Google
          </p>
        </Reveal>

        <Reveal group className="mt-10">
          <ScrollRow label="Reseñas de clientes">
            {reviews.map((r) => (
              <RevealItem as="li" key={`${r.author}-${r.date}`} className="min-w-[85%] snap-start sm:min-w-[380px]">
                <article className="flex h-full flex-col rounded-lg border border-line bg-surface p-6 shadow-1 transition-all duration ease-soft hover:-translate-y-0.5 hover:shadow-2 md:p-7">
                  <p role="img" aria-label={`Calificación: ${r.rating} de 5`} className="flex gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={14} weight={i < r.rating ? "fill" : "regular"} aria-hidden="true" className="text-primary" />
                    ))}
                  </p>
                  <blockquote className="mt-4 text-[15px] leading-relaxed text-ink-2">
                    <p>“{r.text}”</p>
                  </blockquote>
                  <footer className="mt-auto flex items-center gap-3 border-t border-line pt-4 mt-5">
                    <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-bg text-[12px] font-semibold text-muted">
                      {initials(r.author)}
                    </span>
                    <span className="text-[13px] font-semibold text-ink">{r.author}</span>
                    <span className="ml-auto text-[12px] text-muted">{r.sede}</span>
                  </footer>
                </article>
              </RevealItem>
            ))}
          </ScrollRow>
          <p className="mt-3 inline-flex items-center gap-2 text-[13px] text-muted md:hidden">
            <ArrowsHorizontal size={16} aria-hidden="true" /> Desliza para ver más
          </p>
          <p className="mt-3 hidden items-center gap-2 text-[13px] text-muted md:inline-flex">
            <ArrowsHorizontal size={16} aria-hidden="true" /> Arrastra para ver más
          </p>
        </Reveal>
      </div>
    </section>
  );
}
