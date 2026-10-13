import React from 'react';
import { cn } from '../../../utils/cn';

interface QuestionLabelProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variant?: 'question' | 'heading';
}

export function QuestionLabel({ value, onChange, placeholder = 'Untitled question', variant = 'question' }: QuestionLabelProps) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={variant === 'heading' ? 'Section title' : 'Question label'}
      className={cn(
        'w-full bg-transparent tracking-tight text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-50 dark:placeholder:text-slate-600',
        variant === 'heading' ? 'text-2xl font-semibold' : 'text-[17px] font-medium'
      )} />);


}