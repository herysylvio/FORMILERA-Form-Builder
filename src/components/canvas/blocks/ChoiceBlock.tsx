import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronsUpDown, Plus } from 'lucide-react';
import { Kbd } from '../../formilera/Kbd';
import { QuestionLabel } from './QuestionLabel';
import { useTheme } from '../../../contexts/ThemeContext';
import { cn } from '../../../utils/cn';
import { springSnappy, springSoft } from '../../../utils/motion';
import type { FormBlock } from '../../../types/form';

interface ChoiceBlockProps {
  block: FormBlock;
  isActive: boolean;
  onChange: (patch: Partial<FormBlock>) => void;
}

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function ChoiceBlock({ block, isActive, onChange }: ChoiceBlockProps) {
  const theme = useTheme();
  const options = block.options ?? [];
  const [selected, setSelected] = useState<number | null>(block.type === 'multiChoice' ? 0 : null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Letter shortcuts select an option while the block is active.
  useEffect(() => {
    if (!isActive || block.type !== 'multiChoice') return;
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.key.length !== 1) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest('input, textarea')) return;
      const index = LETTERS.indexOf(e.key.toUpperCase());
      if (index >= 0 && index < options.length) setSelected(index);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isActive, block.type, options.length]);

  const addOption = () => onChange({ options: [...options, `Option ${LETTERS[options.length] ?? options.length + 1}`] });

  if (block.type === 'dropdown') {
    return (
      <div className="space-y-3">
        <QuestionLabel value={block.label} onChange={(label) => onChange({ label })} />
        <div className="relative">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-white/70 px-4 text-sm text-slate-700 backdrop-blur-md transition hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-200 dark:hover:border-white/[0.14]">
            
            <span className={cn(selected === null && 'text-slate-400 dark:text-slate-500')}>
              {selected === null ? 'Sélectionnez une option' : options[selected]}
            </span>
            <ChevronsUpDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
          </button>
          <AnimatePresence>
            {menuOpen &&
            <motion.ul
              role="listbox"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={springSoft}
              className="absolute inset-x-0 top-full z-20 mt-1.5 rounded-xl border border-slate-200 bg-white/95 p-1 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/95">
              
                {options.map((option, i) =>
              <li key={option}>
                    <button
                  type="button"
                  role="option"
                  aria-selected={selected === i}
                  onClick={() => {setSelected(i);setMenuOpen(false);}}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/[0.06]">
                  
                      {option}
                      {selected === i && <Check className="h-4 w-4 text-indigo-500 dark:text-indigo-300" />}
                    </button>
                  </li>
              )}
              </motion.ul>
            }
          </AnimatePresence>
        </div>
      </div>);

  }

  return (
    <div className="space-y-3">
      <QuestionLabel value={block.label} onChange={(label) => onChange({ label })} />
      <div role="radiogroup" aria-label={block.label} className="grid gap-2 sm:grid-cols-2">
        {options.map((option, i) => {
          const isSelected = selected === i;
          return (
            <motion.button
              key={`${option}-${i}`}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setSelected(i)}
              whileTap={{ scale: 0.985 }}
              transition={springSnappy}
              className={cn(
                'group/opt flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition-[border-color,background-color,box-shadow] duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50',
                isSelected ?
                'border-indigo-500/50 bg-indigo-500/10 text-slate-900 shadow-[0_0_0_1px_rgba(99,102,241,0.2),0_0_24px_-8px_rgba(99,102,241,0.6)] dark:text-white' :
                'border-slate-200 bg-white/60 text-slate-700 hover:border-slate-300 hover:bg-white dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-slate-300 dark:hover:border-white/[0.14] dark:hover:bg-white/[0.04]'
              )}>
              
              <Kbd
                tone={theme === 'dark' ? 'dark' : 'light'}
                className={cn('font-mono', isSelected && '!bg-[#6366F1] !text-white !shadow-[0_0_10px_rgba(99,102,241,0.6)]')}>
                
                {LETTERS[i]}
              </Kbd>
              <span className="flex-1 truncate">{option}</span>
              <AnimatePresence>
                {isSelected &&
                <motion.span initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={springSnappy}>
                    <Check className="h-4 w-4 text-indigo-500 dark:text-indigo-300" aria-hidden="true" />
                  </motion.span>
                }
              </AnimatePresence>
            </motion.button>);

        })}
      </div>
      {isActive &&
      <button
        type="button"
        onClick={addOption}
        className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/[0.05] dark:hover:text-slate-200">
        
          <Plus className="h-3.5 w-3.5" /> Add option
        </button>
      }
    </div>);

}