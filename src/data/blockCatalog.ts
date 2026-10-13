import {
  AlignLeft,
  CalendarDays,
  ChevronsUpDown,
  Gauge,
  Hash,
  Heading1,
  ImageIcon,
  ListChecks,
  Mail,
  Minus,
  Phone,
  Pilcrow,
  Smartphone,
  Star,
  Type,
  Upload,
  type LucideIcon } from
'lucide-react';
import type { BlockType } from '../types/form';

export type BlockGroup = 'Questions' | 'Media & Layout' | 'Advanced';

export interface BlockCatalogItem {
  type: BlockType;
  label: string;
  description: string;
  group: BlockGroup;
  icon: LucideIcon;
  keywords: string[];
  defaultLabel: string;
  defaultPlaceholder?: string;
  defaultOptions?: string[];
}

export const blockGroups: BlockGroup[] = ['Questions', 'Media & Layout', 'Advanced'];

export const blockCatalog: BlockCatalogItem[] = [
{ type: 'shortText', label: 'Short Text', description: 'Single-line answer', group: 'Questions', icon: Type, keywords: ['text', 'input', 'name'], defaultLabel: 'Votre question courte', defaultPlaceholder: 'Tapez votre réponse…' },
{ type: 'longText', label: 'Long Text', description: 'Multi-line paragraph', group: 'Questions', icon: AlignLeft, keywords: ['paragraph', 'textarea', 'comment'], defaultLabel: 'Décrivez votre expérience', defaultPlaceholder: 'Écrivez quelques lignes…' },
{ type: 'email', label: 'Email', description: 'Validated email address', group: 'Questions', icon: Mail, keywords: ['mail', 'contact'], defaultLabel: 'Quelle est votre adresse e-mail ?', defaultPlaceholder: 'nom@entreprise.com' },
{ type: 'phone', label: 'Phone', description: 'International phone number', group: 'Questions', icon: Phone, keywords: ['tel', 'mobile', 'number'], defaultLabel: 'Votre numéro de téléphone', defaultPlaceholder: '+225 07 00 00 00 00' },
{ type: 'number', label: 'Number', description: 'Numeric value', group: 'Questions', icon: Hash, keywords: ['count', 'amount', 'digit'], defaultLabel: 'Combien de personnes dans votre équipe ?', defaultPlaceholder: 'Entrez un nombre' },
{ type: 'date', label: 'Date', description: 'Calendar date picker', group: 'Questions', icon: CalendarDays, keywords: ['calendar', 'day', 'time'], defaultLabel: 'Quelle date vous convient ?', defaultPlaceholder: 'JJ / MM / AAAA' },
{ type: 'multiChoice', label: 'Multi-Choice', description: 'Pick from lettered options', group: 'Questions', icon: ListChecks, keywords: ['choice', 'radio', 'options', 'select'], defaultLabel: 'Choisissez une option', defaultOptions: ['Option A', 'Option B', 'Option C'] },
{ type: 'dropdown', label: 'Dropdown', description: 'Compact select list', group: 'Questions', icon: ChevronsUpDown, keywords: ['select', 'list', 'menu'], defaultLabel: 'Sélectionnez votre pays', defaultOptions: ["Côte d'Ivoire", 'Sénégal', 'Cameroun', 'France'] },
{ type: 'heading', label: 'Heading', description: 'Section title', group: 'Media & Layout', icon: Heading1, keywords: ['title', 'section', 'h1'], defaultLabel: 'Nouvelle section' },
{ type: 'description', label: 'Description', description: 'Explanatory paragraph', group: 'Media & Layout', icon: Pilcrow, keywords: ['text', 'paragraph', 'help'], defaultLabel: 'Ajoutez un texte explicatif pour guider vos répondants.' },
{ type: 'divider', label: 'Divider', description: 'Visual separator', group: 'Media & Layout', icon: Minus, keywords: ['line', 'separator', 'hr'], defaultLabel: '' },
{ type: 'image', label: 'Image', description: 'Upload or embed an image', group: 'Media & Layout', icon: ImageIcon, keywords: ['picture', 'photo', 'media'], defaultLabel: 'Image de couverture' },
{ type: 'fileUpload', label: 'File Upload', description: 'Collect files from respondents', group: 'Media & Layout', icon: Upload, keywords: ['file', 'attachment', 'document'], defaultLabel: 'Joignez un fichier' },
{ type: 'nps', label: 'Net Promoter Score (NPS)', description: '0–10 recommendation scale', group: 'Advanced', icon: Gauge, keywords: ['nps', 'score', 'recommend'], defaultLabel: 'Quelle est la probabilité que vous nous recommandiez ?' },
{ type: 'rating', label: 'Star Rating', description: '1 to 5 star rating', group: 'Advanced', icon: Star, keywords: ['stars', 'rate', 'review'], defaultLabel: 'Notez votre expérience' },
{ type: 'payment', label: 'Payment (Mobile Money)', description: 'Orange Money, MTN MoMo, Wave', group: 'Advanced', icon: Smartphone, keywords: ['pay', 'money', 'checkout', 'momo'], defaultLabel: 'Paiement de votre inscription' }];