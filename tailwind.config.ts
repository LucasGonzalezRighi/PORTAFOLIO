import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import {
  colors,
  typography,
  spacing,
  container,
  borderRadius,
  boxShadow,
  motion,
  zIndex,
  screens,
  cssVariables,
} from './src/design/tokens';

/**
 * Tailwind se alimenta EXCLUSIVAMENTE de los design tokens
 * (src/design/tokens.ts). Además, el plugin inyecta esos mismos tokens
 * como variables CSS en :root, de modo que TODO el estilado
 * (clases utilitarias y var(--token)) sale de una única fuente.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      bg: colors.bg,
      surface: colors.surface,
      blue: colors.blue,
      lime: colors.lime,
      green: colors.green,
      code: colors.code,
      text: colors.text,
    },
    fontFamily: {
      sans: typography.fontFamily.sans as unknown as string[],
      mono: typography.fontFamily.mono as unknown as string[],
    },
    borderRadius: { none: '0', ...borderRadius, full: borderRadius.pill },
    screens: { tablet: screens.tablet, desktop: screens.desktop },
    extend: {
      fontSize: { ...typography.fontSize },
      spacing: { ...spacing },
      maxWidth: { container: container.DEFAULT, 'container-narrow': container.narrow },
      boxShadow: { ...boxShadow },
      transitionDuration: {
        fast: motion.duration.fast,
        base: motion.duration.base,
        mid: motion.duration.mid,
        slow: motion.duration.slow,
      },
      transitionTimingFunction: {
        out: motion.easing.out,
        flip: motion.easing.flip,
      },
      zIndex: { ...zIndex },
    },
  },
  plugins: [
    /** Inyecta los design tokens como variables CSS en :root */
    plugin(({ addBase }) => {
      addBase({ ':root': cssVariables() });
    }),
  ],
} satisfies Config;
