import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PillToggle } from '../../PillToggle';
import { FileText, LayoutGrid } from 'lucide-react';

type Mode = 'document' | 'card';

export function ResponseModesVisual() {
  const [mode, setMode] = useState<Mode>('document');
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setMode((m) => m === 'document' ? 'card' : 'document'), 3200);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div className="mt-6" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <PillToggle<Mode>
        ariaLabel="Mode de réponse"
        layoutId="bento-mode"
        value={mode}
        onChange={setMode}
        options={[
        { value: 'document', label: 'Document', icon: FileText },
        { value: 'card', label: 'Cartes', icon: LayoutGrid }]
        } />
      
      <div className="relative mt-4 h-44 overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/60 p-4">
        <AnimatePresence mode="wait">
          {mode === 'document' ?
          <motion.div key="doc" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-2.5">
              {[0.55, 1, 0.55].map((o, i) =>
            <div key={i} style={{ opacity: o }} className={i === 1 ? 'rounded-xl border border-indigo-400/30 bg-indigo-500/[0.06] p-2.5' : 'p-2.5'}>
                  <div className="h-2 w-2/3 rounded-full bg-white/30" />
                  <div className="mt-2 h-px w-full bg-white/15" />
                </div>
            )}
            </motion.div> :

          <motion.div key="card" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} className="flex h-full flex-col justify-center">
              <span className="w-fit rounded-full bg-white/[0.06] px-2 py-0.5 font-mono text-[9px] text-slate-400">03 / 07</span>
              <div className="mt-2 h-2.5 w-4/5 rounded-full bg-white/40" />
              <div className="mt-3 space-y-1.5">
                {['A', 'B'].map((l, i) =>
              <div key={l} className={`flex items-center gap-2 rounded-lg border px-2 py-1.5 ${i === 0 ? 'border-indigo-400/60 bg-indigo-500/10' : 'border-white/10'}`}>
                    <span className={`flex h-4 w-4 items-center justify-center rounded font-mono text-[8px] ${i === 0 ? 'bg-[#6366F1] text-white' : 'bg-white/10 text-white'}`}>{l}</span>
                    <span className="h-1.5 w-1/2 rounded-full bg-white/20" />
                  </div>
              )}
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>);

}