import { useEffect, useRef } from 'react';
import { site } from '@/content/site';
import { useLang } from '@/i18n/LanguageContext';
import { asset } from '@/lib/asset';

const socialPillStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '9px',
  padding: '11px 22px',
  borderRadius: 'var(--radius-pill)',
  fontFamily: 'var(--font-mono)',
  fontSize: '13px',
  letterSpacing: '.06em',
  color: 'var(--text-body)',
  border: '1px solid rgba(78,159,212,.22)',
  background: 'rgba(16,42,67,.4)',
  backdropFilter: 'blur(8px)',
  transition: 'border-color .3s,box-shadow .3s,color .3s,transform .18s',
} as const;

/**
 * Entrada ligada al scroll (EffectsEngine.scrollFx): a medida que el footer
 * sube sobre Contacto, las filas (data-footrow) entran en cascada desde abajo
 * y desde el desenfoque, y al final sube la palabra gigante (data-footword).
 *
 * Footer estilo damrod.dev, con la paleta y tipografía propias:
 * línea diagonal, navegación centrada, pastillas sociales y la
 * palabra gigante recortada al fondo.
 */
export function Footer() {
  const { dict } = useLang();
  const ref = useRef<HTMLElement>(null);
  // Publica el alto del footer en --footer-h: Contacto suma ese recorrido a
  // su pin (queda quieto) y el footer sube por encima con margen negativo.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    const set = () => root.style.setProperty('--footer-h', `${el.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.removeProperty('--footer-h');
    };
  }, []);
  return (
    <footer ref={ref} className="site-footer">
      {/* Línea diagonal superior */}
      <div aria-hidden style={{ position: 'absolute', top: 'clamp(16px,2.6vw,36px)', left: '-6%', width: '112%', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(78,159,212,.4),transparent)', transform: 'rotate(-2.2deg)', transformOrigin: '50% 50%' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--container)', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(24px,3vw,34px)' }}>
        {/* Navegación centrada */}
        <nav data-footrow="0" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(14px,2.4vw,34px)' }}>
          {dict.nav.links.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="nav-link">
              {link.label}
            </a>
          ))}
          <a href="#contacto" className="nav-link">
            {dict.nav.contact}
          </a>
        </nav>

        {/* Pastillas sociales */}
        <div data-footrow="1" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px' }}>
          <a
            data-magnetic="1"
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-hover="border-color:var(--blue-400);color:#fff;box-shadow:0 0 34px -12px rgba(78,159,212,.5)"
            style={socialPillStyle}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.4 8.1h4.2V23H.4V8.1zm7.1 0h4.02v2.03h.06c.56-1.06 1.93-2.18 3.97-2.18 4.25 0 5.03 2.8 5.03 6.44V23h-4.2v-7.36c0-1.76-.03-4.02-2.45-4.02-2.45 0-2.83 1.91-2.83 3.89V23H7.5V8.1z" />
            </svg>
            LinkedIn
          </a>
          <a
            data-magnetic="1"
            href={`mailto:${site.email}`}
            data-hover="border-color:var(--green-400);color:#fff;box-shadow:0 0 34px -12px rgba(33,224,127,.45)"
            style={socialPillStyle}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3.5 6.5l8.5 6 8.5-6" />
            </svg>
            Email
          </a>
          <a
            data-magnetic="1"
            data-sweep-auto="border"
            href="#top"
            data-hover="border-color:var(--green-400);color:#fff;box-shadow:0 0 30px -12px rgba(33,224,127,.45)"
            style={{ ...socialPillStyle, textTransform: 'uppercase', fontSize: 'var(--text-kicker)', letterSpacing: '.12em' }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>{dict.footer.backTop}</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </a>
        </div>

        {/* Identidad + nota */}
        <div data-footrow="2" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src={asset('/images/logo-lgr.png')}
            alt="LGR"
            width={34}
            height={34}
            style={{ display: 'block', filter: 'drop-shadow(0 0 12px rgba(33,224,127,.3))' }}
          />
          <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{dict.footer.roleLine}</span>
        </div>
        <div data-footrow="3" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-kicker)', color: 'var(--text-faint)', textAlign: 'center' }}>{dict.footer.note}</div>
      </div>

      {/* Palabra gigante recortada al fondo (estilo damrod) */}
      <div aria-hidden style={{ position: 'relative', height: 'clamp(80px,12vw,180px)', marginTop: 'clamp(18px,2.6vw,36px)', overflow: 'hidden', pointerEvents: 'none' }}>
        {/* El motor escribe transform en el span (sube y aparece con el
            scroll): por eso el centrado vive en el padre */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '-0.52em',
            transform: 'translateX(-50%)',
            fontWeight: 700,
            fontSize: 'clamp(100px,16vw,250px)',
            lineHeight: 1,
            letterSpacing: '-.02em',
            whiteSpace: 'nowrap',
            color: 'rgba(150,180,210,.06)',
            userSelect: 'none',
          }}
        >
          <span data-footword="1" style={{ display: 'inline-block' }}>
            Developer
          </span>
        </div>
      </div>
    </footer>
  );
}
