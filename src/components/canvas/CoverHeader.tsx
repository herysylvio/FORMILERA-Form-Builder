import React, { useState } from 'react';
import { ImagePlus, RefreshCw, X } from 'lucide-react';
import { formIcons } from '../../data/sampleForm';
import { cn } from '../../utils/cn';

interface CoverHeaderProps {
  hasCover: boolean;
  onCoverChange: (value: boolean) => void;
  icon: string;
  onIconChange: (value: string) => void;
  title: string;
  onTitleChange: (value: string) => void;
  description: string;
  onDescriptionChange: (value: string) => void;
}

const COVER_PALETTES = [
{ base: 'bg-[#0F1430]', a: 'bg-indigo-500/60', b: 'bg-violet-500/50', c: 'bg-emerald-400/30' },
{ base: 'bg-[#0E1A24]', a: 'bg-emerald-500/50', b: 'bg-sky-500/40', c: 'bg-indigo-400/30' },
{ base: 'bg-[#1A1028]', a: 'bg-fuchsia-500/45', b: 'bg-indigo-500/50', c: 'bg-amber-300/25' }];


const pillBtn =
'inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md transition hover:bg-black/45';

export function CoverHeader({ hasCover, onCoverChange, icon, onIconChange, title, onTitleChange, description, onDescriptionChange }: CoverHeaderProps) {
  const [palette, setPalette] = useState(0);
  const p = COVER_PALETTES[palette];
  const cycleIcon = () => onIconChange(formIcons[(formIcons.indexOf(icon) + 1) % formIcons.length]);

  const iconButton =
  <button
    type="button"
    onClick={cycleIcon}
    aria-label="Change form icon"
    title="Change icon"
    className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 text-3xl shadow-lg backdrop-blur-xl transition hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]">
    
      <span aria-hidden="true">{icon}</span>
    </button>;


  return (
    <header className="mb-8">
      {hasCover ?
      <div className="group/cover relative">
          <div className={cn('relative h-36 overflow-hidden rounded-2xl border border-white/10 sm:h-44', p.base)} aria-hidden="true">
            <div className={cn('absolute -left-10 -top-16 h-56 w-56 rounded-full blur-3xl', p.a)} />
            <div className={cn('absolute -right-6 top-0 h-48 w-64 rounded-full blur-3xl', p.b)} />
            <div className={cn('absolute -bottom-20 left-1/3 h-40 w-72 rounded-full blur-3xl', p.c)} />
            <div
            className="absolute inset-0 opacity-[0.15]"
            style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
          
          </div>
          <div className="absolute right-3 top-3 flex gap-1.5 opacity-0 transition-opacity duration-200 focus-within:opacity-100 group-hover/cover:opacity-100">
            <button type="button" className={pillBtn} onClick={() => setPalette((v) => (v + 1) % COVER_PALETTES.length)}>
              <RefreshCw className="h-3 w-3" /> Change cover
            </button>
            <button type="button" className={pillBtn} onClick={() => onCoverChange(false)} aria-label="Remove cover">
              <X className="h-3 w-3" />
            </button>
          </div>
          <div className="absolute -bottom-8 left-6">{iconButton}</div>
        </div> :

      <div className="flex items-end gap-3">
          {iconButton}
          <button
          type="button"
          onClick={() => onCoverChange(true)}
          className="mb-1 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/[0.05] dark:hover:text-slate-200">
          
            <ImagePlus className="h-3.5 w-3.5" /> Add cover
          </button>
        </div>
      }

      <div className={cn('px-1 sm:px-6', hasCover ? 'mt-14' : 'mt-6')}>
        <h1 className="sr-only">{title || 'Untitled form'}</h1>
        <input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Untitled form"
          aria-label="Form title"
          className="w-full bg-transparent text-3xl font-semibold tracking-tight text-slate-900 outline-none placeholder:text-slate-300 dark:text-white dark:placeholder:text-slate-700 sm:text-[40px] sm:leading-tight" />
        
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Add a description — tell respondents why this matters…"
          aria-label="Form description"
          rows={2}
          className="mt-2 w-full resize-none bg-transparent text-[15px] leading-relaxed text-slate-500 outline-none placeholder:text-slate-400 dark:text-slate-400 dark:placeholder:text-slate-600" />
        
      </div>
    </header>);

}