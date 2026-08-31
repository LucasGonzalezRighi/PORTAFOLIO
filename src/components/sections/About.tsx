import { about, services, type ServiceCard } from '@/content/about';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLang } from '@/i18n/LanguageContext';
import { revealStyle } from '@/lib/styles';

const serviceTone = {
  blue: {
    border: '1px solid rgba(78,159,212,.16)',
    shadow: '0 30px 70px -40px rgba(29,95,168,.5)',
    shine: 'rgba(78,159,212,.1)',
    iconBg: 'rgba(29,95,168,.12)',
    iconBorder: '1px solid rgba(78,159,212,.24)',
    stroke: 'var(--blue-400)',
  },
  green: {
    border: '1px solid rgba(33,224,127,.14)',
    shadow: '0 30px 70px -40px rgba(33,224,127,.35)',
    shine: 'rgba(33,224,127,.09)',
    iconBg: 'rgba(33,224,127,.1)',
    iconBorder: '1px solid rgba(33,224,127,.24)',
    stroke: 'var(--green-400)',
  },
  lime: {
    border: '1px solid rgba(107,245,168,.14)',
    shadow: '0 30px 70px -40px rgba(107,245,168,.4)',
    shine: 'rgba(107,245,168,.08)',
    iconBg: 'rgba(107,245,168,.09)',
    iconBorder: '1px solid rgba(107,245,168,.24)',
    stroke: 'var(--lime-400)',
  },
} as const;

function ServiceCardView({ card, delay, title, description }: { card: ServiceCard; delay: number; title: string; description: string }) {
  const tone = serviceTone[card.tone];
  return (
    <div
      data-reveal="1"
      data-delay={delay}
      data-tilt="1"
      style={{
        ...revealStyle,
        position: 'relative',
        overflow: 'hidden',
        padding: '26px',
        borderRadius: 'var(--radius-lg)',
        border: tone.border,
        background: 'rgba(13,32,54,.62)',
        backdropFilter: 'var(--blur-glass)',
        boxShadow: tone.shadow,
        transformStyle: 'preserve-3d',
      }}
    >
      <div data-shine="1" style={{ position: 'absolute', width: '340px', height: '340px', borderRadius: '50%', background: `radial-gradient(circle,${tone.shine},transparent 72%)`, pointerEvents: 'none', opacity: 0, transition: 'opacity .35s', left: 0, top: 0 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
        <div style={{ display: 'grid', placeItems: 'center', width: '40px', height: '40px', borderRadius: '12px', background: tone.iconBg, border: tone.iconBorder }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={tone.stroke} strokeWidth="1.6" strokeLinecap="round">
            {card.iconRects?.map((r) => (
              <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width={r.w} height={r.h} rx={r.rx} />
            ))}
            {card.iconPaths.map((d) => (
              <path key={d} d={d} />
            ))}
          </svg>
        </div>
        <h3 style={{ margin: 0, fontSize: 'var(--text-h4)', fontWeight: 600 }}>{title}</h3>
      </div>
      <p style={{ margin: '14px 0 0', fontSize: 'var(--text-body-xs)', lineHeight: 'var(--leading-body)', color: 'var(--text-muted)', position: 'relative' }}>
        {description}
      </p>
    </div>
  );
}

/**
 * Sobre mí: bio + idiomas + cards de especialidades.
 */
export function About() {
  const { dict } = useLang();
  return (
    <section id="sobre" style={{ position: 'relative', padding: 'clamp(56px,7vw,104px) var(--gutter) var(--section-y)', background: 'rgba(5,8,22,.9)' }}>
      <div style={{ position: 'absolute', top: '10%', right: '-6%', width: '38vw', height: '38vw', borderRadius: '50%', background: 'radial-gradient(circle,rgba(29,95,168,.12),transparent 65%)', filter: 'blur(70px)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: 'var(--container)', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 'clamp(32px,4vw,72px)', alignItems: 'center', position: 'relative' }}>
          <div>
            <SectionHeading
              kicker={dict.about.kicker}
              title={dict.about.title}
              accent={dict.about.accent}
              tail={about.heading.tail}
              accentColor={about.heading.accentColor}
            />
            {dict.about.paragraphs.map((paragraph, i) => (
              <p
                key={paragraph.slice(0, 24)}
                style={{
                  margin: i === 0 ? '24px 0 0' : '18px 0 0',
                  fontSize: 'var(--text-body-md)',
                  lineHeight: 'var(--leading-loose)',
                  color: i === 0 ? 'var(--text-secondary)' : 'var(--text-muted)',
                  textWrap: 'pretty',
                }}
              >
                {paragraph}
              </p>
            ))}

            <div className="about-langs" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '28px' }}>
              {about.languages.map((lang, i) => (
                <span
                  key={lang.label}
                  data-magnetic="1"
                  data-hover={`border-color:${lang.hoverBorder};box-shadow:0 0 28px -10px ${lang.glowRgba}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '9px 14px',
                    borderRadius: '10px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    letterSpacing: '.04em',
                    color: 'var(--text-secondary)',
                    border: `1px solid ${lang.borderRgba}`,
                    background: 'rgba(16,42,67,.45)',
                    transition: 'border-color .3s,box-shadow .3s',
                  }}
                >
                  <span style={{ width: '6px', height: '6px', flex: 'none', borderRadius: '50%', background: lang.color, boxShadow: `0 0 8px ${lang.color}` }} />
                  {dict.about.languages[i].label}{' '}
                  <span style={{ color: 'var(--text-dim)' }}>— {dict.about.languages[i].level}</span>
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gap: '16px', alignSelf: 'end' }}>
            {services.map((card, i) => (
              <ServiceCardView
                key={card.title}
                card={card}
                delay={80 + i * 80}
                title={dict.about.services[i].title}
                description={dict.about.services[i].description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
