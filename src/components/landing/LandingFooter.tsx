import React from 'react';
import { BrandMark } from './BrandMark';

export function LandingFooter() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 py-10 text-sm text-slate-500 md:flex-row">
        <div className="flex items-center gap-4">
          <BrandMark showVersion={false} />
          <span>© 2026 FORMILERA</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1 text-xs text-emerald-300">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Opérationnel
          </span>
          <span>Conçu avec passion à Madagascar 🇲🇬</span>
        </div>
      </div>
    </footer>);

}