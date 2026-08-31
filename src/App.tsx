import { useEffectsEngine } from '@/hooks/useEffectsEngine';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { Background } from '@/components/layout/Background';
import { CursorFx } from '@/components/layout/CursorFx';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Stack } from '@/components/sections/Stack';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { CodeShowcase } from '@/components/sections/CodeShowcase';
import { Education } from '@/components/sections/Education';
import { Contact } from '@/components/sections/Contact';

export default function App() {
  useEffectsEngine();

  return (
    <LanguageProvider>
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden', background: 'var(--bg-0)' }}>
      <Background />
      <CursorFx />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 'var(--z-content)' as never }}>
        <Hero />
        <About />
        <Stack />
        <Experience />
        <Projects />
        <CodeShowcase />
        <Education />
        <Contact />
      </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
