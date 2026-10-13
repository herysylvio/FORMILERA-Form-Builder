import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface BentoCardProps {
  className?: string;
  delay?: number;
  children: React.ReactNode;
}

export function BentoCard({ className, delay = 0, children }: BentoCardProps) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - r.left}px`);
    el.style.setProperty('--y', `${e.clientY - r.top}px`);
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 200, damping: 26, delay }}
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-[border-color,box-shadow] duration-300 hover:border-white/20 hover:shadow-[0_0_56px_-16px_rgba(99,102,241,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-8',
        className
      )}>
      
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(420px circle at var(--x) var(--y), rgba(99,102,241,0.12), transparent 60%)' }} />
      
      <div className="relative h-full">{children}</div>
    </motion.article>);

}