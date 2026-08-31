import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Dict, Lang } from './types';
import { es } from './es';
import { en } from './en';
import { pt } from './pt';

const DICTS: Record<Lang, Dict> = { es, en, pt };

export const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'pt', label: 'PT', name: 'Português' },
];

const STORAGE_KEY = 'portfolio-lang';

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'es' || saved === 'en' || saved === 'pt') return saved;
  } catch {
    /* almacenamiento no disponible */
  }
  const nav = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'es';
  if (nav.startsWith('pt')) return 'pt';
  if (nav.startsWith('en')) return 'en';
  return 'es';
}

interface LanguageContextValue {
  lang: Lang;
  dict: Dict;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* almacenamiento no disponible */
    }
  }, [lang]);

  const value = useMemo(() => ({ lang, dict: DICTS[lang], setLang }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/** Acceso al idioma activo y su diccionario */
export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang debe usarse dentro de <LanguageProvider>');
  return ctx;
}
