import { useEffect } from 'react';
import { EffectsEngine } from '@/lib/effects';

/**
 * Monta el motor de efectos una vez que el árbol está renderizado
 * y lo limpia al desmontar.
 */
export function useEffectsEngine() {
  useEffect(() => {
    const engine = new EffectsEngine();
    engine.init();
    return () => engine.destroy();
  }, []);
}
