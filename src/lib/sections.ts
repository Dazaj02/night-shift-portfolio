import type { SectionId } from "@/types/portfolio";
import { startGlitch } from "./fx";
import { getMotion } from "./motion";

/** Evento que anuncia que el scroll a una sección terminó (el título hace su scramble). */
export const ARRIVE_EVENT = "section-arrive";

let navTarget: string | null = null;
let navUntil = 0;

/** Sección a la que se está desplazando por una acción explícita (hasta que llega). */
export function activeNavTarget(): string | null {
  return performance.now() < navUntil ? navTarget : null;
}

/**
 * Salta a una sección. Acción explícita del usuario: con efectos activos la pantalla se
 * glitchea (~460 ms) y el salto ocurre EN SECO bajo las bandas, sin scroll suave (un scroll
 * suave dejaba pasar secciones aún ocultas y la pantalla parecía apagarse). Al terminar, el
 * título de la sección destino hace su scramble. Con data-motion="off" el salto es instantáneo.
 */
export function goToSection(id: SectionId): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  const jump = () => {
    el.scrollIntoView({ behavior: "auto", block: "start" });
    try {
      history.replaceState(null, "", `#${id}`);
    } catch {
      /* sin historial disponible */
    }
    el.focus({ preventScroll: true });
  };
  if (getMotion() === "off") {
    jump();
    return true;
  }
  navTarget = id;
  navUntil = performance.now() + 2500;
  const started = startGlitch("nav", {
    fromColor: getComputedStyle(document.documentElement).getPropertyValue("--c-void").trim() || "#0a0a0c",
    onPeak: jump,
  });
  if (!started) jump();
  window.setTimeout(() => {
    navUntil = 0;
    window.dispatchEvent(new CustomEvent(ARRIVE_EVENT, { detail: id }));
  }, started ? 480 : 60);
  return true;
}
