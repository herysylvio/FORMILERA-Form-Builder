import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { initialRegistrationValues, registrationFields } from '../data/registrationForm';
import { getFieldError, isFieldFilled } from '../utils/registration';
import type { BlockId, FieldKey, RegistrationStatus, RegistrationValues } from '../types/registration';

export function useRegistrationForm() {
  const [values, setValues] = useState<RegistrationValues>(initialRegistrationValues);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<RegistrationStatus>('idle');
  const [activeBlock, setActiveBlock] = useState<BlockId>('name');
  const blockRefs = useRef<Partial<Record<BlockId, HTMLElement | null>>>({});
  const scrollLock = useRef(0);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const setValue = useCallback(<K extends keyof RegistrationValues,>(key: K, value: RegistrationValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const touch = useCallback((key: FieldKey) => setTouched((t) => ({ ...t, [key]: true })), []);

  const errorFor = useCallback(
    (key: FieldKey) => attempted || touched[key] ? getFieldError(key, values) : null,
    [attempted, touched, values]
  );

  const completedCount = useMemo(() => registrationFields.filter((f) => isFieldFilled(f.key, values)).length, [values]);
  const missingRequired = useMemo(
    () => registrationFields.filter((f) => f.required && !isFieldFilled(f.key, values)),
    [values]
  );

  const registerBlock = useCallback(
    (id: BlockId) => (el: HTMLElement | null) => {
      blockRefs.current[id] = el;
    },
    []
  );

  const focusBlock = useCallback((id: BlockId) => {
    scrollLock.current = Date.now() + 700;
    setActiveBlock(id);
  }, []);

  const scrollToBlock = useCallback(
    (id: BlockId) => {
      focusBlock(id);
      blockRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },
    [focusBlock]
  );

  // Scroll-driven focus: the block nearest the reading line becomes active.
  useEffect(() => {
    if (status === 'success') return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (Date.now() < scrollLock.current) return;
      const entries = Object.entries(blockRefs.current).filter((e): e is [BlockId, HTMLElement] => Boolean(e[1]));
      if (!entries.length) return;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
      if (atBottom) {
        setActiveBlock(entries[entries.length - 1][0]);
        return;
      }
      const line = window.innerHeight * 0.42;
      let best: BlockId = entries[0][0];
      let bestDist = Infinity;
      entries.forEach(([id, el]) => {
        const r = el.getBoundingClientRect();
        const dist = line >= r.top && line <= r.bottom ? 0 : Math.min(Math.abs(r.top - line), Math.abs(r.bottom - line));
        if (dist < bestDist) {
          bestDist = dist;
          best = id;
        }
      });
      setActiveBlock(best);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [status]);

  const submit = useCallback(() => {
    if (status !== 'idle') return;
    setAttempted(true);
    if (missingRequired.length) {
      scrollToBlock(missingRequired[0].block);
      return;
    }
    setStatus('submitting');
    timer.current = window.setTimeout(() => {
      setStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1400);
  }, [missingRequired, scrollToBlock, status]);

  const editAgain = useCallback(() => setStatus('idle'), []);

  return {
    values,
    setValue,
    touch,
    errorFor,
    attempted,
    status,
    activeBlock,
    focusBlock,
    scrollToBlock,
    registerBlock,
    completedCount,
    totalCount: registrationFields.length,
    missingRequired,
    submit,
    editAgain
  };
}

export type RegistrationForm = ReturnType<typeof useRegistrationForm>;