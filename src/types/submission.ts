export type SubmissionStatus = 'complete' | 'partial';

export interface Submission {
  id: string;
  submittedAt: string;
  name: string;
  email: string;
  status: SubmissionStatus;
  completion: number;
  sector: string;
  teamSize: string;
  challenges: string[];
  rating: number | null;
  frequency: string;
  idea: string;
  nps: number | null;
  read: boolean;
  duration: number;
  device: string;
  browser: string;
  ip: string;
}

export type FilterId = 'last7' | 'complete' | 'nps8';

export type AnswerKind = 'text' | 'chips' | 'rating' | 'nps' | 'quote';

export interface AnswerEntry {
  label: string;
  kind: AnswerKind;
  value: string | string[] | number | null;
  elapsed: number;
}