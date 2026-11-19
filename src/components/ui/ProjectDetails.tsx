"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { Icon } from "./Icon";

interface ProjectDetailsProps {
  title: string;
  /** Pares etiqueta/valor de la ficha (estado, año, plataforma, equipo). */
  meta: { label: string; value: string }[];
  cover: { src: string; alt: string };
  problem: string;
  idea: string;
  audience: string;
  how: string[];
  build: string[];
  role: { label: string; value: string };
  outcome?: { label: string; value: string };
  tech: { label: string; items: string[] };
  related?: { label: string; href: string }[];
  /** Enlaces del proyecto (renderizados en el servidor). */
  links: ReactNode;
  labels: {
    open: string;
    dialog: string;
    close: string;
    problem: string;
    idea: string;
    audience: string;
    how: string;
    build: string;
    related: string;
    external: string;
  };
  /** Variante compacta para la lista "Otros proyectos". */
  compact?: boolean;
}

/** Duración del glitch de salida antes de cerrar el <dialog> (ms). */
const OUT_MS = 340;

/**
 * Botón + pantalla emergente (<dialog> nativo) con el contexto completo del proyecto.
 * Al abrir y al cerrar el panel hace un glitch corto (cortes + capas RGB). Mientras está
 * abierto, la página de fondo sufre un glitch suave y continuo (html[data-modal="open"]).
 * Con data-motion="off" no hay efectos; Esc, clic fuera y el botón cierran.
 */
export function ProjectDetails(props: ProjectDetailsProps) {
  const { title, meta, cover, problem, idea, audience, how, build, role, outcome, tech, related, links, labels, compact = false } = props;
  const uid = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closing = useRef(false);
  const timer = useRef<number | undefined>(undefined);
  const [fx, setFx] = useState<"in" | "out" | null>(null);

  function open(from: HTMLElement) {
    const dlg = dialogRef.current;
    if (!dlg || dlg.open) return;
    opener.current = from;
    closing.current = false;
    document.documentElement.dataset.modal = "open";
    setFx("in");
    dlg.showModal();
  }

  function requestClose() {
    const dlg = dialogRef.current;
    if (!dlg || !dlg.open || closing.current) return;
    closing.current = true;
    const animated = document.documentElement.dataset.motion !== "off";
    if (!animated) {
      dlg.close();
      return;
    }
    setFx("out");
    timer.current = window.setTimeout(() => dlg.close(), OUT_MS);
  }

  useEffect(
    () => () => {
      window.clearTimeout(timer.current);
      delete document.documentElement.dataset.modal;
    },
    [],
  );

  const iconBtn =
    "inline-flex size-11 shrink-0 items-center justify-center border border-line bg-void text-ink transition-colors hover:border-accent hover:text-accent";
  const h4 = "font-display text-sm font-semibold uppercase tracking-[0.06em] text-cyan";

  return (
    <div className={compact ? "mt-4" : "mt-7"}>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={(e) => open(e.currentTarget)}
        className="frame btn-cut btn-cut--ghost btn-cut--sm"
      >
        <span>{labels.open}</span>
        <Icon name="arrow" size={16} />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={`${labels.dialog}: ${title}`}
        className="ctx-dialog"
        onCancel={(e) => {
          e.preventDefault();
          requestClose();
        }}
        onClose={() => {
          window.clearTimeout(timer.current);
          closing.current = false;
          setFx(null);
          delete document.documentElement.dataset.modal;
          opener.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) requestClose();
        }}
      >
        <div className="ctx-fx" data-fx={fx ?? undefined} onAnimationEnd={(e) => e.target === e.currentTarget && fx === "in" && setFx(null)}>
          <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-line bg-panel px-4 py-3 sm:px-6">
            <h3 className="font-display text-lg font-bold uppercase leading-tight tracking-[0.03em] text-ink sm:text-xl">{title}</h3>
            <button type="button" autoFocus aria-label={labels.close} onClick={requestClose} className={iconBtn}>
              <Icon name="close" size={20} />
            </button>
          </div>

          <div className="grid gap-8 p-4 sm:p-6 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-10">
            <aside className="space-y-6">
              <div className="relative aspect-[16/10] overflow-hidden border border-line bg-void">
                <Image src={cover.src} alt={cover.alt} fill sizes="(min-width: 1024px) 272px, 100vw" className="object-cover" />
                <span aria-hidden="true" className="scanlines pointer-events-none absolute inset-0" />
              </div>
              <dl className="space-y-2 font-mono text-[0.8125rem]">
                {meta.map((m) => (
                  <div key={m.label} className="flex flex-wrap gap-x-2">
                    <dt className="text-ink-faint">{m.label}</dt>
                    <dd className="text-ink-dim">{m.value}</dd>
                  </div>
                ))}
              </dl>
              <ul aria-label={tech.label} className="flex flex-wrap gap-2">
                {tech.items.map((item) => (
                  <li key={item} className="frame tag">
                    {item}
                  </li>
                ))}
              </ul>
              <div>{links}</div>
              {related && related.length > 0 && (
                <div>
                  <h4 className={h4}>{labels.related}</h4>
                  <ul className="mt-2 space-y-1.5">
                    {related.map((r) => (
                      <li key={r.href}>
                        <a
                          href={r.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[0.9375rem] text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                        >
                          {r.label}
                          <Icon name="external" size={14} />
                          <span className="sr-only"> {labels.external}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>

            <div className="space-y-8">
              <section aria-labelledby={`${uid}-problem`}>
                <h4 id={`${uid}-problem`} className={h4}>
                  {labels.problem}
                </h4>
                <p className="mt-2 max-w-[66ch] text-ink-dim">{problem}</p>
              </section>
              <section aria-labelledby={`${uid}-idea`}>
                <h4 id={`${uid}-idea`} className={h4}>
                  {labels.idea}
                </h4>
                <p className="mt-2 max-w-[66ch] text-lg text-ink">{idea}</p>
              </section>
              <section aria-labelledby={`${uid}-audience`}>
                <h4 id={`${uid}-audience`} className={h4}>
                  {labels.audience}
                </h4>
                <p className="mt-2 max-w-[66ch] text-ink-dim">{audience}</p>
              </section>
              <section aria-labelledby={`${uid}-how`}>
                <h4 id={`${uid}-how`} className={h4}>
                  {labels.how}
                </h4>
                <ul className="mt-3 space-y-3 text-[0.9375rem] text-ink-dim">
                  {how.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                      <span className="max-w-[66ch]">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section aria-labelledby={`${uid}-build`}>
                <h4 id={`${uid}-build`} className={h4}>
                  {labels.build}
                </h4>
                <ul className="mt-3 space-y-3 text-[0.9375rem] text-ink-dim">
                  {build.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                      <span className="max-w-[66ch]">{item}</span>
                    </li>
                  ))}
                </ul>
                <dl className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-[6rem_1fr]">
                  <dt className={h4}>{role.label}</dt>
                  <dd className="text-ink">{role.value}</dd>
                  {outcome && (
                    <>
                      <dt className={h4}>{outcome.label}</dt>
                      <dd className="text-ink">{outcome.value}</dd>
                    </>
                  )}
                </dl>
              </section>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
