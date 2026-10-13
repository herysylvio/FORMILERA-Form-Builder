import React from 'react';
import { motion } from 'framer-motion';
import { Copy, GitBranch, Trash2 } from 'lucide-react';
import { Tooltip } from '../formilera/Tooltip';
import { SpringSwitch } from '../SpringSwitch';
import { cn } from '../../utils/cn';
import { springSoft } from '../../utils/motion';

interface BlockToolbarProps {
  required: boolean;
  hasLogic: boolean;
  canBeRequired: boolean;
  onDuplicate: () => void;
  onToggleRequired: (value: boolean) => void;
  onToggleLogic: () => void;
  onDelete: () => void;
}

const iconBtn =
'flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 dark:text-slate-400 dark:hover:bg-white/[0.07] dark:hover:text-white';

export function BlockToolbar({ required, hasLogic, canBeRequired, onDuplicate, onToggleRequired, onToggleLogic, onDelete }: BlockToolbarProps) {
  return (
    <motion.div
      role="toolbar"
      aria-label="Block actions"
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={springSoft}
      onClick={(e) => e.stopPropagation()}
      className="absolute -top-4 right-4 z-20 flex items-center gap-0.5 rounded-xl border border-slate-200 bg-white/90 p-1 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/85 dark:shadow-[0_8px_24px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]">
      
      <Tooltip label="Duplicate" shortcut="⌘ D">
        <button type="button" aria-label="Duplicate block" onClick={onDuplicate} className={iconBtn}>
          <Copy className="h-3.5 w-3.5" />
        </button>
      </Tooltip>
      <span className="mx-1 h-4 w-px bg-slate-200 dark:bg-white/10" aria-hidden="true" />
      <div className={cn('flex items-center gap-2 px-1.5', !canBeRequired && 'opacity-40')}>
        <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">Required</span>
        <SpringSwitch label="Required" checked={required} disabled={!canBeRequired} onCheckedChange={onToggleRequired} />
      </div>
      <span className="mx-1 h-4 w-px bg-slate-200 dark:bg-white/10" aria-hidden="true" />
      <Tooltip label={hasLogic ? 'Logic on' : 'Conditional logic'}>
        <button
          type="button"
          aria-label="Conditional logic"
          aria-pressed={hasLogic}
          onClick={onToggleLogic}
          className={cn(iconBtn, hasLogic && 'bg-indigo-500/15 text-indigo-600 hover:bg-indigo-500/20 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-200')}>
          
          <GitBranch className="h-3.5 w-3.5" />
        </button>
      </Tooltip>
      <Tooltip label="Delete" shortcut="⌫">
        <button
          type="button"
          aria-label="Delete block"
          onClick={onDelete}
          className={cn(iconBtn, 'hover:bg-rose-500/10 hover:text-rose-600 dark:hover:bg-rose-500/15 dark:hover:text-rose-300')}>
          
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </Tooltip>
    </motion.div>);

}