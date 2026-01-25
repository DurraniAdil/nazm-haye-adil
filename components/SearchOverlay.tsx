import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, BookOpen } from './Icons';
import { Poem } from '../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  poems: Poem[];
  onSelectPoem: (poemId: string) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ 
  isOpen, 
  onClose, 
  poems, 
  onSelectPoem 
}) => {
  const [query, setQuery] = useState('');

  const filteredPoems = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    
    return poems.filter((poem: Poem) => 
      poem.title.toLowerCase().includes(lowerQuery) ||
      poem.engTitle.toLowerCase().includes(lowerQuery) ||
      poem.context.toLowerCase().includes(lowerQuery) ||
      poem.content.some((line: string) => line.toLowerCase().includes(lowerQuery)) ||
      poem.engContent.some((line: string) => line.toLowerCase().includes(lowerQuery))
    );
  }, [query, poems]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-white/95 dark:bg-black/95 backdrop-blur-xl flex flex-col text-black dark:text-white transition-colors duration-500"
        >
          <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-900">
             <div className="flex items-center space-x-3 text-zinc-500 dark:text-zinc-400">
               <Search size={20} />
               <span className="text-sm font-sans tracking-widest uppercase">Library Search</span>
             </div>
             <button 
               onClick={onClose}
               className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors text-black dark:text-white"
             >
               <X size={24} />
             </button>
          </div>

          <div className="p-6 md:p-12 max-w-3xl mx-auto w-full flex-1 overflow-hidden flex flex-col">
            <input 
              autoFocus
              type="text" 
              placeholder="Search by title, lyrics, or context..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-3xl md:text-5xl font-serif text-black dark:text-white placeholder:text-zinc-300 dark:placeholder:text-zinc-700 bg-transparent border-none outline-none pb-8 border-b border-zinc-100 dark:border-zinc-800 focus:border-black dark:focus:border-white transition-colors"
            />

            <div className="mt-8 flex-1 overflow-y-auto no-scrollbar">
              {query.trim() === '' ? (
                 <div className="h-full flex flex-col items-center justify-center text-zinc-300 dark:text-zinc-700 opacity-50">
                    <BookOpen size={48} strokeWidth={1} />
                    <p className="mt-4 font-serif italic">Search through the collection.</p>
                 </div>
              ) : filteredPoems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPoems.map(poem => (
                    <motion.div 
                      key={poem.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => onSelectPoem(poem.id)}
                      className="p-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-black dark:hover:border-zinc-600 hover:shadow-lg transition-all cursor-pointer group rounded-sm"
                    >
                      <h3 className="font-serif text-xl text-black dark:text-white mb-1 group-hover:text-black dark:group-hover:text-zinc-200">
                        {poem.title}
                      </h3>
                      <h4 className="font-serif text-sm text-zinc-500 dark:text-zinc-400 italic mb-4">
                        {poem.engTitle}
                      </h4>
                      <p className="font-serif text-zinc-600 dark:text-zinc-500 text-sm line-clamp-2">
                        {poem.content.slice(0, 2).join(' ')}...
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-zinc-500 dark:text-zinc-400 mt-12">
                   <p className="font-serif text-xl italic">No poems found matching "{query}"</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};