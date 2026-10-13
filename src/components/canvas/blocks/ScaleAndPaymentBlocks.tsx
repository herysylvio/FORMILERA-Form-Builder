import React, { useState } from 'react';
import { QuestionLabel } from './QuestionLabel';
import { cn } from '../../../utils/cn';
import type { FormBlock } from '../../../types/form';

interface BlockProps {
  block: FormBlock;
  onChange: (patch: Partial<FormBlock>) => void;
}

export function NpsBlock({ block, onChange }: BlockProps) {
  const [value, setValue] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      <QuestionLabel value={block.label} onChange={(label) => onChange({ label })} />
      <div role="radiogroup" aria-label={block.label} className="grid grid-cols-6 gap-1.5 sm:grid-cols-11">
        {Array.from({ length: 11 }, (_, n) =>
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          onClick={() => setValue(n)}
          className={cn(
            'h-10 rounded-lg border font-mono text-sm transition-[border-color,background-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50',
            value === n ?
            'border-indigo-500/60 bg-[#6366F1] text-white shadow-[0_0_16px_-2px_rgba(99,102,241,0.7)]' :
            'border-slate-200 bg-white/60 text-slate-600 hover:border-slate-300 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-slate-300 dark:hover:border-white/[0.16]'
          )}>
          
            {n}
          </button>
        )}
      </div>
      <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500">
        <span>Pas du tout probable</span>
        <span>Très probable</span>
      </div>
    </div>);

}

const PROVIDERS = [
{ id: 'orange', name: 'Orange Money', dot: 'bg-orange-400' },
{ id: 'mtn', name: 'MTN MoMo', dot: 'bg-yellow-400' },
{ id: 'wave', name: 'Wave', dot: 'bg-sky-400' }];


export function PaymentBlock({ block, onChange }: BlockProps) {
  const [provider, setProvider] = useState('orange');
  return (
    <div className="space-y-4">
      <QuestionLabel value={block.label} onChange={(label) => onChange({ label })} />
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-semibold tracking-tight tabular-nums text-slate-900 dark:text-white">15 000</span>
        <span className="font-mono text-xs text-slate-500">FCFA</span>
      </div>
      <div role="radiogroup" aria-label="Mobile Money provider" className="flex flex-wrap gap-2">
        {PROVIDERS.map((p) =>
        <button
          key={p.id}
          type="button"
          role="radio"
          aria-checked={provider === p.id}
          onClick={() => setProvider(p.id)}
          className={cn(
            'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition',
            provider === p.id ?
            'border-indigo-500/50 bg-indigo-500/10 text-slate-900 dark:text-white' :
            'border-slate-200 text-slate-600 hover:border-slate-300 dark:border-white/[0.08] dark:text-slate-300 dark:hover:border-white/[0.16]'
          )}>
          
            <span className={cn('h-2 w-2 rounded-full', p.dot)} aria-hidden="true" />
            {p.name}
          </button>
        )}
      </div>
      <input
        type="tel"
        aria-label="Mobile Money number"
        placeholder="+225 07 00 00 00 00"
        className="h-12 w-full rounded-xl border border-slate-200 bg-white/70 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500/50 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.12)] dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-100 dark:placeholder:text-slate-500" />
      
    </div>);

}