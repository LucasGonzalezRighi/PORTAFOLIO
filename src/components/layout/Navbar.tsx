import { navLinks, site } from '@/content/site';

/**
 * Barra de navegación fija: logo, estado de disponibilidad, links con
 * sección activa y barra de progreso de scroll (motor de efectos).
 */
export function Navbar() {
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
      <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fff' }}>
        <span
          style={{
            position: 'relative',
            display: 'grid',
            placeItems: 'center',
            width: '34px',
            height: '34px',
            borderRadius: '11px',
            background: 'var(--blue-400)',
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--bg-0)',
            boxShadow: '0 0 22px -4px rgba(78,159,212,.45)',
          }}
        >
          {site.logo}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            letterSpacing: '.16em',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
          }}
        >
          {site.domain}
        </span>
      </a>

      {/* Estado de disponibilidad */}
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          borderRadius: 'var(--radius-pill)',
          border: 'var(--border-green)',
          background: 'rgba(33,224,127,.05)',
        }}
      >
        <span style={{ position: 'relative', display: 'grid', placeItems: 'center', width: '7px', height: '7px' }}>
          <span style={{ position: 'absolute', width: '7px', height: '7px', borderRadius: '50%', background: 'var(--green-400)', animation: 'pulse 3.2s ease-in-out infinite' }} />
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--green-400)' }} />
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-micro)',
            letterSpacing: 'var(--tracking-mono)',
            textTransform: 'uppercase',
            color: 'var(--lime-400)',
            whiteSpace: 'nowrap',
          }}
        >
          {site.availability}
        </span>
      </span>

      <nav style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(10px,1.6vw,26px)' }}>
        {navLinks.map((link) => (
          <a key={link.id} data-navlink={link.id} href={`#${link.id}`} className="nav-link">
            {link.label}
          </a>
        ))}
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
          Contacto
        </a>
      </nav>

      {/* Barra de progreso de lectura */}
      <div
        data-progress="1"
        style={{
          position: 'absolute',
          left: 0,
          bottom: '-1px',
          height: '2px',
          width: '0%',
          background: 'var(--blue-400)',
        }}
      />
    </header>
  );
}
