"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale, SectionId } from "@/types/portfolio";
import { SectionLink } from "@/components/ui/SectionLink";
import { openGate } from "@/lib/gate";
import { Icon } from "@/components/ui/Icon";
import { cutButtonClass } from "@/components/ui/CutButton";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitch } from "./LanguageSwitch";

interface SiteHeaderProps {
  handle: string;
  links: { id: SectionId; label: string }[];
  cv: { label: string; href: string };
  navLabel: string;
  openMenu: string;
  closeMenu: string;
  language: { target: Locale; name: string; label: string };
  motion: { label: string; pause: string; play: string };
  theme: { label: string; toLight: string; toDark: string };
}

const FOCUSABLE = "a[href], button:not([disabled])";

export function SiteHeader({
  handle,
  links,
  cv,
  navLabel,
  openMenu,
  closeMenu,
  language,
  motion,
  theme,
}: SiteHeaderProps) {
  const [active, setActive] = useState<SectionId>("inicio");
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Sección activa
  useEffect(() => {
    const els = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [links]);

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    document.body.style.overflow = "";
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Menú móvil: Esc, foco atrapado, bloqueo de scroll
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        close(true);
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = [
        toggleRef.current,
        ...(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []),
      ].filter((n): n is HTMLElement => n !== null);
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const current = document.activeElement;
      if (e.shiftKey && current === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && current === last) {
        e.preventDefault();
        first.focus();
      }
    }
    const mq = window.matchMedia("(min-width: 1280px)");
    function onChange() {
      if (mq.matches) close(false);
    }
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const linkBase =
    "relative flex items-center whitespace-nowrap px-2.5 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.06em] text-ink-dim transition-colors duration-200 hover:text-ink aria-[current=location]:text-ink aria-[current=location]:bg-(--nav-active-bg) aria-[current=location]:text-(--nav-active-ink) after:absolute after:inset-x-2.5 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 after:ease-out-expo aria-[current=location]:after:scale-x-100";

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-14 border-b border-line bg-void">
      <div className="wrap flex h-full items-stretch justify-between gap-4">
        <a
          href="#inicio"
          className="flex items-center font-display text-lg font-bold tracking-[0.12em] text-ink"
          onClick={(e) => {
            // El logo vuelve a la pantalla de entrada (la nube de puntos).
            e.preventDefault();
            if (open) close(false);
            window.scrollTo(0, 0);
            openGate();
          }}
        >
          {handle.split(".").map((part, i) => (
            <span key={i}>
              {i > 0 && <span className="text-accent">.</span>}
              {part}
            </span>
          ))}
        </a>

        <nav aria-label={navLabel} className="hidden items-stretch xl:flex">
          <ul className="flex items-stretch">
            {links.map((l) => (
              <li key={l.id} className="flex">
                <SectionLink
                  sectionId={l.id}
                  className={linkBase}
                  aria-current={active === l.id ? "location" : undefined}
                >
                  {l.label}
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <LanguageSwitch
            targetLang={language.target}
            targetName={language.name}
            label={language.label}
            hash={active}
          />
          <ThemeToggle toLight={theme.toLight} toDark={theme.toDark} />
          <MotionToggle {...motion} />
          <a href={cv.href} download className={cutButtonClass("primary", "sm")}>
            <span>{cv.label}</span>
            <Icon name="download" size={16} />
          </a>
        </div>

        <ThemeToggle toLight={theme.toLight} toDark={theme.toDark} className="self-center xl:hidden" />
        <MotionToggle {...motion} className="-mr-1 self-center xl:hidden" />
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? closeMenu : openMenu}
          onClick={() => (open ? close(false) : setOpen(true))}
          className="-mr-2 flex size-11 items-center justify-center self-center text-ink xl:hidden"
        >
          <Icon name={open ? "close" : "menu"} size={24} />
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={navLabel}
        hidden={!open}
        className="fixed inset-0 top-14 overflow-y-auto bg-void xl:hidden"
      >
        <div className="wrap flex min-h-full flex-col gap-8 py-8">
          <nav aria-label={navLabel}>
            <ul className="border-t border-line">
              {links.map((l) => (
                <li key={l.id} className="border-b border-line">
                  <SectionLink
                    sectionId={l.id}
                    onClick={() => close(false)}
                    aria-current={active === l.id ? "location" : undefined}
                    className="flex min-h-14 items-center justify-between font-display text-2xl font-bold uppercase tracking-[0.04em] text-ink aria-[current=location]:text-accent"
                  >
                    <span>{l.label}</span>
                    <Icon name="arrow" size={20} className="text-ink-faint" />
                  </SectionLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto flex flex-col items-start gap-4">
            <a href={cv.href} download className={cutButtonClass("primary")} onClick={() => close(false)}>
              <span>{cv.label}</span>
              <Icon name="download" size={18} />
            </a>
            <LanguageSwitch
              targetLang={language.target}
              targetName={language.name}
              label={language.label}
              hash={active}
              onNavigate={() => close(false)}
              className="-ml-2"
            />
            <ThemeToggle toLight={theme.toLight} toDark={theme.toDark} showText className="-ml-2 px-2" />
            <MotionToggle {...motion} showText className="-ml-2 px-2" />
          </div>
        </div>
      </div>
    </header>
  );
}
