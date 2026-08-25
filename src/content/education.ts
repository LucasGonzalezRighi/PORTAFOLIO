export interface EducationCard {
  institution: string;
  title: string;
  description?: string;
  /** Promedio animado (si aplica) */
  grade?: { value: number; decimals: number; label: string };
  tone: 'blue' | 'green' | 'lime';
  revealDelay: number;
  sheenDelay: string;
}

export const education: EducationCard[] = [
  {
    institution: 'Universidad CAECE',
    title: 'Licenciatura en Sistemas',
    grade: { value: 8.66, decimals: 2, label: 'promedio general' },
    tone: 'blue',
    revealDelay: 0,
    sheenDelay: '1s',
  },
  {
    institution: 'Bootcamp Soy Henry',
    title: 'Full Stack intensivo',
    description: 'JavaScript, React, Node.js, Express, Sequelize y PostgreSQL.',
    tone: 'green',
    revealDelay: 80,
    sheenDelay: '1.8s',
  },
  {
    institution: 'Instituto Patrocinio de San José',
    title: 'Secundario · Primario',
    description: 'Bachillerato con orientación en Ciencias Naturales.',
    tone: 'lime',
    revealDelay: 160,
    sheenDelay: '2.6s',
  },
];

export interface Certification {
  label: string;
  tone: 'blue' | 'green' | 'lime';
  sheenDelay: string;
}

export const certifications: Certification[] = [
  { label: 'Salesforce', tone: 'blue', sheenDelay: '3.2s' },
  { label: 'JavaScript y TypeScript avanzado', tone: 'blue', sheenDelay: '3.2s' },
  { label: 'Git y GitHub para equipos', tone: 'green', sheenDelay: '3.8s' },
  { label: 'Fundamentos de Linux, CLI y Windows', tone: 'green', sheenDelay: '3.8s' },
  { label: 'Bases de datos SQL y MongoDB', tone: 'lime', sheenDelay: '4.4s' },
  { label: 'Soporte y mantenimiento de hardware corporativo', tone: 'lime', sheenDelay: '4.4s' },
];
