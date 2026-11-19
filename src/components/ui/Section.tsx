import type { ReactNode } from "react";
import type { Locale } from "@/types/portfolio";
import { ofWord } from "@/lib/i18n";
import { GlitchHeading } from "./GlitchHeading";

interface SectionProps {
  id: string;
  title: string;
  /** Posición en la navegación; si falta (p. ej. Arsenal) no se muestra índice. */
  index?: number;
  total?: number;
  lang: Locale;
  sectionLabel: string;
  children: ReactNode;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Section({
  id,
  title,
  index,
  total,
  lang,
  sectionLabel,
  children,
}: SectionProps) {
  const headingId = `${id}-title`;
  return (
    <section id={id} tabIndex={-1} aria-labelledby={headingId} className="py-16 sm:py-24">
      <div className="wrap">
        <header className="sec-head relative mb-10 flex items-end justify-between gap-6 border-b pb-4 sm:mb-14">
          <GlitchHeading id={headingId} text={title} />
          <span aria-hidden="true" className="section-rule" />
          {index !== undefined && total !== undefined && (
            <p className="sec-idx flex shrink-0 items-center gap-3 pb-1 font-mono text-sm tabular-nums text-ink-faint">
              <span aria-hidden="true" className="hidden gap-0.5 sm:flex">
                {Array.from({ length: total }, (_, i) => (
                  <span key={i} className={`h-1.5 w-2.5 ${i + 1 === index ? "bg-accent" : "bg-line"}`} />
                ))}
              </span>
              <span aria-hidden="true">
                {pad(index)}/{pad(total)}
              </span>
              <span className="sr-only">
                {sectionLabel} {index} {ofWord[lang]} {total}
              </span>
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
