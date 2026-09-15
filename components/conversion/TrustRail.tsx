import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { quotePage, securityLine, trust } from "@/content/site";

/** Trust rail beside the quote form (spec T7): the five TrustBar stats as static figures (no
 *  count-up beside a form someone is filling in) plus one security capability line. The page's
 *  one dark cell; the first stat spans both columns so five figures leave no empty cell. */
export default function TrustRail() {
  return (
    <aside aria-labelledby="rail-title" className="dark-cell rounded-lg p-6 shadow-3 md:p-8 lg:sticky lg:top-6">
      <h2 id="rail-title" className="font-display text-2xl font-semibold text-ink">{quotePage.railTitle}</h2>
      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5">
        {trust.map((s, i) => (
          <div key={s.label} className={`flex flex-col-reverse ${i === 0 ? "col-span-2" : ""}`}>
            <dt className="text-[13px] text-muted">{s.label}</dt>
            <dd className="tnum font-display text-3xl font-semibold text-accent">
              {s.value}
              {s.suffix}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 flex items-start gap-3 border-t border-line pt-6 text-[15px] leading-relaxed text-ink">
        <ShieldCheck size={22} weight="regular" aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
        {securityLine}
      </p>
    </aside>
  );
}
