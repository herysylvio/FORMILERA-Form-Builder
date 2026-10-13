import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { aiGeneratedBlocks, aiPromptExample } from '../../../data/landing';

export function PromptToFormVisual() {
  const [run, setRun] = useState(0);

  return (
    <div className="mt-8 grid items-center gap-4 sm:grid-cols-[1fr_auto_1.2fr]">
      <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-medium text-indigo-200">
            <Sparkles className="h-3 w-3" aria-hidden="true" /> Gemini AI
          </span>
          <span className="font-mono text-[10px] text-emerald-300">4.8s</span>
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-slate-200">“{aiPromptExample}”</p>
        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-slate-400 transition hover:border-white/25 hover:text-white">
          
          <RotateCcw className="h-3 w-3" aria-hidden="true" /> Rejouer
        </button>
      </div>

      <ArrowRight className="mx-auto h-5 w-5 rotate-90 text-indigo-300 sm:rotate-0" aria-hidden="true" />

      <ol key={run} className="space-y-1.5" aria-label="Blocs générés">
        {aiGeneratedBlocks.map((b, i) =>
        <motion.li
          key={b.label}
          initial={{ opacity: 0, x: 16, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 + i * 0.12, type: 'spring', stiffness: 260, damping: 26 }}
          className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2">
          
            <span className="w-20 shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-indigo-300/80">{b.type}</span>
            <span className="truncate text-[12px] text-slate-200">{b.label}</span>
          </motion.li>
        )}
      </ol>
    </div>);

}