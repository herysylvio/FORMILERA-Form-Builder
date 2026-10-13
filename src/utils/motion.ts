import type { Transition } from 'framer-motion';

export const springSnappy: Transition = { type: 'spring', stiffness: 500, damping: 30, mass: 0.8 };
export const springSoft: Transition = { type: 'spring', stiffness: 300, damping: 24 };