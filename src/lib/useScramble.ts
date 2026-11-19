"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getMotion } from "./motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/<>_";

/**
 * Efecto "decode": recorre caracteres aleatorios y resuelve la cadena real de
 * izquierda a derecha. Devuelve el texto animado (o null si está en reposo);
 * el texto real siempre permanece en el DOM para lectores de pantalla.
 */
export function useScramble(text: string, duration = 700) {
  const [overlay, setOverlay] = useState<string | null>(null);
  const raf = useRef(0);

  const run = useCallback(() => {
    if (getMotion() === "off") return;
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    let last = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      if (p >= 1) {
        setOverlay(null);
        return;
      }
      if (now - last >= 40) {
        last = now;
        const resolved = Math.floor(p * text.length);
        let out = "";
        for (let i = 0; i < text.length; i++) {
          const c = text[i];
          out += i < resolved || c === " " ? c : CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        setOverlay(out);
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [text, duration]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return { overlay, run };
}
