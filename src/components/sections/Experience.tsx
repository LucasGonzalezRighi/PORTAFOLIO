import { experiences, type Experience as Job } from '@/content/experience';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLang } from '@/i18n/LanguageContext';
import type { JobTexts } from '@/i18n/types';
import { monoLabel } from '@/lib/styles';

/** "Oct 2023 — Mar 2025" → { full: "2023–25", short: "23–25" } ("Hoy" = año actual) */
function periodYears(period: string) {
  const now = new Date().getFullYear();
  const found = period.match(/\d{4}/g)?.map(Number) ?? [];
  const open = /hoy|today|hoje|present/i.test(period);
  const a = found[0] ?? now;
  const b = open ? now : (found[1] ?? a);
  if (a === b) return { full: String(a), short: `'${String(a).slice(2)}` };
  return { full: `${a}–${String(b).slice(2)}`, short: `${String(a).slice(2)}–${String(b).slice(2)}` };
}

function JobCard({ job, texts, currentLabel, seeMoreLabel }: { job: Job; texts: JobTexts; currentLabel: string; seeMoreLabel: string }) {
  const accent = job.current ? 'green' : 'blue';
  const color = accent === 'green' ? 'var(--green-400)' : 'var(--blue-400)';
  const borderFront = job.current ? '1px solid rgba(33,224,127,.18)' : 'var(--border-blue)';
  const borderBack = job.current ? '1px solid rgba(33,224,127,.24)' : '1px solid rgba(78,159,212,.24)';
  const shine = job.current ? 'rgba(33,224,127,.08)' : 'rgba(78,159,212,.09)';
  const nodeGlow = job.current ? 'rgba(33,224,127,.5)' : 'rgba(78,159,212,.5)';

  return (
    <div data-exp-card="1" data-exp={job.track} data-exp-row={job.row} style={{ position: 'relative' }}>
      <div style={{ position: 'relative' }}>
        <div data-tilt="1" style={{ perspective: '1500px' }}>
          <div data-flip="1" style={{ position: 'relative', transformStyle: 'preserve-3d', transition: 'transform .9s var(--ease-flip)' }}>
            {/* Frente */}
            <div
              style={{
                position: 'relative',
                padding: 'clamp(22px,2.4vw,32px)',
                borderRadius: 'var(--radius-lg)',
                border: borderFront,
                // opaco: en el mazo apilado no debe transparentarse la card de atrás
                background: job.current ? 'rgb(12,30,50)' : 'rgb(11,27,46)',
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
                        {currentLabel}
                      </span>
                    )}
                  </div>
                  <div style={{ marginTop: '6px', fontSize: '15px', color: 'var(--blue-400)' }}>{texts.role}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-dim)' }}>{texts.period}</div>
              </div>
              <ul style={{ margin: '18px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: '10px', position: 'relative' }}>
                {texts.bullets.map((bullet) => (
                  <li key={bullet.slice(0, 24)} style={{ display: 'flex', gap: '12px', fontSize: 'var(--text-body-xs)', lineHeight: 1.6, color: 'var(--text-tertiary)' }}>
                    <span style={{ color, flex: 'none' }}>▸</span>
                    {bullet}
                  </li>
                ))}
              </ul>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '20px', ...monoLabel }}>{seeMoreLabel}</div>
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
                <h4 style={{ margin: 0, fontSize: '17px', fontWeight: 600, color: '#fff' }}>{texts.detailTitle}</h4>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '14px 24px', marginTop: '18px' }}>
                {texts.details.map((d) => (
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
 * Experiencia: filtro dev/soporte y timeline apilada (mazo sticky ligado al
 * scroll) con cards que se dan vuelta para mostrar el detalle.
 */
export function Experience() {
  const { dict } = useLang();
  const filterButtons = [
    { id: 'all', label: null, aria: dict.experience.filterAll },
    { id: 'dev', label: dict.experience.filterDev },
    { id: 'sup', label: dict.experience.filterSup },
  ] as const;
  return (
    <section
      id="experiencia"
      data-zoom-section="1"
      style={{ position: 'relative', padding: 'var(--section-y) var(--gutter)', background: 'rgba(7,13,26,.9)', borderRadius: '28px', transformOrigin: '50% 18%', willChange: 'transform,opacity' }}
    >
      <div data-parallax="1" data-speed="0.08" style={{ position: 'absolute', top: '20%', left: '-10%', width: '44vw', height: '44vw', borderRadius: '50%', background: 'radial-gradient(circle,rgba(33,224,127,.1),transparent 65%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: 'var(--container)', margin: '0 auto' }}>
        <div style={{ marginBottom: 'clamp(44px,5vw,72px)' }}>
          <SectionHeading kicker={dict.experience.kicker} title={dict.experience.title} accent={dict.experience.accent} accentColor="var(--blue-400)" />
        </div>

        {/* Timeline con carpeta: el bloque queda fijo (sticky) y, a medida
            que scrolleás, cada card sube al centro y la anterior se traslada
            a la carpeta del borde (se puede tocar para volver a ella).
            La línea central pasa de verde lima a azul de marca con el
            progreso. Lo maneja EffectsEngine.scrollFx (data-expstack). Sin
            motor (reduced-motion) las cards quedan en lista, una debajo de otra. */}
        <div className="exp-stack" data-expstack="1" style={{ ['--exp-n' as never]: experiences.length }}>
          <div className="exp-stack-sticky">
            {/* Filtros dentro del bloque fijo: no se pierden mientras se agrupan */}
            {/* Filtro */}
            <div className="exp-filters" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', position: 'relative', zIndex: 120 }}>
              {filterButtons.map((btn) => {
                const active = btn.id === 'all';
                return (
                  <button
                    key={btn.id}
                    type="button"
                    data-magnetic="1"
                    data-sweep-auto="border"
                    data-exp-btn={btn.id}
                    aria-label={btn.label === null ? btn.aria : undefined}
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
                    {btn.label ? (
                      <span style={{ position: 'relative', zIndex: 1 }}>{btn.label}</span>
                    ) : (
                      /* Ícono de embudo (filtro): tres rayitas se leían como menú hamburguesa */
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 5h18l-7 8.5V19l-4 2v-7.5L3 5z" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="exp-stack-line" aria-hidden>
              <div className="exp-stack-line-fill" data-expline="1" />
            </div>
            <div className="exp-stack-chip" aria-hidden>
              <span data-expchip-period="1">{dict.experience.jobs[experiences[0].company]?.period}</span>
              <span className="exp-stack-chip-count" data-expchip-count="1">
                01 / {String(experiences.length).padStart(2, '0')}
              </span>
            </div>
            {/* Carpeta dibujada: acá se van guardando las cards que pasaron.
                Fondo con pestaña (detrás) y solapa (delante) → las cards
                guardadas quedan entre las dos, asomando. */}
            <div className="exp-folder" data-expfolder="1">
              <div className="exp-folder-back">
                {/* Etiqueta en la pestaña azul de la carpeta */}
                <span className="exp-folder-label">{dict.experience.folderLabel}</span>
              </div>
              {/* Pestañas archivadas (tipo bibliorato): una por card que pasó,
                  solo con sus años; asoman por arriba de la solapa */}
              <div className="exp-folder-tabs">
                {experiences.map((job, i) => {
                  const y = periodYears(dict.experience.jobs[job.company]?.period ?? job.period);
                  return (
                    <button
                      key={job.company}
                      type="button"
                      className="exp-folder-tab"
                      data-exptab={i}
                      aria-label={`${job.company} · ${y.full}`}
                      style={{ ['--k' as never]: i }}
                    >
                      <span className="exp-tab-full">{y.full}</span>
                      <span className="exp-tab-short">{y.short}</span>
                    </button>
                  );
                })}
              </div>
              <div className="exp-folder-front" aria-hidden>
                <span className="exp-folder-count" data-expfolder-count="1">00</span>
              </div>
            </div>
            <div className="exp-deck" data-exp-grid="1">
              {experiences.map((job, i) => (
                <div key={job.company} className="exp-deck-item" data-expitem={i} data-track={job.track} data-period={dict.experience.jobs[job.company]?.period ?? job.period}>
                  <JobCard
                    job={job}
                    texts={dict.experience.jobs[job.company]}
                    currentLabel={dict.experience.current}
                    seeMoreLabel={dict.experience.seeMore}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
