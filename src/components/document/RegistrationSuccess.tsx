import React from 'react';
import { motion } from 'framer-motion';
import { Check, PenLine, Ticket as TicketIcon } from 'lucide-react';
import { tickets } from '../../data/registrationForm';
import { springSnappy, springSoft } from '../../utils/motion';
import type { RegistrationValues } from '../../types/registration';

interface RegistrationSuccessProps {
  values: RegistrationValues;
  onEdit: () => void;
  onExit: () => void;
}

export function RegistrationSuccess({ values, onEdit, onExit }: RegistrationSuccessProps) {
  const ticket = tickets.find((t) => t.id === values.ticket);
  return (
    <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={springSoft} className="py-10 text-center" aria-labelledby="success-title">
      <motion.span
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ ...springSnappy, delay: 0.1 }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/40 shadow-[0_0_40px_-4px_rgba(52,211,153,0.6)]">
        
        <Check className="h-7 w-7" strokeWidth={2.5} aria-hidden="true" />
      </motion.span>
      <h1 id="success-title" className="mt-8 text-3xl font-bold tracking-tight text-[#F0F3F6]">Candidature envoyée !</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-400">
        Merci {values.fullName.split(' ')[0]}. Une confirmation vient d’être envoyée à <span className="text-slate-200">{values.email}</span>.
      </p>

      {ticket &&
      <div className="mx-auto mt-8 flex max-w-sm items-center gap-4 rounded-2xl border border-indigo-400/25 bg-white/[0.025] p-4 text-left shadow-[0_0_48px_-16px_rgba(99,102,241,0.5)]">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
            <TicketIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#E6EDF3]">{ticket.name}</p>
            <p className="font-mono text-xs text-slate-500">12 – 13 juin 2026 · Antananarivo</p>
          </div>
          <span className="font-mono text-sm font-semibold text-indigo-200">{ticket.price}</span>
        </div>
      }

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={onEdit} className="h-10 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-slate-200 transition hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60">
          Modifier ma candidature
        </button>
        <button type="button" onClick={onExit} className="inline-flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300">
          <PenLine className="h-4 w-4" aria-hidden="true" /> Retour à l’éditeur
        </button>
      </div>
    </motion.section>);

}