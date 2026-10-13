import React from 'react';
import { LogoMark } from '../formilera/Logo';

export function BrandMark({ showVersion = true }: {showVersion?: boolean;}) {
  return (
    <span className="flex items-center gap-2">
      <LogoMark size="sm" />
      <span className="text-[12px] font-bold tracking-[0.2em] text-white">FORMILERA</span>
      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-60" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-[#6366F1] shadow-[0_0_8px_2px_rgba(99,102,241,0.8)]" />
      </span>
      {showVersion &&
      <span className="rounded-md border border-indigo-400/30 bg-indigo-500/10 px-1.5 py-px font-mono text-[10px] font-semibold text-indigo-200">2.0</span>
      }
    </span>);

}