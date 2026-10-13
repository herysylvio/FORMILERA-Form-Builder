import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Braces, Check, Download } from 'lucide-react';
import { cn } from '../../../utils/cn';

const ROWS = [
{ id: 'SUB-849', name: 'Aminata Diallo', status: 'Complet', nps: 10 },
{ id: 'SUB-848', name: 'Hery Rakotomalala', status: 'Complet', nps: 9 },
{ id: 'SUB-847', name: 'Lucas Martin', status: 'Partiel', nps: null },
{ id: 'SUB-846', name: 'Fatou Ndiaye', status: 'Complet', nps: 10 }];


export function AnalyticsVisual() {
  const [count, setCount] = useState(1284);
  const [exported, setExported] = useState<'csv' | 'json' | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => setCount((c) => c + 1 + Math.floor(Math.random() * 2)), 2600);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!exported) return;
    const t = window.setTimeout(() => setExported(null), 1600);
    return () => window.clearTimeout(t);
  }, [exported]);

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/50">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="relative inline-flex h-6 overflow-hidden text-lg font-semibold tabular-nums text-white">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={count} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: 0.15 }}>
                {count.toLocaleString('en-US')}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="text-xs text-slate-500">réponses en direct</span>
        </div>
        <div className="flex gap-1.5">
          <button type="button" onClick={() => setExported('json')} className="inline-flex h-7 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 text-[11px] text-slate-200 transition hover:bg-white/[0.08]">
            {exported === 'json' ? <Check className="h-3 w-3 text-emerald-300" /> : <Braces className="h-3 w-3" />} JSON
          </button>
          <button type="button" onClick={() => setExported('csv')} className="inline-flex h-7 items-center gap-1.5 rounded-lg bg-white px-2.5 text-[11px] font-semibold text-slate-900 transition hover:bg-slate-100">
            {exported === 'csv' ? <Check className="h-3 w-3 text-emerald-600" /> : <Download className="h-3 w-3" />} CSV
          </button>
        </div>
      </div>
      <table className="w-full text-left text-[12px]">
        <thead>
          <tr className="font-mono text-[9px] uppercase tracking-[0.12em] text-slate-500">
            <th scope="col" className="px-4 py-2 font-medium">ID</th>
            <th scope="col" className="px-2 py-2 font-medium">Nom</th>
            <th scope="col" className="px-2 py-2 font-medium">Statut</th>
            <th scope="col" className="px-4 py-2 text-right font-medium">NPS</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) =>
          <tr key={r.id} className="border-t border-slate-800/80 transition-colors hover:bg-white/[0.02]">
              <td className="px-4 py-2.5 font-mono text-slate-400">#{r.id}</td>
              <td className="px-2 py-2.5 font-semibold text-slate-100">{r.name}</td>
              <td className="px-2 py-2.5">
                <span className={cn('rounded-full px-2 py-0.5 text-[10px]', r.status === 'Complet' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-amber-500/10 text-amber-300')}>{r.status}</span>
              </td>
              <td className="px-4 py-2.5 text-right font-mono text-slate-300">{r.nps ?? '—'}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>);

}