import { Clock, IdentificationCard, LockKey, Truck, VideoCamera } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import { company, securityLine } from "@/content/facts";
import { sedePage as t, type FeatureId, type SedeDetail } from "@/content/sedes";

const icons = { vehicular: Truck, candado: LockKey, registro: IdentificationCard, cctv: VideoCamera } satisfies Record<FeatureId, unknown>;

/** Sede page blocks 4-5 (spec T5): access hours and this site's security features. Capability, never
 *  fear (R5): the copy is facts.ts securityLine. Split: statement + hours left, feature rows right
 *  (3 or 4 rows, a list rather than a grid so an odd count leaves no empty cell). */
export default function AccessSecurity({ detail }: { detail: SedeDetail }) {
  return (
    <section aria-labelledby="access-title" className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-site gap-8 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:px-10">
        <Reveal>
          <h2 id="access-title" className="font-display text-3xl font-semibold text-ink">{t.accessTitle}</h2>
          <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-ink-2">{securityLine}</p>
          <div className="mt-6 inline-flex items-start gap-3 rounded-lg border border-line bg-bg px-5 py-4">
            <Clock size={22} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
            <div>
              <p className="text-[13px] text-muted">{t.hoursLabel}</p>
              <p className="tnum mt-0.5 text-[15px] font-medium text-ink">{company.hours}</p>
            </div>
          </div>
        </Reveal>
        <Reveal group as="ul" role="list" className="flex flex-col gap-3 self-center">
          {detail.features.map((f) => {
            const Icon = icons[f];
            return (
              <RevealItem as="li" key={f} className="flex items-center gap-4 rounded-lg border border-line bg-bg px-5 py-4">
                <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
                  <Icon size={22} />
                </span>
                <span className="text-[16px] font-medium text-ink">{t.features[f]}</span>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
