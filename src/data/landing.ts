export const navLinks = [
{ label: 'Fonctionnalités', target: 'fonctionnalites' },
{ label: 'Modes de réponse', target: 'modes' },
{ label: 'Tarifs', target: 'tarifs' },
{ label: "Cas d'usage", target: 'cas-usage' }];


export const useCases = [
{ emoji: '🎓', label: 'Écoles & universités' },
{ emoji: '🍽️', label: 'Restaurants & hôtels' },
{ emoji: '🌱', label: 'ONG & associations' },
{ emoji: '🎤', label: 'Événements & salons' },
{ emoji: '💼', label: 'Recrutement & RH' },
{ emoji: '📈', label: 'Études de marché' }];


export const aiPromptExample = 'Génère une enquête de satisfaction pour restaurant à Antananarivo';

export const aiGeneratedBlocks = [
{ type: 'Titre', label: 'Votre avis compte 🌿' },
{ type: 'Texte court', label: 'Comment vous appelez-vous ?' },
{ type: 'Choix multiple', label: 'Quel plat avez-vous goûté ?' },
{ type: 'Note', label: 'Qualité du service ★★★★★' },
{ type: 'NPS', label: 'Nous recommanderiez-vous ?' },
{ type: 'E-mail', label: 'Recevoir une offre de fidélité' }];


export type ComparisonValue = boolean | string;

export interface ComparisonRow {
  feature: string;
  google: ComparisonValue;
  typeform: ComparisonValue;
  formilera: ComparisonValue;
}

export const comparisonRows: ComparisonRow[] = [
{ feature: 'Éditeur façon document (Notion)', google: 'Basique', typeform: false, formilera: true },
{ feature: 'Mode carte immersif', google: false, typeform: true, formilera: true },
{ feature: 'Génération IA Prompt-to-Form', google: false, typeform: 'Limitée', formilera: true },
{ feature: 'Logique conditionnelle', google: 'Basique', typeform: true, formilera: true },
{ feature: 'Design premium personnalisable', google: false, typeform: true, formilera: true },
{ feature: 'Chargement rapide en 3G', google: true, typeform: false, formilera: true },
{ feature: 'Export CSV / JSON', google: 'Via Sheets', typeform: true, formilera: true },
{ feature: 'Paiement Mobile Money', google: false, typeform: false, formilera: 'Bientôt' },
{ feature: 'Tarifs en Ariary', google: false, typeform: false, formilera: true },
{ feature: 'Prix mensuel', google: 'Gratuit', typeform: '~ 120 000 Ar', formilera: 'Dès 0 Ar' }];


export interface PricingTier {
  id: string;
  name: string;
  monthly: number;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export const pricingTiers: PricingTier[] = [
{
  id: 'free',
  name: 'Gratuit Découverte',
  monthly: 0,
  description: 'Pour tester et lancer vos premiers formulaires.',
  features: ['Formulaires illimités', '50 réponses / mois', 'Éditeur complet', 'Mode carte et document'],
  cta: 'Commencer gratuitement'
},
{
  id: 'pro',
  name: 'Créateur Pro',
  monthly: 35000,
  description: 'Pour les créateurs et équipes qui collectent sérieusement.',
  features: ['Réponses illimitées', 'Génération IA illimitée', 'Export CSV / JSON', 'Personnalisation de marque'],
  cta: 'Passer à Pro',
  highlighted: true
},
{
  id: 'business',
  name: 'Entreprise & Organisation',
  monthly: 90000,
  description: 'Pour les organisations aux besoins avancés.',
  features: ['Support prioritaire', 'Intégration Mobile Money', 'Domaine personnalisé', 'Multi-utilisateurs'],
  cta: 'Contacter l’équipe'
}];


export const ANNUAL_DISCOUNT = 0.2;