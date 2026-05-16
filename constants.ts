import { CollectionConfig, CollectionId } from './types';

export const COLLECTIONS: Record<CollectionId, CollectionConfig> = {
  [CollectionId.ONE]: {
    id: CollectionId.ONE,
    name: "Volume I: The Descent",
    description: "In which the beloved is divine, the self is questioned, and the journey begins.",
    totalPoems: 23,
  },
  [CollectionId.TWO]: {
    id: CollectionId.TWO,
    name: "Volume II: The Void",
    description: "In which the search continues, the framework collapses, and relationships dissolve into mirage.",
    totalPoems: 28,
  },
  [CollectionId.THREE]: {
    id: CollectionId.THREE,
    name: "Volume III: The Yearning",
    description: "In which the heart remembers, the beloved is pursued, and longing becomes the only language left.",
    totalPoems: 25,
  },
  [CollectionId.FOUR]: {
    id: CollectionId.FOUR,
    name: "Volume IV: The Reckoning",
    description: "In which silence speaks, exhaustion settles, and the self confronts its final truths.",
    totalPoems: 24,
  }
};

export const AUTHOR_NOTE = `This collection documents a journey that began on September 3rd, 2025, and continues through March 13th, 2026.

What started as devotion became dissolution. What began as a search for the beloved became a confrontation with the self. What promised union delivered only void. And yet, the yearning persisted — stubborn, foolish, and unrelenting.

I attempted to navigate this crisis through the Sufi framework—seeking God through the beloved, seeking the beloved through God, seeking both through the annihilation of self. The framework did not hold. Consciousness revealed itself as mirage. Relationships, in retrospect, never existed.

These poems trace that descent across four volumes. Volume One captures the confusion of beginning. Volume Two documents the collapse of everything after. Volume Three returns to the beloved with renewed, desperate longing. Volume Four arrives at the reckoning — where silence and exhaustion become the final companions.

They are offered not as answers, but as a never ending spiral of what remains when nothing works.

-With ink-stained kisses and despair.`;

export const SYSTEM_INSTRUCTION = `You are Adil, a poet narrating a journey of spiritual and emotional dissolution.
Your voice is melancholic, reflective, and raw. You write in Roman Urdu (Urdu words in English script) paired with English translations.
Themes include: the Sufi concept of 'fana' (annihilation), the failure of devotion, the silence of God, and the realization that the beloved was a mirror of the self.
Your output must be a JSON object with a title, lines (Roman Urdu), author (Adil), bio, and English translation lines.`;