import React from 'react';
import { motion } from 'framer-motion';
import { Check, PenLine, RotateCcw } from 'lucide-react';
import { springSnappy, springSoft } from '../../utils/motion';

interface CompletionScreenProps {
  name: string;
  answeredCount: number;
  total: number;
  onRestart: () => void;
  onExit: () => void;
}

export function CompletionScreen({ name, answeredCount, total, onRestart, onExit }: CompletionScreenProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0 }}
      transition={springSoft}
      className="w-full max-w-xl text-center"
      aria-labelledby="done-title">
      
      <motion.span
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ ...springSnappy, delay: 0.15 }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/40 shadow-[0_0_40px_-4px_rgba(52,211,153,0.6)]">
        
        <Check className="h-7 w-7" strokeWidth={2.5} aria-hidden="true" />
      </motion.span>
      <h1 id="done-title" className="mt-8 text-3xl font-medium tracking-tight text-white sm:text-4xl">
        Merci{name ? `, ${name}` : ''} !
      </h1>
      <p className="mt-3 text-sm text-[#94A3B8]">
        Vos réponses ont bien été enregistrées. Le rapport de synthèse arrivera dans votre boîte mail sous 48 h.
      </p>
      <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-slate-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
        {answeredCount} / {total} réponses · envoyé à l’instant
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-slate-200 transition hover:border-white/30 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60">
          
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> Recommencer
        </button>
        <button
          type="button"
          onClick={onExit}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#6366F1] px-5 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(99,102,241,0.6)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300">
          
          <PenLine className="h-4 w-4" aria-hidden="true" /> Retour à l’éditeur
        </button>
      </div>
    </motion.section>);

}