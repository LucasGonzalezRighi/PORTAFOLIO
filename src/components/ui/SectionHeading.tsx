import { revealStyle } from '@/lib/styles';

interface SectionHeadingProps {
  /** Etiqueta mono sobre el título, ej: "01 Sobre mí" */
  kicker: string;
  /** Título principal (la parte sin acento) */
  title: string;
  /** Palabra(s) destacadas en verde lima */
  accent?: string;
  /** Sufijo después del acento (por defecto ".") */
  tail?: string;
  /** Color del kicker */
  accentColor?: string;
  align?: 'left' | 'center';
}

/**
 * Título de sección del Design System: kicker mono + h2 con acento.
 * Unifica jerarquía, alineación y espaciados en todas las secciones.
 */
export function SectionHeading({
  kicker,
  title,
  accent = '',
  tail = '.',
  accentColor = 'var(--blue-400)',
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        textAlign: align,
        width: '100%',
      }}
    >
      <div data-reveal="1" style={revealStyle}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-kicker)',
            letterSpacing: 'var(--tracking-kicker)',
            textTransform: 'uppercase',
            color: accentColor,
          }}
        >
          {kicker}
        </span>
      </div>
      <h2
        data-reveal="1"
        data-delay="90"
        style={{
          ...revealStyle,
          margin: 0,
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-h2)',
          fontWeight: 600,
          lineHeight: 'var(--leading-h2)',
          letterSpacing: 'var(--tracking-h2)',
          maxWidth: '100%',
          textWrap: 'balance',
        }}
      >
        {title} <span style={{ color: 'var(--gradient-text)' }}>{accent}</span>
        {tail}
      </h2>
    </div>
  );
}
