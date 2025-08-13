
export interface ProduceItem {
  PLU: number;
  Korean: string;
  English: string;
  French: string;
  Season: string;
}

export type LanguageColumnKey = 'Korean' | 'English' | 'French';

export interface ColumnDefinition {
  id: keyof ProduceItem;
  title: string;
  visible: boolean;
  isLanguage: boolean;
}