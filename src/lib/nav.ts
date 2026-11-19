import { portfolio } from "@/data/portfolio";
import type { SectionId } from "@/types/portfolio";

/** Posición (1-based) y total de una sección según el orden de `nav`. */
export function sectionPosition(id: SectionId) {
  const index = portfolio.nav.findIndex((n) => n.id === id) + 1;
  return { index, total: portfolio.nav.length };
}
