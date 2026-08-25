import { GoogleLogo, Star } from "@phosphor-icons/react/dist/ssr";
import { RevealRule } from "@/components/motion/Reveal";
import RevealStagger, { RevealItem } from "@/components/motion/RevealStagger";
import { reviews as seed, type Review } from "@/content/site";

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

/** Pass `reviews` from a server fetch (Google Places / reviews API) to replace the seed data. Cards stagger 80ms apart. */
export default function Reviews({ reviews = seed }: { reviews?: Review[] }) {
  return (
    <section aria-labelledby="reviews-title" className="order-9">
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10 lg:py-24">
        <RevealStagger className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <RevealItem>
            <p className="eyebrow mb-3">Reseñas en Google</p>
            <h2 id="reviews-title" className="font-display text-3xl font-semibold text-ink max-w-[20ch]">
              Lo que dicen quienes ya guardan con nosotros
            </h2>
            <RevealRule className="mt-5 max-w-[320px]" />
          </RevealItem>
          <RevealItem as="div" className="inline-flex items-center gap-2 text-[13px] text-muted">
            <GoogleLogo size={18} weight="regular" aria-hidden="true" /> Reseñas verificadas de Google
          </RevealItem>
        </RevealStagger>

        <RevealStagger as="ul" role="list" gap={0.08} className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map((r) => (
            <RevealItem as="li" key={`${r.author}-${r.date}`}>
              <article className="flex h-full flex-col rounded-lg border border-line bg-bg p-6 md:p-7">
                <p role="img" aria-label={`Calificación: ${r.rating} de 5`} className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={14} weight={i < r.rating ? "fill" : "regular"} aria-hidden="true" className="text-primary" />
                  ))}
                </p>
                <blockquote className="mt-4 text-[15px] leading-relaxed text-ink-2">
                  <p>“{r.text}”</p>
                </blockquote>
                <footer className="mt-auto flex items-center gap-3 border-t border-line pt-4 mt-5">
                  <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-[12px] font-semibold text-muted">
                    {initials(r.author)}
                  </span>
                  <span className="text-[13px] font-semibold text-ink">{r.author}</span>
                  <span className="ml-auto text-[12px] text-muted">{r.sede}</span>
                </footer>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
