import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { PillToggle } from '../PillToggle';
import { ANNUAL_DISCOUNT, pricingTiers } from '../../data/landing';
import { formatAriary } from '../../utils/landing';
import { cn } from '../../utils/cn';

type Billing = 'monthly' | 'annual';

interface PricingSectionProps {
  onSelect: () => void;
}

export function PricingSection({ onSelect }: PricingSectionProps) {
  const [billing, setBilling] = useState<Billing>('monthly');

  return (
    <section id="tarifs" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading eyebrow="Tarifs en Ariary" title="Transparents. Accessibles. Sans surprise." description="Commencez gratuitement, évoluez quand vos réponses décollent." />

      <div className="mt-10 flex justify-center">
        <PillToggle<Billing>
          ariaLabel="Facturation"
          layoutId="pricing-billing"
          value={billing}
          onChange={setBilling}
          options={[
          { value: 'monthly', label: 'Facturation Mensuelle' },
          { value: 'annual', label: 'Annuelle (-20%)' }]
          } />
        
      </div>

      <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-3">
        {pricingTiers.map((tier, i) => {
          const price = billing === 'annual' ? Math.round(tier.monthly * (1 - ANNUAL_DISCOUNT)) : tier.monthly;
          return (
            <motion.article
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 200, damping: 26 }}
              className={cn(
                'relative flex flex-col rounded-3xl border p-7 transition-[border-color,box-shadow] duration-300',
                tier.highlighted ?
                'border-indigo-400/60 bg-indigo-500/[0.06] shadow-[0_0_0_1px_rgba(99,102,241,0.3),0_0_64px_-12px_rgba(99,102,241,0.55)] lg:-my-3 lg:py-10' :
                'border-white/10 bg-white/[0.02] hover:border-white/20'
              )}>
              
              {tier.highlighted &&
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#6366F1] px-3 py-1 text-[11px] font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.7)]">
                  Le plus populaire
                </span>
              }
              <h3 className="text-base font-semibold text-white">{tier.name}</h3>
              <p className="mt-1.5 text-sm text-slate-400">{tier.description}</p>
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="relative inline-flex overflow-hidden text-4xl font-bold tracking-tight tabular-nums text-white">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span key={price} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} transition={{ duration: 0.16 }}>
                      {formatAriary(price)}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="text-sm text-slate-500">/ mois</span>
              </div>
              <p className="mt-1 h-4 font-mono text-[11px] text-slate-500">
                {billing === 'annual' && tier.monthly > 0 ? `Facturé ${formatAriary(price * 12)} / an` : tier.monthly === 0 ? 'Pour toujours' : 'Sans engagement'}
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((f) =>
                <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <span className={cn('flex h-5 w-5 shrink-0 items-center justify-center rounded-full', tier.highlighted ? 'bg-indigo-500/20 text-indigo-200' : 'bg-emerald-500/10 text-emerald-300')}>
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {f}
                  </li>
                )}
              </ul>
              <button
                type="button"
                onClick={onSelect}
                className={cn(
                  'mt-8 h-11 rounded-full text-sm font-semibold transition-[transform,background-color,box-shadow] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300',
                  tier.highlighted ?
                  'bg-[#6366F1] text-white shadow-[0_0_0_1px_rgba(165,180,252,0.5),0_8px_28px_-8px_rgba(99,102,241,0.9)] hover:bg-[#7376F3]' :
                  'border border-white/10 bg-white/[0.04] text-slate-200 hover:border-white/25 hover:bg-white/[0.08]'
                )}>
                
                {tier.cta}
              </button>
            </motion.article>);

        })}
      </div>
    </section>);

}