import type { FormTemplate } from '../types/template';

export const defaultTemplates: FormTemplate[] = [
  {
    id: 'satisfaction-client',
    title: 'Enquête de Satisfaction Client',
    description: 'Mesurez le NPS et le retour d’expérience avec questionnement conditionnel selon la note.',
    icon: '⭐',
    category: 'feedback',
    blocks: [
      {
        id: 'sat-1',
        type: 'heading',
        label: 'Votre avis nous intéresse',
        description: 'Prenez 2 minutes pour partager votre expérience.',
        required: false
      },
      {
        id: 'sat-2',
        type: 'rating',
        label: 'Quelle est votre satisfaction globale ?',
        required: true
      },
      {
        id: 'sat-3',
        type: 'longText',
        label: 'Que pouvons-nous améliorer pour mieux vous servir ?',
        placeholder: 'Expliquez-nous ce qui n’a pas été...',
        required: false,
        condition: {
          sourceBlockId: 'sat-2',
          operator: 'less_than',
          value: 4
        }
      },
      {
        id: 'sat-4',
        type: 'multiChoice',
        label: 'Recommanderiez-vous nos services ?',
        options: ['Certainement', 'Probablement', 'Peut-être', 'Non'],
        required: true
      },
      {
        id: 'sat-5',
        type: 'email',
        label: 'Votre email (optionnel pour être recontacté)',
        placeholder: 'nom@exemple.com',
        required: false
      }
    ]
  },
  {
    id: 'inscription-evenement',
    title: 'Inscription Événement / Formation',
    description: 'Recueillez les inscriptions, choix de formules et besoins spécifiques.',
    icon: '🎟️',
    category: 'events',
    blocks: [
      {
        id: 'ev-1',
        type: 'heading',
        label: 'Inscription au Sommet Tech 2026',
        description: 'Réservez votre place pour l’événement de l’année.',
        required: false
      },
      {
        id: 'ev-2',
        type: 'shortText',
        label: 'Nom et Prénom',
        placeholder: 'Ex: Jean Ravelo',
        required: true
      },
      {
        id: 'ev-3',
        type: 'email',
        label: 'Adresse email',
        placeholder: 'jean@exemple.com',
        required: true
      },
      {
        id: 'ev-4',
        type: 'phone',
        label: 'Numéro de téléphone (Contact WhatsApp/Mobile)',
        placeholder: '+261 34 00 000 00',
        required: true
      },
      {
        id: 'ev-5',
        type: 'multiChoice',
        label: 'Choisissez votre pass',
        options: ['Pass Standard - 45 000 Ar', 'Pass VIP & Networking - 120 000 Ar', 'Pass Étudiant - 20 000 Ar'],
        required: true
      },
      {
        id: 'ev-6',
        type: 'shortText',
        label: 'Entreprise ou Organisation (requis pour Pass VIP)',
        placeholder: 'Nom de votre entreprise',
        required: false,
        condition: {
          sourceBlockId: 'ev-5',
          operator: 'equals',
          value: 'Pass VIP & Networking - 120 000 Ar'
        }
      }
    ]
  },
  {
    id: 'demande-devis',
    title: 'Demande de Devis & Contact B2B',
    description: 'Qualifiez les prospects, évaluez les budgets et collectez les cahiers des charges.',
    icon: '💼',
    category: 'business',
    blocks: [
      {
        id: 'dev-1',
        type: 'heading',
        label: 'Parlez-nous de votre projet',
        description: 'Nous vous répondrons avec une proposition sur-mesure sous 24h.',
        required: false
      },
      {
        id: 'dev-2',
        type: 'shortText',
        label: 'Nom de votre entreprise ou marque',
        placeholder: 'Ex: Madacom SARL',
        required: true
      },
      {
        id: 'dev-3',
        type: 'email',
        label: 'Email professionnel',
        placeholder: 'contact@votre-entreprise.mg',
        required: true
      },
      {
        id: 'dev-4',
        type: 'dropdown',
        label: 'Type de prestation souhaitée',
        options: ['Développement d’application web', 'Refonte UI/UX', 'Intégration d’API & IA', 'Stratégie Digitale'],
        required: true
      },
      {
        id: 'dev-5',
        type: 'multiChoice',
        label: 'Fourchette de budget estimée',
        options: ['Moins de 2 000 000 Ar', '2M à 5M Ar', '5M à 15M Ar', 'Plus de 15M Ar'],
        required: true
      },
      {
        id: 'dev-6',
        type: 'longText',
        label: 'Description détaillée de votre besoin',
        placeholder: 'Objectifs clés, délais souhaités, contraintes...',
        required: true
      }
    ]
  },
  {
    id: 'recrutement-candidature',
    title: 'Formulaire de Recrutement / Candidature',
    description: 'Filtrez les candidats, collectez les CV et vérifiez les disponibilités.',
    icon: '👥',
    category: 'hr',
    blocks: [
      {
        id: 'rec-1',
        type: 'heading',
        label: 'Rejoignez notre équipe',
        description: 'Postulez en quelques clics pour nos postes ouverts.',
        required: false
      },
      {
        id: 'rec-2',
        type: 'shortText',
        label: 'Nom complet',
        placeholder: 'Prénom et Nom',
        required: true
      },
      {
        id: 'rec-3',
        type: 'email',
        label: 'Email',
        placeholder: 'candidat@email.com',
        required: true
      },
      {
        id: 'rec-4',
        type: 'dropdown',
        label: 'Poste visé',
        options: ['Développeur Fullstack React/Node', 'UI/UX Designer', 'Chef de Projet Digital', 'Responsable Commercial'],
        required: true
      },
      {
        id: 'rec-5',
        type: 'fileUpload',
        label: 'Déposez votre CV (PDF)',
        description: 'Taille max 10 Mo',
        required: true
      },
      {
        id: 'rec-6',
        type: 'multiChoice',
        label: 'Disponibilité',
        options: ['Immédiate', 'Sous 1 mois (préavis)', 'Sous 2 mois', 'Autre'],
        required: true
      }
    ]
  }
];

export function getTemplateById(id: string): FormTemplate | undefined {
  const custom = getCustomTemplates();
  const all = [...defaultTemplates, ...custom];
  return all.find(t => t.id === id);
}

const STORAGE_KEY = 'formilera_custom_templates';

export function getCustomTemplates(): FormTemplate[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomTemplate(template: Omit<FormTemplate, 'id' | 'isCustom' | 'createdAt'>): FormTemplate {
  const newTemplate: FormTemplate = {
    ...template,
    id: `custom-${Date.now()}`,
    isCustom: true,
    createdAt: new Date().toISOString()
  };

  const existing = getCustomTemplates();
  const updated = [newTemplate, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Erreur sauvegarde template custom', err);
  }
  return newTemplate;
}

export function deleteCustomTemplate(id: string): void {
  if (typeof window === 'undefined') return;
  const existing = getCustomTemplates();
  const updated = existing.filter(t => t.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Erreur suppression template custom', err);
  }
}
