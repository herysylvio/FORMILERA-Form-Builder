import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Sparkles, LayoutGrid, X, ArrowRight, Wand2, Check } from 'lucide-react';
import { defaultTemplates, getCustomTemplates } from '../data/templates';
import type { FormTemplate, TemplateCategory } from '../types/template';
import { cn } from '../utils/cn';

interface CreateFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBlank: () => void;
  onSelectTemplate: (template: FormTemplate) => void;
  onSelectAiPrompt: (prompt: string) => void;
}

type ModalTab = 'hub' | 'templates' | 'ai';

const CATEGORIES: { label: string; value: TemplateCategory | 'all' }[] = [
  { label: 'Tous', value: 'all' },
  { label: 'Satisfaction & NPS', value: 'feedback' },
  { label: 'Événements', value: 'events' },
  { label: 'Business & Devis', value: 'business' },
  { label: 'Recrutement / RH', value: 'hr' }
];

const AI_SUGGESTIONS = [
  'Enquête de satisfaction pour restaurant à Antananarivo',
  'Formulaire d’inscription pour tournoi e-sport avec choix de jeux',
  'Demande de réservation de salle avec options traiteur',
  'Formulaire de contact et devis pour agence digitale'
];

export function CreateFormModal({
  isOpen,
  onClose,
  onSelectBlank,
  onSelectTemplate,
  onSelectAiPrompt
}: CreateFormModalProps) {
  const [tab, setTab] = useState<ModalTab>('hub');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  const [aiPrompt, setAiPrompt] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<FormTemplate | null>(null);

  if (!isOpen) return null;

  const allTemplates = [...defaultTemplates, ...getCustomTemplates()];
  const filteredTemplates = selectedCategory === 'all'
    ? allTemplates
    : allTemplates.filter((t) => t.category === selectedCategory);

  const handleBlank = () => {
    onSelectBlank();
    onClose();
  };

  const handleTemplatePick = (template: FormTemplate) => {
    onSelectTemplate(template);
    onClose();
  };

  const handleAiSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!aiPrompt.trim()) return;
    onSelectAiPrompt(aiPrompt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#0B0F19] text-white shadow-2xl shadow-indigo-500/10">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold tracking-tight text-white">
                {tab === 'hub' && 'Créer un nouveau formulaire'}
                {tab === 'templates' && 'Choisir un modèle préconçu'}
                {tab === 'ai' && 'Générer avec l’IA'}
              </h2>
              <p className="text-xs text-slate-400">
                {tab === 'hub' && 'Comment souhaitez-vous démarrer votre projet ?'}
                {tab === 'templates' && 'Sélectionnez un modèle adapté à votre usage.'}
                {tab === 'ai' && 'Décrivez en français votre besoin, l’IA structure le formulaire.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {tab !== 'hub' && (
              <button
                type="button"
                onClick={() => setTab('hub')}
                className="rounded-lg px-2.5 py-1 text-xs text-slate-400 hover:bg-white/5 hover:text-white">
                ← Retour
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* 1. Hub View */}
            {tab === 'hub' && (
              <motion.div
                key="hub"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                
                {/* Option 1: Page Blanche */}
                <button
                  type="button"
                  onClick={handleBlank}
                  className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition-all duration-200 hover:border-indigo-500/40 hover:bg-indigo-500/[0.05] hover:shadow-lg hover:shadow-indigo-500/10">
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-slate-300 transition-colors group-hover:bg-indigo-500/20 group-hover:text-indigo-300">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold text-white">Page Blanche</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                      Démarrez avec un canevas vierge et composez avec le menu slash <kbd className="rounded bg-white/10 px-1 py-0.5 text-[10px]"> / </kbd>.
                    </p>
                  </div>
                  <div className="mt-5 flex items-center text-xs font-medium text-slate-400 group-hover:text-indigo-400">
                    <span>Créer vide</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>

                {/* Option 2: Templates */}
                <button
                  type="button"
                  onClick={() => setTab('templates')}
                  className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition-all duration-200 hover:border-indigo-500/40 hover:bg-indigo-500/[0.05] hover:shadow-lg hover:shadow-indigo-500/10">
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400 transition-colors group-hover:bg-indigo-500/25">
                      <LayoutGrid className="h-5 w-5" />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-white">Modèles Prêts</h3>
                      <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-medium text-indigo-300">
                        {allTemplates.length} dispo
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                      Satisfaction, Événements, Demandes de devis avec questions pré-configurées.
                    </p>
                  </div>
                  <div className="mt-5 flex items-center text-xs font-medium text-slate-400 group-hover:text-indigo-400">
                    <span>Parcourir</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>

                {/* Option 3: IA Prompt */}
                <button
                  type="button"
                  onClick={() => setTab('ai')}
                  className="group relative flex flex-col justify-between rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/10 to-transparent p-5 text-left transition-all duration-200 hover:border-indigo-500/50 hover:bg-indigo-500/[0.08] hover:shadow-lg hover:shadow-indigo-500/20">
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/30">
                      <Wand2 className="h-5 w-5" />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-white">Générer avec l'IA</h3>
                      <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                        5 sec
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                      Décrivez votre besoin en une phrase, l’IA crée les champs et options adaptés.
                    </p>
                  </div>
                  <div className="mt-5 flex items-center text-xs font-medium text-indigo-300 group-hover:text-indigo-200">
                    <span>Générer</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              </motion.div>
            )}

            {/* 2. Templates Gallery View */}
            {tab === 'templates' && (
              <motion.div
                key="templates"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4">
                
                {/* Category Filters */}
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setSelectedCategory(cat.value)}
                      className={cn(
                        'rounded-full px-3 py-1 text-xs transition-colors',
                        selectedCategory === cat.value
                          ? 'bg-indigo-600 font-medium text-white shadow-sm'
                          : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                      )}>
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Templates Grid */}
                <div className="grid max-h-[360px] grid-cols-1 gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
                  {filteredTemplates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => handleTemplatePick(template)}
                      className="group cursor-pointer rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition-all duration-200 hover:border-indigo-500/40 hover:bg-indigo-500/[0.05]">
                      <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/5 text-lg">
                          {template.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-semibold text-white group-hover:text-indigo-300">
                            {template.title}
                          </h4>
                          <p className="mt-1 line-clamp-2 text-xs text-slate-400">
                            {template.description}
                          </p>
                          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500">
                            <span>{template.blocks.length} champs configurés</span>
                            <span className="font-medium text-indigo-400 opacity-0 transition-opacity group-hover:opacity-100">
                              Utiliser ↵
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 3. AI Prompt View */}
            {tab === 'ai' && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4">
                
                <form onSubmit={handleAiSubmit} className="space-y-3">
                  <div className="relative">
                    <textarea
                      rows={3}
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Ex: Formulaire d’inscription pour une conférence tech à Antananarivo avec choix d’ateliers et pass étudiant..."
                      className="w-full rounded-2xl border border-indigo-500/30 bg-slate-900/80 p-3.5 text-xs text-white placeholder-slate-500 shadow-inner focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-[11px] text-slate-400">
                      💡 Plus votre description est précise, plus les champs seront pertinents.
                    </p>
                    <button
                      type="submit"
                      disabled={!aiPrompt.trim()}
                      className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2 text-xs font-medium text-white shadow-md shadow-indigo-500/25 transition-all hover:brightness-110 disabled:opacity-40">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Générer le formulaire</span>
                    </button>
                  </div>
                </form>

                {/* Suggestions pills */}
                <div className="pt-2">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                    Exemples fréquents :
                  </span>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {AI_SUGGESTIONS.map((sugg) => (
                      <button
                        key={sugg}
                        type="button"
                        onClick={() => setAiPrompt(sugg)}
                        className="rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-1 text-[11px] text-slate-300 transition-colors hover:border-indigo-500/30 hover:bg-white/[0.07] hover:text-white">
                        {sugg}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
