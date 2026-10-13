import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Clock, Cpu, MapPin } from 'lucide-react';
import { registrationMeta } from '../../data/registrationForm';

export function DocumentCover() {
  const meta = registrationMeta;
  return (
    <header className="mb-12">
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
        className="relative -mx-6 h-48 overflow-hidden sm:mx-0 sm:h-56 sm:rounded-3xl">
        
        <img
          src={meta.coverUrl}
          alt=""
          className="h-full w-full object-cover"
          style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 45%, transparent)', maskImage: 'linear-gradient(to bottom, black 45%, transparent)' }} />
        
      </motion.div>

      <div className="relative -mt-12 px-1">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, type: 'spring', stiffness: 260, damping: 26 }}
          className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#0D1117] bg-[#161B22] text-indigo-300 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_32px_-4px_rgba(99,102,241,0.55)]">
          
          <Cpu className="h-8 w-8" strokeWidth={1.6} aria-hidden="true" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}>
          <h1 className="mt-6 text-balance text-3xl font-bold leading-tight tracking-tight text-[#F0F3F6] sm:text-[40px]">{meta.title}</h1>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] text-slate-500">
            <li className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />{meta.date}</li>
            <li className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" aria-hidden="true" />{meta.location}</li>
            <li className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" aria-hidden="true" />{meta.duration}</li>
          </ul>
          <p className="mt-6 border-l-2 border-indigo-400/40 pl-4 text-[15px] leading-relaxed text-slate-400">{meta.intro}</p>
        </motion.div>
      </div>
    </header>);

}