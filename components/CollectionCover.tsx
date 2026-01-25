import React from 'react';
import { motion } from 'framer-motion';
import { CollectionConfig } from '../types';
import { POEMS_DATA } from '../data/poems';
import { Feather, ChevronLeft } from './Icons';

interface CollectionCoverProps {
  collection: CollectionConfig;
  onPoemSelect: (id: string) => void;
  onBack: () => void;
}

export const CollectionCover: React.FC<CollectionCoverProps> = ({ collection, onPoemSelect, onBack }) => {
  const poems = POEMS_DATA[collection.id] || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-white pb-24 relative transition-colors duration-500"
    >
      {/* Header / Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={onBack}
          className="p-3 bg-zinc-100/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-full shadow-sm text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-24 md:pt-32">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Feather className="w-6 h-6 mx-auto mb-6 text-zinc-400 dark:text-zinc-500" strokeWidth={1} />
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4 tracking-tight text-black dark:text-white">
            {collection.name}
          </h1>
          <p className="font-serif italic text-zinc-500 dark:text-zinc-400 text-lg md:text-xl max-w-xl mx-auto">
            {collection.description}
          </p>
        </motion.div>

        <div className="space-y-4 pb-20">
          {poems.map((poem, index) => (
            <motion.div
              key={poem.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => onPoemSelect(poem.id)}
                className="w-full group flex items-baseline justify-between py-4 border-b border-zinc-100 dark:border-zinc-800 hover:pl-4 transition-all duration-300"
              >
                <div className="flex items-baseline text-left gap-4">
                  <span className="font-sans text-xs text-zinc-300 dark:text-zinc-700 w-6 shrink-0">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <span className="font-serif text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {poem.title}
                  </span>
                </div>
                <span className="font-sans text-[10px] tracking-widest uppercase text-zinc-400 dark:text-zinc-600 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                  {poem.date.split('-').reverse().map((part, i) => i === 2 ? part.slice(2) : part).join('/')}
                </span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};