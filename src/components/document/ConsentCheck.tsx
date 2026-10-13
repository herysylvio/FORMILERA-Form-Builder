import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';
import { springSnappy } from '../../utils/motion';

interface ConsentCheckProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string | null;
}

export function ConsentCheck({ checked, onChange, error }: ConsentCheckProps) {
  return (
    <div>
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="flex w-full items-start gap-3 rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0D1117]">
        
        <motion.span
          animate={{ scale: checked ? [1, 0.85, 1] : 1 }}
          transition={springSnappy}
          className={cn(
            'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors duration-200',
            checked ? 'border-indigo-300 bg-[#6366F1] shadow-[0_0_12px_rgba(99,102,241,0.6)]' : error ? 'border-rose-400/60' : 'border-white/25'
          )}>
          
          <AnimatePresence>
            {checked &&
            <motion.span initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} transition={springSnappy}>
                <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
              </motion.span>
            }
          </AnimatePresence>
        </motion.span>
        <span className="text-sm leading-relaxed text-slate-300">
          J’accepte que mes informations soient utilisées par l’équipe du Sommet pour gérer mon inscription et m’envoyer les informations pratiques de l’événement.
        </span>
      </button>
      {error && <p role="alert" className="ml-8 mt-2 text-xs text-rose-300">{error}</p>}
    </div>);

}