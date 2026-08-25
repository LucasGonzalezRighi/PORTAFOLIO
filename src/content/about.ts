export const about = {
  heading: {
    kicker: '01 Sobre mí',
    title: 'Código que compile y que además',
    accent: 'inspire',
    tail: '.',
    accentColor: 'var(--blue-400)',
  },
  paragraphs: [
    'Soy Lucas González Righi, Full Stack Developer y especialista en soporte técnico e informático avanzado. Curioso por naturaleza, con ganas constantes de aprender y de crear cosas que funcionen y den gusto usarlas.',
    'Me interesa un entorno colaborativo (mejor si es híbrido, así el mate es real y los commits remotos), donde pueda aportar ideas, escribir buen código, automatizar lo que se repite y reírnos un poco mientras resolvemos problemas complejos.',
    'Quiero seguir creciendo profesionalmente mientras sumo valor a productos con impacto real.',
  ],
  languages: [
    { label: 'Español', level: 'nativo', color: '#E8C547', borderRgba: 'rgba(232,197,71,.24)', glowRgba: 'rgba(232,197,71,.55)', hoverBorder: '#E8C547' },
    { label: 'Português', level: 'nativo', color: 'var(--green-400)', borderRgba: 'rgba(107,245,168,.2)', glowRgba: 'rgba(107,245,168,.55)', hoverBorder: 'var(--green-400)' },
    { label: 'English', level: 'intermedio', color: 'var(--blue-400)', borderRgba: 'rgba(78,159,212,.2)', glowRgba: 'rgba(78,159,212,.5)', hoverBorder: 'var(--blue-400)' },
  ],
} as const;

export interface ServiceCard {
  title: string;
  description: string;
  /** Color del ícono / acento */
  tone: 'blue' | 'green' | 'lime';
  /** Path(s) SVG del ícono (stroke) */
  iconPaths: string[];
  iconRects?: { x: number; y: number; w: number; h: number; rx: number }[];
}

export const services: ServiceCard[] = [
  {
    title: 'Desarrollo full stack',
    description:
      'Plataformas modulares con Next.js, Nest.js, Express y MongoDB. Arquitectura escalable, orientada a mantenimiento y con Redis para sesiones y cacheo.',
    tone: 'blue',
    iconPaths: ['M9 18l-6-6 6-6M15 6l6 6-6 6'],
  },
  {
    title: 'Automatización & IA',
    description:
      'Flujos con n8n y Make integrando APIs, bases de datos y servicios externos. Integración de APIs de IA para asistentes, contenido y optimización de procesos.',
    tone: 'green',
    iconPaths: ['M13 3L5 14h6l-1 7 8-11h-6l1-7z'],
  },
  {
    title: 'Infraestructura & soporte',
    description:
      'CI/CD, Docker, Linux y cloud. Soporte N1/N2/L2 sobre aplicaciones críticas con SLA, diagnóstico de incidentes y análisis de datos productivos con SQL y Power BI.',
    tone: 'lime',
    iconPaths: ['M7 7.5h.01M7 16.5h.01'],
    iconRects: [
      { x: 3, y: 4, w: 18, h: 7, rx: 2 },
      { x: 3, y: 13, w: 18, h: 7, rx: 2 },
    ],
  },
];
