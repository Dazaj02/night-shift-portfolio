/**
 * Estado de movimiento global (atributo data-motion en <html>):
 *  - "on":   efectos completos (por defecto).
 *  - "soft": efectos atenuados; se usa cuando el sistema pide reducir movimiento.
 *  - "off":  todo detenido (botón de pausa); se guarda en localStorage.
 */
export type Motion = "on" | "soft" | "off";

export const MOTION_KEY = "motion";

/** Script inline que fija data-motion antes del primer pintado. */
export const MOTION_INIT_SCRIPT = `(function(){var d=document.documentElement,m="on",t="dark";try{if(localStorage.getItem("${MOTION_KEY}")==="off"){m="off"}else if(matchMedia("(prefers-reduced-motion: reduce)").matches){m="soft"}}catch(e){}try{var s=localStorage.getItem("theme");if(s==="light"||s==="dark"){t=s}else if(matchMedia("(prefers-color-scheme: light)").matches){t="light"}}catch(e){}try{if(sessionStorage.getItem("lang-nav")==="1"){sessionStorage.removeItem("lang-nav");d.setAttribute("data-nav","lang")}}catch(e){}d.setAttribute("data-motion",m);d.setAttribute("data-theme",t)})()`;

/** Cambio de idioma en curso (la nueva página no debe disparar ningún efecto de entrada). */
export function isLangNav(): boolean {
  return document.documentElement.dataset.nav === "lang";
}

/** Marca el cambio de idioma para la página siguiente (lo lee el script inline). */
export function markLangNav() {
  try {
    sessionStorage.setItem("lang-nav", "1");
  } catch {
    /* sin sessionStorage */
  }
}

export function getMotion(): Motion {
  const v = document.documentElement.dataset.motion;
  return v === "off" || v === "soft" ? v : "on";
}

function defaultMotion(): "on" | "soft" {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "soft" : "on";
}

export function setMotionPaused(paused: boolean) {
  try {
    localStorage.setItem(MOTION_KEY, paused ? "off" : "on");
  } catch {
    /* almacenamiento no disponible */
  }
  document.documentElement.dataset.motion = paused ? "off" : defaultMotion();
}

export function subscribeMotion(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-motion"],
  });
  return () => mo.disconnect();
}

/**
 * Reaplica motion/theme/nav sobre <html>. React reinicia los atributos de <html> cuando el
 * layout raíz se vuelve a montar (p. ej. al cambiar de idioma con navegación suave), y el
 * script inline no se vuelve a ejecutar; esto replica su lógica. Idempotente.
 */
export function restoreDocState() {
  const d = document.documentElement;
  let m: Motion = "on";
  let t = "dark";
  try {
    if (localStorage.getItem(MOTION_KEY) === "off") m = "off";
    else if (matchMedia("(prefers-reduced-motion: reduce)").matches) m = "soft";
  } catch {
    /* sin almacenamiento */
  }
  try {
    const s = localStorage.getItem("theme");
    if (s === "light" || s === "dark") t = s;
    else if (matchMedia("(prefers-color-scheme: light)").matches) t = "light";
  } catch {
    /* sin almacenamiento */
  }
  d.setAttribute("data-motion", m);
  d.setAttribute("data-theme", t);
  try {
    if (sessionStorage.getItem("lang-nav") === "1") {
      sessionStorage.removeItem("lang-nav");
      d.setAttribute("data-nav", "lang");
    }
  } catch {
    /* sin sessionStorage */
  }
  if (d.hasAttribute("data-nav")) window.setTimeout(() => d.removeAttribute("data-nav"), 1500);
}
