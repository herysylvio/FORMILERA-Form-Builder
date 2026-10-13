import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, CornerDownLeft, Loader2, Sparkles } from 'lucide-react';
import { aiPresets, type AiPreset } from '../data/aiPresets';
import { matchPreset } from '../utils/blocks';
import { cn } from '../utils/cn';
import { springSoft } from '../utils/motion';
import type { BlockDraft } from '../types/form';

interface AiCommandBarProps {
  onGenerate: (blocks: BlockDraft[]) => void;
}

export function AiCommandBar({ onGenerate }: AiCommandBarProps) {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const run = (text: string, preset?: AiPreset) => {
    const value = text.trim();
    if (generating) return;
    if (!value) {
      inputRef.current?.focus();
      return;
    }
    setPrompt(value);
    setGenerating(true);
    setNotice(null);
    timers.current.push(
      window.setTimeout(() => {
        const chosen = preset ?? matchPreset(value);
        onGenerate(chosen.blocks);
        setGenerating(false);
        setPrompt('');
        setNotice(`${chosen.blocks.length} blocks added to your form`);
        timers.current.push(window.setTimeout(() => setNotice(null), 2800));
      }, 1500)
    );
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex flex-col items-center gap-2 px-4">
      <AnimatePresence>
        {notice &&
        <motion.div
          role="status"
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={springSoft}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-white/90 px-3 py-1.5 text-xs font-medium text-emerald-700 shadow-lg backdrop-blur-xl dark:bg-slate-900/90 dark:text-emerald-300">
          
            <Check className="h-3.5 w-3.5" aria-hidden="true" /> {notice}
          </motion.div>
        }
      </AnimatePresence>

      <form
        onSubmit={(e) => {e.preventDefault();run(prompt);}}
        className={cn(
          'pointer-events-auto flex w-full max-w-[620px] items-center gap-3 rounded-full border border-indigo-500/30 py-2.5 pl-5 pr-2.5 backdrop-blur-xl xl:max-w-[820px]',
          'bg-white/85 shadow-[0_8px_32px_rgba(99,102,241,0.25)] dark:bg-slate-900/80 dark:shadow-[0_8px_32px_rgba(99,102,241,0.25),inset_0_1px_0_rgba(255,255,255,0.08)]',
          'transition-[border-color] duration-200 focus-within:border-indigo-500/60'
        )}>
        
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center" aria-hidden="true">
          {!generating && <span className="absolute inset-0 animate-ping rounded-full bg-indigo-500/25 [animation-duration:2.4s]" />}
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-600 ring-1 ring-indigo-400/30 dark:text-indigo-300">
            {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          </span>
        </span>

        <input
          ref={inputRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={generating}
          aria-label="Describe a form for AI to generate"
          placeholder="Describe any form to generate or modify blocks with AI..."
          className="h-9 min-w-0 flex-1 truncate bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-70 dark:text-slate-100 dark:placeholder:text-slate-500" />
        

        <AnimatePresence initial={false}>
          {!prompt && !generating &&
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={springSoft}
            className="hidden shrink-0 items-center gap-1.5 overflow-hidden md:flex">
            
              {aiPresets.map((preset) =>
            <button
              key={preset.id}
              type="button"
              onClick={() => run(preset.label, preset)}
              className="whitespace-nowrap rounded-full border border-slate-200 bg-white/60 px-2.5 py-1 text-[11px] font-medium text-slate-600 transition hover:border-indigo-400/50 hover:text-slate-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-indigo-400/40 dark:hover:text-white">
              
                  {preset.emoji} {preset.label}
                </button>
            )}
            </motion.div>
          }
        </AnimatePresence>

        <button
          type="submit"
          disabled={generating}
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-4 text-xs font-semibold text-white shadow-[0_0_20px_-2px_rgba(139,92,246,0.65)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 disabled:cursor-wait disabled:opacity-80">
          
          {generating ? 'Generating…' : 'Generate'}
          {!generating && <CornerDownLeft className="h-3.5 w-3.5" aria-hidden="true" />}
        </button>
      </form>
    </div>);

}