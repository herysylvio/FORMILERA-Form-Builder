import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Trash2, X } from 'lucide-react';
import type { BlockCondition, ConditionOperator, FormBlock } from '../../types/form';
import { cn } from '../../utils/cn';

interface ConditionEditorProps {
  block: FormBlock;
  availableSources: FormBlock[];
  onChange: (condition: BlockCondition | undefined) => void;
  onClose: () => void;
}

const OPERATORS: { label: string; value: ConditionOperator }[] = [
  { label: 'est égal à', value: 'equals' },
  { label: 'n’est pas égal à', value: 'not_equals' },
  { label: 'est supérieur à (>)', value: 'greater_than' },
  { label: 'est inférieur à (<)', value: 'less_than' }
];

export function ConditionEditor({ block, availableSources, onChange, onClose }: ConditionEditorProps) {
  const currentCondition: BlockCondition = block.condition || {
    sourceBlockId: availableSources[0]?.id || '',
    operator: 'equals',
    value: availableSources[0]?.options?.[0] || ''
  };

  const selectedSource = availableSources.find((b) => b.id === currentCondition.sourceBlockId);

  const handleSourceChange = (newSourceId: string) => {
    const src = availableSources.find((b) => b.id === newSourceId);
    onChange({
      sourceBlockId: newSourceId,
      operator: currentCondition.operator,
      value: src?.options?.[0] || ''
    });
  };

  const handleOperatorChange = (op: ConditionOperator) => {
    onChange({
      ...currentCondition,
      operator: op
    });
  };

  const handleValueChange = (val: string) => {
    onChange({
      ...currentCondition,
      value: val
    });
  };

  const handleRemove = () => {
    onChange(undefined);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0, y: -4 }}
      animate={{ opacity: 1, height: 'auto', y: 0 }}
      exit={{ opacity: 0, height: 0, y: -4 }}
      className="mt-3 overflow-hidden rounded-xl border border-indigo-500/20 bg-indigo-50/50 p-3.5 text-xs text-slate-800 backdrop-blur-md dark:border-indigo-500/30 dark:bg-slate-900/90 dark:text-slate-200">
      
      <div className="flex items-center justify-between pb-2.5">
        <div className="flex items-center gap-1.5 font-medium text-indigo-600 dark:text-indigo-400">
          <GitBranch className="h-3.5 w-3.5" />
          <span>Condition de visibilité</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded p-1 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-white/10 dark:hover:text-slate-200">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {availableSources.length === 0 ? (
        <p className="py-2 text-[11px] text-slate-500 dark:text-slate-400">
          Ajoutez au moins une question au-dessus de ce bloc pour pouvoir configurer une condition.
        </p>
      ) : (
        <div className="space-y-2.5">
          <p className="text-[11px] text-slate-600 dark:text-slate-400">
            Afficher ce champ <span className="font-semibold text-indigo-600 dark:text-indigo-400">UNIQUEMENT SI</span> :
          </p>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {/* 1. Question source */}
            <select
              value={currentCondition.sourceBlockId}
              onChange={(e) => handleSourceChange(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-800 shadow-sm focus:border-indigo-500 focus:outline-none dark:border-white/10 dark:bg-slate-800 dark:text-slate-200">
              {availableSources.map((src, idx) => (
                <option key={src.id} value={src.id}>
                  Q{idx + 1}. {src.label ? (src.label.length > 25 ? `${src.label.slice(0, 25)}...` : src.label) : src.type}
                </option>
              ))}
            </select>

            {/* 2. Opérateur */}
            <select
              value={currentCondition.operator}
              onChange={(e) => handleOperatorChange(e.target.value as ConditionOperator)}
              className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-800 shadow-sm focus:border-indigo-500 focus:outline-none dark:border-white/10 dark:bg-slate-800 dark:text-slate-200">
              {OPERATORS.map((op) => (
                <option key={op.value} value={op.value}>
                  {op.label}
                </option>
              ))}
            </select>

            {/* 3. Valeur cible */}
            {selectedSource?.options && selectedSource.options.length > 0 ? (
              <select
                value={String(currentCondition.value)}
                onChange={(e) => handleValueChange(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-800 shadow-sm focus:border-indigo-500 focus:outline-none dark:border-white/10 dark:bg-slate-800 dark:text-slate-200">
                {selectedSource.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={String(currentCondition.value)}
                onChange={(e) => handleValueChange(e.target.value)}
                placeholder="Valeur requise..."
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 shadow-sm focus:border-indigo-500 focus:outline-none dark:border-white/10 dark:bg-slate-800 dark:text-slate-200"
              />
            )}
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-1 text-[11px] text-rose-500 transition-colors hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300">
              <Trash2 className="h-3 w-3" />
              <span>Supprimer la condition</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-indigo-600 px-2.5 py-1 text-[11px] font-medium text-white shadow-sm transition-colors hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400">
              Enregistrer
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
