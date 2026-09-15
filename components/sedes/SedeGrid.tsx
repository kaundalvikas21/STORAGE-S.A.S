import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Photo from "@/components/Photo";
import Reveal, { RevealItem } from "@/components/Reveal";
import { sedePhotos } from "@/content/images";
import { sedePages, sedesHub } from "@/content/sedes";

const card =
  "group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-1 transition-[transform,box-shadow,border-color] duration ease-soft hover:-translate-y-0.5 hover:border-muted-2 hover:shadow-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

/** /sedes/ block 3: the other sede pages (spec T4: four cards for seven points, deliberate). A bento,
 *  not three equal cards: the first (Toberín, three addresses) spans both rows at md+, the other two
 *  stack beside it as horizontal cards. Array order, never sorted (spec R6). */
export default function SedeGrid() {
  const rest = sedePages.slice(1);
  return (
    <section aria-labelledby="grid-title" className="mx-auto max-w-site px-5 pb-14 md:px-8 md:pb-20 lg:px-10">
      <h2 id="grid-title" className="font-display text-2xl font-semibold text-ink">{sedesHub.gridTitle}</h2>
      <Reveal group className="mt-6 grid gap-4 md:grid-cols-2 md:grid-rows-2 md:gap-5">
        {rest.map((s, i) => {
          const tall = i === 0;
          return (
            <RevealItem key={s.slug} className={tall ? "md:row-span-2" : ""}>
              <Link href={`/sedes/${s.slug}/`} data-sede={s.id} className={`${card} ${tall ? "" : "sm:flex-row"}`}>
                <Photo
                  img={sedePhotos[s.id]}
                  sizes={tall ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 640px) 25vw, 100vw"}
                  className={tall ? "aspect-[4/3] w-full md:aspect-auto md:min-h-[240px] md:flex-1" : "aspect-[16/9] w-full sm:aspect-auto sm:w-2/5 sm:shrink-0"}
                />
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h3 className="flex flex-wrap items-baseline gap-x-2 font-display text-xl font-semibold text-ink transition-colors duration-fast ease-soft group-hover:text-primary-deep">
                    {s.title}
                    {s.points.length > 1 && <span className="tnum font-body text-[13px] font-medium text-muted">{s.points.length} {sedesHub.points}</span>}
                  </h3>
                  <address className="mt-2 flex flex-col gap-0.5 text-[14px] not-italic leading-snug text-ink-2">
                    {s.points.map((p) => (
                      <span key={p.id}>{p.address}</span>
                    ))}
                  </address>
                  <ul role="list" aria-label={sedesHub.zonesLabel} className="mt-4 flex flex-wrap gap-1.5">
                    {s.coverage.split(", ").map((z) => (
                      <li key={z} className="rounded-full border border-line bg-bg px-2.5 py-0.5 text-[12px] text-ink-2">{z}</li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-medium text-primary group-hover:text-primary-deep">
                    {sedesHub.cardLink} <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          );
        })}
      </Reveal>
    </section>
  );
}
