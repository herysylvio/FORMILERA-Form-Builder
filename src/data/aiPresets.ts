import type { BlockDraft } from '../types/form';

export interface AiPreset {
  id: string;
  emoji: string;
  label: string;
  keywords: string[];
  blocks: BlockDraft[];
}

export const aiPresets: AiPreset[] = [
{
  id: 'satisfaction',
  emoji: '⚡',
  label: 'Add satisfaction survey',
  keywords: ['satisfaction', 'survey', 'feedback', 'nps', 'avis'],
  blocks: [
  { type: 'heading', label: '2. Votre satisfaction', description: 'Votre avis compte vraiment.', required: false },
  { type: 'nps', label: 'Quelle est la probabilité que vous nous recommandiez ?', required: true },
  { type: 'rating', label: 'Notez la qualité de notre support', required: false },
  { type: 'longText', label: 'Que pourrions-nous améliorer ?', placeholder: 'Partagez vos idées…', required: false }]

},
{
  id: 'lead-magnet',
  emoji: '🎯',
  label: '5-question lead magnet',
  keywords: ['lead', 'magnet', 'prospect', 'marketing', 'contact'],
  blocks: [
  { type: 'heading', label: 'Recevez votre guide gratuit', description: '5 questions, 60 secondes.', required: false },
  { type: 'shortText', label: 'Quel est votre nom complet ?', placeholder: 'Prénom et nom', required: true },
  { type: 'email', label: 'Où devons-nous envoyer le guide ?', placeholder: 'nom@entreprise.com', required: true },
  { type: 'dropdown', label: 'Taille de votre entreprise', options: ['1–10', '11–50', '51–200', '200+'], required: true },
  { type: 'multiChoice', label: 'Votre principal défi en ce moment ?', options: ['Acquisition', 'Rétention', 'Productivité', 'Financement'], required: false },
  { type: 'phone', label: 'Un numéro pour un échange rapide ?', placeholder: '+225 07 00 00 00 00', required: false }]

}];


export const fallbackPreset: AiPreset = {
  id: 'generic',
  emoji: '✨',
  label: 'Custom blocks',
  keywords: [],
  blocks: [
  { type: 'description', label: 'Merci de prendre quelques instants pour répondre à ces questions.', required: false },
  { type: 'shortText', label: 'Quel est votre rôle ?', placeholder: 'Ex. Product Designer', required: true },
  { type: 'email', label: 'Votre adresse e-mail', placeholder: 'nom@entreprise.com', required: true }]

};