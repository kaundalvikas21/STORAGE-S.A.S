"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "@phosphor-icons/react/dist/ssr";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { BLUR, showcase as shots } from "@/content/images";

const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

/** Auto-cycling (4s) mini-showcase for the Bodegaje featured cell. Controls are real buttons:
 *  one dot per image (jumps to it and restarts the 4s timer) and pause/play. Pauses on
 *  hover/focus too. Sits above SiloDoors' stretched card link (`relative z-10`), so using the
 *  controls never navigates. The page's single parallax element: the stack drifts ≤6% in the
 *  frame. Reduced motion: no autoplay, no parallax, no pause button; the dots still switch images. */
export default function ShowcaseCycler() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  // `i` in the deps restarts the timer after a manual dot pick, so the chosen image gets a full 4s.
  useEffect(() => {
    if (reduce || stopped || hovered) return;
    const t = setInterval(() => setI((v) => (v + 1) % shots.length), 4000);
    return () => clearInterval(t);
  }, [reduce, stopped, hovered, i]);

  return (
    <div
      ref={ref}
      className="relative z-10 mt-5 aspect-[2/1] overflow-hidden rounded-md border border-line"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <motion.div style={reduce ? undefined : { y }} className={`absolute inset-0 ${reduce ? "" : "scale-[1.13]"}`}>
        {shots.map((s, idx) => (
          <Image
            key={s.src}
            src={s.src}
            alt={idx === i ? s.alt : ""}
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            placeholder="blur"
            blurDataURL={BLUR}
            className={`object-cover transition-opacity duration-slow ease-soft ${idx === i ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </motion.div>
      <span aria-hidden className="absolute inset-0 bg-primary-soft/25 mix-blend-multiply" />

      {/* Dots: 44px tap targets around a small visual pill; the active one widens in the logo yellow. */}
      <div role="group" aria-label="Imágenes de la galería" className="absolute bottom-1 left-1 flex rounded-md bg-bg/60 backdrop-blur-sm">
        {shots.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setI(idx)}
            aria-label={`Ver imagen ${idx + 1} de ${shots.length}`}
            aria-current={idx === i ? "true" : undefined}
            className={`group/dot flex h-11 w-8 cursor-pointer items-center justify-center rounded-md ${ring}`}
          >
            <span
              className={`block h-2 rounded-full transition-[width,background-color] duration ease-soft ${
                idx === i ? "w-5 bg-brand" : "w-2 bg-ink/50 group-hover/dot:bg-ink"
              }`}
            />
          </button>
        ))}
      </div>

      {!reduce && (
        <button
          type="button"
          onClick={() => setStopped((v) => !v)}
          aria-label={stopped ? "Reanudar la galería de bodegas" : "Pausar la galería de bodegas"}
          aria-pressed={stopped}
          className={`absolute bottom-3 right-3 flex h-11 w-11 cursor-pointer items-center justify-center rounded-md bg-bg/80 text-ink transition-colors duration-fast ease-soft hover:bg-bg ${ring}`}
        >
          {stopped ? <Play size={18} aria-hidden /> : <Pause size={18} aria-hidden />}
        </button>
      )}
    </div>
  );
}
