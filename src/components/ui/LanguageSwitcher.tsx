import { useEffect, useRef, useState } from 'react';
import { LANGS, useLang } from '@/i18n/LanguageContext';

/**
 * Selector de idioma.
 * - `dropdown`: botón sutil con desplegable (navbar desktop).
 * - `chips`: fila de tres chips grandes (menú mobile).
 */
export function LanguageSwitcher({ variant = 'dropdown' }: { variant?: 'dropdown' | 'chips' }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Cerrar el desplegable al hacer click afuera o con Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (variant === 'chips') {
    return (
      <div role="group" aria-label="Idioma" style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {LANGS.map((l) => {
          const active = l.code === lang;
          return (
            <button
              key={l.code}
              type="button"
              onClick={() => setLang(l.code)}
              aria-pressed={active}
              style={{
                flex: 1,
                padding: '12px 0',
                borderRadius: 'var(--radius-md)',
                border: active ? '1px solid var(--green-400)' : '1px solid rgba(78,159,212,.2)',
                background: active ? 'rgba(33,224,127,.1)' : 'rgba(16,42,67,.4)',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '.12em',
                color: active ? 'var(--lime-400)' : 'var(--text-dim)',
                cursor: 'pointer',
                transition: 'border-color .25s,color .25s,background .25s',
              }}
            >
              {l.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={rootRef} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Idioma"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 12px',
          borderRadius: 'var(--radius-pill)',
          border: open ? '1px solid var(--blue-400)' : '1px solid rgba(78,159,212,.2)',
          background: 'rgba(16,42,67,.4)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-kicker)',
          letterSpacing: '.1em',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          transition: 'border-color .25s,color .25s',
        }}
      >
        {/* Globo minimalista */}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--blue-400)" strokeWidth="1.7" strokeLinecap="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.6 2.4 4 5.6 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.6-4-9s1.4-6.6 4-9z" />
        </svg>
        {lang.toUpperCase()}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .25s var(--ease-out)' }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Idiomas disponibles"
          style={{
            position: 'absolute',
            top: 'calc(100% + 10px)',
            right: 0,
            minWidth: '164px',
            padding: '6px',
            borderRadius: 'var(--radius-md)',
            border: 'var(--border-blue)',
            background: 'rgba(8,17,31,.96)',
            backdropFilter: 'var(--blur-glass)',
            boxShadow: 'var(--shadow-card)',
            animation: 'fadein .22s var(--ease-out) both',
            zIndex: 5,
          }}
        >
          {LANGS.map((l) => {
            const active = l.code === lang;
            return (
              <button
                key={l.code}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                data-hover="background:rgba(29,95,168,.18);color:#fff"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '9px 11px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: active ? 'rgba(33,224,127,.08)' : 'transparent',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13.5px',
                  textAlign: 'left',
                  color: active ? 'var(--lime-400)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'background .2s,color .2s',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.1em', color: active ? 'var(--green-400)' : 'var(--text-faint)', width: '20px' }}>
                  {l.label}
                </span>
                {l.name}
                {active && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--green-400)" strokeWidth="2" strokeLinecap="round" style={{ marginLeft: 'auto' }}>
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
