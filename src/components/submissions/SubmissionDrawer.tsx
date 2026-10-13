import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import { ChevronDown, ChevronUp, Clock, Globe, Link2, Printer, Smartphone, Trash2, X, CalendarClock } from 'lucide-react';
import { Tooltip } from '../formilera/Tooltip';
import { ContactAvatar, NpsBadge, Stars, StatusBadge } from './SubmissionBits';
import { buildAnswers, formatDuration, formatElapsed, formatLongDate } from '../../utils/submissions';
import { springSoft } from '../../utils/motion';
import type { Submission } from '../../types/submission';

interface SubmissionDrawerProps {
  submission: Submission | null;
  index: number;
  total: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
  onDelete: (id: string) => void;
}

const iconBtn =
'flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 disabled:pointer-events-none disabled:opacity-30';

export function SubmissionDrawer({ submission, index, total, onClose, onStep, onDelete }: SubmissionDrawerProps) {
  useEffect(() => {
    if (!submission) return;
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('input, textarea')) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown' || e.key === 'j') {e.preventDefault();onStep(1);}
      if (e.key === 'ArrowUp' || e.key === 'k') {e.preventDefault();onStep(-1);}
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [submission, onClose, onStep]);

  const share = async (s: Submission) => {
    const url = `https://formilera.app/r/${s.id.toLowerCase()}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Lien de partage copié');
    } catch {
      toast(url);
    }
  };

  return (
    <AnimatePresence>
      {submission &&
      <>
          <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
          aria-hidden="true" />
        
          <motion.aside
          key="drawer"
          role="dialog"
          aria-modal="true"
          aria-label={`Réponse ${submission.id}`}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={springSoft}
          className="fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-white/10 bg-slate-900/95 shadow-[-24px_0_80px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:w-[420px]">
          
            <div className="flex h-14 shrink-0 items-center gap-1 border-b border-white/[0.06] px-3">
              <Tooltip label="Précédente" shortcut="↑" side="bottom">
                <button type="button" aria-label="Réponse précédente" disabled={index <= 0} onClick={() => onStep(-1)} className={iconBtn}>
                  <ChevronUp className="h-4 w-4" />
                </button>
              </Tooltip>
              <Tooltip label="Suivante" shortcut="↓" side="bottom">
                <button type="button" aria-label="Réponse suivante" disabled={index >= total - 1} onClick={() => onStep(1)} className={iconBtn}>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </Tooltip>
              <span className="ml-1 font-mono text-[11px] text-slate-500">{index + 1} / {total}</span>
              <div className="ml-auto flex items-center gap-1">
                <Tooltip label="Imprimer" side="bottom">
                  <button type="button" aria-label="Imprimer" onClick={() => window.print()} className={iconBtn}><Printer className="h-4 w-4" /></button>
                </Tooltip>
                <Tooltip label="Copier le lien" side="bottom">
                  <button type="button" aria-label="Partager le lien" onClick={() => share(submission)} className={iconBtn}><Link2 className="h-4 w-4" /></button>
                </Tooltip>
                <Tooltip label="Supprimer" side="bottom">
                  <button type="button" aria-label="Supprimer" onClick={() => onDelete(submission.id)} className={`${iconBtn} hover:bg-rose-500/10 hover:text-rose-300`}><Trash2 className="h-4 w-4" /></button>
                </Tooltip>
                <span className="mx-1 h-4 w-px bg-white/10" aria-hidden="true" />
                <button type="button" aria-label="Fermer" onClick={onClose} className={iconBtn}><X className="h-4 w-4" /></button>
              </div>
            </div>

            <div className="scrollbar-thin flex-1 overflow-y-auto p-5">
              <AnimatePresence mode="wait">
                <motion.div key={submission.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
                  <article className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                    <header className="p-5">
                      <div className="flex items-center gap-3">
                        <ContactAvatar submission={submission} size="lg" />
                        <div className="min-w-0 flex-1">
                          <h2 className="truncate text-base font-semibold text-white">{submission.name}</h2>
                          <p className="truncate text-xs text-slate-400">{submission.email}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-mono text-xs text-slate-400">#{submission.id}</span>
                        <StatusBadge submission={submission} />
                      </div>
                    </header>

                    <dl className="grid grid-cols-2 gap-px border-y border-dashed border-white/10 bg-white/[0.04]">
                      {[
                    { icon: CalendarClock, label: 'Horodatage', value: formatLongDate(submission.submittedAt) },
                    { icon: Globe, label: 'Adresse IP', value: submission.ip },
                    { icon: Clock, label: 'Temps passé', value: formatDuration(submission.duration) },
                    { icon: Smartphone, label: 'Appareil', value: `${submission.device}, ${submission.browser}` }].
                    map(({ icon: Icon, label, value }) =>
                    <div key={label} className="bg-slate-900/90 p-3.5">
                          <dt className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500">
                            <Icon className="h-3 w-3" aria-hidden="true" /> {label}
                          </dt>
                          <dd className="mt-1 truncate text-[12px] text-slate-200" title={value}>{value}</dd>
                        </div>
                    )}
                    </dl>

                    <ol className="relative p-5">
                      <span className="absolute bottom-8 left-[27px] top-8 w-px bg-white/[0.07]" aria-hidden="true" />
                      {buildAnswers(submission).map((a, i) =>
                    <li key={a.label} className="relative flex gap-4 pb-5 last:pb-0">
                          <span className="relative z-10 mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/15 bg-slate-900 font-mono text-[9px] text-slate-400">
                            {i + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500">{a.label}</p>
                              <span className="font-mono text-[10px] text-slate-600">{formatElapsed(a.elapsed)}</span>
                            </div>
                            <div className="mt-1.5">
                              {a.value === null ?
                          <p className="text-[13px] italic text-slate-600">Non répondu</p> :
                          a.kind === 'chips' && Array.isArray(a.value) ?
                          <div className="flex flex-wrap gap-1.5">
                                  {a.value.map((v) =>
                            <span key={v} className="rounded-md border border-indigo-400/30 bg-indigo-500/10 px-2 py-0.5 text-[12px] text-indigo-100">{v}</span>
                            )}
                                </div> :
                          a.kind === 'rating' && typeof a.value === 'number' ?
                          <div className="flex items-center gap-2"><Stars value={a.value} size="md" /><span className="font-mono text-xs text-slate-400">{a.value}/5</span></div> :
                          a.kind === 'nps' && typeof a.value === 'number' ?
                          <NpsBadge value={a.value} /> :
                          a.kind === 'quote' ?
                          <blockquote className="border-l-2 border-indigo-400/50 pl-3 text-[13px] leading-relaxed text-white">“{a.value}”</blockquote> :

                          <p className="text-[14px] font-medium text-white">{a.value}</p>
                          }
                            </div>
                          </div>
                        </li>
                    )}
                    </ol>

                    <footer className="flex items-center justify-between border-t border-dashed border-white/10 px-5 py-3 font-mono text-[10px] text-slate-600">
                      <span>Reçu #{submission.id}</span>
                      <span className="tracking-[0.2em]">FORMILERA</span>
                    </footer>
                  </article>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.aside>
        </>
      }
    </AnimatePresence>);

}