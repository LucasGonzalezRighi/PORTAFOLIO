/**
 * Resuelve rutas de assets de /public respetando la base del deploy.
 * En Vercel/local la base es '/', en GitHub Pages es '/PORTAFOLIO/'.
 * Usar SIEMPRE este helper para rutas construidas desde JS/TS
 * (imágenes, CV, íconos) — Vite solo reescribe las de index.html y CSS.
 */
export function asset(path: string): string {
  const base = import.meta.env?.BASE_URL ?? '/';
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
