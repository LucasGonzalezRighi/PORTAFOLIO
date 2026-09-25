import { certifications, education } from '@/content/education';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLang } from '@/i18n/LanguageContext';
import { revealStyle } from '@/lib/styles';

const eduTone = {
  blue: { border: '1px solid rgba(78,159,212,.18)', kicker: 'var(--blue-400)' },
  green: { border: '1px solid rgba(33,224,127,.16)', kicker: 'var(--green-400)' },
  lime: { border: '1px solid rgba(107,245,168,.16)', kicker: 'var(--lime-400)' },
} as const;

const certTone = {
  blue: {
    border: '1px solid rgba(78,159,212,.12)',
    hover: 'border-color:var(--blue-400);box-shadow:0 14px 40px -20px rgba(78,159,212,.5)',
    iconBg: 'rgba(29,95,168,.1)',
    iconBorder: '1px solid rgba(78,159,212,.2)',
    stroke: 'var(--blue-400)',
  },
  green: {
    border: '1px solid rgba(33,224,127,.12)',
    hover: 'border-color:var(--green-400);box-shadow:0 14px 40px -20px rgba(33,224,127,.45)',
    iconBg: 'rgba(33,224,127,.09)',
    iconBorder: '1px solid rgba(33,224,127,.2)',
    stroke: 'var(--green-400)',
  },
  lime: {
    border: '1px solid rgba(107,245,168,.12)',
    hover: 'border-color:var(--lime-400);box-shadow:0 14px 40px -20px rgba(107,245,168,.38)',
    iconBg: 'rgba(107,245,168,.07)',
    iconBorder: '1px solid rgba(107,245,168,.2)',
    stroke: 'var(--lime-400)',
  },
} as const;

function SheenBand({ delay, width = '60px' }: { delay: string; width?: string }) {
  return (
    <div
      data-sheen-band="1"
      aria-hidden
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height: '100%',
        background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.06),transparent)',
        animation: `sheen 5s ${delay} ease-in-out infinite`,
        pointerEvents: 'none',
      }}
    />
  );
}

/**
 * Formación y certificaciones, con haz de luz que recorre la sección.
 */
export function Education() {
  const { dict } = useLang();
  const t = dict.education;
  return (
    <section id="certificaciones" data-secfx="rise" style={{ position: 'relative', padding: 'var(--section-y) var(--gutter)', background: 'rgba(7,13,26,.9)' }}>
      <div style={{ position: 'relative', maxWidth: 'var(--container)', margin: '0 auto' }}>
        <div style={{ marginBottom: 'clamp(40px,5vw,64px)' }}>
          <SectionHeading kicker={t.kicker} title={t.title} accent={t.accent} accentColor="var(--green-400)" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'var(--gap-card)' }}>
          {education.map((card) => {
            const tone = eduTone[card.tone];
            return (
              <div
                key={card.institution}
                data-reveal="1"
                data-delay={card.revealDelay || undefined}
                data-tilt="1"
                style={{ ...revealStyle, position: 'relative', overflow: 'hidden', padding: '26px', borderRadius: 'var(--radius-lg)', border: tone.border, background: 'rgba(13,32,54,.7)', backdropFilter: 'var(--blur-glass)', transformStyle: 'preserve-3d' }}
              >
                <SheenBand delay={card.sheenDelay} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-kicker)', letterSpacing: '.16em', textTransform: 'uppercase', color: tone.kicker }}>
                  {card.institution}
                </div>
                <h3 style={{ margin: '12px 0 0', fontSize: '21px', fontWeight: 600 }}>{t.cards[card.institution]?.title ?? card.title}</h3>
                {card.grade ? (
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '14px' }}>
                    <span data-count={card.grade.value} data-decimals={card.grade.decimals} style={{ fontSize: '34px', fontWeight: 600, letterSpacing: '-.03em', color: 'var(--lime-400)' }}>
                      0,00
                    </span>
                    <span style={{ fontSize: 'var(--text-label)', color: 'var(--text-dim)' }}>{t.gradeLabel}</span>
                  </div>
                ) : (
                  <p style={{ margin: '12px 0 0', fontSize: 'var(--text-body-xs)', lineHeight: 1.6, color: 'var(--text-tertiary)' }}>{t.cards[card.institution]?.description ?? card.description}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Grilla fija (1/2/3 columnas): con auto-fit el último ítem quedaba huérfano */}
        <div data-reveal="1" data-delay="80" className="edu-chips" style={{ ...revealStyle, display: 'grid', gap: '12px', marginTop: '18px' }}>
          {certifications.map((cert, i) => {
            const tone = certTone[cert.tone];
            return (
              <div
                key={cert.label}
                data-magnetic="1"
                data-hover={tone.hover}
                style={{ position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 20px', borderRadius: '16px', border: tone.border, background: 'rgba(16,42,67,.35)', backdropFilter: 'blur(10px)', transition: 'border-color .3s,box-shadow .35s,transform .18s' }}
              >
                <SheenBand delay={cert.sheenDelay} width="44px" />
                <span style={{ display: 'grid', placeItems: 'center', width: '34px', height: '34px', flex: 'none', borderRadius: '10px', background: tone.iconBg, border: tone.iconBorder }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={tone.stroke} strokeWidth="1.6" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <span style={{ fontSize: 'var(--text-body-xs)', color: 'var(--text-body)' }}>{t.certs[i] ?? cert.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
