/**
 * Experiencia profesional — timeline con filtro Desarrollador / Soporte.
 */
export interface ExperienceDetail {
  label: string;
  value: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  /** Columna de la timeline en desktop */
  track: 'dev' | 'sup';
  /** Fila de la grilla en desktop (orden cronológico visual) */
  row: number;
  current?: boolean;
  bullets: string[];
  detailTitle: string;
  details: ExperienceDetail[];
  revealDelay?: number;
}

export const timelineYears = ['2026', '2025', '2024', '2023', '2022'] as const;

export const experiences: Experience[] = [
  {
    company: 'Soft P&L',
    role: 'Full Stack Developer · Remoto',
    period: 'Ago 2024 — Hoy',
    track: 'dev',
    row: 1,
    current: true,
    bullets: [
      'Plataformas web modulares con MongoDB, Express, Nest.js, Next.js y Tailwind; arquitectura escalable y orientada a mantenimiento.',
      'Redis para sesiones, cacheo y rendimiento en apps de alta concurrencia; pipelines CI/CD automatizados.',
      'Flujos de automatización con n8n y Make, integraciones de IA y soluciones Salesforce Quote-to-Cash.',
    ],
    detailTitle: 'Soft P&L · en detalle',
    details: [
      { label: 'Stack', value: 'Next.js · Nest.js · Express · MongoDB · Redis · TypeScript · Tailwind CSS' },
      { label: 'Herramientas', value: 'n8n · Make · Salesforce · Docker · Git & GitHub · APIs de IA' },
      { label: 'Responsabilidades', value: 'Diseño de arquitectura modular, desarrollo end-to-end, code review y despliegues.' },
      { label: 'Logros', value: 'Pipelines CI/CD automatizados y cacheo con Redis en apps de alta concurrencia.' },
      { label: 'Proyectos', value: 'Kora · Soft P&L · Soluz Instaladora' },
      { label: 'Arquitectura', value: 'Módulos desacoplados, API REST con capa de servicios y sesiones en Redis.' },
    ],
  },
  {
    company: 'Bolsa de Comercio de Buenos Aires',
    role: 'Técnico de División Informática · Presencial',
    period: 'Feb 2026 — Ago 2026',
    track: 'sup',
    row: 2,
    bullets: [
      'Soporte N1/N2 presencial y remoto a usuarios internos, con registro y seguimiento de incidencias.',
      'Diagnóstico de hardware, reemplazo de componentes y configuración de equipos Windows y periféricos.',
      'Conectividad LAN/Wi-Fi, direccionamiento IP, DNS y relevamiento de inventario de equipos.',
    ],
    detailTitle: 'Bolsa de Comercio · en detalle',
    details: [
      { label: 'Tecnologías', value: 'Windows 10/11 · Active Directory · redes LAN/Wi-Fi · DNS · DHCP' },
      { label: 'Herramientas', value: 'Mesa de ayuda interna · inventario de activos · Office 365' },
      { label: 'Responsabilidades', value: 'Soporte N1/N2 presencial y remoto, con registro y seguimiento de cada incidencia.' },
      { label: 'Logros', value: 'Inventario de equipos relevado y puestos de trabajo estandarizados.' },
      { label: 'Infraestructura', value: 'Diagnóstico de hardware, reemplazo de componentes y configuración de periféricos.' },
    ],
  },
  {
    company: 'Tarjeta Plata',
    role: 'Sistemas Avanzados en Aplicaciones · Híbrido',
    period: 'Jul 2025 — Ene 2026',
    track: 'sup',
    row: 3,
    bullets: [
      'Soporte funcional y técnico avanzado de aplicaciones críticas del negocio crediticio (Loan, Collection), en esquemas real time.',
      'Gestión de incidentes de alta prioridad por impacto operativo, SLA y continuidad del servicio, con seguimiento en Jira.',
      'Extracción y validación de datos con SQL, dashboards en Power BI y desarrollo de un sistema de gestión de facturas.',
    ],
    detailTitle: 'Tarjeta Plata · en detalle',
    details: [
      { label: 'Tecnologías', value: 'SQL Server · consultas y validación de datos productivos · Power BI' },
      { label: 'Herramientas', value: 'Jira · aplicaciones Loan y Collection · monitoreo real time' },
      { label: 'Responsabilidades', value: 'Soporte funcional y técnico avanzado del negocio crediticio, con SLA y continuidad del servicio.' },
      { label: 'Logros', value: 'Sistema propio de gestión de facturas y dashboards de seguimiento operativo.' },
      { label: 'Impacto', value: 'Gestión de incidentes de alta prioridad sobre sistemas críticos del negocio.' },
    ],
  },
  {
    company: 'Accenture',
    role: 'Soporte Técnico en Aplicaciones y Nube (L2) · Remoto',
    period: 'Oct 2023 — Mar 2025',
    track: 'sup',
    row: 4,
    bullets: [
      'Soporte L2 de aplicaciones empresariales y plataformas cloud, asegurando continuidad y alta disponibilidad.',
      'Gestión de incidencias en ServiceNow con priorización por impacto y urgencia (SLA).',
      'Comunicación 100% en portugués con usuarios y equipos internos de Brasil, con documentación clara de incidentes.',
    ],
    detailTitle: 'Accenture · en detalle',
    details: [
      { label: 'Tecnologías', value: 'Aplicaciones empresariales · plataformas cloud · monitoreo de disponibilidad' },
      { label: 'Herramientas', value: 'ServiceNow · bases de conocimiento · runbooks de incidentes' },
      { label: 'Responsabilidades', value: 'Soporte L2, priorización por impacto y urgencia, escalamiento a equipos de desarrollo.' },
      { label: 'Logros', value: 'Continuidad y alta disponibilidad sostenidas dentro de SLA durante 18 meses.' },
      { label: 'Idioma', value: 'Operación 100% en portugués con usuarios y equipos internos de Brasil.' },
    ],
  },
  {
    company: 'Proyectos Freelance',
    role: 'Full Stack Developer',
    period: 'Oct 2022 — Jul 2023',
    track: 'dev',
    row: 5,
    bullets: [
      'Aplicaciones web full stack a medida y APIs RESTful con Node.js y Express, con foco en seguridad y validación de datos.',
      'Chatbots en Python e interfaces React con componentes reutilizables y manejo de estado.',
      'Personalización de Salesforce con Apex junto a stakeholders internos y externos.',
    ],
    detailTitle: 'Freelance · en detalle',
    details: [
      { label: 'Stack', value: 'Node.js · Express · React · Python · Apex · PostgreSQL' },
      { label: 'Herramientas', value: 'Salesforce · Git & GitHub · Postman · Figma' },
      { label: 'Responsabilidades', value: 'Relevamiento con clientes, desarrollo end-to-end y entrega de cada proyecto.' },
      { label: 'Logros', value: 'APIs RESTful con foco en seguridad y validación, y chatbots en producción.' },
      { label: 'Arquitectura', value: 'Componentes React reutilizables, manejo de estado y capa de servicios en Node.' },
    ],
  },
  {
    company: 'Equipo Tech',
    role: 'Analista en Soporte Técnico · Presencial',
    period: 'Ene 2022 — Mar 2023',
    track: 'sup',
    row: 6,
    bullets: [
      'Atención de incidentes de hardware, software y aplicaciones priorizando el impacto en la operación diaria.',
      'Instalación y configuración de equipos, migración de información y tareas de red y cableado.',
    ],
    detailTitle: 'Equipo Tech · en detalle',
    details: [
      { label: 'Tecnologías', value: 'Windows · hardware corporativo · redes y cableado estructurado' },
      { label: 'Responsabilidades', value: 'Atención de incidentes priorizando el impacto en la operación diaria.' },
      { label: 'Logros', value: 'Migraciones de información sin pérdida de datos ni cortes de servicio.' },
    ],
  },
];
