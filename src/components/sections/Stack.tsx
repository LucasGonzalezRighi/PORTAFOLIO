import { marquee, stackCategories, type StackCategory, type StackItem } from '@/content/stack';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { revealStyle, tones } from '@/lib/styles';

function ItemBadge({ item, size, tone }: { item: StackItem; size: number; tone: (typeof tones)[keyof typeof tones] }) {
  if (item.icon) {
    return <img data-icon="1" src={`/images/stack/${item.icon}.svg`} width={size} height={size} alt="" style={{ display: 'block' }} />;
  }
  const badge = item.badge!;
  return (
    <span
      style={{
        display: 'grid',
        placeItems: 'center',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: size > 20 ? '7px' : '5px',
        border: `1px solid ${tone.badgeBorder}`,
        fontFamily: 'var(--font-mono)',
        fontSize: badge.fontSize ?? (size > 20 ? '10px' : '7px'),
        fontWeight: 600,
        color: tone.color,
      }}
    >
      {badge.text}
    </span>
  );
}

function FlipCard({ category }: { category: StackCategory }) {
  const tone = tones[category.tone];
  return (
    <div
      data-reveal="1"
      data-delay={category.revealDelay || undefined}
      style={{ ...revealStyle, perspective: '1500px', minHeight: '230px' }}
    >
      <div
        data-hover="transform:rotateY(180deg)"
        style={{ position: 'relative', height: '100%', minHeight: '230px', transformStyle: 'preserve-3d', transition: 'transform .85s var(--ease-out)' }}
      >
        {/* Frente */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            textAlign: 'center',
            padding: '26px',
            borderRadius: 'var(--radius-lg)',
            border: `1px solid ${tone.border}`,
            background: 'rgba(13,32,54,.6)',
            backdropFilter: 'var(--blur-glass)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            boxShadow: `inset 0 0 60px -30px ${tone.glow}`,
          }}
        >
          <div style={{ display: 'flex', gap: '16px', opacity: 0.9 }}>
            {category.headerIcons.map((icon, i) => (
              <ItemBadge key={icon.icon ?? icon.badge?.text ?? i} item={icon} size={26} tone={tone} />
            ))}
          </div>
          <div style={{ fontSize: 'clamp(21px,2.1vw,27px)', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-.01em', color: tone.color }}>
            {category.title}
          </div>
        </div>
        {/* Dorso: chips de tecnologías */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'center',
            gap: 'var(--space-2)',
            padding: '26px',
            borderRadius: 'var(--radius-lg)',
            border: `1px solid ${tone.borderStrong}`,
            background: 'rgba(13,32,54,.82)',
            backdropFilter: 'var(--blur-glass)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {category.items.map((item) => (
            <span
              key={item.label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '7px 11px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12.5px',
                color: 'var(--text-body)',
                background: tone.bgSoft,
                border: `1px solid ${tone.chipBorder}`,
              }}
            >
              <ItemBadge item={item} size={item.icon ? 13 : 15} tone={tone} />
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Stack tecnológico: cards con flip por categoría + marquee de tecnologías.
 * La sección entra con zoom ligado al scroll (data-zoom-section).
 */
export function Stack() {
  const marqueeRow = (keyPrefix: string) => (
    <div style={{ display: 'flex', gap: '56px', alignItems: 'center' }}>
      {marquee.map((tech) => (
        <span
          key={`${keyPrefix}-${tech.label}`}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(15px,1.5vw,20px)',
            color: tech.color ?? 'var(--text-faint)',
            letterSpacing: '.04em',
          }}
        >
          {tech.label}
        </span>
      ))}
    </div>
  );

  return (
    <section
      id="stack"
      data-zoom-section="1"
      style={{ position: 'relative', padding: 'var(--section-y) 0', background: 'rgba(5,8,22,.86)', overflow: 'hidden', borderRadius: '28px', transformOrigin: '50% 18%', willChange: 'transform,opacity' }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          left: '-124px',
          top: '-124px',
          backgroundImage:
            'linear-gradient(rgba(78,159,212,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(78,159,212,.045) 1px,transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%,#000,transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%,#000,transparent 80%)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', maxWidth: 'var(--container)', margin: '0 auto', padding: '0 var(--gutter)' }}>
        <SectionHeading kicker="02 Stack tecnológico" title="Las herramientas con las que" accent="construyo" accentColor="var(--green-400)" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'var(--gap-card)', marginTop: 'clamp(40px,5vw,64px)' }}>
          {stackCategories.map((category) => (
            <FlipCard key={category.title} category={category} />
          ))}
        </div>
      </div>

      {/* Marquee de tecnologías */}
      <div
        style={{
          position: 'relative',
          marginTop: 'clamp(48px,6vw,88px)',
          padding: '22px 0',
          borderTop: '1px solid rgba(78,159,212,.1)',
          borderBottom: '1px solid rgba(78,159,212,.1)',
          maskImage: 'linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)',
          WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', width: 'max-content', gap: '56px', animation: 'marquee 34s linear infinite' }}>
          {marqueeRow('a')}
          {marqueeRow('b')}
        </div>
      </div>
    </section>
  );
}
