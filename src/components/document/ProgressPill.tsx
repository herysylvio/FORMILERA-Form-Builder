import React from 'react';
import { motion } from 'framer-motion';

interface ProgressPillProps {
  completed: number;
  total: number;
}

const R = 6;
const C = 2 * Math.PI * R;

export function ProgressPill({ completed, total }: ProgressPillProps) {
  const percent = Math.round(completed / total * 100);
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed right-4 top-4 z-40 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#161B22]/70 py-1.5 pl-2 pr-3 text-[12px] text-slate-300 shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl sm:right-6 sm:top-6">
      
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="-rotate-90">
        <circle cx="8" cy="8" r={R} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
        <motion.circle
          cx="8"
          cy="8"
          r={R}
          fill="none"
          stroke="#818CF8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={false}
          animate={{ strokeDashoffset: C * (1 - completed / total) }}
          transition={{ type: 'spring', stiffness: 200, damping: 26 }} />
        
      </svg>
      <span>
        <span className="font-semibold tabular-nums text-white">{completed}</span> sur {total} complétés{' '}
        <span className="font-mono text-[11px] text-slate-500">({percent}%)</span>
      </span>
    </div>);

}