export interface Poem {
  id: string;
  title: string;       // Original Title (Roman Urdu)

  content: string[];   // Original Content (Roman Urdu)

  date: string;
  context: string;
}

export enum CollectionId {
  ONE = 'collection-1',
  TWO = 'collection-2',
}

export interface CollectionConfig {
  id: CollectionId;
  name: string;
  description: string;
  totalPoems: number;
}

export interface GeneratedPoemResponse {
  title: string;
  lines: string[];
  author: string;
  bio: string;
}