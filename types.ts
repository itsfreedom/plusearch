export interface PluItem {
  plu: string;
  korean: string;
  english: string;
  french: string;
  season: string;
}

export type SortConfig = {
  key: keyof PluItem;
  direction: 'ascending' | 'descending';
} | null;

export type ColumnKey = 'korean' | 'english' | 'french' | 'season';
