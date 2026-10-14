import type { FormBlock } from './form';

export type TemplateCategory = 'business' | 'feedback' | 'hr' | 'events' | 'custom';

export interface FormTemplate {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: TemplateCategory;
  blocks: FormBlock[];
  isCustom?: boolean;
  createdAt?: string;
}
