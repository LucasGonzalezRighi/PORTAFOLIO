import { useMediaQuery } from '@/hooks/useMediaQuery';

/**
 * Spotlight y anillo que siguen el cursor (animados por el motor de efectos).
 * En dispositivos táctiles no se renderiza: no hay cursor que seguir.
 */
export function CursorFx() {
  const isTouch = useMediaQuery('(pointer: coarse)');
  if (isTouch) return null;
  return (
    <>
      <div
        data-spot="1"
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '760px',
          height: '760px',
          margin: '-380px 0 0 -380px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle,rgba(46,127,196,.1),rgba(33,224,127,.04) 45%,transparent 72%)',
          pointerEvents: 'none',
          zIndex: 'var(--z-spot)' as never,
          willChange: 'transform',
          transition: 'opacity .4s',
          opacity: 0,
        }}
      />
      <div
        data-ring="1"
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '26px',
          height: '26px',
          margin: '-13px 0 0 -13px',
          /* rombo: cuadrado con esquinas apenas redondeadas, rotado 45° por el motor */
          borderRadius: '5px',
          border: '1px solid rgba(107,245,168,.4)',
          pointerEvents: 'none',
          zIndex: 'var(--z-cursor)' as never,
          willChange: 'transform',
          opacity: 0,
          transition: 'opacity .3s,width .2s,height .2s',
        }}
      />
    </>
  );
}
