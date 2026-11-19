import type { Locale } from "@/types/portfolio";
import { portfolio } from "@/data/portfolio";
import { getUI, t } from "@/lib/i18n";
import { sectionPosition } from "@/lib/nav";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TechTable, type TechRow } from "@/components/ui/TechTable";

export function TechStack({ lang }: { lang: Locale }) {
  const ui = getUI(lang);
  const { index, total } = sectionPosition("tecnologias");

  const rows: TechRow[] = portfolio.stack.map((g) => ({
    id: g.id,
    label: t(g.label, lang),
    cells: g.items.map((item) => {
      const names = [item.name, ...(item.aliases ?? [])];
      return {
        id: item.id,
        name: item.name,
        desc: t(item.desc, lang),
        usedIn: portfolio.projects
          .filter((p) => p.tech.some((x) => names.includes(x)))
          .map((p) => t(p.title, lang)),
      };
    }),
  }));

  return (
    <Section id="tecnologias" title={ui.stack.title} index={index} total={total} lang={lang} sectionLabel={ui.sectionIndex}>
      <p className="measure -mt-4 mb-10 text-lg text-ink-dim">{ui.stack.intro}</p>
      <Reveal>
        <TechTable
          rows={rows}
          labels={{ usedIn: ui.stack.usedIn, noProject: ui.stack.noProject, table: ui.stack.title }}
        />
      </Reveal>
    </Section>
  );
}
