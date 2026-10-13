import { countries } from '../data/registrationForm';
import type { Country, FieldKey, RegistrationValues } from '../types/registration';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function getCountry(code: string): Country {
  return countries.find((c) => c.code === code) ?? countries[0];
}

export function phoneDigits(phone: string): number {
  return phone.replace(/\D/g, '').length;
}

export function isFieldFilled(key: FieldKey, v: RegistrationValues): boolean {
  switch (key) {
    case 'fullName':
      return v.fullName.trim().length >= 2;
    case 'email':
      return EMAIL_RE.test(v.email.trim());
    case 'phone':
      return phoneDigits(v.phone) >= getCountry(v.countryCode).digits;
    case 'ticket':
      return v.ticket !== null;
    case 'dietary':
      return v.dietary.length > 0;
    case 'organisation':
      return v.organisation.trim().length > 0;
    case 'motivation':
      return v.motivation.trim().length > 0;
    case 'consent':
      return v.consent;
  }
}

export function getFieldError(key: FieldKey, v: RegistrationValues): string | null {
  if (isFieldFilled(key, v)) return null;
  switch (key) {
    case 'fullName':
      return 'Indiquez votre nom complet.';
    case 'email':
      return v.email.trim() ? 'Cette adresse e-mail semble incomplète.' : 'Votre e-mail est requis.';
    case 'phone':{
        const c = getCountry(v.countryCode);
        return v.phone.trim() ? `Un numéro ${c.name} compte ${c.digits} chiffres.` : 'Votre numéro est requis.';
      }
    case 'ticket':
      return 'Choisissez un pass pour continuer.';
    case 'motivation':
      return 'Dites-nous en une phrase ce qui vous motive.';
    case 'consent':
      return 'Votre accord est nécessaire pour valider l’inscription.';
    default:
      return null;
  }
}