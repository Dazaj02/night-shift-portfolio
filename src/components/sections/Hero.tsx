import type { Locale } from "@/types/portfolio";
import { portfolio } from "@/data/portfolio";
import { getUI, t } from "@/lib/i18n";
import { CutButton } from "@/components/ui/CutButton";
import { SectionLink } from "@/components/ui/SectionLink";
import { Icon, type IconName } from "@/components/ui/Icon";
import { TitleMenu, type TitleMenuItem } from "@/components/ui/TitleMenu";
import { HeroTitle } from "@/components/ui/HeroTitle";
import { GlitchImage } from "@/components/ui/GlitchImage";

const BUILD = "2026.11";

function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [contain:paint]">
      <div className="perspective-grid" />
      <div className="scanlines absolute inset-0" />
      <div className="noise absolute inset-0" />
      <span className="absolute left-4 top-[4.5rem] size-7 border-l-2 border-t-2 border-(--hud) sm:left-6 lg:left-10" />
      <span className="absolute right-4 top-[4.5rem] size-7 border-r-2 border-t-2 border-edge sm:right-6 lg:right-10" />
      <span className="absolute bottom-24 left-4 size-7 border-b-2 border-l-2 border-edge sm:left-6 lg:left-10" />
      <span className="absolute bottom-24 right-4 size-7 border-b-2 border-r-2 border-(--hud) sm:right-6 lg:right-10" />
    </div>
  );
}

export function Hero({ lang }: { lang: Locale }) {
  const ui = getUI(lang);
  const { profile, nav, socials } = portfolio;

  const items: TitleMenuItem[] = [
    ...nav
      .filter((n) => n.id !== "inicio")
      .map((n) => ({
        key: n.id,
        label: t(n.menuLabel, lang),
        hint: t(n.menuHint, lang),
        sectionId: n.id,
      })),
    {
      key: "cv",
      label: ui.downloadCv,
      hint: lang === "es" ? "Descarga mi hoja de vida en PDF" : "Download my résumé as a PDF",
      href: profile.cvHref,
      download: true,
    },
  ];

  const contactNav = nav.find((n) => n.id === "contacto");
  const quick: { key: string; label: string; href: string | null; icon: IconName; section?: boolean }[] = [
    ...(["github", "linkedin"] as const).map((kind) => {
      const s = socials.find((x) => x.kind === kind);
      return { key: kind, label: s?.label ?? kind, href: s?.href ?? null, icon: kind as IconName };
    }),
    { key: "contact", label: contactNav ? t(contactNav.label, lang) : ui.contactCta, href: "#contacto", icon: "mail", section: true },
  ];

  const quickClass = "inline-flex min-h-11 items-center gap-2 text-ink-dim transition-colors hover:text-ink";
  const chip = "inline-flex items-center gap-2 border border-line bg-void px-3 py-1.5 font-mono text-[0.8125rem] text-ink-dim";

  return (
    <section
      id="inicio"
      tabIndex={-1}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-14"
    >
      <Backdrop />

      <div className="wrap flex flex-1 flex-col justify-center py-10 lg:py-12">
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <ul className="mb-6 flex flex-wrap gap-2">
              <li className={chip}>
                <Icon name="pin" size={14} className="text-accent" />
                {t(profile.location, lang)}
              </li>
              <li className={`${chip} chip-status`}>
                <span aria-hidden="true" className="pulse-dot size-2 bg-accent" />
                {ui.hero.availability}
              </li>
            </ul>

            <HeroTitle id="hero-title" text={profile.name} />
            <p className="mt-5 font-display text-xl font-semibold uppercase tracking-[0.08em] text-cyan sm:text-2xl">
              {t(profile.role, lang)}
            </p>
            <p className="mt-4 max-w-[50ch] text-lg leading-relaxed text-ink-dim">
              {t(profile.valueProp, lang)}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <CutButton sectionId="proyectos" variant="primary" icon="arrow">
                {ui.viewProjects}
              </CutButton>
              <CutButton href={profile.cvHref} download variant="ghost" icon="download">
                {ui.downloadCv}
              </CutButton>
            </div>
          </div>

          {/* Carta de personaje */}
          <div className="mx-auto w-full max-w-[22rem] lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:ml-auto lg:max-w-[24rem]">
            <GlitchImage
              src={profile.photo.src}
              alt={t(profile.photo.alt, lang)}
              ratio="4 / 5"
              sizes="(min-width: 1024px) 384px, (min-width: 640px) 352px, 100vw"
              priority
              ambient
              frame
              label={t(profile.location, lang)}
              placeholderLabel={profile.photo.isPlaceholder ? ui.photoPlaceholder : undefined}
            />
            <ul aria-label={ui.hero.quickLinksLabel} className="mt-3 flex flex-wrap justify-between gap-x-4 gap-y-1">
              {quick.map((q) => (
                <li key={q.key}>
                  {q.section ? (
                    <SectionLink sectionId="contacto" className={quickClass}>
                      <Icon name={q.icon} size={18} />
                      <span>{q.label}</span>
                    </SectionLink>
                  ) : q.href ? (
                    <a href={q.href} target="_blank" rel="noopener noreferrer" className={quickClass}>
                      <Icon name={q.icon} size={18} />
                      <span>
                        {q.label}
                        <span className="sr-only"> {ui.externalLink}</span>
                      </span>
                    </a>
                  ) : (
                    <span aria-disabled="true" className="inline-flex min-h-11 items-center gap-2 text-ink-faint">
                      <Icon name={q.icon} size={18} />
                      <span>
                        {q.label} · {ui.comingSoon}
                      </span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="screen lg:col-span-7">
            <TitleMenu ariaLabel={ui.hero.menuLabel} items={items} />
          </div>
        </div>
      </div>

      {/* Barra inferior del HUD */}
      <div className="screen-flat border-t border-line bg-void">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-3">
          <dl className="flex flex-wrap items-end gap-x-8 gap-y-2">
            {profile.stats.map((s) => (
              <div key={s.id}>
                <dd className="font-display text-xl font-bold leading-none text-ink">{s.value}</dd>
                <dt className="mt-1 font-mono text-[0.75rem] uppercase tracking-[0.08em] text-ink-faint">
                  {t(s.label, lang)}
                </dt>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-[0.8125rem] text-ink-dim">
            <p className="flex items-center gap-2">
              <span aria-hidden="true" className="pulse-dot size-2 bg-accent" />
              {ui.hero.statusOnline}
            </p>
            <p>
              <span className="text-ink-faint">{ui.hero.buildLabel}</span> <span className="tnum">{BUILD}</span>
            </p>
            <p>
              <span className="text-ink">{ui.hero.pressStart}</span>
              <span className="hide-touch"> · {ui.hero.keyboardHint}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
