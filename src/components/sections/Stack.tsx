import { marquee, stackCategories, type StackCategory, type StackItem } from '@/content/stack';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLang } from '@/i18n/LanguageContext';
import { asset } from '@/lib/asset';
import { tones } from '@/lib/styles';

function ItemBadge({ item, size, tone }: { item: StackItem; size: number; tone: (typeof tones)[keyof typeof tones] }) {
  if (item.icon) {
    return <img data-icon="1" src={asset(`/images/stack/${item.icon}.svg`)} width={size} height={size} alt="" style={{ display: 'block' }} />;
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

/** Dirección del giro según la columna: izquierda gira a la izquierda,
 *  centro arriba (fila 1) / abajo (fila 2), derecha a la derecha. */
type FlipDir = 'left' | 'right' | 'up' | 'down';
const FLIP_DIRS: FlipDir[] = ['left', 'up', 'right', 'left', 'down', 'right'];
const FLIP_TRANSFORM: Record<FlipDir, string> = {
  left: 'rotateY(-180deg)',
  right: 'rotateY(180deg)',
  up: 'rotateX(180deg)',
  down: 'rotateX(-180deg)',
};

function FlipCard({ category, title, dir }: { category: StackCategory; title: string; dir: FlipDir }) {
  const tone = tones[category.tone];
  const vertical = dir === 'up' || dir === 'down';
  return (
    <div
      // Entrada "desde el fondo" ligada al scroll (EffectsEngine.scrollFx)
      data-depthcard="1"
      className="flip-card"
      style={{ perspective: '1500px', minHeight: '230px' }}
    >
      <div className="flip-inner" data-tapflip="1" style={{ ['--flip' as never]: FLIP_TRANSFORM[dir] }}>
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
            {title}
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
            // el dorso se pre-gira en el mismo eje del giro (si no, en los
            // giros verticales el texto quedaría patas para arriba)
            transform: vertical ? 'rotateX(180deg)' : 'rotateY(180deg)',
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
 * Movimiento ligado al scroll (EffectsEngine.scrollFx), sin pin:
 *  - Entrada: las cards vienen desde el fondo (chicas, apagadas y
 *    desenfocadas) y se acercan escalonadas por columna (data-depthcard).
 *  - Salida: la sección se desenfoca y se funde al irse (data-exitfx).
 */
// Separador de nombres sobre el arco (NBSP: los espacios normales colapsan en SVG)
const ARC_SEP = '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0';

export function Stack() {
  const { dict } = useLang();

  return (
    <section
      id="stack"
      data-exitfx="1"
      data-overlayin="1"
      style={{ position: 'relative', padding: 'var(--section-y) 0 calc(var(--section-y) + 16vw)', background: 'rgba(5,8,22,.86)', overflow: 'hidden', transformOrigin: '50% 100%', willChange: 'transform,opacity' }}
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
        <SectionHeading kicker={dict.stack.kicker} title={dict.stack.title} accent={dict.stack.accent} accentColor="var(--green-400)" />
        {/* perspective: da profundidad al translateZ de la entrada de las cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'var(--gap-card)', marginTop: 'clamp(40px,5vw,64px)', perspective: '1200px' }}>
          {stackCategories.map((category, i) => (
            <FlipCard key={category.title} category={category} title={dict.stack.categories[i]} dir={FLIP_DIRS[i % FLIP_DIRS.length]} />
          ))}
        </div>
      </div>

      {/* Marquee de tecnologías, versión arco: EL MISMO componente de siempre
          (fondo oscuro, cada tecnología con su color de tokens `--tech-*`),
          pero con la estructura curva y el desplazamiento ligado al scroll
          de damrod (data-arctext → EffectsEngine.scrollFx). */}
      <div aria-hidden style={{ position: 'absolute', left: '50%', bottom: '-6vw', transform: 'translateX(-50%)', width: 'max(150vw, 1100px)', pointerEvents: 'none', zIndex: 6 }}>
        <svg viewBox="0 0 1400 360" width="100%" style={{ display: 'block' }}>
          {/* Banda: cinta fina (la mitad de alto) con curva más cerrada y
              más larga — los extremos salen bien por fuera de la pantalla */}
          <path id="stack-arc" d="M -420 560 Q 700 -230 1820 560" fill="none" stroke="rgb(10,22,40)" strokeWidth="44" />
          {/* Hairlines superior e inferior, como los bordes de la tira */}
          <path d="M -420 538 Q 700 -252 1820 538" fill="none" stroke="rgba(78,159,212,.16)" strokeWidth="1.2" />
          <path d="M -420 582 Q 700 -208 1820 582" fill="none" stroke="rgba(78,159,212,.16)" strokeWidth="1.2" />
          <text fontFamily="var(--font-mono)" fontWeight={600} fontSize="12.5" letterSpacing="1.4" dominantBaseline="middle" xmlSpace="preserve">
            <textPath href="#stack-arc" data-arctext="1" startOffset="-10%">
              {[0, 1, 2, 3, 4, 5].map((rep) =>
                marquee.map((tech) => (
                  <tspan key={`${rep}-${tech.label}`} fill={tech.color ?? 'var(--text-faint)'}>
                    {tech.label + ARC_SEP}
                  </tspan>
                )),
              )}
            </textPath>
          </text>
        </svg>
      </div>
    </section>
  );
}
