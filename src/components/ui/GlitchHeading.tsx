"use client";

import { useEffect, useRef } from "react";
import { claimTitle } from "@/lib/fx";
import { getMotion, isLangNav } from "@/lib/motion";
import { activeNavTarget, ARRIVE_EVENT } from "@/lib/sections";
import { useScramble } from "@/lib/useScramble";

interface GlitchHeadingProps {
  id: string;
  text: string;
  className?: string;
}

/**
 * Título de sección. El texto real siempre está en el DOM; la primera vez que entra al
 * viewport en cada carga se decodifica y se rearma con cortes + RGB (una sola vez).
 * Si la página viene de un cambio de idioma, los títulos ya visibles al cargar no se animan.
 */
export function GlitchHeading({ id, text, className = "" }: GlitchHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { overlay, run } = useScramble(text);
  const done = useRef(false);

  const sectionId = id.replace(/-title$/, "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const play = () => {
      window.setTimeout(() => {
        el.classList.add("is-glitching");
        window.setTimeout(() => el.classList.remove("is-glitching"), 560);
        run();
      }, claimTitle(600));
    };

    // Primera entrada al viewport (una vez por carga). Durante un salto explícito a otra
    // sección los títulos intermedios no se animan: solo el destino, al llegar.
    let io: IntersectionObserver | null = null;
    if (!done.current) {
      io = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          const target = activeNavTarget();
          if (target !== null && target !== sectionId) return;
          io?.disconnect();
          done.current = true;
          if (getMotion() === "off" || isLangNav() || target !== null) return;
          play();
        },
        { threshold: 0.4 },
      );
      io.observe(el);
    }

    // Llegada por menú/nav: el título destino hace su scramble (acción explícita del usuario).
    const onArrive = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== sectionId || getMotion() === "off") return;
      done.current = true;
      io?.disconnect();
      play();
    };
    window.addEventListener(ARRIVE_EVENT, onArrive);
    return () => {
      io?.disconnect();
      window.removeEventListener(ARRIVE_EVENT, onArrive);
    };
  }, [run, sectionId]);

  return (
    <h2
      ref={ref}
      id={id}
      data-text={text}
      className={`glitch font-display text-[clamp(2rem,6vw,3.5rem)] font-bold uppercase leading-[1.05] tracking-[0.02em] text-ink ${className}`}
    >
      <span className="relative inline-block">
        <span className={overlay !== null ? "opacity-0" : undefined}>{text}</span>
        {overlay !== null && (
          <span aria-hidden="true" className="absolute left-0 top-0 whitespace-nowrap">
            {overlay}
          </span>
        )}
      </span>
    </h2>
  );
}
