/**
 * Tipos del sistema de internacionalización.
 * Cada idioma implementa el diccionario completo `Dict`:
 * TypeScript garantiza que ninguna traducción quede faltando.
 */
export type Lang = 'es' | 'en' | 'pt';

export interface JobTexts {
  role: string;
  period: string;
  bullets: string[];
  detailTitle: string;
  details: { label: string; value: string }[];
}

export interface Dict {
  nav: {
    links: { id: string; label: string }[];
    availability: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    badges: string[];
    tagline: string;
    statLabels: [string, string, string];
    cv: string;
    viewProjects: string;
    scroll: string;
    ageLabel: string;
  };
  about: {
    kicker: string;
    title: string;
    accent: string;
    paragraphs: string[];
    /** En el mismo orden que content/about.languages */
    languages: { label: string; level: string }[];
    /** En el mismo orden que content/about.services */
    services: { title: string; description: string }[];
  };
  stack: {
    kicker: string;
    title: string;
    accent: string;
    /** En el mismo orden que content/stack.stackCategories */
    categories: string[];
  };
  experience: {
    kicker: string;
    title: string;
    accent: string;
    filterAll: string;
    filterDev: string;
    filterSup: string;
    current: string;
    seeMore: string;
    /** Textos por empresa (clave = company de content/experience) */
    jobs: Record<string, JobTexts>;
  };
  projects: {
    kicker: string;
    title: string;
    accent: string;
    featuredBadge: string;
    viewProject: string;
    more: string;
    less: string;
    imageAlt: string;
    openAria: string;
    /** Descripción por título de proyecto */
    descriptions: Record<string, string>;
  };
  code: {
    kicker: string;
    title: string;
    accent: string;
    explorer: string;
    lines: string;
    copy: string;
    copied: string;
    /** Título y descripción por id de snippet */
    snippets: Record<string, { title: string; description: string }>;
  };
  education: {
    kicker: string;
    title: string;
    accent: string;
    gradeLabel: string;
    /** Título/descripción por institución */
    cards: Record<string, { title: string; description?: string }>;
    /** En el mismo orden que content/education.certifications */
    certs: string[];
  };
  contact: {
    kicker: string;
    title: string;
    accent: string;
    blurb: string;
    mailCta: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    locationValue: string;
  };
  footer: {
    roleLine: string;
    note: string;
    backTop: string;
  };
}
