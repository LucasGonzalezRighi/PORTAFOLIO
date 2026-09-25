import type { Dict } from './types';

/** Español (idioma base) */
export const es: Dict = {
  nav: {
    links: [
      { id: 'sobre', label: 'Sobre mí' },
      { id: 'stack', label: 'Stack' },
      { id: 'experiencia', label: 'Experiencia' },
      { id: 'proyectos', label: 'Proyectos' },
      { id: 'codigo', label: 'Código' },
      { id: 'certificaciones', label: 'Certificaciones' },
    ],
    availability: 'Disponible para trabajar',
    contact: 'Contacto',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
  },
  hero: {
    badges: ['Desarrollo web', 'Automatización', 'Soporte técnico', 'Infraestructura'],
    greeting: 'Hola, soy',
    tagline:
      'Full Stack Developer y especialista en infraestructura. Construyo plataformas web modulares, automatizo lo que se repite e integro IA en procesos de negocio reales.',
    statLabels: ['Años en producción', 'Proyectos entregados', 'Promedio de Sistemas'],
    cv: 'Mi CV',
    viewProjects: 'Mi laburo',
    scroll: 'scroll',
    ageLabel: 'edad',
  },
  about: {
    kicker: '01 Sobre mí',
    title: 'Código que compile y que además',
    accent: 'inspire',
    paragraphs: [
      "Soy programador y me encanta inventar. Arranco con una idea, la pienso, la rompo y la vuelvo a armar hasta que se convierte en un producto que clientes reales usan todos los días. Innovar es la parte que más disfruto.",
      "Además soy técnico en sistemas: mantenimiento y soporte de soft y hard, de la compu que no prende al sistema que se cayó. Trabajo en equipo, soy proactivo y vivo aprendiendo. La IA es mi compañera de banco: rápida, brillante y convencida de cosas que no existen.",
    ],
    langsLabel: 'Idiomas en los que trabajo',
    languages: [
      { label: 'Español', level: 'nativo' },
      { label: 'Português', level: 'nativo' },
      { label: 'English', level: 'B1' },
    ],
    services: [
      {
        title: 'Desarrollo full stack',
        description:
          'Plataformas modulares con Next.js, Nest.js, Express y MongoDB. Arquitectura escalable, orientada a mantenimiento y con Redis para sesiones y cacheo.',
      },
      {
        title: 'Automatización & IA',
        description:
          'Flujos con n8n y Make integrando APIs, bases de datos y servicios externos. Integración de APIs de IA para asistentes, contenido y optimización de procesos.',
      },
      {
        title: 'Infraestructura & soporte',
        description:
          'CI/CD, Docker, Linux y cloud. Soporte N1/N2/L2 sobre aplicaciones críticas con SLA, diagnóstico de incidentes y análisis de datos productivos con SQL y Power BI.',
      },
    ],
  },
  stack: {
    kicker: '02 Stack tecnológico',
    title: 'Las herramientas con las que',
    accent: 'construyo',
    categories: [
      'Lenguajes y Frameworks',
      'Automatización e IA',
      'Bases de datos',
      'DevOps e Infraestructura',
      'Operación y Datos',
      'Metodologías',
    ],
  },
  experience: {
    kicker: '03 Experiencia',
    folderLabel: 'Mi Xp',
    title: 'Productos, operación y sistemas',
    accent: 'críticos',
    filterAll: 'Ver toda la experiencia',
    filterDev: 'Desarrollador',
    filterSup: 'Soporte técnico',
    current: 'Actualidad',
    seeMore: 'ver más detalles',
    jobs: {
      'Soft P&L': {
        role: 'Full Stack Developer · Remoto',
        period: 'Ago 2024 — Hoy',
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
      'Bolsa de Comercio de Buenos Aires': {
        role: 'Técnico de División Informática · Presencial',
        period: 'Feb 2026 — Ago 2026',
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
      'Tarjeta Plata': {
        role: 'Sistemas Avanzados en Aplicaciones · Híbrido',
        period: 'Jul 2025 — Ene 2026',
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
      Accenture: {
        role: 'Soporte Técnico en Aplicaciones y Nube (L2) · Remoto',
        period: 'Oct 2023 — Mar 2025',
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
      'Proyectos Freelance': {
        role: 'Full Stack Developer',
        period: 'Oct 2022 — Jul 2023',
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
      'Equipo Tech': {
        role: 'Analista en Soporte Técnico · Presencial',
        period: 'Ene 2022 — Mar 2023',
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
    },
  },
  projects: {
    kicker: '04 Proyectos',
    title: 'Productos en',
    accent: 'producción',
    featuredBadge: 'Destacado',
    viewProject: 'Ver proyecto',
    more: 'Ver más proyectos',
    less: 'Ver menos',
    imageAlt: 'Captura de',
    openAria: 'Abrir {name} en una pestaña nueva',
    descriptions: {
      Kora: 'Plataforma construida en Next.js con arquitectura modular, componentes reutilizables y despliegue continuo.',
      'Advanced Consulting': 'Sitio corporativo con identidad propia y foco en conversión.',
      'Gitano Denim': 'Tienda de indumentaria con catálogo, checkout y panel de gestión.',
      'Soluz Instaladora': 'Landing con automatizaciones de leads para empresa de energía solar.',
      'Vach Laser':
        'App de grabado láser para eventos: personalización en 3 pasos desde el celular, cola de pedidos en vivo y consola admin con métricas, diseños y estación de operador.',
      GymHakkyo: 'Sitio de reservas de clases para gimnasio.',
      'Mundo PIPI': 'Tienda online: catálogo, medios de pago, envíos y automatizaciones operativas.',
      'Soft P&L': 'Web institucional con portfolio de automatizaciones y proyectos integrados.',
      'Benasu Stock': 'Gestor de stock liviano, sin frameworks, pensado para uso diario.',
    },
  },
  code: {
    kicker: '05 Código en acción',
    title: 'Cómo escribo el',
    accent: 'código',
    explorer: 'Explorador',
    lines: 'líneas',
    copy: 'Copiar',
    copied: 'Copiado ✓',
    snippets: {
      'next-ts': {
        title: 'Perfil como Server Component tipado',
        description:
          'Página de perfil en Next.js App Router: tipos estrictos, metadata propia y render del lado del servidor.',
      },
      'python-django': {
        title: 'Vista de perfil con Django',
        description:
          'Class-based view en Django que expone el perfil como JSON: atributos declarativos y respuesta tipada.',
      },
      'react-js': {
        title: 'Componente de perfil con hooks',
        description:
          'Componente funcional en React con estado local: interfaz limpia, accesible y lista para componer.',
      },
      sqlserver: {
        title: 'Modelo y consulta del perfil',
        description: 'DDL y consultas sobre SQL Server: tabla tipada, inserción y lectura ordenada del perfil.',
      },
      'node-js': {
        title: 'API de perfil con Express',
        description: 'Servidor Node.js con Express que publica el perfil como endpoint REST, listo para consumir.',
      },
      'dart-flutter': {
        title: 'Perfil como app Flutter',
        description:
          'App mínima en Flutter: widget declarativo con el perfil renderizado nativo en cualquier dispositivo.',
      },
    },
  },
  education: {
    kicker: '06 Formación y certificaciones',
    title: 'Aprender es parte del',
    accent: 'proceso',
    gradeLabel: 'promedio general',
    cards: {
      'Universidad CAECE': { title: 'Licenciatura en Sistemas' },
      'Bootcamp Soy Henry': {
        title: 'Full Stack intensivo',
        description: 'JavaScript, React, Node.js, Express, Sequelize y PostgreSQL.',
      },
      'Instituto Patrocinio de San José': {
        title: 'Secundario · Primario',
        description: 'Bachillerato con orientación en Ciencias Naturales.',
      },
    },
    certs: [
      'Salesforce',
      'JavaScript y TypeScript avanzado',
      'Git y GitHub para equipos',
      'Fundamentos de Linux, CLI y Windows',
      'Bases de datos SQL y MongoDB',
      'Soporte y mantenimiento de hardware corporativo',
    ],
  },
  contact: {
    kicker: '07 Contacto',
    giant: 'CONTACTO',
    title: 'Construyamos algo que',
    accent: 'valga la pena',
    blurb:
      'Disponible para posiciones full stack, proyectos de automatización e integraciones de IA. Respondo en el día.',
    mailCta: 'Escribime un mail',
    form: {
      nameLabel: 'Nombre completo',
      namePh: 'Ingresá tu nombre',
      emailLabel: 'Correo electrónico',
      emailPh: 'tu@email.com',
      typeLabel: 'Tipo de consulta',
      typePh: 'Seleccioná una opción',
      typeOptions: ['Propuesta laboral', 'Proyecto freelance', 'Automatización / IA', 'Otro'],
      msgLabel: 'Mensaje',
      msgPh: 'Contame en qué te puedo ayudar…',
      send: 'Enviar mensaje',
      sending: 'Enviando…',
      success: '¡Mensaje enviado! Te respondo en el día.',
      error: 'No se pudo enviar. Escribime directo a mi email.',
      reqName: 'Poné tu nombre',
      reqEmail: 'Poné tu email',
      badEmail: 'Ese email no parece válido',
      reqMsg: 'Contame algo en el mensaje',
    },
    emailLabel: 'Email',
    phoneLabel: 'Teléfono',
    locationLabel: 'Ubicación',
    locationValue: 'Belgrano, CABA · Híbrido o remoto',
  },
  footer: {
    roleLine: 'Lucas González Righi — Full Stack Developer',
    note: '© 2026 · Diseñado y desarrollado por Lucas González Righi.',
    backTop: 'Volver arriba',
  },
};
