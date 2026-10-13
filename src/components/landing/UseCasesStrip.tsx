import React from 'react';
import { motion } from 'framer-motion';
import { useCases } from '../../data/landing';

export function UseCasesStrip() {
  return (
    <section id="cas-usage" aria-labelledby="cas-usage-title" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-10">
      <p id="cas-usage-title" className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
        Cas d’usage — pensé pour celles et ceux qui collectent
      </p>
      <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
        {useCases.map((u, i) =>
        <motion.li
          key={u.label}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:text-white">
          
            <span aria-hidden="true">{u.emoji}</span> {u.label}
          </motion.li>
        )}
      </ul>
    </section>);

}