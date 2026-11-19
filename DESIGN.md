# Design — "Night Shift" (dirección visual)

Mundo comprometido: interfaz de un videojuego de ciencia ficción urbana nocturna, inspirado en Cyberpunk 2077 sin copiar marcas, logotipos, iconos ni pantallas del juego. El sitio es **una pantalla de título que se convierte en HUD**: el hero es el menú principal; al desplazarse, cada sección entra como si el juego cargara un nuevo panel, con un glitch breve.

Modo de superficie (Impeccable): **Experience** con una capa de **Read** en las secciones de contenido. El primer viewport es pura identidad; el resto prioriza el escaneo.

## Tokens de color (oscuro por defecto; el modo claro está al final de esta sección)

| Token | Valor | Uso | Contraste sobre `void` |
|---|---|---|---|
| `void` | `#0A0A0C` | Fondo base | — |
| `panel` | `#141418` | Superficies elevadas, bandas | — |
| `line` | `#2A2A31` | Divisores, bordes de 1px | — |
| `ink` | `#E8E6E3` | Texto principal | 15.9:1 |
| `ink-dim` | `#A8A49A` | Texto secundario (cálido, nunca gris neutro) | 7.9:1 |
| `ink-faint` | `#8C887F` | Metadatos mínimos (≥14px) | 5.6:1 |
| `volt` | `#FCEE0A` | Color principal: CTAs, sección activa, foco, selección | 16.4:1 |
| `volt-ink` | `#0A0A0C` | Texto sobre `volt` | 16.4:1 |
| `cyan` | `#00F0FF` | Acento de datos y enlaces secundarios; canal del split RGB | 14.0:1 |
| `alert` | `#FF3355` | Errores, etiqueta "EJEMPLO"; canal del split RGB | 5.5:1 |

### Modo claro (`[data-theme="light"]`)

| Token | Valor | Contraste sobre `void` / `panel` |
|---|---|---|
| `void` | `#F2EFE6` | — |
| `panel` | `#E8E4D8` | — |
| `line` | `#CFC9B8` | — |
| `ink` | `#14141A` | 16.0 / 14.4 |
| `ink-dim` | `#4A463C` | 8.2 / 7.4 |
| `ink-faint` | `#5C574A` | 6.3 / 5.7 |
| `accent` (volt como texto/borde/foco) | `#6E6200` | 5.4 / 4.8 |
| `cyan` | `#00707A` | 5.1 / 4.6 |
| `alert` | `#C2003A` | 5.4 / 4.9 |
| `volt` (solo relleno, texto `volt-ink` `#14141A`) | `#FCEE0A` | 15.2 sobre el relleno |

El amarillo puro solo aparece como relleno de botones y bloques con texto oscuro; como texto o línea se usa `accent`. Scanlines y ruido son más sutiles. Las imágenes y capturas no cambian. Todo color de componente sale de variables (`--c-*`); no hay valores fijos en los componentes.

Reglas: sin gradientes morado-azul, sin texto con gradiente, sin glow de halo sin offset. El amarillo se usa en bloques sólidos (botones con esquina cortada, barra de sección activa), no como neón difuso.

## Tipografía

- Display: **Chakra Petch** 600/700, mayúsculas en títulos de sección, tracking 0.02em; máx. `clamp(3rem, 11vw, 6rem)` en el nombre.
- Cuerpo: **IBM Plex Sans** 400/500, 1rem–1.125rem, medida 65–72ch, interlineado 1.6.
- Datos: **JetBrains Mono** 400/500 solo para datos reales del HUD (fechas, stack, coordenadas, códigos de estado, contador de sección). Nunca para párrafos.
- Prohibido: kicker/eyebrow sobre encabezados. El título habla solo.

## Forma y materia

- Esquinas cortadas a 45° con `clip-path: polygon(...)` en botones, paneles de proyecto y marcos de imagen (la firma geométrica del mundo). Radio de borde 0.
- Líneas de 1px `line` y retículas de escaneo (scanlines) muy tenues en el hero; ruido de pantalla con un SVG `feTurbulence` inline a 4–6% de opacidad.
- Sin tarjetas anidadas. Proyectos = paneles anchos en fila alterna (visual + ficha técnica), no rejilla de tarjetas iguales.
- Iconos: SVG propios, trazo 1.5px, una sola familia (GitHub, LinkedIn, mail, descarga, flecha, externo, menú, cerrar).

## Movimiento (el momento autoral)

1. **Glitch de transición de sección**: al entrar una sección al viewport (IntersectionObserver, una sola vez), su título se rearma en 3–4 cortes horizontales con `clip-path` + desplazamiento RGB (cyan/alert) durante ~450ms, termina estable. El contenido parte ya visible (sin fade desde 0).
2. **Corte de navegación**: al hacer clic en un enlace del menú, una franja de "tearing" (2–3 bandas) cruza la pantalla ~280ms mientras ocurre el scroll suave.
3. **Hover en menú de título**: el ítem enfocado/hover recibe el bloque `volt`, un cursor `>` dibujado y un micro-glitch de 160ms.
4. Nombre del hero: glitch ambiental cada ~6s, ≤2 destellos por ciclo (cumple el umbral de 3 destellos/s).

Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (exponencial out). Nunca bounce. `prefers-reduced-motion: reduce` → sin glitch, sin tearing, scroll instantáneo; los estados finales se muestran directamente.

## Superficies del navegador

`::selection` volt/void, `caret-color` volt, scrollbar fino `line`/`volt`, `:focus-visible` contorno 2px volt con offset 3px, `text-underline-offset` 0.25em, `font-variant-numeric: tabular-nums` en fechas y contadores.

## Composición

- Hero (pantalla de título): nombre gigante a la izquierda, menú vertical de juego a la derecha/abajo (Continuar → Proyectos, Perfil → Sobre mí, Registro → Experiencia, Transmisiones → Testimonios, Contacto, Descargar CV), barra inferior de HUD con ubicación, versión y "PRESIONA ↵". Navegable con flechas.
- Nav: barra HUD fija superior, fina; enlace activo con barra `volt` inferior y `aria-current`. En móvil, botón de menú que abre un panel a pantalla completa con foco atrapado y Esc.
- Secciones: título a la izquierda con un indicador de índice del HUD en mono a la derecha (`SEC 03/06` comunica posición en la página → justificado).

## Movimiento v2 (sustituye las reglas de reduced-motion de arriba)

El glitch es la firma del sitio y **nunca se apaga solo**: `prefers-reduced-motion` ya no lo desactiva. El estado vive en `<html data-motion>`:

- `on`: efectos completos.
- `soft`: se activa con `prefers-reduced-motion: reduce`. Mismas animaciones, amplitud a la mitad (`--amp: 0.5`), frecuencia menor (ambiental 14 s, imágenes 16 s), sin bandas de pantalla completa y con fundido simple en la transición de tema.
- `off`: botón de pausa del encabezado (persistido en `localStorage`). Nada se mueve y el scroll es instantáneo.

Efectos v3 (en `on`, tras la revisión "menos animación"): decodificado/scramble en h2 de sección (una vez por carga); nombre del hero con ráfagas cada ~8 s y capas RGB de ±12 px; imágenes con capas cyan/alert (ambiental cada 8 s en el retrato; una sola pasada de 500 ms en hover/foco); aparición (opacity + translate + clip-path, 450 ms, escalonada 70 ms, micro-glitch de 150 ms al final, solo la primera vez) de paneles de proyecto, filas de "Otros proyectos", testimonios, ítems de experiencia y de aprendizaje; micro-glitch suave de 200 ms en botones y titulares; arranque de <=1 s solo en la primera visita absoluta. Eliminados: glitch por scroll, corte de navegación, barrido de sección. Cambiar de idioma no dispara ninguno. Transición de tema (v4): ~1,3 s sobre el contenido real (secciones con translateX alternado en 3 cortes, franjas RGB/ruido, scanline, `data-theme` a 540 ms), solo transform/opacity; los saltos de sección (menú del hero y nav) lanzan el mismo glitch en ~420 ms y el título destino hace scramble al llegar. Rendimiento: portadas con fondo de miniatura de 32 px ampliada (sin `filter: blur` en vivo), retícula animada con transform, transiciones de color desactivadas durante el cambio de tema. Límite de seguridad: ningún efecto supera 3 destellos por segundo.


### Modo claro v4 (identidad Night Shift en día)

Volt como superficie: pestaña activa del nav, bloque bajo el título de sección, índice `NN/07`, chip de disponibilidad, botón principal con sombra desplazada y franjas de advertencia de 14 px (volt/tinta). Paneles de proyecto con borde de tinta y `drop-shadow` desplazado; patrón de puntos en el fondo; retícula del hero en tinta; esquinas HUD en tinta. Bloques `.screen`: menú del hero, barra de datos y pie son "pantallas" oscuras con la paleta oscura original (contraste AA idéntico al modo oscuro). Marcadores de lista en cian oscuro #00707A.
