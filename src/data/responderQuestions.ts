import type { Answers, ResponderQuestion } from '../types/responder';

export const responderQuestions: ResponderQuestion[] = [
{
  id: 'q1',
  type: 'shortText',
  title: 'Pour commencer, comment vous appelez-vous ?',
  hint: 'Votre prénom suffit. Nous l’utiliserons pour personnaliser la suite.',
  required: true,
  placeholder: 'Tapez votre prénom…'
},
{
  id: 'q2',
  type: 'singleSelect',
  title: 'Quelle est la taille de votre équipe ?',
  hint: 'Sélectionnez une seule option.',
  required: true,
  options: [
  { id: 'a', label: '1 à 10 personnes', keyword: '1 à 10' },
  { id: 'b', label: '11 à 50 personnes', keyword: '11 à 50' },
  { id: 'c', label: '51 à 200 personnes', keyword: '51 à 200' },
  { id: 'd', label: 'Plus de 200 personnes', keyword: 'Plus de 200' }]

},
{
  id: 'q3',
  type: 'multiSelect',
  title: 'Quel est le principal défi de votre équipe ce trimestre ?',
  hint: 'Sélectionnez une ou plusieurs options. Vos réponses restent confidentielles.',
  required: true,
  options: [
  { id: 'a', label: 'Accélérer le délai de mise sur le marché', keyword: 'mise sur le marché' },
  { id: 'b', label: 'Améliorer la rétention client', keyword: 'rétention client' },
  { id: 'c', label: 'Recruter et fidéliser les meilleurs talents', keyword: 'meilleurs talents' },
  { id: 'd', label: "Optimiser les coûts d'infrastructure", keyword: "coûts d'infrastructure" }]

},
{
  id: 'q4',
  type: 'rating',
  title: 'Comment évaluez-vous vos outils de collaboration actuels ?',
  hint: 'De 1 (frustrants) à 5 (indispensables).',
  required: true
},
{
  id: 'q5',
  type: 'singleSelect',
  title: 'À quelle fréquence livrez-vous en production ?',
  hint: 'Sélectionnez une seule option.',
  required: false,
  options: [
  { id: 'a', label: 'Plusieurs fois par jour', keyword: 'Plusieurs fois' },
  { id: 'b', label: 'Chaque semaine', keyword: 'semaine' },
  { id: 'c', label: 'Chaque mois', keyword: 'mois' },
  { id: 'd', label: 'Moins souvent', keyword: 'Moins' }]

},
{
  id: 'q6',
  type: 'longText',
  title: 'Si vous aviez une baguette magique, que changeriez-vous ?',
  hint: 'Aucune idée n’est trop ambitieuse. Optionnel.',
  required: false,
  placeholder: 'Décrivez votre idée…'
},
{
  id: 'q7',
  type: 'email',
  title: 'Où pouvons-nous vous envoyer le rapport de synthèse ?',
  hint: 'Un seul e-mail, aucune newsletter. Promis.',
  required: true,
  placeholder: 'nom@entreprise.com'
}];


export const initialResponderAnswers: Answers = {
  q1: 'Aminata',
  q2: 'b',
  q3: ['a']
};

export const SECONDS_PER_QUESTION = 30;