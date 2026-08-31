import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  /**
   * Base pública del sitio.
   * - Vercel / dominio propio: '/' (default)
   * - GitHub Pages bajo subcarpeta: el workflow de deploy define
   *   DEPLOY_BASE=/PORTAFOLIO/ y todos los assets se ajustan solos.
   */
  base: process.env.DEPLOY_BASE || '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
