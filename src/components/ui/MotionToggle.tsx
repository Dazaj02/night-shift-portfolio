"use client";

import { useSyncExternalStore } from "react";
import { getMotion, setMotionPaused, subscribeMotion, type Motion } from "@/lib/motion";
import { Icon } from "./Icon";

interface MotionToggleProps {
  label: string;
  pause: string;
  play: string;
  /** Muestra el texto junto al icono (menú móvil). */
  showText?: boolean;
  className?: string;
}

/** Botón de pausa de los efectos glitch (alterna "off" y el modo por defecto). */
export function MotionToggle({ label, pause, play, showText = false, className = "" }: MotionToggleProps) {
  const motion = useSyncExternalStore<Motion>(subscribeMotion, getMotion, () => "on");
  const active = motion !== "off";
  const text = active ? pause : play;

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={label}
      title={text}
      onClick={() => setMotionPaused(active)}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-2 text-ink-dim transition-colors duration-200 hover:text-ink ${className}`}
    >
      <Icon name={active ? "pause" : "play"} size={18} />
      {showText && (
        <span className="font-display text-[0.8125rem] font-semibold uppercase tracking-[0.08em]">
          {text}
        </span>
      )}
    </button>
  );
}
