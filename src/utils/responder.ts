import type { AnswerValue, ResponderQuestion } from '../types/responder';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const OPTION_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function getAnswerError(question: ResponderQuestion, value: AnswerValue | undefined): string | null {
  const empty =
  value === undefined || Array.isArray(value) && value.length === 0 || typeof value === 'string' && value.trim() === '';

  if (question.type === 'email' && typeof value === 'string' && value.trim() !== '' && !EMAIL_RE.test(value.trim())) {
    return 'Entrez une adresse e-mail valide.';
  }
  if (!question.required || !empty) return null;

  switch (question.type) {
    case 'multiSelect':
      return 'Sélectionnez au moins une option pour continuer.';
    case 'singleSelect':
      return 'Choisissez une option pour continuer.';
    case 'rating':
      return 'Attribuez une note pour continuer.';
    case 'email':
      return 'Votre e-mail est requis pour recevoir le rapport.';
    default:
      return 'Ce champ est requis.';
  }
}

export function splitKeyword(label: string, keyword?: string): [string, string, string] {
  if (!keyword) return [label, '', ''];
  const i = label.toLowerCase().indexOf(keyword.toLowerCase());
  if (i === -1) return [label, '', ''];
  return [label.slice(0, i), label.slice(i, i + keyword.length), label.slice(i + keyword.length)];
}