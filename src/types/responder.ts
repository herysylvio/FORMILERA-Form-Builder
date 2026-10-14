import type { BlockCondition } from './form';

export type ResponderQuestionType = 'shortText' | 'email' | 'longText' | 'singleSelect' | 'multiSelect' | 'rating';

export interface ResponderOption {
  id: string;
  label: string;
  keyword?: string;
}

export interface ResponderQuestion {
  id: string;
  type: ResponderQuestionType;
  title: string;
  hint: string;
  required: boolean;
  placeholder?: string;
  options?: ResponderOption[];
  condition?: BlockCondition;
}

export type AnswerValue = string | string[] | number;
export type Answers = Record<string, AnswerValue>;
export type SubmitState = 'idle' | 'submitting' | 'done';