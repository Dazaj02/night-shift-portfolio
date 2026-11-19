"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { SectionId } from "@/types/portfolio";
import { SectionLink } from "./SectionLink";
import { Icon } from "./Icon";
import { useScramble } from "@/lib/useScramble";

export interface TitleMenuItem {
  key: string;
  label: string;
  hint: string;
  sectionId?: SectionId;
  href?: string;
  download?: boolean;
}

function ScrambleLabel({ text, active }: { text: string; active: boolean }) {
  const { overlay, run } = useScramble(text, 450);
  useEffect(() => {
    if (active) run();
  }, [active, run]);
  return (
    <span className={`relative inline-block ${active ? "menu-glitch" : ""}`}>
      <span className={overlay !== null ? "opacity-0" : undefined}>{text}</span>
      {overlay !== null && (
        <span aria-hidden="true" className="absolute left-0 top-0 whitespace-nowrap">
          {overlay}
        </span>
      )}
    </span>
  );
}

/** Menú de la pantalla de título: ↑/↓, Home/End y Enter. */
export function TitleMenu({
  ariaLabel,
  items,
}: {
  ariaLabel: string;
  items: TitleMenuItem[];
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);

  // "Presiona Enter" desde la pantalla de título lleva el foco al menú.
  useEffect(() => {
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key !== "Enter" || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = document.activeElement;
      if (el && el !== document.body) return;
      if (window.scrollY > window.innerHeight * 0.6) return;
      e.preventDefault();
      refs.current[active]?.focus();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  function focusItem(i: number) {
    const n = items.length;
    const next = (i + n) % n;
    setActive(next);
    refs.current[next]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLUListElement>) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        focusItem(active + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        focusItem(active - 1);
        break;
      case "Home":
        e.preventDefault();
        focusItem(0);
        break;
      case "End":
        e.preventDefault();
        focusItem(items.length - 1);
        break;
    }
  }

  const itemClass =
    "frame group flex min-h-[3.25rem] items-center gap-3 px-4 py-2.5 font-display text-lg font-semibold uppercase tracking-[0.06em] text-ink no-underline [--cut:14px] [--frame-line:transparent] [--frame-fill:transparent] data-[active=true]:text-volt-ink data-[active=true]:[--frame-fill:var(--color-volt)] data-[active=true]:[--frame-line:var(--color-volt)] sm:text-xl lg:text-[1.0625rem]";

  return (
    <div>
      <nav aria-label={ariaLabel}>
        <ul
          onKeyDown={onKeyDown}
          style={{ "--rows": Math.ceil(items.length / 2) } as React.CSSProperties}
          className="border-t border-line lg:grid lg:grid-flow-col lg:[grid-template-rows:repeat(var(--rows),auto)] lg:gap-x-8"
        >
          {items.map((item, i) => {
            const isActive = i === active;
            const common = {
              ref: (el: HTMLAnchorElement | null) => {
                refs.current[i] = el;
              },
              tabIndex: isActive ? 0 : -1,
              "data-active": isActive,
              onFocus: () => setActive(i),
              onMouseEnter: () => setActive(i),
              className: itemClass,
            };
            const inner = (
              <>
                <svg
                  viewBox="0 0 14 16"
                  width="14"
                  height="16"
                  aria-hidden="true"
                  className={`shrink-0 fill-current transition-opacity duration-150 ${isActive ? "opacity-100" : "opacity-0"}`}
                >
                  <path d="M1 1l12 7-12 7z" />
                </svg>
                <ScrambleLabel text={item.label} active={isActive} />
                {item.download && <Icon name="download" size={18} className="ml-auto" />}
              </>
            );
            return (
              <li key={item.key} className="border-b border-line">
                {item.sectionId ? (
                  <SectionLink sectionId={item.sectionId} {...common}>
                    {inner}
                  </SectionLink>
                ) : (
                  <a href={item.href} download={item.download ? "" : undefined} {...common}>
                    {inner}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      <p
        aria-live="polite"
        className="mt-4 min-h-[3rem] max-w-[52ch] text-[0.9375rem] leading-snug text-ink-dim"
      >
        {items[active]?.hint}
      </p>
    </div>
  );
}
