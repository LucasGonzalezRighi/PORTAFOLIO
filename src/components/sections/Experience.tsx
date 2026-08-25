import { experiences, timelineYears, type Experience as Job } from '@/content/experience';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { revealStyle, monoLabel } from '@/lib/styles';

const filterButtons = [
  { id: 'all', label: null, aria: 'Ver toda la experiencia' },
  { id: 'dev', label: 'Desarrollador' },
  { id: 'sup', label: 'Soporte técnico' },
] as const;

function JobCard({ job }: { job: Job }) {
  const accent = job.current ? 'green' : 'blue';
  const color = accent === 'green' ? 'var(--green-400)' : 'var(--blue-400)';
  const borderFront = job.current ? '1px solid rgba(33,224,127,.18)' : 'var(--border-blue)';
  const borderBack = job.current ? '1px solid rgba(33,224,127,.24)' : '1px solid rgba(78,159,212,.24)';
  const shine = job.current ? 'rgba(33,224,127,.08)' : 'rgba(78,159,212,.09)';
  const nodeGlow = job.current ? 'rgba(33,224,127,.5)' : 'rgba(78,159,212,.5)';

  return (
    <div data-parallax="1" data-speed="0.03" data-exp-card="1" data-exp={job.track} data-exp-row={job.row} style={{ position: 'relative' }}>
      <div data-reveal="1" data-delay={job.revealDelay || undefined} style={{ ...revealStyle, position: 'relative' }}>
        <div data-tilt="1" style={{ perspective: '1500px' }}>
          <div data-flip="1" style={{ position: 'relative', transformStyle: 'preserve-3d', transition: 'transform .9s var(--ease-flip)' }}>
            {/* Frente */}
            <div
              style={{
                position: 'relative',
                padding: 'clamp(22px,2.4vw,32px)',
                borderRadius: 'var(--radius-lg)',
                border: borderFront,
                background: job.current ? 'rgba(13,32,54,.66)' : 'rgba(13,32,54,.6)',
                backdropFilter: 'var(--blur-glass)',
                boxShadow: job.current ? '0 30px 80px -50px rgba(33,224,127,.45)' : undefined,
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'var(--radius-lg)', pointerEvents: 'none' }}>
                <div data-shine="1" style={{ position: 'absolute', width: '420px', height: '420px', borderRadius: '50%', background: `radial-gradient(circle,${shine},transparent 72%)`, opacity: 0, transition: 'opacity .35s', left: 0, top: 0 }} />
              </div>
              {/* Nodo de la timeline */}
              <div data-node="1" style={{ position: 'absolute', left: 'calc(-1 * clamp(26px,4vw,52px) - 1px)', top: '36px', display: 'grid', placeItems: 'center', width: '16px', height: '16px', transition: 'transform .5s var(--ease-out),filter .5s', zIndex: 2 }}>
                {job.current && (
                  <span style={{ position: 'absolute', width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(33,224,127,.26)', animation: 'pulse 3s ease-in-out infinite' }} />
                )}
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: color, boxShadow: `0 0 10px ${nodeGlow}` }} />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px', position: 'relative' }}>
                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: 'var(--text-h3)', fontWeight: 600 }}>{job.company}</h3>
                    {job.current && (
                      <span style={{ ...monoLabel, letterSpacing: '.12em', color: 'var(--bg-0)', background: 'var(--green-400)', padding: '4px 9px', borderRadius: '6px' }}>
                        Actualidad
                      </span>
                    )}
                  </div>
                  <div style={{ marginTop: '6px', fontSize: '15px', color: 'var(--blue-400)' }}>{job.role}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-dim)' }}>{job.period}</div>
              </div>
              <ul style={{ margin: '18px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: '10px', position: 'relative' }}>
                {job.bullets.map((bullet) => (
                  <li key={bullet.slice(0, 24)} style={{ display: 'flex', gap: '12px', fontSize: 'var(--text-body-xs)', lineHeight: 1.6, color: 'var(--text-tertiary)' }}>
                    <span style={{ color, flex: 'none' }}>▸</span>
                    {bullet}
                  </li>
                ))}
              </ul>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '20px', ...monoLabel }}>ver más detalles</div>
            </div>
            {/* Dorso: detalle */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                padding: 'clamp(22px,2.4vw,32px)',
                borderRadius: 'var(--radius-lg)',
                border: borderBack,
                background: 'rgba(11,26,45,.95)',
                backdropFilter: 'var(--blur-nav)',
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '17px', fontWeight: 600, color: '#fff' }}>{job.detailTitle}</h4>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '14px 24px', marginTop: '18px' }}>
                {job.details.map((d) => (
                  <div key={d.label}>
                    <div style={{ ...monoLabel, color }}>{d.label}</div>
                    <div style={{ marginTop: '5px', fontSize: '13.5px', lineHeight: 1.55, color: 'var(--text-tertiary)' }}>{d.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Experiencia: timeline central con años, filtro dev/soporte y
 * cards con flip que muestran el detalle.
 */
export function Experience() {
  return (
    <section
      id="experiencia"
      data-zoom-section="1"
      style={{ position: 'relative', padding: 'var(--section-y) var(--gutter)', background: 'rgba(7,13,26,.9)', borderRadius: '28px', transformOrigin: '50% 18%', willChange: 'transform,opacity' }}
    >
      <div data-parallax="1" data-speed="0.08" style={{ position: 'absolute', top: '20%', left: '-10%', width: '44vw', height: '44vw', borderRadius: '50%', background: 'radial-gradient(circle,rgba(33,224,127,.1),transparent 65%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: 'var(--container)', margin: '0 auto' }}>
        <div style={{ marginBottom: 'clamp(44px,5vw,72px)' }}>
          <SectionHeading kicker="03 Experiencia" title="Productos, operación y sistemas" accent="críticos" accentColor="var(--blue-400)" />
        </div>

        {/* Filtro */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: 'clamp(36px,4.5vw,60px)' }}>
          {filterButtons.map((btn) => {
            const active = btn.id === 'all';
            return (
              <button
                key={btn.id}
                type="button"
                data-magnetic="1"
                data-sweep-auto="border"
                data-exp-btn={btn.id}
                aria-label={'aria' in btn ? btn.aria : undefined}
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                  padding: '11px 24px',
                  borderRadius: 'var(--radius-pill)',
                  border: active ? '1px solid var(--blue-400)' : '1px solid rgba(150,160,172,.22)',
                  background: active ? 'rgba(16,42,67,.5)' : 'transparent',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-kicker)',
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: active ? '#fff' : 'var(--text-dim)',
                  transition: 'color .35s,border-color .35s,background .35s,filter .35s',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                {btn.label ?? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <div data-exp-grid="1" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr', gap: 'clamp(20px,2.4vw,32px) clamp(48px,6vw,88px)', alignItems: 'start' }}>
          <div data-exp-line="1" style={{ display: 'none', position: 'absolute', left: '50%', top: '6px', bottom: '6px', width: '1px', marginLeft: '-.5px', background: 'rgba(78,159,212,.12)' }}>
            <div data-rail="1" style={{ position: 'absolute', inset: 0, background: 'var(--gradient-rail)', transform: 'scaleY(0)', transformOrigin: 'top', boxShadow: '0 0 12px rgba(78,159,212,.4)' }} />
            {timelineYears.map((year, i) => (
              <span
                key={year}
                style={{
                  position: 'absolute',
                  top: `${(i / (timelineYears.length - 1)) * 100}%`,
                  left: '50%',
                  transform: 'translate(-50%,-50%)',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid rgba(78,159,212,.16)',
                  background: 'var(--bg-0)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-micro)',
                  letterSpacing: '.14em',
                  color: 'var(--text-dim)',
                }}
              >
                {year}
              </span>
            ))}
          </div>

          {experiences.map((job) => (
            <JobCard key={job.company} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}
