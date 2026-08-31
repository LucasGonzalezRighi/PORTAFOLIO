/**
 * Stack tecnológico: cards con flip por categoría + marquee.
 * Los íconos viven en /public/images/stack.
 */
export type StackTone = 'blue' | 'green' | 'lime' | 'blue500';

export interface StackBadge {
  /** Texto del badge cuadrado (cuando no hay ícono) */
  text: string;
  fontSize?: string;
}

export interface StackItem {
  label: string;
  icon?: string; // nombre de archivo en /images/stack (sin .svg)
  badge?: StackBadge;
}

export interface StackCategory {
  title: string;
  tone: StackTone;
  /** Íconos/badges grandes del frente de la card */
  headerIcons: StackItem[];
  items: StackItem[];
  revealDelay: number;
}

export const stackCategories: StackCategory[] = [
  {
    title: 'Lenguajes y Frameworks',
    tone: 'blue',
    revealDelay: 0,
    headerIcons: [{ label: '', icon: 'typescript' }, { label: '', icon: 'react' }, { label: '', icon: 'nestjs' }],
    items: [
      { label: 'TypeScript', icon: 'typescript' },
      { label: 'JavaScript', icon: 'javascript' },
      { label: 'Python', icon: 'python' },
      { label: 'Node.js', icon: 'nodejs' },
      { label: 'Nest.js', icon: 'nestjs' },
      { label: 'Express.js', icon: 'expressjs' },
      { label: 'React.js', icon: 'react' },
      { label: 'Next.js', icon: 'nextjs' },
      { label: 'Tailwind CSS', icon: 'tailwind' },
      { label: 'Framer', icon: 'framer' },
    ],
  },
  {
    title: 'Automatización e IA',
    tone: 'green',
    revealDelay: 80,
    headerIcons: [
      { label: '', icon: 'n8n' },
      { label: '', badge: { text: 'IA' } },
      { label: '', badge: { text: 'SF' } },
    ],
    items: [
      { label: 'n8n', icon: 'n8n' },
      { label: 'Make', icon: 'make' },
      { label: 'APIs de IA', badge: { text: 'IA' } },
      { label: 'Salesforce · Apex', badge: { text: 'SF' } },
      { label: 'Chatbots Python', icon: 'chatbots-python' },
      { label: 'Webhooks & REST', icon: 'webhooks-rest' },
    ],
  },
  {
    title: 'Bases de datos',
    tone: 'blue500',
    revealDelay: 160,
    headerIcons: [{ label: '', icon: 'db-header-1' }, { label: '', icon: 'db-header-2' }, { label: '', icon: 'db-header-3' }],
    items: [
      { label: 'MongoDB', icon: 'mongodb' },
      { label: 'PostgreSQL', icon: 'postgresql' },
      { label: 'SQL Server', badge: { text: 'SQL', fontSize: '6.5px' } },
      { label: 'MySQL', icon: 'mysql' },
      { label: 'Redis', icon: 'redis' },
    ],
  },
  {
    title: 'DevOps e Infraestructura',
    tone: 'lime',
    revealDelay: 240,
    headerIcons: [{ label: '', icon: 'docker' }, { label: '', icon: 'git-github' }, { label: '', icon: 'linux-cli' }],
    items: [
      { label: 'Docker', icon: 'docker' },
      { label: 'CI/CD', icon: 'cicd' },
      { label: 'Git & GitHub', icon: 'git-github' },
      { label: 'Linux · CLI', icon: 'linux-cli' },
      { label: 'AWS / GCP', icon: 'aws-gcp' },
      { label: 'Windows Server', badge: { text: 'WS' } },
    ],
  },
  {
    title: 'Operación y Datos',
    tone: 'blue',
    revealDelay: 320,
    headerIcons: [
      { label: '', icon: 'jira' },
      { label: '', badge: { text: 'SN' } },
      { label: '', badge: { text: 'BI' } },
    ],
    items: [
      { label: 'Jira', icon: 'jira' },
      { label: 'ServiceNow', badge: { text: 'SN' } },
      { label: 'Power BI', badge: { text: 'BI' } },
      { label: 'Office 365', badge: { text: '365', fontSize: '6.5px' } },
    ],
  },
  {
    title: 'Metodologías',
    tone: 'green',
    revealDelay: 400,
    headerIcons: [{ label: '', icon: 'scrum' }, { label: '', icon: 'code-review' }, { label: '', icon: 'sla-oncall' }],
    items: [
      { label: 'Scrum', icon: 'scrum' },
      { label: 'Kanban', icon: 'kanban' },
      { label: 'Code review', icon: 'code-review' },
      { label: 'SLA & on-call', icon: 'sla-oncall' },
    ],
  },
];

/** Cinta de tecnologías (marquee) — colores de identidad desde tokens `--tech-*` */
export const marquee: { label: string; color?: string }[] = [
  { label: 'TypeScript', color: 'var(--tech-typescript)' },
  { label: 'Next.js', color: 'var(--tech-nextjs)' },
  { label: 'Nest.js', color: 'var(--tech-nestjs)' },
  { label: 'MongoDB', color: 'var(--tech-mongodb)' },
  { label: 'n8n', color: 'var(--tech-n8n)' },
  { label: 'Redis', color: 'var(--tech-redis)' },
  { label: 'Docker', color: 'var(--tech-docker)' },
  { label: 'Python', color: 'var(--tech-python)' },
  { label: 'Salesforce', color: 'var(--tech-salesforce)' },
  { label: 'PostgreSQL' },
  { label: 'CI/CD' },
  { label: 'Linux' },
];
