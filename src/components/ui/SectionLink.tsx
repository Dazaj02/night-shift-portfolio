"use client";

import type { AnchorHTMLAttributes, MouseEvent, Ref } from "react";
import type { SectionId } from "@/types/portfolio";
import { goToSection } from "@/lib/sections";

interface SectionLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  sectionId: SectionId;
  ref?: Ref<HTMLAnchorElement>;
}

/** Enlace a una sección de la misma página con corte de navegación y scroll controlado. */
export function SectionLink({
  sectionId,
  onClick,
  children,
  ref,
  ...rest
}: SectionLinkProps) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    )
      return;
    if (goToSection(sectionId)) e.preventDefault();
  }
  return (
    <a ref={ref} href={`#${sectionId}`} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
