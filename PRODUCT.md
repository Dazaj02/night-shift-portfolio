# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router) + TypeScript estricto + Tailwind CSS v4, desplegado en Vercel. Sin dependencias adicionales: animaciones con CSS y APIs nativas del navegador (IntersectionObserver, matchMedia). Fuentes vía `next/font` (incluido en Next.js).

## Users

- Reclutadores y líderes técnicos (hispanohablantes e internacionales) que evalúan en 1–3 minutos si David encaja en un rol backend o mobile.
- Profesores y compañeros del curso Diseño de Interfaces que revisan el portafolio como entrega académica.
- Clientes potenciales de proyectos freelance que necesitan entender qué construye David y cómo contactarlo.

## Product Purpose

Portafolio personal de una sola página que presenta a David Aza como desarrollador enfocado en backend (Spring Boot, MongoDB) y mobile (Android nativo). Éxito: el visitante entiende el perfil en el primer viewport, encuentra al menos un proyecto con enlaces verificables y llega a un canal de contacto o al CV en menos de dos clics.

## Positioning

Un desarrollador que piensa en arquitectura completa —del modelo de datos y la API hasta el cliente Android— y lo documenta con rigor (diagramas UML2 de contexto, componentes, clases, implementación y despliegue). El portafolio demuestra criterio de interfaz además de backend.

## Operating Context

- Se visita desde enlaces en CV, LinkedIn y GitHub; tanto en desktop como en móvil.
- Bilingüe ES/EN: rutas `/es` y `/en`; español por defecto.
- El contenido se actualiza editando `src/data/portfolio.ts` y `src/data/ui.ts`, sin tocar componentes.

## Capabilities and Constraints

- Secciones obligatorias, en orden: Navegación, Inicio (hero), Sobre mí, Proyectos, Testimonios, Experiencia (laboral y académica), Contacto, Pie de página.
- Cada proyecto expone tres enlaces (GitHub, Vercel, Demo); si no existe, se muestra "Próximamente" o "Privado", nunca una URL inventada.
- Formulario de contacto sin backend: compone un `mailto:`.
- Sin base de datos, CMS, analíticas ni servicios externos.

## Brand Commitments

- Nombre: David Aza.
- Dirección visual fijada por el usuario: universo Cyberpunk 2077 (inspiración, sin logotipos, marcas ni assets del juego), efecto glitch al desplazarse entre secciones, hero planteado como pantalla de inicio de un videojuego con su menú de apartados.
- Paleta: negro carbón, amarillo eléctrico #FCEE0A principal, cian #00F0FF y rojo #FF003C como acentos.
- Tipografía: Chakra Petch (display), IBM Plex Sans (cuerpo), JetBrains Mono (datos del HUD).
- Solo modo oscuro. Sin emojis. Tono técnico con guiños de videojuego.

## Evidence on Hand

- Proyecto real confirmado: Gym Tracker / Gestor de Entrenamientos — backend Spring Boot + MongoDB consumido por un cliente Android nativo, documentado con cinco diagramas PlantUML (Contexto, Funcional/Componentes, Lógico/Clases, Implementación, Despliegue).
- Aún NO existen: testimonios reales, experiencia laboral verificada, datos académicos completos, URLs de repositorios o despliegues, CV en PDF, foto. Todo ello va como placeholder visiblemente marcado y no debe presentarse como real.

## Product Principles

1. Claridad antes que espectáculo: el universo cyberpunk envuelve la información, nunca la oculta.
2. Honestidad del contenido: ningún placeholder se lee como dato real.
3. Arquitectura visible: los proyectos muestran rol, decisiones y stack, no solo capturas.
4. Editable sin código: todo el contenido vive en archivos de datos tipados.

## Accessibility & Inclusion

WCAG 2.2 AA: contraste ≥4.5:1 en texto, foco visible, navegación completa por teclado, `prefers-reduced-motion` desactiva glitch y parpadeos (ningún destello supera 3 por segundo), HTML semántico con jerarquía de encabezados correcta, `lang` correcto por ruta.
