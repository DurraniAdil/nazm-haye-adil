import { Poem, CollectionId } from '../types';
import { nazmVol1Data, nazmVol2Data } from './poemData';

const processPoems = (collectionId: string, rawData: any[]): Poem[] => {
  return rawData.map((p, index) => ({
    id: `${collectionId}-${index + 1}`,
    title: p.title || 'Untitled',
    content: (p.content && typeof p.content === 'string') ? p.content.split('\n') : [],
    date: p.date || '',
    context: p.context || ''
  }));
};

export const POEMS_DATA: Record<string, Poem[]> = {
  [CollectionId.ONE]: processPoems(CollectionId.ONE, nazmVol1Data),
  [CollectionId.TWO]: processPoems(CollectionId.TWO, nazmVol2Data),
};

export const getAllPoems = (): Poem[] => {
  return [...POEMS_DATA[CollectionId.ONE], ...POEMS_DATA[CollectionId.TWO]];
};

export const getPoem = (id: string): Poem | undefined => {
  return getAllPoems().find(p => p.id === id);
};