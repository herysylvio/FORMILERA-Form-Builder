import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { BlockId } from '../../types/registration';

interface FocusBlockProps {
  id: BlockId;
  number: number;
  title: string;
  description?: string;
  required: boolean;
  active: boolean;
  registerRef: (el: HTMLElement | null) => void;
  onFocus: () => void;
  children: React.ReactNode;
}

export function FocusBlock({ id, number, title, description, required, active, registerRef, onFocus, children }: FocusBlockProps) {
  return (
    <motion.section
      ref={registerRef}
      aria-labelledby={`block-${id}`}
      onFocusCapture={onFocus}
      onPointerDown={onFocus}
      initial={false}
      animate={{ opacity: active ? 1 : 0.55 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'relative scroll-mt-24 rounded-2xl border px-5 py-6 transition-[border-color,background-color,box-shadow] duration-500 sm:px-7 sm:py-7',
        active ?
        'border-indigo-400/25 bg-white/[0.025] shadow-[0_0_0_1px_rgba(99,102,241,0.08),0_0_56px_-14px_rgba(99,102,241,0.45),inset_0_1px_0_rgba(255,255,255,0.05)]' :
        'border-transparent hover:!opacity-80'
      )}>
      
      <div className="mb-5 flex items-baseline gap-3">
        <span className={cn('font-mono text-[11px] tabular-nums transition-colors', active ? 'text-indigo-300' : 'text-slate-600')}>
          {String(number).padStart(2, '0')}
        </span>
        <div className="min-w-0 flex-1">
          <h2 id={`block-${id}`} className="text-[17px] font-semibold tracking-tight text-[#E6EDF3]">
            {title}
            {required ?
            <span className="ml-1 text-indigo-400" aria-label="obligatoire">*</span> :

            <span className="ml-2 font-mono text-[10px] font-normal uppercase tracking-[0.12em] text-slate-600">Optionnel</span>
            }
          </h2>
          {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
        </div>
      </div>
      {children}
    </motion.section>);

}