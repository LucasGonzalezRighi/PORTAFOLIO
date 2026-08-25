import { site } from '@/content/site';

export function Footer() {
  return (
    <footer style={{ position: 'relative', padding: 'var(--space-6) var(--gutter)', borderTop: '1px solid rgba(78,159,212,.1)', background: 'rgba(5,8,22,.92)' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ display: 'grid', placeItems: 'center', width: '30px', height: '30px', borderRadius: '10px', background: 'var(--blue-400)', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--bg-0)' }}>
            {site.logo}
          </span>
          <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            {site.name} — {site.role}
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px' }}>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-hover="color:var(--lime-400)"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '.08em', color: 'var(--text-dim)', transition: 'color .25s' }}
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${site.email}`}
            data-hover="color:var(--lime-400)"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '.08em', color: 'var(--text-dim)', transition: 'color .25s' }}
          >
            Email
          </a>
          <a
            data-magnetic="1"
            data-sweep-auto="border"
            href="#top"
            data-hover="border-color:var(--green-400);box-shadow:0 0 30px -12px rgba(33,224,127,.45)"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '9px 16px', borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-kicker)', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text-body)', border: '1px solid rgba(78,159,212,.2)', background: 'rgba(16,42,67,.4)', transition: 'border-color .3s,box-shadow .3s,transform .18s' }}
          >
            Volver arriba
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </a>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-kicker)', color: 'var(--text-faint)', width: '100%' }}>{site.footerNote}</div>
      </div>
    </footer>
  );
}
