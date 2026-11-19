# David Aza — Portafolio (Night Shift)

Portafolio bilingüe (ES/EN) de una sola página: Next.js 16 (App Router, `cacheComponents`), TypeScript estricto y Tailwind CSS v4. Sin dependencias adicionales: animaciones con CSS y APIs nativas. El hero es una pantalla de título de videojuego con menú navegable por teclado.

> **English summary.** Bilingual one-page portfolio (`/es`, `/en`) built with Next.js 16, TypeScript and Tailwind CSS v4, fully static (SSG). Content lives in `src/data/portfolio.ts` and `src/data/ui.ts`; design tokens live in `src/app/globals.css`. Run `npm install && npm run dev`, deploy on Vercel with zero configuration. The look is inspired by cyberpunk aesthetics and is not affiliated with any video game.

## Requisitos

- Node.js 20.9 o superior
- npm

## Uso

```bash
npm install
npm run dev      # http://localhost:3000  (redirige a /es)
npm run build    # genera /es y /en como páginas estáticas
npm start        # sirve el build
npm run lint
```

`next/font/google` descarga las fuentes durante `build`; se requiere conexión a Internet.

## Estructura

```
src/
  app/
    [lang]/        layout (html, fuentes, metadata), page, opengraph-image, not-found
    globals.css    tokens (@theme), keyframes glitch, utilidades, superficies del navegador
    icon.svg       favicon
  components/
    layout/        SiteHeader, SiteFooter, SkipLink, LanguageSwitch, CurrentYear
    sections/      Hero, Arsenal, About, Projects, Testimonials, Experience, Learning, Contact
    ui/            Section, GlitchHeading, HeroTitle, GlitchImage, CutButton, Icon, TitleMenu,
                   BootScreen, MotionToggle, ThemeToggle, Reveal, ProjectMedia (visor),
                   ExperienceTabs, LearningBar, ProjectLinks, PlaceholderBadge, SectionLink
    contact/       ContactForm
  data/            portfolio.ts (contenido) y ui.ts (microcopy)
  lib/             i18n.ts, sections.ts, nav.ts, motion.ts, theme.ts, useScramble.ts
  types/           portfolio.ts (contrato de datos)
```

## Editar el contenido

- Todo el contenido está en `src/data/portfolio.ts`; los textos de interfaz en `src/data/ui.ts`. Cada texto tiene versión `es` y `en`.
- Los textos entre corchetes `[así]` son datos pendientes. Los elementos con `isPlaceholder: true` se muestran con la etiqueta visible "Ejemplo". Al poner datos reales, cambia `isPlaceholder` a `false`.
- Para activar un enlace de proyecto: en `links`, pon `href: "https://..."` y `status: "available"`. Con `status: "soon"` o `"private"` y `href: null` se muestra "Próximamente" o "Privado" (nunca un enlace roto). Igual con `socials`: un `href` no nulo habilita el enlace.
- CV: reemplaza `public/cv/david-aza-cv.pdf` (misma ruta y nombre).
- URL del sitio: `profile.siteUrl` (canonical, Open Graph, `metadataBase`). Correo: `profile.email` y el ítem `email` de `socials`.

## Cómo poner tus fotos

Sobrescribe el archivo **en la misma ruta, con el mismo nombre y extensión (.jpg)** y, en `src/data/portfolio.ts`, pon `isPlaceholder: false` en esa imagen (así desaparece el chip "Foto pendiente").

| Dónde | Ruta | Proporción |
|---|---|---|
| Retrato del hero | `public/images/profile.jpg` | 4:5 (p. ej. 800 x 1000) |
| Galería de Sobre mí | `public/images/about/about-01.jpg`, `about-02.jpg`, `about-03.jpg` | 4:3 (p. ej. 1200 x 900) |
| Portada de cada proyecto | `public/images/projects/<id>/cover.jpg` | 16:10 (p. ej. 1600 x 1000) |
| Capturas del visor | `public/images/projects/<id>/01.jpg`, `02.jpg`, `03.jpg` | 16:10 |

`<id>` es `gym-tracker`, `veltro` o `night-shift-portfolio`. Para añadir más capturas agrega otro objeto en `gallery` del proyecto. Actualiza también los textos `alt` y `caption`. Las imágenes se sirven con `next/image` (se optimizan solas).

## Efectos de movimiento

- El estado vive en `<html data-motion="on | soft | off">`. Por defecto es `on` (efectos completos). Si el sistema pide reducir movimiento (`prefers-reduced-motion`), pasa a `soft`: los mismos efectos con la mitad de amplitud, menor frecuencia y sin bandas a pantalla completa.
- El botón de pausa del encabezado (y del menú móvil) alterna entre `off` (todo detenido, scroll instantáneo) y el modo por defecto. La elección se guarda en `localStorage`.
- Efectos (menos es más): decodificado de texto en los títulos de sección (una vez por carga), glitch ambiental del nombre (cada ~8 s) y del retrato, aparición con micro-glitch de proyectos, testimonios, experiencia y "Aprendiendo ahora" (solo la primera vez que entran), micro-glitch suave en hover/foco, y un arranque solo en la primera visita absoluta (`localStorage`; se omite con cualquier tecla o clic). Cambiar de idioma no dispara ningún efecto. Ningún efecto supera 3 destellos por segundo.

## Modo claro / oscuro

- El botón sol/luna del encabezado (y del menú móvil) alterna el tema; se guarda en `localStorage` (`theme`). Sin preferencia guardada se usa `prefers-color-scheme`. El script inline de `src/lib/motion.ts` fija `<html data-theme="light|dark">` antes del primer pintado (sin parpadeo).
- La transición (~1,3 s, `startGlitch` en `src/lib/fx.ts`) corta el CONTENIDO en bloques desplazados (translateX alternado), cruza franjas RGB cian/rojo, ruido y un scanline, y cambia `data-theme` a mitad (540 ms). Solo anima transform/opacity (sin blur). Con los efectos en pausa el cambio es instantáneo; con `prefers-reduced-motion` es un velo suave.
- Los bloques oscuros `.screen` / `.screen-flat` (menú del hero, barra de datos, pie) conservan en modo claro la paleta Night Shift oscura: redefinen los tokens localmente.
- Todos los colores son variables en `src/app/globals.css` (`:root` oscuro y `[data-theme="light"]`). Para cambiar la paleta clara edita ese bloque; `volt` es relleno, `accent` es el amarillo cuando funciona como texto/borde/foco.

## Personalizar el diseño

Los tokens (colores, fuentes, easing) están en el bloque `@theme` de `src/app/globals.css`. Las fuentes se declaran en `src/app/[lang]/layout.tsx`. Los efectos glitch y el movimiento reducido (`prefers-reduced-motion`) están en la misma hoja de estilos.

## Despliegue en Vercel

1. Sube el repositorio a GitHub.
2. En Vercel: **Add New → Project → Import** y elige el repositorio.
3. Vercel detecta Next.js automáticamente; no cambies comandos.
4. No hay variables de entorno. Pulsa **Deploy**.
5. Cuando tengas el dominio final, actualiza `profile.siteUrl`.

## Nota

El diseño está inspirado en la estética cyberpunk. No usa logotipos, marcas ni recursos de ningún videojuego y no tiene afiliación con ellos.

## Glitch al pulsar secciones

Los enlaces del menú de título y del nav llaman a `goToSection` (`src/lib/sections.ts`): glitch de ~420 ms mientras se hace el scroll y, al llegar (`scrollend`), el título de la sección destino hace su scramble. Los títulos intermedios no se animan. Con `data-motion="off"` no hay efecto.
