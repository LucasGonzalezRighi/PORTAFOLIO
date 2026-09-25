import { useCallback, useEffect, useRef, useState } from 'react';
import { snippets } from '@/content/snippets';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLang } from '@/i18n/LanguageContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { highlight } from '@/lib/highlight';
import { revealStyle } from '@/lib/styles';

/** Duración del fundido al cambiar de archivo (ease-in-out) */
const FADE_MS = 340;
const EASE_IN_OUT = 'cubic-bezier(.65,0,.35,1)';

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Código en acción: explorador de snippets con typing effect,
 * syntax highlighting tokenizado y botón de copiado.
 */
export function CodeShowcase() {
  const { dict } = useLang();
  const t = dict.code;
  /** En mobile esta sección no se muestra (decisión de diseño mobile) */
  const isMobile = useMediaQuery('(max-width: 899px)');
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const [copied, setCopied] = useState(false);
  /** Cantidad de caracteres visibles; -1 = snippet completo (sin typing) */
  const [typedLen, setTypedLen] = useState(-1);
  const typeRaf = useRef(0);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  /** Contenedor scrolleable del código: sigue al cursor mientras escribe */
  const scrollRef = useRef<HTMLDivElement>(null);

  /** Editor: se observa para escribir solo mientras está en pantalla */
  const editorRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
  /** Estado del typing en curso (fuera de React para no re-renderizar de más) */
  const typeState = useRef<{ code: string; timeline: number[]; shown: number; elapsed: number; last: number } | null>(null);

  /**
   * Typing estrictamente monótono (nunca borra) con reloj PROPIO: el tiempo
   * solo avanza mientras el editor está en pantalla. Así arranca recién
   * cuando llegás a la sección, se pausa si te vas y sigue donde quedó.
   * Ritmo natural: ~20 caracteres/s con leve variación, pausa corta al
   * final de cada línea, más larga al cerrar una instrucción (; { } ,) y la
   * más larga en líneas vacías (entre bloques).
   */
  const startTyping = useCallback((index: number) => {
    cancelAnimationFrame(typeRaf.current);
    const current = snippets[index];
    if (!current || reducedMotion()) {
      typeState.current = null;
      setTypedLen(-1);
      return;
    }
    const code = current.code;
    const CHARS_PER_SECOND = 20;
    const START_DELAY_MS = 450; // respiro antes de la primera letra
    const LINE_PAUSE_MS = 240; // fin de línea
    const STATEMENT_PAUSE_MS = 260; // extra si la línea cierra con ; { } ,
    const BLOCK_PAUSE_MS = 620; // extra en línea vacía (entre bloques)
    const base = 1000 / CHARS_PER_SECOND;
    const timeline: number[] = new Array(code.length + 1);
    let t = START_DELAY_MS;
    timeline[0] = t;
    for (let i = 0; i < code.length; i++) {
      const ch = code[i];
      // jitter determinístico (±30 %) para que no se sienta mecánico
      const jitter = 0.7 + 0.6 * (((i * 7919) % 97) / 97);
      // los espacios de indentación salen más rápido, como un editor real
      t += ch === ' ' && code[i - 1] === ' ' ? base * 0.35 : base * jitter;
      if (ch === '\n') {
        t += LINE_PAUSE_MS;
        const prev = code.slice(0, i).trimEnd().slice(-1);
        if (';{},'.includes(prev) && prev) t += STATEMENT_PAUSE_MS;
        if (code[i + 1] === '\n') t += BLOCK_PAUSE_MS;
      }
      timeline[i + 1] = t;
    }
    typeState.current = { code, timeline, shown: 0, elapsed: 0, last: performance.now() };
    setTypedLen(0);
    const tick = (now: number) => {
      const st = typeState.current;
      if (!st) return;
      const dt = Math.min(64, now - st.last);
      st.last = now;
      // el reloj solo corre con el editor a la vista
      if (visibleRef.current) st.elapsed += dt;
      let shown = st.shown;
      while (shown < st.code.length && st.timeline[shown + 1] <= st.elapsed) shown++;
      if (shown !== st.shown) {
        st.shown = shown;
        setTypedLen(shown);
      }
      if (shown < st.code.length) typeRaf.current = requestAnimationFrame(tick);
      else {
        typeState.current = null;
        setTypedLen(-1);
      }
    };
    typeRaf.current = requestAnimationFrame(tick);
  }, []);

  // Mientras escribe, el panel baja SUAVE para mantener visible la línea nueva
  // (solo cuando aparece una línea, no en cada letra)
  const lastScrollH = useRef(0);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || typedLen < 0) return;
    if (el.scrollHeight === lastScrollH.current) return;
    lastScrollH.current = el.scrollHeight;
    el.scrollTo({ top: el.scrollHeight - el.clientHeight, behavior: reducedMotion() ? 'auto' : 'smooth' });
  }, [typedLen]);

  // Visibilidad del editor: "a la vista" = al menos 35 % en pantalla
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        visibleRef.current = e.isIntersecting && e.intersectionRatio >= 0.35;
      },
      { threshold: [0, 0.35, 0.6, 1] },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      visibleRef.current = false;
    };
  }, [isMobile]);

  useEffect(() => {
    // Se prepara el primer snippet vacío: empieza a escribirse al llegar
    startTyping(0);
    return () => {
      cancelAnimationFrame(typeRaf.current);
      clearTimeout(fadeTimer.current);
      clearTimeout(copyTimer.current);
    };
  }, [startTyping]);

  // Después de registrar todos los hooks: en mobile no se renderiza
  if (isMobile) return null;

  const select = (index: number) => {
    if (index === active) return;
    cancelAnimationFrame(typeRaf.current);
    setFading(true);
    setCopied(false);
    clearTimeout(fadeTimer.current);
    // Fundido de salida (ease-in-out) → editor vacío → escribe el nuevo
    fadeTimer.current = setTimeout(() => {
      setActive(index);
      lastScrollH.current = 0;
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      setFading(false);
      startTyping(index);
    }, FADE_MS);
  };

  const copyActive = async () => {
    const snippet = snippets[active];
    if (!snippet) return;
    try {
      await navigator.clipboard.writeText(snippet.code);
    } catch {
      const area = document.createElement('textarea');
      area.value = snippet.code;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 1800);
  };

  const current = snippets[active];
  const typing = typedLen >= 0;
  const displayCode = typing ? current.code.slice(0, typedLen) : current.code;
  const lineCount = current.code.split('\n').length;
  const typedLines = displayCode ? displayCode.split('\n').length : 1;
  const gutter = Array.from({ length: typing ? typedLines : lineCount }, (_, i) =>
    String(i + 1).padStart(2, '0'),
  ).join('\n');

  return (
    <section id="codigo" data-secfx="zoom" style={{ position: 'relative', zIndex: 'var(--z-content)' as never, padding: 'var(--section-y) var(--gutter)', background: 'rgba(5,8,22,.9)' }}>
      <div data-parallax="1" data-speed="0.06" style={{ position: 'absolute', top: '12%', right: '-8%', width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(circle,rgba(78,159,212,.12),transparent 65%)', filter: 'var(--blur-glow)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: 'var(--container)', margin: '0 auto' }}>
        <div style={{ marginBottom: 'clamp(40px,5vw,64px)' }}>
          <SectionHeading kicker={t.kicker} title={t.title} accent={t.accent} accentColor="var(--blue-400)" />
        </div>

        <div data-reveal="1" style={{ ...revealStyle, display: 'grid', gridTemplateColumns: 'var(--showcase-cols, minmax(0,1fr))', gap: 'var(--gap-grid)', alignItems: 'stretch' }}>
          {/* Explorador */}
          <div
            role="tablist"
            aria-label="Snippets de código"
            aria-orientation="vertical"
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', padding: 'var(--space-3)', borderRadius: 'var(--radius-xl)', border: 'var(--border-blue)', background: 'rgba(13,32,54,.6)', backdropFilter: 'var(--blur-glass)', minWidth: 0, maxHeight: 'var(--showcase-rail-max, 620px)', overflow: 'auto' }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-micro)', letterSpacing: 'var(--tracking-kicker)', textTransform: 'uppercase', color: 'var(--text-faint)', padding: 'var(--space-2) var(--space-2) var(--space-1)' }}>
              {t.explorer}
            </div>
            {snippets.map((snippet, index) => {
              const on = index === active;
              return (
                <button
                  key={snippet.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  data-ripple="1"
                  onClick={() => select(index)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    textAlign: 'left',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    border: `1px solid ${on ? 'rgba(78,159,212,.38)' : 'rgba(78,159,212,.1)'}`,
                    background: on ? 'rgba(29,95,168,.16)' : 'rgba(18,38,58,.35)',
                    boxShadow: on ? '0 10px 26px -20px rgba(78,159,212,.7)' : 'none',
                    transform: `translateX(${on ? '4px' : '0'})`,
                    transition: 'background var(--dur-base),border-color var(--dur-base),box-shadow var(--dur-base),transform var(--dur-base) var(--ease-out)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                    <span style={{ width: '6px', height: '6px', flex: 'none', borderRadius: '50%', background: snippet.dot, boxShadow: `0 0 10px ${snippet.dot}` }} />
                    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0 }}>
                      <span style={{ fontSize: 'var(--text-label)', fontWeight: 500, color: 'var(--text-body)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
                        {snippet.category}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-micro)', color: 'var(--text-dim)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
                        {snippet.file}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Editor */}
          <div ref={editorRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', minWidth: 0, borderRadius: 'var(--radius-xl)', border: 'var(--border-blue)', background: 'rgba(9,21,37,.94)', backdropFilter: 'var(--blur-glass)', boxShadow: 'var(--shadow-lift)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3) var(--space-4)', borderBottom: 'var(--border-faint)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--code-key)', opacity: 0.7 }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--lime-400)', opacity: 0.7 }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--green-400)', opacity: 0.7 }} />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', color: 'var(--text-body)' }}>{current.file}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-micro)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--blue-400)', padding: '4px 9px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(78,159,212,.2)', background: 'rgba(29,95,168,.08)' }}>
                {current.language}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-micro)', color: 'var(--text-faint)' }}>{lineCount} {t.lines}</span>
              <button
                type="button"
                data-ripple="1"
                onClick={copyActive}
                data-hover="border-color:var(--green-400);color:var(--text-strong);box-shadow:var(--glow-green)"
                style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '9px 15px', borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-micro)', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text-body)', border: '1px solid rgba(33,224,127,.26)', background: 'rgba(33,224,127,.06)', cursor: 'pointer', transition: 'border-color var(--dur-base),box-shadow var(--dur-base),color var(--dur-base)' }}
              >
                {copied ? t.copied : t.copy}
              </button>
            </div>

            <div ref={scrollRef} style={{ position: 'relative', height: 'clamp(300px,42vh,430px)', overflow: 'auto', background: 'rgba(7,15,28,.6)' }}>
              <div style={{ display: 'flex', minHeight: '100%', opacity: fading ? 0 : 1, transform: `translateY(${fading ? '8px' : '0px'})`, transition: `opacity ${FADE_MS}ms ${EASE_IN_OUT},transform ${FADE_MS}ms ${EASE_IN_OUT}` }}>
                <div aria-hidden style={{ flex: 'none', padding: 'var(--space-4) 12px var(--space-4) var(--space-4)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-code)', lineHeight: 1.75, color: 'var(--text-faint)', userSelect: 'none', whiteSpace: 'pre' }}>
                  {gutter}
                </div>
                <pre style={{ margin: 0, padding: 'var(--space-4) var(--space-4) var(--space-4) 0', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-code)', lineHeight: 1.75, color: 'var(--code-type)', whiteSpace: 'pre', tabSize: 2 }}>
                  {highlight(displayCode)}
                  {typing && (
                    <span
                      style={{ display: 'inline-block', width: '8px', height: '1.05em', verticalAlign: '-0.18em', marginLeft: '2px', background: 'var(--blue-400)', boxShadow: '0 0 8px rgba(78,159,212,.7)', animation: 'pulse 1.1s ease-in-out infinite' }}
                    />
                  )}
                </pre>
              </div>
            </div>

            <div style={{ padding: 'var(--space-4)', borderTop: 'var(--border-faint)', opacity: fading ? 0 : 1, transition: `opacity ${FADE_MS}ms ${EASE_IN_OUT}` }}>
              <h3 style={{ margin: 0, fontSize: 'var(--text-h4)', fontWeight: 600, color: 'var(--text-strong)' }}>{t.snippets[current.id]?.title ?? current.title}</h3>
              <p style={{ margin: '10px 0 0', maxWidth: 'var(--measure-body)', fontSize: 'var(--text-body-xs)', lineHeight: 'var(--leading-body)', color: 'var(--text-tertiary)', textWrap: 'pretty' }}>
                {t.snippets[current.id]?.description ?? current.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
                {current.tags.map((tag) => (
                  <span
                    key={tag}
                    data-hover="transform:translateY(-3px);border-color:var(--lime-400);box-shadow:var(--glow-lime)"
                    style={{ padding: '6px 11px', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-micro)', letterSpacing: '.08em', color: 'var(--text-body)', border: '1px solid rgba(107,245,168,.18)', background: 'rgba(107,245,168,.05)', transition: 'transform var(--dur-fast),box-shadow var(--dur-base),border-color var(--dur-base)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
