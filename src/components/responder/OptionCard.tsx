import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Kbd } from '../formilera/Kbd';
import { cn } from '../../utils/cn';
import { springSnappy } from '../../utils/motion';
import { splitKeyword } from '../../utils/responder';
import type { ResponderOption } from '../../types/responder';

interface OptionCardProps {
  option: ResponderOption;
  letter: string;
  selected: boolean;
  multi: boolean;
  onSelect: () => void;
}

export function OptionCard({ option, letter, selected, multi, onSelect }: OptionCardProps) {
  const [before, keyword, after] = splitKeyword(option.label, option.keyword);

  return (
    <motion.button
      type="button"
      role={multi ? 'checkbox' : 'radio'}
      aria-checked={selected}
      aria-keyshortcuts={letter}
      onClick={onSelect}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
      transition={springSnappy}
      className={cn(
        'flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-200 sm:px-5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]',
        selected ?
        'border-indigo-400/70 bg-indigo-500/[0.12] shadow-[0_0_0_1px_rgba(99,102,241,0.35),0_0_36px_-8px_rgba(99,102,241,0.7)]' :
        'border-white/10 bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-white/30 hover:bg-white/[0.05]'
      )}>
      
      <Kbd
        size="md"
        tone="dark"
        className={cn(
          'h-7 min-w-[28px] font-mono text-[12px] font-semibold transition-colors duration-200',
          selected ? '!bg-[#6366F1] !text-white !shadow-[0_0_14px_rgba(99,102,241,0.75)]' : '!bg-white/[0.08] !text-white'
        )}>
        
        {letter}
      </Kbd>
      <span className={cn('flex-1 text-[15px] leading-snug transition-colors', selected ? 'text-slate-100' : 'text-slate-300')}>
        {before}
        {keyword && <strong className="font-semibold text-white">{keyword}</strong>}
        {after}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center border transition-colors duration-200',
          multi ? 'rounded-md' : 'rounded-full',
          selected ? 'border-indigo-300 bg-[#6366F1]' : 'border-white/20 bg-white/[0.02]'
        )}>
        
        <AnimatePresence>
          {selected &&
          <motion.span
            initial={{ scale: 0, rotate: -25 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            transition={springSnappy}>
            
              <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
            </motion.span>
          }
        </AnimatePresence>
      </span>
    </motion.button>);

}