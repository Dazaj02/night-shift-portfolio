/**
 * Contrato de datos del portafolio (definido por el orquestador).
 * Todo el contenido editable vive en src/data/portfolio.ts y src/data/ui.ts.
 */

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

/** Valor traducido a todos los idiomas soportados. */
export type Localized<T = string> = Record<Locale, T>;

export type SectionId =
  | "inicio"
  | "sobre-mi"
  | "proyectos"
  | "testimonios"
  | "experiencia"
  | "tecnologias"
  | "contacto";

/**
 * Imagen local servida desde /public. Para reemplazar una foto basta con
 * sobrescribir el archivo en la misma ruta (mismo nombre y extensión) y poner
 * isPlaceholder: false. width/height = proporción real del archivo.
 */
export interface ImageAsset {
  src: string;
  alt: Localized;
  width: number;
  height: number;
  /** Pie de foto opcional (galería de Sobre mí, capturas). */
  caption?: Localized;
  isPlaceholder: boolean;
}

export interface Stat {
  id: string;
  value: string;
  label: Localized;
}

export interface TechItem {
  id: string;
  name: string;
  /** Otros nombres con los que aparece en `Project.tech` (para calcular dónde se usó). */
  aliases?: string[];
  desc: Localized;
}

export interface TechGroup {
  id: string;
  label: Localized;
  items: TechItem[];
}

export interface NavItem {
  id: SectionId;
  /** Etiqueta clara del menú de navegación (p. ej. "Proyectos"). */
  label: Localized;
  /** Etiqueta estilo videojuego para el menú de la pantalla de título (p. ej. "Continuar"). */
  menuLabel: Localized;
  /** Descripción corta que aparece junto al ítem enfocado del menú de título. */
  menuHint: Localized;
}

export type LinkStatus = "available" | "soon" | "private";
export type ProjectLinkKind = "github" | "vercel" | "demo";

export interface ProjectLink {
  kind: ProjectLinkKind;
  /** null cuando status !== "available". Nunca inventar URLs. */
  href: string | null;
  status: LinkStatus;
}

export interface Project {
  id: string;
  title: Localized;
  summary: Localized;
  role: Localized;
  outcome?: Localized;
  /** Contexto ampliado: se muestra en la pantalla emergente del proyecto. */
  details?: {
    /** El problema o reto que motivó el proyecto. */
    problem: Localized;
    /** La idea: qué es y qué propone. */
    idea: Localized;
    /** Para quién es. */
    audience: Localized;
    /** Cómo funciona / cómo se usa, desde el punto de vista de quien lo usa. */
    how: Localized<string[]>;
    /** Cómo está construido (decisiones técnicas). */
    build: Localized<string[]>;
    /** Enlaces relacionados (por ejemplo, el repositorio de la API). */
    related?: { label: Localized; href: string }[];
  };
  tech: string[];
  year: string;
  /** Estado de la "misión", p. ej. "En desarrollo" / "Completado". */
  status: Localized;
  links: [ProjectLink, ProjectLink, ProjectLink];
  /** Plataforma, p. ej. "Web", "Android + API". */
  platform: Localized;
  /** Equipo, p. ej. "Equipo de 3"; omitir si es individual. */
  team?: Localized;
  /** true = proyecto principal (panel grande); false = lista compacta "Otros proyectos". */
  featured: boolean;
  /** Contexto académico o de equipo, p. ej. "Diseño de Interfaces · UCC". */
  context?: Localized;
  /** Portada 16:10 del proyecto. */
  cover: ImageAsset;
  /** Capturas adicionales (16:10) que se abren en el visor. */
  gallery: ImageAsset[];
  isPlaceholder: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: Localized;
  relation: Localized;
  context?: Localized;
  /** Sin `quote` = testimonio pendiente (se muestra una casilla vacía). */
  quote?: Localized;
  /** URL de LinkedIn de la persona; null = pendiente de recibirla (se muestra "Próximamente"). */
  linkedin?: string | null;
  /** true = ejemplo; debe mostrarse con una etiqueta visible "Ejemplo". */
  isPlaceholder: boolean;
}

export type ExperienceKind = "work" | "education";

export interface ExperienceItem {
  id: string;
  kind: ExperienceKind;
  title: Localized;
  organization: string;
  period: Localized;
  location?: Localized;
  highlights: Localized<string[]>;
  tech?: string[];
  isPlaceholder: boolean;
}

export type SocialKind = "github" | "linkedin" | "email" | "phone" | "other";

export interface SocialLink {
  kind: SocialKind;
  label: string;
  /** null = aún no definido (se muestra deshabilitado con "Próximamente"). */
  href: string | null;
  display: string;
  isPlaceholder: boolean;
}

export interface Profile {
  name: string;
  /** Alias corto para el HUD, p. ej. "D.AZA". */
  handle: string;
  role: Localized;
  location: Localized;
  valueProp: Localized;
  bioShort: Localized;
  bioLong: Localized<string[]>;
  interests: Localized<string[]>;
  approach: Localized<string[]>;
  availability: Localized;
  email: string;
  /** Ruta pública al CV, p. ej. "/cv/david-aza-cv.pdf". */
  cvHref: string;
  /** URL canónica del sitio desplegado (sin barra final). */
  siteUrl: string;
  /** Retrato 4:5 del hero. */
  photo: ImageAsset;
  /** Cifras cortas del HUD del hero (semestre, proyectos, plataformas). */
  stats: Stat[];
}

export interface PortfolioData {
  profile: Profile;
  nav: NavItem[];
  projects: Project[];
  testimonials: Testimonial[];
  experience: ExperienceItem[];
  stack: TechGroup[];
  /** Galería de Sobre mí (espacio de trabajo, intereses), 3 fotos. */
  gallery: ImageAsset[];
  socials: SocialLink[];
}

/** Textos de interfaz (microcopy). Un objeto por idioma en src/data/ui.ts. */
export interface UIStrings {
  meta: { title: string; description: string; ogAlt: string };
  skipToContent: string;
  navLabel: string;
  openMenu: string;
  closeMenu: string;
  languageSwitch: string;
  /** Nombre del otro idioma, mostrado en el selector (p. ej. "English"). */
  otherLanguageName: string;
  downloadCv: string;
  viewProjects: string;
  contactCta: string;
  hero: {
    availability: string;
    menuLabel: string;
    pressStart: string;
    keyboardHint: string;
    statusOnline: string;
    buildLabel: string;
    locationLabel: string;
    quickLinksLabel: string;
  };
  about: {
    title: string;
    galleryTitle: string;
    interestsTitle: string;
    approachTitle: string;
  };
  projects: {
    title: string;
    intro: string;
    moreTitle: string;
    role: string;
    outcome: string;
    tech: string;
    status: string;
    year: string;
    platform: string;
    team: string;
    /** "{n} capturas" — {n} se reemplaza por el número. */
    capturesCount: string;
    openGallery: string;
    detailsOpen: string;
    detailsDialog: string;
    detailsClose: string;
    detailsProblem: string;
    detailsIdea: string;
    detailsAudience: string;
    detailsHow: string;
    detailsBuild: string;
    detailsRelated: string;
    links: Record<ProjectLinkKind, string>;
    linkStatus: Record<Exclude<LinkStatus, "available">, string>;
  };
  placeholderBadge: string;
  placeholderNote: string;
  testimonials: { title: string; intro: string; empty: string };
  stack: { title: string; intro: string; usedIn: string; noProject: string };
  gallery: {
    dialogLabel: string;
    close: string;
    next: string;
    prev: string;
    /** "{n} de {total}" */
    counter: string;
  };
  photoPlaceholder: string;
  motion: { pause: string; play: string; label: string };
  theme: { toLight: string; toDark: string; label: string };
  experience: { title: string; intro: string; work: string; education: string };
  contact: {
    title: string;
    intro: string;
    channelsTitle: string;
    formTitle: string;
    name: string;
    email: string;
    message: string;
    submit: string;
    hint: string;
    errorRequired: string;
    errorEmail: string;
    success: string;
  };
  footer: {
    note: string;
    navLabel: string;
    socialLabel: string;
    backToTop: string;
    rights: string;
  };
  sectionIndex: string;
  externalLink: string;
  comingSoon: string;
}
