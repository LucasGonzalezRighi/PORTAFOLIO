import { projects, type Project } from '@/content/projects';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLang } from '@/i18n/LanguageContext';
import type { Dict } from '@/i18n/types';
import { asset } from '@/lib/asset';
import { highlight } from '@/lib/highlight';
import { revealStyle, monoLabel } from '@/lib/styles';

/** Hoja del abanico que se abre al hover */
function FanSheet({ index, image, featured }: { index: 1 | 2; image: string; featured?: boolean }) {
  return (
    <span
      data-sheet={index}
      aria-hidden
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: '32px',
        zIndex: 0,
        overflow: 'hidden',
        borderRadius: 'var(--radius-xl)',
        border: featured ? undefined : `1px solid rgba(78,159,212,${index === 1 ? '.2' : '.14'})`,
        background: `var(--bg-1) url("${asset(image)}") center top/cover no-repeat`,
        transformOrigin: index === 1 ? '0% 100%' : '100% 100%',
        transform: 'rotate(0deg) translate(0,0) scale(1)',
        transition: 'transform .5s var(--ease-out),opacity .5s var(--ease-out)',
        opacity: 0,
        pointerEvents: 'none',
      }}
    />
  );
}

/** Mini ventana de código detrás de la imagen */
function CodePane({ file, code, featured }: { file: string; code: string; featured?: boolean }) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: 'rgba(9,21,37,.96)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: featured ? '12px 16px' : '11px 14px', borderBottom: 'var(--border-faint)' }}>
        {featured ? (
          <>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--code-key)', opacity: 0.75 }} />
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--lime-400)', opacity: 0.75 }} />
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--green-400)', opacity: 0.75 }} />
          </>
        ) : (
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--blue-400)', opacity: 0.7 }} />
        )}
        <span style={{ marginLeft: featured ? 'var(--space-2)' : undefined, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-micro)', letterSpacing: '.1em', color: 'var(--text-dim)' }}>
          {file}
        </span>
      </div>
      <pre style={{ margin: 0, padding: featured ? '18px 20px' : '16px 18px', overflow: 'hidden', fontFamily: 'var(--font-mono)', fontSize: featured ? 'var(--text-code)' : '12px', lineHeight: 1.85, color: 'var(--code-type)', whiteSpace: 'pre' }}>
        {highlight(code)}
      </pre>
    </div>
  );
}

function ProjectCard({ project, t }: { project: Project; t: Dict['projects'] }) {
  const featured = project.featured;
  return (
    <a
      data-reveal="1"
      data-extra={project.extra ? '1' : undefined}
      data-delay={project.revealDelay || undefined}
      href={project.href}
      target="_blank"
      rel="noopener"
      data-fan="1"
      aria-label={t.openAria.replace('{name}', project.title)}
      style={{
        ...revealStyle,
        gridColumn: featured ? '1 / -1' : undefined,
        minWidth: 0,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-xl)',
        isolation: 'isolate',
        border: `1px solid rgba(78,159,212,${featured ? '.18' : '.14'})`,
        background: featured ? 'rgba(13,32,54,.7)' : 'rgba(11,27,46,.68)',
        backdropFilter: 'var(--blur-glass)',
        color: '#fff',
        transformStyle: 'preserve-3d',
        boxShadow: featured ? '0 40px 90px -60px rgba(78,159,212,.5)' : undefined,
      }}
    >
      <FanSheet index={2} image={project.sheets[1]} featured={featured} />
      <FanSheet index={1} image={project.sheets[0]} featured={featured} />

      {/* Visual: imagen sobre mini editor */}
      <div style={{ position: 'relative', zIndex: 2, aspectRatio: featured ? '1.669' : '16/10', overflow: 'hidden', borderRadius: '23px 23px 0 0', background: 'var(--bg-1)' }}>
        {project.codePane && <CodePane file={project.codePane.file} code={project.codePane.code} featured={featured} />}
        <img src={asset(project.image)} alt={`${t.imageAlt} ${project.title}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg,transparent ${featured ? '40%' : '45%'},rgba(5,8,22,.9))`, pointerEvents: 'none' }} />
      </div>

      {/* Texto */}
      <div style={{ position: 'relative', zIndex: 2, padding: featured ? 'clamp(22px,2.4vw,32px)' : '24px', background: featured ? 'rgb(11,25,44)' : 'rgb(9,21,38)', borderRadius: '0 0 23px 23px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
          {project.badge && (
            <span style={{ ...monoLabel, letterSpacing: '.14em', color: 'var(--bg-0)', background: 'var(--lime-400)', padding: '4px 9px', borderRadius: '6px' }}>
              {t.featuredBadge}
            </span>
          )}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-kicker)', color: 'var(--text-dim)' }}>{project.tagline}</span>
        </div>
        <h3 style={{ margin: featured ? '14px 0 0' : '10px 0 0', fontSize: featured ? 'clamp(24px,2.4vw,34px)' : '22px', fontWeight: 600, letterSpacing: featured ? '-.02em' : undefined }}>
          {project.title}
        </h3>
        <p style={{ margin: featured ? '12px 0 0' : '10px 0 0', maxWidth: '60ch', fontSize: featured ? 'var(--text-body-sm)' : 'var(--text-body-xs)', lineHeight: featured ? 1.65 : 1.6, color: 'var(--text-tertiary)' }}>
          {t.descriptions[project.title] ?? project.description}
        </p>
        {featured && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '20px', fontSize: '14px', fontWeight: 500, color: 'var(--lime-400)' }}>
            {t.viewProject}{' '}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </span>
        )}
      </div>
    </a>
  );
}

const dividerLeft = { flex: 1, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(150,160,172,.32))' } as const;
const dividerRight = { flex: 1, height: '1px', background: 'linear-gradient(270deg,transparent,rgba(150,160,172,.32))' } as const;
const moreButtonStyle = {
  position: 'relative',
  cursor: 'pointer',
  padding: '13px 28px',
  borderRadius: 'var(--radius-pill)',
  border: '1px solid rgba(150,160,172,.26)',
  background: 'rgba(16,42,67,.35)',
  backdropFilter: 'blur(8px)',
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-kicker)',
  letterSpacing: '.16em',
  textTransform: 'uppercase',
  color: 'var(--text-secondary)',
  transition: 'color .3s,border-color .3s',
} as const;

/**
 * Proyectos: destacado + grilla con abanico de screenshots al hover
 * y bloque expandible "Ver más proyectos".
 */
export function Projects() {
  const { dict } = useLang();
  const t = dict.projects;
  const visible = projects.filter((p) => !p.extra);
  const extras = projects.filter((p) => p.extra);

  return (
    <section id="proyectos" style={{ position: 'relative', padding: 'var(--section-y) var(--gutter)', background: 'rgba(5,8,22,.86)' }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '80vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(circle,rgba(29,95,168,.1),transparent 60%)', filter: 'blur(90px)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: 'var(--container)', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', marginBottom: 'clamp(40px,5vw,64px)' }}>
          <div style={{ flex: '1 1 420px' }}>
            <SectionHeading kicker={t.kicker} title={t.title} accent={t.accent} accentColor="var(--blue-400)" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(28px,3.4vw,52px)' }}>
          {visible.map((project) => (
            <ProjectCard key={project.title} project={project} t={t} />
          ))}

          <div data-more-row="1" style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '20px', margin: '4px 0' }}>
            <span aria-hidden style={dividerLeft} />
            <button type="button" data-more-btn="1" data-magnetic="1" data-sweep-auto="border" data-hover="color:#fff;border-color:var(--blue-400)" style={moreButtonStyle}>
              <span style={{ position: 'relative', zIndex: 1 }}>{t.more}</span>
            </button>
            <span aria-hidden style={dividerRight} />
          </div>

          {extras.map((project) => (
            <ProjectCard key={project.title} project={project} t={t} />
          ))}

          <div data-less-row="1" style={{ display: 'none', gridColumn: '1 / -1', alignItems: 'center', gap: '20px', margin: '4px 0' }}>
            <span aria-hidden style={dividerLeft} />
            <button type="button" data-less-btn="1" data-magnetic="1" data-sweep-auto="border" data-hover="color:#fff;border-color:var(--blue-400)" style={{ ...moreButtonStyle, display: 'inline-flex', alignItems: 'center', gap: '9px' }}>
              <span style={{ position: 'relative', zIndex: 1 }}>{t.less}</span>{' '}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 19V5M6 11l6-6 6 6" />
              </svg>
            </button>
            <span aria-hidden style={dividerRight} />
          </div>
        </div>
      </div>
    </section>
  );
}
