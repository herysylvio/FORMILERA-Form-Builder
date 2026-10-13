import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { cn } from '../../utils/cn';
import { springSnappy } from '../../utils/motion';
import type { ResponderQuestion } from '../../types/responder';

interface TextAnswerProps {
  question: ResponderQuestion;
  value: string;
  onChange: (value: string) => void;
}

export function TextAnswer({ question, value, onChange }: TextAnswerProps) {
  const fieldClass =
  'w-full border-b border-white/15 bg-transparent pb-3 text-2xl font-light tracking-tight text-white outline-none transition-colors placeholder:text-slate-600 focus:border-indigo-400 sm:text-[28px]';

  return (
    <div>
      {question.type === 'longText' ?
      <textarea
        autoFocus
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder}
        aria-label={question.title}
        className={cn(fieldClass, 'resize-none leading-snug')} /> :


      <input
        autoFocus
        type={question.type === 'email' ? 'email' : 'text'}
        autoComplete={question.type === 'email' ? 'email' : 'given-name'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder}
        aria-label={question.title}
        className={fieldClass} />

      }
      <p className="mt-3 font-mono text-[11px] text-slate-500">
        {question.type === 'longText' ? '⇧ + ↵ pour un saut de ligne · ↵ pour valider' : '↵ pour valider'}
      </p>
    </div>);

}

const RATING_LABELS = ['Frustrants', 'Limités', 'Corrects', 'Efficaces', 'Indispensables'];

interface RatingAnswerProps {
  value: number | undefined;
  onChange: (value: number) => void;
}

export function RatingAnswer({ value, onChange }: RatingAnswerProps) {
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value ?? 0;

  return (
    <div>
      <div role="radiogroup" aria-label="Note de 1 à 5" className="flex gap-2 sm:gap-3" onMouseLeave={() => setHover(null)}>
        {[1, 2, 3, 4, 5].map((n) => {
          const lit = n <= display;
          return (
            <motion.button
              key={n}
              type="button"
              role="radio"
              aria-checked={value === n}
              aria-label={`${n} sur 5`}
              onMouseEnter={() => setHover(n)}
              onClick={() => onChange(n)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              transition={springSnappy}
              className={cn(
                'flex h-16 flex-1 flex-col items-center justify-center gap-1 rounded-2xl border backdrop-blur-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 sm:h-20',
                lit ? 'border-amber-300/40 bg-amber-300/[0.07]' : 'border-white/10 bg-white/[0.03] hover:border-white/30'
              )}>
              
              <Star
                strokeWidth={1.5}
                className={cn('h-6 w-6 transition-colors', lit ? 'fill-amber-300 text-amber-300 drop-shadow-[0_0_10px_rgba(252,211,77,0.6)]' : 'text-white/25')} />
              
              <span className="font-mono text-[10px] text-slate-500">{n}</span>
            </motion.button>);

        })}
      </div>
      <p className="mt-4 h-5 text-sm text-slate-400" aria-live="polite">
        {display > 0 &&
        <>
            <span className="font-medium text-white">{RATING_LABELS[display - 1]}</span>
            <span className="ml-2 font-mono text-xs text-slate-500">{display}/5</span>
          </>
        }
      </p>
    </div>);

}