import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { dietaryOptions, NO_RESTRICTION } from '../../data/registrationForm';
import { cn } from '../../utils/cn';
import { springSnappy } from '../../utils/motion';

interface DietaryPillsProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function DietaryPills({ value, onChange }: DietaryPillsProps) {
  const toggle = (option: string) => {
    if (option === NO_RESTRICTION) {
      onChange(value.includes(NO_RESTRICTION) ? [] : [NO_RESTRICTION]);
      return;
    }
    const rest = value.filter((v) => v !== NO_RESTRICTION);
    onChange(rest.includes(option) ? rest.filter((v) => v !== option) : [...rest, option]);
  };

  return (
    <div role="group" aria-label="Préférences alimentaires" className="flex flex-wrap gap-2">
      {dietaryOptions.map((option) => {
        const selected = value.includes(option);
        return (
          <motion.button
            key={option}
            type="button"
            aria-pressed={selected}
            onClick={() => toggle(option)}
            layout
            whileTap={{ scale: 0.95 }}
            transition={springSnappy}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1117]',
              selected ?
              'border-[#6366F1] bg-[#6366F1] font-medium text-white shadow-[0_0_18px_-4px_rgba(99,102,241,0.8)]' :
              'border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/25 hover:text-white'
            )}>
            
            <AnimatePresence initial={false}>
              {selected &&
              <motion.span
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 14, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={springSnappy}
                className="flex overflow-hidden"
                aria-hidden="true">
                
                  <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={3} />
                </motion.span>
              }
            </AnimatePresence>
            {option}
          </motion.button>);

      })}
    </div>);

}