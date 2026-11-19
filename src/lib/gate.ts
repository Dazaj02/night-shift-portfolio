/** Clave de sessionStorage: la pantalla de entrada se muestra una vez por sesión del navegador. */
export const GATE_KEY = "gate-seen";

/** Evento para volver a mostrar la pantalla de entrada (p. ej. al pulsar el logo D.AZA). */
export const GATE_EVENT = "gate:open";
export function openGate() {
  window.dispatchEvent(new Event(GATE_EVENT));
}

/**
 * Script inline (se ejecuta después de MOTION_INIT_SCRIPT): marca <html data-gate="1"> antes del
 * primer pintado cuando toca mostrar la pantalla de entrada. Así el contenido nunca se ve un
 * instante antes de que aparezca. No se muestra con el movimiento en pausa ni al cambiar de
 * idioma. Con `?intro` en la URL se fuerza (útil para volver a verla).
 */
export const GATE_INIT_SCRIPT = `(function(){try{var d=document.documentElement;if(d.getAttribute("data-motion")==="off"||d.hasAttribute("data-nav"))return;if(/[?&]intro(=|&|$)/.test(location.search)||!sessionStorage.getItem("${GATE_KEY}"))d.setAttribute("data-gate","1")}catch(e){}})()`;
