import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import FaqList from "@/components/FaqList";
import Reveal from "@/components/Reveal";
import { faqHub as t } from "@/content/site";

/** Theme index for the /preguntas-frecuentes/ intro (PageIntro `aside`): the band's one dark cell, one
 *  56px anchor row per theme with its question count. It fills the intro's right column at lg with
 *  navigation instead of decoration, and stacks under the CTAs below lg. Plain anchors, no JS. */
export function FaqIndex() {
  return (
    <nav aria-labelledby="faq-index-title" className="dark-cell rounded-lg p-6 shadow-3 md:p-8">
      <h2 id="faq-index-title" className="font-display text-2xl font-semibold text-ink">{t.indexLabel}</h2>
      <ul role="list" className="mt-4">
        {t.groups.map((g, i) => (
          <li key={g.id} className={i < t.groups.length - 1 ? "border-b border-line" : ""}>
            <a
              href={`#${g.id}`}
              className="group flex min-h-[56px] cursor-pointer items-center justify-between gap-4 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
            >
              <span className="text-lg font-semibold text-ink transition-colors duration-fast ease-soft group-hover:text-accent">{g.title}</span>
              <span className="flex shrink-0 items-center gap-2 text-[13px] text-muted">
                <span className="tnum">
                  {g.items.length} {t.countLabel}
                </span>
                <ArrowDown size={16} aria-hidden="true" className="text-accent transition-transform duration-fast ease-soft group-hover:translate-y-0.5" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** /preguntas-frecuentes/ block 2 (spec T6 FAQ hub): one accordion per theme, each its own exclusive
 *  `<details name>` set, each group an anchor target for FaqIndex (scroll-mt clears the sticky header). */
export default function FaqHub() {
  return (
    <div className="mx-auto flex max-w-site flex-col gap-12 px-5 pb-14 md:gap-16 md:px-8 md:pb-20 lg:px-10">
      {t.groups.map((g) => (
        <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className="scroll-mt-28">
          <Reveal>
            <h2 id={`${g.id}-title`} className="font-display text-2xl font-semibold text-ink">{g.title}</h2>
          </Reveal>
          <FaqList items={g.items} name={`faq-${g.id}`} className="mt-6 lg:max-w-[880px]" />
        </section>
      ))}
    </div>
  );
}
