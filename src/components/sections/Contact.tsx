import { useState } from 'react';
import { site } from '@/content/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLang } from '@/i18n/LanguageContext';
import { revealStyle, monoLabel } from '@/lib/styles';

const infoCardStyle = {
  position: 'relative',
  overflow: 'hidden',
  padding: '22px',
  borderRadius: '18px',
  background: 'rgba(13,32,54,.62)',
  backdropFilter: 'blur(12px)',
  color: '#fff',
  transformStyle: 'preserve-3d',
} as const;

function Shine({ color }: { color: string }) {
  return (
    <div
      data-shine="1"
      style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: `radial-gradient(circle,${color},transparent 72%)`, pointerEvents: 'none', opacity: 0, transition: 'opacity .35s', left: 0, top: 0 }}
    />
  );
}

/**
 * Contacto: CTAs de mail/LinkedIn + tarjetas de datos directos.
 * La bajada se escribe con efecto typewriter.
 */
export function Contact() {
  const { dict, lang } = useLang();
  const t = dict.contact;
  // El typewriter consume el nodo de texto una sola vez: se anima con el
  // idioma inicial; si el usuario cambia de idioma, el texto se muestra plano.
  const [initialLang] = useState(lang);
  const typewriter = lang === initialLang;
  return (
    <section id="contacto" style={{ position: 'relative', padding: 'var(--section-y) var(--gutter)', background: 'rgba(5,8,22,.84)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', bottom: '-40%', left: '50%', transform: 'translateX(-50%)', width: '110vw', height: '70vw', borderRadius: '50%', background: 'radial-gradient(circle,rgba(29,95,168,.16),rgba(33,224,127,.06) 45%,transparent 68%)', filter: 'blur(80px)', animation: 'float2 24s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(78,159,212,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(78,159,212,.045) 1px,transparent 1px)', backgroundSize: '64px 64px', maskImage: 'radial-gradient(ellipse 60% 60% at 50% 60%,#000,transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 60%,#000,transparent 75%)' }} />
      </div>

      <div style={{ position: 'relative', maxWidth: 'var(--container)', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <SectionHeading kicker={t.kicker} title={t.title} accent={t.accent} accentColor="var(--blue-400)" align="center" />
        <p
          key={typewriter ? 'tw' : `plain-${lang}`}
          data-reveal="1"
          data-delay="120"
          data-typewriter={typewriter ? '1' : undefined}
          style={{ ...revealStyle, margin: '24px auto 0', maxWidth: 'var(--measure-body)', fontSize: 'var(--text-body-md)', lineHeight: 'var(--leading-body)', color: 'var(--text-muted)' }}
        >
          {t.blurb}
        </p>

        <div data-reveal="1" data-delay="180" style={{ ...revealStyle, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', marginTop: '40px' }}>
          <a
            data-magnetic="1"
            data-sweep-auto="fill"
            href={`mailto:${site.email}`}
            data-hover="box-shadow:0 26px 70px -18px rgba(33,224,127,.45)"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '17px 32px', borderRadius: 'var(--radius-md)', fontSize: '15px', fontWeight: 600, color: 'var(--bg-0)', background: 'var(--gradient-cta)', boxShadow: '0 20px 55px -22px rgba(0,163,255,.95)', transition: 'box-shadow .35s,transform .18s' }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3.5 6.5l8.5 6 8.5-6" />
            </svg>
            <span style={{ position: 'relative', zIndex: 1 }}>{t.mailCta}</span>
          </a>
          <a
            data-magnetic="1"
            data-sweep-auto="border"
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-hover="border-color:var(--green-400);color:#fff;box-shadow:0 0 44px -14px rgba(33,224,127,.4)"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '17px 30px', borderRadius: 'var(--radius-md)', fontSize: '15px', fontWeight: 500, color: 'var(--text-body)', border: '1px solid rgba(78,159,212,.26)', background: 'rgba(16,42,67,.4)', backdropFilter: 'blur(10px)', transition: 'border-color .3s,box-shadow .35s,color .3s,transform .18s' }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>LinkedIn</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        </div>

        <div data-reveal="1" data-delay="240" style={{ ...revealStyle, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '14px', marginTop: 'clamp(40px,5vw,64px)', textAlign: 'left', width: '100%', maxWidth: '760px' }}>
          <a href={`mailto:${site.email}`} style={{ ...infoCardStyle, border: '1px solid rgba(78,159,212,.14)' }}>
            <Shine color="rgba(78,159,212,.1)" />
            <div style={{ ...monoLabel, letterSpacing: '.16em', position: 'relative' }}>{t.emailLabel}</div>
            <div style={{ marginTop: '8px', fontSize: 'var(--text-body-xs)', color: 'var(--text-body)', position: 'relative', wordBreak: 'break-all' }}>{site.email}</div>
          </a>
          <a href={`tel:${site.phone.tel}`} style={{ ...infoCardStyle, border: '1px solid rgba(33,224,127,.14)' }}>
            <Shine color="rgba(33,224,127,.09)" />
            <div style={{ ...monoLabel, letterSpacing: '.16em', position: 'relative' }}>{t.phoneLabel}</div>
            <div style={{ marginTop: '8px', fontSize: 'var(--text-body-xs)', color: 'var(--text-body)', position: 'relative' }}>{site.phone.display}</div>
          </a>
          <div data-tilt="1" style={{ ...infoCardStyle, border: '1px solid rgba(107,245,168,.14)' }}>
            <Shine color="rgba(107,245,168,.08)" />
            <div style={{ ...monoLabel, letterSpacing: '.16em', position: 'relative' }}>{t.locationLabel}</div>
            <div style={{ marginTop: '8px', fontSize: 'var(--text-body-xs)', color: 'var(--text-body)', position: 'relative' }}>{t.locationValue}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
