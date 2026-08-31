/**
 * Declaraciones de módulos de assets (equivalente a `vite/client`,
 * pero autocontenido para que el type-check funcione sin depender
 * de node_modules de Vite).
 */
interface ImportMetaEnv {
  /** Base pública del deploy ('/', '/PORTAFOLIO/', …) */
  readonly BASE_URL: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.css';
declare module '*.svg' {
  const src: string;
  export default src;
}
declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.webp' {
  const src: string;
  export default src;
}
