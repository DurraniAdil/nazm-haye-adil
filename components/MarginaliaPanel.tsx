import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, PenTool, Trash2 } from './Icons';
import { useMarginaliaStore } from '../store/marginaliaStore';

interface MarginaliaPanelProps {
  isOpen: boolean;
  onClose: () => void;
  poemId: string;
  lineIndex: number;
  lineContent: string;
}

export const MarginaliaPanel: React.FC<MarginaliaPanelProps> = ({
  isOpen,
  onClose,
  poemId,
  lineIndex,
  lineContent
}) => {
  const [newNote, setNewNote] = useState('');
  const { getNotes, addNote } = useMarginaliaStore();
  const notes = getNotes(poemId, lineIndex);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      addNote(poemId, lineIndex, newNote);
      setNewNote('');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-sm z-[60]"
      />

      {/* Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 h-full w-full max-w-sm bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl z-[70] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-start justify-between bg-white dark:bg-zinc-950">
          <div>
            <span className="font-sans text-[10px] tracking-widest uppercase text-zinc-400 dark:text-zinc-500 block mb-2">
              Marginalia — Line {lineIndex + 1}
            </span>
            <p className="font-serif italic text-zinc-600 dark:text-zinc-300 text-sm line-clamp-2 border-l-2 border-zinc-300 dark:border-zinc-700 pl-3">
              "{lineContent}"
            </p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
            <X size={20} className="text-zinc-500" />
          </button>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] dark:bg-none">
          {notes.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-400 opacity-50">
              <PenTool size={32} strokeWidth={1} className="mb-2" />
              <p className="font-serif italic text-sm">Leave a trace...</p>
            </div>
          ) : (
            notes.map((note, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <p className="font-handwriting font-serif text-lg leading-snug text-zinc-700 dark:text-zinc-300">
                  {note}
                </p>
                <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700 mt-3" />
              </motion.div>
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
          <form onSubmit={handleAddNote} className="relative">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Scribble in the margin..."
              className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 pr-10 font-serif text-black dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
              autoFocus
            />
            <button
              type="submit"
              disabled={!newNote.trim()}
              className="absolute right-0 bottom-2 text-zinc-400 hover:text-black dark:hover:text-white disabled:opacity-30 transition-colors"
            >
              <PenTool size={16} />
            </button>
          </form>
        </div>
      </motion.div>
    </>
  );
};