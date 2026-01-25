import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScribble: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 opacity-50">
      <svg width="100" height="40" viewBox="0 0 100 40" className="stroke-black dark:stroke-white fill-none" strokeWidth="1">
        <motion.path
          d="M0,20 Q10,0 20,20 T40,20 T60,20 T80,20 T100,20"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
      <p className="text-xs font-serif italic tracking-widest text-zinc-500 dark:text-zinc-400">COMPOSING</p>
    </div>
  );
};