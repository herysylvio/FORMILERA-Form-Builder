import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function AmbientBackground() {
  const reduce = useReducedMotion();
  const drift = (x: number, y: number, duration: number) =>
  reduce ?
  {} :
  {
    animate: { x: [0, x, 0], y: [0, y, 0] },
    transition: { duration, repeat: Infinity, ease: 'easeInOut' as const }
  };

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        {...drift(60, 40, 22)}
        className="absolute -left-40 -top-48 h-[560px] w-[560px] rounded-full bg-indigo-300/40 blur-[120px] dark:bg-indigo-600/25" />
      
      <motion.div
        {...drift(-50, 60, 26)}
        className="absolute -right-32 top-24 h-[480px] w-[480px] rounded-full bg-violet-300/30 blur-[120px] dark:bg-violet-600/[0.18]" />
      
      <motion.div
        {...drift(40, -50, 30)}
        className="absolute bottom-[-220px] left-1/3 h-[520px] w-[620px] rounded-full bg-emerald-200/30 blur-[140px] dark:bg-emerald-500/[0.08]" />
      
      <div className="absolute inset-x-0 top-0 h-px bg-indigo-400/20" />
    </div>);

}