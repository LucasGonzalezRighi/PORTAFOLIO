/**
 * Fondo ambiental fijo: grilla técnica, auroras, columnas de código
 * en deriva y textura de ruido. Todo decorativo (aria-hidden).
 */
const NOISE_URL =
  "url('data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22140%22 height=%22140%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22/%3E%3C/filter%3E%3Crect width=%22140%22 height=%22140%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')";

const codeLeft = `export interface Project {
  id: string;
  stack: string[];
  status: 'live' | 'wip';
}

export async function getProjects() {
  const res = await fetch(API_URL, {
    next: { revalidate: 3600 },
  });
  return res.json() as Promise<Project[]>;
}

const useGlow = (ref: RefObject) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--glow', '1');
  }, [ref]);
};

export const revalidate = 60;
import { cache } from 'react';
`;

const codeRight = `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lucas González Righi',
};

export default async function Page() {
  const data = await getProjects();
  return <Grid items={data} />;
}

async function runWorkflow(job: Job) {
  const queue = await redis.lpop(job.key);
  return queue ?? null;
}

docker compose up -d --build
`;

const preStyle = {
  margin: 0,
  fontFamily: 'var(--font-mono)',
  fontSize: '12px',
  lineHeight: 1.9,
  color: '#8FD4FF',
  whiteSpace: 'pre',
  letterSpacing: '.02em',
} as const;

export function Background() {
  return (
    <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 'var(--z-bg)' as never, pointerEvents: 'none', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: '-64px 0',
          backgroundImage:
            'linear-gradient(rgba(78,159,212,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(78,159,212,.04) 1px,transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 100% 80% at 50% 40%,#000,transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 80% at 50% 40%,#000,transparent 85%)',
          animation: 'gridpan 14s linear infinite',
        }}
      />
      <div style={{ position: 'absolute', top: '-20%', left: '-15%', width: '70vw', height: '70vw', borderRadius: '50%', background: 'radial-gradient(circle,rgba(29,95,168,.12),transparent 62%)', filter: 'blur(90px)', animation: 'aurora 26s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '-25%', right: '-15%', width: '65vw', height: '65vw', borderRadius: '50%', background: 'radial-gradient(circle,rgba(33,224,127,.09),transparent 62%)', filter: 'blur(100px)', animation: 'aurora 34s 3s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', top: '30%', right: '10%', width: '36vw', height: '36vw', borderRadius: '50%', background: 'radial-gradient(circle,rgba(79,217,143,.05),transparent 65%)', filter: 'blur(90px)', animation: 'aurora 41s 6s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', top: 0, left: '2%', width: 'min(30vw,420px)', height: '200%', opacity: 0.055, animation: 'drift 70s linear infinite' }}>
        <pre style={preStyle}>{codeLeft}</pre>
      </div>
      <div style={{ position: 'absolute', top: 0, right: '2%', width: 'min(28vw,400px)', height: '200%', opacity: 0.045, textAlign: 'right', animation: 'drift 92s 4s linear infinite' }}>
        <pre style={preStyle}>{codeRight}</pre>
      </div>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05, mixBlendMode: 'overlay', backgroundImage: NOISE_URL }} />
    </div>
  );
}
