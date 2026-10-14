import type { FormBlock } from '../types/form';

export function isBlockVisible(block: FormBlock, answers: Record<string, any>): boolean {
  if (!block.condition) return true;
  const answer = answers[block.condition.sourceBlockId];
  if (answer === undefined || answer === null || answer === '') return false;

  const targetValue = block.condition.value;

  switch (block.condition.operator) {
    case 'equals':
      if (Array.isArray(answer)) {
        return answer.map(String).includes(String(targetValue));
      }
      return String(answer).trim().toLowerCase() === String(targetValue).trim().toLowerCase();

    case 'not_equals':
      if (Array.isArray(answer)) {
        return !answer.map(String).includes(String(targetValue));
      }
      return String(answer).trim().toLowerCase() !== String(targetValue).trim().toLowerCase();

    case 'greater_than':
      return Number(answer) > Number(targetValue);

    case 'less_than':
      return Number(answer) < Number(targetValue);

    default:
      return true;
  }
}
