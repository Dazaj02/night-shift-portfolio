"use client";

import { useSyncExternalStore } from "react";
import { getTheme, subscribeTheme, toggleTheme, type Theme } from "@/lib/theme";
import { Icon } from "./Icon";

interface ThemeToggleProps {
  toLight: string;
  toDark: string;
  /** Muestra el texto junto al icono (menú móvil). */
  showText?: boolean;
  className?: string;
}

/** Botón de tema: el icono y la etiqueta indican el modo AL QUE cambia. */
export function ThemeToggle({ toLight, toDark, showText = false, className = "" }: ThemeToggleProps) {
  const theme = useSyncExternalStore<Theme>(subscribeTheme, getTheme, () => "dark");
  const toLightNext = theme === "dark";
  const text = toLightNext ? toLight : toDark;

  return (
    <button
      type="button"
      aria-label={text}
      title={text}
      onClick={toggleTheme}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-2 text-ink-dim transition-colors duration-200 hover:text-ink ${className}`}
    >
      <Icon name={toLightNext ? "sun" : "moon"} size={18} />
      {showText && (
        <span className="font-display text-[0.8125rem] font-semibold uppercase tracking-[0.08em]">
          {text}
        </span>
      )}
    </button>
  );
}
