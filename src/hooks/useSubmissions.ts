import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { submissions as seed } from '../data/submissions';
import { downloadFile, filterSubmissions, sortByDate, toCSV } from '../utils/submissions';
import type { FilterId, Submission } from '../types/submission';

export function useSubmissions() {
  const [rows, setRows] = useState<Submission[]>(seed);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<FilterId[]>(['last7']);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [openId, setOpenId] = useState<string | null>(null);
  const [live, setLive] = useState(true);
  const searchRef = useRef<HTMLInputElement>(null);

  const visible = useMemo(() => filterSubmissions(rows, query, filters), [rows, query, filters]);
  const openIndex = visible.findIndex((r) => r.id === openId);
  const openSubmission = openIndex >= 0 ? visible[openIndex] : null;

  const markRead = useCallback((ids: string[], read: boolean) => {
    setRows((prev) => prev.map((r) => ids.includes(r.id) ? { ...r, read } : r));
  }, []);

  const open = useCallback(
    (id: string) => {
      setOpenId(id);
      markRead([id], true);
    },
    [markRead]
  );

  const close = useCallback(() => setOpenId(null), []);

  const step = useCallback(
    (dir: 1 | -1) => {
      const next = visible[openIndex + dir];
      if (next) open(next.id);
    },
    [open, openIndex, visible]
  );

  const toggleFilter = useCallback((id: FilterId) => {
    setFilters((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters([]);
    setQuery('');
  }, []);

  const toggleSelect = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);else
      next.add(id);
      return next;
    });
  }, []);

  const allSelected = visible.length > 0 && visible.every((r) => selected.has(r.id));
  const someSelected = visible.some((r) => selected.has(r.id));

  const toggleAll = useCallback(() => {
    setSelected(allSelected ? new Set() : new Set(visible.map((r) => r.id)));
  }, [allSelected, visible]);

  const clearSelection = useCallback(() => setSelected(new Set()), []);

  const remove = useCallback(
    (ids: string[]) => {
      const removed = rows.filter((r) => ids.includes(r.id));
      if (!removed.length) return;
      if (openId && ids.includes(openId)) {
        const neighbour = visible.slice(openIndex + 1).find((r) => !ids.includes(r.id)) ?? visible.slice(0, openIndex).reverse().find((r) => !ids.includes(r.id));
        setOpenId(neighbour?.id ?? null);
      }
      setRows((prev) => prev.filter((r) => !ids.includes(r.id)));
      setSelected((prev) => new Set([...prev].filter((id) => !ids.includes(id))));
      toast(removed.length === 1 ? `Réponse ${removed[0].id} supprimée` : `${removed.length} réponses supprimées`, {
        action: { label: 'Annuler', onClick: () => setRows((prev) => sortByDate([...prev, ...removed])) }
      });
    },
    [openId, openIndex, rows, visible]
  );

  const exportRows = useCallback(
    (format: 'csv' | 'json') => {
      const target = selected.size ? visible.filter((r) => selected.has(r.id)) : visible;
      if (!target.length) {
        toast.error('Aucune réponse à exporter');
        return;
      }
      if (format === 'csv') downloadFile('formilera-reponses.csv', toCSV(target), 'text/csv;charset=utf-8');else
      downloadFile('formilera-reponses.json', JSON.stringify(target, null, 2), 'application/json');
      toast.success(`${target.length} réponse${target.length > 1 ? 's' : ''} exportée${target.length > 1 ? 's' : ''} en ${format.toUpperCase()}`);
    },
    [selected, visible]
  );

  const toggleLive = useCallback((next: boolean) => {
    setLive(next);
    toast(next ? 'Le formulaire accepte de nouveau les réponses' : 'Formulaire fermé aux nouvelles réponses');
  }, []);

  // ⌘F / Ctrl+F focuses the table search.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return {
    rows,
    visible,
    query,
    setQuery,
    filters,
    toggleFilter,
    resetFilters,
    selected,
    toggleSelect,
    toggleAll,
    allSelected,
    someSelected,
    clearSelection,
    openSubmission,
    openIndex,
    open,
    close,
    step,
    markRead,
    remove,
    exportRows,
    live,
    toggleLive,
    searchRef
  };
}

export type SubmissionsState = ReturnType<typeof useSubmissions>;