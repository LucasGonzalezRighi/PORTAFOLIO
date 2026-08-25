/**
 * Datos globales del sitio. Editá acá sin tocar componentes.
 */
export const site = {
  name: 'Lucas González Righi',
  firstName: 'Lucas',
  lastName: 'González Righi',
  lastNameAccent: 'Righi',
  role: 'Full Stack Developer',
  logo: 'LG',
  domain: 'lucas.dev',
  availability: 'Disponible para trabajar',
  tagline:
    'Full Stack Developer y especialista en infraestructura. Construyo plataformas web modulares, automatizo lo que se repite e integro IA en procesos de negocio reales.',
  heroBadges: ['Desarrollo web', 'Automatización', 'Soporte técnico', 'Infraestructura'],
  heroStats: [
    { prefix: '+', value: 4, label: 'Años en producción' },
    { prefix: '+', value: 10, label: 'Proyectos entregados' },
    { value: 8.66, decimals: 2, label: 'Promedio de Sistemas' },
  ],
  age: { label: 'edad', value: '27' },
  photo: { src: '/images/foto-lucas.jpg', alt: 'Lucas González Righi' },
  cv: { href: '/cv/Lucas-Gonzalez-Righi-CV.pdf', download: 'Lucas-Gonzalez-Righi-CV.pdf' },
  email: 'lucasgonzalezrighi@gmail.com',
  phone: { display: '+54 9 11 2237-0949', tel: '+5491122370949' },
  location: 'Belgrano, CABA · Híbrido o remoto',
  linkedin: 'https://www.linkedin.com/in/lucas-gonzalez-righi',
  footerNote: '© 2026 · Diseñado y desarrollado por Lucas González Righi.',
} as const;

export const navLinks = [
  { id: 'sobre', label: 'Sobre mí' },
  { id: 'stack', label: 'Stack' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'codigo', label: 'Código' },
  { id: 'certificaciones', label: 'Certificaciones' },
] as const;
