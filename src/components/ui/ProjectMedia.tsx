"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Image from "next/image";
import { Icon } from "./Icon";

export interface Shot {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  placeholder: boolean;
}

interface ProjectMediaProps {
  title: string;
  shots: Shot[];
  labels: {
    capturesCount: string;
    openGallery: string;
    dialogLabel: string;
    close: string;
    next: string;
    prev: string;
    counter: string;
    photoPlaceholder: string;
  };
  /** Rellena el letterbox con una copia desenfocada de la portada. */
  backdropSrc?: string;
  /** Barra corta (una línea) para listados compactos. */
  compact?: boolean;
  /** Portada renderizada en el servidor (GlitchImage). */
  children: ReactNode;
}

/** Portada clicable + barra de capturas + visor modal (<dialog> nativo). */
export function ProjectMedia({ title, shots, labels, backdropSrc, compact = false, children }: ProjectMediaProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState(0);
  const total = shots.length;
  const shot = shots[index];

  function open(i: number, from: HTMLElement) {
    opener.current = from;
    setIndex(i);
    dialogRef.current?.showModal();
  }
  const go = (d: number) => setIndex((i) => (i + d + total) % total);

  function onKeyDown(e: KeyboardEvent<HTMLDialogElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  }

  const counter = labels.counter
    .replace("{n}", String(index + 1))
    .replace("{total}", String(total));
  const countText = labels.capturesCount.replace("{n}", String(total));

  const iconBtn =
    "inline-flex size-11 items-center justify-center border border-line bg-void text-ink transition-colors hover:border-accent hover:text-accent";

  return (
    <div className="flex w-full flex-col">
      <button
        type="button"
        aria-label={`${labels.openGallery}: ${title}`}
        onClick={(e) => open(0, e.currentTarget)}
        className="glitch-hover relative block w-full cursor-zoom-in overflow-hidden bg-void text-left lg:flex lg:flex-1 lg:items-center"
      >
        {backdropSrc && (
          <>
            <span aria-hidden="true" className="absolute inset-0 bg-screen">
              <Image src={backdropSrc} alt="" fill sizes="32px" quality={30} className="backdrop-soft object-cover" />
            </span>
            <span aria-hidden="true" className="scanlines pointer-events-none absolute inset-0" />
          </>
        )}
        <span className="relative block w-full">{children}</span>
      </button>
      <button
        type="button"
        aria-label={`${labels.openGallery}: ${countText} — ${title}`}
        onClick={(e) => open(0, e.currentTarget)}
        className="flex min-h-12 w-full items-center justify-between gap-3 border-t border-line bg-void px-4 py-2 text-left font-mono text-[0.8125rem] text-ink-dim transition-colors hover:text-accent"
      >
        <span className={`tabular-nums ${compact ? "whitespace-nowrap" : ""}`}>
          {compact ? countText : `${countText} · ${labels.openGallery}`}
        </span>
        <Icon name="arrow" size={16} />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={`${labels.dialogLabel}: ${title}`}
        className="gallery-dialog"
        onKeyDown={onKeyDown}
        onClose={() => opener.current?.focus()}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
          <p className="font-display text-base font-semibold uppercase tracking-[0.05em] text-ink">
            {title}
          </p>
          <div className="flex items-center gap-3">
            <p role="status" aria-live="polite" className="font-mono text-[0.8125rem] tabular-nums text-ink-dim">
              {counter}
            </p>
            <button type="button" className={iconBtn} aria-label={labels.close} onClick={() => dialogRef.current?.close()}>
              <Icon name="close" size={20} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden bg-void">
          <span aria-hidden="true" className="absolute inset-0 bg-screen">
            <Image src={shot.src} alt="" fill sizes="32px" quality={30} className="backdrop-soft object-cover" />
          </span>
          <span aria-hidden="true" className="scanlines pointer-events-none absolute inset-0" />
          <div key={index} className="shot-swap relative flex items-center justify-center">
            <Image
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              sizes="(min-width: 1120px) 1120px, 100vw"
              className="h-auto max-h-[62dvh] w-auto max-w-full border border-line object-contain shot-shadow"
            />
          </div>
          {shot.placeholder && (
            <span className="absolute left-3 top-3 border border-alert bg-void px-2 py-0.5 font-mono text-[0.75rem] font-medium uppercase leading-none tracking-[0.12em] text-alert">
              {labels.photoPlaceholder}
            </span>
          )}
          {total > 1 && (
            <>
              <button type="button" aria-label={labels.prev} onClick={() => go(-1)} className={`${iconBtn} absolute left-3 top-1/2 -translate-y-1/2`}>
                <Icon name="arrow" size={20} className="rotate-180" />
              </button>
              <button type="button" aria-label={labels.next} onClick={() => go(1)} className={`${iconBtn} absolute right-3 top-1/2 -translate-y-1/2`}>
                <Icon name="arrow" size={20} />
              </button>
            </>
          )}
        </div>

        <div className="px-4 py-3">
          {shot.caption && <p className="text-sm text-ink-dim">{shot.caption}</p>}
          <ul className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {shots.map((s, i) => (
              <li key={s.src} className="shrink-0">
                <button
                  type="button"
                  aria-label={s.caption ?? `${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => setIndex(i)}
                  className={`relative block h-14 w-24 overflow-hidden border-2 transition-colors ${i === index ? "border-accent" : "border-line hover:border-ink-faint"}`}
                >
                  <Image src={s.src} alt="" fill sizes="96px" className="object-cover" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </div>
  );
}
