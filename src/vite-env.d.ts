/**
 * Declaraciones de módulos de assets (equivalente a `vite/client`,
 * pero autocontenido para que el type-check funcione sin depender
 * de node_modules de Vite).
 */
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
