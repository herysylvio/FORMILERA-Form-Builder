import { useCallback, useEffect, useRef, useState } from 'react';
import { formMeta, initialBlocks } from '../data/sampleForm';
import { createBlock, createId } from '../utils/blocks';
import type { BlockDraft, BlockType, FormBlock, SaveState, SlashState } from '../types/form';
import type { FormTemplate } from '../types/template';

export function useFormBuilder(initialSlashOpen: boolean) {
  const [title, setTitleState] = useState(formMeta.title);
  const [description, setDescriptionState] = useState(formMeta.description);
  const [icon, setIconState] = useState(formMeta.icon);
  const [hasCover, setHasCoverState] = useState(true);
  const [blocks, setBlocks] = useState<FormBlock[]>(initialBlocks);
  const [activeId, setActiveId] = useState<string | null>('b3');
  const [slash, setSlash] = useState<SlashState | null>(
    initialSlashOpen ? { afterId: initialBlocks[initialBlocks.length - 1].id, autoFocus: false } : null
  );
  const [saveState, setSaveState] = useState<SaveState>('saved');
  const saveTimer = useRef<number>();

  useEffect(() => {
    setSlash(initialSlashOpen ? { afterId: initialBlocks[initialBlocks.length - 1].id, autoFocus: false } : null);
  }, [initialSlashOpen]);

  useEffect(() => () => window.clearTimeout(saveTimer.current), []);

  const markDirty = useCallback(() => {
    setSaveState('saving');
    window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => setSaveState('saved'), 900);
  }, []);

  const setTitle = useCallback((v: string) => {setTitleState(v);markDirty();}, [markDirty]);
  const setDescription = useCallback((v: string) => {setDescriptionState(v);markDirty();}, [markDirty]);
  const setIcon = useCallback((v: string) => {setIconState(v);markDirty();}, [markDirty]);
  const setHasCover = useCallback((v: boolean) => {setHasCoverState(v);markDirty();}, [markDirty]);

  const updateBlock = useCallback(
    (id: string, patch: Partial<FormBlock>) => {
      setBlocks((prev) => prev.map((b) => b.id === id ? { ...b, ...patch } : b));
      markDirty();
    },
    [markDirty]
  );

  const insertBlocks = useCallback(
    (items: FormBlock[], afterId: string | null) => {
      setBlocks((prev) => {
        const index = afterId ? prev.findIndex((b) => b.id === afterId) : -1;
        if (index === -1) return [...prev, ...items];
        const next = [...prev];
        next.splice(index + 1, 0, ...items);
        return next;
      });
      setActiveId(items[0]?.id ?? null);
      markDirty();
    },
    [markDirty]
  );

  const addBlock = useCallback(
    (type: BlockType, afterId: string | null) => {
      insertBlocks([createBlock(type)], afterId);
      setSlash(null);
    },
    [insertBlocks]
  );

  const appendBlocks = useCallback(
    (drafts: BlockDraft[]) => {
      insertBlocks(drafts.map((d) => ({ ...d, id: createId(), options: d.options ? [...d.options] : undefined })), null);
    },
    [insertBlocks]
  );

  const duplicateBlock = useCallback(
    (id: string) => {
      const source = blocks.find((b) => b.id === id);
      if (!source) return;
      insertBlocks([{ ...source, id: createId(), options: source.options ? [...source.options] : undefined }], id);
    },
    [blocks, insertBlocks]
  );

  const deleteBlock = useCallback(
    (id: string) => {
      const index = blocks.findIndex((b) => b.id === id);
      const next = blocks.filter((b) => b.id !== id);
      setBlocks(next);
      setActiveId(next[Math.max(0, index - 1)]?.id ?? null);
      setSlash((s) => s?.afterId === id ? null : s);
      markDirty();
    },
    [blocks, markDirty]
  );

  const reorderBlocks = useCallback(
    (next: FormBlock[]) => {
      setBlocks(next);
      markDirty();
    },
    [markDirty]
  );

  const openSlash = useCallback((afterId: string | null, autoFocus = true) => {
    setSlash({ afterId, autoFocus });
  }, []);

  const closeSlash = useCallback(() => setSlash(null), []);

  // Typing "/" anywhere outside a text field opens the block palette after the active block.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest('input, textarea, [contenteditable="true"]')) return;
      e.preventDefault();
      openSlash(activeId ?? blocks[blocks.length - 1]?.id ?? null, true);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activeId, blocks, openSlash]);

  const loadBlank = useCallback(() => {
    setTitleState('Formulaire sans titre');
    setDescriptionState('');
    setIconState('📝');
    setHasCoverState(false);
    setBlocks([]);
    setActiveId(null);
    setSlash(null);
    markDirty();
  }, [markDirty]);

  const loadTemplate = useCallback(
    (template: FormTemplate) => {
      setTitleState(template.title);
      setDescriptionState(template.description);
      setIconState(template.icon);
      setHasCoverState(true);
      setBlocks(template.blocks.map((b) => ({ ...b, id: createId() })));
      setActiveId(template.blocks[0]?.id ?? null);
      setSlash(null);
      markDirty();
    },
    [markDirty]
  );

  return {
    title,
    setTitle,
    description,
    setDescription,
    icon,
    setIcon,
    hasCover,
    setHasCover,
    blocks,
    activeId,
    setActiveId,
    slash,
    openSlash,
    closeSlash,
    saveState,
    updateBlock,
    addBlock,
    appendBlocks,
    duplicateBlock,
    deleteBlock,
    reorderBlocks,
    loadBlank,
    loadTemplate
  };
}

export type FormBuilder = ReturnType<typeof useFormBuilder>;