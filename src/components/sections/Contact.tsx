import type { Locale, SocialKind } from "@/types/portfolio";
import { portfolio } from "@/data/portfolio";
import { getUI, t } from "@/lib/i18n";
import { sectionPosition } from "@/lib/nav";
import { Section } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { ContactForm } from "@/components/contact/ContactForm";

const icons: Partial<Record<SocialKind, IconName>> = {
  email: "mail",
  linkedin: "linkedin",
  github: "github",
};
const order: SocialKind[] = ["email", "linkedin", "github"];

export function Contact({ lang }: { lang: Locale }) {
  const ui = getUI(lang);
  const { profile, socials } = portfolio;
  const { index, total } = sectionPosition("contacto");
  const channels = order
    .map((k) => socials.find((s) => s.kind === k))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <Section id="contacto" title={ui.contact.title} index={index} total={total} lang={lang} sectionLabel={ui.sectionIndex}>
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <p className="measure -mt-4 text-lg text-ink-dim">{ui.contact.intro}</p>

          <p className="frame mt-8 p-6 text-xl font-medium leading-snug text-ink [--cut:18px] [--frame-line:var(--color-accent)]">
            {t(profile.availability, lang)}
          </p>

          <h3 className="mt-12 font-display text-xl font-bold uppercase tracking-[0.04em] text-ink">
            {ui.contact.channelsTitle}
          </h3>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {channels.map((c) => {
              const icon = icons[c.kind] ?? "arrow";
              const external = c.kind !== "email";
              return (
                <li key={c.kind}>
                  {c.href ? (
                    <a
                      href={c.href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex min-h-14 items-center gap-4 py-3 text-ink transition-colors hover:text-accent"
                    >
                      <Icon name={icon} size={22} />
                      <span className="font-display text-base font-semibold uppercase tracking-[0.05em]">
                        {c.label}
                        {external && <span className="sr-only"> {ui.externalLink}</span>}
                      </span>
                      <span className="ml-auto flex flex-wrap items-center justify-end gap-x-3 gap-y-1">
                        <span className="break-all font-mono text-[0.8125rem] text-ink-dim">{c.display}</span>
                        {c.isPlaceholder && <PlaceholderBadge label={ui.placeholderBadge} />}
                      </span>
                    </a>
                  ) : (
                    <div aria-disabled="true" className="flex min-h-14 items-center gap-4 py-3 text-ink-faint">
                      <Icon name={icon} size={22} />
                      <span className="font-display text-base font-semibold uppercase tracking-[0.05em]">
                        {c.label}
                      </span>
                      <span className="ml-auto text-sm">{ui.comingSoon}</span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-6">
          <h3 className="mb-6 font-display text-xl font-bold uppercase tracking-[0.04em] text-ink">
            {ui.contact.formTitle}
          </h3>
          <ContactForm
            email={profile.email}
            subject={lang === "es" ? "Contacto desde el portafolio" : "Contact from the portfolio"}
            labels={{
              name: ui.contact.name,
              email: ui.contact.email,
              message: ui.contact.message,
              submit: ui.contact.submit,
              hint: ui.contact.hint,
              errorRequired: ui.contact.errorRequired,
              errorEmail: ui.contact.errorEmail,
              success: ui.contact.success,
            }}
          />
        </div>
      </div>
    </Section>
  );
}
