import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, CornerDownLeft, ListChecks, Smartphone, Sparkles, Star, Type } from 'lucide-react';
import { aiPromptExample } from '../../data/landing';
import { useTypewriter } from '../../hooks/useTypewriter';
import { cn } from '../../utils/cn';
import { springSnappy } from '../../utils/motion';

const SLASH_ITEMS = [
{ icon: Type, label: 'Short Text' },
{ icon: ListChecks, label: 'Multi-Choice', active: true },
{ icon: Star, label: 'Star Rating' },
{ icon: Smartphone, label: 'Mobile Money' }];


const OPTIONS = ['Réseaux sociaux', 'Bouche-à-oreille', 'Google Maps'];

function EditorPreview() {
  return (
    <div className="relative bg-[#0B0F1C] p-5 sm:p-7">
      <div className="relative h-16 overflow-hidden rounded-xl bg-[#11163A]" aria-hidden="true">
        <div className="absolute -left-6 -top-8 h-28 w-28 rounded-full bg-indigo-500/50 blur-2xl" />
        <div className="absolute right-0 top-0 h-24 w-40 rounded-full bg-violet-500/40 blur-2xl" />
        <div className="absolute -bottom-10 left-1/3 h-20 w-40 rounded-full bg-emerald-400/25 blur-2xl" />
      </div>
      <span className="-mt-5 ml-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-900 text-lg shadow-lg" aria-hidden="true">🌿</span>
      <p className="mt-3 text-lg font-semibold tracking-tight text-white">Avis Clients — Le Jardin Tana</p>
      <p className="mt-1 text-xs text-slate-500">Partagez votre expérience en 2 minutes.</p>

      <div className="mt-5 space-y-2">
        <div className="rounded-xl px-3 py-2.5">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-600">Texte court</p>
          <p className="mt-1 text-[13px] font-medium text-slate-200">Comment vous appelez-vous ?</p>
          <div className="mt-2 h-8 rounded-lg border border-white/[0.08] bg-white/[0.03]" />
        </div>
        <div className="relative rounded-xl border border-indigo-500/25 bg-indigo-500/[0.05] px-3 py-2.5">
          <span className="absolute bottom-2 left-0 top-2 w-[2px] rounded-full bg-[#6366F1] shadow-[0_0_10px_2px_rgba(99,102,241,0.6)]" />
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-indigo-300/80">Note</p>
          <p className="mt-1 text-[13px] font-medium text-white">Qualité du service</p>
          <div className="mt-1.5 flex gap-0.5">
            {[1, 2, 3, 4, 5].map((n) =>
            <Star key={n} className={cn('h-4 w-4', n <= 4 ? 'fill-amber-300 text-amber-300' : 'text-white/15')} strokeWidth={1.5} />
            )}
          </div>
        </div>
        <div className="relative px-3 py-1.5">
          <div className="flex items-center gap-1 text-[13px]">
            <span className="font-mono text-indigo-300">/</span>
            <span className="h-4 w-px animate-pulse bg-indigo-400" />
          </div>
          <div className="absolute left-3 top-full z-10 mt-1 w-52 rounded-xl border border-white/10 bg-slate-900/95 p-1.5 shadow-2xl backdrop-blur-xl">
            <p className="px-2 pb-1 pt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">Questions</p>
            {SLASH_ITEMS.map(({ icon: Icon, label, active }) =>
            <div key={label} className={cn('flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12px]', active ? 'bg-white/[0.07] text-white' : 'text-slate-400')}>
                <span className={cn('flex h-5 w-5 items-center justify-center rounded-md border', active ? 'border-indigo-400/40 bg-indigo-500/15 text-indigo-300' : 'border-white/10')}>
                  <Icon className="h-3 w-3" />
                </span>
                <span className="flex-1">{label}</span>
                {active && <CornerDownLeft className="h-3 w-3 text-slate-500" />}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-28" />
    </div>);

}

function ResponderPreview() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="relative overflow-hidden bg-[#0B0F19] p-5 sm:p-7">
      <div className="pointer-events-none absolute -right-16 -top-10 h-56 w-56 rounded-full bg-violet-600/25 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-cyan-500/15 blur-3xl" aria-hidden="true" />
      <div className="relative">
        <div className="flex items-center justify-between font-mono text-[10px] text-slate-500">
          <span>Question 3 of 7</span>
          <span>42% · ~2 min</span>
        </div>
        <div className="mt-2 h-[2px] rounded-full bg-white/[0.06]">
          <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-violet-500 via-indigo-400 to-cyan-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]" />
        </div>
        <span className="mt-8 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-slate-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" /> 03 / 07
        </span>
        <p className="mt-4 text-xl font-medium leading-snug tracking-tight text-white">Comment avez-vous connu notre restaurant ?</p>
        <p className="mt-1.5 text-xs text-slate-400">Choisissez une option — ou appuyez sur A, B, C.</p>
        <div className="mt-5 space-y-2" role="radiogroup" aria-label="Aperçu des options">
          {OPTIONS.map((o, i) => {
            const on = selected === i;
            return (
              <motion.button
                key={o}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setSelected(i)}
                whileHover={{ scale: 1.01 }}
                transition={springSnappy}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-[13px] transition-colors',
                  on ? 'border-indigo-400/70 bg-indigo-500/[0.12] text-white shadow-[0_0_24px_-6px_rgba(99,102,241,0.7)]' : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25'
                )}>
                
                <span className={cn('flex h-6 w-6 items-center justify-center rounded-md font-mono text-[11px] font-semibold', on ? 'bg-[#6366F1] text-white shadow-[0_0_12px_rgba(99,102,241,0.8)]' : 'bg-white/[0.08] text-white')}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{o}</span>
                <span className={cn('flex h-4 w-4 items-center justify-center rounded-full border', on ? 'border-indigo-300 bg-[#6366F1]' : 'border-white/20')}>
                  {on && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
                </span>
              </motion.button>);

          })}
        </div>
        <div className="mt-6 flex justify-end">
          <span className="inline-flex h-9 items-center gap-2 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#6366F1] px-4 text-xs font-semibold text-white shadow-[0_8px_24px_-6px_rgba(99,102,241,0.7)]">
            Continuer <span className="font-mono">↵</span>
          </span>
        </div>
      </div>
    </div>);

}

export function ProductShowcase() {
  const typed = useTypewriter(aiPromptExample);

  return (
    <section id="modes" aria-label="Aperçu du produit" className="relative mx-auto max-w-6xl scroll-mt-24 px-4 pb-24 sm:px-6">
      <div className="pointer-events-none absolute inset-x-10 top-10 h-[70%] rounded-full bg-indigo-600/20 blur-[100px]" aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, rotateX: 20, scale: 0.94 }}
        whileInView={{ opacity: 1, rotateX: 6, scale: 1 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1800 }}
        className="relative origin-top">
        
        <div className="absolute -inset-3 -z-10 rounded-[28px] border border-white/[0.05] bg-white/[0.015]" aria-hidden="true" />
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 shadow-[0_60px_160px_-40px_rgba(99,102,241,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
          <div className="flex h-10 items-center gap-3 border-b border-white/[0.06] px-4">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </div>
            <span className="mx-auto rounded-md bg-white/[0.04] px-3 py-0.5 font-mono text-[10px] text-slate-500">formilera.app/f/jardin-tana</span>
            <span className="hidden gap-1 font-mono text-[10px] sm:flex">
              <span className="rounded bg-white/[0.08] px-1.5 py-0.5 text-slate-200">Éditeur</span>
              <span className="px-1.5 py-0.5 text-slate-500">Aperçu</span>
            </span>
          </div>
          <div className="grid gap-px bg-white/[0.06] md:grid-cols-[1.1fr_1fr]">
            <EditorPreview />
            <ResponderPreview />
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 -mt-7 flex justify-center px-2">
        <div className="flex w-full max-w-[620px] items-center gap-3 rounded-full border border-indigo-500/30 bg-slate-900/85 py-2 pl-4 pr-2 shadow-[0_8px_32px_rgba(99,102,241,0.3),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
          <span className="relative flex h-7 w-7 shrink-0 items-center justify-center" aria-hidden="true">
            <span className="absolute inset-0 animate-ping rounded-full bg-indigo-500/25 [animation-duration:2.4s]" />
            <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/30">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
          </span>
          <p className="min-w-0 flex-1 truncate text-[13px] text-slate-200" aria-label={`Exemple de prompt : ${aiPromptExample}`}>
            <span aria-hidden="true">⚡ {typed}</span>
            <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-indigo-300" aria-hidden="true" />
          </p>
          <span className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-3.5 text-xs font-semibold text-white shadow-[0_0_18px_-2px_rgba(139,92,246,0.7)]">
            Générer <CornerDownLeft className="h-3 w-3" />
          </span>
        </div>
      </div>
    </section>);

}