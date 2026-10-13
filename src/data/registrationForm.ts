import type { Country, FieldDefinition, RegistrationValues, Ticket } from '../types/registration';

export const registrationMeta = {
  title: 'Inscription au Sommet Tech & Innovation 2026',
  intro:
  'Bonjour 👋 Merci de votre intérêt pour le Sommet ! Ce formulaire prend environ 4 minutes. Vos informations nous aident à préparer votre badge, votre accueil et une expérience sur mesure.',
  date: '12 – 13 juin 2026',
  location: 'Antananarivo, Madagascar',
  duration: '~4 min',
  coverUrl: "/ae7c4511-a0a1-484f-b93b-c20dc2994673.jpg"
};

export const registrationFields: FieldDefinition[] = [
{ key: 'fullName', label: 'Nom complet', required: true, block: 'name' },
{ key: 'email', label: 'E-mail', required: true, block: 'contact' },
{ key: 'phone', label: 'Téléphone', required: true, block: 'contact' },
{ key: 'ticket', label: 'Type de pass', required: true, block: 'ticket' },
{ key: 'dietary', label: 'Préférences alimentaires', required: false, block: 'dietary' },
{ key: 'organisation', label: 'Organisation & poste', required: false, block: 'organisation' },
{ key: 'motivation', label: 'Motivation', required: true, block: 'motivation' },
{ key: 'consent', label: 'Consentement', required: true, block: 'consent' }];


export const countries: Country[] = [
{ code: 'MG', name: 'Madagascar', flag: '🇲🇬', dial: '+261', digits: 9, placeholder: '34 12 345 67' },
{ code: 'FR', name: 'France', flag: '🇫🇷', dial: '+33', digits: 9, placeholder: '6 12 34 56 78' },
{ code: 'RE', name: 'La Réunion', flag: '🇷🇪', dial: '+262', digits: 9, placeholder: '692 12 34 56' },
{ code: 'MU', name: 'Maurice', flag: '🇲🇺', dial: '+230', digits: 8, placeholder: '5251 2345' },
{ code: 'SN', name: 'Sénégal', flag: '🇸🇳', dial: '+221', digits: 9, placeholder: '77 123 45 67' },
{ code: 'CI', name: "Côte d'Ivoire", flag: '🇨🇮', dial: '+225', digits: 10, placeholder: '07 12 34 56 78' }];


export const tickets: Ticket[] = [
{
  id: 'standard',
  name: 'Pass Standard',
  price: '45,000 Ar',
  description: 'Les deux jours de conférences.',
  perks: ['Accès à toutes les conférences', 'Déjeuners inclus', 'Kit de bienvenue']
},
{
  id: 'vip',
  name: 'Pass VIP',
  price: '120,000 Ar',
  description: 'L’expérience complète, en coulisses.',
  perks: ['Tout le Pass Standard', 'Lounge & networking VIP', 'Dîner de gala avec les speakers'],
  popular: true
}];


export const NO_RESTRICTION = 'Aucune restriction';

export const dietaryOptions = ['Végétarien', 'Végan', 'Sans gluten', 'Halal', 'Sans lactose', 'Allergie aux fruits à coque', NO_RESTRICTION];

export const MOTIVATION_MAX = 280;

export const initialRegistrationValues: RegistrationValues = {
  fullName: 'Hery Rakotomalala',
  email: 'hery.rakoto@techmada.mg',
  countryCode: 'MG',
  phone: '34 12 345 67',
  ticket: 'vip',
  dietary: [],
  organisation: '',
  motivation: '',
  consent: false
};