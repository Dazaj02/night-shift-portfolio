"use client";

import { useEffect } from "react";
import { isLangNav } from "@/lib/motion";
import { ARRIVE_EVENT } from "@/lib/sections";
import { useScramble } from "@/lib/useScramble";

/** h1 del nombre: decode al cargar + glitch ambiental fuerte (CSS). */
export function HeroTitle({ id, text }: { id: string; text: string }) {
  const { overlay, run } = useScramble(text, 800);

  useEffect(() => {
    // Al cambiar de idioma no se dispara el decode.
    if (!isLangNav()) run();
    // Volver a "Inicio" desde el menú: el nombre se decodifica al llegar.
    const onArrive = (e: Event) => {
      if ((e as CustomEvent<string>).detail === "inicio") run();
    };
    window.addEventListener(ARRIVE_EVENT, onArrive);
    return () => window.removeEventListener(ARRIVE_EVENT, onArrive);
  }, [run]);

  return (
    <h1
      id={id}
      data-text={text.toUpperCase()}
      className="glitch glitch-ambient whitespace-nowrap font-display text-[clamp(3rem,11vw,6rem)] font-bold uppercase leading-[0.95] tracking-[0.01em] text-ink"
    >
      <span className="relative inline-block">
        <span className={overlay !== null ? "opacity-0" : undefined}>{text}</span>
        {overlay !== null && (
          <span aria-hidden="true" className="absolute left-0 top-0">
            {overlay}
          </span>
        )}
      </span>
    </h1>
  );
}
