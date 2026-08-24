import { Clock, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/Button";
import Photo from "@/components/Photo";
import Reveal, { RevealItem } from "@/components/Reveal";
import { photos } from "@/content/images";
import { CALC_URL, QUOTE_URL, company, trust } from "@/content/site";

/** Figures come straight from content/site.ts `trust` — nothing here is a new claim. */
const figures = [trust[1], trust[2], trust[3]];

export default function ClosingBand() {
  return (
    <section aria-labelledby="cta-title" className="order-12 relative overflow-hidden bg-primary-deep">
      {/* -inset-2 so the reveal's 8px rise never exposes the band edge. */}
      <Reveal className="absolute -inset-2">
        <Photo img={photos.ctaClosing} sizes="100vw" className="h-full w-full" scrim="dark" zoom={false} tint={false} />
      </Reveal>

      <div className="relative mx-auto max-w-site px-5 md:px-8 lg:px-10 py-20 md:py-24 lg:py-28 text-on-primary">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:items-center">
          <Reveal group delay={0.12}>
            <RevealItem>
              <h2 id="cta-title" className="font-display text-3xl lg:text-display font-semibold leading-[1.05] max-w-[16ch]">¿Listo para liberar espacio?</h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-5 text-lg text-on-primary/90 max-w-[46ch]">Cuéntanos qué necesitas guardar y en qué zona. Te enviamos la sede y el tamaño que mejor se ajustan, el mismo día.</p>
            </RevealItem>
            <RevealItem className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button href={QUOTE_URL}>Cotizar ahora</Button>
              <Button href={CALC_URL} variant="ghost">Calcular mi espacio</Button>
            </RevealItem>
          </Reveal>

          <Reveal delay={0.2} className="rounded-xl bg-on-primary/[0.07] ring-1 ring-on-primary/15 backdrop-blur-sm p-1.5">
            <div className="rounded-xl-inner bg-on-primary/[0.04] p-6 md:p-8">
              <ul className="grid grid-cols-3 gap-4 pb-6 border-b border-on-primary/15" role="list">
                {figures.map((f) => (
                  <li key={f.label}>
                    <p className="tnum font-display text-2xl md:text-3xl font-semibold text-accent">
                      {f.value}
                      {f.suffix}
                    </p>
                    <p className="mt-1 text-[13px] text-on-primary/75 leading-snug">{f.label}</p>
                  </li>
                ))}
              </ul>

              <dl className="mt-6 flex flex-col gap-4 text-[14px]">
                <div className="flex items-start gap-3">
                  <MapPin size={20} weight="light" aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <dt className="text-on-primary/65">Cobertura</dt>
                    <dd className="font-medium">Norte, noroccidente, centro y Sabana Norte</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={20} weight="light" aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <dt className="text-on-primary/65">Horario de atención</dt>
                    <dd className="font-medium tnum">{company.hours}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={20} weight="light" aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <dt className="text-on-primary/65">¿Prefieres hablar?</dt>
                    <dd>
                      <a
                        href={`tel:${company.phone.replace(/\s/g, "")}`}
                        className="link-underline tap-pad inline-block font-medium tnum text-accent hover:text-accent-soft transition-colors duration-fast ease-premium rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary-deep"
                      >
                        PBX {company.phoneLabel}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
