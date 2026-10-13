import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Check } from 'lucide-react';
import { cn } from '../../utils/cn';
import { springSnappy } from '../../utils/motion';

interface UnderlineFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  autoComplete?: string;
  valid?: boolean;
  error?: string | null;
  multiline?: boolean;
  maxLength?: number;
  leading?: React.ReactNode;
  hint?: React.ReactNode;
}

export function UnderlineField(props: UnderlineFieldProps) {
  const { id, label, value, onChange, onBlur, placeholder, type = 'text', inputMode, autoComplete, valid, error, multiline, maxLength, leading, hint } = props;
  const errorId = `${id}-error`;
  const shared = {
    id,
    value,
    placeholder,
    onBlur,
    maxLength,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? errorId : undefined,
    className: cn(
      'peer w-full min-w-0 border-0 bg-transparent pb-2.5 pt-1 text-[17px] text-[#E6EDF3] outline-none placeholder:text-slate-600',
      multiline && 'resize-none leading-relaxed'
    )
  };

  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
        {label}
      </label>
      <div className="relative flex items-end gap-3">
        {leading}
        <div className="relative flex-1">
          {multiline ?
          <textarea {...shared} rows={3} onChange={(e) => onChange(e.target.value)} /> :

          <input {...shared} type={type} inputMode={inputMode} autoComplete={autoComplete} onChange={(e) => onChange(e.target.value)} className={cn(shared.className, 'pr-7')} />
          }
          <span className={cn('absolute inset-x-0 bottom-0 h-px', error ? 'bg-rose-400/50' : 'bg-white/10')} aria-hidden="true" />
          <span
            aria-hidden="true"
            className={cn(
              'absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-300 ease-out peer-focus:scale-x-100',
              error ? 'bg-rose-400' : 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.9)]'
            )} />
          
          {!multiline &&
          <span className="absolute bottom-3 right-0">
              <AnimatePresence>
                {valid && !error &&
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={springSnappy} className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400/15">
                    <Check className="h-3 w-3 text-emerald-300" strokeWidth={3} aria-label="Valide" />
                  </motion.span>
              }
              </AnimatePresence>
            </span>
          }
        </div>
      </div>
      <div className="mt-2 flex min-h-[18px] items-start justify-between gap-3 text-xs">
        <AnimatePresence mode="wait">
          {error ?
          <motion.p key="error" id={errorId} role="alert" initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-rose-300">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> {error}
            </motion.p> :

          <span key="hint" className="text-slate-600">{hint}</span>
          }
        </AnimatePresence>
        {maxLength && <span className="font-mono tabular-nums text-slate-600">{value.length}/{maxLength}</span>}
      </div>
    </div>);

}