import React, { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import { springSoft } from "../utils/motion";
import { BoxIcon } from "lucide-react";
export interface PillToggleOption<T extends string> {
  value: T;
  label?: string;
  icon?: BoxIcon;
  count?: number;
  ariaLabel?: string;
  labelClassName?: string;
}
interface PillToggleProps<T extends string> {
  options: PillToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  layoutId: string;
  ariaLabel: string;
  className?: string;
}
export function PillToggle<T extends string>({
  options,
  value,
  onChange,
  layoutId,
  ariaLabel,
  className
}: PillToggleProps<T>) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (index + (e.key === 'ArrowRight' ? 1 : -1) + options.length) % options.length;
    refs.current[next]?.focus();
    onChange(options[next].value);
  };
  return <div role="tablist" aria-label={ariaLabel} className={cn('relative inline-flex items-center gap-0.5 rounded-full border border-slate-200 bg-slate-100/80 p-1', 'dark:border-white/[0.08] dark:bg-white/[0.04]', className)}>
      {options.map((option, index) => {
      const selected = option.value === value;
      const Icon = option.icon;
      const iconOnly = !option.label;
      return <button key={option.value} ref={(el) => {
        refs.current[index] = el;
      }} type="button" role="tab" aria-selected={selected} aria-label={option.ariaLabel} title={iconOnly ? option.ariaLabel : undefined} tabIndex={selected ? 0 : -1} onClick={() => onChange(option.value)} onKeyDown={(e) => handleKeyDown(e, index)} className={cn('relative inline-flex h-7 items-center gap-1.5 whitespace-nowrap rounded-full text-xs font-medium transition-colors duration-200', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60', iconOnly ? 'w-8 justify-center' : 'px-3', selected ? 'text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200')}>
            {selected && <motion.span layoutId={layoutId} transition={springSoft} className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-slate-200 dark:bg-white/[0.09] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] dark:ring-white/10" />}
            {Icon && <Icon className="relative h-3.5 w-3.5" aria-hidden="true" />}
            {option.label && <span className={cn('relative', option.labelClassName)}>{option.label}</span>}
            {typeof option.count === 'number' && <span className={cn('relative rounded-full px-1.5 font-mono text-[10px] leading-4 tabular-nums', selected ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300' : 'bg-slate-200 text-slate-500 dark:bg-white/[0.06] dark:text-slate-400')}>
                {option.count}
              </span>}
          </button>;
    })}
    </div>;
}