export type TicketId = 'standard' | 'vip';

export interface RegistrationValues {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  ticket: TicketId | null;
  dietary: string[];
  organisation: string;
  motivation: string;
  consent: boolean;
}

export type FieldKey = Exclude<keyof RegistrationValues, 'countryCode'>;

export type BlockId = 'name' | 'contact' | 'ticket' | 'dietary' | 'organisation' | 'motivation' | 'consent';

export interface FieldDefinition {
  key: FieldKey;
  label: string;
  required: boolean;
  block: BlockId;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
  dial: string;
  digits: number;
  placeholder: string;
}

export interface Ticket {
  id: TicketId;
  name: string;
  price: string;
  description: string;
  perks: string[];
  popular?: boolean;
}

export type RegistrationStatus = 'idle' | 'submitting' | 'success';