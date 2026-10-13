import React, { useEffect } from 'react';
import { AnimatePresence, motion, useAnimationControls, type Variants } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { OptionCard } from './OptionCard';
import { RatingAnswer, TextAnswer } from './AnswerFields';
import { OPTION_LETTERS } from '../../utils/responder';
import type { AnswerValue, ResponderQuestion } from '../../types/responder';

interface QuestionCardProps {
  question: ResponderQuestion;
  number: number;
  total: number;
  value: AnswerValue | undefined;
  error: string | null;
  shakeKey: number;
  direction: 1 | -1;
  onAnswer: (value: AnswerValue) => void;
  onChooseOption: (optionId: string) => void;
}

const pad = (n: number) => String(n).padStart(2, '0');

export const questionVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, y: dir * 56, filter: 'blur(8px)' }),
  center: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 260, damping: 30 } },
  exit: (dir: number) => ({ opacity: 0, y: dir * -56, filter: 'blur(8px)', transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } })
};

export function QuestionCard({ question, number, total, value, error, shakeKey, direction, onAnswer, onChooseOption }: QuestionCardProps) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (shakeKey > 0) controls.start({ x: [0, -10, 10, -6, 6, 0], transition: { duration: 0.42 } });
  }, [shakeKey, controls]);

  const multi = question.type === 'multiSelect';
  const selected = Array.isArray(value) ? value : typeof value === 'string' ? [value] : [];

  return (
    <motion.section
      custom={direction}
      variants={questionVariants}
      initial="enter"
      animate="center"
      exit="exit"
      aria-labelledby={`${question.id}-title`}
      className="w-full max-w-2xl">
      
      <motion.div
        animate={controls}
        className="rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_40px_120px_-40px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:p-10">
        
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] tracking-wider text-slate-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" aria-hidden="true" />
          {pad(number)} / {pad(total)}
          {!question.required && <span className="text-slate-500">· optionnel</span>}
        </span>

        <h1 id={`${question.id}-title`} className="mt-6 text-balance text-3xl font-medium leading-[1.15] tracking-tight text-white sm:text-[34px]">
          {question.title}
          {question.required && <span className="ml-1 text-indigo-400" aria-label="requis">*</span>}
        </h1>
        <p className="mt-3 text-sm text-[#94A3B8]">{question.hint}</p>

        <div className="mt-8">
          {question.options ?
          <div role={multi ? 'group' : 'radiogroup'} aria-labelledby={`${question.id}-title`} className="flex flex-col gap-2.5">
              {question.options.map((option, i) =>
            <OptionCard
              key={option.id}
              option={option}
              letter={OPTION_LETTERS[i]}
              multi={multi}
              selected={selected.includes(option.id)}
              onSelect={() => onChooseOption(option.id)} />

            )}
            </div> :
          question.type === 'rating' ?
          <RatingAnswer value={typeof value === 'number' ? value : undefined} onChange={onAnswer} /> :

          <TextAnswer question={question} value={typeof value === 'string' ? value : ''} onChange={onAnswer} />
          }
        </div>

        <AnimatePresence>
          {error &&
          <motion.p
            role="alert"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 20 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="flex items-center gap-2 overflow-hidden text-sm text-rose-300">
            
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" /> {error}
            </motion.p>
          }
        </AnimatePresence>
      </motion.div>
    </motion.section>);

}