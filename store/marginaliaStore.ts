import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Structure: Record<PoemId, Record<LineIndex, Notes[]>>
type MarginaliaData = Record<string, Record<number, string[]>>;

interface MarginaliaState {
  notes: MarginaliaData;
  addNote: (poemId: string, lineIndex: number, text: string) => void;
  getNotes: (poemId: string, lineIndex: number) => string[];
  hasNotes: (poemId: string, lineIndex: number) => boolean;
}

// Start empty as per user request
const INITIAL_NOTES: MarginaliaData = {};

export const useMarginaliaStore = create<MarginaliaState>()(
  persist(
    (set, get) => ({
      notes: INITIAL_NOTES,
      addNote: (poemId, lineIndex, text) => set((state) => {
        const poemNotes = state.notes[poemId] || {};
        const lineNotes = poemNotes[lineIndex] || [];
        
        return {
          notes: {
            ...state.notes,
            [poemId]: {
              ...poemNotes,
              [lineIndex]: [...lineNotes, text]
            }
          }
        };
      }),
      getNotes: (poemId, lineIndex) => {
        const state = get();
        return state.notes[poemId]?.[lineIndex] || [];
      },
      hasNotes: (poemId, lineIndex) => {
        const state = get();
        const lines = state.notes[poemId]?.[lineIndex];
        return lines && lines.length > 0;
      }
    }),
    {
      name: 'nazm-marginalia',
    }
  )
);