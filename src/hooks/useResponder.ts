import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { initialResponderAnswers, responderQuestions } from '../data/responderQuestions';
import { getAnswerError, OPTION_LETTERS } from '../utils/responder';
import { isBlockVisible } from '../utils/conditions';
import type { AnswerValue, Answers, SubmitState } from '../types/responder';

export function useResponder(startIndex = 2) {
  const [index, setIndex] = useState(startIndex);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [answers, setAnswers] = useState<Answers>(initialResponderAnswers);
  const [error, setError] = useState<string | null>(null);
  const [shakeKey, setShakeKey] = useState(0);
  const [submit, setSubmit] = useState<SubmitState>('idle');
  const timers = useRef<number[]>([]);

  const activeQuestions = useMemo(() => {
    return responderQuestions.filter((q) => {
      if (!q.condition) return true;
      return isBlockVisible(
        {
          id: q.id,
          type: q.type as any,
          label: q.title,
          required: q.required,
          condition: q.condition
        },
        answers
      );
    });
  }, [answers]);

  const total = activeQuestions.length;
  const safeIndex = Math.min(index, Math.max(0, total - 1));
  const question = activeQuestions[safeIndex] || responderQuestions[0];

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const setAnswer = useCallback((id: string, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setError(null);
  }, []);

  const next = useCallback(() => {
    if (submit !== 'idle') return;
    const err = getAnswerError(question, answers[question.id]);
    if (err) {
      setError(err);
      setShakeKey((k) => k + 1);
      return;
    }
    setError(null);
    if (safeIndex >= total - 1) {
      setSubmit('submitting');
      timers.current.push(window.setTimeout(() => setSubmit('done'), 1300));
      return;
    }
    setDirection(1);
    setIndex((i) => Math.min(i + 1, total - 1));
  }, [answers, question, safeIndex, submit, total]);

  const prev = useCallback(() => {
    if (index === 0 || submit !== 'idle') return;
    setError(null);
    setDirection(-1);
    setIndex((i) => i - 1);
  }, [index, submit]);

  const chooseOption = useCallback(
    (optionId: string) => {
      if (question.type === 'multiSelect') {
        const current = answers[question.id] as string[] | undefined ?? [];
        setAnswer(question.id, current.includes(optionId) ? current.filter((id) => id !== optionId) : [...current, optionId]);
        return;
      }
      setAnswer(question.id, optionId);
      // Single choice advances automatically after a short beat.
      if (safeIndex < total - 1) {
        timers.current.push(
          window.setTimeout(() => {
            setDirection(1);
            setIndex((i) => Math.min(i + 1, total - 1));
          }, 380)
        );
      }
    },
    [answers, question, safeIndex, setAnswer, total]
  );

  const restart = useCallback(() => {
    setAnswers(initialResponderAnswers);
    setSubmit('idle');
    setError(null);
    setDirection(-1);
    setIndex(0);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (submit === 'done' || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      const inTextarea = target?.tagName === 'TEXTAREA';
      const inField = Boolean(target?.closest('input, textarea'));

      if (e.key === 'Enter') {
        if (inTextarea && e.shiftKey) return;
        e.preventDefault();
        if (e.shiftKey) prev();else
        next();
        return;
      }
      if (inField || e.key.length !== 1) return;

      if (question.options) {
        const i = OPTION_LETTERS.indexOf(e.key.toUpperCase());
        if (i >= 0 && i < question.options.length) {
          e.preventDefault();
          chooseOption(question.options[i].id);
        }
      } else if (question.type === 'rating') {
        const n = Number(e.key);
        if (n >= 1 && n <= 5) setAnswer(question.id, n);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [chooseOption, next, prev, question, setAnswer, submit]);

  return {
    total,
    index: safeIndex,
    direction,
    question,
    answers,
    error,
    shakeKey,
    submit,
    setAnswer,
    chooseOption,
    next,
    prev,
    restart
  };
}

export type Responder = ReturnType<typeof useResponder>;