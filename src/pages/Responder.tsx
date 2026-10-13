import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { ResponderAmbient } from '../components/responder/ResponderAmbient';
import { ResponderHeader } from '../components/responder/ResponderHeader';
import { QuestionCard } from '../components/responder/QuestionCard';
import { ResponderControls } from '../components/responder/ResponderControls';
import { CompletionScreen } from '../components/responder/CompletionScreen';
import { useResponder } from '../hooks/useResponder';
import { responderQuestions, SECONDS_PER_QUESTION } from '../data/responderQuestions';
import { getAnswerError } from '../utils/responder';

interface ResponderProps {
  onExit: () => void;
}

export function Responder({ onExit }: ResponderProps) {
  const r = useResponder();
  const done = r.submit === 'done';
  const current = r.index + 1;
  const percent = done ? 100 : Math.floor(current / r.total * 100);
  const minutesLeft = Math.ceil((r.total - current) * SECONDS_PER_QUESTION / 60);
  const answeredCount = responderQuestions.filter((q) => r.answers[q.id] !== undefined && getAnswerError({ ...q, required: true }, r.answers[q.id]) === null).length;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0B0F19] font-sans text-white antialiased">
      <ResponderAmbient progress={percent / 100} />
      <ResponderHeader current={current} total={r.total} percent={percent} minutesLeft={minutesLeft} done={done} onExit={onExit} />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-5 pb-32 pt-24 sm:pt-28">
        <AnimatePresence mode="wait" custom={r.direction} initial={false}>
          {done ?
          <CompletionScreen
            key="done"
            name={typeof r.answers.q1 === 'string' ? r.answers.q1.trim() : ''}
            answeredCount={answeredCount}
            total={r.total}
            onRestart={r.restart}
            onExit={onExit} /> :


          <QuestionCard
            key={r.question.id}
            question={r.question}
            number={current}
            total={r.total}
            value={r.answers[r.question.id]}
            error={r.error}
            shakeKey={r.shakeKey}
            direction={r.direction}
            onAnswer={(value) => r.setAnswer(r.question.id, value)}
            onChooseOption={r.chooseOption} />

          }
        </AnimatePresence>
      </main>

      {!done &&
      <ResponderControls
        question={r.question}
        isFirst={r.index === 0}
        isLast={r.index === r.total - 1}
        submit={r.submit}
        onPrev={r.prev}
        onNext={r.next} />

      }
    </div>);

}