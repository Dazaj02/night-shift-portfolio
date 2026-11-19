"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";

export interface TechCell {
  id: string;
  name: string;
  desc: string;
  /** Proyectos donde se usó (ya traducidos); vacío = sin proyecto asociado. */
  usedIn: string[];
}

export interface TechRow {
  id: string;
  label: string;
  cells: TechCell[];
}

interface TechTableProps {
  rows: TechRow[];
  labels: { usedIn: string; noProject: string; table: string };
}

interface Active {
  cell: TechCell;
  rect: DOMRect;
}

/**
 * Tabla de tecnologías: una fila por categoría, una casilla por tecnología. Al pasar el
 * cursor, enfocar con teclado o tocar, aparece un panel con el nombre y la descripción,
 * que entra con un glitch corto (clip-path + desdoblamiento RGB). Esc lo cierra.
 */
export function TechTable({ rows, labels }: TechTableProps) {
  const uid = useId();
  const tipRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Active | null>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  const show = useCallback((cell: TechCell, el: HTMLElement) => {
    setPos(null);
    setActive({ cell, rect: el.getBoundingClientRect() });
  }, []);
  const hide = useCallback(() => setActive(null), []);

  // Coloca el panel sobre la casilla (o debajo si no cabe) y lo mantiene dentro de la ventana.
  useLayoutEffect(() => {
    if (!active || !tipRef.current) return;
    const tip = tipRef.current.getBoundingClientRect();
    const { rect } = active;
    const m = 8;
    let left = rect.left + rect.width / 2 - tip.width / 2;
    left = Math.max(m, Math.min(left, window.innerWidth - tip.width - m));
    let top = rect.top - tip.height - 10;
    if (top < m) top = rect.bottom + 10;
    setPos({ left, top });
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && hide();
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", hide, { passive: true });
    window.addEventListener("resize", hide);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", hide);
      window.removeEventListener("resize", hide);
    };
  }, [active, hide]);

  const tipId = `${uid}-tip`;

  return (
    <>
      <div role="group" aria-label={labels.table} className="border-y border-line">
        {rows.map((row) => (
          <div
            key={row.id}
            className="grid gap-3 border-b border-line py-5 last:border-b-0 sm:grid-cols-[10rem_1fr] sm:gap-6"
          >
            <h3 className="pt-2 font-display text-[0.9375rem] font-semibold uppercase tracking-[0.06em] text-cyan">
              {row.label}
            </h3>
            <ul className="flex flex-wrap pl-px pt-px">
              {row.cells.map((c) => {
                const on = active?.cell.id === c.id;
                return (
                  <li key={c.id} className="-ml-px -mt-px flex basis-[8.25rem] grow">
                    <button
                      type="button"
                      className="tech-cell"
                      data-active={on || undefined}
                      aria-describedby={on ? tipId : undefined}
                      onPointerEnter={(e) => e.pointerType === "mouse" && show(c, e.currentTarget)}
                      onPointerLeave={(e) => e.pointerType === "mouse" && hide()}
                      onFocus={(e) => show(c, e.currentTarget)}
                      onBlur={hide}
                      onClick={(e) => (on ? hide() : show(c, e.currentTarget))}
                    >
                      <span className="tech-name">{c.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {active && (
        <div
          ref={tipRef}
          id={tipId}
          role="tooltip"
          key={active.cell.id}
          className="tech-tip frame"
          style={{ left: pos?.left ?? 0, top: pos?.top ?? 0, visibility: pos ? "visible" : "hidden" }}
        >
          <p className="font-display text-lg font-bold uppercase leading-tight tracking-[0.03em] text-ink">
            {active.cell.name}
          </p>
          <p className="mt-1.5 text-[0.9375rem] leading-snug text-ink-dim">{active.cell.desc}</p>
          <p className="mt-3 font-mono text-[0.75rem] leading-snug text-ink-faint">
            <span className="text-cyan">{labels.usedIn}</span>{" "}
            {active.cell.usedIn.length ? active.cell.usedIn.join(" · ") : labels.noProject}
          </p>
        </div>
      )}
    </>
  );
}
