import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  Check,
  Eye,
  FileText,
  Inbox,
  LayoutGrid,
  Loader2,
  Monitor,
  Moon,
  PenLine,
  Pencil,
  Rocket,
  Smartphone,
  Sun,
  Tablet } from
'lucide-react';
import { LogoMark } from './formilera/Logo';
import { Button } from './formilera/Button';
import { Tooltip } from './formilera/Tooltip';
import { PillToggle } from './PillToggle';
import { cn } from '../utils/cn';
import type { DevicePreview, EditorView, ExperienceMode, SaveState, ThemeMode } from '../types/form';

interface TopNavProps {
  title: string;
  onTitleChange: (value: string) => void;
  saveState: SaveState;
  view: EditorView;
  onViewChange: (view: EditorView) => void;
  mode: ExperienceMode;
  onModeChange: (mode: ExperienceMode) => void;
  device: DevicePreview;
  onDeviceChange: (device: DevicePreview) => void;
  theme: ThemeMode;
  onThemeToggle: () => void;
  onPreview: () => void;
  responsesCount: number;
}

type PublishState = 'idle' | 'publishing' | 'published';

export function TopNav(props: TopNavProps) {
  const { title, onTitleChange, saveState, view, onViewChange, mode, onModeChange, device, onDeviceChange, theme, onThemeToggle, onPreview, responsesCount } = props;
  const titleRef = useRef<HTMLInputElement>(null);
  const [publish, setPublish] = useState<PublishState>('idle');

  const handlePublish = () => {
    if (publish !== 'idle') return;
    setPublish('publishing');
    window.setTimeout(() => {
      setPublish('published');
      window.setTimeout(() => setPublish('idle'), 2200);
    }, 1200);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/70 backdrop-blur-2xl dark:border-white/[0.06] dark:bg-[#0A0E1A]/60">
      <div className="flex h-14 items-center gap-4 px-4 lg:px-5">
        {/* Left */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <a href="#" aria-label="Formilera home" className="flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60">
            <LogoMark size="sm" />
            <span className="hidden text-[11px] font-bold tracking-[0.2em] text-slate-900 dark:text-white sm:inline">FORMILERA</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#6366F1] shadow-[0_0_8px_2px_rgba(99,102,241,0.7)]" aria-hidden="true" />
          </a>
          <span className="h-5 w-px shrink-0 bg-slate-200 dark:bg-white/10" aria-hidden="true" />
          <div className="group flex min-w-0 items-center gap-1.5">
            <input
              ref={titleRef}
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              aria-label="Form title"
              placeholder="Untitled form"
              size={Math.max(title.length, 12)}
              className="min-w-0 max-w-[280px] truncate rounded-md bg-transparent px-1.5 py-1 text-sm font-medium text-slate-800 outline-none transition-colors placeholder:text-slate-400 hover:bg-slate-100 focus:bg-slate-100 dark:text-slate-100 dark:hover:bg-white/[0.05] dark:focus:bg-white/[0.06]" />
            
            <button
              type="button"
              onClick={() => titleRef.current?.select()}
              aria-label="Rename form"
              className="shrink-0 rounded-md p-1 text-slate-400 opacity-60 transition hover:text-slate-700 group-hover:opacity-100 dark:hover:text-slate-200">
              
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </div>
          <span
            role="status"
            aria-live="polite"
            className={cn(
              'hidden shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium transition-colors md:inline-flex',
              saveState === 'saved' ?
              'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300' :
              'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-300'
            )}>
            
            {saveState === 'saved' ?
            <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span> :

            <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
            }
            {saveState === 'saved' ? 'Saved just now' : 'Saving…'}
          </span>
        </div>

        {/* Center */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <PillToggle<EditorView>
            ariaLabel="Workspace view"
            layoutId="nav-view"
            value={view}
            onChange={onViewChange}
            options={[
            { value: 'editor', label: 'Editor', icon: PenLine },
            { value: 'responses', label: 'Responses', icon: Inbox, count: responsesCount },
            { value: 'analytics', label: 'Analytics', icon: Activity }]
            } />
          
          <PillToggle<ExperienceMode>
            ariaLabel="Respondent experience"
            layoutId="nav-mode"
            value={mode}
            onChange={onModeChange}
            options={[
            { value: 'card', label: 'Card', icon: LayoutGrid, ariaLabel: 'Card mode', labelClassName: 'hidden 2xl:inline' },
            { value: 'document', label: 'Document', icon: FileText, ariaLabel: 'Document mode', labelClassName: 'hidden 2xl:inline' }]
            } />
          
        </div>

        {/* Right */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <PillToggle<DevicePreview>
            className="hidden xl:inline-flex"
            ariaLabel="Device preview"
            layoutId="nav-device"
            value={device}
            onChange={onDeviceChange}
            options={[
            { value: 'desktop', icon: Monitor, ariaLabel: 'Desktop preview' },
            { value: 'tablet', icon: Tablet, ariaLabel: 'Tablet preview' },
            { value: 'mobile', icon: Smartphone, ariaLabel: 'Mobile preview' }]
            } />
          
          <Tooltip label={theme === 'dark' ? 'Light theme' : 'Dark theme'} side="bottom">
            <button
              type="button"
              onClick={onThemeToggle}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white/60 text-slate-600 transition hover:bg-white hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:bg-white/[0.08] dark:hover:text-white">
              
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
                  transition={{ duration: 0.18 }}>
                  
                  {theme === 'dark' ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </Tooltip>
          <Button
            variant="ghost"
            size="sm"
            onClick={onPreview}
            leftIcon={<Eye />}
            className="hidden rounded-full border border-slate-200 bg-white/60 text-slate-700 hover:bg-white hover:text-slate-900 focus-visible:ring-indigo-400 focus-visible:ring-offset-transparent dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200 dark:hover:bg-white/[0.09] dark:hover:text-white sm:inline-flex">
            
            Preview
          </Button>
          <Button
            size="sm"
            onClick={handlePublish}
            loading={publish === 'publishing'}
            leftIcon={publish === 'published' ? <Check /> : <Rocket />}
            className="rounded-full bg-[#6366F1] px-4 hover:bg-[#7376F3] shadow-[0_0_0_1px_rgba(129,140,248,0.5),0_0_22px_-2px_rgba(99,102,241,0.65)] hover:shadow-[0_0_0_1px_rgba(165,180,252,0.6),0_0_32px_0_rgba(99,102,241,0.8)] focus-visible:ring-indigo-400 focus-visible:ring-offset-transparent">
            
            {publish === 'publishing' ? 'Publishing…' : publish === 'published' ? 'Published' : 'Publish'}
          </Button>
        </div>
      </div>
    </header>);

}