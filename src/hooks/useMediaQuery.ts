import { useEffect, useState } from 'react';

/**
 * Suscripción reactiva a una media query.
 * Ej: useMediaQuery('(max-width: 899px)') · useMediaQuery('(pointer: coarse)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
