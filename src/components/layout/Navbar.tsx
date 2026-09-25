import { useEffect, useState } from 'react';
import { site } from '@/content/site';
import { useLang } from '@/i18n/LanguageContext';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { asset } from '@/lib/asset';

function Logo() {
  return (
    <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fff' }}>
      {/* Monograma LGR con gradiente azul → verde */}
      <img
        src={asset('/images/logo-lgr.png')}
        alt="LGR"
        width={40}
        height={40}
        style={{ display: 'block', filter: 'drop-shadow(0 0 14px rgba(78,159,212,.35))' }}
      />
    </a>
  );
}

function ProgressBar() {
  return (
    <div data-progress="1" style={{ position: 'absolute', left: 0, bottom: '-1px', height: '2px', width: '0%', background: 'var(--blue-400)' }} />
  );
}

/* ──────────────────────────────────────────────────────────────
   Versión desktop: logo · disponibilidad · links · CTA
   ────────────────────────────────────────────────────────────── */
function DesktopNav() {
  const { dict } = useLang();
  return (
    <header
      data-nav="1"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 'var(--z-nav)' as never,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
        padding: '16px var(--gutter)',
        background: 'rgba(5,8,22,0)',
        backdropFilter: 'blur(0px)',
        borderBottom: '1px solid rgba(0,163,255,0)',
        transition: 'background .4s,border-color .4s,backdrop-filter .4s',
      }}
    >
      <Logo />
      <nav style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(10px,1.6vw,26px)' }}>
        {/* "Proyectos" no va en el navbar (sigue en el footer y en el CTA "Mi laburo") */}
        {dict.nav.links.filter((l) => l.id !== 'proyectos').map((link) => (
          <a key={link.id} data-navlink={link.id} href={`#${link.id}`} className="nav-link">
            {link.label}
          </a>
        ))}
        <LanguageSwitcher />
        <a
          data-magnetic="1"
          data-sweep-auto="fill"
          href="#contacto"
          data-hover="box-shadow:0 12px 40px -10px rgba(33,224,127,.42)"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: 'var(--radius-pill)',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--bg-0)',
            background: 'var(--gradient-cta)',
            boxShadow: '0 0 0 0 rgba(0,255,136,0)',
            transition: 'box-shadow .35s,transform .18s',
          }}
        >
          {/* span propio de React: el barrido del motor no debe adueñarse del texto */}
          <span style={{ position: 'relative', zIndex: 1 }}>{dict.nav.contact}</span>
        </a>
      </nav>
      <ProgressBar />
    </header>
  );
}

/* ──────────────────────────────────────────────────────────────
   Versión mobile: barra compacta + menú fullscreen
   ────────────────────────────────────────────────────────────── */
function MobileNav() {
  const { dict } = useLang();
  const [open, setOpen] = useState(false);

  // Bloquear el scroll del body mientras el menú está abierto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header
        data-nav="1"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 'var(--z-nav)' as never,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          height: '60px',
          padding: '0 var(--gutter)',
          background: 'rgba(5,8,22,0)',
          backdropFilter: 'blur(0px)',
          borderBottom: '1px solid rgba(0,163,255,0)',
          transition: 'background .4s,border-color .4s,backdrop-filter .4s',
        }}
      >
        <Logo />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Hamburguesa: tres rayitas que se transforman en X */}
          <button
            type="button"
            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            style={{
              position: 'relative',
              display: 'grid',
              placeItems: 'center',
              width: '42px',
              height: '42px',
              flex: 'none',
              borderRadius: '12px',
              border: '1px solid rgba(78,159,212,.3)',
              background: 'rgba(16,42,67,.45)',
              backdropFilter: 'blur(8px)',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <span style={{ position: 'relative', width: '18px', height: '14px', display: 'block' }}>
              <span style={{ position: 'absolute', left: 0, top: open ? '6px' : 0, width: '18px', height: '2px', borderRadius: '1px', background: 'var(--blue-400)', transform: open ? 'rotate(45deg)' : 'none', transition: 'transform .3s var(--ease-out), top .3s var(--ease-out)' }} />
              <span style={{ position: 'absolute', left: 0, top: '6px', width: '18px', height: '2px', borderRadius: '1px', background: 'var(--lime-400)', opacity: open ? 0 : 1, transition: 'opacity .2s' }} />
              <span style={{ position: 'absolute', left: 0, bottom: open ? '6px' : 0, width: '18px', height: '2px', borderRadius: '1px', background: 'var(--green-400)', transform: open ? 'rotate(-45deg)' : 'none', transition: 'transform .3s var(--ease-out), bottom .3s var(--ease-out)' }} />
            </span>
          </button>
        </div>
        <ProgressBar />
      </header>

      {/* Menú fullscreen */}
      {open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 'var(--z-cursor)' as never,
            display: 'flex',
            flexDirection: 'column',
            padding: 'var(--gutter)',
            background: 'rgba(5,8,22,.96)',
            backdropFilter: 'var(--blur-nav)',
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px', flex: 'none' }}>
            <Logo />
            <button
              type="button"
              aria-label={dict.nav.closeMenu}
              onClick={() => setOpen(false)}
              style={{ display: 'grid', placeItems: 'center', width: '42px', height: '42px', borderRadius: '12px', border: '1px solid rgba(107,245,168,.3)', background: 'rgba(16,42,67,.45)', color: 'var(--lime-400)', fontSize: '18px', cursor: 'pointer', padding: 0 }}
            >
              ✕
            </button>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', marginTop: '28px', flex: '1 0 auto' }}>
            {/* "Código" no se lista: esa sección no se muestra en mobile.
                "Proyectos" tampoco va en el navbar (sigue en el footer). */}
            {dict.nav.links.filter((l) => l.id !== 'codigo' && l.id !== 'proyectos').map((link, i) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '16px',
                  padding: '16px 4px',
                  borderBottom: 'var(--border-faint)',
                  color: 'var(--text-strong)',
                  animation: `fadein .5s ${0.05 + i * 0.06}s var(--ease-out) both`,
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-kicker)', letterSpacing: '.14em', color: 'var(--green-400)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: '26px', fontWeight: 600, letterSpacing: '-.02em' }}>{link.label}</span>
              </a>
            ))}
          </nav>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '24px', flex: 'none' }}>
            <div style={{ animation: 'fadein .5s .42s var(--ease-out) both' }}>
              <LanguageSwitcher variant="chips" />
            </div>
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '16px', borderRadius: 'var(--radius-md)', fontSize: '15px', fontWeight: 600, color: 'var(--bg-0)', background: 'var(--gradient-cta)', boxShadow: '0 18px 50px -22px rgba(78,159,212,.5)', animation: 'fadein .5s .5s var(--ease-out) both' }}
            >
              {dict.nav.contact}
            </a>
            <div style={{ display: 'flex', gap: '22px', justifyContent: 'center', animation: 'fadein .5s .55s var(--ease-out) both' }}>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '.08em', color: 'var(--text-dim)' }}>
                LinkedIn
              </a>
              <a href={`mailto:${site.email}`} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '.08em', color: 'var(--text-dim)' }}>
                Email
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Barra de navegación: layout desktop con links inline,
 * y en pantallas chicas un diseño propio (barra compacta + menú fullscreen).
 */
export function Navbar() {
  const isMobile = useMediaQuery('(max-width: 899px)');
  return isMobile ? <MobileNav /> : <DesktopNav />;
}
