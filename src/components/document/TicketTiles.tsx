import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { tickets } from '../../data/registrationForm';
import { cn } from '../../utils/cn';
import { springSnappy } from '../../utils/motion';
import type { TicketId } from '../../types/registration';

interface TicketTilesProps {
  value: TicketId | null;
  onChange: (id: TicketId) => void;
  error?: string | null;
}

export function TicketTiles({ value, onChange, error }: TicketTilesProps) {
  return (
    <div>
      <div role="radiogroup" aria-label="Type de pass" className="grid gap-3 sm:grid-cols-2">
        {tickets.map((t) => {
          const selected = value === t.id;
          return (
            <motion.button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(t.id)}
              whileTap={{ scale: 0.985 }}
              transition={springSnappy}
              className={cn(
                'relative flex flex-col rounded-2xl border p-5 text-left transition-[border-color,background-color,box-shadow] duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1117]',
                selected ?
                'border-indigo-400/60 bg-indigo-500/[0.09] shadow-[0_0_0_1px_rgba(99,102,241,0.3),0_0_36px_-10px_rgba(99,102,241,0.7)]' :
                'border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
              )}>
              
              {t.popular &&
              <span className="absolute -top-2.5 right-4 rounded-full bg-[#6366F1] px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_0_16px_rgba(99,102,241,0.6)]">
                  Populaire
                </span>
              }
              <div className="flex items-center justify-between gap-3">
                <span className="text-[15px] font-semibold text-[#E6EDF3]">{t.name}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex h-5 w-5 items-center justify-center rounded-full border transition-colors',
                    selected ? 'border-indigo-300 bg-[#6366F1]' : 'border-white/20'
                  )}>
                  
                  {selected &&
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={springSnappy}>
                      <Check className="h-3 w-3 text-white" strokeWidth={3} />
                    </motion.span>
                  }
                </span>
              </div>
              <span className="mt-1 text-xs text-slate-500">{t.description}</span>
              <span className={cn('mt-4 inline-flex w-fit rounded-lg px-2 py-1 font-mono text-sm font-semibold tabular-nums', selected ? 'bg-indigo-500/15 text-indigo-200' : 'bg-white/[0.05] text-slate-200')}>
                {t.price}
              </span>
              <ul className="mt-4 space-y-1.5">
                {t.perks.map((p) =>
                <li key={p} className="flex items-center gap-2 text-[13px] text-slate-400">
                    <Check className={cn('h-3.5 w-3.5 shrink-0', selected ? 'text-indigo-300' : 'text-slate-600')} aria-hidden="true" />
                    {p}
                  </li>
                )}
              </ul>
            </motion.button>);

        })}
      </div>
      {error && <p role="alert" className="mt-3 text-xs text-rose-300">{error}</p>}
    </div>);

}