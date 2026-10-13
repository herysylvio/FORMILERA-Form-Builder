import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, MailOpen, Trash2, X } from 'lucide-react';
import { springSoft } from '../../utils/motion';

interface BulkActionBarProps {
  count: number;
  onMarkRead: () => void;
  onExport: () => void;
  onDelete: () => void;
  onClear: () => void;
}

const btn = 'inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60';

export function BulkActionBar({ count, onMarkRead, onExport, onDelete, onClear }: BulkActionBarProps) {
  return (
    <AnimatePresence>
      {count > 0 &&
      <motion.div
        role="toolbar"
        aria-label="Actions groupées"
        initial={{ opacity: 0, y: 24, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        exit={{ opacity: 0, y: 24, x: '-50%' }}
        transition={springSoft}
        className="fixed bottom-6 left-1/2 z-30 flex items-center gap-1 rounded-xl border border-white/10 bg-slate-900/90 p-1.5 pl-3 shadow-[0_16px_48px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl">
        
          <span className="mr-2 text-xs text-slate-300">
            <span className="font-semibold text-white tabular-nums">{count}</span> sélectionnée{count > 1 ? 's' : ''}
          </span>
          <button type="button" onClick={onMarkRead} className={`${btn} text-slate-200 hover:bg-white/[0.07]`}><MailOpen className="h-3.5 w-3.5" /> Marquer lu</button>
          <button type="button" onClick={onExport} className={`${btn} text-slate-200 hover:bg-white/[0.07]`}><Download className="h-3.5 w-3.5" /> Exporter</button>
          <button type="button" onClick={onDelete} className={`${btn} text-rose-300 hover:bg-rose-500/10`}><Trash2 className="h-3.5 w-3.5" /> Supprimer</button>
          <span className="mx-1 h-4 w-px bg-white/10" aria-hidden="true" />
          <button type="button" onClick={onClear} aria-label="Effacer la sélection" className={`${btn} px-2 text-slate-400 hover:bg-white/[0.07] hover:text-white`}><X className="h-3.5 w-3.5" /></button>
        </motion.div>
      }
    </AnimatePresence>);

}