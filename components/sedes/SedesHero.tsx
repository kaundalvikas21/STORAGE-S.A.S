import SedeMap from "@/components/sections/SedeMap";
import { sedesHub } from "@/content/sedes";

/** /sedes/ block 1: h1 + intro stacked, then the homepage's own map cell full width (Leaflet, 7 yellow
 *  pins, Autopista Norte larger with its permanent tag). Every breakpoint: SedeMap sizes itself below
 *  lg (340px phones, 440px tablets) and loads the map chunk only as it nears the viewport. */
export default function SedesHero() {
  return (
    <section aria-labelledby="sedes-h1" className="mx-auto max-w-site px-5 pb-10 pt-2 md:px-8 lg:px-10">
      <h1 id="sedes-h1" className="font-display text-3xl font-semibold text-ink">{sedesHub.h1}</h1>
      <p className="mt-3 max-w-[65ch] text-[16px] leading-relaxed text-ink-2">{sedesHub.intro}</p>
      <div className="mt-8 lg:h-[460px]">
        <SedeMap />
      </div>
    </section>
  );
}
