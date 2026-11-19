"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
  panel: ReactNode;
}

/** Pestañas accesibles (patrón ARIA tabs): ← →, Home y End. */
export function ExperienceTabs({ tabs, label }: { tabs: Tab[]; label: string }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(i: number) {
    const n = tabs.length;
    const next = (i + n) % n;
    setActive(next);
    refs.current[next]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      select(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      select(active - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      select(0);
    } else if (e.key === "End") {
      e.preventDefault();
      select(tabs.length - 1);
    }
  }

  return (
    <div>
      <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className="flex border-b border-line">
        {tabs.map((tab, i) => {
          const selected = i === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`relative min-h-12 px-5 font-display text-lg font-bold uppercase tracking-[0.08em] transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-[-1px] after:h-[3px] after:bg-accent after:transition-transform after:duration-300 after:ease-out-expo ${selected ? "text-accent after:scale-x-100" : "text-ink-dim after:scale-x-0 hover:text-ink"}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          tabIndex={0}
          hidden={i !== active}
          className="pt-10 outline-offset-8"
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}
