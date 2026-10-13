import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, Mail, MailOpen, MoreHorizontal, Trash2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface RowActionsMenuProps {
  read: boolean;
  onView: () => void;
  onToggleRead: () => void;
  onDelete: () => void;
}

const MENU_WIDTH = 184;

export function RowActionsMenu({ read, onView, onToggleRead, onDelete }: RowActionsMenuProps) {
  const [pos, setPos] = useState<{top: number;left: number;} | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pos) return;
    const close = () => setPos(null);
    const onDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node) && !btnRef.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [pos]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pos) return setPos(null);
    const r = btnRef.current?.getBoundingClientRect();
    if (!r) return;
    const openUp = r.bottom + 140 > window.innerHeight;
    setPos({ top: openUp ? r.top - 132 : r.bottom + 6, left: r.right - MENU_WIDTH });
  };

  const run = (fn: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setPos(null);
    fn();
  };

  const item = 'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[13px] transition-colors';

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-label="Actions rapides"
        aria-haspopup="menu"
        aria-expanded={Boolean(pos)}
        onClick={toggle}
        onKeyDown={(e) => e.stopPropagation()}
        className={cn(
          'flex h-7 w-7 items-center justify-center rounded-md text-slate-500 transition hover:bg-white/[0.08] hover:text-white focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60',
          pos ? 'bg-white/[0.08] text-white opacity-100' : 'opacity-0 group-hover:opacity-100'
        )}>
        
        <MoreHorizontal className="h-4 w-4" />
      </button>
      {createPortal(
        <AnimatePresence>
          {pos &&
          <motion.div
            ref={menuRef}
            role="menu"
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={{ duration: 0.12 }}
            style={{ top: pos.top, left: pos.left, width: MENU_WIDTH }}
            className="fixed z-50 rounded-xl border border-white/10 bg-slate-900/95 p-1 shadow-[0_16px_48px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl">
            
              <button type="button" role="menuitem" onClick={run(onView)} className={cn(item, 'text-slate-200 hover:bg-white/[0.07]')}>
                <Eye className="h-3.5 w-3.5 text-slate-400" /> Voir le détail
              </button>
              <button type="button" role="menuitem" onClick={run(onToggleRead)} className={cn(item, 'text-slate-200 hover:bg-white/[0.07]')}>
                {read ? <Mail className="h-3.5 w-3.5 text-slate-400" /> : <MailOpen className="h-3.5 w-3.5 text-slate-400" />}
                {read ? 'Marquer non lu' : 'Marquer lu'}
              </button>
              <div className="my-1 h-px bg-white/[0.06]" />
              <button type="button" role="menuitem" onClick={run(onDelete)} className={cn(item, 'text-rose-300 hover:bg-rose-500/10')}>
                <Trash2 className="h-3.5 w-3.5" /> Supprimer
              </button>
            </motion.div>
          }
        </AnimatePresence>,
        document.body
      )}
    </>);

}