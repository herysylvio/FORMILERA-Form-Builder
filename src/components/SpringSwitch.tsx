import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { springSnappy } from '../utils/motion';

interface SpringSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
}

export function SpringSwitch({ checked, onCheckedChange, label, disabled = false }: SpringSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        'relative inline-flex h-[18px] w-8 shrink-0 items-center rounded-full p-[2px] transition-[background-color,box-shadow] duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 disabled:cursor-not-allowed disabled:opacity-40',
        checked ? 'bg-[#6366F1] shadow-[0_0_12px_rgba(99,102,241,0.55)]' : 'bg-slate-300 dark:bg-white/[0.12]'
      )}>
      
      <motion.span
        animate={{ x: checked ? 14 : 0 }}
        transition={springSnappy}
        className="block h-[14px] w-[14px] rounded-full bg-white shadow-sm" />
      
    </button>);

}