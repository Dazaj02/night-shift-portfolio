import type { Locale, SectionId } from "@/types/portfolio";
import { portfolio } from "@/data/portfolio";
import { getUI, t } from "@/lib/i18n";
import { SectionLink } from "@/components/ui/SectionLink";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CurrentYear } from "./CurrentYear";

const socialIcon: Record<string, IconName> = {
  github: "github",
  linkedin: "linkedin",
  email: "mail",
};

export function SiteFooter({ lang }: { lang: Locale }) {
  const ui = getUI(lang);
  const { profile, nav, socials } = portfolio;
  const links = nav.filter((n) => n.id !== "inicio");

  return (
    <footer className="screen-flat border-t border-line bg-panel">
      <div className="wrap py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-3xl font-bold uppercase tracking-[0.04em] text-ink">
              {profile.name}
            </p>
            <p className="mt-2 text-ink-dim">{t(profile.role, lang)}</p>
            <p className="mt-6 max-w-[46ch] text-[0.9375rem] text-ink-dim">{ui.footer.note}</p>
          </div>

          <nav aria-label={ui.footer.navLabel} className="lg:col-span-3">
            <ul className="space-y-1">
              {links.map((l) => (
                <li key={l.id}>
                  <SectionLink
                    sectionId={l.id as SectionId}
                    className="inline-flex min-h-11 items-center text-ink-dim underline decoration-line transition-colors hover:text-ink hover:decoration-accent"
                  >
                    {t(l.label, lang)}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <ul aria-label={ui.footer.socialLabel} className="space-y-1">
              {socials.map((s) => {
                const icon = socialIcon[s.kind] ?? "arrow";
                return (
                  <li key={s.kind}>
                    {s.href ? (
                      <a
                        href={s.href}
                        {...(s.kind !== "email"
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="inline-flex min-h-11 items-center gap-3 text-ink-dim underline decoration-line transition-colors hover:text-ink hover:decoration-accent"
                      >
                        <Icon name={icon} size={18} />
                        <span>
                          {s.label}
                          {s.kind !== "email" && (
                            <span className="sr-only"> {ui.externalLink}</span>
                          )}
                        </span>
                      </a>
                    ) : (
                      <span
                        aria-disabled="true"
                        className="inline-flex min-h-11 items-center gap-3 text-ink-faint"
                      >
                        <Icon name={icon} size={18} />
                        <span>
                          {s.label} · {ui.comingSoon}
                        </span>
                      </span>
                    )}
                  </li>
                );
              })}
              <li>
                <a
                  href={profile.cvHref}
                  download
                  className="inline-flex min-h-11 items-center gap-3 text-ink-dim underline decoration-line transition-colors hover:text-ink hover:decoration-accent"
                >
                  <Icon name="download" size={18} />
                  <span>{ui.downloadCv}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-faint">
            &copy; <CurrentYear /> {profile.name}. {ui.footer.rights}.
          </p>
          <SectionLink
            sectionId="inicio"
            className="inline-flex min-h-11 items-center gap-2 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:text-accent"
          >
            <Icon name="up" size={16} />
            <span>{ui.footer.backToTop}</span>
          </SectionLink>
        </div>
      </div>
    </footer>
  );
}
