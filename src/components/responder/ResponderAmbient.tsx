import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ResponderAmbientProps {
  progress: number;
}

export function ResponderAmbient({ progress }: ResponderAmbientProps) {
  const reduce = useReducedMotion();
  const breathe = reduce ?
  {} :
  { animate: { scale: [1, 1.08, 1] }, transition: { duration: 12, repeat: Infinity, ease: 'easeInOut' as const } };

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute left-[8%] top-[12%]"
        animate={{ x: `${progress * 38}vw`, y: `${progress * 18}vh`, opacity: 0.55 + progress * 0.25 }}
        transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}>
        
        <motion.div {...breathe} className="h-[520px] w-[520px] rounded-full bg-violet-600/30 blur-[140px]" />
      </motion.div>
      <motion.div
        className="absolute bottom-[6%] right-[6%]"
        animate={{ x: `${-progress * 30}vw`, y: `${-progress * 14}vh`, opacity: 0.4 + progress * 0.35 }}
        transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}>
        
        <motion.div {...breathe} className="h-[460px] w-[460px] rounded-full bg-cyan-500/20 blur-[140px]" />
      </motion.div>
    </div>);

}