import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { Kbd } from '../formilera/Kbd';
import { OPTION_LETTERS } from '../../utils/responder';
import type { ResponderQuestion, SubmitState } from '../../types/responder';

interface ResponderControlsProps {
  question: ResponderQuestion;
  isFirst: boolean;
  isLast: boolean;
  submit: SubmitState;
  onPrev: () => void;
  onNext: () => void;
}

const chevronBtn =
'flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 disabled:pointer-events-none disabled:opacity-30';

export function ResponderControls({ question, isFirst, isLast, submit, onPrev, onNext }: ResponderControlsProps) {
  const selectHint = question.options ?
  { keys: `A–${OPTION_LETTERS[question.options.length - 1]}`, label: 'to select' } :
  question.type === 'rating' ?
  { keys: '1–5', label: 'to rate' } :
  null;
  const submitting = submit === 'submitting';

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex items-end justify-between gap-4 px-5 pb-5 md:px-10 md:pb-8">
      <p className="pointer-events-auto hidden items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] text-slate-400 backdrop-blur-xl md:inline-flex">
        {selectHint &&
        <>
            Press <Kbd tone="dark" className="font-mono">{selectHint.keys}</Kbd> {selectHint.label}
            <span className="mx-1 text-slate-600">·</span>
          </>
        }
        <Kbd tone="dark" keys={['enter']} /> Enter to advance
        <span className="mx-1 text-slate-600">·</span>
        <Kbd tone="dark" keys={['shift', 'enter']} separator="+" /> to go back
      </p>

      <div className="pointer-events-auto ml-auto flex items-center gap-2">
        <div className="flex items-center rounded-full border border-white/10 bg-white/[0.03] p-0.5 backdrop-blur-xl">
          <button type="button" onClick={onPrev} disabled={isFirst || submitting} aria-label="Question précédente" className={chevronBtn}>
            <ChevronUp className="h-4 w-4" />
          </button>
          <button type="button" onClick={onNext} disabled={isLast || submitting} aria-label="Question suivante" className={chevronBtn}>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
        <motion.button
          type="button"
          onClick={onNext}
          disabled={submitting}
          aria-keyshortcuts="Enter"
          whileTap={{ scale: 0.97 }}
          className="group relative inline-flex h-11 items-center gap-2.5 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#6366F1] pl-6 pr-4 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(129,140,248,0.45),0_8px_24px_-6px_rgba(99,102,241,0.6)] transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(165,180,252,0.6),0_10px_40px_-4px_rgba(99,102,241,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19] disabled:cursor-wait">
          
          {submitting ?
          <>
              Envoi… <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            </> :

          <>
              {isLast ? 'Envoyer' : 'Continuer'}
              <span className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-white/15 font-mono text-xs" aria-hidden="true">
                <span className="transition-transform duration-300 ease-out group-hover:translate-x-6">↵</span>
                <span className="absolute -translate-x-6 transition-transform duration-300 ease-out group-hover:translate-x-0">→</span>
              </span>
            </>
          }
        </motion.button>
      </div>
    </div>);

}