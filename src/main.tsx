import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

/**
 * Nota: no usamos <StrictMode> porque en desarrollo monta la app dos veces
 * y el motor de efectos (que manipula el DOM con IntersectionObserver,
 * typewriters, partículas, etc.) debe inicializarse una única vez por montaje.
 * El motor igualmente es re-entrante (ver EffectsEngine.destroy()).
 */
createRoot(document.getElementById('root')!).render(<App />);
