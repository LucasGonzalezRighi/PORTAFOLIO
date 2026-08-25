# Portfolio — Lucas González Righi

Portfolio personal construido con **React 19 + TypeScript + Vite + Tailwind CSS**, sobre un
**Design System basado en Design Tokens**: todos los colores, tipografías, espaciados,
radios, sombras, animaciones, breakpoints y z-index viven en un único archivo
(`src/design/tokens.ts`) que alimenta tanto a Tailwind como a las variables CSS.

## Correr en local

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build de producción en /dist
```

## Arquitectura

```
src/
  design/tokens.ts        ← ÚNICA fuente de verdad de estilos (Design Tokens)
  content/                ← textos y datos editables (proyectos, experiencia, stack…)
  components/
    ui/SectionHeading.tsx ← título de sección reutilizable (kicker + h2 + acento)
    layout/               ← Navbar, Footer, Background, CursorFx
    sections/             ← Hero, About, Stack, Experience, Projects,
                            CodeShowcase, Education, Contact
  lib/
    effects.ts            ← motor de animaciones (reveals, typing, partículas,
                            tilt, flip, marquee, contadores, timeline…)
    highlight.tsx         ← syntax highlighting con tokens --code-*
  hooks/useEffectsEngine.ts
tailwind.config.ts        ← consume los tokens e inyecta las variables CSS en :root
public/                   ← CV, foto, screenshots de proyectos, íconos, fuentes
```

### Reglas del Design System

1. **Cero valores hardcodeados**: los componentes solo usan `var(--token)` o clases
   de Tailwind generadas desde los tokens.
2. Para cambiar la identidad visual, **se edita solo `src/design/tokens.ts`**.
3. Los textos se editan en `src/content/` sin tocar componentes.
4. Los comportamientos se declaran con atributos `data-*` (ver `src/lib/effects.ts`).
5. Todas las animaciones respetan `prefers-reduced-motion`.

## Deploy: GitHub + Vercel (con tu cuenta de Gmail)

### 1. Subir a GitHub

1. Entrá a [github.com](https://github.com) e iniciá sesión (o registrate con tu Gmail).
2. Creá un repositorio nuevo: **New repository** → nombre `portfolio` → **Create repository**
   (sin README, el proyecto ya tiene uno).
3. En tu máquina, dentro de la carpeta del proyecto:

```bash
git remote add origin https://github.com/TU-USUARIO/portfolio.git
git push -u origin main
```

> El repo ya viene con git inicializado y el primer commit hecho.

### 2. Deploy en Vercel

1. Entrá a [vercel.com](https://vercel.com) → **Sign Up** → **Continue with Google**
   (tu cuenta de Gmail).
2. **Add New… → Project** → **Import Git Repository** → conectá tu GitHub y elegí `portfolio`.
3. Vercel detecta Vite automáticamente (build: `npm run build`, output: `dist`).
   No hace falta configurar nada.
4. **Deploy**. En un minuto tenés tu URL: `https://portfolio-xxxx.vercel.app`.

Cada `git push` a `main` redespliega automáticamente.

### Dominio propio (opcional)

En Vercel → tu proyecto → **Settings → Domains** podés agregar un dominio
(`lucasgonzalezrighi.dev`, etc.).
