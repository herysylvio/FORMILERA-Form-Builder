import React, { useEffect, useState } from 'react';
import { AmbientBackground } from '../components/AmbientBackground';
import { TopNav } from '../components/TopNav';
import { FormCanvas } from '../components/canvas/FormCanvas';
import { AiCommandBar } from '../components/AiCommandBar';
import { CreateFormModal } from '../components/CreateFormModal';
import { ThemeProvider } from '../contexts/ThemeContext';
import { useFormBuilder } from '../hooks/useFormBuilder';
import { defaultTemplates } from '../data/templates';
import { formMeta } from '../data/sampleForm';
import type { DevicePreview, ExperienceMode, ThemeMode } from '../types/form';
import type { FormTemplate } from '../types/template';

interface BuilderProps {
  defaultTheme: ThemeMode;
  defaultMode: ExperienceMode;
  slashMenuOpen: boolean;
  initialModalOpen?: boolean;
  onPreview: (mode: ExperienceMode) => void;
  onOpenSubmissions: () => void;
  onExitHome?: () => void;
}

export function Builder({
  defaultTheme,
  defaultMode,
  slashMenuOpen,
  initialModalOpen = false,
  onPreview,
  onOpenSubmissions,
  onExitHome
}: BuilderProps) {
  const [theme, setTheme] = useState<ThemeMode>(defaultTheme);
  const [mode, setMode] = useState<ExperienceMode>(defaultMode);
  const [device, setDevice] = useState<DevicePreview>('desktop');
  const [isModalOpen, setIsModalOpen] = useState(initialModalOpen);
  const builder = useFormBuilder(slashMenuOpen);

  useEffect(() => setTheme(defaultTheme), [defaultTheme]);
  useEffect(() => setMode(defaultMode), [defaultMode]);

  const handleSelectTemplate = (template: FormTemplate) => {
    builder.loadTemplate(template);
  };

  const handleSelectAiPrompt = (prompt: string) => {
    const lower = prompt.toLowerCase();
    const matched = defaultTemplates.find(
      (t) =>
        lower.includes(t.category) ||
        lower.includes('satisfaction') ||
        lower.includes('event') ||
        lower.includes('inscription') ||
        lower.includes('devis') ||
        lower.includes('recrutement')
    );
    if (matched) {
      builder.loadTemplate(matched);
      builder.setTitle(prompt.slice(0, 45));
    } else {
      builder.loadBlank();
      builder.setTitle(prompt.slice(0, 45));
    }
  };

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
            onThemeToggle={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            onPreview={() => onPreview(mode)}
            responsesCount={formMeta.responsesCount}
            onOpenTemplates={() => setIsModalOpen(true)}
            onHomeClick={onExitHome}
          />

          <main className="relative z-10">
            <FormCanvas builder={builder} mode={mode} device={device} />
          </main>
          <AiCommandBar onGenerate={builder.appendBlocks} />

          <CreateFormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSelectBlank={builder.loadBlank}
            onSelectTemplate={handleSelectTemplate}
            onSelectAiPrompt={handleSelectAiPrompt}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}