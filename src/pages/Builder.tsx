import React, { useEffect, useState } from 'react';
import { AmbientBackground } from '../components/AmbientBackground';
import { TopNav } from '../components/TopNav';
import { FormCanvas } from '../components/canvas/FormCanvas';
import { AiCommandBar } from '../components/AiCommandBar';
import { ThemeProvider } from '../contexts/ThemeContext';
import { useFormBuilder } from '../hooks/useFormBuilder';
import { formMeta } from '../data/sampleForm';
import type { DevicePreview, ExperienceMode, ThemeMode } from '../types/form';

interface BuilderProps {
  defaultTheme: ThemeMode;
  defaultMode: ExperienceMode;
  slashMenuOpen: boolean;
  onPreview: (mode: ExperienceMode) => void;
  onOpenSubmissions: () => void;
}

export function Builder({ defaultTheme, defaultMode, slashMenuOpen, onPreview, onOpenSubmissions }: BuilderProps) {
  const [theme, setTheme] = useState<ThemeMode>(defaultTheme);
  const [mode, setMode] = useState<ExperienceMode>(defaultMode);
  const [device, setDevice] = useState<DevicePreview>('desktop');
  const builder = useFormBuilder(slashMenuOpen);

  useEffect(() => setTheme(defaultTheme), [defaultTheme]);
  useEffect(() => setMode(defaultMode), [defaultMode]);

  return (
    <ThemeProvider value={theme}>
      <div className={theme === 'dark' ? 'dark' : undefined}>
        <div className="relative min-h-screen w-full overflow-x-clip bg-slate-50 font-sans text-slate-900 antialiased dark:bg-[#0A0E1A] dark:text-slate-100">
          <AmbientBackground />
          <TopNav
            title={builder.title}
            onTitleChange={builder.setTitle}
            saveState={builder.saveState}
            view="editor"
            onViewChange={(v) => v !== 'editor' && onOpenSubmissions()}
            mode={mode}
            onModeChange={setMode}
            device={device}
            onDeviceChange={setDevice}
            theme={theme}
            onThemeToggle={() => setTheme((t) => t === 'dark' ? 'light' : 'dark')}
            onPreview={() => onPreview(mode)}
            responsesCount={formMeta.responsesCount} />
          
          <main className="relative z-10">
            <FormCanvas builder={builder} mode={mode} device={device} />
          </main>
          <AiCommandBar onGenerate={builder.appendBlocks} />
        </div>
      </div>
    </ThemeProvider>);

}