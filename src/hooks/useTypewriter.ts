import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export function useTypewriter(text: string, speed = 38, pause = 2600) {
  const reduce = useReducedMotion();
  const [output, setOutput] = useState(reduce ? text : '');

  useEffect(() => {
    if (reduce) {
      setOutput(text);
      return;
    }
    let i = 0;
    let timer: number;
    const tick = () => {
      i += 1;
      setOutput(text.slice(0, i));
      if (i < text.length) timer = window.setTimeout(tick, speed);else

      timer = window.setTimeout(() => {
        i = 0;
        setOutput('');
        timer = window.setTimeout(tick, 500);
      }, pause);
    };
    timer = window.setTimeout(tick, 900);
    return () => window.clearTimeout(timer);
  }, [text, speed, pause, reduce]);

  return output;
}