import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { COLLECTIONS } from './constants';
import { CollectionId } from './types';
import { getPoem, getAllPoems } from './data/poems';
import { CollectionCover } from './components/CollectionCover';
import { PoemPage } from './components/PoemPage';
import { Navigation } from './components/Navigation';
import { BookOpen, X, Moon, Sun, ChevronLeft } from './components/Icons';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { CommonplaceBook } from './components/CommonplaceBook';
import { useThemeStore } from './store/themeStore';

enum ViewState {
  HOME,
  COLLECTION_COVER,
  READING,
  COMMONPLACE
}

const InitialLoader = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1, ease: "easeInOut" }}
    className="fixed inset-0 z-[100] bg-white dark:bg-zinc-950 flex flex-col items-center justify-center text-black dark:text-white"
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <h1 className="font-serif text-3xl md:text-4xl tracking-widest mb-4">NAZM-E-ADIL</h1>
      <div className="w-16 h-px bg-zinc-300 dark:bg-zinc-700 mx-auto"></div>
    </motion.div>
  </motion.div>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  /* Initialize from localStorage */
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('nazm_authenticated') === 'true';
  });
  /* Navigation State Persistence */
  const getInitialState = () => {
    try {
      const saved = localStorage.getItem('nazm_nav_state');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to parse nav state", e);
    }
    return null;
  };

  const savedState = getInitialState();

  const [view, setView] = useState<ViewState>(savedState?.view ?? ViewState.HOME);
  const [activeCollectionId, setActiveCollectionId] = useState<CollectionId | null>(savedState?.activeCollectionId ?? null);
  const [currentPage, setCurrentPage] = useState<number>(savedState?.currentPage ?? 1);

  useEffect(() => {
    localStorage.setItem('nazm_nav_state', JSON.stringify({ view, activeCollectionId, currentPage }));
  }, [view, activeCollectionId, currentPage]);

  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Initial App Load Simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const activeCollection = activeCollectionId ? COLLECTIONS[activeCollectionId] : null;
  const currentPoem = activeCollectionId ? getPoem(`${activeCollectionId}-${currentPage}`) : undefined;

  const allPoems = getAllPoems();

  const handleOpenCollection = (id: CollectionId) => {
    setActiveCollectionId(id);
    setView(ViewState.COLLECTION_COVER);
    window.scrollTo(0, 0);
  };

  const handleNext = () => {
    if (!activeCollection) return;
    if (currentPage < activeCollection.totalPoems) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (!activeCollection) return;
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo(0, 0);
    } else {
      // Go back to cover instead of home
      setView(ViewState.COLLECTION_COVER);
    }
  };

  const handleBackToVolume = () => {
    setView(ViewState.COLLECTION_COVER);
  };

  const handleHome = () => {
    setView(ViewState.HOME);
    setActiveCollectionId(null);
  };

  const handleCommonplace = () => {
    setView(ViewState.COMMONPLACE);
  };

  const handlePoemSelect = (poemId: string) => {
    let targetColId: CollectionId | null = null;
    let targetPage = 1;

    if (poemId.startsWith(CollectionId.ONE)) {
      targetColId = CollectionId.ONE;
      targetPage = parseInt(poemId.replace(`${CollectionId.ONE}-`, ''));
    } else if (poemId.startsWith(CollectionId.TWO)) {
      targetColId = CollectionId.TWO;
      targetPage = parseInt(poemId.replace(`${CollectionId.TWO}-`, ''));
    }

    if (targetColId) {
      setActiveCollectionId(targetColId);
      setCurrentPage(targetPage);
      setView(ViewState.READING);
    }
  };

  const renderContent = () => {
    if (view === ViewState.HOME) {
      return <Home onOpenCollection={handleOpenCollection} onOpenPoem={handlePoemSelect} />;
    }

    if (view === ViewState.COMMONPLACE) {
      return <CommonplaceBook onBack={handleHome} onOpenPoem={handlePoemSelect} />;
    }

    if (view === ViewState.READING && activeCollection) {
      return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 pb-24 relative transition-colors duration-500">
          <button
            onClick={handleBackToVolume}
            className="fixed top-6 left-6 p-3 bg-zinc-100/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-full shadow-sm text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors z-40"
          >
            <ChevronLeft size={20} />
          </button>

          <main className="pt-20 px-6 min-h-[80vh] flex items-center justify-center">
            <AnimatePresence mode='wait'>
              {currentPoem && (
                <PoemPage
                  key={currentPoem.id}
                  poem={currentPoem}
                  pageNumber={currentPage}
                  totalPages={activeCollection.totalPoems}
                />
              )}
            </AnimatePresence>
          </main>

          <Navigation
            hasPrev={true}
            hasNext={currentPage < activeCollection.totalPoems}
            onPrev={handlePrev}
            onNext={handleNext}
            onMenu={handleBackToVolume}
            onCommonplace={handleCommonplace}
            title={activeCollection.name}
          />
        </div>
      );
    }

    if (view === ViewState.COLLECTION_COVER && activeCollection) {
      return (
        <CollectionCover
          collection={activeCollection}
          onPoemSelect={handlePoemSelect}
          onBack={handleHome}
        />
      );
    }

    return null;
  };

  return (
    <>
      <AnimatePresence>
        {loading && <InitialLoader />}
      </AnimatePresence>

      {!loading && !isAuthenticated && (
        <AnimatePresence>
          <Login onLogin={() => {
            setIsAuthenticated(true);
            localStorage.setItem('nazm_authenticated', 'true');
          }} />
        </AnimatePresence>
      )}

      {!loading && isAuthenticated && (
        <div className="bg-white dark:bg-zinc-950 min-h-screen text-black dark:text-white transition-colors duration-500">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {renderContent()}

            {/* Header Controls (Theme only, removed search) */}
            {view === ViewState.HOME && (
              <div className="fixed top-6 right-6 z-50 flex items-center space-x-2">
                <button
                  onClick={toggleTheme}
                  className="p-3 bg-transparent text-zinc-400 hover:text-black dark:hover:text-white transition-all"
                  aria-label="Toggle Theme"
                >
                  {theme === 'dark' ? <Sun size={24} strokeWidth={1.5} /> : <Moon size={24} strokeWidth={1.5} />}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}