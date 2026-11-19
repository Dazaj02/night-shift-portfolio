import type { Locale, Testimonial } from "@/types/portfolio";
import { portfolio } from "@/data/portfolio";
import { getUI, t } from "@/lib/i18n";
import { sectionPosition } from "@/lib/nav";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { Icon } from "@/components/ui/Icon";

function Caption({
  item,
  channel,
  lang,
  badge,
  linkedinSoon,
  external,
}: {
  item: Testimonial;
  channel: string;
  lang: Locale;
  badge: string;
  linkedinSoon: string;
  external: string;
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
        {item.linkedin ? (
          <a
            href={item.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex min-h-11 items-center gap-2 text-sm text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            <Icon name="linkedin" size={16} />
            LinkedIn
            <span className="sr-only"> {external}</span>
          </a>
        ) : item.linkedin === null ? (
          <p className="mt-1 inline-flex items-center gap-2 text-sm text-ink-faint">
            <Icon name="linkedin" size={16} />
            LinkedIn · {linkedinSoon}
          </p>
        ) : null}
      </div>
      {item.isPlaceholder && <PlaceholderBadge label={badge} />}
    </figcaption>
  );
}

function Quote({ item, lang, empty }: { item: Testimonial; lang: Locale; empty: string }) {
  return item.quote ? <p>{t(item.quote, lang)}</p> : <p className="text-ink-faint">{empty}</p>;
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
              <Quote item={featured} lang={lang} empty={ui.testimonials.empty} />
            </blockquote>
            <Caption item={featured} channel={channelOf(1)} lang={lang} badge={ui.placeholderBadge} linkedinSoon={ui.comingSoon} external={ui.externalLink} />
          </Reveal>
        )}

        <div className="divide-y divide-line border-y border-line lg:col-span-5 lg:self-center">
          {rest.map((item, i) => (
            <Reveal as="figure" key={item.id} index={i + 1} className="glitch-hover py-7 first:pt-6 last:pb-6">
              <blockquote className="glitch-hover-target text-lg leading-relaxed text-ink">
                <Quote item={item} lang={lang} empty={ui.testimonials.empty} />
              </blockquote>
              <Caption item={item} channel={channelOf(i + 2)} lang={lang} badge={ui.placeholderBadge} linkedinSoon={ui.comingSoon} external={ui.externalLink} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
