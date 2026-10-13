import React from 'react';
import { Toaster } from 'sonner';
import { AmbientBackground } from '../components/AmbientBackground';
import { DashboardHeader } from '../components/submissions/DashboardHeader';
import { KpiCards } from '../components/submissions/KpiCards';
import { SubmissionsTable } from '../components/submissions/SubmissionsTable';
import { SubmissionDrawer } from '../components/submissions/SubmissionDrawer';
import { BulkActionBar } from '../components/submissions/BulkActionBar';
import { useSubmissions } from '../hooks/useSubmissions';

interface SubmissionsProps {
  onOpenEditor: () => void;
}

export function Submissions({ onOpenEditor }: SubmissionsProps) {
  const state = useSubmissions();

  return (
    <div className="dark">
      <div className="relative min-h-screen w-full bg-[#0A0E1A] font-sans text-slate-100 antialiased">
        <AmbientBackground />
        <DashboardHeader state={state} onOpenEditor={onOpenEditor} />

        <main className="relative z-10 space-y-5 px-4 py-6 lg:px-6">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-white">Réponses</h1>
              <p className="mt-0.5 text-sm text-slate-500">Suivez chaque soumission en temps réel et inspectez le détail en un clic.</p>
            </div>
            <p className="font-mono text-[11px] text-slate-500">Mis à jour à 16:43</p>
          </div>
          <KpiCards />
          <SubmissionsTable state={state} />
        </main>

        <BulkActionBar
          count={state.selected.size}
          onMarkRead={() => {state.markRead([...state.selected], true);state.clearSelection();}}
          onExport={() => state.exportRows('csv')}
          onDelete={() => state.remove([...state.selected])}
          onClear={state.clearSelection} />
        

        <SubmissionDrawer
          submission={state.openSubmission}
          index={state.openIndex}
          total={state.visible.length}
          onClose={state.close}
          onStep={state.step}
          onDelete={(id) => state.remove([id])} />
        

        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{ style: { background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)', color: '#E2E8F0' } }} />
        
      </div>
    </div>);

}