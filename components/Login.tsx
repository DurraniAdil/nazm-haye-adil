import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Feather, ChevronRight, Sun, Moon } from './Icons';
import { useThemeStore } from '../store/themeStore';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const { theme, toggleTheme } = useThemeStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.toLowerCase().trim() === 'nazmeadil' && pin.trim() === '1437') {
      onLogin();
    } else {
      setError(true);
      // Shake animation trigger logic could go here, but simple error text works for minimalism
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white dark:bg-zinc-950 flex flex-col items-center justify-center p-6 text-black dark:text-white transition-colors duration-500"
    >
      <div className="absolute top-6 right-6 z-50 flex items-center space-x-2">
        <button
          onClick={toggleTheme}
          className="p-3 bg-transparent text-zinc-400 hover:text-black dark:hover:text-white transition-all"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={24} strokeWidth={1.5} /> : <Moon size={24} strokeWidth={1.5} />}
        </button>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-12">
          <Feather className="w-8 h-8 mx-auto mb-6 text-black dark:text-white" strokeWidth={1} />
          <h1 className="font-serif text-3xl tracking-tight mb-2">Identify Yourself</h1>
          <p className="font-sans text-xs tracking-widest text-zinc-400 dark:text-zinc-600 uppercase">
            Restricted Access
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="relative group">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Identity"
                className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-3 text-lg font-serif placeholder:text-zinc-300 dark:placeholder:text-zinc-700 focus:outline-none focus:border-black dark:focus:border-white transition-colors text-center"
                autoFocus
              />
            </div>

            <div className="relative group">
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Passkey"
                maxLength={4}
                className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-3 text-lg font-serif placeholder:text-zinc-300 dark:placeholder:text-zinc-700 focus:outline-none focus:border-black dark:focus:border-white transition-colors text-center tracking-[0.5em]"
              />
            </div>
          </div>

          <div className="h-6 text-center">
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-sans text-red-900 dark:text-red-300 tracking-widest uppercase"
              >
                Access Denied
              </motion.p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="group flex items-center space-x-3 px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-300"
            >
              <span className="font-sans text-xs tracking-widest uppercase">Enter</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};