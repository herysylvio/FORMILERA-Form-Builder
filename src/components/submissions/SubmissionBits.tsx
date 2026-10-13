import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Minus, Star } from 'lucide-react';
import { avatarTone, initials } from '../../utils/submissions';
import { cn } from '../../utils/cn';
import { springSnappy } from '../../utils/motion';
import type { Submission } from '../../types/submission';

export function ContactAvatar({ submission, size = 'sm' }: {submission: Submission;size?: 'sm' | 'lg';}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full font-semibold ring-1',
        avatarTone(submission.id),
        size === 'sm' ? 'h-7 w-7 text-[10px]' : 'h-11 w-11 text-sm'
      )}>
      
      {initials(submission.name)}
    </span>);

}

export function StatusBadge({ submission }: {submission: Submission;}) {
  const complete = submission.status === 'complete';
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium',
        complete ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300' : 'border-amber-500/25 bg-amber-500/10 text-amber-300'
      )}>
      
      <span className={cn('h-1.5 w-1.5 rounded-full', complete ? 'bg-emerald-400' : 'bg-amber-400')} aria-hidden="true" />
      {complete ? 'Complet' : 'Partiel'}
      <span className="font-mono text-[10px] opacity-70">{submission.completion}%</span>
    </span>);

}

export function Stars({ value, size = 'sm' }: {value: number;size?: 'sm' | 'md';}) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} sur 5`}>
      {[1, 2, 3, 4, 5].map((n) =>
      <Star
        key={n}
        aria-hidden="true"
        className={cn(
          size === 'sm' ? 'h-3 w-3' : 'h-4 w-4',
          n <= value ? 'fill-amber-300 text-amber-300 drop-shadow-[0_0_4px_rgba(252,211,77,0.5)]' : 'text-slate-700'
        )}
        strokeWidth={1.5} />

      )}
    </span>);

}

export function NpsBadge({ value }: {value: number;}) {
  const tone =
  value >= 9 ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : value >= 7 ? 'border-amber-500/30 bg-amber-500/10 text-amber-300' : 'border-rose-500/30 bg-rose-500/10 text-rose-300';
  return <span className={cn('rounded-md border px-1.5 py-px font-mono text-[10px] font-semibold tabular-nums', tone)}>NPS {value}</span>;
}

interface RowCheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  label: string;
}

export function RowCheckbox({ checked, indeterminate = false, onChange, label }: RowCheckboxProps) {
  const on = checked || indeterminate;
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      className={cn(
        'flex h-4 w-4 items-center justify-center rounded border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60',
        on ? 'border-indigo-400 bg-[#6366F1]' : 'border-slate-600 hover:border-slate-400'
      )}>
      
      <AnimatePresence initial={false}>
        {on &&
        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={springSnappy}>
            {indeterminate ? <Minus className="h-3 w-3 text-white" strokeWidth={3} /> : <Check className="h-3 w-3 text-white" strokeWidth={3} />}
          </motion.span>
        }
      </AnimatePresence>
    </button>);

}

export function Highlight({ text, query }: {text: string;query: string;}) {
  const q = query.trim();
  if (!q) return <>{text}</>;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded-sm bg-indigo-500/30 px-0.5 text-white">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>);

}