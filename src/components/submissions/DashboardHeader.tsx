import React from 'react';
import { motion } from 'framer-motion';
import { Braces, ChevronRight, Download, PenLine, Search, X } from 'lucide-react';
import { LogoMark } from '../formilera/Logo';
import { Kbd } from '../formilera/Kbd';
import { SpringSwitch } from '../SpringSwitch';
import { filterDefinitions } from '../../data/submissions';
import { cn } from '../../utils/cn';
import { springSnappy } from '../../utils/motion';
import type { SubmissionsState } from '../../hooks/useSubmissions';

interface DashboardHeaderProps {
  state: SubmissionsState;
  onOpenEditor: () => void;
}

export function DashboardHeader({ state, onOpenEditor }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#0A0E1A]/75 backdrop-blur-2xl">
      <div className="flex h-14 items-center gap-3 px-4 lg:px-6">
        <button type="button" onClick={onOpenEditor} aria-label="Formilera" className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60">
          <LogoMark size="sm" />
        </button>
        <nav aria-label="Fil d’Ariane" className="min-w-0 flex-1">
          <ol className="flex min-w-0 items-center gap-1.5 text-sm">
            <li>
              <button type="button" onClick={onOpenEditor} className="rounded px-1 text-slate-500 transition-colors hover:text-slate-200">Formulaires</button>
            </li>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-700" aria-hidden="true" />
            <li className="min-w-0">
              <button type="button" onClick={onOpenEditor} className="block max-w-[280px] truncate rounded px-1 text-slate-500 transition-colors hover:text-slate-200">
                Sondage Expérience Utilisateur 2026
              </button>
            </li>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-700" aria-hidden="true" />
            <li aria-current="page" className="px-1 font-medium text-white">Réponses</li>
          </ol>
        </nav>
        <button
          type="button"
          onClick={onOpenEditor}
          className="hidden h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-slate-300 transition hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 sm:inline-flex">
          
          <PenLine className="h-3.5 w-3.5" aria-hidden="true" /> Éditeur
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 px-4 pb-3 lg:px-6">
        <div
          className={cn(
            'inline-flex h-8 items-center gap-2.5 rounded-full border pl-3 pr-1.5 text-xs font-medium transition-colors',
            state.live ? 'border-emerald-500/25 bg-emerald-500/[0.08] text-emerald-200' : 'border-white/10 bg-white/[0.03] text-slate-400'
          )}>
          
          <span className="relative flex h-2 w-2" aria-hidden="true">
            {state.live && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />}
            <span className={cn('relative h-2 w-2 rounded-full', state.live ? 'bg-emerald-400' : 'bg-slate-500')} />
          </span>
          <span>
            {state.live ? 'Formulaire Actif' : 'Formulaire fermé'}
            <span className="ml-1 hidden font-normal opacity-60 xl:inline">{state.live ? '(Acceptant les réponses)' : '(Réponses suspendues)'}</span>
          </span>
          <SpringSwitch label="Accepter les réponses" checked={state.live} onCheckedChange={state.toggleLive} />
        </div>

        <label className="group relative flex h-8 w-full items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 transition focus-within:border-indigo-400/50 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.12)] sm:w-64">
          <Search className="h-3.5 w-3.5 shrink-0 text-slate-500" aria-hidden="true" />
          <input
            ref={state.searchRef}
            value={state.query}
            onChange={(e) => state.setQuery(e.target.value)}
            placeholder="Rechercher nom, e-mail, réponse…"
            aria-label="Rechercher dans les réponses"
            className="min-w-0 flex-1 bg-transparent text-xs text-slate-100 outline-none placeholder:text-slate-500" />
          
          {state.query ?
          <button type="button" onClick={() => state.setQuery('')} aria-label="Effacer la recherche" className="text-slate-500 hover:text-slate-200">
              <X className="h-3.5 w-3.5" />
            </button> :

          <Kbd tone="dark" keys={['mod', 'F']} />
          }
        </label>

        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filtres">
          {filterDefinitions.map((f) => {
            const active = state.filters.includes(f.id);
            return (
              <motion.button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => state.toggleFilter(f.id)}
                whileTap={{ scale: 0.96 }}
                transition={springSnappy}
                className={cn(
                  'inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-[11px] transition-colors',
                  active ?
                  'border-indigo-400/40 bg-indigo-500/15 text-indigo-100' :
                  'border-dashed border-white/15 text-slate-400 hover:border-white/30 hover:text-slate-200'
                )}>
                
                <span className={active ? 'text-indigo-300' : ''}>{f.label}:</span>
                <span className="font-medium">{f.value}</span>
                {active && <X className="h-3 w-3 opacity-70" aria-hidden="true" />}
              </motion.button>);

          })}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => state.exportRows('json')}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-slate-200 backdrop-blur-md transition hover:border-white/20 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60">
            
            <Braces className="h-3.5 w-3.5" aria-hidden="true" /> Export JSON
          </button>
          <button
            type="button"
            onClick={() => state.exportRows('csv')}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-white px-3 text-xs font-semibold text-slate-900 shadow-[0_2px_0_0_rgba(148,163,184,0.4)] transition hover:bg-slate-100 active:translate-y-px active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300">
            
            <Download className="h-3.5 w-3.5" aria-hidden="true" /> Export CSV
          </button>
        </div>
      </div>
    </header>);

}