import React from 'react';
import { motion } from 'framer-motion';
import { LogoMark } from '../formilera/Logo';
import { springSoft } from '../../utils/motion';

interface ResponderHeaderProps {
  current: number;
  total: number;
  percent: number;
  minutesLeft: number;
  done: boolean;
  onExit: () => void;
}

export function ResponderHeader({ current, total, percent, minutesLeft, done, onExit }: ResponderHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <div
        role="progressbar"
        aria-label="Progression du formulaire"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="h-[2px] w-full bg-white/[0.05]">
        
        <motion.div
          className="relative h-full bg-gradient-to-r from-violet-500 via-indigo-400 to-cyan-400 shadow-[0_0_12px_rgba(129,140,248,0.8)]"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={springSoft}>
          
          <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_10px_3px_rgba(103,232,249,0.7)]" />
        </motion.div>
      </div>
      <div className="flex items-center justify-between gap-4 px-6 py-5 md:px-10">
        <button
          type="button"
          onClick={onExit}
          aria-label="Formilera — retour à l’éditeur"
          title="Retour à l’éditeur"
          className="flex items-center gap-2 rounded-lg opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60">
          
          <LogoMark size="sm" />
          <span className="hidden text-[11px] font-bold tracking-[0.2em] text-white/90 sm:inline">FORMILERA</span>
        </button>
        <p className="font-mono text-[11px] tracking-tight text-slate-500" aria-live="polite">
          {done ?
          <span className="text-emerald-300">Terminé · 100% completed</span> :

          <>
              Question <span className="text-slate-200">{current}</span> of {total}
              <span className="mx-1.5 text-slate-700">·</span>
              <span className="text-slate-300">{percent}%</span> completed
              <span className="hidden sm:inline">
                <span className="mx-1.5 text-slate-700">·</span>
                {minutesLeft > 0 ? `~${minutesLeft} min remaining` : 'Last question'}
              </span>
            </>
          }
        </p>
      </div>
    </header>);

}