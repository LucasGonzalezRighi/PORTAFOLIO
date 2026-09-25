import type { Dict } from './types';

/** Português */
export const pt: Dict = {
  nav: {
    links: [
      { id: 'sobre', label: 'Sobre mim' },
      { id: 'stack', label: 'Stack' },
      { id: 'experiencia', label: 'Experiência' },
      { id: 'proyectos', label: 'Projetos' },
      { id: 'codigo', label: 'Código' },
      { id: 'certificaciones', label: 'Certificações' },
    ],
    availability: 'Disponível para trabalhar',
    contact: 'Contato',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
  },
  hero: {
    badges: ['Desenvolvimento web', 'Automação', 'Suporte técnico', 'Infraestrutura'],
    greeting: 'Olá, eu sou',
    tagline:
      'Full Stack Developer e especialista em infraestrutura. Construo plataformas web modulares, automatizo o que se repete e integro IA em processos de negócio reais.',
    statLabels: ['Anos em produção', 'Projetos entregues', 'Média em Sistemas'],
    cv: 'Meu CV',
    viewProjects: 'Veja meu trabalho',
    scroll: 'scroll',
    ageLabel: 'idade',
  },
  about: {
    kicker: '01 Sobre mim',
    title: 'Código que compile e que também',
    accent: 'inspire',
    paragraphs: [
      "Sou programador e adoro inventar. Começo com uma ideia, penso, desmonto e monto de novo até ela virar um produto que clientes reais usam todos os dias. Inovar é a parte que eu mais curto.",
      "Também sou técnico em sistemas: manutenção e suporte de soft e hard, do PC que não liga ao sistema que caiu. Trabalho em equipe, sou proativo e vivo aprendendo. A IA é minha colega de carteira: rápida, brilhante e convencida de coisas que não existem.",
    ],
    langsLabel: 'Idiomas em que trabalho',
    languages: [
      { label: 'Español', level: 'nativo' },
      { label: 'Português', level: 'nativo' },
      { label: 'English', level: 'B1' },
    ],
    services: [
      {
        title: 'Desenvolvimento full stack',
        description:
          'Plataformas modulares com Next.js, Nest.js, Express e MongoDB. Arquitetura escalável, orientada à manutenção e com Redis para sessões e cache.',
      },
      {
        title: 'Automação & IA',
        description:
          'Fluxos com n8n e Make integrando APIs, bancos de dados e serviços externos. Integração de APIs de IA para assistentes, conteúdo e otimização de processos.',
      },
      {
        title: 'Infraestrutura & suporte',
        description:
          'CI/CD, Docker, Linux e cloud. Suporte N1/N2/L2 em aplicações críticas com SLA, diagnóstico de incidentes e análise de dados produtivos com SQL e Power BI.',
      },
    ],
  },
  stack: {
    kicker: '02 Stack tecnológico',
    title: 'As ferramentas com as que eu',
    accent: 'construo',
    categories: [
      'Linguagens e Frameworks',
      'Automação e IA',
      'Bancos de dados',
      'DevOps e Infraestrutura',
      'Operação e Dados',
      'Metodologias',
    ],
  },
  experience: {
    kicker: '03 Experiência',
    folderLabel: 'Minha Xp',
    title: 'Produtos, operação e sistemas',
    accent: 'críticos',
    filterAll: 'Ver toda a experiência',
    filterDev: 'Desenvolvedor',
    filterSup: 'Suporte técnico',
    current: 'Atualmente',
    seeMore: 'ver mais detalhes',
    jobs: {
      'Soft P&L': {
        role: 'Full Stack Developer · Remoto',
        period: 'Ago 2024 — Hoje',
        bullets: [
          'Plataformas web modulares com MongoDB, Express, Nest.js, Next.js e Tailwind; arquitetura escalável e orientada à manutenção.',
          'Redis para sessões, cache e desempenho em apps de alta concorrência; pipelines CI/CD automatizados.',
          'Fluxos de automação com n8n e Make, integrações de IA e soluções Salesforce Quote-to-Cash.',
        ],
        detailTitle: 'Soft P&L · em detalhe',
        details: [
          { label: 'Stack', value: 'Next.js · Nest.js · Express · MongoDB · Redis · TypeScript · Tailwind CSS' },
          { label: 'Ferramentas', value: 'n8n · Make · Salesforce · Docker · Git & GitHub · APIs de IA' },
          { label: 'Responsabilidades', value: 'Design de arquitetura modular, desenvolvimento end-to-end, code review e deploys.' },
          { label: 'Conquistas', value: 'Pipelines CI/CD automatizados e cache com Redis em apps de alta concorrência.' },
          { label: 'Projetos', value: 'Kora · Soft P&L · Soluz Instaladora' },
          { label: 'Arquitetura', value: 'Módulos desacoplados, API REST com camada de serviços e sessões em Redis.' },
        ],
      },
      'Bolsa de Comercio de Buenos Aires': {
        role: 'Técnico da Divisão de Informática · Presencial',
        period: 'Fev 2026 — Ago 2026',
        bullets: [
          'Suporte N1/N2 presencial e remoto a usuários internos, com registro e acompanhamento de incidentes.',
          'Diagnóstico de hardware, troca de componentes e configuração de máquinas Windows e periféricos.',
          'Conectividade LAN/Wi-Fi, endereçamento IP, DNS e levantamento de inventário de equipamentos.',
        ],
        detailTitle: 'Bolsa de Comercio · em detalhe',
        details: [
          { label: 'Tecnologias', value: 'Windows 10/11 · Active Directory · redes LAN/Wi-Fi · DNS · DHCP' },
          { label: 'Ferramentas', value: 'Help desk interno · inventário de ativos · Office 365' },
          { label: 'Responsabilidades', value: 'Suporte N1/N2 presencial e remoto, com registro e acompanhamento de cada incidente.' },
          { label: 'Conquistas', value: 'Inventário de equipamentos levantado e estações de trabalho padronizadas.' },
          { label: 'Infraestrutura', value: 'Diagnóstico de hardware, troca de componentes e configuração de periféricos.' },
        ],
      },
      'Tarjeta Plata': {
        role: 'Sistemas Avançados em Aplicações · Híbrido',
        period: 'Jul 2025 — Jan 2026',
        bullets: [
          'Suporte funcional e técnico avançado de aplicações críticas do negócio de crédito (Loan, Collection), em esquemas real time.',
          'Gestão de incidentes de alta prioridade por impacto operacional, SLA e continuidade do serviço, com acompanhamento no Jira.',
          'Extração e validação de dados com SQL, dashboards no Power BI e desenvolvimento de um sistema de gestão de faturas.',
        ],
        detailTitle: 'Tarjeta Plata · em detalhe',
        details: [
          { label: 'Tecnologias', value: 'SQL Server · consultas e validação de dados produtivos · Power BI' },
          { label: 'Ferramentas', value: 'Jira · aplicações Loan e Collection · monitoramento real time' },
          { label: 'Responsabilidades', value: 'Suporte funcional e técnico avançado do negócio de crédito, com SLA e continuidade do serviço.' },
          { label: 'Conquistas', value: 'Sistema próprio de gestão de faturas e dashboards de acompanhamento operacional.' },
          { label: 'Impacto', value: 'Gestão de incidentes de alta prioridade sobre sistemas críticos do negócio.' },
        ],
      },
      Accenture: {
        role: 'Suporte Técnico em Aplicações e Nuvem (L2) · Remoto',
        period: 'Out 2023 — Mar 2025',
        bullets: [
          'Suporte L2 de aplicações corporativas e plataformas cloud, garantindo continuidade e alta disponibilidade.',
          'Gestão de incidentes no ServiceNow com priorização por impacto e urgência (SLA).',
          'Comunicação 100% em português com usuários e times internos do Brasil, com documentação clara de incidentes.',
        ],
        detailTitle: 'Accenture · em detalhe',
        details: [
          { label: 'Tecnologias', value: 'Aplicações corporativas · plataformas cloud · monitoramento de disponibilidade' },
          { label: 'Ferramentas', value: 'ServiceNow · bases de conhecimento · runbooks de incidentes' },
          { label: 'Responsabilidades', value: 'Suporte L2, priorização por impacto e urgência, escalonamento a times de desenvolvimento.' },
          { label: 'Conquistas', value: 'Continuidade e alta disponibilidade sustentadas dentro do SLA por 18 meses.' },
          { label: 'Idioma', value: 'Operação 100% em português com usuários e times internos do Brasil.' },
        ],
      },
      'Proyectos Freelance': {
        role: 'Full Stack Developer',
        period: 'Out 2022 — Jul 2023',
        bullets: [
          'Aplicações web full stack sob medida e APIs RESTful com Node.js e Express, com foco em segurança e validação de dados.',
          'Chatbots em Python e interfaces React com componentes reutilizáveis e gerenciamento de estado.',
          'Personalização de Salesforce com Apex junto a stakeholders internos e externos.',
        ],
        detailTitle: 'Freelance · em detalhe',
        details: [
          { label: 'Stack', value: 'Node.js · Express · React · Python · Apex · PostgreSQL' },
          { label: 'Ferramentas', value: 'Salesforce · Git & GitHub · Postman · Figma' },
          { label: 'Responsabilidades', value: 'Levantamento com clientes, desenvolvimento end-to-end e entrega de cada projeto.' },
          { label: 'Conquistas', value: 'APIs RESTful com foco em segurança e validação, e chatbots em produção.' },
          { label: 'Arquitetura', value: 'Componentes React reutilizáveis, gerenciamento de estado e camada de serviços em Node.' },
        ],
      },
      'Equipo Tech': {
        role: 'Analista de Suporte Técnico · Presencial',
        period: 'Jan 2022 — Mar 2023',
        bullets: [
          'Atendimento de incidentes de hardware, software e aplicações priorizando o impacto na operação diária.',
          'Instalação e configuração de equipamentos, migração de dados e tarefas de rede e cabeamento.',
        ],
        detailTitle: 'Equipo Tech · em detalhe',
        details: [
          { label: 'Tecnologias', value: 'Windows · hardware corporativo · redes e cabeamento estruturado' },
          { label: 'Responsabilidades', value: 'Atendimento de incidentes priorizando o impacto na operação diária.' },
          { label: 'Conquistas', value: 'Migrações de dados sem perda de informação nem interrupção do serviço.' },
        ],
      },
    },
  },
  projects: {
    kicker: '04 Projetos',
    title: 'Produtos em',
    accent: 'produção',
    featuredBadge: 'Destaque',
    viewProject: 'Ver projeto',
    more: 'Ver mais projetos',
    less: 'Ver menos',
    imageAlt: 'Captura de',
    openAria: 'Abrir {name} em uma nova aba',
    descriptions: {
      Kora: 'Plataforma construída em Next.js com arquitetura modular, componentes reutilizáveis e deploy contínuo.',
      'Advanced Consulting': 'Site corporativo com identidade própria e foco em conversão.',
      'Gitano Denim': 'Loja de vestuário com catálogo, checkout e painel de gestão.',
      'Soluz Instaladora': 'Landing com automações de leads para empresa de energia solar.',
      'Vach Laser':
        'App de gravação a laser para eventos: personalização em 3 passos pelo celular, fila de pedidos ao vivo e console admin com métricas, designs e estação de operador.',
      GymHakkyo: 'Site de reservas de aulas para academia.',
      'Mundo PIPI': 'Loja online: catálogo, meios de pagamento, envios e automações operacionais.',
      'Soft P&L': 'Site institucional com portfólio de automações e projetos integrados.',
      'Benasu Stock': 'Gestor de estoque leve, sem frameworks, pensado para o uso diário.',
    },
  },
  code: {
    kicker: '05 Código em ação',
    title: 'Como escrevo o',
    accent: 'código',
    explorer: 'Explorador',
    lines: 'linhas',
    copy: 'Copiar',
    copied: 'Copiado ✓',
    snippets: {
      'next-ts': {
        title: 'Perfil como Server Component tipado',
        description:
          'Página de perfil no Next.js App Router: tipos estritos, metadata própria e render do lado do servidor.',
      },
      'python-django': {
        title: 'View de perfil com Django',
        description:
          'Class-based view no Django que expõe o perfil como JSON: atributos declarativos e resposta tipada.',
      },
      'react-js': {
        title: 'Componente de perfil com hooks',
        description: 'Componente funcional em React com estado local: interface limpa, acessível e pronta para compor.',
      },
      sqlserver: {
        title: 'Modelo e consulta do perfil',
        description: 'DDL e consultas no SQL Server: tabela tipada, inserção e leitura ordenada do perfil.',
      },
      'node-js': {
        title: 'API de perfil com Express',
        description: 'Servidor Node.js com Express que publica o perfil como endpoint REST, pronto para consumir.',
      },
      'dart-flutter': {
        title: 'Perfil como app Flutter',
        description: 'App mínimo em Flutter: widget declarativo com o perfil renderizado nativo em qualquer dispositivo.',
      },
    },
  },
  education: {
    kicker: '06 Formação e certificações',
    title: 'Aprender faz parte do',
    accent: 'processo',
    gradeLabel: 'média geral',
    cards: {
      'Universidad CAECE': { title: 'Bacharelado em Sistemas' },
      'Bootcamp Soy Henry': {
        title: 'Full Stack intensivo',
        description: 'JavaScript, React, Node.js, Express, Sequelize e PostgreSQL.',
      },
      'Instituto Patrocinio de San José': {
        title: 'Ensino médio · Fundamental',
        description: 'Orientação em Ciências Naturais.',
      },
    },
    certs: [
      'Salesforce',
      'JavaScript e TypeScript avançado',
      'Git e GitHub para equipes',
      'Fundamentos de Linux, CLI e Windows',
      'Bancos de dados SQL e MongoDB',
      'Suporte e manutenção de hardware corporativo',
    ],
  },
  contact: {
    kicker: '07 Contato',
    giant: 'CONTATO',
    title: 'Vamos construir algo que',
    accent: 'valha a pena',
    blurb: 'Disponível para posições full stack, projetos de automação e integrações de IA. Respondo no mesmo dia.',
    mailCta: 'Me mande um e-mail',
    form: {
      nameLabel: 'Nome completo',
      namePh: 'Digite seu nome',
      emailLabel: 'E-mail',
      emailPh: 'voce@email.com',
      typeLabel: 'Tipo de consulta',
      typePh: 'Selecione uma opção',
      typeOptions: ['Proposta de trabalho', 'Projeto freelance', 'Automação / IA', 'Outro'],
      msgLabel: 'Mensagem',
      msgPh: 'Me conte como posso ajudar…',
      send: 'Enviar mensagem',
      sending: 'Enviando…',
      success: 'Mensagem enviada! Respondo no mesmo dia.',
      error: 'Não foi possível enviar. Me escreva direto no e-mail.',
      reqName: 'Digite seu nome',
      reqEmail: 'Digite seu e-mail',
      badEmail: 'Esse e-mail não parece válido',
      reqMsg: 'Escreva uma mensagem',
    },
    emailLabel: 'E-mail',
    phoneLabel: 'Telefone',
    locationLabel: 'Localização',
    locationValue: 'Belgrano, Buenos Aires · Híbrido ou remoto',
  },
  footer: {
    roleLine: 'Lucas González Righi — Full Stack Developer',
    note: '© 2026 · Desenhado e desenvolvido por Lucas González Righi.',
    backTop: 'Voltar ao topo',
  },
};
