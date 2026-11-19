import type { Locale, Testimonial } from "@/types/portfolio";
import { portfolio } from "@/data/portfolio";
import { getUI, t } from "@/lib/i18n";
import { sectionPosition } from "@/lib/nav";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";

function Caption({
  item,
  channel,
  lang,
  badge,
}: {
  item: Testimonial;
  channel: string;
  lang: Locale;
  badge: string;
}) {
  return (
    <figcaption className="mt-5 flex flex-wrap items-start gap-x-4 gap-y-2">
      <span className="pt-0.5 font-mono text-[0.8125rem] tabular-nums text-cyan">{channel}</span>
      <div className="min-w-0 flex-1">
        <p className="font-display text-base font-semibold uppercase tracking-[0.05em] text-ink">
          {item.name}
        </p>
        <p className="text-sm text-ink-dim">
          {t(item.role, lang)} · {t(item.relation, lang)}
        </p>
        {item.context && <p className="text-sm text-ink-dim">{t(item.context, lang)}</p>}
      </div>
      {item.isPlaceholder && <PlaceholderBadge label={badge} />}
    </figcaption>
  );
}

export function Testimonials({ lang }: { lang: Locale }) {
  const ui = getUI(lang);
  const { index, total } = sectionPosition("testimonios");
  const [featured, ...rest] = portfolio.testimonials;
  const channelOf = (n: number) => `CH.${String(n).padStart(2, "0")}`;

  return (
    <Section id="testimonios" title={ui.testimonials.title} index={index} total={total} lang={lang} sectionLabel={ui.sectionIndex}>
      <div className="-mt-4 mb-12 max-w-[68ch] space-y-3">
        <p className="text-lg text-ink-dim">{ui.testimonials.intro}</p>
        <p className="flex flex-wrap items-center gap-3 text-[0.9375rem] text-ink-dim">
          <PlaceholderBadge label={ui.placeholderBadge} />
          <span>{ui.placeholderNote}</span>
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {featured && (
          <Reveal as="figure" className="glitch-hover lg:col-span-7 lg:self-center">
            <span aria-hidden="true" className="block h-0.5 w-14 bg-accent" />
            <blockquote className="glitch-hover-target mt-6 text-[clamp(1.5rem,3vw,2.5rem)] font-medium leading-snug text-ink">
              <p>{t(featured.quote, lang)}</p>
            </blockquote>
            <Caption item={featured} channel={channelOf(1)} lang={lang} badge={ui.placeholderBadge} />
          </Reveal>
        )}

        <div className="divide-y divide-line border-y border-line lg:col-span-5 lg:self-center">
          {rest.map((item, i) => (
            <Reveal as="figure" key={item.id} index={i + 1} className="glitch-hover py-7 first:pt-6 last:pb-6">
              <blockquote className="glitch-hover-target text-lg leading-relaxed text-ink">
                <p>{t(item.quote, lang)}</p>
              </blockquote>
              <Caption item={item} channel={channelOf(i + 2)} lang={lang} badge={ui.placeholderBadge} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
