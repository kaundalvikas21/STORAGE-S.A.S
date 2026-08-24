"use client";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import IsoUnit from "@/components/sections/IsoUnit";
import { CALC_URL, visualizer } from "@/content/site";
import { profileFor, setM3, useM3 } from "@/lib/calc-store";

/**
 * Interactive moment 1: live m³ visualizer. SSR renders the 9 m³ default state
 * (static labeled illustration + native slider), so no-JS and reduced-motion get
 * a complete fallback; the "Calcular con precisión" link is a contextual deep
 * link with state pre-filled (MASTER.md §8.5), not a third CTA.
 */
export default function HeroVisualizer() {
  const m3 = useM3();
  const p = profileFor(m3);
  return (
    <div className="rounded-xl border border-line bg-surface p-6 shadow-2 md:p-7">
      <p className="font-display text-lg font-semibold text-ink">{visualizer.title}</p>
      <IsoUnit m3={m3} />
      <label htmlFor="m3-slider" className="mt-3 block text-sm text-muted">
        {visualizer.sliderLabel}
      </label>
      <input
        id="m3-slider"
        type="range"
        min={1}
        max={50}
        step={1}
        value={m3}
        onChange={(e) => setM3(e.target.valueAsNumber)}
        aria-valuetext={`Aproximadamente ${m3} metros cúbicos, ${p.sizeLabel}`}
        className="accent-primary mt-2 h-11 w-full cursor-pointer"
      />
      <p className="tnum mt-2 text-lg font-medium text-ink" aria-live="polite">
        ≈ {m3} m³ → {p.sizeLabel}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-muted">{p.answer}.</p>
      <Link
        href={`${CALC_URL}?m3=${m3}&perfil=${p.id}`}
        className="group mt-4 inline-flex min-h-[44px] items-center gap-1.5 rounded-sm text-sm font-medium text-primary hover:text-primary-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {visualizer.cta}
        <ArrowRight size={16} aria-hidden className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
