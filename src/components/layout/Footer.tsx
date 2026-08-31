import { site } from '@/content/site';
import { useLang } from '@/i18n/LanguageContext';
import { asset } from '@/lib/asset';

export function Footer() {
  const { dict } = useLang();
  return (
    <footer style={{ position: 'relative', padding: 'var(--space-6) var(--gutter)', borderTop: '1px solid rgba(78,159,212,.1)', background: 'rgba(5,8,22,.92)' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src={asset('/images/logo-lgr.png')}
            alt="LGR"
            width={34}
            height={34}
            style={{ display: 'block', filter: 'drop-shadow(0 0 12px rgba(33,224,127,.3))' }}
          />
          <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{dict.footer.roleLine}</span>
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
            <span style={{ position: 'relative', zIndex: 1 }}>{dict.footer.backTop}</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </a>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-kicker)', color: 'var(--text-faint)', width: '100%' }}>{dict.footer.note}</div>
      </div>
    </footer>
  );
}
