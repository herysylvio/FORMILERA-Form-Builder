import React from 'react';
import { SearchX } from 'lucide-react';
import { SubmissionRow } from './SubmissionRow';
import { RowCheckbox } from './SubmissionBits';
import type { SubmissionsState } from '../../hooks/useSubmissions';

interface SubmissionsTableProps {
  state: SubmissionsState;
}

const COLUMNS = ['ID / Horodatage', 'Nom / Contact', 'Statut', 'Réponses clés', 'Note / Satisfaction'];

export function SubmissionsTable({ state }: SubmissionsTableProps) {
  const { visible, query, selected, openSubmission } = state;

  return (
    <section aria-label="Réponses" className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0B0F1C]/70 backdrop-blur-md">
      <div className="scrollbar-thin max-h-[calc(100vh-260px)] min-h-[320px] overflow-auto">
        <table className="w-full min-w-[1000px] border-separate border-spacing-0 text-left">
          <thead>
            <tr>
              <th scope="col" className="sticky top-0 z-10 h-10 w-10 border-b border-slate-800 bg-[#0D1220]/95 pl-4 pr-2 backdrop-blur-md">
                <RowCheckbox checked={state.allSelected} indeterminate={!state.allSelected && state.someSelected} onChange={state.toggleAll} label="Tout sélectionner" />
              </th>
              {COLUMNS.map((c) =>
              <th key={c} scope="col" className="sticky top-0 z-10 h-10 whitespace-nowrap border-b border-slate-800 bg-[#0D1220]/95 px-3 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 backdrop-blur-md">
                  {c}
                </th>
              )}
              <th scope="col" className="sticky top-0 z-10 h-10 w-12 border-b border-slate-800 bg-[#0D1220]/95 pr-3 backdrop-blur-md">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((s) =>
            <SubmissionRow
              key={s.id}
              submission={s}
              query={query}
              selected={selected.has(s.id)}
              active={openSubmission?.id === s.id}
              onToggleSelect={() => state.toggleSelect(s.id)}
              onOpen={() => state.open(s.id)}
              onToggleRead={() => state.markRead([s.id], !s.read)}
              onDelete={() => state.remove([s.id])} />

            )}
          </tbody>
        </table>

        {visible.length === 0 &&
        <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-400">
              <SearchX className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mt-4 text-sm font-medium text-slate-200">Aucune réponse ne correspond</p>
            <p className="mt-1 text-xs text-slate-500">Essayez un autre terme ou retirez des filtres.</p>
            <button type="button" onClick={state.resetFilters} className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-200 transition hover:bg-white/[0.08]">
              Réinitialiser les filtres
            </button>
          </div>
        }
      </div>
      <footer className="flex items-center justify-between border-t border-slate-800 px-4 py-2.5 font-mono text-[11px] text-slate-500">
        <span>
          {visible.length} affichée{visible.length > 1 ? 's' : ''} · {state.rows.filter((r) => !r.read).length} non lue{state.rows.filter((r) => !r.read).length > 1 ? 's' : ''}
        </span>
        <span>Les 1 284 réponses sont disponibles via l’export</span>
      </footer>
    </section>);

}