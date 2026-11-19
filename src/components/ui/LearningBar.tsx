"use client";

import { useEffect, useRef, useState } from "react";
import { getMotion } from "@/lib/motion";

interface LearningBarProps {
  value: number;
  label: string;
}

const CELLS = 10;

/** Barra segmentada de 10 celdas; se "carga" al entrar al viewport (on/soft). */
export function LearningBar({ value, label }: LearningBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "armed" | "loaded">("idle");
  const filled = Math.round((value / 100) * CELLS);

  useEffect(() => {
    const el = ref.current;
    if (!el || getMotion() === "off") return;
    const t = window.setTimeout(() => setState("armed"), 0);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("loaded");
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, []);

  return (
    <div className="flex items-center gap-4">
      <div
        ref={ref}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        className={`seg-bar flex gap-1 ${state !== "idle" ? "is-armed" : ""} ${state === "loaded" ? "is-loaded" : ""}`}
      >
        {Array.from({ length: CELLS }, (_, i) => (
          <span
            key={i}
            data-on={i < filled}
            style={{ "--i": i } as React.CSSProperties}
            className="seg h-3.5 w-3 sm:w-4"
          />
        ))}
      </div>
      <span aria-hidden="true" className="font-mono text-sm tabular-nums text-ink-dim">
        {value}%
      </span>
    </div>
  );
}
