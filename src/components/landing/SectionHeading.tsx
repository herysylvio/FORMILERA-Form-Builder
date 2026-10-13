import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 200, damping: 26 }}
      className="mx-auto max-w-2xl text-center">
      
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-indigo-300">{eyebrow}</p>
      <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">{description}</p>}
    </motion.div>);

}