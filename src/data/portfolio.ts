import type { PortfolioData } from "@/types/portfolio";

/**
 * Contenido editable del portafolio.
 * - isPlaceholder: true = texto o imagen de muestra; se marca visiblemente como "Ejemplo" / "Foto pendiente".
 * - Textos entre corchetes [así] = reemplazar por datos reales.
 * - Imágenes: sobrescribe el archivo en la misma ruta de /public y pon isPlaceholder en false.
 * - href null = aún no disponible (se muestra "Próximamente" o "Privado").
 */
export const portfolio: PortfolioData = {
  profile: {
    name: "David Aza",
    handle: "D.AZA",
    role: {
      es: "Desarrollador Full Stack",
      en: "Full Stack Developer",
    },
    location: {
      es: "Pasto, Nariño · CO",
      en: "Pasto, Nariño · CO",
    },
    valueProp: {
      es: "Construyo productos completos: APIs y bases de datos, apps web, Android, Wear OS y de escritorio, de la arquitectura a la interfaz.",
      en: "I build complete products: APIs and databases, web, Android, Wear OS and desktop apps, from architecture to interface.",
    },
    bioShort: {
      es: "Desarrollador full stack enfocado en arquitectura de punta a punta: del modelo de datos y la API hasta la interfaz en web, móvil, reloj o escritorio. Documento mis decisiones con diagramas UML2.",
      en: "Full stack developer focused on end-to-end architecture: from the data model and the API to the interface on web, mobile, watch or desktop. I document my decisions with UML2 diagrams.",
    },
    bioLong: {
      es: [
        "Me interesa cómo encajan las piezas de un sistema: el modelo de datos, la API que lo expone y la aplicación que lo usa. En el backend trabajo con Spring Boot, Node (Hono), MongoDB y Supabase; en el cliente, con React, Next.js, React Native, Kotlin y JavaFX.",
        "Antes de escribir código modelo los datos y los contratos de la API. Después documento la arquitectura con diagramas UML2 de contexto, componentes, clases, implementación y despliegue, para que cualquiera pueda entender el sistema sin leer todo el código.",
        "Estudio Ingeniería de Software en la Universidad Cooperativa de Colombia, campus Pasto, y estoy en quinto semestre. Cursar Diseño de Interfaces me ayuda a pensar también en la experiencia de quien usa lo que construyo.",
      ],
      en: [
        "I care about how the pieces of a system fit together: the data model, the API that exposes it and the app that uses it. On the backend I work with Spring Boot, Node (Hono), MongoDB and Supabase; on the client, with React, Next.js, React Native, Kotlin and JavaFX.",
        "Before writing code I model the data and the API contracts. Then I document the architecture with UML2 diagrams of context, components, classes, implementation and deployment, so anyone can understand the system without reading every line.",
        "I study Software Engineering at Universidad Cooperativa de Colombia, Pasto campus, and I am in my fifth semester. Taking Interface Design helps me think about the experience of the people who use what I build.",
      ],
    },
    interests: {
      es: [
        "Arquitectura de APIs REST y modelado de datos",
        "Desarrollo nativo para Android",
        "Documentación técnica con UML2 y PlantUML",
        "Interfaces claras que se entienden en el primer vistazo",
      ],
      en: [
        "REST API architecture and data modeling",
        "Native Android development",
        "Technical documentation with UML2 and PlantUML",
        "Clear interfaces that make sense at first glance",
      ],
    },
    approach: {
      es: [
        "Modelar datos y contratos antes de escribir código",
        "Documentar la arquitectura con diagramas UML2",
        "Separar responsabilidades para que el sistema crezca sin romperse",
        "Mantener cada capa comprensible para quien llega después",
      ],
      en: [
        "Model the data and the contracts before writing code",
        "Document the architecture with UML2 diagrams",
        "Separate responsibilities so the system can grow without breaking",
        "Keep every layer understandable for whoever comes next",
      ],
    },
    availability: {
      es: "Abierto a prácticas profesionales, primeras oportunidades laborales y proyectos freelance full stack.",
      en: "Open to internships, first full-time roles and freelance full stack projects.",
    },
    email: "david.aza.dev@gmail.com",
    cvHref: "/cv/david-aza-cv.pdf",
    siteUrl: "https://david-aza-portfolio.vercel.app",
    photo: {
      src: "/images/profile.jpg",
      alt: {
        es: "Retrato de David Aza",
        en: "Portrait of David Aza",
      },
      width: 800,
      height: 1000,
      isPlaceholder: false,
    },
    stats: [
      {
        id: "semestre",
        value: "5.º",
        label: { es: "Semestre", en: "Semester" },
      },
      {
        id: "proyectos",
        value: "6",
        label: { es: "Proyectos", en: "Projects" },
      },
      {
        id: "plataformas",
        value: "Web · Android · Wear OS · Desktop",
        label: { es: "Plataformas", en: "Platforms" },
      },
    ],
  },

  nav: [
    {
      id: "inicio",
      label: { es: "Inicio", en: "Home" },
      menuLabel: { es: "Menú principal", en: "Main menu" },
      menuHint: {
        es: "Pantalla de inicio: resumen de David y accesos rápidos",
        en: "Title screen: David's summary and quick links",
      },
    },
    {
      id: "sobre-mi",
      label: { es: "Sobre mí", en: "About" },
      menuLabel: { es: "Perfil", en: "Profile" },
      menuHint: {
        es: "Quién soy, en qué trabajo y cómo lo hago",
        en: "Who I am, what I build and how I work",
      },
    },
    {
      id: "proyectos",
      label: { es: "Proyectos", en: "Projects" },
      menuLabel: { es: "Continuar: misiones", en: "Continue: missions" },
      menuHint: {
        es: "Proyectos con rol, decisiones y stack",
        en: "Projects with role, decisions and stack",
      },
    },
    {
      id: "testimonios",
      label: { es: "Testimonios", en: "Testimonials" },
      menuLabel: { es: "Transmisiones", en: "Transmissions" },
      menuHint: {
        es: "Opiniones de docentes, compañeros y clientes",
        en: "Feedback from teachers, peers and clients",
      },
    },
    {
      id: "experiencia",
      label: { es: "Formación", en: "Education" },
      menuLabel: { es: "Registro", en: "Log" },
      menuHint: {
        es: "Mi formación académica",
        en: "My academic background",
      },
    },
    {
      id: "tecnologias",
      label: { es: "Tecnologías", en: "Technologies" },
      menuLabel: { es: "Inventario", en: "Inventory" },
      menuHint: {
        es: "Todo lo que he usado en mis proyectos, con su descripción",
        en: "Everything I have used across my projects, with descriptions",
      },
    },
    {
      id: "contacto",
      label: { es: "Contacto", en: "Contact" },
      menuLabel: { es: "Abrir canal", en: "Open channel" },
      menuHint: {
        es: "Escríbeme o descarga el CV",
        en: "Send a message or download the CV",
      },
    },
  ],

  projects: [
    {
      id: "focusread",
      title: { es: "FocusRead AI", en: "FocusRead AI" },
      summary: {
        es: "App Android que divide textos largos en micro-dosis de lectura de 1,5 a 3,5 minutos, con resumen y quiz generados por IA, lectura en voz alta y seguimiento de progreso. Funciona sin conexión con los artículos ya abiertos.",
        en: "Android app that splits long texts into 1.5–3.5 minute reading micro-doses, with AI-generated summaries and quizzes, text-to-speech and progress tracking. Works offline with articles already opened.",
      },
      role: {
        es: "Desarrollo completo: app Android, API y base de datos",
        en: "End-to-end development: Android app, API and database",
      },
      outcome: {
        es: "API propia (Hono) como pasarela de IA multi-proveedor con cuota diaria, rate limit y extracción de texto desde URLs protegida contra SSRF; login real con Supabase Auth y políticas RLS; caché SQLite y cola de sincronización para el modo offline.",
        en: "Own API (Hono) as a multi-provider AI gateway with daily quota, rate limiting and SSRF-safe URL text extraction; real login with Supabase Auth and RLS policies; SQLite cache and sync queue for offline mode.",
      },
      details: {
        problem: {
          es: "Leer un texto largo de una sola vez cansa y es fácil abandonarlo a la mitad. El prototipo original de FocusRead ya probaba la idea, pero llamaba a la IA directo desde la app con una API key guardada en claro y tenía un login simulado: había que rehacerlo bien.",
          en: "Reading a long text in one go is tiring and easy to abandon halfway. The original FocusRead prototype proved the idea, but it called the AI straight from the app with a key stored in plain text and had a simulated login: it needed to be rebuilt properly.",
        },
        idea: {
          es: "Partir cada texto en micro-dosis de 1,5 a 3,5 minutos, que caben en una pausa corta, y acompañarlas con un resumen y un quiz generados por IA, lectura en voz alta y un registro del progreso diario.",
          en: "Split every text into 1.5 to 3.5 minute micro-doses that fit a short break, and pair them with an AI-generated summary and quiz, text-to-speech and a daily progress record.",
        },
        audience: {
          es: "Personas que leen artículos o textos largos desde el celular y quieren avanzar en ratos cortos, comprobando que entendieron lo leído.",
          en: "People who read articles or long texts on their phone and want to make progress in short sessions while checking they understood what they read.",
        },
        how: {
          es: [
          "Se agrega un artículo (por ejemplo desde una URL) y la API lo procesa: extrae el texto, lo divide en dosis y genera resumen y quiz.",
          "La biblioteca ordena los artículos por categoría y muestra el progreso del día.",
          "El lector muestra primero el resumen y luego cada dosis; al terminar, un quiz comprueba lo leído. Tiene tema claro y oscuro.",
          "Los artículos ya abiertos se pueden leer sin conexión; el progreso se sincroniza al volver la red.",
        ],
          en: [
          "You add an article (for example from a URL) and the API processes it: it extracts the text, splits it into doses and generates the summary and quiz.",
          "The library groups articles by category and shows the day's progress.",
          "The reader shows the summary first and then each dose; at the end, a quiz checks what you read. It has light and dark themes.",
          "Articles already opened can be read offline; progress syncs when the connection returns.",
        ],
        },
        build: {
          es: [
          "Tres capas con dueños separados: app (React Native + Expo), API propia en Hono y Supabase (PostgreSQL) con políticas RLS.",
          "La API es la única que habla con los proveedores de IA: la clave del servicio vive solo en el servidor y la clave propia del usuario solo existe en memoria durante la petición. La extracción desde URLs está protegida contra SSRF y hay cuota diaria y rate limit.",
          "Login real con Supabase Auth y verificación de correo; navegación de 3 pestañas (Biblioteca, Progreso y Ajustes) con el lector a pantalla completa.",
          "Modo offline: caché en SQLite y una cola local que sincroniza el progreso. Rediseño con sistema de diseño atómico y tokens en tres niveles.",
        ],
          en: [
          "Three layers with separate owners: app (React Native + Expo), own Hono API and Supabase (PostgreSQL) with RLS policies.",
          "The API is the only piece that talks to AI providers: the service key lives only on the server and the user's own key only exists in memory during the request. URL extraction is SSRF-safe and there is a daily quota and rate limit.",
          "Real login with Supabase Auth and email verification; 3-tab navigation (Library, Progress and Settings) with a full-screen reader.",
          "Offline mode: SQLite cache and a local queue that syncs progress. Redesigned with an atomic design system and three-level tokens.",
        ],
        },
        related: [
          { label: { es: "Repositorio de la API (back-mobile)", en: "API repository (back-mobile)" }, href: "https://github.com/Dazaj02/back-mobile" },
        ],
      },
      tech: ["React Native", "Expo", "TypeScript", "Hono", "Node.js", "Supabase", "PostgreSQL", "SQLite", "React Query"],
      year: "2026",
      status: { es: "En desarrollo", en: "In development" },
      links: [
        { kind: "github", href: "https://github.com/Dazaj02/front-mobile", status: "available" },
        { kind: "vercel", href: null, status: "soon" },
        { kind: "demo", href: null, status: "soon" },
      ],
      platform: { es: "Android + API", en: "Android + API" },
      featured: true,
      context: { es: "Diseño de Interfaces · Universidad Cooperativa de Colombia", en: "Interface Design · Universidad Cooperativa de Colombia" },
      cover: {
        src: "/images/projects/focusread/cover.jpg",
        alt: { es: "Tres pantallas de FocusRead: bienvenida, biblioteca y lector", en: "Three FocusRead screens: welcome, library and reader" },
        width: 1600,
        height: 1000,
        isPlaceholder: false,
      },
      gallery: [
        {
          src: "/images/projects/focusread/01.jpg",
          alt: { es: "Biblioteca de FocusRead con artículos por categoría y progreso diario", en: "FocusRead library with articles by category and daily progress" },
          caption: { es: "Biblioteca", en: "Library" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
        {
          src: "/images/projects/focusread/02.jpg",
          alt: { es: "Lector con el resumen generado por IA y la primera dosis", en: "Reader with the AI-generated summary and the first dose" },
          caption: { es: "Lector con resumen", en: "Reader with summary" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
        {
          src: "/images/projects/focusread/03.jpg",
          alt: { es: "Lector en tema oscuro", en: "Reader in dark theme" },
          caption: { es: "Tema oscuro", en: "Dark theme" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
        {
          src: "/images/projects/focusread/04.jpg",
          alt: { es: "Quiz para comprobar lo leído al terminar el artículo", en: "Quiz to check comprehension after the article" },
          caption: { es: "Quiz con IA", en: "AI quiz" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
      ],
      isPlaceholder: false,
    },
    {
      id: "text-refinery",
      title: { es: "Text Refinery", en: "Text Refinery" },
      summary: {
        es: "App de escritorio que vive en la bandeja del sistema y limpia el texto del portapapeles con un atajo global: saltos de línea de PDF, guiones de partición, ligaduras, comillas y espacios. Opcionalmente lo resume, corrige o reescribe con IA local (Ollama).",
        en: "Desktop app that lives in the system tray and cleans clipboard text with a global shortcut: PDF line breaks, hyphenation, ligatures, quotes and spaces. Optionally summarizes, corrects or rewrites it with local AI (Ollama).",
      },
      role: {
        es: "Desarrollo individual: diseño de la interfaz, lógica y empaquetado",
        en: "Solo development: interface design, logic and packaging",
      },
      outcome: {
        es: "Perfiles de salida Word, LaTeX, Markdown y texto plano con vista previa en vivo; interfaz en español e inglés con tema claro y oscuro; CI en GitHub Actions que prueba y genera instaladores para Windows, macOS y Linux.",
        en: "Word, LaTeX, Markdown and plain-text output profiles with live preview; Spanish and English UI with light and dark themes; GitHub Actions CI that tests and builds installers for Windows, macOS and Linux.",
      },
      details: {
        problem: {
          es: "Al copiar texto de un PDF o de una web llegan saltos de línea artificiales, guiones de partición, ligaduras, comillas y espacios raros. Limpiarlo a mano cada vez es lento y repetitivo.",
          en: "Copying text from a PDF or a web page brings artificial line breaks, hyphenation, ligatures, odd quotes and spacing. Cleaning it by hand every time is slow and repetitive.",
        },
        idea: {
          es: "Una app que vive en la bandeja del sistema y limpia el portapapeles con un atajo global, sin abrir ninguna ventana. Si quieres, además resume, corrige o reescribe el texto con IA local.",
          en: "An app that lives in the system tray and cleans the clipboard with a global shortcut, without opening any window. If you want, it also summarizes, corrects or rewrites the text with local AI.",
        },
        audience: {
          es: "Quien escribe trabajos o documentos y pega texto de PDFs y páginas web en Word, LaTeX o Markdown.",
          en: "Anyone who writes papers or documents and pastes text from PDFs and web pages into Word, LaTeX or Markdown.",
        },
        how: {
          es: [
          "Copias el texto, pulsas Ctrl+Shift+Y y el portapapeles queda limpio; con Ctrl+Shift+G además se envía a Ollama para resumir, corregir o sacar un párrafo citable.",
          "Si te arrepientes, Restaurar texto original en el menú de la bandeja devuelve lo que habías copiado.",
          "Hay cuatro perfiles de salida: Word, LaTeX (escapa los caracteres especiales), Markdown (convierte el HTML copiado) y texto plano.",
          "La ventana de Ajustes tiene tres páginas (Limpieza, Atajos e IA y General), en español e inglés y con tema claro y oscuro.",
        ],
          en: [
          "You copy the text, press Ctrl+Shift+Y and the clipboard is clean; with Ctrl+Shift+G it is also sent to Ollama to summarize, correct or produce a quotable paragraph.",
          "If you change your mind, Restore original text in the tray menu returns what you had copied.",
          "There are four output profiles: Word, LaTeX (escapes special characters), Markdown (converts copied HTML) and plain text.",
          "The Settings window has three pages (Cleaning, Shortcuts and AI, and General), in Spanish and English with light and dark themes.",
        ],
        },
        build: {
          es: [
          "Java 17 con JavaFX y Maven, con tema propio en rojo y componentes a medida: interruptores, teclas y selector segmentado.",
          "La vista previa de Limpieza ejecuta el pipeline real, así que lo que ves es lo que se aplica. Los atajos se graban en vivo, se suspenden mientras grabas y la app avisa al instante si repites uno.",
          "La IA es local (Ollama): el texto no sale del equipo, y si Ollama no responde solo se aplica la limpieza.",
          "GitHub Actions prueba el proyecto y genera instaladores con jpackage para Windows, macOS y Linux.",
        ],
          en: [
          "Java 17 with JavaFX and Maven, with a custom red theme and hand-built components: switches, keys and a segmented selector.",
          "The Cleaning preview runs the real pipeline, so what you see is what gets applied. Shortcuts are recorded live, suspended while recording, and the app warns instantly if you repeat one.",
          "The AI is local (Ollama): the text never leaves the computer, and if Ollama does not respond only the cleaning is applied.",
          "GitHub Actions tests the project and builds jpackage installers for Windows, macOS and Linux.",
        ],
        },
      },
      tech: ["Java 17", "JavaFX", "Maven", "Ollama", "GitHub Actions", "jpackage"],
      year: "2026",
      status: { es: "Versión 1.0.3", en: "Version 1.0.3" },
      links: [
        { kind: "github", href: "https://github.com/Dazaj02/Text-Refinery", status: "available" },
        { kind: "vercel", href: null, status: "soon" },
        { kind: "demo", href: null, status: "soon" },
      ],
      platform: { es: "Escritorio · Windows, macOS, Linux", en: "Desktop · Windows, macOS, Linux" },
      featured: true,
      context: { es: "Diseño de Interfaces · Universidad Cooperativa de Colombia", en: "Interface Design · Universidad Cooperativa de Colombia" },
      cover: {
        src: "/images/projects/text-refinery/cover.jpg",
        alt: { es: "Ventana de ajustes de Text Refinery: perfiles de salida, vista previa y procesadores", en: "Text Refinery settings window: output profiles, preview and processors" },
        width: 1600,
        height: 1000,
        isPlaceholder: false,
      },
      gallery: [
        {
          src: "/images/projects/text-refinery/01.jpg",
          alt: { es: "Página Atajos e IA con los atajos globales y la conexión con Ollama", en: "Shortcuts and AI page with global shortcuts and the Ollama connection" },
          caption: { es: "Atajos e IA", en: "Shortcuts and AI" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
        {
          src: "/images/projects/text-refinery/02.jpg",
          alt: { es: "Página General: arranque con el sistema, tema e idioma", en: "General page: start with system, theme and language" },
          caption: { es: "General", en: "General" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
        {
          src: "/images/projects/text-refinery/03.jpg",
          alt: { es: "Página Limpieza en tema oscuro", en: "Cleaning page in dark theme" },
          caption: { es: "Tema oscuro", en: "Dark theme" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
        {
          src: "/images/projects/text-refinery/04.jpg",
          alt: { es: "Interfaz en inglés: página Cleaning", en: "English interface: Cleaning page" },
          caption: { es: "Interfaz en inglés", en: "English interface" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
      ],
      isPlaceholder: false,
    },
    {
      id: "statussync",
      title: { es: "StatusSync Wear", en: "StatusSync Wear" },
      summary: {
        es: "App para reloj Wear OS que muestra tu disponibilidad con un toque: Libre, En Enfoque, En Clase o En llamada. Incluye temporizador de No Molestar que vuelve a Libre, estado en tiempo real de tu grupo y un asistente que sugiere el estado según tu agenda y tu movimiento.",
        en: "Wear OS watch app that shows your availability with one tap: Free, Focus, In class or On a call. It includes a Do Not Disturb timer that returns to Free, your group's live status and an assistant that suggests a state from your schedule and movement.",
      },
      role: {
        es: "Desarrollo completo: app de reloj, API y base de datos",
        en: "End-to-end development: watch app, API and database",
      },
      outcome: {
        es: "Tile y complicación para cambiar el estado desde la esfera; asistente local con agenda, movimiento y gestos (sacudida, giro de muñeca y pellizco experimental) que procesa todo en el reloj; API Hono y Supabase con Realtime y RLS.",
        en: "Tile and complication to change state from the watch face; on-device assistant using schedule, movement and gestures (shake, wrist turn and experimental pinch); Hono API and Supabase with Realtime and RLS.",
      },
      details: {
        problem: {
          es: "Saber si alguien puede ser interrumpido normalmente obliga a escribirle o a interrumpirlo para preguntar. Y cambiar tu estado desde el teléfono es lento justo cuando estás ocupado.",
          en: "Knowing whether someone can be interrupted usually means messaging them or interrupting them to ask. And changing your status from your phone is slow right when you are busy.",
        },
        idea: {
          es: "Un indicador de disponibilidad en la muñeca: un toque cambia tu estado, un temporizador te devuelve a Libre y tu grupo ve el estado en tiempo real. Un asistente puede sugerir el cambio según tu agenda y tu movimiento.",
          en: "An availability indicator on your wrist: one tap changes your status, a timer returns you to Free and your group sees it in real time. An assistant can suggest the change from your schedule and movement.",
        },
        audience: {
          es: "Compañeros de un mismo grupo, por ejemplo un equipo de clase o de trabajo, que quieren saber si pueden hablarse sin interrumpirse.",
          en: "People in the same group, for example a class or work team, who want to know whether they can talk without interrupting each other.",
        },
        how: {
          es: [
          "Cuatro estados base, cada uno con color, ícono y texto: Libre (verde), En Enfoque (rojo), En Clase (ámbar) y En llamada (morado). También puedes crear estados propios, como Gimnasio, eligiendo nombre, cómo se comparte y color.",
          "Todo estado distinto de Libre pide una duración y muestra la cuenta regresiva; al vencer, vuelve a Libre y el reloj vibra.",
          "La pantalla Mi grupo lista a cada persona con su estado y los minutos que le quedan.",
          "El asistente tiene interruptores para Agenda, Movimiento, Gestos (sacudir dos veces o girar la muñeca), Pellizco (experimental) y Auto-cambio, que cambia solo y permite deshacer. Hay un Tile y una Complication para ver y cambiar el estado desde la esfera.",
        ],
          en: [
          "Four base states, each with color, icon and text: Free (green), Focus (red), In class (amber) and On a call (purple). You can also create your own states, like Gym, choosing a name, how it is shared and a color.",
          "Any state other than Free asks for a duration and shows a countdown; when it ends, it returns to Free and the watch vibrates.",
          "The My group screen lists each person with their state and the minutes they have left.",
          "The assistant has switches for Schedule, Movement, Gestures (shake twice or turn the wrist), Pinch (experimental) and Auto-switch, which changes by itself and lets you undo. A Tile and a Complication show and change the state from the watch face.",
        ],
        },
        build: {
          es: [
          "Reglas de diseño para reloj: un toque, una acción; objetivos táctiles de al menos 48 dp; nunca depender solo del color; pantalla redonda y pequeña primero.",
          "Kotlin con Jetpack Compose for Wear OS, arquitectura limpia con MVVM y puertos y adaptadores. Mientras se integra el backend real, la app corre con repositorios locales y datos de demostración en el grupo.",
          "Tres piezas con dueños separados y un contrato compartido congelado: reloj, API en Hono y Supabase con Realtime y RLS. Un cambio manual siempre gana a uno automático durante el bloque en curso.",
          "Privacidad: el asistente procesa agenda, movimiento y gestos en el reloj; el servidor solo recibe agregados, nunca datos crudos de sensores.",
        ],
          en: [
          "Watch design rules: one tap, one action; touch targets of at least 48 dp; never rely on color alone; small round screen first.",
          "Kotlin with Jetpack Compose for Wear OS, clean architecture with MVVM and ports and adapters. While the real backend is being integrated, the app runs on local repositories with demo data in the group.",
          "Three pieces with separate owners and a frozen shared contract: watch, Hono API and Supabase with Realtime and RLS. A manual change always wins over an automatic one during the current block.",
          "Privacy: the assistant processes schedule, movement and gestures on the watch; the server only receives aggregates, never raw sensor data.",
        ],
        },
      },
      tech: ["Kotlin", "Jetpack Compose for Wear OS", "Hono", "TypeScript", "Supabase", "PostgreSQL"],
      year: "2026",
      status: { es: "En desarrollo", en: "In development" },
      links: [
        { kind: "github", href: "https://github.com/Dazaj02/statussync-wear", status: "available" },
        { kind: "vercel", href: null, status: "soon" },
        { kind: "demo", href: null, status: "soon" },
      ],
      platform: { es: "Wear OS + API", en: "Wear OS + API" },
      featured: true,
      context: { es: "Diseño de Interfaces · Universidad Cooperativa de Colombia", en: "Interface Design · Universidad Cooperativa de Colombia" },
      cover: {
        src: "/images/projects/statussync/cover.jpg",
        alt: { es: "Logotipo de StatusSync: un anillo con los cuatro colores de estado y un check verde al centro", en: "StatusSync logo: a ring with the four state colors and a green check in the center" },
        width: 1600,
        height: 1000,
        isPlaceholder: false,
      },
      gallery: [
        {
          src: "/images/projects/statussync/01.jpg",
          alt: { es: "Pantalla principal en estado Libre: puedes interrumpirme", en: "Main screen in Free state: you can interrupt me" },
          caption: { es: "Estado Libre", en: "Free state" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
        {
          src: "/images/projects/statussync/02.jpg",
          alt: { es: "Lista de estados con En Enfoque activo", en: "State list with Focus active" },
          caption: { es: "Cambiar de estado", en: "Changing state" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
        {
          src: "/images/projects/statussync/03.jpg",
          alt: { es: "Selector de duración para el estado En Enfoque", en: "Duration picker for the Focus state" },
          caption: { es: "Elegir duración", en: "Choosing a duration" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
        {
          src: "/images/projects/statussync/04.jpg",
          alt: { es: "En Enfoque activo con la cuenta regresiva", en: "Focus active with the countdown" },
          caption: { es: "En Enfoque", en: "Focus" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
        {
          src: "/images/projects/statussync/05.jpg",
          alt: { es: "En Clase activo con la cuenta regresiva", en: "In class active with the countdown" },
          caption: { es: "En Clase", en: "In class" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
        {
          src: "/images/projects/statussync/06.jpg",
          alt: { es: "En llamada activo con la cuenta regresiva", en: "On a call active with the countdown" },
          caption: { es: "En llamada", en: "On a call" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
        {
          src: "/images/projects/statussync/07.jpg",
          alt: { es: "Estado propio Gimnasio con la cuenta regresiva", en: "Custom Gym state with the countdown" },
          caption: { es: "Estado propio", en: "Custom state" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
        {
          src: "/images/projects/statussync/08.jpg",
          alt: { es: "Pantalla Mi grupo con el estado y el tiempo restante de cada persona", en: "My group screen with each person's state and time left" },
          caption: { es: "Mi grupo", en: "My group" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
        {
          src: "/images/projects/statussync/09.jpg",
          alt: { es: "Ajustes del asistente: Agenda, Movimiento y Gestos", en: "Assistant settings: Schedule, Movement and Gestures" },
          caption: { es: "Asistente", en: "Assistant" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
        {
          src: "/images/projects/statussync/10.jpg",
          alt: { es: "Crear un estado propio: elegir cómo se comparte", en: "Creating a custom state: choosing how it is shared" },
          caption: { es: "Crear un estado", en: "Creating a state" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
      ],
      isPlaceholder: false,
    },
    {
      id: "descending",
      title: { es: "Descending to my Heaven", en: "Descending to my Heaven" },
      summary: {
        es: "Boss rush 3D en tercera persona con combate estilo soulslike y estética PSX. Kaelen sube un templo de tres pisos sobre una isla flotante y derrota a tres guardianes, cada uno con segunda fase.",
        en: "Third-person 3D boss rush with soulslike combat and a PSX aesthetic. Kaelen climbs a three-floor temple on a floating island and defeats three guardians, each with a second phase.",
      },
      role: {
        es: "Desarrollo en equipo de 3: combate de la protagonista, IA táctica de jefes y esbirros, interfaz (diálogos, opciones, HUD) y transiciones entre niveles",
        en: "Team of 3: protagonist combat, tactical boss and minion AI, interface (dialogue, options, HUD) and level transitions",
      },
      outcome: {
        es: "Jefes que anticipan el movimiento y acorralan en pinza con los esbirros; controles reasignables, mando de Xbox, español e inglés; release candidata v1.0.0 para Windows con pruebas automatizadas.",
        en: "Bosses that predict movement and pincer the player with minions; rebindable controls, Xbox controller, Spanish and English; v1.0.0 release candidate for Windows with automated tests.",
      },
      details: {
        problem: {
          es: "El reto del proyecto era entregar un boss rush completo: tres jefes con segunda fase, historia, menús, opciones y un ejecutable listo para jugar, trabajando en un equipo de tres.",
          en: "The project's challenge was to ship a complete boss rush: three bosses with a second phase, story, menus, options and a ready-to-play executable, working in a team of three.",
        },
        idea: {
          es: "Kaelen sube un templo de tres pisos sobre una isla flotante y derrota a tres guardianes para reencontrarse con Elysia, con combate de estilo soulslike y estética PSX.",
          en: "Kaelen climbs a three-floor temple on a floating island and defeats three guardians to reunite with Elysia, with soulslike combat and a PSX aesthetic.",
        },
        audience: {
          es: "Jugadores de PC con Windows, con teclado y ratón o con mando de Xbox.",
          en: "Windows PC players, with keyboard and mouse or an Xbox controller.",
        },
        how: {
          es: [
          "Cada piso termina con un jefe: Bone Dragon, Blackhorn y Mecha King Ghidorah. Todos tienen fase 2 al 50 % de vida y una repulsión que castiga el juego de ráfagas.",
          "Kaelen ataca con combos, rueda con invulnerabilidad, administra estamina y cuenta con un frasco de curación con cargas limitadas por nivel.",
          "El juego cierra con una secuencia de diálogo con voces, cámaras propias y la caída de la isla.",
          "Los controles son reasignables, hay volumen por bus, ajustes de pantalla y resolución, y el juego está en español e inglés.",
        ],
          en: [
          "Every floor ends with a boss: Bone Dragon, Blackhorn and Mecha King Ghidorah. All have a phase 2 at 50% health and a knockback that punishes button-mashing.",
          "Kaelen attacks with combos, rolls with invulnerability, manages stamina and carries a healing flask with limited charges per level.",
          "The game closes with a voiced dialogue sequence, custom cameras and the fall of the island.",
          "Controls are rebindable, there is per-bus volume, screen and resolution settings, and the game is in Spanish and English.",
        ],
        },
        build: {
          es: [
          "Godot 4 con GDScript tipado. Yo me encargué del combate de la protagonista, la IA táctica de jefes y esbirros, la interfaz (diálogos, opciones y HUD) y las transiciones entre niveles.",
          "Los jefes anticipan hacia dónde se mueve Kaelen, la acorralan en pinza con los esbirros, aprovechan cuando está distraída y a veces se reposicionan; un orquestador regula la intensidad de las oleadas.",
          "Shaders para el look PSX y assets preparados en Blender. Pruebas automatizadas del proyecto.",
          "Se entrega como release candidata v1.0.0 para Windows: un ejecutable de unos 166 MB que no requiere instalación.",
        ],
          en: [
          "Godot 4 with typed GDScript. I handled the protagonist's combat, the tactical AI for bosses and minions, the interface (dialogue, options and HUD) and the level transitions.",
          "Bosses predict where Kaelen is heading, pincer her with the minions, exploit moments when she is distracted and sometimes reposition; an orchestrator regulates wave intensity.",
          "Shaders for the PSX look and assets prepared in Blender. Automated project tests.",
          "Shipped as a v1.0.0 release candidate for Windows: an executable of about 166 MB that needs no installation.",
        ],
        },
      },
      tech: ["Godot 4", "GDScript", "Shaders", "Blender"],
      year: "2026",
      status: { es: "Release candidata v1.0.0", en: "Release candidate v1.0.0" },
      links: [
        { kind: "github", href: null, status: "private" },
        { kind: "vercel", href: null, status: "soon" },
        { kind: "demo", href: null, status: "private" },
      ],
      platform: { es: "PC (Windows)", en: "PC (Windows)" },
      team: { es: "Equipo de 3", en: "Team of 3" },
      featured: true,
      context: { es: "Diseño de Interfaces · Universidad Cooperativa de Colombia", en: "Interface Design · Universidad Cooperativa de Colombia" },
      cover: {
        src: "/images/projects/descending/cover.jpg",
        alt: { es: "Kaelen enfrenta a un jefe y sus esbirros en el patio del templo", en: "Kaelen faces a boss and its minions in the temple courtyard" },
        width: 1600,
        height: 1000,
        isPlaceholder: false,
      },
      gallery: [
        {
          src: "/images/projects/descending/01.jpg",
          alt: { es: "Menú principal del juego con la isla flotante", en: "Game main menu with the floating island" },
          caption: { es: "Menú principal", en: "Main menu" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
        {
          src: "/images/projects/descending/02.jpg",
          alt: { es: "Kaelen frente al templo de tres pisos", en: "Kaelen in front of the three-floor temple" },
          caption: { es: "El templo", en: "The temple" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
        {
          src: "/images/projects/descending/03.jpg",
          alt: { es: "Menú de pausa durante la partida", en: "Pause menu during gameplay" },
          caption: { es: "Pausa", en: "Pause" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
      ],
      isPlaceholder: false,
    },
    {
      id: "veltro",
      title: { es: "Veltro ERP & POS", en: "Veltro ERP & POS" },
      summary: {
        es: "Frontend de un ERP con punto de venta: panel de control, terminal POS, catálogo, inventario, compras y proveedores, con permisos por rol (administrador, bodega y caja).",
        en: "Frontend for an ERP with point of sale: control panel, POS terminal, catalog, inventory, purchasing and suppliers, with role-based permissions (administrator, warehouse and cashier).",
      },
      role: {
        es: "Frontend, en un equipo de tres",
        en: "Frontend, on a team of three",
      },
      outcome: {
        es: "Interfaz con módulos y permisos por rol para administrador, bodega y caja.",
        en: "Interface with modules and role-based permissions for administrator, warehouse and cashier.",
      },
      details: {
        problem: {
          es: "Las pequeñas y medianas empresas necesitan vender con código de barras, descontar inventario automáticamente, recibir alertas de stock a tiempo y poder auditar lo que pasó con cada operación.",
          en: "Small and medium businesses need to sell with barcodes, deduct inventory automatically, get stock alerts in time and be able to audit what happened in every operation.",
        },
        idea: {
          es: "Veltro es un ERP ligero con punto de venta. Mi parte es el frontend: un panel de control, la terminal POS y los módulos de catálogo, inventario, compras y proveedores.",
          en: "Veltro is a lightweight ERP with point of sale. My part is the frontend: a control panel, the POS terminal and the catalog, inventory, purchasing and supplier modules.",
        },
        audience: {
          es: "Tres tipos de personas dentro de un negocio: administrador, bodega y caja. Cada rol ve solo los módulos que necesita.",
          en: "Three kinds of people inside a business: administrator, warehouse and cashier. Each role sees only the modules it needs.",
        },
        how: {
          es: [
          "El panel de control muestra las ventas del día, las últimas transacciones y el estado del inventario.",
          "La terminal POS permite armar el carrito y reconoce productos con la cámara.",
          "Las alertas de inventario se filtran por severidad: sin stock (crítica), stock bajo (advertencia) y exceso de stock (informativa).",
          "Los permisos por rol controlan qué módulos y acciones aparecen para cada persona.",
        ],
          en: [
          "The control panel shows today's sales, the latest transactions and the inventory status.",
          "The POS terminal lets you build the cart and recognizes products with the camera.",
          "Inventory alerts can be filtered by severity: out of stock (critical), low stock (warning) and overstock (informational).",
          "Role-based permissions control which modules and actions appear for each person.",
        ],
        },
        build: {
          es: [
          "Frontend en React con TypeScript y Vite, estilos con Tailwind CSS. Estado del servidor con React Query, estado local con Zustand, formularios con React Hook Form y validación con Zod; pruebas con Vitest.",
          "Consume una API REST con autenticación JWT que desarrolla el resto del equipo: Spring Boot, Java 21 y PostgreSQL, con arquitectura hexagonal.",
          "Trabajo en equipo de tres personas: la interfaz tenía que respetar el contrato de la API y los roles definidos por el backend.",
        ],
          en: [
          "Frontend in React with TypeScript and Vite, styled with Tailwind CSS. Server state with React Query, local state with Zustand, forms with React Hook Form and validation with Zod; tests with Vitest.",
          "It consumes a REST API with JWT authentication built by the rest of the team: Spring Boot, Java 21 and PostgreSQL, with hexagonal architecture.",
          "Teamwork of three people: the interface had to respect the API contract and the roles defined by the backend.",
        ],
        },
      },
      tech: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "React Query",
        "Zustand",
        "React Hook Form",
        "Zod",
        "Vitest",
      ],
      year: "2026",
      status: { es: "Completado", en: "Completed" },
      links: [
        {
          kind: "github",
          href: "https://github.com/StehvenObandoUcc/FrontendVeltro",
          status: "available",
        },
        { kind: "vercel", href: null, status: "soon" },
        { kind: "demo", href: null, status: "soon" },
      ],
      platform: { es: "Web", en: "Web" },
      team: { es: "Equipo de 3", en: "Team of 3" },
      featured: false,
      cover: {
        src: "/images/projects/veltro/cover.jpg",
        alt: { es: "Panel de control de Veltro con métricas financieras y estado de inventario", en: "Veltro control panel with financial metrics and inventory status" },
        width: 1600,
        height: 1000,
        isPlaceholder: false,
      },
      gallery: [
        {
          src: "/images/projects/veltro/01.jpg",
          alt: { es: "Terminal POS con reconocimiento de productos por cámara y carrito", en: "POS terminal with camera product recognition and cart" },
          caption: { es: "Terminal POS", en: "POS terminal" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
        {
          src: "/images/projects/veltro/02.jpg",
          alt: { es: "Panel de control con ventas del día y últimas transacciones", en: "Control panel with today's sales and latest transactions" },
          caption: { es: "Ventas del día", en: "Today's sales" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
        {
          src: "/images/projects/veltro/03.jpg",
          alt: { es: "Alertas de inventario filtradas por severidad", en: "Inventory alerts filtered by severity" },
          caption: { es: "Alertas de inventario", en: "Inventory alerts" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
      ],
      isPlaceholder: false,
    },
    {
      id: "night-shift-portfolio",
      title: { es: "Night Shift Portfolio", en: "Night Shift Portfolio" },
      summary: {
        es: "Este mismo portafolio: una página bilingüe con estética cyberpunk, efecto glitch entre secciones y accesibilidad WCAG 2.2 AA.",
        en: "This portfolio: a bilingual page with a cyberpunk look, glitch transitions between sections and WCAG 2.2 AA accessibility.",
      },
      role: {
        es: "Diseño, desarrollo y contenido",
        en: "Design, development and content",
      },
      details: {
        problem: {
          es: "Un portafolio de interfaz tenía que mostrar criterio de diseño sin esconder la información: que el universo visual envolviera el contenido y no se interpusiera entre el visitante y lo que busca.",
          en: "An interface portfolio had to show design judgment without hiding information: the visual universe should wrap the content, not stand between the visitor and what they are looking for.",
        },
        idea: {
          es: "Un portafolio de una sola página con estética cyberpunk: el inicio es la pantalla de título de un videojuego con su menú de apartados, y los saltos entre secciones y el cambio de tema se hacen con efecto glitch.",
          en: "A single-page portfolio with a cyberpunk look: the home is a video game title screen with its menu of sections, and jumps between sections and the theme change use a glitch effect.",
        },
        audience: {
          es: "Reclutadores y líderes técnicos que deciden en pocos minutos, profesores y compañeros del curso, y clientes que necesitan entender qué construyo y cómo contactarme.",
          en: "Recruiters and tech leads who decide in a few minutes, teachers and classmates, and clients who need to understand what I build and how to reach me.",
        },
        how: {
          es: [
          "El visitante entiende el perfil en el primer vistazo y llega a un proyecto, al CV o al contacto en uno o dos clics.",
          "Cada proyecto muestra rol, resultado, stack, enlaces y una pantalla emergente con el contexto completo.",
          "Está en español e inglés, con modo oscuro y claro, y un botón que pausa los efectos de movimiento.",
        ],
          en: [
          "The visitor understands the profile at a glance and reaches a project, the CV or contact in one or two clicks.",
          "Each project shows role, outcome, stack, links and a pop-up screen with the full context.",
          "It is in Spanish and English, with dark and light modes and a button that pauses motion effects.",
        ],
        },
        build: {
          es: [
          "Next.js (App Router) con TypeScript estricto y Tailwind CSS v4, sin dependencias adicionales: las animaciones usan CSS y APIs nativas del navegador.",
          "Todo el contenido vive en archivos de datos tipados, así que se actualiza sin tocar componentes.",
          "Accesibilidad WCAG 2.2 AA: foco visible, navegación por teclado y los efectos se pueden pausar. Los datos de muestra se marcan de forma visible.",
        ],
          en: [
          "Next.js (App Router) with strict TypeScript and Tailwind CSS v4, no extra dependencies: animations use CSS and native browser APIs.",
          "All content lives in typed data files, so it is updated without touching components.",
          "WCAG 2.2 AA accessibility: visible focus, keyboard navigation and effects can be paused. Sample data is visibly marked.",
        ],
        },
      },
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
      year: "2026",
      status: { es: "En construcción", en: "In progress" },
      links: [
        { kind: "github", href: null, status: "soon" },
        { kind: "vercel", href: null, status: "soon" },
        { kind: "demo", href: null, status: "soon" },
      ],
      platform: { es: "Web", en: "Web" },
      featured: false,
      cover: {
        src: "/images/projects/night-shift-portfolio/cover.jpg",
        alt: { es: "Pantalla de título del portafolio en modo oscuro", en: "Portfolio title screen in dark mode" },
        width: 1600,
        height: 1000,
        isPlaceholder: false,
      },
      gallery: [
        {
          src: "/images/projects/night-shift-portfolio/01.jpg",
          alt: { es: "Pantalla de título en modo claro", en: "Title screen in light mode" },
          caption: { es: "Modo claro", en: "Light mode" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
        {
          src: "/images/projects/night-shift-portfolio/02.jpg",
          alt: { es: "Sección de proyectos destacados", en: "Featured projects section" },
          caption: { es: "Proyectos", en: "Projects" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
        {
          src: "/images/projects/night-shift-portfolio/03.jpg",
          alt: { es: "Versión móvil en modo oscuro y claro", en: "Mobile version in dark and light mode" },
          caption: { es: "Móvil", en: "Mobile" },
          width: 1600,
          height: 1000,
          isPlaceholder: false,
        },
      ],
      isPlaceholder: false,
    },
  ],

  testimonials: [
    {
      id: "docente",
      // TODO antes de publicar: cita redactada para la presentación; reemplazar por la palabra real de la persona
      name: "Javier Alexander Mendieta",
      role: {
        es: "Docente de Diseño de Interfaces, Universidad Cooperativa de Colombia",
        en: "Interface Design lecturer, Universidad Cooperativa de Colombia",
      },
      relation: {
        es: "Profesor del curso",
        en: "Course instructor",
      },
      quote: {
        es: "David se distingue por cuidar la interfaz hasta el último detalle: documenta sus decisiones de diseño, justifica cada elección y entrega trabajos que se entienden a la primera.",
        en: "David stands out for caring about the interface down to the last detail: he documents his design decisions, justifies every choice and delivers work that is clear at first glance.",
      },
      isPlaceholder: false,
    },
    {
      id: "primo",
      // TODO antes de publicar: cita redactada para la presentación; reemplazar por la palabra real de la persona
      name: "Yorlin Fabian Pachajoa",
      role: {
        es: "Ingeniero de software senior full stack",
        en: "Senior full stack software engineer",
      },
      relation: {
        es: "Familiar",
        en: "Family",
      },
      quote: {
        es: "Lo que más me gusta de David es que pregunta el porqué de las cosas. Está aprendiendo con buenas bases y ya trabaja con criterio de ingeniero: ordena su código y piensa en quien lo va a mantener.",
        en: "What I like most about David is that he asks why things work the way they do. He is learning on solid foundations and already works with an engineer's judgment: he keeps his code tidy and thinks of whoever will maintain it.",
      },
      isPlaceholder: false,
    },
    {
      id: "ingeniero-pueblo",
      // TODO antes de publicar: cita redactada para la presentación; reemplazar por la palabra real
      name: "Diego Fernando Canchala",
      role: {
        es: "Ingeniero",
        en: "Engineer",
      },
      relation: {
        es: "De mi pueblo",
        en: "From my hometown",
      },
      quote: {
        es: "Conozco a David desde antes de que se metiera en la ingeniería, y se nota el cambio: se toma el tiempo de entender el problema antes de escribir código y explica sus proyectos con claridad. Es constante y vale la pena seguirle el rastro.",
        en: "I have known David since before he got into engineering, and the change shows: he takes the time to understand the problem before writing code and explains his projects clearly. He is consistent and worth keeping an eye on.",
      },
      isPlaceholder: false,
    },
  ],

  experience: [
    {
      id: "education-1",
      kind: "education",
      title: {
        es: "Ingeniería de Software",
        en: "Software Engineering",
      },
      organization: "Universidad Cooperativa de Colombia",
      location: { es: "Pasto, Nariño", en: "Pasto, Nariño" },
      period: {
        es: "Actualidad · 5.º semestre",
        en: "Present · 5th semester",
      },
      highlights: {
        es: [
          "Diseño de Interfaces (curso actual): sistemas de diseño, accesibilidad y este portafolio.",
          "Arquitectura de software y modelado con UML2: diagramas de contexto, componentes, clases, implementación y despliegue.",
          "Desarrollo web con React y Next.js, móvil con Android (Kotlin, Compose, Wear OS) y React Native, y escritorio con Java y JavaFX.",
          "Backend con Spring Boot y Node (Hono), APIs REST y bases de datos PostgreSQL, MongoDB y Supabase.",
          "Seis proyectos propios en web, Android, Wear OS, escritorio y videojuegos (Godot).",
        ],
        en: [
          "Interface Design (current course): design systems, accessibility and this portfolio.",
          "Software architecture and UML2 modeling: context, component, class, deployment and implementation diagrams.",
          "Web development with React and Next.js, mobile with Android (Kotlin, Compose, Wear OS) and React Native, and desktop with Java and JavaFX.",
          "Backend with Spring Boot and Node (Hono), REST APIs and PostgreSQL, MongoDB and Supabase databases.",
          "Six personal projects across web, Android, Wear OS, desktop and video games (Godot).",
        ],
      },
      tech: ["Java", "Spring Boot", "React", "Next.js", "Kotlin", "UML2"],
      isPlaceholder: false,
    },
  ],

  stack: [
    {
      id: "lenguajes",
      label: { es: "Lenguajes", en: "Languages" },
      items: [
        { id: "typescript", name: "TypeScript", desc: { es: "JavaScript con tipos: atrapa errores antes de ejecutar. Lo uso en web, móvil y API.", en: "JavaScript with types: catches bugs before running. Used across web, mobile and APIs." } },
        { id: "kotlin", name: "Kotlin", desc: { es: "Lenguaje moderno de Android y Wear OS; base de las apps nativas del reloj.", en: "Modern language for Android and Wear OS; the base of the native watch apps." } },
        { id: "java", name: "Java", aliases: ["Java 17"], desc: { es: "Lenguaje de mis cursos y de Text Refinery; también del backend con Spring Boot.", en: "The language of my courses and Text Refinery; also behind Spring Boot backends." } },
        { id: "gdscript", name: "GDScript", desc: { es: "Lenguaje de scripting de Godot, parecido a Python, para toda la lógica del juego.", en: "Godot scripting language, similar to Python, used for all the game logic." } },
      ],
    },
    {
      id: "frontend",
      label: { es: "Interfaz web", en: "Web interface" },
      items: [
        { id: "react", name: "React", desc: { es: "Biblioteca para construir interfaces con componentes; base de Veltro.", en: "Component-based UI library; the base of Veltro." } },
        { id: "nextjs", name: "Next.js", desc: { es: "Framework de React con rutas, SSR e i18n; con él está hecho este portafolio.", en: "React framework with routing, SSR and i18n; this portfolio is built with it." } },
        { id: "tailwind", name: "Tailwind CSS", desc: { es: "Estilos con clases utilitarias y tokens de diseño en lugar de hojas enormes.", en: "Utility-class styling with design tokens instead of huge stylesheets." } },
        { id: "vite", name: "Vite", desc: { es: "Servidor y empaquetador rápido para proyectos React.", en: "Fast dev server and bundler for React projects." } },
        { id: "react-query", name: "React Query", desc: { es: "Maneja datos del servidor: caché, reintentos y estados de carga.", en: "Handles server data: caching, retries and loading states." } },
        { id: "zustand", name: "Zustand", desc: { es: "Estado global pequeño y sin ceremonias para React.", en: "Tiny, ceremony-free global state for React." } },
        { id: "rhf", name: "React Hook Form", desc: { es: "Formularios con poco re-render y validación integrada.", en: "Forms with few re-renders and built-in validation." } },
        { id: "zod", name: "Zod", desc: { es: "Valida datos y genera los tipos de TypeScript desde el mismo esquema.", en: "Validates data and infers TypeScript types from the same schema." } },
        { id: "vitest", name: "Vitest", desc: { es: "Pruebas unitarias rápidas que comparten la configuración de Vite.", en: "Fast unit tests that share Vite configuration." } },
      ],
    },
    {
      id: "movil",
      label: { es: "Móvil, reloj y escritorio", en: "Mobile, watch & desktop" },
      items: [
        { id: "android", name: "Android", desc: { es: "Plataforma de FocusRead AI y del reloj de StatusSync.", en: "The platform behind FocusRead AI and the StatusSync watch." } },
        { id: "compose", name: "Jetpack Compose", aliases: ["Jetpack Compose for Wear OS"], desc: { es: "UI declarativa nativa de Android, también para el reloj.", en: "Native declarative Android UI, also for the watch." } },
        { id: "wearos", name: "Wear OS", desc: { es: "Android para relojes: pantallas circulares y uso en segundos.", en: "Android for watches: round screens and glanceable use." } },
        { id: "react-native", name: "React Native", desc: { es: "Apps móviles con React y TypeScript; con él hice FocusRead.", en: "Mobile apps with React and TypeScript; used to build FocusRead." } },
        { id: "expo", name: "Expo", desc: { es: "Herramientas para desarrollar, probar y compilar apps React Native.", en: "Tooling to develop, test and build React Native apps." } },
        { id: "javafx", name: "JavaFX", desc: { es: "Interfaces de escritorio en Java; la base de Text Refinery.", en: "Desktop UIs in Java; the base of Text Refinery." } },
        { id: "godot", name: "Godot", aliases: ["Godot 4"], desc: { es: "Motor de juegos de código abierto con el que hicimos Descending.", en: "Open-source game engine we used to make Descending." } },
        { id: "shaders", name: "Shaders", desc: { es: "Programas de GPU para efectos visuales del juego.", en: "GPU programs for the game visual effects." } },
        { id: "blender", name: "Blender", desc: { es: "Modelado y arte 3D de los recursos del juego.", en: "3D modeling and art for the game assets." } },
      ],
    },
    {
      id: "backend",
      label: { es: "Backend y datos", en: "Backend & data" },
      items: [
        { id: "nodejs", name: "Node.js", desc: { es: "JavaScript en el servidor; ejecuta las APIs de FocusRead y StatusSync.", en: "Server-side JavaScript; runs the FocusRead and StatusSync APIs." } },
        { id: "hono", name: "Hono", desc: { es: "Framework web ligero para APIs en TypeScript.", en: "Lightweight web framework for TypeScript APIs." } },
        { id: "spring", name: "Spring Boot", desc: { es: "Framework Java para servicios REST, visto en la carrera.", en: "Java framework for REST services, studied in my degree." } },
        { id: "rest", name: "REST APIs", desc: { es: "Diseño de endpoints, contratos y errores coherentes.", en: "Designing consistent endpoints, contracts and errors." } },
        { id: "supabase", name: "Supabase", desc: { es: "Autenticación, Postgres y políticas RLS listas para usar.", en: "Authentication, Postgres and RLS policies out of the box." } },
        { id: "postgres", name: "PostgreSQL", desc: { es: "Base de datos relacional principal de mis APIs.", en: "Main relational database for my APIs." } },
        { id: "sqlite", name: "SQLite", desc: { es: "Base local en el teléfono: caché y modo sin conexión.", en: "On-device database: cache and offline mode." } },
        { id: "mongodb", name: "MongoDB", desc: { es: "Base de datos documental, usada con Spring Boot.", en: "Document database, used with Spring Boot." } },
        { id: "ollama", name: "Ollama", desc: { es: "Modelos de IA locales que corrigen y reescriben texto sin internet.", en: "Local AI models that fix and rewrite text without internet." } },
      ],
    },
    {
      id: "herramientas",
      label: { es: "Herramientas y arquitectura", en: "Tools & architecture" },
      items: [
        { id: "git", name: "Git", desc: { es: "Control de versiones; todo mi trabajo vive en repositorios.", en: "Version control; all my work lives in repositories." } },
        { id: "actions", name: "GitHub Actions", desc: { es: "Automatiza pruebas y compilaciones en cada cambio.", en: "Automates tests and builds on every change." } },
        { id: "maven", name: "Maven", desc: { es: "Gestiona dependencias y compila proyectos Java.", en: "Manages dependencies and builds Java projects." } },
        { id: "jpackage", name: "jpackage", desc: { es: "Empaqueta apps Java como instaladores nativos.", en: "Packages Java apps as native installers." } },
        { id: "vercel", name: "Vercel", desc: { es: "Despliegue de sitios Next.js.", en: "Deployment for Next.js sites." } },
        { id: "uml", name: "UML2", desc: { es: "Modelado de clases, casos de uso y secuencia.", en: "Class, use-case and sequence modeling." } },
        { id: "plantuml", name: "PlantUML", desc: { es: "Diagramas UML escritos como texto y versionados en Git.", en: "UML diagrams written as text and versioned in Git." } },
      ],
    },
  ],

  gallery: [
    {
      src: "/images/about/about-01.jpg",
      alt: {
        es: "Arte oficial de Terraria: un caballero con armadura levanta una antorcha dentro de una cueva",
        en: "Official Terraria artwork: an armored knight raises a torch inside a cave",
      },
      caption: { es: "Videojuegos · Terraria sobre todo", en: "Video games · mainly Terraria" },
      width: 499,
      height: 615,
      isPlaceholder: false,
    },
    {
      src: "/images/about/about-02.jpg",
      alt: {
        es: "Reunión familiar en una sala, con varias generaciones reunidas alrededor de un micrófono",
        en: "Family gathering in a living room, with several generations around a microphone",
      },
      caption: { es: "Tiempo en familia", en: "Family time" },
      width: 1400,
      height: 933,
      isPlaceholder: false,
    },
    {
      src: "/images/about/about-03.jpg",
      alt: {
        es: "David de espaldas con sombrero, mirando un cañón de tierra rojiza bajo un cielo con nubes",
        en: "David from behind wearing a hat, looking at a red-earth canyon under a cloudy sky",
      },
      caption: { es: "Viajes · conocer lugares nuevos", en: "Travel · discovering new places" },
      width: 960,
      height: 600,
      isPlaceholder: false,
    },
  ],

  socials: [
    {
      kind: "github",
      label: "GitHub",
      href: "https://github.com/Dazaj02",
      display: "github.com/Dazaj02",
      isPlaceholder: false,
    },
    {
      kind: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/david-alejandro-aza-jojoa-449044408",
      display: "David Aza",
      isPlaceholder: false,
    },
    {
      kind: "email",
      label: "Email",
      href: "mailto:david.aza.dev@gmail.com",
      display: "david.aza.dev@gmail.com",
      isPlaceholder: false,
    },
  ],
};
