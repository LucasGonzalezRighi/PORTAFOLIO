import type { CSSProperties } from 'react';

/**
 * Patrones de estilo compartidos del Design System.
 * Siempre referencian design tokens (var(--token)) — nunca valores sueltos.
 */

/** Estado inicial de un elemento con data-reveal (el motor lo anima) */
export const revealStyle: CSSProperties = {
  opacity: 0,
  transform: 'translateY(var(--reveal-shift))',
  transition: 'opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out)',
};

/** Etiqueta mono pequeña en mayúsculas (labels, kickers secundarios) */
export const monoLabel: CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '10px',
  letterSpacing: '.14em',
  textTransform: 'uppercase',
  color: 'var(--text-dim)',
};

/** Tonos de acento reutilizados por cards según su color de marca */
export const tones = {
  blue: {
    color: 'var(--blue-400)',
    border: 'rgba(78,159,212,.16)',
    borderStrong: 'rgba(78,159,212,.24)',
    bgSoft: 'rgba(29,95,168,0.1)',
    chipBorder: 'rgba(78,159,212,0.18)',
    badgeBorder: 'rgba(78,159,212,.55)',
    glow: 'rgba(78,159,212,.5)',
  },
  blue500: {
    color: 'var(--blue-500)',
    border: 'rgba(78,159,212,.16)',
    borderStrong: 'rgba(78,159,212,.24)',
    bgSoft: 'rgba(29,95,168,0.1)',
    chipBorder: 'rgba(78,159,212,0.18)',
    badgeBorder: 'rgba(78,159,212,.55)',
    glow: 'rgba(46,127,196,.5)',
  },
  green: {
    color: 'var(--green-400)',
    border: 'rgba(33,224,127,.16)',
    borderStrong: 'rgba(33,224,127,.24)',
    bgSoft: 'rgba(33,224,127,0.08)',
    chipBorder: 'rgba(33,224,127,0.2)',
    badgeBorder: 'rgba(33,224,127,.55)',
    glow: 'rgba(33,224,127,.45)',
  },
  lime: {
    color: 'var(--lime-400)',
    border: 'rgba(107,245,168,.16)',
    borderStrong: 'rgba(107,245,168,.24)',
    bgSoft: 'rgba(107,245,168,0.07)',
    chipBorder: 'rgba(107,245,168,0.2)',
    badgeBorder: 'rgba(107,245,168,.55)',
    glow: 'rgba(107,245,168,.4)',
  },
} as const;

export type Tone = keyof typeof tones;
