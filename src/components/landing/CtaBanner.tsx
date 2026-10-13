import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CtaBannerProps {
  onStart: () => void;
}

export function CtaBanner({ onStart }: CtaBannerProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ type: 'spring', stiffness: 200, damping: 26 }}
        className="relative overflow-hidden rounded-[32px] border border-white/15 bg-gradient-to-br from-[#4F46E5] via-[#6366F1] to-[#8B5CF6] px-8 py-16 text-center shadow-[0_40px_120px_-30px_rgba(99,102,241,0.7)] sm:px-16">
        
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-emerald-400/40 blur-[90px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-white/20 blur-[90px]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '22px 22px' }}
          aria-hidden="true" />
        
        <div className="relative">
          <h2 className="mx-auto max-w-3xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Prêt à transformer vos formulaires dès aujourd’hui ?
          </h2>
          <p className="mt-4 text-lg text-indigo-100">Commencez en 30 secondes.</p>
          <button
            type="button"
            onClick={onStart}
            className="group mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-[15px] font-semibold text-indigo-700 shadow-[0_4px_0_0_rgba(49,46,129,0.5),0_16px_40px_-10px_rgba(15,23,42,0.6)] transition-[transform,box-shadow] duration-100 hover:bg-indigo-50 active:translate-y-[3px] active:shadow-[0_1px_0_0_rgba(49,46,129,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-600">
            
            Créer mon premier formulaire
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    </section>);

}