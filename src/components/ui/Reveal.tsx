"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { claimReveal } from "@/lib/fx";
import { getMotion } from "@/lib/motion";
import { activeNavTarget } from "@/lib/sections";

interface RevealProps {
  as?: ElementType;
  /** Posición dentro de su grupo: escalona 70 ms por elemento. */
  index?: number;
  className?: string;
  "aria-labelledby"?: string;
  children: ReactNode;
}

const STEP = 70;

/**
 * Aparición la primera vez que el bloque entra al viewport. Sin JS (o si ya está a la vista al
 * cargar, o con efectos pausados) el contenido se ve tal cual: solo se "arma" si queda bajo el pliegue.
 * Si un título de sección está glitcheando, espera a que termine (lib/fx.ts) para no solapar efectos.
 */
export function Reveal({ as: Tag = "div", index = 0, className = "", children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || getMotion() === "off") return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    el.dataset.rv = "armed";
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        // Salto de sección con glitch: el bloque aparece ya visible, sin animar desde opacidad 0.
        if (activeNavTarget() !== null) {
          el.dataset.rv = "seen";
          return;
        }
        const wait = claimReveal(600 + index * STEP);
        el.style.setProperty("--rv-d", `${wait + index * STEP}ms`);
        el.dataset.rv = "in";
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [index]);

  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
