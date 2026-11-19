import { locales, defaultLocale } from "@/types/portfolio";
import type { Locale, Localized } from "@/types/portfolio";
import { ui } from "@/data/ui";

export { locales, defaultLocale };
export type { Locale };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Resuelve un valor traducido al idioma activo. */
export function t<T>(value: Localized<T>, lang: Locale): T {
  return value[lang];
}

export function getUI(lang: Locale) {
  return ui[lang];
}

export function otherLocale(lang: Locale): Locale {
  return lang === "es" ? "en" : "es";
}

export const ogLocale: Record<Locale, string> = { es: "es_CO", en: "en_US" };

/** Palabra "de"/"of" para el texto accesible de índice de sección. */
export const ofWord: Record<Locale, string> = { es: "de", en: "of" };
