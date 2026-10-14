import React from 'react';
import { AnimatePresence, motion, Reorder, useDragControls } from 'framer-motion';
import { GitBranch, GripVertical, Plus } from 'lucide-react';
import { Tooltip } from '../formilera/Tooltip';
import { BlockToolbar } from './BlockToolbar';
import { ConditionEditor } from './ConditionEditor';
import { getCatalogItem, isQuestion } from '../../utils/blocks';
import { cn } from '../../utils/cn';
import { springSoft } from '../../utils/motion';
import type { ExperienceMode, FormBlock } from '../../types/form';

interface BlockShellProps {
  block: FormBlock;
  isActive: boolean;
  mode: ExperienceMode;
  showGutter: boolean;
  hasPopover: boolean;
  availableSources?: FormBlock[];
  onActivate: () => void;
  onAddBelow: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onChange: (patch: Partial<FormBlock>) => void;
  children: React.ReactNode;
  after?: React.ReactNode;
}

const gutterBtn =
'flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-200/70 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 dark:text-slate-500 dark:hover:bg-white/[0.06] dark:hover:text-slate-200';

export function BlockShell({ block, isActive, mode, showGutter, hasPopover, availableSources = [], onActivate, onAddBelow, onDuplicate, onDelete, onChange, children, after }: BlockShellProps) {
  const controls = useDragControls();
  const item = getCatalogItem(block.type);
  const Icon = item.icon;
  const question = isQuestion(block.type);
  const isCard = mode === 'card';

  return (
    <Reorder.Item
      as="div"
      value={block}
      dragListener={false}
      dragControls={controls}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
      transition={springSoft}
      whileDrag={{ scale: 1.01 }}
      className={cn('group relative', isActive && 'z-20', hasPopover && 'z-30')}>
      
      {showGutter &&
      <div className="absolute -left-[68px] top-5 hidden items-center gap-0.5 opacity-0 transition-opacity duration-200 focus-within:opacity-100 group-hover:opacity-100 md:flex">
          <Tooltip label="Add block" shortcut="/">
            <button type="button" aria-label="Add block below" onClick={onAddBelow} className={gutterBtn}>
              <Plus className="h-4 w-4" />
            </button>
          </Tooltip>
          <Tooltip label="Drag to move">
            <button
            type="button"
            aria-label="Drag to reorder"
            onPointerDown={(e) => controls.start(e)}
            className={cn(gutterBtn, 'cursor-grab touch-none active:cursor-grabbing')}>
            
              <GripVertical className="h-4 w-4" />
            </button>
          </Tooltip>
        </div>
      }

      <div
        role="group"
        aria-label={block.label || item.label}
        onClick={onActivate}
        onFocusCapture={onActivate}
        className={cn(
          'relative rounded-2xl border px-5 py-5 transition-[background-color,border-color,box-shadow] duration-200 sm:px-6',
          isCard ?
          isActive ?
          'border-indigo-500/30 bg-white shadow-[0_0_0_4px_rgba(99,102,241,0.06)] dark:bg-indigo-500/[0.05] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_0_4px_rgba(99,102,241,0.05)]' :
          'border-slate-200/80 bg-white/70 backdrop-blur-sm hover:border-slate-300 dark:border-white/[0.07] dark:bg-white/[0.025] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] dark:hover:border-white/[0.12]' :
          isActive ?
          'border-indigo-500/20 bg-indigo-50/60 dark:bg-indigo-500/[0.04]' :
          'border-transparent hover:bg-slate-100/60 dark:hover:bg-white/[0.02]'
        )}>
        
        {isActive &&
        <motion.span
          layoutId="active-block-accent"
          transition={springSoft}
          aria-hidden="true"
          className="absolute bottom-4 left-0 top-4 w-[2px] rounded-full bg-[#6366F1] shadow-[0_0_2px_rgba(99,102,241,0.85),0_0_12px_2px_rgba(99,102,241,0.55)]" />

        }
        <div
          className={cn(
            'mb-3 flex items-center gap-2 transition-opacity duration-200',
            !isCard && !isActive && 'opacity-0 group-hover:opacity-100'
          )}>
          
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
            <Icon className="h-3 w-3" aria-hidden="true" />
            {item.label}
          </span>
          {question && block.required &&
          <span className="rounded-full bg-rose-500/10 px-1.5 py-px font-mono text-[10px] uppercase tracking-[0.1em] text-rose-500 dark:text-rose-300">
              Required
            </span>
          }
          {block.condition && (
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/15 px-2 py-0.5 font-mono text-[10px] text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
              <GitBranch className="h-2.5 w-2.5" aria-hidden="true" /> 
              Condition: {block.condition.operator === 'equals' ? '=' : block.condition.operator === 'not_equals' ? '≠' : block.condition.operator === 'greater_than' ? '>' : '<'} {String(block.condition.value).slice(0, 15)}
            </span>
          )}
        </div>
        {children}

        <AnimatePresence>
          {block.hasLogic && isActive && (
            <ConditionEditor
              block={block}
              availableSources={availableSources}
              onChange={(condition) => onChange({ condition, hasLogic: Boolean(condition) })}
              onClose={() => onChange({ hasLogic: Boolean(block.condition) })}
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isActive &&
        <BlockToolbar
          required={block.required}
          hasLogic={Boolean(block.hasLogic || block.condition)}
          canBeRequired={question}
          onDuplicate={onDuplicate}
          onToggleRequired={(required) => onChange({ required })}
          onToggleLogic={() => onChange({ hasLogic: !block.hasLogic })}
          onDelete={onDelete} />

        }
      </AnimatePresence>
      {after}
    </Reorder.Item>);

}