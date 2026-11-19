import type { ExperienceItem, ExperienceKind, Locale } from "@/types/portfolio";
import { portfolio } from "@/data/portfolio";
import { getUI, t } from "@/lib/i18n";
import { sectionPosition } from "@/lib/nav";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { ExperienceTabs } from "@/components/ui/ExperienceTabs";

function Item({ item, lang, badge, index }: { item: ExperienceItem; lang: Locale; badge: string; index: number }) {
  const location = item.location ? t(item.location, lang) : null;
  return (
    <Reveal as="li" index={index % 3} className="relative pb-10 pl-7 last:pb-0">
      <span aria-hidden="true" className="absolute -left-[5px] top-2 size-[9px] bg-accent" />
      <p className="font-mono text-[0.8125rem] tabular-nums text-cyan">{t(item.period, lang)}</p>
      <h3 className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-xl font-bold uppercase leading-tight tracking-[0.02em] text-ink">
        {t(item.title, lang)}
        {item.isPlaceholder && <PlaceholderBadge label={badge} />}
      </h3>
      <p className="mt-1 text-ink-dim">
        {item.organization}
        {location && <span className="text-ink-faint"> · {location}</span>}
      </p>
      <ul className="list-mark mt-4 space-y-2 text-[0.9375rem] text-ink-dim">
        {t(item.highlights, lang).map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      {item.tech && item.tech.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {item.tech.map((x) => (
            <li key={x} className="frame tag">
              {x}
            </li>
          ))}
        </ul>
      )}
    </Reveal>
  );
}

export function Experience({ lang }: { lang: Locale }) {
  const ui = getUI(lang);
  const { index, total } = sectionPosition("experiencia");

  const labels: Record<ExperienceKind, string> = {
    work: ui.experience.work,
    education: ui.experience.education,
  };
  const kinds: ExperienceKind[] = ["work", "education"];
  const workIsSample = portfolio.experience
    .filter((e) => e.kind === "work")
    .every((e) => e.isPlaceholder);
  // La pestaña con datos reales abre primero.
  const ordered = workIsSample ? [...kinds].reverse() : kinds;

  const tabs = ordered.map((kind) => ({
    id: kind,
    label: labels[kind],
    panel: (
      <ol aria-label={labels[kind]} className="max-w-3xl border-l border-line">
        {portfolio.experience
          .filter((e) => e.kind === kind)
          .map((item, n) => (
            <Item key={item.id} item={item} lang={lang} badge={ui.placeholderBadge} index={n} />
          ))}
      </ol>
    ),
  }));

  return (
    <Section id="experiencia" title={ui.experience.title} index={index} total={total} lang={lang} sectionLabel={ui.sectionIndex}>
      <p className="measure -mt-4 mb-10 text-lg text-ink-dim">{ui.experience.intro}</p>
      <ExperienceTabs tabs={tabs} label={ui.experience.title} />
    </Section>
  );
}
