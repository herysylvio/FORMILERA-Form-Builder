import React from 'react';
import { QuestionLabel } from './QuestionLabel';
import { TextFieldBlock } from './TextFieldBlock';
import { ChoiceBlock } from './ChoiceBlock';
import { RatingBlock } from './RatingBlock';
import { FileUploadBlock } from './FileUploadBlock';
import { NpsBlock, PaymentBlock } from './ScaleAndPaymentBlocks';
import type { FormBlock } from '../../../types/form';

interface BlockRendererProps {
  block: FormBlock;
  isActive: boolean;
  onChange: (patch: Partial<FormBlock>) => void;
}

export function BlockRenderer({ block, isActive, onChange }: BlockRendererProps) {
  switch (block.type) {
    case 'heading':
      return (
        <div className="space-y-1">
          <QuestionLabel variant="heading" value={block.label} onChange={(label) => onChange({ label })} placeholder="Section title" />
          <input
            value={block.description ?? ''}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="Add a subtitle (optional)"
            aria-label="Section subtitle"
            className="w-full bg-transparent text-sm text-slate-500 outline-none placeholder:text-slate-400/70 dark:text-slate-400 dark:placeholder:text-slate-600" />
          
        </div>);

    case 'description':
      return (
        <textarea
          value={block.label}
          onChange={(e) => onChange({ label: e.target.value })}
          rows={2}
          placeholder="Write something helpful for respondents…"
          aria-label="Description text"
          className="w-full resize-none bg-transparent text-[15px] leading-relaxed text-slate-600 outline-none placeholder:text-slate-400 dark:text-slate-300 dark:placeholder:text-slate-600" />);


    case 'divider':
      return <div role="separator" className="my-2 h-px bg-slate-200 dark:bg-white/10" />;
    case 'multiChoice':
    case 'dropdown':
      return <ChoiceBlock block={block} isActive={isActive} onChange={onChange} />;
    case 'rating':
      return <RatingBlock block={block} onChange={onChange} />;
    case 'fileUpload':
    case 'image':
      return <FileUploadBlock block={block} onChange={onChange} />;
    case 'nps':
      return <NpsBlock block={block} onChange={onChange} />;
    case 'payment':
      return <PaymentBlock block={block} onChange={onChange} />;
    default:
      return <TextFieldBlock block={block} onChange={onChange} />;
  }
}