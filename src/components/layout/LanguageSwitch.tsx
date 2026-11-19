"use client";

import { markLangNav } from "@/lib/motion";
import type { Locale } from "@/types/portfolio";
import { Icon } from "@/components/ui/Icon";

interface LanguageSwitchProps {
  targetLang: Locale;
  targetName: string;
  label: string;
  /** Hash (sin #) para conservar la sección actual al cambiar de idioma. */
  hash?: string;
  className?: string;
  onNavigate?: () => void;
}

export function LanguageSwitch({
  targetLang,
  targetName,
  label,
  hash,
  className = "",
  onNavigate,
}: LanguageSwitchProps) {
  const href = hash && hash !== "inicio" ? `/${targetLang}#${hash}` : `/${targetLang}`;
  return (
    // <a> y no <Link>: el <html> vive en el layout [lang]; con navegación suave el árbol anterior
    // quedaba duplicado en el DOM. Una carga completa deja la página limpia (markLangNav evita los efectos de entrada).
    <a
      href={href}
      lang={targetLang}
      hrefLang={targetLang}
      aria-label={`${label}: ${targetName}`}
      onClick={() => {
        markLangNav();
        onNavigate?.();
      }}
      className={`inline-flex min-h-11 items-center gap-2 px-2 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink-dim transition-colors duration-200 hover:text-ink ${className}`}
    >
      <Icon name="globe" size={16} />
      <span>{targetName}</span>
    </a>
  );
}
