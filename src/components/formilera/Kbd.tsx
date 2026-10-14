import React from 'react';

export function Kbd({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd className={`inline-flex items-center rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-slate-300 ${className}`}>
      {children}
    </kbd>
  );
}
