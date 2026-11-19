import type { Locale } from "@/types/portfolio";
import { portfolio } from "@/data/portfolio";
import { getUI, t } from "@/lib/i18n";
import { sectionPosition } from "@/lib/nav";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { LearningBar } from "@/components/ui/LearningBar";

export function Learning({ lang }: { lang: Locale }) {
  const ui = getUI(lang);
  const { index, total } = sectionPosition("aprendiendo");

  return (
    <Section id="aprendiendo" title={ui.learning.title} index={index} total={total} lang={lang} sectionLabel={ui.sectionIndex}>
      <p className="measure -mt-4 mb-10 text-lg text-ink-dim">{ui.learning.intro}</p>

      <ul className="divide-y divide-line border-y border-line">
        {portfolio.learning.map((item, n) => {
          const title = t(item.title, lang);
          return (
            <Reveal as="li" key={item.id} index={n % 3} className="grid gap-5 py-7 lg:grid-cols-12 lg:items-center lg:gap-10">
              <div className="lg:col-span-7">
                <h3 className="flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-2xl font-bold uppercase tracking-[0.03em] text-ink">
                  {title}
                  {item.isPlaceholder && <PlaceholderBadge label={ui.placeholderBadge} />}
                </h3>
                <p className="mt-2 max-w-[60ch] text-ink-dim">{t(item.detail, lang)}</p>
              </div>
              <div className="lg:col-span-5">
                <LearningBar value={item.progress} label={`${ui.learning.progress}: ${title}`} />
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
