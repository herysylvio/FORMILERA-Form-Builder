import React, { useId, useState } from 'react';
import { QuestionLabel } from './QuestionLabel';
import { getCatalogItem } from '../../../utils/blocks';
import { cn } from '../../../utils/cn';
import type { FormBlock } from '../../../types/form';

interface TextFieldBlockProps {
  block: FormBlock;
  onChange: (patch: Partial<FormBlock>) => void;
}

const INPUT_TYPES: Partial<Record<FormBlock['type'], string>> = {
  email: 'email',
  phone: 'tel',
  number: 'number'
};

export function TextFieldBlock({ block, onChange }: TextFieldBlockProps) {
  const id = useId();
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const item = getCatalogItem(block.type);
  const Icon = item.icon;
  const placeholder = block.placeholder ?? item.defaultPlaceholder ?? 'Votre réponse';
  const floated = focused || value.length > 0;
  const multiline = block.type === 'longText';

  const fieldClass = cn(
    'peer w-full rounded-xl border bg-white/70 pl-11 pr-4 text-sm text-slate-900 outline-none backdrop-blur-md transition-[border-color,box-shadow,background-color] duration-200',
    'border-slate-200 hover:border-slate-300 focus:border-indigo-500/50 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.12),0_0_20px_6px_rgba(99,102,241,0.10)]',
    'dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] dark:hover:border-white/[0.14]',
    multiline ? 'min-h-[112px] resize-none pb-3 pt-7' : 'h-14 pt-4'
  );

  return (
    <div className="space-y-3">
      <QuestionLabel value={block.label} onChange={(label) => onChange({ label })} />
      <div className="relative">
        <Icon
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute left-4 h-4 w-4 transition-colors',
            multiline ? 'top-[18px]' : 'top-1/2 -translate-y-1/2',
            floated ? 'text-indigo-500 dark:text-indigo-300' : 'text-slate-400 dark:text-slate-500'
          )} />
        
        <label
          htmlFor={id}
          className={cn(
            'pointer-events-none absolute left-11 transition-all duration-200',
            floated ?
            'top-2 rounded-md bg-indigo-500/10 px-1.5 py-px font-mono text-[10px] uppercase tracking-[0.1em] text-indigo-600 dark:text-indigo-300' :
            multiline ?
            'top-4 text-sm text-slate-400 dark:text-slate-500' :
            'top-1/2 -translate-y-1/2 text-sm text-slate-400 dark:text-slate-500'
          )}>
          
          {placeholder}
        </label>
        {multiline ?
        <textarea
          id={id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={fieldClass} /> :


        <input
          id={id}
          type={INPUT_TYPES[block.type] ?? 'text'}
          inputMode={block.type === 'date' ? 'numeric' : undefined}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={fieldClass} />

        }
      </div>
    </div>);

}