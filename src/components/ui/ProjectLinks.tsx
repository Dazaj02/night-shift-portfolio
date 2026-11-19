import type { ProjectLink } from "@/types/portfolio";
import type { UIStrings } from "@/types/portfolio";
import { Icon, type IconName } from "./Icon";

const kindIcon: Record<ProjectLink["kind"], IconName> = {
  github: "github",
  vercel: "globe",
  demo: "play",
};

export function ProjectLinks({
  links,
  ui,
  projectTitle,
}: {
  links: ProjectLink[];
  ui: UIStrings;
  projectTitle: string;
}) {
  return (
    <ul className="flex flex-wrap gap-3" aria-label={`${ui.projects.title}: ${projectTitle}`}>
      {links.map((link) => {
        const label = ui.projects.links[link.kind];
        const icon = kindIcon[link.kind];
        if (link.status === "available" && link.href) {
          return (
            <li key={link.kind}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="frame btn-cut btn-cut--ghost btn-cut--sm"
              >
                <Icon name={icon} size={16} />
                <span>
                  {label}
                  <span className="sr-only"> {ui.externalLink}</span>
                </span>
                <Icon name="external" size={14} />
              </a>
            </li>
          );
        }
        const status =
          ui.projects.linkStatus[link.status === "private" ? "private" : "soon"];
        return (
          <li key={link.kind}>
            <span
              aria-disabled="true"
              className="inline-flex min-h-10 items-center gap-2 border border-dashed border-line px-3 py-1 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.06em] text-ink-faint"
            >
              <Icon name={link.status === "private" ? "lock" : icon} size={16} />
              <span>
                {label}
                <span className="font-body normal-case tracking-normal"> · {status}</span>
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
