import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SubmitBarProps {
  missingCount: number;
  completed: number;
  total: number;
  submitting: boolean;
  onJumpToMissing: () => void;
  onSubmit: () => void;
}

export function SubmitBar({ missingCount, completed, total, submitting, onJumpToMissing, onSubmit }: SubmitBarProps) {
  const ready = missingCount === 0;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-4 sm:pb-6">
      <div className="pointer-events-auto mx-auto flex max-w-2xl items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#161B22]/75 py-3 pl-4 pr-3 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl sm:pl-5">
        <div className="min-w-0">
          {ready ?
          <p className="flex items-center gap-2 text-sm font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" aria-hidden="true" />
              Tout est prêt
            </p> :

          <button type="button" onClick={onJumpToMissing} className="flex items-center gap-2 rounded text-left text-sm font-medium text-slate-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" aria-hidden="true" />
              <span className="truncate">Encore {missingCount} champ{missingCount > 1 ? 's' : ''} obligatoire{missingCount > 1 ? 's' : ''}</span>
            </button>
          }
          <div className="mt-2 hidden h-1 w-40 overflow-hidden rounded-full bg-white/[0.07] sm:block" aria-hidden="true">
            <motion.div
              className={cn('h-full rounded-full', ready ? 'bg-emerald-400' : 'bg-indigo-400')}
              initial={false}
              animate={{ width: `${completed / total * 100}%` }}
              transition={{ type: 'spring', stiffness: 200, damping: 26 }} />
            
          </div>
        </div>
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          aria-busy={submitting}
          className={cn(
            'inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-slate-900 transition-[transform,box-shadow,background-color] duration-100 sm:px-5',
            'shadow-[0_4px_0_0_rgba(148,163,184,0.45),0_12px_32px_-8px_rgba(255,255,255,0.35)] hover:bg-slate-50',
            'active:translate-y-[3px] active:shadow-[0_1px_0_0_rgba(148,163,184,0.45),0_6px_16px_-8px_rgba(255,255,255,0.3)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#161B22]',
            'disabled:cursor-wait disabled:translate-y-[3px] disabled:shadow-[0_1px_0_0_rgba(148,163,184,0.45)]'
          )}>
          
          {submitting ?
          <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Envoi en cours…
            </> :

          <>
              <span className="hidden sm:inline">Envoyer ma candidature</span>
              <span className="sm:hidden">Envoyer</span>
              <span aria-hidden="true">🚀</span>
            </>
          }
        </button>
      </div>
    </div>);

}