import type { Locale } from "@/types/portfolio";
import { portfolio } from "@/data/portfolio";
import { getUI, t } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";

export function Arsenal({ lang }: { lang: Locale }) {
  const ui = getUI(lang);
  const { skills } = portfolio;
  const all = Array.from(new Set(skills.flatMap((g) => g.items)));

  const group = (hidden: boolean) => (
    <ul className="marquee-group" aria-hidden={hidden || undefined}>
      {all.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold uppercase tracking-[0.03em] text-ink-dim transition-colors hover:text-ink">
            {item}
          </span>
          <span aria-hidden="true" className="mx-6 size-2 shrink-0 bg-accent sm:mx-8" />
        </li>
      ))}
    </ul>
  );

  return (
    <Section id="arsenal" title={ui.toolbox.title} lang={lang} sectionLabel={ui.sectionIndex}>
      <p className="measure -mt-4 mb-10 text-lg text-ink-dim">{ui.toolbox.intro}</p>

      <div className="marquee border-y border-line py-5" role="group" aria-label={ui.toolbox.title}>
        <div className="marquee-track">
          {group(false)}
          {group(true)}
        </div>
      </div>

      <dl className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2">
        {skills.map((g) => (
          <div key={g.id} className="grid gap-3 border-b border-line pb-6 sm:grid-cols-[8.5rem_1fr] sm:gap-5">
            <dt className="font-display text-[0.9375rem] font-semibold uppercase tracking-[0.06em] text-cyan">
              {t(g.label, lang)}
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li key={item} className="frame tag">
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
