import { blockCatalog, type BlockCatalogItem } from '../data/blockCatalog';
import { aiPresets, fallbackPreset, type AiPreset } from '../data/aiPresets';
import type { BlockType, FormBlock } from '../types/form';

const NON_QUESTION: BlockType[] = ['heading', 'description', 'divider', 'image'];

export function createId(): string {
  return `b_${Math.random().toString(36).slice(2, 10)}`;
}

export function getCatalogItem(type: BlockType): BlockCatalogItem {
  return blockCatalog.find((item) => item.type === type) ?? blockCatalog[0];
}

export function isQuestion(type: BlockType): boolean {
  return !NON_QUESTION.includes(type);
}

export function createBlock(type: BlockType): FormBlock {
  const item = getCatalogItem(type);
  return {
    id: createId(),
    type,
    label: item.defaultLabel,
    placeholder: item.defaultPlaceholder,
    options: item.defaultOptions ? [...item.defaultOptions] : undefined,
    required: false
  };
}

export function matchPreset(prompt: string): AiPreset {
  const q = prompt.toLowerCase();
  return aiPresets.find((p) => p.keywords.some((k) => q.includes(k))) ?? fallbackPreset;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}