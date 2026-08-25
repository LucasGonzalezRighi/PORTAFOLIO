/**
 * ============================================================================
 * DESIGN TOKENS — Única fuente de verdad del Design System
 * ============================================================================
 * Identidad visual del portfolio (dark · azul/celeste · verde).
 *
 * Estos tokens alimentan DOS salidas:
 *   1. Variables CSS (`:root`) inyectadas por el plugin de tailwind.config.ts
 *      → todo el CSS/inline-style usa `var(--token)`.
 *   2. El theme de Tailwind → clases utilitarias (`bg-bg-0`, `text-lime-400`,
 *      `font-mono`, `rounded-md`, `duration-base`, …).
 *
 * Regla: ningún componente hardcodea colores/tiempos/tamaños; siempre
 * referencia un token (via var() o clase Tailwind).
 * ============================================================================
 */

// ─────────────────────────────────────────────────────────────
// COLOR
// ─────────────────────────────────────────────────────────────
export const colors = {
  /** Superficies base */
  bg: { 0: '#060A15', 1: '#0A1220', 2: '#132C43' },
  surface: {
    1: 'rgba(18,38,58,.5)',
    2: 'rgba(10,18,32,.72)',
    3: 'rgba(10,18,32,.92)',
  },
  /** Azules — jerarquía primaria */
  blue: { 600: '#1D5FA8', 500: '#2C7FC4', 400: '#4E9FD4' },
  /** Verdes — acento único, reservado */
  lime: { 500: '#4FD98F', 400: '#6BF5A8' },
  green: { 400: '#21E07F' },
  /** Colores de syntax highlighting */
  code: {
    key: '#E4587A',
    str: '#6BF5A8',
    fn: '#4E9FD4',
    num: '#21E07F',
    type: '#8FBFDD',
    comment: '#46617C',
    punct: '#7E96AE',
  },
  /** Texto */
  text: {
    strong: '#F4F8FC',
    body: '#D3DEE9',
    secondary: '#B9C7D6',
    tertiary: '#9AACBF',
    muted: '#7E92A7',
    dim: '#7C93A9',
    faint: '#62809A',
  },
} as const;

// ─────────────────────────────────────────────────────────────
// TIPOGRAFÍA
// ─────────────────────────────────────────────────────────────
export const typography = {
  fontFamily: {
    sans: ["'Space Grotesk'", 'system-ui', 'sans-serif'],
    mono: ["'JetBrains Mono'", 'ui-monospace', 'monospace'],
  },
  /** Escala fluida (clamp) */
  fontSize: {
    h1: 'clamp(44px,7.2vw,104px)',
    h2: 'clamp(30px,3.6vw,52px)',
    h3: 'clamp(19px,1.8vw,24px)',
    h4: '18px',
    lead: 'clamp(16px,1.4vw,19px)',
    'body-md': 'clamp(15px,1.2vw,18px)',
    'body-sm': '15px',
    'body-xs': '14.5px',
    code: '13px',
    label: '13px',
    kicker: '11px',
    micro: '10px',
  },
  fontWeight: { regular: '400', medium: '500', semibold: '600', h2: '600' },
  lineHeight: { h1: '.94', h2: '1.08', body: '1.65', loose: '1.7' },
  letterSpacing: {
    h1: '-.035em',
    h2: '-.03em',
    kicker: '.24em',
    mono: '.12em',
  },
  measure: { h2: '22ch', body: '56ch' },
} as const;

// ─────────────────────────────────────────────────────────────
// ESPACIADO Y LAYOUT
// ─────────────────────────────────────────────────────────────
export const spacing = {
  1: '4px', 2: '8px', 3: '14px', 4: '22px',
  5: '26px', 6: '32px', 7: '44px', 8: '64px',
  'gap-card': '18px',
  'gap-grid': '20px',
  'section-y': 'clamp(90px,11vw,170px)',
  gutter: 'clamp(20px,5vw,64px)',
} as const;

export const container = { DEFAULT: '1280px', narrow: '1120px' } as const;

// ─────────────────────────────────────────────────────────────
// BORDES, RADIOS, SOMBRAS Y GLOW
// ─────────────────────────────────────────────────────────────
export const borderRadius = {
  sm: '8px', md: '14px', lg: '20px', xl: '24px', pill: '999px',
} as const;

export const borders = {
  blue: '1px solid rgba(78,159,212,.18)',
  green: '1px solid rgba(33,224,127,.2)',
  lime: '1px solid rgba(107,245,168,.2)',
  faint: '1px solid rgba(78,159,212,.12)',
} as const;

export const boxShadow = {
  card: '0 26px 60px -38px rgba(8,14,26,.95)',
  lift: '0 32px 70px -52px rgba(8,14,26,.95)',
  'glow-blue': '0 0 26px -14px rgba(78,159,212,.6)',
  'glow-green': '0 0 32px -12px rgba(33,224,127,.8)',
  'glow-lime': '0 0 32px -12px rgba(107,245,168,.75)',
} as const;

// ─────────────────────────────────────────────────────────────
// GRADIENTES (acentos de marca)
// ─────────────────────────────────────────────────────────────
export const gradients = {
  cta: colors.blue[400],
  text: colors.lime[400],
  rail: colors.blue[400],
  'accent-2': colors.green[400],
} as const;

// ─────────────────────────────────────────────────────────────
// MOVIMIENTO
// ─────────────────────────────────────────────────────────────
export const motion = {
  duration: { fast: '.18s', base: '.3s', mid: '.5s', slow: '.9s', gradient: '6s' },
  easing: {
    out: 'cubic-bezier(.22,1,.36,1)',
    flip: 'cubic-bezier(.4,.05,.2,1)',
  },
  revealShift: '28px',
} as const;

// ─────────────────────────────────────────────────────────────
// BLUR, OPACIDAD, Z-INDEX, BREAKPOINTS
// ─────────────────────────────────────────────────────────────
export const blur = { glass: 'blur(14px)', nav: 'blur(16px)', glow: 'blur(80px)' } as const;
export const opacity = { 'code-bg': '.055', disabled: '.45' } as const;
export const zIndex = { bg: '0', content: '1', spot: '2', nav: '55', cursor: '60' } as const;
export const screens = { tablet: '720px', desktop: '900px' } as const;

// ─────────────────────────────────────────────────────────────
// SALIDA 1: variables CSS  (inyectadas en :root por Tailwind)
// ─────────────────────────────────────────────────────────────
export function cssVariables(): Record<string, string> {
  return {
    /* superficies */
    '--bg-0': colors.bg[0], '--bg-1': colors.bg[1], '--bg-2': colors.bg[2],
    '--surface-1': colors.surface[1], '--surface-2': colors.surface[2], '--surface-3': colors.surface[3],
    /* azules */
    '--blue-600': colors.blue[600], '--blue-500': colors.blue[500], '--blue-400': colors.blue[400],
    /* verdes */
    '--lime-500': colors.lime[500], '--lime-400': colors.lime[400], '--green-400': colors.green[400],
    /* código */
    '--code-key': colors.code.key, '--code-str': colors.code.str, '--code-fn': colors.code.fn,
    '--code-num': colors.code.num, '--code-type': colors.code.type,
    '--code-comment': colors.code.comment, '--code-punct': colors.code.punct,
    /* texto */
    '--text-strong': colors.text.strong, '--text-body': colors.text.body,
    '--text-secondary': colors.text.secondary, '--text-tertiary': colors.text.tertiary,
    '--text-muted': colors.text.muted, '--text-dim': colors.text.dim, '--text-faint': colors.text.faint,
    /* tipografía */
    '--font-sans': typography.fontFamily.sans.join(', '),
    '--font-mono': typography.fontFamily.mono.join(', '),
    '--text-h1': typography.fontSize.h1, '--text-h2': typography.fontSize.h2,
    '--text-h3': typography.fontSize.h3, '--text-h4': typography.fontSize.h4,
    '--text-lead': typography.fontSize.lead, '--text-body-md': typography.fontSize['body-md'],
    '--text-body-sm': typography.fontSize['body-sm'], '--text-body-xs': typography.fontSize['body-xs'],
    '--text-code': typography.fontSize.code, '--text-label': typography.fontSize.label,
    '--text-kicker': typography.fontSize.kicker, '--text-micro': typography.fontSize.micro,
    '--weight-h2': typography.fontWeight.h2,
    '--leading-h1': typography.lineHeight.h1, '--leading-h2': typography.lineHeight.h2,
    '--leading-body': typography.lineHeight.body, '--leading-loose': typography.lineHeight.loose,
    '--tracking-h1': typography.letterSpacing.h1, '--tracking-h2': typography.letterSpacing.h2,
    '--tracking-kicker': typography.letterSpacing.kicker, '--tracking-mono': typography.letterSpacing.mono,
    '--measure-h2': typography.measure.h2, '--measure-body': typography.measure.body,
    /* espaciado */
    '--space-1': spacing[1], '--space-2': spacing[2], '--space-3': spacing[3], '--space-4': spacing[4],
    '--space-5': spacing[5], '--space-6': spacing[6], '--space-7': spacing[7], '--space-8': spacing[8],
    '--gap-card': spacing['gap-card'], '--gap-grid': spacing['gap-grid'],
    '--section-y': spacing['section-y'], '--gutter': spacing.gutter,
    '--container': container.DEFAULT, '--container-narrow': container.narrow,
    /* bordes y radios */
    '--radius-sm': borderRadius.sm, '--radius-md': borderRadius.md, '--radius-lg': borderRadius.lg,
    '--radius-xl': borderRadius.xl, '--radius-pill': borderRadius.pill,
    '--border-blue': borders.blue, '--border-green': borders.green,
    '--border-lime': borders.lime, '--border-faint': borders.faint,
    /* sombras y glow */
    '--shadow-card': boxShadow.card, '--shadow-lift': boxShadow.lift,
    '--glow-blue': boxShadow['glow-blue'], '--glow-green': boxShadow['glow-green'],
    '--glow-lime': boxShadow['glow-lime'],
    /* gradientes */
    '--gradient-cta': gradients.cta, '--gradient-text': gradients.text,
    '--gradient-rail': gradients.rail, '--gradient-accent-2': gradients['accent-2'],
    /* movimiento */
    '--dur-fast': motion.duration.fast, '--dur-base': motion.duration.base,
    '--dur-mid': motion.duration.mid, '--dur-slow': motion.duration.slow,
    '--dur-gradient': motion.duration.gradient,
    '--ease-out': motion.easing.out, '--ease-flip': motion.easing.flip,
    '--reveal-shift': motion.revealShift,
    /* blur, opacidad, z-index */
    '--blur-glass': blur.glass, '--blur-nav': blur.nav, '--blur-glow': blur.glow,
    '--opacity-code-bg': opacity['code-bg'], '--opacity-disabled': opacity.disabled,
    '--z-bg': zIndex.bg, '--z-content': zIndex.content, '--z-spot': zIndex.spot,
    '--z-nav': zIndex.nav, '--z-cursor': zIndex.cursor,
    /* breakpoints (informativos para JS) */
    '--bp-tablet': screens.tablet, '--bp-desktop': screens.desktop,
  };
}

export const tokens = {
  colors, typography, spacing, container, borderRadius, borders,
  boxShadow, gradients, motion, blur, opacity, zIndex, screens,
} as const;

export type Tokens = typeof tokens;
