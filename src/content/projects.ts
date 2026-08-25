/**
 * Proyectos — cards con imágenes, mini editor de código y abanico al hover.
 */
export interface ProjectCodePane {
  file: string;
  code: string;
}

export interface Project {
  title: string;
  description: string;
  tagline: string;
  href: string;
  /** Imagen principal + hojas del abanico (en /public/images/projects) */
  image: string;
  sheets: [string, string];
  /** rgb del acento del abanico */
  fanAccent: string;
  featured?: boolean;
  /** Proyecto oculto tras “Ver más proyectos” */
  extra?: boolean;
  revealDelay?: number;
  codePane?: ProjectCodePane;
  badge?: string;
}

export const projects: Project[] = [
  {
    title: 'Kora',
    description:
      'Plataforma construida en Next.js con arquitectura modular, componentes reutilizables y despliegue continuo.',
    tagline: 'Next.js · TypeScript',
    href: 'https://kora20.vercel.app/es',
    image: '/images/projects/kora.png',
    sheets: ['/images/projects/kora-alt1.png', '/images/projects/kora-alt2.png'],
    fanAccent: '78,159,212',
    featured: true,
    badge: 'Destacado',
    codePane: {
      file: 'app/(kora)/layout.tsx',
      code: `import { Suspense } from 'react';\nimport { AppShell } from '@/components/shell';\n\nexport const dynamic = 'force-dynamic';\n\nexport default async function Layout({ children }) {\n  const session = await getSession();\n  return <AppShell user={session.user}>{children}</AppShell>;\n}`,
    },
  },
  {
    title: 'Advanced Consulting',
    description: 'Sitio corporativo con identidad propia y foco en conversión.',
    tagline: 'Framer',
    href: 'https://advancepconsulting.com/',
    image: '/images/projects/advanced-consulting.png',
    sheets: ['/images/projects/advanced-consulting-alt1.png', '/images/projects/advanced-consulting-alt2.png'],
    fanAccent: '78,159,212',
    revealDelay: 80,
  },
  {
    title: 'Gitano Denim',
    description: 'Tienda de indumentaria con catálogo, checkout y panel de gestión.',
    tagline: 'Next.js · E-commerce',
    href: 'https://www.gitano-denim.com/',
    image: '/images/projects/gitano-denim.png',
    sheets: ['/images/projects/gitano-denim-alt1.png', '/images/projects/gitano-denim-alt2.png'],
    fanAccent: '78,159,212',
    revealDelay: 140,
    codePane: {
      file: 'app/api/checkout/route.ts',
      code: `export async function POST(req: Request) {\n  const cart = await req.json();\n  const total = cart.items.reduce(sum, 0);\n\n  return Response.json({ total });\n}`,
    },
  },
  {
    title: 'Soluz Instaladora',
    description: 'Landing con automatizaciones de leads para empresa de energía solar.',
    tagline: 'Next.js · n8n',
    href: 'https://www.gruposoluz.com.br/',
    image: '/images/projects/soluz-instaladora.png',
    sheets: ['/images/projects/soluz-instaladora-alt1.png', '/images/projects/soluz-instaladora-alt2.png'],
    fanAccent: '107,245,168',
    codePane: {
      file: 'workflows/leads.json',
      code: `const lead = $json;\n\nawait crm.upsert({\n  email: lead.email,\n  source: 'landing-solar',\n});\n\nreturn [{ json: { ok: true } }];`,
    },
  },
  {
    title: 'Vach Laser',
    description:
      'App de grabado láser para eventos: personalización en 3 pasos desde el celular, cola de pedidos en vivo y consola admin con métricas, diseños y estación de operador.',
    tagline: 'React · Vite · Supabase',
    href: 'https://vach-laser.vercel.app',
    image: '/images/projects/vach-laser.png',
    sheets: ['/images/projects/vach-laser-alt1.png', '/images/projects/vach-laser-alt2.png'],
    fanAccent: '78,159,212',
    extra: true,
  },
  {
    title: 'GymHakkyo',
    description: 'Sitio de reservas de clases para gimnasio.',
    tagline: 'Framer',
    href: 'https://giant-research-002274.framer.app/',
    image: '/images/projects/gymhakkyo.png',
    sheets: ['/images/projects/gymhakkyo-alt1.png', '/images/projects/gymhakkyo-alt2.png'],
    fanAccent: '78,159,212',
    extra: true,
    codePane: {
      file: 'booking/slots.ts',
      code: `interface Slot { at: Date; seats: number }\n\nexport const available = (s: Slot[]) =>\n  s.filter((slot) => slot.seats > 0);`,
    },
  },
  {
    title: 'Mundo PIPI',
    description: 'Tienda online: catálogo, medios de pago, envíos y automatizaciones operativas.',
    tagline: 'Tiendanube',
    href: 'https://mundopipi.mitiendanube.com/',
    image: '/images/projects/mundo-pipi.png',
    sheets: ['/images/projects/mundo-pipi-alt1.png', '/images/projects/mundo-pipi-alt2.png'],
    fanAccent: '33,224,127',
    extra: true,
    codePane: {
      file: 'scripts/sync-stock.js',
      code: `const orders = await store.orders({\n  status: 'paid',\n});\n\nfor (const order of orders) {\n  await stock.decrement(order.items);\n}`,
    },
  },
  {
    title: 'Soft P&L',
    description: 'Web institucional con portfolio de automatizaciones y proyectos integrados.',
    tagline: 'Next.js',
    href: 'https://softpl.framer.website/',
    image: '/images/projects/soft-pyl.png',
    sheets: ['/images/projects/soft-pyl-alt1.png', '/images/projects/soft-pyl-alt2.png'],
    fanAccent: '33,224,127',
    extra: true,
    codePane: {
      file: 'lib/seo.ts',
      code: `export interface Meta {\n  title: string;\n  locale: 'es-AR';\n}\n\nexport const build = (m: Meta) => ({\n  ...m,\n  openGraph: { type: 'website' },\n});`,
    },
  },
  {
    title: 'Benasu Stock',
    description: 'Gestor de stock liviano, sin frameworks, pensado para uso diario.',
    tagline: 'HTML · CSS3 · JavaScript',
    href: 'https://lucasgonzalezrighi.github.io/resolucionerrores/',
    image: '/images/projects/benasu-stock.png',
    sheets: ['/images/projects/benasu-stock-alt1.png', '/images/projects/benasu-stock-alt2.png'],
    fanAccent: '107,245,168',
    extra: true,
  },
];
