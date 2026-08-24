"use client";
import { useRef, type ReactNode } from "react";

/** Horizontal snap row with desktop drag-to-scroll. Drag writes `scrollLeft` on the
 *  DOM node directly (no state, no rAF); touch and keyboard use native scrolling. */
export default function ScrollRow({ children, className = "", label }: { children: ReactNode; className?: string; label?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const drag = useRef({ x: 0, left: 0, active: false, moved: 0 });

  const stop = () => {
    drag.current.active = false;
    ref.current?.classList.add("snap-x");
  };

  return (
    <ul
      ref={ref}
      role="list"
      aria-label={label}
      className={`flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto pb-2 active:cursor-grabbing md:gap-5 ${className}`}
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        drag.current = { x: e.clientX, left: ref.current.scrollLeft, active: true, moved: 0 };
      }}
      onPointerMove={(e) => {
        if (!drag.current.active || !ref.current) return;
        const dx = e.clientX - drag.current.x;
        drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
        if (drag.current.moved > 4) {
          ref.current.classList.remove("snap-x");
          ref.current.scrollLeft = drag.current.left - dx;
        }
      }}
      onPointerUp={stop}
      onPointerLeave={stop}
      onClickCapture={(e) => {
        // A deliberate drag should not also fire the card's link.
        if (drag.current.moved > 8) {
          e.preventDefault();
          e.stopPropagation();
          drag.current.moved = 0;
        }
      }}
    >
      {children}
    </ul>
  );
}
