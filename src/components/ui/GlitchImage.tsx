import Image from "next/image";
import { Icon } from "./Icon";

interface GlitchImageProps {
  src: string;
  alt: string;
  /** Proporción CSS (p. ej. "4 / 5"); sin ella la imagen llena el contenedor. */
  ratio?: string;
  sizes: string;
  priority?: boolean;
  /** Glitch ambiental periódico (retrato). Hover/foco siempre activan el glitch. */
  ambient?: boolean;
  /** Marco HUD con esquinas volt. */
  frame?: boolean;
  /** Etiqueta mono inferior (p. ej. ubicación). */
  label?: string;
  /** Texto del chip si la foto es provisional. */
  placeholderLabel?: string;
  className?: string;
}

/**
 * Imagen con capas RGB duplicadas (cyan/alert) que se desplazan en cortes:
 * ambiental opcional y siempre en hover/foco. Componente de servidor: el efecto es CSS.
 */
export function GlitchImage({
  src,
  alt,
  ratio,
  sizes,
  priority = false,
  ambient = false,
  frame = false,
  label,
  placeholderLabel,
  className = "",
}: GlitchImageProps) {
  const fill = { fill: true, sizes, className: "object-cover" } as const;
  return (
    <div
      className={`glitch-img ${ambient ? "glitch-img--ambient" : ""} ${ratio ? "" : "h-full w-full"} ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <Image src={src} alt={alt} priority={priority} {...fill} />
      <span aria-hidden="true" className="glitch-img__layer glitch-img__layer--a">
        <Image src={src} alt="" {...fill} />
      </span>
      <span aria-hidden="true" className="glitch-img__layer glitch-img__layer--b">
        <Image src={src} alt="" {...fill} />
      </span>
      <span aria-hidden="true" className="scanlines pointer-events-none absolute inset-0" />
      {frame && (
        <>
          <span aria-hidden="true" className="pointer-events-none absolute left-2.5 top-2.5 size-5 border-l-2 border-t-2 border-volt" />
          <span aria-hidden="true" className="pointer-events-none absolute right-2.5 top-2.5 size-5 border-r-2 border-t-2 border-volt" />
          <span aria-hidden="true" className="pointer-events-none absolute bottom-2.5 left-2.5 size-5 border-b-2 border-l-2 border-volt" />
          <span aria-hidden="true" className="pointer-events-none absolute bottom-2.5 right-2.5 size-5 border-b-2 border-r-2 border-volt" />
        </>
      )}
      {placeholderLabel && (
        <span className="absolute left-9 top-3 border border-alert bg-void px-2 py-0.5 font-mono text-[0.75rem] font-medium uppercase leading-none tracking-[0.12em] text-alert">
          {placeholderLabel}
        </span>
      )}
      {label && (
        <span className={`absolute bottom-3 flex max-w-[calc(100%-4.5rem)] items-center gap-2 bg-void/85 px-2.5 py-1.5 font-mono text-[0.75rem] text-ink-dim ${frame ? "left-9" : "left-3"}`}>
          <Icon name="pin" size={14} className="shrink-0 text-accent" />
          <span className="truncate">{label}</span>
        </span>
      )}
    </div>
  );
}
