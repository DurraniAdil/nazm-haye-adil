import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Poem } from '../types';
import { Feather, ChevronLeft, ChevronRight, Languages } from './Icons';
import { useBookmarkStore } from '../store/bookmarkStore';
import { useMarginaliaStore } from '../store/marginaliaStore';
import { MarginaliaPanel } from './MarginaliaPanel';

interface PoemPageProps {
  poem: Poem;
  pageNumber: number;
  totalPages: number;
}

const LINES_PER_PAGE = 24;

const getRotation = (str: string, index: number) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return (hash % 12) - 6;
};

const getOffset = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return (hash % 10) - 5;
}

export const PoemPage: React.FC<PoemPageProps> = ({ poem, pageNumber, totalPages }) => {
  const [innerPage, setInnerPage] = useState(1);
  const [activeMarginaliaLine, setActiveMarginaliaLine] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHoveringBookmark, setIsHoveringBookmark] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const { isBookmarked, toggleBookmark } = useBookmarkStore();
  const { hasNotes, getNotes } = useMarginaliaStore();

  const bookmarked = isBookmarked(poem.id);
  const hasTranslation = poem.contentEn && poem.contentEn.length > 0;

  useEffect(() => {
    setInnerPage(1);
    setActiveMarginaliaLine(null);
  }, [poem.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [innerPage]);

  const activeContent = showTranslation && hasTranslation ? poem.contentEn! : poem.content;
  const activeTitle = showTranslation && poem.titleEn ? poem.titleEn : poem.title;
  const totalInnerPages = Math.ceil(activeContent.length / LINES_PER_PAGE);
  const hasPagination = totalInnerPages > 1;

  const startIndex = (innerPage - 1) * LINES_PER_PAGE;
  const endIndex = startIndex + LINES_PER_PAGE;
  const visibleLines = activeContent.slice(startIndex, endIndex);

  const handleInnerNext = () => {
    if (innerPage < totalInnerPages) setInnerPage(prev => prev + 1);
  };

  const handleInnerPrev = () => {
    if (innerPage > 1) setInnerPage(prev => prev - 1);
  };

  const bookmarkSize = bookmarked ? 60 : (isHoveringBookmark ? 24 : 0);

  return (
    <>
      <motion.div ref={containerRef} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, clipPath: `polygon(0% 0%, calc(100% - ${bookmarkSize}px) 0%, 100% ${bookmarkSize}px, 100% 100%, 0% 100%)` }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.8, ease: "easeOut", clipPath: { duration: 0.3 } }} className="fixed left-6 right-6 top-6 bottom-20 md:left-12 md:right-12 md:top-12 md:bottom-24 lg:left-16 lg:right-16 lg:top-16 lg:bottom-28 bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800/40 shadow-2xl flex flex-col overflow-hidden">

        {/* Dog-Ear Interaction */}
        <div className="absolute top-0 right-0 w-20 h-20 z-50 cursor-pointer" onMouseEnter={() => setIsHoveringBookmark(true)} onMouseLeave={() => setIsHoveringBookmark(false)} onClick={() => toggleBookmark(poem.id)} title={bookmarked ? "Unfold Page" : "Bookmark Page"} />

        {/* Dog-Ear Flap */}
        <motion.div initial={false} animate={{ width: bookmarkSize, height: bookmarkSize }} transition={{ duration: 0.3 }} className="absolute top-0 right-0 pointer-events-none z-40" style={{ filter: 'drop-shadow(-2px 2px 4px rgba(0,0,0,0.4))' }}>
          <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800/70 border-b border-l border-zinc-200 dark:border-zinc-700/40" style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }} />
        </motion.div>

        {/* Scrollable Content Container */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden px-6 md:px-12 lg:px-20 py-8 md:py-12 custom-scrollbar">
          <div className="max-w-3xl mx-auto">

            {/* Header */}
            <header className="mb-10 text-center">
              <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
                {/* Translation Toggle Button - Replaces Logo */}
                {hasTranslation && (
                  <div className="flex items-center justify-center mb-5">
                    <button
                      onClick={() => setShowTranslation(!showTranslation)}
                      className="p-2.5 bg-zinc-100/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-full shadow-sm text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all hover:scale-105"
                      title={showTranslation ? "Show Original (Roman Urdu)" : "Show English Translation"}
                    >
                      <Languages size={20} />
                    </button>
                  </div>
                )}

                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight leading-tight font-light">
                  {activeTitle}
                </h2>

                <div className="w-12 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent mx-auto my-5"></div>

                <p className="font-sans text-[10px] md:text-xs tracking-[0.25em] text-zinc-400 dark:text-zinc-600 uppercase">
                  {poem.date.split('-').reverse().map((part, i) => i === 2 ? part.slice(2) : part).join('/')}
                </p>
              </motion.div>
            </header>

            {/* Content */}
            <div className="relative min-h-[50vh] flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div key={`${poem.id}-${innerPage}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="w-full">

                  <article className="font-serif text-[12px] md:text-lg lg:text-xl leading-[1.6] md:leading-[1.8] space-y-1.5 text-center text-zinc-700 dark:text-zinc-300">
                    {visibleLines.map((line, index) => {
                      const globalLineIndex = startIndex + index;
                      const notes = getNotes(poem.id, globalLineIndex);
                      const hasMarginalia = notes.length > 0;
                      const displayNote = notes.length > 0 ? notes[notes.length - 1] : null;

                      return (
                        <motion.div key={`ur-${globalLineIndex}`} initial={{ filter: 'blur(3px)', opacity: 0 }} animate={{ filter: 'blur(0px)', opacity: 1 }} transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.08 }} className={`relative min-h-[1.5rem] px-4 md:px-6 py-1 rounded transition-all duration-200 ${line === "" ? "h-6" : ""}`}>


                          <span
                            className={`relative z-10 inline-block rounded px-2 transition-colors duration-200 ${line !== "" ? "cursor-pointer hover:bg-zinc-900/30 group" : ""}`}
                            onClick={(e) => {
                              if (line !== "") {
                                e.stopPropagation();
                                setActiveMarginaliaLine(globalLineIndex);
                              }
                            }}
                          >
                            <span className="font-light pointer-events-none">
                              {line}
                            </span>

                            {/* Hover hint */}
                            {line !== "" && !hasMarginalia && (
                              <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 text-[9px] font-handwriting text-zinc-400 dark:text-zinc-700 opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity duration-300">
                                ~ note
                              </span>
                            )}
                          </span>

                          {/* Marginalia */}
                          {displayNote && line !== "" && (
                            <motion.div drag dragConstraints={containerRef} dragElastic={0} dragMomentum={false} whileDrag={{ scale: 1.08, cursor: 'grabbing', zIndex: 50 }} onClick={(e) => e.stopPropagation()} className="absolute right-0 top-0 md:left-[82%] md:right-auto md:top-0 z-30 w-32 md:w-40 text-left cursor-grab block" style={{ y: getOffset(displayNote), rotate: getRotation(displayNote, globalLineIndex) }}>
                              <span className="font-scribble text-base md:text-xl text-blue-400/60 leading-none drop-shadow-sm block text-right md:text-left">
                                {displayNote}
                              </span>
                            </motion.div>
                          )}

                          {/* Mobile indicator */}
                          {hasMarginalia && line !== "" && (
                            <span className="hidden">
                              {/* Hidden on mobile now since we show the actual note */}
                            </span>
                          )}
                        </motion.div>
                      );
                    })}
                  </article>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Inner Pagination */}
            {hasPagination && (
              <div className="flex items-center justify-center space-x-6 mt-8 border-t border-dashed border-zinc-200 dark:border-zinc-800/40 pt-5 w-full max-w-xs mx-auto">
                <button onClick={handleInnerPrev} disabled={innerPage === 1} className={`p-1.5 transition-colors ${innerPage === 1 ? 'text-zinc-300 dark:text-zinc-800 cursor-not-allowed' : 'text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400'}`}>
                  <ChevronLeft size={16} />
                </button>
                <span className="text-[10px] font-sans tracking-[0.25em] text-zinc-700">
                  {innerPage} / {totalInnerPages}
                </span>
                <button onClick={handleInnerNext} disabled={innerPage === totalInnerPages} className={`p-1.5 transition-colors ${innerPage === totalInnerPages ? 'text-zinc-300 dark:text-zinc-800 cursor-not-allowed' : 'text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400'}`}>
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Footer */}
            <footer className="mt-12 mb-4">
              {/* I don't think this necessary, but I'll leave it here for now */}
              {/*  <div className="border-t border-zinc-200 dark:border-zinc-800/40 pt-8 text-center max-w-xl mx-auto">
                <p className="font-sans text-[9px] md:text-[10px] font-medium text-zinc-500 dark:text-zinc-700 uppercase tracking-[0.25em] mb-3">
                  Context
                </p>
                <p className="font-serif text-sm md:text-base text-zinc-500 leading-relaxed italic font-light">
                  {poem.context}
                </p>
              </div>*/}
              <div className="flex justify-center mt-8">
                <span className="text-[10px] font-sans text-zinc-400 dark:text-zinc-800 tracking-[0.25em]">
                  {pageNumber} / {totalPages}
                </span>
              </div>
            </footer>
          </div>
        </div>
      </motion.div>

      {/* Marginalia Panel */}
      <AnimatePresence>
        {activeMarginaliaLine !== null && (
          <MarginaliaPanel isOpen={true} onClose={() => setActiveMarginaliaLine(null)} poemId={poem.id} lineIndex={activeMarginaliaLine} lineContent={activeContent[activeMarginaliaLine]} />
        )}
      </AnimatePresence>
    </>
  );
};
