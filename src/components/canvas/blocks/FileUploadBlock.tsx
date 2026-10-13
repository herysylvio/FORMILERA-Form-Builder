import React, { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CloudUpload, FileText, ImageIcon, X } from 'lucide-react';
import { QuestionLabel } from './QuestionLabel';
import { cn } from '../../../utils/cn';
import { formatBytes } from '../../../utils/blocks';
import { springSoft } from '../../../utils/motion';
import type { FormBlock } from '../../../types/form';

interface FileUploadBlockProps {
  block: FormBlock;
  onChange: (patch: Partial<FormBlock>) => void;
}

interface PickedFile {
  name: string;
  size: number;
}

export function FileUploadBlock({ block, onChange }: FileUploadBlockProps) {
  const id = useId();
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<PickedFile[]>([]);
  const isImage = block.type === 'image';
  const Icon = isImage ? ImageIcon : CloudUpload;

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const picked = Array.from(list).map((f) => ({ name: f.name, size: f.size }));
    setFiles((prev) => isImage ? picked.slice(0, 1) : [...prev, ...picked]);
  };

  return (
    <div className="space-y-3">
      <QuestionLabel value={block.label} onChange={(label) => onChange({ label })} />
      <label
        htmlFor={id}
        onDragOver={(e) => {e.preventDefault();setDragging(true);}}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {e.preventDefault();setDragging(false);addFiles(e.dataTransfer.files);}}
        className={cn(
          'group/drop relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed px-6 py-10 text-center transition-[border-color,background-color] duration-200',
          dragging ?
          'border-indigo-500/70 bg-indigo-500/[0.06]' :
          'border-slate-300 bg-white/40 hover:border-indigo-400/50 dark:border-white/[0.14] dark:bg-white/[0.015] dark:hover:border-indigo-400/40'
        )}>
        
        <span
          aria-hidden="true"
          className={cn('pointer-events-none absolute inset-0 transition-opacity duration-300', dragging ? 'opacity-100' : 'opacity-60 group-hover/drop:opacity-100')}
          style={{ background: 'radial-gradient(circle at 50% 35%, rgba(99,102,241,0.18), transparent 60%)' }} />
        
        <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-indigo-500 shadow-sm dark:border-white/10 dark:bg-white/[0.05] dark:text-indigo-300 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="relative mt-4 text-sm font-medium text-slate-800 dark:text-slate-200">
          {dragging ? 'Relâchez pour importer' : isImage ? 'Glissez une image ici' : 'Glissez vos fichiers ici'}
        </p>
        <span className="relative mt-3 inline-flex items-center gap-1.5 rounded-full border border-indigo-500/25 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-300">
          Drop files or browse
        </span>
        <p className="relative mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
          {isImage ? 'PNG, JPG, WEBP · 5 MB max' : 'PDF, PNG, JPG · 10 MB max'}
        </p>
        <input id={id} type="file" multiple={!isImage} accept={isImage ? 'image/*' : undefined} className="sr-only" onChange={(e) => addFiles(e.target.files)} />
      </label>
      <AnimatePresence initial={false}>
        {files.map((file, i) =>
        <motion.div
          key={`${file.name}-${i}`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, height: 0 }}
          transition={springSoft}
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/60 px-3 py-2 text-sm dark:border-white/[0.08] dark:bg-white/[0.03]">
          
            <FileText className="h-4 w-4 text-slate-400" aria-hidden="true" />
            <span className="flex-1 truncate text-slate-700 dark:text-slate-200">{file.name}</span>
            <span className="font-mono text-[11px] text-slate-400">{formatBytes(file.size)}</span>
            <button
            type="button"
            onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
            aria-label={`Remove ${file.name}`}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/[0.06] dark:hover:text-slate-200">
            
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>);

}