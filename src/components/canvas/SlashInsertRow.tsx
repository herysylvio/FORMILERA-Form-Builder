import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SlashMenu } from '../SlashMenu';
import { springSoft } from '../../utils/motion';
import type { BlockType } from '../../types/form';

interface SlashInsertRowProps {
  autoFocus: boolean;
  onSelect: (type: BlockType) => void;
  onClose: () => void;
}

export function SlashInsertRow({ autoFocus, onSelect, onClose }: SlashInsertRowProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div ref={ref} className="relative mt-2">
      <div className="flex items-center gap-1.5 px-6 py-2 text-[15px]">
        <span className="font-mono text-indigo-500 dark:text-indigo-300">/</span>
        <span className="h-5 w-px animate-pulse bg-indigo-400" aria-hidden="true" />
        <span className="ml-1 text-slate-400 dark:text-slate-500">Type to search blocks…</span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -6, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={springSoft}
        className="absolute left-4 top-full z-30 mt-1 origin-top-left">
        
        <SlashMenu autoFocus={autoFocus} onSelect={onSelect} onClose={onClose} />
      </motion.div>
    </div>);

}