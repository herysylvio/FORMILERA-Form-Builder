import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { countries } from '../../data/registrationForm';
import { getCountry } from '../../utils/registration';
import { springSoft } from '../../utils/motion';

interface CountrySelectProps {
  value: string;
  onChange: (code: string) => void;
}

export function CountrySelect({ value, onChange }: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = getCountry(value);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative mb-1.5 shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Indicatif : ${current.name} ${current.dial}`}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] pl-2 pr-2 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60">
        
        <span className="text-base leading-none" aria-hidden="true">{current.flag}</span>
        <span className="font-mono text-[13px] tabular-nums">{current.dial}</span>
        <ChevronDown className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open &&
        <motion.ul
          role="listbox"
          aria-label="Pays"
          initial={{ opacity: 0, y: -4, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.98 }}
          transition={springSoft}
          className="absolute left-0 top-full z-30 mt-2 w-60 origin-top-left rounded-xl border border-white/10 bg-[#161B22]/95 p-1 shadow-[0_16px_48px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          
            {countries.map((c) =>
          <li key={c.code}>
                <button
              type="button"
              role="option"
              aria-selected={c.code === value}
              onClick={() => {onChange(c.code);setOpen(false);}}
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-slate-200 transition-colors hover:bg-white/[0.06]">
              
                  <span className="text-base leading-none" aria-hidden="true">{c.flag}</span>
                  <span className="flex-1">{c.name}</span>
                  <span className="font-mono text-xs text-slate-500">{c.dial}</span>
                  {c.code === value && <Check className="h-3.5 w-3.5 text-indigo-300" aria-hidden="true" />}
                </button>
              </li>
          )}
          </motion.ul>
        }
      </AnimatePresence>
    </div>);

}