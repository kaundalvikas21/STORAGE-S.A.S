import Photo from "@/components/Photo";
import type { Photo as PhotoData } from "@/content/images";
import { sedePage } from "@/content/sedes";

/** lg: a 4-column, 2-row bento shaped by how many photos the sede has (1-4), never an empty cell.
 *  4 = large 2×2 + wide + two small · 3 = large + two wide · 2 = two halves · 1 = full width. */
const lgCell = (n: number, i: number) => {
  if (i === 0) return n === 1 ? "lg:col-span-4 lg:row-span-2" : "lg:col-span-2 lg:row-span-2";
  if (n === 2) return "lg:col-span-2 lg:row-span-2";
  return n === 3 || i === 1 ? "lg:col-span-2" : "lg:col-span-1";
};

/** Sede page block 2 (spec T5): photographs of THIS site. FOTOS REALES PENDIENTES · Open Item 1: the
 *  slots come from content/images.ts sedeGallery, generated placeholders until the client's photos arrive.
 *  Below lg: 2 columns, first photo full width, and the next one too when the rest is odd. Not wrapped in
 *  Reveal: the first photo sits in the first viewport and is the page's LCP, hence its `priority`. */
export default function SedeGallery({ photos }: { photos: PhotoData[] }) {
  const n = photos.length;
  return (
    <section aria-labelledby="gallery-title" className="mx-auto max-w-site px-5 pb-14 md:px-8 md:pb-20 lg:px-10">
      <h2 id="gallery-title" className="sr-only">{sedePage.galleryTitle}</h2>
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:h-[520px] lg:grid-cols-4 lg:grid-rows-2">
        {photos.map((img, i) => {
          const wide = i === 0 || (i === 1 && (n - 1) % 2 === 1);
          return (
            <Photo
              key={img.src}
              img={img}
              priority={i === 0}
              zoom={false}
              sizes={i === 0 || n === 2 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
              className={`rounded-lg border border-line lg:aspect-auto lg:h-full ${wide ? "col-span-2 aspect-[16/10]" : "aspect-square"} ${lgCell(n, i)}`}
            />
          );
        })}
      </div>
    </section>
  );
}
