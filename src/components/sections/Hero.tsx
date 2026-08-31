import { site } from '@/content/site';
import { useLang } from '@/i18n/LanguageContext';
import { asset } from '@/lib/asset';
import { monoLabel } from '@/lib/styles';

const statNumber = {
  fontSize: 'clamp(30px,3vw,42px)',
  fontWeight: 600,
  letterSpacing: '-.03em',
} as const;

/**
 * Hero: presentación, badges, CTAs (CV + proyectos), stats animadas
 * y fotografía con tarjeta flotante de edad.
 */
export function Hero() {
  const { dict } = useLang();
  return (
    <section
      id="top"
      className="hero-section"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(110px,13vh,160px) var(--gutter) clamp(56px,7vh,80px)',
      }}
    >
      {/* Decoración de fondo propia del hero */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute',
            inset: '-64px 0',
            backgroundImage:
              'linear-gradient(rgba(78,159,212,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(78,159,212,.05) 1px,transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%,#000,transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%,#000,transparent 75%)',
            animation: 'gridpan 9s linear infinite',
          }}
        />
        <div data-parallax="1" data-speed="0.18" style={{ position: 'absolute', top: '-14%', left: '-8%', width: '56vw', height: '56vw', borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%,rgba(29,95,168,.3),transparent 62%)', filter: 'blur(70px)', animation: 'float1 16s ease-in-out infinite' }} />
        <div data-parallax="1" data-speed="0.26" style={{ position: 'absolute', bottom: '-24%', right: '-10%', width: '52vw', height: '52vw', borderRadius: '50%', background: 'radial-gradient(circle at 60% 40%,rgba(33,224,127,.14),transparent 60%)', filter: 'blur(80px)', animation: 'float2 21s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '22%', right: '26%', width: '26vw', height: '26vw', borderRadius: '50%', background: 'radial-gradient(circle,rgba(79,217,143,.08),transparent 65%)', filter: 'blur(70px)', animation: 'float1 27s ease-in-out infinite' }} />
        <canvas data-particles="1" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.65 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(5,8,22,.2),rgba(5,8,22,0) 30%,rgba(5,8,22,.85))' }} />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          maxWidth: 'var(--container)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))',
          gap: 'clamp(40px,6vw,80px)',
          alignItems: 'center',
        }}
      >
        <div style={{ position: 'relative' }}>
          <h1 style={{ margin: 0, fontSize: 'var(--text-h1)', fontWeight: 600, lineHeight: 'var(--leading-h1)', letterSpacing: 'var(--tracking-h1)' }}>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span style={{ display: 'block', animation: 'rise 1s .15s var(--ease-out) both' }}>{site.firstName}</span>
            </span>
            <span style={{ display: 'block', paddingBottom: '.14em' }}>
              <span style={{ display: 'block', whiteSpace: 'nowrap', fontSize: 'min(.62em,8.4vw)', animation: 'fadein 1s .28s var(--ease-out) both' }}>
                González <span style={{ color: 'var(--lime-400)' }}>{site.lastNameAccent}</span>
              </span>
            </span>
          </h1>

          <p style={{ maxWidth: 'var(--measure-body)', margin: '26px 0 0', fontSize: 'var(--text-lead)', lineHeight: 'var(--leading-body)', color: 'var(--text-secondary)', textWrap: 'pretty', animation: 'fadein 1s .6s both' }}>
            {dict.hero.tagline}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '22px', animation: 'fadein 1s .72s both' }}>
            {dict.hero.badges.map((badge) => (
              <span key={badge} className="chip">
                {badge}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px', marginTop: '36px', animation: 'fadein 1s .85s both', position: 'relative' }}>
            {/* CTA principal: descarga del CV */}
            <a
              data-magnetic="1"
              data-sweep="1"
              href={asset(site.cv.href)}
              download={site.cv.download}
              data-hover="box-shadow:0 22px 60px -16px rgba(33,224,127,.45)"
              style={{
                position: 'relative',
                overflow: 'hidden',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 32px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--bg-0)',
                background: 'var(--gradient-cta)',
                boxShadow: '0 18px 50px -22px rgba(78,159,212,.5)',
                transition: 'box-shadow .35s,transform .18s',
              }}
            >
              <span aria-hidden style={{ position: 'absolute', inset: 0, background: 'var(--green-400)', pointerEvents: 'none', clipPath: 'inset(0 100% 0 0)', transition: 'clip-path 3s cubic-bezier(.4,.05,.25,1)' }} />
              <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 4v11M6.5 10.5L12 16l5.5-5.5M4.5 20h15" />
                </svg>
                {dict.hero.cv}
              </span>
            </a>
            {/* CTA secundario */}
            <a
              data-magnetic="1"
              data-sweep-border="1"
              href="#proyectos"
              data-hover="color:#fff;box-shadow:0 0 40px -12px rgba(33,224,127,.35)"
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 30px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--text-body)',
                border: '1px solid var(--blue-400)',
                background: 'rgba(16,42,67,.35)',
                backdropFilter: 'blur(10px)',
                transition: 'box-shadow .35s,color .3s,transform .18s',
              }}
            >
              <span aria-hidden style={{ position: 'absolute', inset: '-1px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--green-400)', background: 'rgba(150,160,172,.22)', pointerEvents: 'none', clipPath: 'inset(0 100% 0 0)', transition: 'clip-path 1.5s cubic-bezier(.4,.05,.25,1)' }} />
              <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                {dict.hero.viewProjects}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h13M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
          </div>

          {/* Stats animadas */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(96px,1fr))', gap: 'clamp(16px,2vw,32px)', marginTop: 'clamp(40px,5vw,64px)', maxWidth: '520px', animation: 'fadein 1s 1s both' }}>
            {site.heroStats.map((stat, i) => (
              <div key={dict.hero.statLabels[i]}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                  {'prefix' in stat && stat.prefix && (
                    <span style={{ ...statNumber, color: 'var(--green-400)' }}>{stat.prefix}</span>
                  )}
                  <span
                    data-count={stat.value}
                    data-decimals={'decimals' in stat ? stat.decimals : undefined}
                    style={{ ...statNumber, color: '#fff' }}
                  >
                    {'decimals' in stat && stat.decimals ? '0,00' : '0'}
                  </span>
                </div>
                <div style={{ ...monoLabel, marginTop: '4px' }}>{dict.hero.statLabels[i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Fotografía */}
        <div data-parallax="1" data-speed="-0.06" style={{ display: 'flex', justifyContent: 'center', animation: 'fadein 1.2s .5s both' }}>
          <div data-tilt="1" className="hero-photo" style={{ position: 'relative', width: 'min(100%,420px)', aspectRatio: '4/5', transformStyle: 'preserve-3d', transition: 'transform .5s var(--ease-out)' }}>
            <div style={{ position: 'absolute', inset: '-14%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(46,127,196,.3),transparent 68%)', filter: 'blur(52px)', opacity: 0.7, animation: 'spin 22s linear infinite' }} />
            <div style={{ position: 'absolute', inset: 0, borderRadius: '26px', overflow: 'hidden', border: '1px solid rgba(78,159,212,.26)', background: 'rgba(13,32,54,.75)', backdropFilter: 'blur(10px)', boxShadow: '0 40px 90px -40px rgba(29,95,168,.45)' }}>
              <img
                src={asset(site.photo.src)}
                alt={site.photo.alt}
                className="hero-photo-img"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 22%',
                }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(190deg,transparent 40%,rgba(6,10,21,.82))', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg,rgba(78,159,212,.05) 0 1px,transparent 1px 4px)', mixBlendMode: 'screen', pointerEvents: 'none' }} />
            </div>
            {/* Tarjeta flotante: edad (posición responsive via .hero-age-card) */}
            <div className="hero-age-card" style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(33,224,127,.26)', background: 'rgba(8,17,31,.75)', backdropFilter: 'blur(12px)', boxShadow: '0 20px 50px -28px rgba(33,224,127,.45)', animation: 'bob 6s ease-in-out infinite', transform: 'translateZ(60px)' }}>
              <div style={monoLabel}>{dict.hero.ageLabel}</div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--green-400)' }}>{site.age.value}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll (en mobile queda debajo de la foto) */}
      <div className="hero-scrollcue" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', zIndex: 3 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-micro)', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>{dict.hero.scroll}</span>
        <span style={{ position: 'relative', width: '1px', height: '54px', background: 'rgba(78,159,212,.18)', overflow: 'hidden' }}>
          <span style={{ position: 'absolute', inset: 0, background: 'var(--blue-400)', animation: 'scrollcue 2.4s ease-in-out infinite' }} />
        </span>
      </div>
    </section>
  );
}
