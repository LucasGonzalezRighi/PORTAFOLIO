import type { Dict } from './types';

/** English */
export const en: Dict = {
  nav: {
    links: [
      { id: 'sobre', label: 'About me' },
      { id: 'stack', label: 'Stack' },
      { id: 'experiencia', label: 'Experience' },
      { id: 'proyectos', label: 'Projects' },
      { id: 'codigo', label: 'Code' },
      { id: 'certificaciones', label: 'Certifications' },
    ],
    availability: 'Available for work',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  hero: {
    badges: ['Web development', 'Automation', 'Technical support', 'Infrastructure'],
    greeting: "Hi, I'm",
    tagline:
      'Full Stack Developer and infrastructure specialist. I build modular web platforms, automate repetitive work and integrate AI into real business processes.',
    statLabels: ['Years in production', 'Projects delivered', 'Systems GPA'],
    cv: 'My resume',
    viewProjects: 'See my work',
    scroll: 'scroll',
    ageLabel: 'age',
  },
  about: {
    kicker: '01 About me',
    title: 'Code that compiles and also',
    accent: 'inspires',
    paragraphs: [
      "I'm a developer and I love inventing things. I start with an idea, think it through, break it and rebuild it until it becomes a product that real clients use every day. Innovating is the part I enjoy the most.",
      "I'm also a systems technician: hardware and software support, from the PC that won't boot to the system that just went down. I work well in a team, I'm proactive and always learning. AI is my desk buddy: fast, brilliant and convinced of things that don't exist.",
    ],
    langsLabel: 'Languages I work in',
    languages: [
      { label: 'Español', level: 'native' },
      { label: 'Português', level: 'native' },
      { label: 'English', level: 'B1' },
    ],
    services: [
      {
        title: 'Full stack development',
        description:
          'Modular platforms with Next.js, Nest.js, Express and MongoDB. Scalable, maintenance-oriented architecture with Redis for sessions and caching.',
      },
      {
        title: 'Automation & AI',
        description:
          'Workflows with n8n and Make integrating APIs, databases and external services. AI API integrations for assistants, content and process optimization.',
      },
      {
        title: 'Infrastructure & support',
        description:
          'CI/CD, Docker, Linux and cloud. N1/N2/L2 support for mission-critical applications under SLA, incident diagnosis and production data analysis with SQL and Power BI.',
      },
    ],
  },
  stack: {
    kicker: '02 Tech stack',
    title: 'The tools I',
    accent: 'build with',
    categories: [
      'Languages & Frameworks',
      'Automation & AI',
      'Databases',
      'DevOps & Infrastructure',
      'Operations & Data',
      'Methodologies',
    ],
  },
  experience: {
    kicker: '03 Experience',
    folderLabel: 'My Xp',
    title: 'Products, operations and',
    accent: 'critical systems',
    filterAll: 'View all experience',
    filterDev: 'Developer',
    filterSup: 'Tech support',
    current: 'Current',
    seeMore: 'see more details',
    jobs: {
      'Soft P&L': {
        role: 'Full Stack Developer · Remote',
        period: 'Aug 2024 — Today',
        bullets: [
          'Modular web platforms with MongoDB, Express, Nest.js, Next.js and Tailwind; scalable, maintenance-oriented architecture.',
          'Redis for sessions, caching and performance in high-concurrency apps; automated CI/CD pipelines.',
          'Automation flows with n8n and Make, AI integrations and Salesforce Quote-to-Cash solutions.',
        ],
        detailTitle: 'Soft P&L · in detail',
        details: [
          { label: 'Stack', value: 'Next.js · Nest.js · Express · MongoDB · Redis · TypeScript · Tailwind CSS' },
          { label: 'Tools', value: 'n8n · Make · Salesforce · Docker · Git & GitHub · AI APIs' },
          { label: 'Responsibilities', value: 'Modular architecture design, end-to-end development, code review and deployments.' },
          { label: 'Achievements', value: 'Automated CI/CD pipelines and Redis caching in high-concurrency apps.' },
          { label: 'Projects', value: 'Kora · Soft P&L · Soluz Instaladora' },
          { label: 'Architecture', value: 'Decoupled modules, REST API with a service layer and Redis-backed sessions.' },
        ],
      },
      'Bolsa de Comercio de Buenos Aires': {
        role: 'IT Division Technician · On-site',
        period: 'Feb 2026 — Aug 2026',
        bullets: [
          'On-site and remote N1/N2 support for internal users, logging and tracking every incident.',
          'Hardware diagnosis, component replacement and configuration of Windows machines and peripherals.',
          'LAN/Wi-Fi connectivity, IP addressing, DNS and hardware inventory surveys.',
        ],
        detailTitle: 'Bolsa de Comercio · in detail',
        details: [
          { label: 'Technologies', value: 'Windows 10/11 · Active Directory · LAN/Wi-Fi networks · DNS · DHCP' },
          { label: 'Tools', value: 'Internal help desk · asset inventory · Office 365' },
          { label: 'Responsibilities', value: 'On-site and remote N1/N2 support, logging and following up on every incident.' },
          { label: 'Achievements', value: 'Full hardware inventory survey and standardized workstations.' },
          { label: 'Infrastructure', value: 'Hardware diagnosis, component replacement and peripheral configuration.' },
        ],
      },
      'Tarjeta Plata': {
        role: 'Advanced Application Systems · Hybrid',
        period: 'Jul 2025 — Jan 2026',
        bullets: [
          'Advanced functional and technical support for mission-critical lending applications (Loan, Collection) in real-time schemes.',
          'High-priority incident management driven by operational impact, SLA and service continuity, tracked in Jira.',
          'Data extraction and validation with SQL, Power BI dashboards and development of an invoice management system.',
        ],
        detailTitle: 'Tarjeta Plata · in detail',
        details: [
          { label: 'Technologies', value: 'SQL Server · production data queries and validation · Power BI' },
          { label: 'Tools', value: 'Jira · Loan and Collection applications · real-time monitoring' },
          { label: 'Responsibilities', value: 'Advanced functional and technical support for the lending business, under SLA and service continuity.' },
          { label: 'Achievements', value: 'In-house invoice management system and operational tracking dashboards.' },
          { label: 'Impact', value: 'High-priority incident management over business-critical systems.' },
        ],
      },
      Accenture: {
        role: 'Application & Cloud Support (L2) · Remote',
        period: 'Oct 2023 — Mar 2025',
        bullets: [
          'L2 support for enterprise applications and cloud platforms, ensuring continuity and high availability.',
          'Incident management in ServiceNow with impact- and urgency-based prioritization (SLA).',
          '100% Portuguese communication with users and internal teams in Brazil, with clear incident documentation.',
        ],
        detailTitle: 'Accenture · in detail',
        details: [
          { label: 'Technologies', value: 'Enterprise applications · cloud platforms · availability monitoring' },
          { label: 'Tools', value: 'ServiceNow · knowledge bases · incident runbooks' },
          { label: 'Responsibilities', value: 'L2 support, impact/urgency prioritization, escalation to development teams.' },
          { label: 'Achievements', value: 'Continuity and high availability sustained within SLA for 18 months.' },
          { label: 'Language', value: '100% Portuguese operation with users and internal teams in Brazil.' },
        ],
      },
      'Proyectos Freelance': {
        role: 'Full Stack Developer',
        period: 'Oct 2022 — Jul 2023',
        bullets: [
          'Custom full stack web applications and RESTful APIs with Node.js and Express, focused on security and data validation.',
          'Python chatbots and React interfaces with reusable components and state management.',
          'Salesforce customization with Apex alongside internal and external stakeholders.',
        ],
        detailTitle: 'Freelance · in detail',
        details: [
          { label: 'Stack', value: 'Node.js · Express · React · Python · Apex · PostgreSQL' },
          { label: 'Tools', value: 'Salesforce · Git & GitHub · Postman · Figma' },
          { label: 'Responsibilities', value: 'Client discovery, end-to-end development and delivery of every project.' },
          { label: 'Achievements', value: 'RESTful APIs focused on security and validation, and chatbots in production.' },
          { label: 'Architecture', value: 'Reusable React components, state management and a Node service layer.' },
        ],
      },
      'Equipo Tech': {
        role: 'Technical Support Analyst · On-site',
        period: 'Jan 2022 — Mar 2023',
        bullets: [
          'Hardware, software and application incident handling, prioritizing impact on daily operations.',
          'Equipment installation and configuration, data migration and network/cabling work.',
        ],
        detailTitle: 'Equipo Tech · in detail',
        details: [
          { label: 'Technologies', value: 'Windows · corporate hardware · networks and structured cabling' },
          { label: 'Responsibilities', value: 'Incident handling prioritizing impact on daily operations.' },
          { label: 'Achievements', value: 'Data migrations with zero data loss and no service downtime.' },
        ],
      },
    },
  },
  projects: {
    kicker: '04 Projects',
    title: 'Products in',
    accent: 'production',
    featuredBadge: 'Featured',
    viewProject: 'View project',
    more: 'View more projects',
    less: 'View less',
    imageAlt: 'Screenshot of',
    openAria: 'Open {name} in a new tab',
    descriptions: {
      Kora: 'Platform built with Next.js: modular architecture, reusable components and continuous deployment.',
      'Advanced Consulting': 'Corporate site with its own identity and a focus on conversion.',
      'Gitano Denim': 'Clothing store with catalog, checkout and management panel.',
      'Soluz Instaladora': 'Landing page with lead automations for a solar energy company.',
      'Vach Laser':
        'Laser engraving app for events: 3-step personalization from the phone, live order queue and an admin console with metrics, designs and an operator station.',
      GymHakkyo: 'Class booking site for a gym.',
      'Mundo PIPI': 'Online store: catalog, payment methods, shipping and operational automations.',
      'Soft P&L': 'Corporate site with a portfolio of automations and integrated projects.',
      'Benasu Stock': 'Lightweight stock manager, framework-free, built for daily use.',
    },
  },
  code: {
    kicker: '05 Code in action',
    title: 'How I write',
    accent: 'code',
    explorer: 'Explorer',
    lines: 'lines',
    copy: 'Copy',
    copied: 'Copied ✓',
    snippets: {
      'next-ts': {
        title: 'Profile as a typed Server Component',
        description:
          'Profile page in the Next.js App Router: strict types, custom metadata and server-side rendering.',
      },
      'python-django': {
        title: 'Profile view with Django',
        description:
          'Class-based Django view exposing the profile as JSON: declarative attributes and a typed response.',
      },
      'react-js': {
        title: 'Profile component with hooks',
        description: 'Functional React component with local state: a clean, accessible, composable interface.',
      },
      sqlserver: {
        title: 'Profile model and query',
        description: 'DDL and queries on SQL Server: typed table, inserts and ordered reads of the profile.',
      },
      'node-js': {
        title: 'Profile API with Express',
        description: 'Node.js server with Express publishing the profile as a REST endpoint, ready to consume.',
      },
      'dart-flutter': {
        title: 'Profile as a Flutter app',
        description: 'Minimal Flutter app: a declarative widget rendering the profile natively on any device.',
      },
    },
  },
  education: {
    kicker: '06 Education & certifications',
    title: 'Learning is part of the',
    accent: 'process',
    gradeLabel: 'overall GPA',
    cards: {
      'Universidad CAECE': { title: "Bachelor's Degree in Systems" },
      'Bootcamp Soy Henry': {
        title: 'Intensive Full Stack',
        description: 'JavaScript, React, Node.js, Express, Sequelize and PostgreSQL.',
      },
      'Instituto Patrocinio de San José': {
        title: 'High school · Primary',
        description: 'Natural Sciences orientation.',
      },
    },
    certs: [
      'Salesforce',
      'Advanced JavaScript & TypeScript',
      'Git & GitHub for teams',
      'Linux, CLI & Windows fundamentals',
      'SQL & MongoDB databases',
      'Corporate hardware support & maintenance',
    ],
  },
  contact: {
    kicker: '07 Contact',
    giant: 'CONTACT',
    title: "Let's build something",
    accent: 'worthwhile',
    blurb: 'Available for full stack positions, automation projects and AI integrations. I reply within the day.',
    mailCta: 'Send me an email',
    form: {
      nameLabel: 'Full name',
      namePh: 'Enter your name',
      emailLabel: 'Email',
      emailPh: 'you@email.com',
      typeLabel: 'Inquiry type',
      typePh: 'Select an option',
      typeOptions: ['Job opportunity', 'Freelance project', 'Automation / AI', 'Other'],
      msgLabel: 'Message',
      msgPh: 'Tell me how I can help…',
      send: 'Send message',
      sending: 'Sending…',
      success: 'Message sent! I reply within the day.',
      error: "Couldn't send. Email me directly instead.",
      reqName: 'Please enter your name',
      reqEmail: 'Please enter your email',
      badEmail: "That email doesn't look valid",
      reqMsg: 'Please write a message',
    },
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    locationLabel: 'Location',
    locationValue: 'Belgrano, Buenos Aires · Hybrid or remote',
  },
  footer: {
    roleLine: 'Lucas González Righi — Full Stack Developer',
    note: '© 2026 · Designed and developed by Lucas González Righi.',
    backTop: 'Back to top',
  },
};
