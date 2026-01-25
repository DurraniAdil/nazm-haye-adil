import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Menu, Moon, Sun, Home, Bookmark } from './Icons';
import { useThemeStore } from '../store/themeStore';
import { AnimatePresence, motion } from 'framer-motion';

interface NavigationProps {
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onMenu: () => void;
  onCommonplace: () => void;
  title: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  onMenu,
  onCommonplace,
  title
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useThemeStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between px-6 z-50 transition-colors duration-500">
      <div className="flex items-center space-x-2 relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors text-zinc-800 dark:text-zinc-200"
          aria-label="Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop to close menu when clicking outside */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsMenuOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full left-0 mb-4 w-56 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-xl rounded-lg overflow-hidden py-2 z-50"
              >
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onMenu();
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center space-x-3 transition-colors"
                >
                  <Home className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                  <span className="font-serif text-sm text-zinc-800 dark:text-zinc-200">Return to Volume</span>
                </button>

                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onCommonplace();
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center space-x-3 transition-colors"
                >
                  <Bookmark className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                  <span className="font-serif text-sm text-zinc-800 dark:text-zinc-200">Bookmarked Poems</span>
                </button>

                <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1"></div>

                <button
                  onClick={() => {
                    toggleTheme();
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center space-x-3 transition-colors"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                  )}
                  <span className="font-serif text-sm text-zinc-800 dark:text-zinc-200">
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <span className="hidden md:block font-serif italic text-zinc-400 dark:text-zinc-500 text-sm ml-2">{title}</span>
      </div>

      <div className="flex items-center space-x-8">
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className={`p-3 rounded-full border transition-all duration-300 ${hasPrev
            ? 'border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-black dark:hover:border-white hover:bg-zinc-50 dark:hover:bg-zinc-900'
            : 'border-transparent text-zinc-200 dark:text-zinc-800 cursor-not-allowed'
            }`}
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={onNext}
          disabled={!hasNext}
          className={`p-3 rounded-full border transition-all duration-300 ${hasNext
            ? 'border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-black dark:hover:border-white hover:bg-zinc-50 dark:hover:bg-zinc-900'
            : 'border-transparent text-zinc-200 dark:text-zinc-800 cursor-not-allowed'
            }`}
          aria-label="Next Page"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};