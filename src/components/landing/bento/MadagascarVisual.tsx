import React from 'react';
import { motion } from 'framer-motion';

const PAYMENTS = [
{ name: 'MVola', dot: 'bg-yellow-400' },
{ name: 'Orange Money', dot: 'bg-orange-400' },
{ name: 'Airtel Money', dot: 'bg-rose-400' }];


export function MadagascarVisual() {
  return (
    <div className="mt-6">
      <div className="rounded-2xl border border-white/[0.08] bg-slate-900/60 p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-3xl font-bold tracking-tight text-white">0.8s</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-emerald-300">Réseau 3G</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            className="h-full rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }} />
          
        </div>
        <dl className="mt-3 grid grid-cols-2 gap-2 font-mono text-[10px] text-slate-500">
          <div><dt>Poids de page</dt><dd className="text-sm text-slate-200">38 KB</dd></div>
          <div><dt>Mode hors-ligne</dt><dd className="text-sm text-slate-200">Brouillons</dd></div>
        </dl>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {PAYMENTS.map((p) =>
        <span key={p.name} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-slate-300">
            <span className={`h-1.5 w-1.5 rounded-full ${p.dot}`} aria-hidden="true" /> {p.name}
          </span>
        )}
        <span className="rounded-full bg-indigo-500/10 px-2 py-1 font-mono text-[10px] text-indigo-200">Bientôt</span>
      </div>
    </div>);

}