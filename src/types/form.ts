export type BlockType =
'heading' |
'description' |
'divider' |
'image' |
'fileUpload' |
'shortText' |
'longText' |
'email' |
'phone' |
'number' |
'date' |
'multiChoice' |
'dropdown' |
'nps' |
'rating' |
'payment';

export interface FormBlock {
  id: string;
  type: BlockType;
  label: string;
  description?: string;
  placeholder?: string;
  options?: string[];
  required: boolean;
  hasLogic?: boolean;
}

export type BlockDraft = Omit<FormBlock, 'id'>;

export type EditorView = 'editor' | 'responses' | 'analytics';
export type ExperienceMode = 'card' | 'document';
export type DevicePreview = 'desktop' | 'tablet' | 'mobile';
export type ThemeMode = 'dark' | 'light';
export type SaveState = 'saved' | 'saving';

export interface SlashState {
  afterId: string | null;
  autoFocus: boolean;
}