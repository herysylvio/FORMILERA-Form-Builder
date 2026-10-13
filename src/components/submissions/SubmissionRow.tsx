import React from 'react';
import { Tooltip } from '../formilera/Tooltip';
import { RowActionsMenu } from './RowActionsMenu';
import { ContactAvatar, Highlight, NpsBadge, RowCheckbox, Stars, StatusBadge } from './SubmissionBits';
import { formatTimestamp, keyAnswers } from '../../utils/submissions';
import { cn } from '../../utils/cn';
import type { Submission } from '../../types/submission';

interface SubmissionRowProps {
  submission: Submission;
  query: string;
  selected: boolean;
  active: boolean;
  onToggleSelect: () => void;
  onOpen: () => void;
  onToggleRead: () => void;
  onDelete: () => void;
}

export function SubmissionRow({ submission: s, query, selected, active, onToggleSelect, onOpen, onToggleRead, onDelete }: SubmissionRowProps) {
  const tags = keyAnswers(s);
  const shown = tags.slice(0, 2);
  const extra = tags.length - shown.length;

  return (
    <tr
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
      aria-selected={active}
      className={cn(
        'group relative h-14 cursor-pointer border-b border-slate-800/80 text-[13px] outline-none transition-colors duration-100 focus-visible:bg-white/[0.04]',
        active ? 'bg-indigo-500/[0.08]' : selected ? 'bg-indigo-500/[0.05]' : 'hover:bg-white/[0.025]'
      )}>
      
      <td className="relative w-10 pl-4 pr-2">
        {active && <span className="absolute inset-y-2 left-0 w-[2px] rounded-full bg-[#6366F1] shadow-[0_0_8px_rgba(99,102,241,0.8)]" aria-hidden="true" />}
        <RowCheckbox checked={selected} onChange={onToggleSelect} label={`Sélectionner ${s.id}`} />
      </td>
      <td className="whitespace-nowrap px-3">
        <div className="flex items-center gap-2">
          <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', s.read ? 'bg-transparent' : 'bg-indigo-400 shadow-[0_0_6px_rgba(129,140,248,0.9)]')} aria-label={s.read ? undefined : 'Non lu'} />
          <span className="font-mono text-[12px] text-slate-300">
            #<Highlight text={s.id} query={query} />
          </span>
        </div>
        <span className="ml-3.5 font-mono text-[11px] text-slate-500">{formatTimestamp(s.submittedAt)}</span>
      </td>
      <td className="px-3">
        <div className="flex min-w-[200px] items-center gap-2.5">
          <ContactAvatar submission={s} />
          <div className="min-w-0">
            <p className={cn('truncate font-semibold', s.read ? 'text-slate-200' : 'text-white')}>
              <Highlight text={s.name} query={query} />
            </p>
            <p className="truncate text-[12px] text-slate-500">
              <Highlight text={s.email} query={query} />
            </p>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3">
        <StatusBadge submission={s} />
      </td>
      <td className="px-3">
        <div className="flex max-w-[340px] items-center gap-1.5">
          {shown.map((tag) =>
          <Tooltip key={tag} label={tag}>
              <span tabIndex={0} className="block max-w-[150px] truncate rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[11px] text-slate-300 outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60">
                <Highlight text={tag} query={query} />
              </span>
            </Tooltip>
          )}
          {extra > 0 &&
          <Tooltip label={tags.slice(2).join(' · ')}>
              <span tabIndex={0} className="shrink-0 rounded-md bg-white/[0.05] px-1.5 py-0.5 font-mono text-[10px] text-slate-400 outline-none">+{extra}</span>
            </Tooltip>
          }
          {tags.length === 0 && <span className="text-[12px] italic text-slate-600">Aucune réponse clé</span>}
        </div>
      </td>
      <td className="whitespace-nowrap px-3">
        {s.rating === null && s.nps === null ?
        <span className="text-slate-600">—</span> :

        <div className="flex items-center gap-2">
            {s.rating !== null && <Stars value={s.rating} />}
            {s.nps !== null && <NpsBadge value={s.nps} />}
          </div>
        }
      </td>
      <td className="w-12 pr-3 text-right">
        <RowActionsMenu read={s.read} onView={onOpen} onToggleRead={onToggleRead} onDelete={onDelete} />
      </td>
    </tr>);

}