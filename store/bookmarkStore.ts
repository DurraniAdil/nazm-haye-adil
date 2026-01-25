import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BookmarkState {
  bookmarks: string[]; // List of Poem IDs
  toggleBookmark: (poemId: string) => void;
  isBookmarked: (poemId: string) => boolean;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      toggleBookmark: (poemId) => set((state) => {
        const exists = state.bookmarks.includes(poemId);
        return {
          bookmarks: exists 
            ? state.bookmarks.filter(id => id !== poemId)
            : [...state.bookmarks, poemId]
        };
      }),
      isBookmarked: (poemId) => get().bookmarks.includes(poemId),
    }),
    {
      name: 'nazm-bookmarks',
    }
  )
);