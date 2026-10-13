import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { QuestionLabel } from './QuestionLabel';
import { cn } from '../../../utils/cn';
import { springSnappy } from '../../../utils/motion';
import type { FormBlock } from '../../../types/form';

interface RatingBlockProps {
  block: FormBlock;
  onChange: (patch: Partial<FormBlock>) => void;
}

const LABELS = ['Médiocre', 'Passable', 'Bien', 'Très bien', 'Excellent'];

export function RatingBlock({ block, onChange }: RatingBlockProps) {
  const [value, setValue] = useState(4);
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value;

  return (
    <div className="space-y-4">
      <QuestionLabel value={block.label} onChange={(label) => onChange({ label })} />
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div role="radiogroup" aria-label={block.label} className="flex items-center gap-1" onMouseLeave={() => setHover(null)}>
          {[1, 2, 3, 4, 5].map((n) => {
            const lit = n <= display;
            return (
              <div key={n} className="relative">
                <AnimatePresence>
                  {hover === n &&
                  <motion.span
                    role="tooltip"
                    initial={{ opacity: 0, y: 4, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.9 }}
                    transition={{ duration: 0.12 }}
                    className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-slate-900/90 px-1.5 py-0.5 font-mono text-[10px] text-white backdrop-blur-md">
                    
                      {n} / 5
                    </motion.span>
                  }
                </AnimatePresence>
                <button
                  type="button"
                  role="radio"
                  aria-checked={value === n}
                  aria-label={`${n} sur 5`}
                  onMouseEnter={() => setHover(n)}
                  onFocus={() => setHover(n)}
                  onBlur={() => setHover(null)}
                  onClick={() => setValue(n)}
                  className="rounded-lg p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50">
                  
                  <motion.span className="block" animate={{ scale: lit ? 1 : 0.9 }} whileTap={{ scale: 0.8 }} transition={springSnappy}>
                    <Star
                      strokeWidth={1.5}
                      className={cn(
                        'h-8 w-8 transition-colors duration-200',
                        lit ?
                        'fill-amber-300 text-amber-300 drop-shadow-[0_0_10px_rgba(252,211,77,0.55)]' :
                        'text-slate-300 dark:text-white/15'
                      )} />
                    
                  </motion.span>
                </button>
              </div>);

          })}
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400" aria-live="polite">
          <span className="font-medium text-slate-800 dark:text-slate-200">{LABELS[display - 1]}</span>
          <span className="ml-2 font-mono text-xs">{display}/5</span>
        </p>
      </div>
    </div>);

}