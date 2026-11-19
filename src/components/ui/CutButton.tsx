import type { ReactNode } from "react";
import type { SectionId } from "@/types/portfolio";
import { SectionLink } from "./SectionLink";
import { Icon, type IconName } from "./Icon";

interface CutButtonProps {
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  href?: string;
  /** Enlace interno a una sección (con corte de navegación). */
  sectionId?: SectionId;
  download?: boolean;
  type?: "button" | "submit";
  icon?: IconName;
  className?: string;
  children: ReactNode;
}

export function cutButtonClass(
  variant: "primary" | "ghost" = "primary",
  size: "md" | "sm" = "md",
  extra = "",
) {
  return `frame btn-cut btn-cut--${variant} ${size === "sm" ? "btn-cut--sm" : ""} ${extra}`.trim();
}

export function CutButton({
  variant = "primary",
  size = "md",
  href,
  sectionId,
  download,
  type = "button",
  icon,
  className = "",
  children,
}: CutButtonProps) {
  const cls = cutButtonClass(variant, size, className);
  const content = (
    <>
      <span>{children}</span>
      {icon && <Icon name={icon} size={size === "sm" ? 16 : 18} />}
    </>
  );
  if (sectionId) {
    return (
      <SectionLink sectionId={sectionId} className={cls}>
        {content}
      </SectionLink>
    );
  }
  if (href) {
    return (
      <a href={href} download={download ? "" : undefined} className={cls}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={cls}>
      {content}
    </button>
  );
}
