import React from 'react';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 font-bold tracking-tight text-white ${className}`}>
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-black text-white shadow-md shadow-indigo-500/25">
        F
      </div>
      <span className="text-sm font-semibold tracking-wide">FORMILERA</span>
    </div>
  );
}
