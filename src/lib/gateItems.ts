import type { Locale, SectionId } from "@/types/portfolio";
import { portfolio } from "@/data/portfolio";
import { t } from "@/lib/i18n";

export interface GateItem {
  id: SectionId;
  label: string;
  hint: string;
  /** Dato corto que aparece en el panel derecho de la pantalla de entrada. */
  stat: string;
}

/** Secciones de la pantalla de entrada (solo servidor: lee los datos del portafolio). */
export function gateItems(lang: Locale): GateItem[] {
  const es = lang === "es";
  const techCount = portfolio.stack.reduce((n, g) => n + g.items.length, 0);
  const stat: Record<SectionId, string> = {
    inicio: es ? `${portfolio.nav.length - 1} secciones` : `${portfolio.nav.length - 1} sections`,
    "sobre-mi": es ? "Ingeniería de Software" : "Software Engineering",
    proyectos: es ? `${portfolio.projects.length} proyectos` : `${portfolio.projects.length} projects`,
    testimonios: es ? `${portfolio.testimonials.length} voces` : `${portfolio.testimonials.length} voices`,
    experiencia: es ? `${portfolio.experience.length} registros` : `${portfolio.experience.length} records`,
    tecnologias: es ? `${techCount} tecnologías` : `${techCount} technologies`,
    contacto: es ? "GitHub · LinkedIn · correo" : "GitHub · LinkedIn · email",
  };
  return portfolio.nav.map((n) => ({
    id: n.id,
    label: t(n.label, lang),
    hint: t(n.menuHint, lang),
    stat: stat[n.id],
  }));
}
