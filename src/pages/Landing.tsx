import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LandingNav } from '../components/landing/LandingNav';
import { HeroSection } from '../components/landing/HeroSection';
import { ProductShowcase } from '../components/landing/ProductShowcase';
import { UseCasesStrip } from '../components/landing/UseCasesStrip';
import { BentoFeatures } from '../components/landing/BentoFeatures';
import { ComparisonTable } from '../components/landing/ComparisonTable';
import { PricingSection } from '../components/landing/PricingSection';
import { CtaBanner } from '../components/landing/CtaBanner';
import { LandingFooter } from '../components/landing/LandingFooter';

interface LandingProps {
  onStart: () => void;
  onDemo: () => void;
}

export function Landing({ onStart, onDemo }: LandingProps) {
  const reduce = useReducedMotion();
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const drift = (x: number, y: number) =>
  reduce ? {} : { animate: { x: [0, x, 0], y: [0, y, 0] }, transition: { duration: 18, repeat: Infinity, ease: 'easeInOut' as const } };

  return (
    <div className="dark">
      <div className="relative min-h-screen w-full overflow-x-clip bg-[#0A0E1A] font-sans text-slate-100 antialiased">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[1100px] overflow-hidden">
          <motion.div {...drift(40, 30)} className="absolute -left-40 top-0 h-[620px] w-[620px] rounded-full bg-violet-500/[0.15] blur-[140px]" />
          <motion.div {...drift(-40, 40)} className="absolute -right-40 top-40 h-[560px] w-[560px] rounded-full bg-cyan-400/[0.15] blur-[140px]" />
          <div className="absolute left-1/2 top-[560px] h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-indigo-500/[0.12] blur-[140px]" />
          <div className="absolute bottom-0 left-1/4 h-[300px] w-[400px] rounded-full bg-emerald-500/[0.06] blur-[120px]" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 right-0 h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[160px]" />

        <LandingNav onNavigate={scrollTo} onStart={onStart} />
        <main className="relative">
          <HeroSection onStart={onStart} onDemo={onDemo} />
          <ProductShowcase />
          <UseCasesStrip />
          <BentoFeatures />
          <ComparisonTable />
          <PricingSection onSelect={onStart} />
          <CtaBanner onStart={onStart} />
        </main>
        <LandingFooter />
      </div>
    </div>);

}