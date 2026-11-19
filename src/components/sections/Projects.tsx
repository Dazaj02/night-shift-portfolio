import type { Locale, Project } from "@/types/portfolio";
import { portfolio } from "@/data/portfolio";
import { getUI, t } from "@/lib/i18n";
import { sectionPosition } from "@/lib/nav";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { GlitchImage } from "@/components/ui/GlitchImage";
import { ProjectMedia, type Shot } from "@/components/ui/ProjectMedia";
import { ProjectLinks } from "@/components/ui/ProjectLinks";
import { ProjectDetails } from "@/components/ui/ProjectDetails";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";

function shotsOf(p: Project, lang: Locale, title: string): Shot[] {
  return [p.cover, ...p.gallery].map((img, n) => ({
    src: img.src,
    alt: t(img.alt, lang),
    caption: img.caption ? t(img.caption, lang) : n === 0 ? title : undefined,
    width: img.width,
    height: img.height,
    placeholder: img.isPlaceholder,
  }));
}

export function Projects({ lang }: { lang: Locale }) {
  const ui = getUI(lang);

  /** Pantalla emergente con el contexto completo (solo si el proyecto tiene `details`). */
  function detailsOf(p: Project, title: string, compact = false) {
    const d = p.details;
    if (!d) return null;
    const outcome = p.outcome ? t(p.outcome, lang) : null;
    return (
      <ProjectDetails
        compact={compact}
        title={title}
        meta={[
          { label: ui.projects.status, value: t(p.status, lang) },
          { label: ui.projects.year, value: p.year },
          { label: ui.projects.platform, value: t(p.platform, lang) },
          ...(p.team ? [{ label: ui.projects.team, value: t(p.team, lang) }] : []),
        ]}
        cover={{ src: p.cover.src, alt: t(p.cover.alt, lang) }}
        problem={t(d.problem, lang)}
        idea={t(d.idea, lang)}
        audience={t(d.audience, lang)}
        how={t(d.how, lang)}
        build={t(d.build, lang)}
        role={{ label: ui.projects.role, value: t(p.role, lang) }}
        outcome={outcome ? { label: ui.projects.outcome, value: outcome } : undefined}
        tech={{ label: ui.projects.tech, items: p.tech }}
        related={d.related?.map((r) => ({ label: t(r.label, lang), href: r.href }))}
        links={<ProjectLinks links={p.links} ui={ui} projectTitle={title} />}
        labels={{
          open: ui.projects.detailsOpen,
          dialog: ui.projects.detailsDialog,
          close: ui.projects.detailsClose,
          problem: ui.projects.detailsProblem,
          idea: ui.projects.detailsIdea,
          audience: ui.projects.detailsAudience,
          how: ui.projects.detailsHow,
          build: ui.projects.detailsBuild,
          related: ui.projects.detailsRelated,
          external: ui.externalLink,
        }}
      />
    );
  }
  const { index, total } = sectionPosition("proyectos");
  const featured = portfolio.projects.filter((p) => p.featured);
  const others = portfolio.projects.filter((p) => !p.featured);
  const labels = {
    capturesCount: ui.projects.capturesCount,
    openGallery: ui.projects.openGallery,
    dialogLabel: ui.gallery.dialogLabel,
    close: ui.gallery.close,
    next: ui.gallery.next,
    prev: ui.gallery.prev,
    counter: ui.gallery.counter,
    photoPlaceholder: ui.photoPlaceholder,
  };

  return (
    <Section id="proyectos" title={ui.projects.title} index={index} total={total} lang={lang} sectionLabel={ui.sectionIndex}>
      <p className="measure -mt-4 mb-12 text-lg text-ink-dim">{ui.projects.intro}</p>

      <div className="space-y-10 lg:space-y-14">
        {featured.map((p, i) => {
          const flip = i % 2 === 1;
          const title = t(p.title, lang);
          const outcome = p.outcome ? t(p.outcome, lang) : null;
          const shots = shotsOf(p, lang, title);
          return (
            <Reveal
              as="article"
              key={p.id}
              aria-labelledby={`${p.id}-title`}
              className="frame project-panel grid p-px [--cut:28px] lg:grid-cols-12"
            >
              <div aria-hidden="true" className="scanlines pointer-events-none absolute inset-px z-0" />
              <div
                className={`relative z-10 flex lg:col-span-5 ${flip ? "lg:order-2 lg:[clip-path:polygon(0_0,100%_0,100%_calc(100%-27px),calc(100%-27px)_100%,0_100%)]" : ""}`}
              >
                <ProjectMedia title={title} shots={shots} labels={labels} backdropSrc={p.cover.src}>
                  <GlitchImage
                    src={p.cover.src}
                    alt={t(p.cover.alt, lang)}
                    ratio="16 / 10"
                    className="w-full border border-line shot-shadow"
                    sizes="(min-width: 1280px) 480px, (min-width: 1024px) 40vw, 100vw"
                    placeholderLabel={p.cover.isPlaceholder ? ui.photoPlaceholder : undefined}
                  />
                </ProjectMedia>
              </div>

              <div className="relative z-10 p-6 sm:p-8 lg:col-span-7 lg:p-10">
                {p.context && (
                  <p className="mb-2 font-mono text-[0.8125rem] text-cyan">{t(p.context, lang)}</p>
                )}
                <dl className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-[0.8125rem] text-ink-dim">
                  <div className="flex gap-2">
                    <dt className="text-ink-faint">{ui.projects.status}</dt>
                    <dd>{t(p.status, lang)}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-ink-faint">{ui.projects.year}</dt>
                    <dd className="tnum">{p.year}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-ink-faint">{ui.projects.platform}</dt>
                    <dd>{t(p.platform, lang)}</dd>
                  </div>
                  {p.team && (
                    <div className="flex gap-2">
                      <dt className="text-ink-faint">{ui.projects.team}</dt>
                      <dd>{t(p.team, lang)}</dd>
                    </div>
                  )}
                </dl>

                <h3
                  id={`${p.id}-title`}
                  className="project-title mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-3xl font-bold uppercase leading-tight tracking-[0.02em] text-ink sm:text-4xl"
                >
                  {title}
                  {p.isPlaceholder && <PlaceholderBadge label={ui.placeholderBadge} />}
                </h3>

                <p className="mt-4 max-w-[62ch] text-ink-dim">{t(p.summary, lang)}</p>

                <dl className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-[6rem_1fr]">
                  <dt className="font-display text-sm font-semibold uppercase tracking-[0.06em] text-cyan">
                    {ui.projects.role}
                  </dt>
                  <dd className="text-ink">{t(p.role, lang)}</dd>
                  {outcome && (
                    <>
                      <dt className="font-display text-sm font-semibold uppercase tracking-[0.06em] text-cyan">
                        {ui.projects.outcome}
                      </dt>
                      <dd className="text-ink">{outcome}</dd>
                    </>
                  )}
                </dl>

                <ul aria-label={ui.projects.tech} className="mt-6 flex flex-wrap gap-2">
                  {p.tech.map((tech) => (
                    <li key={tech} className="frame tag">
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <ProjectLinks links={p.links} ui={ui} projectTitle={title} />
                </div>

                {detailsOf(p, title)}
              </div>
            </Reveal>
          );
        })}
      </div>

      {others.length > 0 && (
        <>
          <h3 className="mb-6 mt-20 font-display text-2xl font-bold uppercase tracking-[0.04em] text-ink">
            {ui.projects.moreTitle}
          </h3>
          <ul>
            {others.map((p, n) => {
              const title = t(p.title, lang);
              const extra = p.tech.length - 5;
              return (
                <Reveal as="li" key={p.id} index={n % 3} className="border-t border-line py-7">
                  <article
                    aria-labelledby={`${p.id}-title`}
                    className="flex flex-col gap-5 sm:flex-row"
                  >
                    <div className="w-full shrink-0 sm:w-60">
                      <ProjectMedia title={title} shots={shotsOf(p, lang, title)} labels={labels} compact>
                        <GlitchImage
                          src={p.cover.src}
                          alt={t(p.cover.alt, lang)}
                          ratio="16 / 10"
                          className="w-full"
                          sizes="(min-width: 640px) 240px, 100vw"
                          placeholderLabel={p.cover.isPlaceholder ? ui.photoPlaceholder : undefined}
                        />
                      </ProjectMedia>
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-[0.8125rem] text-ink-dim">
                        {t(p.status, lang)} · <span className="tnum">{p.year}</span> · {t(p.platform, lang)}
                      </p>
                      <h4
                        id={`${p.id}-title`}
                        className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-xl font-bold uppercase leading-tight tracking-[0.03em] text-ink"
                      >
                        {title}
                        {p.isPlaceholder && <PlaceholderBadge label={ui.placeholderBadge} />}
                      </h4>
                      <p className="mt-2 line-clamp-2 text-[0.9375rem] text-ink-dim">{t(p.summary, lang)}</p>
                      <ul aria-label={ui.projects.tech} className="mt-3 flex flex-wrap gap-1.5">
                        {p.tech.slice(0, 5).map((tech) => (
                          <li key={tech} className="frame tag">
                            {tech}
                          </li>
                        ))}
                        {extra > 0 && (
                          <li className="frame tag text-ink-dim">+{extra}</li>
                        )}
                      </ul>
                      <div className="mt-4">
                        <ProjectLinks links={p.links} ui={ui} projectTitle={title} />
                      </div>
                      {detailsOf(p, title, true)}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </>
      )}
    </Section>
  );
}
