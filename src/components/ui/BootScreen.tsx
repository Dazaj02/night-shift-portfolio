"use client";

import { useEffect, useState } from "react";
import { getMotion, isLangNav } from "@/lib/motion";

const KEY = "boot-seen";
const LINES = [
  "> init night_shift.sys ... OK",
  "> mount /portfolio/da ... OK",
  "> link api.spring ... OK",
  "> render hud ... READY",
];

/** Arranque de ≤1 s solo en la primera visita absoluta (localStorage). Nunca al cambiar de idioma. */
export function BootScreen() {
  const [phase, setPhase] = useState<"idle" | "show" | "out">("idle");

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(KEY) === "1";
      localStorage.setItem(KEY, "1");
    } catch {
      /* sin localStorage: no se muestra para no repetirlo en cada carga */
      seen = true;
    }
    if (seen || isLangNav() || getMotion() === "off") return;

    const timers: number[] = [];
    let ended = false;
    const skip = () => finish();
    function cleanup() {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    }
    function finish() {
      if (ended) return;
      ended = true;
      timers.forEach(window.clearTimeout);
      cleanup();
      setPhase("out");
      timers.push(window.setTimeout(() => setPhase("idle"), 250));
    }
    timers.push(window.setTimeout(() => setPhase("show"), 0), window.setTimeout(finish, 950));
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      ended = true;
      timers.forEach(window.clearTimeout);
      cleanup();
    };
  }, []);

  if (phase === "idle") return null;
  return (
    <div className={`boot ${phase === "out" ? "boot--out" : ""}`} aria-hidden="true">
      <ul className="space-y-2">
        {LINES.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  );
}
