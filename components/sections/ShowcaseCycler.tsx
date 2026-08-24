"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Pause, Play } from "@phosphor-icons/react/dist/ssr";
import { useReducedMotion } from "framer-motion";

// Placeholder shots (public/img gradients) until real unit photos arrive.
const shots = [
  { src: "/img/bodegaje-pasillo.svg", alt: "Pasillo de minibodegas con puertas numeradas e iluminación uniforme" },
  { src: "/img/cierre-pasillo.svg", alt: "Minibodega abierta con cajas organizadas y candado propio" },
  { src: "/img/hero-familia.svg", alt: "Clientes guardando el trasteo de su casa en una bodega mediana" },
];

/** Auto-cycling (4s), pausable mini-showcase for the Bodegaje featured cell.
 *  Pauses on hover/focus and via the button; static first image under reduced motion. */
export default function ShowcaseCycler() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (reduce || stopped || hovered) return;
    const t = setInterval(() => setI((v) => (v + 1) % shots.length), 4000);
    return () => clearInterval(t);
  }, [reduce, stopped, hovered]);

  if (reduce) {
    return (
      <div className="relative mt-6 aspect-video overflow-hidden rounded-md border border-line">
        <Image src={shots[0].src} alt={shots[0].alt} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className="relative mt-6 aspect-video overflow-hidden rounded-md border border-line"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {shots.map((s, idx) => (
        <Image
          key={s.src}
          src={s.src}
          alt={idx === i ? s.alt : ""}
          fill
          sizes="(min-width: 768px) 60vw, 100vw"
          className={`object-cover transition-opacity duration-slow ease-soft ${idx === i ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <button
        type="button"
        onClick={() => setStopped((v) => !v)}
        aria-label={stopped ? "Reanudar la galería de bodegas" : "Pausar la galería de bodegas"}
        className="absolute bottom-3 right-3 flex h-11 w-11 cursor-pointer items-center justify-center rounded-md bg-bg/80 text-ink transition-colors duration-fast ease-soft hover:bg-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {stopped ? <Play size={18} aria-hidden /> : <Pause size={18} aria-hidden />}
      </button>
      <span aria-hidden className="absolute bottom-3 left-3 flex gap-1.5">
        {shots.map((_, idx) => (
          <span key={idx} className={`h-1.5 w-1.5 rounded-full transition-colors duration-fast ${idx === i ? "bg-accent" : "bg-bg/60"}`} />
        ))}
      </span>
    </div>
  );
}
