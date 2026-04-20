# Documentación Técnica del Portfolio de Salem

## Índice General

1. [Introducción](#introducción)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Ficheros de Configuración](#ficheros-de-configuración)
4. [Datos y Contenido](#datos-y-contenido)
5. [Layouts](#layouts)
6. [Componentes](#componentes)
7. [Estilos](#estilos)
8. [Scripts y Build](#scripts-y-build)
9. [Recursos Públicos](#recursos-públicos)
10. [Funcionalidades Principales](#funcionalidades-principales)

---

## 1. Introducción

Este proyecto constituye el portfolio personal de Salem, desarrollado utilizando **Astro 4.16.5** como framework principal. El sitio web adopta una arquitectura de **single-page application** con navegación por anclas (smooth scroll), donde todas las secciones principales se encuentran en una única página (`index.astro`) que se desplaza verticalmente.

El stack tecnológico incluye **React 18** para componentes interactivos (principalmente el Navbar), **Tailwind CSS 3.4** para estilos utilitarios, y **Framer Motion 11** para animaciones de la interfaz. Una característica distintiva es el sistema de animaciones ASCII, donde archivos GIF se preprocesan en tiempo de build para generar frames JSON que posteriormente se renderizan como arte ASCII animado en el navegador.

---

## 2. Estructura del Proyecto

```
portfolio/
├── astro.config.mjs          # Configuración principal de Astro
├── tailwind.config.mjs       # Configuración de Tailwind CSS
├── tsconfig.json            # Configuración de TypeScript
├── package.json             # Dependencias y scripts de npm
├── skills-lock.json         # Datos de skills (generado)
├── README.md                # Este documento
├── LICENSE                 # Licencia del proyecto
├── scripts/
│   └── extract-ascii-frames.mjs  # Script de prebuild para GIFs
├── public/                  # Recursos estáticos
│   ├── ascii-frames/       # Frames ASCII precalculados (JSON)
│   ├── gif/                # Archivos GIF fuente
│   ├── videos/            # Videos de proyectos
│   ├── images/            # Capturas de pantalla
│   ├── icons/             # Iconos diversos
│   └── favicon.svg        # Favicon del sitio
└── src/                   # Código fuente
    ├── components/        # Componentes reutilizables
    │   ├── Navbar.jsx     # Barra de navegación (React)
    │   ├── Section.astro  # Contenedor genérico de sección
    │   ├── Footer.astro   # Pie de página
    │   ├── SkillsBox.astro    # Contenedor de habilidades
    │   ├── SkillItem.astro    # Badge individual de habilidad
    │   ├── AsciiCanvas.astro # Renderer de arte ASCII
    │   ├── VideoItem.astro    # Tarjeta de video preview
    │   ├── ImageItem.astro    # Tarjeta de imagen
    │   ├── ContactBoxItem.astro # Enlace de contacto individual
    │   └── sections/         # Componentes de sección
    │       ├── MainSection.astro    # Sección hero/presentación
    │       ├── AboutSection.astro   # Sección about/biografía
    │       ├── BlogSection.astro   # Sección de proyectos
    │       └── ContactSection.astro # Sección de contacto
    ├── layouts/           # Layouts de página
    │   ├── MainLayout.astro    # Layout base HTML
    │   └── BlogLayout.astro   # Layout para blog posts
    ├── pages/             # Páginas de Astro
    │   ├── index.astro    # Página principal
    │   └── robots.txt.js  # Generación dinámica de robots.txt
    ├── styles/            # Ficheros CSS
    │   ├── styles.css     # Estilos globales
    │   └── blog.css       # Tipografía para blog posts
    ├── data.js           # Configuración centralizada de contenido
    └── env.d.ts          # Referencias de tipos de Astro
```

---

## 3. Ficheros de Configuración

### 3.1 `astro.config.mjs`

**Propósito:** Este archivo constituye la configuración principal del proyecto Astro. Define el sitio base, las integraciones instaladas y los plugins utilizados.

**Contenido:**

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://aether-astro-theme.netlify.app/',
  integrations: [tailwind(), react(), sitemap()],
});
```

**Integraciones utilizadas:**
- **@astrojs/tailwind**: Integración de Tailwind CSS para estilos utilitarios
- **@astrojs/react**: Soporte para componentes React (requerido por Navbar.jsx)
- **@astrojs/sitemap**: Generación automática de sitemap para SEO

**Nota:** La propiedad `site` debe actualizarse a la URL de producción del portfolio antes del deploy final.

---

### 3.2 `tailwind.config.mjs`

**Propósito:** Configuración del framework de estilos Tailwind CSS. Define los paths de contenido escaneados y las extensiones del tema.

**Contenido:**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: { extend: {} },
  plugins: [],
}
```

**Análisis:**
- La configuración de `content` asegura que Tailwind escanee todos los archivos de código fuente para purgar CSS unused
- El tema base está vacío (`extend: {}`), lo que significa que se utiliza la configuración por defecto de Tailwind sin personalizaciones adicionales de colores o tipografías
- No hay plugins adicionales instalados

---

### 3.3 `tsconfig.json`

**Propósito:** Configuración del compilador TypeScript. Extiende la configuración base de Astro y especifica opciones para JSX.

**Contenido:**

```json
{
  "extends": "astro/tsconfigs/base",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

**Análisis:**
- `jsx: "react-jsx"` habilita la nueva sintaxis JSX de React (transform automatique sans necesidad de `import React`)
- `jsxImportSource: "react"` indica que el runtime de JSX proviene de React, necesario porque el proyecto utiliza React para componentes interactivos

---

### 3.4 `package.json`

**Propósito:** Define las dependencias del proyecto, scripts de npm, y metadatos del paquete.

**Estructura de dependencias:**

```json
{
  "dependencies": {
    "@astrojs/react": "^3.6.2",
    "@astrojs/sitemap": "^3.2.1",
    "@astrojs/tailwind": "^5.1.2",
    "@fontsource/poppins": "^5.1.0",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "astro": "^4.16.5",
    "astro-icon": "^1.1.1",
    "framer-motion": "^11.11.9",
    "p5": "^2.2.3",
    "p5.asciify": "^0.3.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwindcss": "^3.4.14"
  },
  "devDependencies": {
    "omggif": "^1.0.10"
  }
}
```

**Análisis de dependencias principales:**
- **astro**: Framework web principal (versión 4.16.5)
- **@astrojs/react**: Integración de React en Astro
- **framer-motion**: Librería de animaciones para React (usada en Navbar)
- **p5 + p5.asciify**: Librerías de procesamiento de imagen para generar arte ASCII
- **omggif**: Librería para extraer frames de archivos GIF (solo en devDependencies)

**Scripts disponibles:**

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Ejecuta prebuild + build de Astro |
| `npm run prebuild` | Solo ejecuta el script de extracción ASCII |
| `npm run preview` | Preview del build de producción |
| `npm run astro` | Acceso directo al CLI de Astro |

---

## 4. Datos y Contenido

### 4.1 `src/data.js`

**Propósito:** Este archivo funciona como la **única fuente de verdad** para todo el contenido del portfolio. Centraliza todas las configuraciones editables, permitiendo personalizar el portfolio sin necesidad de modificar componentes o markup.

**Variables exportadas:**

#### Configuración Global
- `isTransitionEnabled` (boolean): Activa/desactiva las View Transitions de Astro para transiciones suaves entre páginas.

#### Identidad Personal
- `myName` (string): Nombre del propietario del portfolio, mostrado en la sección Hero.
- `navLogoText` (string): Texto del logo en la barra de navegación.

#### Navegación
- `navLinks` (Array<{name, href}>): Links del menú de navegación. Formato de anclas (`/#about`) para scroll suave.

#### Contenido de Secciones
- `myBio` (string): Biografía breve de la sección Hero.
- `aboutMe` (string): Texto extendido de la sección About.
- `writingText` (string): Descripción de la sección de proyectos/escritos.
- `contactText` (string): Texto de introducción de la sección de contacto.

#### Habilidades Técnicas
- `skills` (Array<string>): Lista de habilidades técnicas mostradas como badges en About.

#### Enlaces de Contacto
- `contactOptions` (Array<{name, link}>): Plataformas de contacto/social links.

#### Configuración del Footer
- `showDeveloperText` (boolean): Bandera para mostrar texto de atribución.

**Flujo de datos:**
```
data.js → Exporta variables → index.astro → Pasa como props → Section components
```

---

## 5. Layouts

### 5.1 `src/layouts/MainLayout.astro`

**Propósito:** Layout base que envuelve todas las páginas del portfolio. Proporciona la estructura HTML fundamental,meta tags, carga de fuentes, y gestión del tema dark/light.

**Características principales:**

1. **Meta tags SEO**: Description, generator de Astro, sitemap link
2. **Carga de fuentes**: Google Sans Code (weights 300-800)
3. **Sistema de tema**: Toggle dark/light con localStorage persistence
4. **View Transitions**: Condicional basada en `isTransitionEnabled`
5. **Scripts inline**:
   - Gestión del toggle de tema (sin flash en carga inicial)
   - Sistema de animaciones de scroll (IntersectionObserver)

**Estructura HTML:**
```html
<html lang="en" data-theme="light">
  <head>
    <!-- Meta tags, fonts, favicon -->
    <!-- ViewTransitions (si está habilitado) -->
  </head>
  <body>
    <!-- Botón de toggle de tema (fixed position) -->
    <div class="site-shell">
      <slot />  <!-- Contenido de la página -->
    </div>
    <!-- Script de tema y animaciones -->
  </body>
</html>
```

**Scripts importantes:**
- El script inline en el `<head>` inicializa el tema a "light" (elimina cualquier stored preference para evitar flash)
- El script al final del `<body>` maneja:
  - Toggle de tema con persistencia en localStorage
  - Iconos SVG para los estados light/dark
  - Observer para animaciones de scroll `.animate-on-scroll`

---

### 5.2 `src/layouts/BlogLayout.astro`

**Propósito:** Layout especializado para la renderización de blog posts escritos en Markdown. Añade estructura de documento de blog con título prominente, metadatos, e imagen hero opcional.

**Props (frontmatter del markdown):**
- `title`: Título del post (usado como h1 y title de la página)
- `description`: Para meta SEO
- `pubDate`: Fecha de publicación
- `author`: Nombre del autor
- `heroImage`: (opcional) Ruta a imagen de portada

**Estructura:**
```html
<MainLayout title={frontmatter.title} description={frontmatter.description}>
  <Navbar navLinks={navLinks} client:load />
  <main class='blog'>
    <h1>{frontmatter.title}</h1>
    <p>Published on {frontmatter.pubDate} by {frontmatter.author}</p>
    <Image heroImage (si existe) />
    <slot />  <!-- Contenido markdown -->
  </main>
  <Footer navLinks={navLinks} />
</MainLayout>
```

**Diferencias con MainLayout:**
- Incluye Navbar y Footer (MainLayout no los incluye)
- Tiene clase `blog` para aplicar estilos de tipografía de blog.css
- Renderiza frontmatter de markdown (título, fecha, autor, imagen)

---

## 6. Componentes

### 6.1 `src/components/Navbar.jsx`

**Tipo:** Componente React (client-side hydrated)

**Propósito:** Barra de navegación responsive con menú hamburger para móvil. Utiliza Framer Motion para animaciones de apertura/cierre del menú.

**Props:**
- `navLinks`: Array de objetos `{ name: string, href: string }`

**Comportamiento:**
- **Desktop (lg+)**: Muestra únicamente el logo (navLogoText) — la navegación se muestra en la sección Hero
- **Mobile**: Botón hamburger que despliega overlay completo con links

**Detalles de implementación:**
- Estado `isToggled` (useState) controla apertura del menú
- Variantes de animación de Framer Motion:
  - `container`: Controla stagger de children
  - `item`: Controla opacity y x (slide desde derecha)
- Hamburguer menu: 3 spans que animan a X cuando está abierto

**Nota actual:** El componente está incompleto/muy reducido comparado con la descripción del header. Solo renderiza el logo sin menú de navegación funcional.

---

### 6.2 `src/components/Section.astro`

**Propósito:** Wrapper genérico y reutilizable para secciones de página. Proporciona estilos base de sección con soporte para IDs de anclas.

**Props:**
- `styles` (string, opcional): Clases CSS adicionales de Tailwind
- `ids` (string, opcional): ID para navegación por anclas

**Uso:**
```astro
<Section styles='p-8 md:p-16' ids='about'>
  <!-- contenido -->
</Section>
```

**Implementación:**
```html
<section class={`bg-fixed w-full ${styles}`} id={ids}>
  <slot />
</section>
```

---

### 6.3 `src/components/Footer.astro`

**Propósito:** Componente de pie de página con información de copyright y navegación secundaria.

**Props:**
- `navLinks`: Array de enlaces de navegación

**Características:**
- Copyright dinámico con año actual (`new Date().getFullYear()`)
- Texto decorativo "˚. ⭒ Thank u for visiting ⋆˙⟡."
- Animación de fade-in basada en IntersectionObserver (clase `footer-fade`)

**Estructura:**
```html
<footer>
  <span>© {year} ˚. ⭒ Thank u for visiting ⋆˙⟡.</span>
</footer>
<script>  // Intersection Observer para animación -->
```

---

### 6.4 `src/components/AsciiCanvas.astro`

**Propósito:** Renderer de arte ASCII animado. Carga frames precalculados desde JSON y los reproduce usando requestAnimationFrame.

**Props:**
- `gifSources`: Array de rutas a GIFs originales (para generar paths a JSON)
- `desktopWidth`: Ancho del canvas en desktop
- `desktopMinHeight`: Altura mínima del canvas
- `desktopFontSize`: Tamaño de fuente para caracteres ASCII
- `className`: Clases CSS adicionales

**Mecanismo de funcionamiento:**

1. **Prebuild time**: El script `extract-ascii-frames.mjs` convierte GIFs → JSON con frames ASCII
2. **Runtime**: El componente calcula las rutas a los JSON basándose en el nombre del GIF
3. **Renderizado**: Script inline detecta si es mobile/desktop y carga el JSON correspondiente
4. **Animación**: Usa `requestAnimationFrame` para ciclar entre frames según su duración

**Estructura del JSON de frames:**
```json
[
  {
    "ascii": "...líneas de texto ASCII...",
    "duration": 100  // milisegundos
  },
  ...
]
```

**Características técnicas:**
- Detección de móvil via userAgent y touch support
- Carga versiones "mobile" con menos columnas para mejor rendimiento
- Cancela animaciones en `astro:before-swap` para evitar memory leaks
- Fuente: IBM Plex Mono

---

### 6.5 `src/components/SkillsBox.astro`

**Propósito:** Contenedor flexible de badges de habilidades técnicas. Renderiza una lista de SkillItem con wrap.

**Props:**
- `skills` (Array<string>): Lista de nombres de habilidades

**Estructura:**
```html
<div class="flex flex-wrap justify-end">
  {skills.map(skill => <SkillItem skill={skill} />)}
</div>
```

---

### 6.6 `src/components/SkillItem.astro`

**Propósito:** Badge individual para una habilidad técnica.

**Props:**
- `skill` (string): Nombre de la habilidad

**Estilos:**
- `rounded-full`: Bordes completamente redondeados (pill shape)
- `bg-gray-200`: Fondo gris claro
- `hover:bg-gray-300`: Efecto hover
- `min-w-[60px]`: Ancho mínimo para consistencia

---

### 6.7 `src/components/VideoItem.astro`

**Propósito:** Tarjeta de preview de video con controles de reproducción.

**Props:**
- `videoSrc`: Ruta al archivo de video
- `title`: (opcional) Título sobre el video
- `description`: (opcional) Texto descriptivo debajo
- `bordered`: (boolean, default true) Si tiene borde/shadow o es simple

**Características de video:**
- `autoplay`: Reproducción automática
- `muted`: Sin audio (necesario para autoplay en browsers)
- `loop`: Cicla indefinidamente
- `controls`: Muestra controles de playback

---

### 6.8 `src/components/ImageItem.astro`

**Propósito:** Tarjeta para mostrar capturas de pantalla o imágenes estáticas.

**Props:**
- `imageSrc`: Ruta a la imagen
- `alt`: Texto alternativo para accesibilidad
- `caption`: (opcional) Pie de foto

**Características:**
- `loading='lazy'`: Carga diferida para performance
- `object-cover`: Ajuste de imagen sin distorsión
- `<figure>` y `<figcaption>` semánticos

---

### 6.9 `src/components/ContactBoxItem.astro`

**Propósito:** Enlace individual de contacto/red social.

**Props:**
- `contact`: Objeto `{ name: string, link: string }`
- `icon`: (opcional) String SVG a renderizar

**Características:**
- Fila clickeable completa
- Icono SVG a la izquierda del texto
- Hover: border-bottom, color a negro, font-semibold

---

## 7. Componentes de Sección

### 7.1 `src/components/sections/MainSection.astro`

**Propósito:** Sección Hero principal — la primera visualización del portfolio. Incluye nombre, bio, y ASCII art decorativo.

**Props recibidos:**
- `navLinks`: Links de navegación (pasa a Navbar)
- `myName`: Nombre del propietario
- `myBio`: Biografía corta

**Layout:**
- **Desktop**: Split horizontal — texto izquierda (50%), ASCII derecha (50%)
- **Mobile**: Stack vertical — texto arriba, ASCII abajo

**Componentes utilizados:**
- `Navbar`: Barra de navegación (sin links aquí, solo logo)
- `Section`: Wrapper de sección
- `AsciiCanvas`: Animación ASCII decorativa

**Estilos destacados:**
- `min-h-[80vh]`: Ocupa al menos 80% del viewport height
- `text-balance`: Balance de líneas para mejor lectura

---

### 7.2 `src/components/sections/AboutSection.astro`

**Propósito:** Sección de "Sobre mí" con biography extendida y lista de habilidades técnicas.

**Props recibidos:**
- `aboutMe`: Texto biográfico largo
- `skills`: Array de habilidades

**Layout:**
- **Desktop**: Split con texto a la derecha (50%), ASCII a la izquierda
- **Mobile**: Stack vertical

**Componentes utilizados:**
- `Section`: Wrapper
- `SkillsBox`: Contenedor de badges de habilidades
- `AsciiCanvas`: Animación decorativa

**Particularidad:** Los textos están alineados a la derecha en desktop (`text-right`).

---

### 7.3 `src/components/sections/BlogSection.astro`

**Propósito:** Sección de proyectos actuales/escritos. Muestra videos de demos de la webapp y del juego de Godot.

**Props recibidos:**
- `writingText`: Texto descriptivo de la sección

**Datos hardcoded (dentro del componente):**
- `webappProject`: Info del dashboard webapp
- `godotProjects`: Array con 2 proyectos de Godot Engine

**Layout:**
1. Header "Current Projects"
2. Bloque "Try live the deployed app INCIDENsly 𝒘ebApp" con screenshot clickeable
3. Video + descripción del webapp
4. Proyectos Godot centrados

**Componentes utilizados:**
- `VideoItem`: Para demos de video
- `ImageItem`: Para screenshot de la app
- `Section`: Wrapper

---

### 7.4 `src/components/sections/ContactSection.astro`

**Propósito:** Sección de contacto con enlaces a redes sociales y plataformas de comunicación.

**Props recibidos:**
- `contactText`: Texto introductorio
- `contactOptions`: Array de enlaces de contacto

**Datos hardcoded:**
- Iconos SVG inline para Email, WhatsApp, GitHub, LinkedIn

**Layout:**
- **Desktop**: Split — texto izquierda (60%), enlaces derecha (30%)
- **Mobile**: Stack vertical — texto arriba, iconos abajo

**Componentes utilizados:**
- `Section`: Wrapper
- `ContactBoxItem`: Para cada link individual
- `AsciiCanvas`: Animación decorativa en la esquina inferior

---

## 8. Estilos

### 8.1 `src/styles/styles.css`

**Propósito:** Estilos globales base para todo el portfolio. Incluye reset CSS, tipografía, sistema de temas, y animaciones de scroll.

**Secciones del archivo:**

#### Reset y Base
```css
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Google Sans Code', monospace;
}
```

#### Fondo de página
- Patrón de puntos con gradiente radial
- Color base: `#d6e5f0` (azul claro)
- `background-attachment: fixed` para efecto de profundidad

#### Sistema de Tema Dark/Light
```css
/* Light mode: colores por defecto */
/* Dark mode: filter invert + hue-rotate */
html[data-theme='dark'] body::before { filter: invert(1) hue-rotate(180deg); }
html[data-theme='dark'] .site-shell { filter: invert(1) hue-rotate(180deg); }

/* Excepciones: videos, imágenes no se invierten */
html[data-theme='dark'] video,
html[data-theme='dark'] img { filter: invert(1) hue-rotate(180deg); }
```

**Nota técnica:** El sistema de tema usa inversión CSS en lugar de variables de color. Esto significa que todos los colores se invierten, lo cual requiere excepciones para elementos multimedia.

#### Toggle de Tema
- Botón fijo en esquina superior derecha
- Iconos SVG para sol/luna
- Transiciones suaves

#### Animaciones de Scroll
```css
.animate-on-scroll {
  opacity: 0;
  transform: translate3d(0, 32px, 0) scale(0.985);
  transition: opacity 0.7s cubic-bezier(...), transform 0.7s cubic-bezier(...);
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1);
}
```

**Stagger children:**
```css
.stagger-container .animate-on-scroll:nth-child(n) { transition-delay: (n-1) * 90ms; }
```
Soporta hasta 10 hijos con delays de 0ms a 810ms.

#### Accesibilidad
```css
@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll,
  .animate-on-scroll.is-visible {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

---

### 8.2 `src/styles/blog.css`

**Propósito:** Estilos de tipografía específicos para contenido de blog posts. Aplicados a elementos Markdown renderizados.

**Selectores:** Todos precedidos por `.blog` para scoping.

**Elementos estilados:**
- **Headings (h1-h4)**: Tamaños responsivos con font-weight 600-700
- **Párrafos**: `line-height: 1.5`, `margin-bottom: 1em`
- **Listas**: Estilos disc (ul) y number (ol) con indentación
- **Enlaces**: Color `#2980b9` (azul) sin underline, hover con underline
- **Blockquotes**: Fondo gris claro, borde izquierdo azul
- **Code blocks**: Fondo `#f8f8f8`, borde `#ddd`

**Responsive:**
```css
@media (max-width: 600px) {
  .blog h1 { font-size: 2em; }
  .blog h2 { font-size: 1.75em; }
  /* etc. */
}
```

---

## 9. Scripts y Build

### 9.1 `scripts/extract-ascii-frames.mjs`

**Propósito:** Script de prebuild que convierte archivos GIF en archivos JSON conteniendo frames de arte ASCII. Esto permite que el browser reproduzca animaciones ASCII sin necesidad de decodificar GIFs en tiempo real.

**Flujo de ejecución:**
```
npm run build
  → Ejecuta prebuild (este script)
  → npm run build (astro build)
```

**Mecanismo técnico:**

1. **Lectura de directorio**: Escanea `public/gif/` buscando archivos `.gif`
2. **Extracción de frames**: Usa librería `omggif` para leer cada frame del GIF
3. **Conversión a ASCII**: Para cada pixel, calcula luminance y mapea a carácter del charset
4. **Generación de variantes**: Crea 2 versiones por GIF:
   - Desktop: 64 columnas
   - Mobile: 40 columnas

**Charset utilizado:** ` .:,:-=+*#%@` (del más claro al más oscuro)

**Algoritmo de conversión:**
```javascript
// Luminosidad ponderada (recomendación ITU-R BT.601)
lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
// Alpha < 0.08 se trata como espacio vacío
// Mapeo a índice del charset según luminosidad
```

**Salida:** Archivos JSON en `public/ascii-frames/` con estructura:
```
Cube-shape-animation.json          (desktop, 64 cols)
Cube-shape-animation-mobile.json   (mobile, 40 cols)
```

**Parámetros configurables:**
- `GIF_COLUMN_MAP`: Personalización de columnas por archivo
- `COLUMNS_MOBILE`: Columnas para versión móvil

---

## 10. Recursos Públicos

### 10.1 Directorio `public/`

```
public/
├── ascii-frames/       # JSON con frames ASCII precalculados
│   ├── Cube-shape-animation.json
│   ├── Cube-shape-animation-mobile.json
│   ├── Cube-shape-animation-2.json
│   ├── Cube-shape-animation-2-mobile.json
│   ├── Cube-shape-animation-3.json
│   └── Cube-shape-animation-3-mobile.json
├── gif/              # GIFs fuente para animación
│   ├── Cube-shape-animation.gif
│   ├── Cube-shape animation-2.gif
│   └── Cube-shape animation-3.gif
├── videos/           # Videos de demos de proyectos
│   ├── webapp-demo.mp4
│   ├── game-demo.mp4
│   └── game-demo-2.mp4
├── images/           # Capturas de pantalla
│   └── academy-screenshot-1.png
├── icons/            # Iconos diversos
├── favicon.svg       # Favicon del sitio
└── align-gif/        # Referencias de alineamiento (no usado activamente)
```

---

## 11. Funcionalidades Principales

### 11.1 Sistema de Temas (Dark/Light)

**Implementación:**
- Toggle button fijo en esquina superior derecha
- Estado almacenado en `localStorage` key: `theme-mode`
- Tema inicial forzado a "light" en carga para evitar flash
- Inversión CSS para dark mode (filter: invert + hue-rotate)

**Elementos no invertidos:**
- Videos (`<video>`)
- Imágenes (`<img>`)
- Canvas

### 11.2 Animaciones de Scroll

**Sistema basado en IntersectionObserver:**
- Selecciona todos los elementos con clase `.animate-on-scroll`
- Cuando entran en viewport (threshold 0.16, rootMargin -12%), añade clase `is-visible`
- Animación: fade-in + slide-up con easing cubic-bezier(0.22, 1, 0.36, 1)

**Stagger:**
- Elementos dentro de `.stagger-container` tienen delays incrementales
- Delay por hijo: `(n - 1) * 90ms`

### 11.3 View Transitions

**Controladas por variable `isTransitionEnabled` en `data.js`:**
- Si `true`: Incluye `<ViewTransitions />` de Astro
- Si `false`: Deshabilita transiciones (útil durante desarrollo)

### 11.4 Navegación por Anclas

**Implementación:**
- Links en navbar: `/`, `/#about`, `/#blog`, `/#contact`
- Cada sección tiene `id` correspondiente
- `scroll-behavior: smooth` en CSS

---

## 12. Consideraciones de Desarrollo

### Dependencias de Build
- El build requiere Node.js y npm
- Script de prebuild necesita acceso a filesystem

### Assets Requeridos
- Los JSON de ascii-frames pueden regenerarse con `npm run prebuild`
- Los GIFs en `public/gif/` son la fuente para la conversión

### SEO
- Meta description configurable por página
- Sitemap automático generado
- robots.txt dinámico incluyendo referencia al sitemap

### Accesibilidad
- Soporte para `prefers-reduced-motion`
- Botón de tema tiene `aria-label`
- Imágenes tienen `alt` text
- Videos tienen `controls`

---

*Documentación generada para el portfolio de Salem. Última actualización: Abril 2026*