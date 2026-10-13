import React from 'react';
import { AnimatePresence, motion, Reorder } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Kbd } from '../formilera/Kbd';
import { CoverHeader } from './CoverHeader';
import { BlockShell } from './BlockShell';
import { SlashInsertRow } from './SlashInsertRow';
import { BlockRenderer } from './blocks/BlockRenderer';
import { useTheme } from '../../contexts/ThemeContext';
import { cn } from '../../utils/cn';
import { springSoft } from '../../utils/motion';
import type { FormBuilder } from '../../hooks/useFormBuilder';
import type { DevicePreview, ExperienceMode } from '../../types/form';

interface FormCanvasProps {
  builder: FormBuilder;
  mode: ExperienceMode;
  device: DevicePreview;
}

const WIDTHS: Record<DevicePreview, string> = {
  desktop: 'max-w-3xl',
  tablet: 'max-w-xl',
  mobile: 'max-w-[400px]'
};

export function FormCanvas({ builder, mode, device }: FormCanvasProps) {
  const theme = useTheme();
  const { blocks, activeId, slash } = builder;
  const framed = device !== 'desktop';
  const lastId = blocks[blocks.length - 1]?.id ?? null;

  return (
    <div className="px-4 pb-48 pt-8 sm:px-8 md:pl-24 md:pr-12 lg:pt-12">
      <motion.div
        layout
        transition={springSoft}
        className={cn(
          'mx-auto w-full',
          WIDTHS[device],
          framed && 'rounded-[28px] border border-slate-200 bg-white/50 p-4 backdrop-blur-sm dark:border-white/[0.08] dark:bg-white/[0.015] sm:p-5'
        )}>
        
        <CoverHeader
          hasCover={builder.hasCover}
          onCoverChange={builder.setHasCover}
          icon={builder.icon}
          onIconChange={builder.setIcon}
          title={builder.title}
          onTitleChange={builder.setTitle}
          description={builder.description}
          onDescriptionChange={builder.setDescription} />
        

        <Reorder.Group
          as="div"
          axis="y"
          values={blocks}
          onReorder={builder.reorderBlocks}
          className={cn('flex flex-col', mode === 'card' ? 'gap-4' : 'gap-1.5')}>
          
          <AnimatePresence initial={false}>
            {blocks.map((block) => {
              const showSlash = slash?.afterId === block.id;
              return (
                <BlockShell
                  key={block.id}
                  block={block}
                  isActive={activeId === block.id}
                  mode={mode}
                  showGutter={!framed}
                  hasPopover={showSlash}
                  onActivate={() => builder.setActiveId(block.id)}
                  onAddBelow={() => builder.openSlash(block.id, true)}
                  onDuplicate={() => builder.duplicateBlock(block.id)}
                  onDelete={() => builder.deleteBlock(block.id)}
                  onChange={(patch) => builder.updateBlock(block.id, patch)}
                  after={
                  showSlash && slash ?
                  <SlashInsertRow
                    autoFocus={slash.autoFocus}
                    onSelect={(type) => builder.addBlock(type, block.id)}
                    onClose={builder.closeSlash} /> :

                  null
                  }>
                  
                  <BlockRenderer block={block} isActive={activeId === block.id} onChange={(patch) => builder.updateBlock(block.id, patch)} />
                </BlockShell>);

            })}
          </AnimatePresence>
        </Reorder.Group>

        {slash && slash.afterId === null &&
        <div className="relative z-30">
            <SlashInsertRow autoFocus={slash.autoFocus} onSelect={(type) => builder.addBlock(type, null)} onClose={builder.closeSlash} />
          </div>
        }

        {blocks.length === 0 && !slash &&
        <p className="px-6 py-10 text-center text-sm text-slate-500">Your form is empty. Add a first block or describe one to the AI below.</p>
        }

        <button
          type="button"
          onClick={() => builder.openSlash(lastId, true)}
          className="group/add mt-4 flex w-full items-center gap-2 rounded-xl border border-dashed border-transparent px-6 py-3 text-sm text-slate-400 transition hover:border-slate-300 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50 dark:text-slate-500 dark:hover:border-white/10 dark:hover:text-slate-200">
          
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add block
          <span className="ml-auto inline-flex items-center gap-1.5 text-xs opacity-0 transition-opacity group-hover/add:opacity-100">
            or type <Kbd tone={theme === 'dark' ? 'dark' : 'light'}>/</Kbd>
          </span>
        </button>
      </motion.div>
    </div>);

}