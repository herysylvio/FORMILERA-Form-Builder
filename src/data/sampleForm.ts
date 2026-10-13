import type { FormBlock } from '../types/form';

export const formMeta = {
  title: 'Sondage Expérience Utilisateur 2026',
  description:
  'Aidez-nous à façonner la prochaine génération de nos produits. Ce sondage prend environ 3 minutes — vos réponses restent anonymes.',
  icon: '✨',
  responsesCount: 142
};

export const formIcons = ['✨', '📋', '🚀', '💬', '🎯', '🌍'];

export const initialBlocks: FormBlock[] = [
{
  id: 'b1',
  type: 'heading',
  label: '1. Parlez-nous de vos besoins',
  description: 'Quelques questions rapides pour mieux vous connaître.',
  required: false
},
{
  id: 'b2',
  type: 'shortText',
  label: 'Quel est votre prénom ?',
  placeholder: 'Tapez votre réponse ici…',
  required: true
},
{
  id: 'b3',
  type: 'multiChoice',
  label: "Quel est votre secteur d'activité ?",
  options: ['Technologie & SaaS', 'Finance & Banque', 'Santé & Bien-être', 'Éducation & Formation'],
  required: true,
  hasLogic: true
},
{
  id: 'b4',
  type: 'rating',
  label: 'Comment évaluez-vous votre expérience globale ?',
  required: false
},
{
  id: 'b5',
  type: 'fileUpload',
  label: 'Partagez une capture ou un document (optionnel)',
  required: false
}];