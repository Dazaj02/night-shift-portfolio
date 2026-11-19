import { startGlitch } from "./fx";
import { getMotion } from "./motion";

/**
 * Tema de color (atributo data-theme en <html>): "dark" | "light".
 * El script inline de motion.ts lo fija antes del primer pintado
 * (preferencia guardada o prefers-color-scheme).
 */
export type Theme = "dark" | "light";

export const THEME_KEY = "theme";

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function subscribeTheme(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

function apply(theme: Theme) {
  const root = document.documentElement;
  // Sin transiciones de color durante el cambio: un solo restilado en vez de decenas animadas.
  root.dataset.switching = "";
  root.dataset.theme = theme;
  const color = getComputedStyle(root).getPropertyValue("--c-void").trim();
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", color));
  requestAnimationFrame(() => requestAnimationFrame(() => delete root.dataset.switching));
}

/** Color de fondo del tema destino (las bandas del glitch se pintan con él). */
function voidOf(theme: Theme): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(theme === "light" ? "--bg-light" : "--bg-dark");
  return v.trim() || (theme === "light" ? "#f2efe6" : "#0a0a0c");
}

/**
 * Alterna el tema. Con efectos activos la pantalla se rasga en bandas con el color del tema
 * nuevo y desdoblamiento RGB; cuando queda cubierta cambia data-theme y las bandas se apagan
 * en desorden dejando ver el resultado (~1,1 s). Con data-motion="off" el cambio es instantáneo.
 */
export function toggleTheme() {
  const next: Theme = getTheme() === "dark" ? "light" : "dark";
  if (getMotion() === "off") {
    persist(next);
    apply(next);
    return;
  }
  const started = startGlitch("theme", {
    toColor: voidOf(next),
    onPeak: () => apply(next),
  });
  if (started) persist(next);
}

function persist(theme: Theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* almacenamiento no disponible */
  }
}
