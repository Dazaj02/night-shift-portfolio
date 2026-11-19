import type { SVGProps } from "react";

export type IconName =
  | "github"
  | "linkedin"
  | "mail"
  | "download"
  | "arrow"
  | "external"
  | "menu"
  | "close"
  | "up"
  | "globe"
  | "play"
  | "lock"
  | "pause"
  | "pin"
  | "sun"
  | "moon";

/** Familia de iconos propia: viewBox 24, trazo 1.5, terminales cuadrados. */
const paths: Record<IconName, React.ReactNode> = {
  // Rama de control de versiones (no es el logotipo de ninguna marca)
  github: (
    <>
      <circle cx="6" cy="5.5" r="2.25" />
      <circle cx="6" cy="18.5" r="2.25" />
      <circle cx="18" cy="9" r="2.25" />
      <path d="M6 7.75v8.5M18 11.25c0 3.8-3.6 4.6-8 5.3-1.4.2-2.6.6-3.6 1.1" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" />
      <path d="M8 10.5v6M8 7.5v.5M12 16.5v-6M12 13c0-1.7 1.2-2.5 2.6-2.5 1.5 0 2.4.9 2.4 2.7v3.3" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" />
      <path d="m3 6.5 9 6.5 9-6.5" />
    </>
  ),
  download: <path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" />,
  arrow: <path d="M4 12h15M13.5 6l6 6-6 6" />,
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  up: <path d="M12 20V5M6 11l6-6 6 6" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.6 2.4 3.6 5.2 3.6 8.5s-1 6.1-3.6 8.5c-2.6-2.4-3.6-5.2-3.6-8.5s1-6.1 3.6-8.5Z" />
    </>
  ),
  play: <path d="M8 5v14l11-7z" />,
  pause: <path d="M8 5v14M16 5v14" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />
    </>
  ),
  moon: <path d="M20 14.2A8.5 8.5 0 0 1 9.8 4 8.5 8.5 0 1 0 20 14.2Z" />,
  pin: (
    <>
      <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.25" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 20, className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
