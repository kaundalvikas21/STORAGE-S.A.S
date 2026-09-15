import { ArrowsClockwise, Clock, LockKey } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import { bodegajePillar as t, type IncludedId } from "@/content/site";

const icons = { seguridad: LockKey, acceso: Clock, flexibilidad: ArrowsClockwise } satisfies Record<IncludedId, unknown>;

/** /bodegaje-bogota/ block 5: what every minibodega includes. Security copy is capability, never fear (R5).
 *  A bento, not three equal cards: Seguridad is the tall tinted cell spanning both rows at md+, Acceso and
 *  Flexibilidad stack beside it. Below md all three stack. */
export default function IncludedGrid() {
  return (
    <section aria-labelledby="included-title" className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10">
      <Reveal>
        <h2 id="included-title" className="max-w-[24ch] font-display text-3xl font-semibold text-ink">{t.included.title}</h2>
      </Reveal>
      <Reveal group as="ul" role="list" className="mt-10 grid gap-4 md:grid-cols-[1.1fr_1fr] md:grid-rows-2 md:gap-5">
        {t.included.items.map((it, i) => {
          const Icon = icons[it.id];
          const lead = i === 0;
          return (
            <RevealItem
              as="li"
              key={it.id}
              className={`flex rounded-lg border border-line p-7 shadow-1 md:p-8 ${lead ? "flex-col justify-between gap-10 bg-primary-soft md:row-span-2" : "items-start gap-5 bg-surface"}`}
            >
              <span
                aria-hidden="true"
                className={`flex shrink-0 items-center justify-center rounded-md ${lead ? "h-16 w-16 border border-line bg-surface text-primary" : "h-12 w-12 bg-primary-soft text-primary"}`}
              >
                <Icon size={lead ? 32 : 24} />
              </span>
              <div>
                <h3 className={`font-semibold text-ink ${lead ? "font-display text-2xl" : "text-xl"}`}>{it.title}</h3>
                <p className={`mt-2 max-w-[48ch] leading-relaxed text-ink-2 ${lead ? "text-[17px]" : "text-[15px]"}`}>{it.body}</p>
              </div>
            </RevealItem>
          );
        })}
      </Reveal>
    </section>
  );
}
