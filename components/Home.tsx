import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CollectionConfig, CollectionId } from '../types';
import { COLLECTIONS, AUTHOR_NOTE } from '../constants';
import { getAllPoems } from '../data/poems';
import { Feather } from './Icons';

interface HomeProps {
  onOpenCollection: (id: CollectionId) => void;
  onOpenPoem: (id: string) => void;
}

const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className={`min-h-screen w-full flex flex-col items-center justify-center p-8 py-24 relative ${className}`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl w-full flex flex-col items-center text-center"
      >
        {children}
      </motion.div>
    </section>
  );
};

export const Home: React.FC<HomeProps> = ({ onOpenCollection, onOpenPoem }) => {
  const allPoems = getAllPoems();
  const vol1Poems = allPoems.filter(p => p.id.startsWith(CollectionId.ONE));
  const vol2Poems = allPoems.filter(p => p.id.startsWith(CollectionId.TWO));

  const PoemList = ({ title, date, subtitle }: { title: string, date: string, subtitle: string }) => (
    <div className="mb-12 w-full text-left">
      <h3 className="font-serif text-2xl text-black dark:text-white mb-2">{title}</h3>
      <p className="font-sans text-xs tracking-widest uppercase text-zinc-500 dark:text-zinc-500 mb-6">{subtitle}</p>
      <div className="columns-1 md:columns-2 gap-8">
        {date === 'vol1' ? vol1Poems.map((poem, i) => (
          <button
            key={poem.id}
            onClick={() => onOpenPoem(poem.id)}
            className="flex justify-between items-baseline border-b border-zinc-100 dark:border-zinc-800 pb-1 mb-3 hover:pl-2 transition-all cursor-pointer group w-full text-left break-inside-avoid"
          >
            <span className="font-serif text-lg text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors">{poem.title}</span>
            <span className="font-sans text-[10px] text-zinc-400 dark:text-zinc-600 ml-4 shrink-0">{poem.date.split('-').reverse().map((part, i) => i === 2 ? part.slice(2) : part).join('/')}</span>
          </button>
        )) : vol2Poems.map((poem, i) => (
          <button
            key={poem.id}
            onClick={() => onOpenPoem(poem.id)}
            className="flex justify-between items-baseline border-b border-zinc-100 dark:border-zinc-800 pb-1 mb-3 hover:pl-2 transition-all cursor-pointer group w-full text-left break-inside-avoid"
          >
            <span className="font-serif text-lg text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors">{poem.title}</span>
            <span className="font-sans text-[10px] text-zinc-400 dark:text-zinc-600 ml-4 shrink-0">{poem.date.split('-').reverse().map((part, i) => i === 2 ? part.slice(2) : part).join('/')}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full bg-white dark:bg-zinc-950 text-black dark:text-white transition-colors duration-500">

      {/* SECTION 1: HERO */}
      <Section className="h-screen bg-white dark:bg-zinc-950">
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6 text-black dark:text-white">
          NAZM-E-ADIL
        </h1>
        <p className="font-serif text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 italic mb-12">
          Poems of Adil
        </p>
        <div className="font-sans text-xs tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-600 space-y-2">
          <p>Volume One & Two</p>
          <p>September 3 - January 15, 2026</p>
        </div>
      </Section>

      {/* SECTION 2: INTRO */}
      <Section className="bg-white dark:bg-zinc-950">
        <h2 className="font-serif text-3xl md:text-4xl mb-2 text-black dark:text-white">NAZM-E-ADIL</h2>
        <p className="font-serif italic text-zinc-500 dark:text-zinc-400 mb-12">A Collection in Two Volumes</p>

        <div className="space-y-12 max-w-xl">
          <div>
            <h3 className="font-bold font-serif text-xl mb-2 text-black dark:text-white">Volume I: The Descent</h3>
            <p className="font-serif text-zinc-600 dark:text-zinc-400">
              In which the beloved is divine, the self is questioned, and the journey begins.
            </p>
          </div>
          <div>
            <h3 className="font-bold font-serif text-xl mb-2 text-black dark:text-white">Volume II: The Void</h3>
            <p className="font-serif text-zinc-600 dark:text-zinc-400">
              In which the search continues, the framework collapses, and relationships dissolve into mirage.
            </p>
          </div>
          <p className="font-serif italic text-zinc-400 dark:text-zinc-600 mt-8">
            Fifty movements across five months
          </p>
        </div>
      </Section>

      {/* SECTION 3: BIOGRAPHY */}
      <Section className="bg-zinc-50 dark:bg-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full text-left">
          {/* Text Side (Left) */}
          <div className="order-2 md:order-1">
            <h2 className="font-serif text-3xl md:text-4xl mb-6 text-black dark:text-white">THE POET</h2>
            <div className="w-12 h-px bg-zinc-300 dark:bg-zinc-700 mb-8"></div>
            <p className="font-serif text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 mb-6">
              Adil writes from the silence that follows the storm. Born from a necessity to document the dissolution of selfhood, his work navigates the fragile boundary between devotion and despair.
            </p>
            <p className="font-serif text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
              In <em>Nazm-e-Adil</em>, he explores the Sufi concept of <em>Fana</em> not as a spiritual ascension, but as a human catastrophe—documenting the void left behind when the beloved becomes a mirror, and the mirror shatters.
            </p>
            <div className="mt-8 flex items-center space-x-2 text-zinc-400 dark:text-zinc-500">
              <Feather size={16} />
              <span className="font-sans text-xs tracking-widest uppercase">Est. 2026</span>
            </div>
          </div>

          {/* Image Side (Right) */}
          <div className="order-1 md:order-2 w-full aspect-[3/4] bg-white dark:bg-zinc-800 shadow-xl p-3 relative flex items-center justify-center overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="w-full h-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center relative overflow-hidden border border-zinc-200 dark:border-zinc-700">
              <img src="/media/logo.png" alt="Portrait of the Artist" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 4: AUTHOR'S NOTE */}
      <Section className="bg-white dark:bg-zinc-950">
        <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-600 mb-12">Author's Note</h2>
        <div className="font-serif text-lg leading-relaxed text-zinc-800 dark:text-zinc-200 text-left max-w-xl space-y-6">
          {AUTHOR_NOTE.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          <div className="pt-8">
            <p>— Adil</p>
            <p className="text-sm text-zinc-400 dark:text-zinc-500 italic mt-1">January 15, 2026</p>
          </div>
        </div>
      </Section>

      {/* SECTION 5: TABLE OF CONTENTS (LIST) */}
      <Section className="bg-white dark:bg-zinc-950">
        <h2 className="font-serif text-3xl md:text-4xl mb-16 tracking-widest text-black dark:text-white">TABLE OF CONTENTS</h2>

        <div className="w-full max-w-4xl">
          <PoemList
            title="NAZM-E-ADIL: VOLUME ONE"
            subtitle="The Descent (September 3 - October 13, 2025)"
            date="vol1"
          />

          <div className="h-12"></div>

          <PoemList
            title="NAZM-E-ADIL: VOLUME TWO"
            subtitle="The Void (October 16 - January 15, 2026)"
            date="vol2"
          />
        </div>
      </Section>

      {/* SECTION 6: NAVIGATION (Selection) */}
      <Section className="bg-black dark:bg-zinc-900 text-white">
        <h2 className="font-serif text-3xl md:text-4xl mb-16 tracking-widest text-white">READ COLLECTIONS</h2>

        <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl px-4">
          {Object.values(COLLECTIONS).map((col) => (
            <button
              key={col.id}
              onClick={() => onOpenCollection(col.id)}
              className="flex-1 group relative p-8 md:p-12 border border-white/20 hover:bg-white hover:text-black transition-all duration-500 text-left rounded-sm bg-white/5"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-xs tracking-widest uppercase opacity-70 group-hover:opacity-100">
                  {col.id === CollectionId.ONE ? 'Volume One' : 'Volume Two'}
                </span>
                <Feather className="opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
              </div>
              <h3 className="font-serif text-2xl md:text-4xl italic mb-4">
                {col.name.split(': ')[1]}
              </h3>
              <p className="font-serif text-sm md:text-base opacity-60 group-hover:opacity-100 leading-relaxed text-zinc-400 group-hover:text-zinc-600">
                {col.description}
              </p>
            </button>
          ))}
        </div>
      </Section>
    </div>
  );
};