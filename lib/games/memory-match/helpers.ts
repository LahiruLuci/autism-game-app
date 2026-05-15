export interface MemoryCardData {
  id: string;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function shuffleCards(icons: string[]): MemoryCardData[] {
  // Double the icons to create pairs
  const pairs = [...icons, ...icons];
  
  // Fisher-Yates shuffle
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  
  return pairs.map((icon, index) => ({
    id: `card-${index}-${Math.random().toString(36).substr(2, 9)}`,
    icon,
    isFlipped: false,
    isMatched: false,
  }));
}

export const SUPPORTIVE_FEEDBACK = {
  correct: [
    "Nice match 🌟",
    "You found a pair 💛",
    "Great remembering 😊",
    "Wonderful focus 🌈",
  ],
  incorrect: [
    "Good try 💛",
    "Let’s look again gently 🌼",
    "We can remember together 😊",
    "Try another pair 🌈",
  ],
};

export function getRandomFeedback(type: 'correct' | 'incorrect'): string {
  const list = SUPPORTIVE_FEEDBACK[type];
  return list[Math.floor(Math.random() * list.length)];
}
