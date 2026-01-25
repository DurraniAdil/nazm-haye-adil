import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, ChevronLeft, Trash2 } from './Icons';
import { useBookmarkStore } from '../store/bookmarkStore';
import { getAllPoems } from '../data/poems';
import { Poem } from '../types';

interface CommonplaceBookProps {
  onBack: () => void;
  onOpenPoem: (poemId: string) => void;
}

export const CommonplaceBook: React.FC<CommonplaceBookProps> = ({ onBack, onOpenPoem }) => {
  const { bookmarks, toggleBookmark } = useBookmarkStore();
  const allPoems = getAllPoems();
  const savedPoems = allPoems.filter(p => bookmarks.includes(p.id));

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-black dark:text-white pt-24 px-6 md:px-12 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl sm:text-2xl">Bookmarked Poems</h1>
              <p className="font-sans text-xs tracking-widest uppercase text-zinc-500 mt-1">
                Your Collection of Dog-Eared Pages
              </p>
            </div>
          </div>
          <Bookmark size={24} className="text-zinc-400" />
        </header>

        {savedPoems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-zinc-400 dark:text-zinc-600 opacity-60">
            <Bookmark size={48} strokeWidth={1} className="mb-4" />
            <p className="font-serif text-xl italic">No pages folded yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {savedPoems.map(poem => (
              <motion.div
                key={poem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-zinc-900 p-8 border border-zinc-100 dark:border-zinc-800 shadow-sm rounded-sm group relative"
              >
                <div onClick={() => onOpenPoem(poem.id)} className="cursor-pointer">
                  <h3 className="font-serif text-2xl mb-2 group-hover:underline decoration-zinc-300 underline-offset-4 decoration-1">{poem.title}</h3>
                  <p className="font-serif text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed mb-6 opacity-80">
                    {poem.content.slice(0, 3).join(' ')}...
                  </p>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="font-sans text-[10px] text-zinc-400 uppercase tracking-widest">{poem.date}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(poem.id);
                    }}
                    className="text-zinc-300 hover:text-red-500 transition-colors"
                    title="Remove Bookmark"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};