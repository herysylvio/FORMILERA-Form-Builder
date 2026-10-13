import type { AnswerEntry, FilterId, Submission } from '../types/submission';

export const NOW = new Date('2026-10-13T16:43:00');
const DAY = 24 * 60 * 60 * 1000;
const MONTHS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
const pad = (n: number) => String(n).padStart(2, '0');

export function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function formatLongDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()} · ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m ? `${m}m ${pad(s)}s` : `${s}s`;
}

export function formatElapsed(seconds: number): string {
  return `+${Math.floor(seconds / 60)}:${pad(seconds % 60)}`;
}

export function initials(name: string): string {
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
}

const AVATAR_TONES = [
'bg-indigo-500/20 text-indigo-200 ring-indigo-400/30',
'bg-emerald-500/20 text-emerald-200 ring-emerald-400/30',
'bg-violet-500/20 text-violet-200 ring-violet-400/30',
'bg-amber-500/20 text-amber-200 ring-amber-400/30',
'bg-sky-500/20 text-sky-200 ring-sky-400/30',
'bg-rose-500/20 text-rose-200 ring-rose-400/30'];


export function avatarTone(id: string): string {
  const hash = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_TONES[hash % AVATAR_TONES.length];
}

export function keyAnswers(s: Submission): string[] {
  return [s.sector, ...s.challenges].filter(Boolean);
}

export function filterSubmissions(rows: Submission[], query: string, filters: FilterId[]): Submission[] {
  const q = query.trim().toLowerCase();
  return rows.filter((s) => {
    if (filters.includes('last7') && NOW.getTime() - new Date(s.submittedAt).getTime() > 7 * DAY) return false;
    if (filters.includes('complete') && s.status !== 'complete') return false;
    if (filters.includes('nps8') && (s.nps === null || s.nps <= 8)) return false;
    if (!q) return true;
    return [s.id, s.name, s.email, formatTimestamp(s.submittedAt), ...keyAnswers(s)].some((v) => v.toLowerCase().includes(q));
  });
}

export function sortByDate(rows: Submission[]): Submission[] {
  return [...rows].sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

export function buildAnswers(s: Submission): AnswerEntry[] {
  const raw: Omit<AnswerEntry, 'elapsed'>[] = [
  { label: 'Prénom', kind: 'text', value: s.name.split(' ')[0] },
  { label: "Secteur d'activité", kind: 'text', value: s.sector || null },
  { label: 'Taille de l’équipe', kind: 'text', value: s.teamSize || null },
  { label: 'Principal défi ce trimestre', kind: 'chips', value: s.challenges.length ? s.challenges : null },
  { label: 'Outils de collaboration', kind: 'rating', value: s.rating },
  { label: 'Fréquence de livraison', kind: 'text', value: s.frequency || null },
  { label: 'La baguette magique', kind: 'quote', value: s.idea || null },
  { label: 'Probabilité de recommandation', kind: 'nps', value: s.nps },
  { label: 'E-mail', kind: 'text', value: s.status === 'complete' ? s.email : null }];

  return raw.map((a, i) => ({ ...a, elapsed: Math.round(s.duration * (i + 1) / raw.length) }));
}

export function toCSV(rows: Submission[]): string {
  const header = ['id', 'horodatage', 'nom', 'email', 'statut', 'completion', 'secteur', 'defis', 'note', 'nps', 'duree_s', 'appareil'];
  const escape = (v: string | number | null) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const lines = rows.map((s) =>
  [s.id, s.submittedAt, s.name, s.email, s.status, s.completion, s.sector, s.challenges.join(' | '), s.rating, s.nps, s.duration, s.device].map(escape).join(',')
  );
  return [header.join(','), ...lines].join('\n');
}

export function downloadFile(filename: string, content: string, mime: string): void {
  const url = URL.createObjectURL(new Blob([content], { type: mime }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}