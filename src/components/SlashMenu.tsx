import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { Kbd } from './formilera/Kbd';
import { blockCatalog, blockGroups } from '../data/blockCatalog';
import { useTheme } from '../contexts/ThemeContext';
import { cn } from '../utils/cn';
import type { BlockType } from '../types/form';

interface SlashMenuProps {
  autoFocus: boolean;
  onSelect: (type: BlockType) => void;
  onClose: () => void;
}

export function SlashMenu({ autoFocus, onSelect, onClose }: SlashMenuProps) {
  const theme = useTheme();
  const kbdTone = theme === 'dark' ? 'dark' : 'light';
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return blockCatalog;
    return blockCatalog.filter((i) => i.label.toLowerCase().includes(q) || i.keywords.some((k) => k.includes(q)));
  }, [query]);

  useEffect(() => setIndex(0), [query]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  // Keep the highlighted row visible inside the list without scrolling the page.
  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>(`[data-index="${index}"]`);
    if (!list || !el) return;
    if (el.offsetTop < list.scrollTop) list.scrollTop = el.offsetTop - 28;else
    if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight)
    list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight + 4;
  }, [index]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (results.length) setIndex((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (results.length) setIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = results[index];
      if (item) onSelect(item.type);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const groups = blockGroups.
  map((group) => ({ group, items: results.filter((r) => r.group === group) })).
  filter((g) => g.items.length > 0);

  return (
    <div
      onKeyDown={handleKeyDown}
      className="w-80 rounded-2xl border border-slate-200 bg-white/90 p-2 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/90 dark:shadow-[0_24px_64px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]">
      
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-2.5 dark:border-white/[0.06] dark:bg-white/[0.04]">
        <Search className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search blocks…"
          aria-label="Search blocks"
          role="combobox"
          aria-expanded="true"
          aria-controls="slash-menu-list"
          aria-activedescendant={results[index] ? `slash-${results[index].type}` : undefined}
          className="h-9 min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500" />
        
        <Kbd tone={kbdTone} keys={['esc']} />
      </div>

      <div ref={listRef} id="slash-menu-list" role="listbox" aria-label="Blocks" className="scrollbar-thin relative mt-2 max-h-[320px] overflow-y-auto pr-0.5">
        {groups.length === 0 &&
        <p className="px-3 py-8 text-center text-sm text-slate-500">No blocks match “{query}”</p>
        }
        {groups.map(({ group, items }) =>
        <div key={group} className="mb-1.5 last:mb-0">
            <p className="px-2 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">{group}</p>
            {items.map((item) => {
            const idx = results.indexOf(item);
            const active = idx === index;
            const Icon = item.icon;
            return (
              <button
                key={item.type}
                id={`slash-${item.type}`}
                type="button"
                role="option"
                aria-selected={active}
                data-index={idx}
                onMouseMove={() => setIndex(idx)}
                onClick={() => onSelect(item.type)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-2 py-1.5 text-left transition-colors duration-100',
                  active ? 'bg-slate-100 dark:bg-white/[0.07]' : ''
                )}>
                
                  <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors',
                    active ?
                    'border-indigo-400/40 bg-indigo-500/15 text-indigo-600 dark:text-indigo-300' :
                    'border-slate-200 bg-white text-slate-500 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-400'
                  )}>
                  
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-medium text-slate-800 dark:text-slate-100">{item.label}</span>
                    <span className="block truncate text-[11px] text-slate-500">{item.description}</span>
                  </span>
                  {active && <Kbd tone={kbdTone} keys={['enter']} />}
                </button>);

          })}
          </div>
        )}
      </div>

      <div className="mt-2 flex items-center gap-3 border-t border-slate-200/80 px-2 pt-2 text-[11px] text-slate-500 dark:border-white/[0.06]">
        <span className="inline-flex items-center gap-1"><Kbd tone={kbdTone} keys={['up']} /><Kbd tone={kbdTone} keys={['down']} /> Navigate</span>
        <span className="inline-flex items-center gap-1"><Kbd tone={kbdTone} keys={['enter']} /> Insert</span>
        <span className="ml-auto inline-flex items-center gap-1"><Kbd tone={kbdTone} keys={['esc']} /> Close</span>
      </div>
    </div>);

}