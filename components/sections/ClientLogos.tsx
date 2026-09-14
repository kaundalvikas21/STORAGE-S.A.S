import Image from "next/image";
import { clients } from "@/content/site";

const Row = ({ hidden = false }: { hidden?: boolean }) => (
  <ul className="flex shrink-0 items-center gap-x-14 pr-14" role="list" aria-hidden={hidden || undefined}>
    {clients.map((c) => (
      <li key={c.src} title={c.name} className="flex h-12 w-32 shrink-0 items-center justify-center">
        <Image
          src={c.src}
          alt={hidden ? "" : c.name}
          width={c.w}
          height={c.h}
          className="max-h-12 w-auto max-w-full opacity-80 grayscale transition-[filter,opacity] duration ease-soft hover:opacity-100 hover:grayscale-0"
        />
      </li>
    ))}
  </ul>
);

/** The page's single marquee (MASTER.md §8.2): CSS-only, pauses on hover/focus.
 *  Real client and partner logos from storagebogota.com, each centred in an equal 128x48 slot (no
 *  distortion, even rhythm), muted (grayscale, 80%) at rest so five brand palettes never fight the
 *  page's yellow, full colour on hover; the name is a native tooltip (checklist §4). Four copies: one row of five logos is narrower
 *  than a desktop viewport and the loop translates by half the track. Under reduced motion the
 *  aria-hidden copies disappear and a single static row remains. */
export default function ClientLogos() {
  return (
    <section aria-labelledby="clients-title" className="order-10 border-y border-line bg-surface">
      <div className="mx-auto max-w-site px-5 py-10 md:px-8 md:py-12 lg:px-10">
        <h2 id="clients-title" className="sr-only">Clientes y aliados de Storage</h2>
        <div className="marquee" aria-label="Clientes y aliados">
          <div className="marquee-track">
            <Row />
            <Row hidden />
            <Row hidden />
            <Row hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
