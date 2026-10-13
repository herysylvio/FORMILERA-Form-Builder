import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Minus } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { SpringSwitch } from '../SpringSwitch';
import { comparisonRows, type ComparisonValue } from '../../data/landing';
import { cn } from '../../utils/cn';

function Cell({ value, highlight = false }: {value: ComparisonValue;highlight?: boolean;}) {
  if (value === true)
  return (
    <span className={cn('inline-flex h-6 w-6 items-center justify-center rounded-full', highlight ? 'bg-[#6366F1] text-white shadow-[0_0_14px_rgba(99,102,241,0.7)]' : 'bg-white/[0.06] text-slate-300')}>
        <Check className="h-3.5 w-3.5" strokeWidth={3} aria-label="Oui" />
      </span>);

  if (value === false) return <Minus className="mx-auto h-4 w-4 text-slate-700" aria-label="Non" />;
  return <span className={cn('text-[13px]', highlight ? 'font-semibold text-indigo-100' : 'text-slate-400')}>{value}</span>;
}

export function ComparisonTable() {
  const [diffOnly, setDiffOnly] = useState(false);
  const visibleRows = diffOnly ? comparisonRows.filter((r) => r.google !== r.formilera || r.typeform !== r.formilera) : comparisonRows;

  return (
    <section aria-labelledby="comparaison" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading eyebrow="Comparatif" title="Face aux solutions traditionnelles" description="Le meilleur des deux mondes, sans le prix d’un outil pensé pour la Silicon Valley." />

      <div className="mt-10 flex justify-end">
        <label className="inline-flex cursor-pointer items-center gap-2.5 text-xs text-slate-400">
          Afficher uniquement les différences
          <SpringSwitch label="Afficher uniquement les différences" checked={diffOnly} onCheckedChange={setDiffOnly} />
        </label>
      </div>

      <div className="mt-4 overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.015]">
        <table className="w-full min-w-[640px] text-left">
          <caption id="comparaison" className="sr-only">Comparaison FORMILERA, Google Forms et Typeform</caption>
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th scope="col" className="px-6 py-5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">Fonctionnalités</th>
              <th scope="col" className="px-4 py-5 text-center">
                <p className="text-sm font-semibold text-slate-200">Google Forms</p>
                <p className="mt-0.5 text-[11px] text-slate-500">Austère</p>
              </th>
              <th scope="col" className="px-4 py-5 text-center">
                <p className="text-sm font-semibold text-slate-200">Typeform</p>
                <p className="mt-0.5 text-[11px] text-slate-500">Très cher</p>
              </th>
              <th scope="col" className="relative bg-indigo-500/[0.07] px-4 py-5 text-center">
                <span className="absolute inset-x-0 top-0 h-px bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.9)]" aria-hidden="true" />
                <p className="text-sm font-bold tracking-wide text-white">FORMILERA</p>
                <p className="mt-0.5 text-[11px] text-indigo-300">Moderne · Abordable · IA native</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((r) =>
            <motion.tr layout key={r.feature} className="group border-b border-white/[0.04] transition-colors last:border-0 hover:bg-white/[0.02]">
                <th scope="row" className="px-6 py-4 text-[14px] font-medium text-slate-300 group-hover:text-white">{r.feature}</th>
                <td className="px-4 py-4 text-center"><Cell value={r.google} /></td>
                <td className="px-4 py-4 text-center"><Cell value={r.typeform} /></td>
                <td className="bg-indigo-500/[0.07] px-4 py-4 text-center"><Cell value={r.formilera} highlight /></td>
              </motion.tr>
            )}
          </tbody>
        </table>
      </div>
    </section>);

}