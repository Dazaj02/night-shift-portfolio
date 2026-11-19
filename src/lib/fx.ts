/**
 * Coordinador de efectos: mantiene como máximo un efecto visible a la vez durante el scroll.
 * Los títulos (glitch + scramble) esperan a que terminen las apariciones en curso y las
 * apariciones esperan a que termine el título; varias apariciones a la vez cuentan como una.
 */
let titleUntil = 0;
let revealUntil = 0;

/** Devuelve los ms a esperar antes de empezar un título y reserva su duración. */
export function claimTitle(duration: number): number {
  const now = performance.now();
  const start = Math.max(now, titleUntil, revealUntil);
  titleUntil = start + duration + 60;
  return start - now;
}

/** Devuelve los ms a esperar antes de empezar una aparición y reserva su duración. */
export function claimReveal(duration: number): number {
  const now = performance.now();
  const start = Math.max(now, titleUntil);
  revealUntil = Math.max(revealUntil, start + duration + 60);
  return start - now;
}

/* ------------------------------------------------------------------ */
/* Glitch de pantalla: bandas horizontales que "rasgan" la pantalla,    */
/* franjas RGB y desdoblamiento cromático del contenido.                */
/* Los estilos están en globals.css (.fx-glitch, html[data-fx]).        */
/* ------------------------------------------------------------------ */

type Kind = "cyan" | "red" | "inv" | "noise";

function strip(kind: Kind, top: number, height: number, x: number, at: number, w: number, o: number, left = -4, width = 108) {
  const s = document.createElement("span");
  s.className = `fx-s fx-s--${kind}`;
  s.style.cssText = `--t:${top}%;--h:${height}%;--x:${x}px;--at:${at}ms;--w:${w}ms;--o:${o};--l:${left}%;--wd:${width}%`;
  return s;
}

function rng(seed: number) {
  return (n: number) => {
    const v = Math.sin(seed * 97.13 + n * 12.9898) * 43758.5453;
    return v - Math.floor(v);
  };
}

/** Franjas de una ráfaga: par RGB (cian/rojo desfasados), franja invertida y franja de ruido. */
function burst(el: HTMLElement, at: number, w: number, seed: number, strong = 1) {
  const r = rng(seed);
  for (let i = 0; i < 4; i++) {
    const top = 2 + r(i) * 88;
    const h = 3 + r(i + 5) * 9;
    const left = r(i + 7) * 45;
    const width = 30 + r(i + 8) * 40;
    el.appendChild(strip("cyan", top, h, (-16 - r(i + 9) * 16) * strong, at, w, 0.75, left, width));
    el.appendChild(strip("red", top + h * 0.45, h, (16 + r(i + 11) * 16) * strong, at, w, 0.75, left + 8, width));
  }
  el.appendChild(strip("inv", 8 + r(20) * 70, 2 + r(21) * 4, 0, at, w, 0.85, r(22) * 30, 50 + r(23) * 45));
  el.appendChild(strip("noise", 12 + r(30) * 70, 4 + r(31) * 8, 0, at, w, 0.7, 0, 100));
}

interface BandOpts {
  count: number;
  /** Color sólido de las bandas. */
  color: string;
  /** Rango (ms) en que cada banda se enciende y en que se apaga. */
  on: [number, number];
  off: [number, number];
  seed: number;
  /** Ancho mínimo (%) de la banda; 100 = cubre todo el ancho (necesario para tapar el cambio de tema). */
  minWidth?: number;
}

/**
 * Bandas horizontales de la altura de la pantalla (suman 100 %), cada una se enciende y se
 * apaga en un instante propio. Con todas encendidas la pantalla queda cubierta: ahí se
 * cambia el tema o se salta de sección, y al apagarse en orden aleatorio asoma el resultado.
 */
function bands(el: HTMLElement, o: BandOpts) {
  const r = rng(o.seed);
  const weights = Array.from({ length: o.count }, (_, i) => 0.4 + r(i + 40) * 1.6);
  const sum = weights.reduce((a, b) => a + b, 0);
  let top = 0;
  weights.forEach((wt, i) => {
    const h = (wt / sum) * 100;
    const b = document.createElement("span");
    b.className = "fx-band";
    const minW = o.minWidth ?? 100;
    const width = minW + (100 - minW) * r(i + 60);
    const left = r(i + 70) < 0.5 ? 0 : 100 - width;
    const a = o.on[0] + r(i + 80) * (o.on[1] - o.on[0]);
    const z = o.off[0] + r(i + 90) * (o.off[1] - o.off[0]);
    b.style.cssText = `--t:${top}%;--h:${h + 0.5}%;--a:${Math.round(a)}ms;--b:${Math.round(z)}ms;--c:${o.color};--l:${left}%;--wd:${width}%`;
    el.appendChild(b);
    top += h;
  });
}

export type FxKind = "theme" | "nav";

let fxBusyUntil = 0;

interface GlitchOpts {
  /** Color (CSS) del tema destino: las bandas del cambio de tema se pintan con él. */
  toColor?: string;
  /** Color actual de fondo: las bandas del salto de sección tapan el corte con él. */
  fromColor?: string;
  /** Se llama en el momento en que la pantalla está tapada (cambio de tema / salto). */
  onPeak?: () => void;
  onEnd?: () => void;
}

/** Instante (ms) en que la pantalla está tapada y se hace el cambio. */
export const PEAK = { theme: 360, nav: 150 } as const;
const TOTAL = { theme: 1000, nav: 460 } as const;

/**
 * Lanza el overlay glitch. Devuelve false si ya hay uno en curso (límite de seguridad:
 * como máximo ~3 destellos por segundo); en ese caso NO llama a onPeak. `onEnd` al terminar.
 */
export function startGlitch(kind: FxKind, opts: GlitchOpts = {}): boolean {
  const now = performance.now();
  if (now < fxBusyUntil) return false;
  const total = TOTAL[kind];
  fxBusyUntil = now + total + 250;
  const el = document.createElement("div");
  el.className = "fx-glitch";
  el.setAttribute("aria-hidden", "true");
  if (kind === "theme") {
    // Dos ráfagas antes del cambio, bandas que cubren la pantalla con el color nuevo,
    // una ráfaga al descubrir y un barrido de scanline sobre el resultado.
    burst(el, 0, 110, 1);
    burst(el, 200, 110, 2);
    bands(el, { count: 14, color: opts.toColor ?? "#000", on: [30, 250], off: [470, 800], seed: 7 });
    burst(el, 560, 110, 3, 0.8);
    burst(el, 770, 100, 6, 0.6);
    const scan = document.createElement("span");
    scan.className = "fx-scan";
    el.appendChild(scan);
  } else {
    burst(el, 0, 110, 4);
    bands(el, { count: 9, color: opts.fromColor ?? "#000", on: [60, 150], off: [190, 330], seed: 11, minWidth: 55 });
    burst(el, 190, 120, 5, 0.8);
  }
  const root = document.documentElement;
  root.dataset.fx = kind;
  document.body.appendChild(el);
  if (opts.onPeak) window.setTimeout(opts.onPeak, PEAK[kind]);
  window.setTimeout(() => {
    el.remove();
    if (root.dataset.fx === kind) delete root.dataset.fx;
    opts.onEnd?.();
  }, total);
  return true;
}
