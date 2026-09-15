import Link from "next/link";
import { ArrowRight, Bell, IdentificationCard, LockKey, UsersThree, VideoCamera } from "@phosphor-icons/react/dist/ssr";
import Photo from "@/components/Photo";
import Reveal, { RevealItem } from "@/components/Reveal";
import { cctvPhoto } from "@/content/images";
import { seguridadPage as t, type SecurityId } from "@/content/site";

const icons = { cctv: VideoCamera, registro: IdentificationCard, humo: Bell, candado: LockKey, personal: UsersThree } satisfies Record<SecurityId, unknown>;

/** /seguridad/ blocks 1-2 (spec T6): the five capabilities, each saying what it does for the client
 *  (R5). Bento with exactly five cells: CCTV is the tall photo cell spanning both rows at lg, the other
 *  four sit 2×2 beside it (Candado on --primary-soft for background rhythm). md: the lead spans both
 *  columns above the 2×2; phones stack. Closes with the one down-link to /sedes/. */
export default function SecurityFeatures() {
  const [lead, ...rest] = t.features;
  const LeadIcon = icons[lead.id];
  return (
    <section aria-labelledby="security-title" className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10">
      <Reveal>
        <h2 id="security-title" className="max-w-[24ch] font-display text-3xl font-semibold text-ink">{t.featuresTitle}</h2>
      </Reveal>
      <Reveal group as="ul" role="list" className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-[1.25fr_1fr_1fr] lg:grid-rows-2">
        <RevealItem as="li" className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-1 md:col-span-2 lg:col-span-1 lg:row-span-2">
          <Photo img={cctvPhoto} sizes="(min-width: 1024px) 40vw, 100vw" zoom={false} className="aspect-[16/10] w-full lg:aspect-auto lg:min-h-[240px] lg:flex-1" />
          <div className="flex items-start gap-4 p-7 md:p-8">
            <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
              <LeadIcon size={26} />
            </span>
            <div>
              <h3 className="font-display text-2xl font-semibold text-ink">{lead.title}</h3>
              <p className="mt-2 max-w-[48ch] text-[16px] leading-relaxed text-ink-2">{lead.body}</p>
            </div>
          </div>
        </RevealItem>
        {rest.map((f) => {
          const Icon = icons[f.id];
          const tinted = f.id === "candado";
          return (
            <RevealItem as="li" key={f.id} className={`flex flex-col gap-5 rounded-lg border border-line p-7 shadow-1 ${tinted ? "bg-primary-soft" : "bg-surface"}`}>
              <span aria-hidden="true" className={`flex h-12 w-12 items-center justify-center rounded-md text-primary ${tinted ? "border border-line bg-surface" : "bg-primary-soft"}`}>
                <Icon size={24} />
              </span>
              <div>
                <h3 className="text-xl font-semibold text-ink">{f.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{f.body}</p>
              </div>
            </RevealItem>
          );
        })}
      </Reveal>
      <Link
        href={t.sedesLink.href}
        className="group mt-6 inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-[2px] text-[15px] font-medium text-primary hover:text-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="link-draw">{t.sedesLink.label}</span>
        <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
      </Link>
    </section>
  );
}
