import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Play, Users } from 'lucide-react';

interface HeroSectionProps {
  onStart: () => void;
  onDemo: () => void;
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, type: 'spring' as const, stiffness: 220, damping: 26 }
});

export function HeroSection({ onStart, onDemo }: HeroSectionProps) {
  return (
    <section className="relative px-6 pb-10 pt-20 text-center sm:pt-28">
      <motion.div {...fadeUp(0)} className="flex justify-center">
        <span className="relative inline-flex overflow-hidden rounded-full p-px">
          <span
            aria-hidden="true"
            className="absolute inset-[-200%] animate-[spin_5s_linear_infinite]"
            style={{ background: 'conic-gradient(from 0deg, transparent 0%, #6366F1 15%, #10B981 30%, transparent 45%)' }} />
          
          <span className="relative inline-flex items-center gap-2 rounded-full bg-[#0D1222] px-4 py-1.5 text-xs text-slate-300 sm:text-[13px]">
            <span aria-hidden="true">✨</span>
            <span className="font-medium text-white">Nouvelle Génération</span>
            <span className="text-slate-600">·</span>
            Générateur IA Prompt-to-Form intégré
          </span>
        </span>
      </motion.div>

      <motion.h1 {...fadeUp(0.08)} className="mx-auto mt-8 max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
        Créez des formulaires vivants.{' '}
        <span className="text-white">Pas des corvées.</span>
      </motion.h1>

      <motion.p {...fadeUp(0.16)} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
        L'aisance d'écriture de Notion, l'engagement immersif de Typeform. Multipliez vos taux de réponse par 3 grâce à une expérience interactive pensée pour l'Afrique et Madagascar.
      </motion.p>

      <motion.div {...fadeUp(0.24)} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onStart}
          className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-gradient-to-b from-[#7476F5] to-[#5254E8] px-7 text-[15px] font-semibold text-white shadow-[0_0_0_1px_rgba(165,180,252,0.45),0_4px_0_0_#3730A3,0_16px_40px_-10px_rgba(99,102,241,0.8)] transition-[transform,box-shadow] duration-100 active:translate-y-[3px] active:shadow-[0_0_0_1px_rgba(165,180,252,0.45),0_1px_0_0_#3730A3,0_8px_24px_-10px_rgba(99,102,241,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0E1A]">
          
          Commencer gratuitement
          <span className="rounded-md bg-white/15 px-1.5 font-mono text-xs transition-transform group-hover:translate-x-0.5" aria-hidden="true">↵</span>
        </button>
        <button
          type="button"
          onClick={onDemo}
          className="inline-flex h-12 items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-6 text-[15px] font-medium text-slate-200 backdrop-blur-xl transition hover:border-white/25 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60">
          
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
            <Play className="h-3 w-3 fill-current" aria-hidden="true" />
          </span>
          Explorer la démo interactive <span aria-hidden="true">🗂️</span>
        </button>
      </motion.div>

      <motion.p {...fadeUp(0.32)} className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-slate-500">
        <span className="inline-flex items-center gap-2">
          <Users className="h-4 w-4 text-indigo-300" aria-hidden="true" />
          Déjà adopté par <span className="font-semibold text-slate-200">+500</span> créateurs, écoles et entreprises locales
        </span>
        <span className="hidden text-slate-700 sm:inline">·</span>
        <span className="inline-flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-emerald-300" aria-hidden="true" />
          100% sans carte bancaire requise
        </span>
      </motion.p>
    </section>);

}