import type { Locale } from "@/types/portfolio";
import { portfolio } from "@/data/portfolio";
import { getUI, t } from "@/lib/i18n";
import { sectionPosition } from "@/lib/nav";
import { Section } from "@/components/ui/Section";
import { GlitchImage } from "@/components/ui/GlitchImage";

export function About({ lang }: { lang: Locale }) {
  const ui = getUI(lang);
  const { profile, gallery } = portfolio;
  const { index, total } = sectionPosition("sobre-mi");
  const bio = t(profile.bioLong, lang);
  const h3 = "font-display text-xl font-bold uppercase tracking-[0.04em] text-ink";

  return (
    <Section id="sobre-mi" title={ui.about.title} index={index} total={total} lang={lang} sectionLabel={ui.sectionIndex}>
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="measure space-y-6 text-[1.0625rem] leading-[1.7] text-ink-dim">
            {bio.map((p, i) => (
              <p key={i} className={i === 0 ? "text-xl leading-relaxed text-ink" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <h3 className={h3}>{ui.about.approachTitle}</h3>
          <ul className="list-mark mt-4 space-y-3 text-ink-dim">
            {t(profile.approach, lang).map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>

          <h3 className={`${h3} mt-12`}>{ui.about.interestsTitle}</h3>
          <ul className="list-mark mt-4 space-y-3 text-ink-dim">
            {t(profile.interests, lang).map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </div>
      </div>

      <h3 className={`${h3} mb-6 mt-20`}>{ui.about.galleryTitle}</h3>
      <div className="grid gap-4 md:grid-cols-12 md:gap-5">
        {gallery.map((img, i) => (
          <figure
            key={img.src}
            className={`flex flex-col ${i === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5"}`}
          >
            <div className={`relative ${i === 0 ? "aspect-[4/3] md:aspect-auto md:min-h-0 md:flex-1" : "aspect-[16/10]"}`}>
              <GlitchImage
                src={img.src}
                alt={t(img.alt, lang)}
                sizes={i === 0 ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 40vw, 100vw"}
                placeholderLabel={img.isPlaceholder ? ui.photoPlaceholder : undefined}
              />
            </div>
            {img.caption && (
              <figcaption className="mt-2 font-mono text-[0.8125rem] text-ink-dim">
                {t(img.caption, lang)}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </Section>
  );
}
