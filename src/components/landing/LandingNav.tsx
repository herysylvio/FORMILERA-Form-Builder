import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { BrandMark } from './BrandMark';
import { navLinks } from '../../data/landing';
import { springSoft } from '../../utils/motion';

interface LandingNavProps {
  onNavigate: (target: string) => void;
  onStart: () => void;
}

export function LandingNav({ onNavigate, onStart }: LandingNavProps) {
  const [open, setOpen] = useState(false);
  const go = (target: string) => {
    setOpen(false);
    onNavigate(target);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0A0E1A]/60 backdrop-blur-2xl">
      <nav aria-label="Navigation principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="FORMILERA — accueil" className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60">
          <BrandMark />
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) =>
          <li key={l.target}>
              <button
              type="button"
              onClick={() => go(l.target)}
              className="rounded-full px-3.5 py-1.5 text-sm text-slate-400 transition-[color,background-color,text-shadow] duration-200 hover:bg-white/[0.04] hover:text-white hover:[text-shadow:0_0_14px_rgba(129,140,248,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60">
              
                {l.label}
              </button>
            </li>
          )}
        </ul>

        <div className="flex items-center gap-2">
          <button type="button" onClick={onStart} className="hidden px-3 py-1.5 text-sm text-slate-400 transition-colors hover:text-white sm:block">
            Se connecter
          </button>
          <button
            type="button"
            onClick={onStart}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#6366F1] px-4 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(165,180,252,0.5),0_0_24px_-4px_rgba(99,102,241,0.8)] transition hover:bg-[#7376F3] hover:shadow-[0_0_0_1px_rgba(199,210,254,0.6),0_0_32px_-2px_rgba(99,102,241,0.9)] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300">
            
            Créer un formulaire <span aria-hidden="true">⚡</span>
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-300 hover:bg-white/[0.06] md:hidden">
            
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open &&
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={springSoft}
          className="overflow-hidden border-t border-white/[0.06] px-6 md:hidden">
          
            {navLinks.map((l) =>
          <li key={l.target}>
                <button type="button" onClick={() => go(l.target)} className="w-full py-3 text-left text-sm text-slate-300">
                  {l.label}
                </button>
              </li>
          )}
            <li>
              <button type="button" onClick={onStart} className="w-full py-3 text-left text-sm text-slate-500">Se connecter</button>
            </li>
          </motion.ul>
        }
      </AnimatePresence>
    </header>);

}