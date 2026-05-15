export interface PatternQuestion {
  id: string;
  level: number;
  pattern: string[];
  correctAnswer: string;
  options: string[];
  instruction: string;
}

export const PATTERN_BANK: PatternQuestion[] = [
  // LEVEL 1
  {
    id: "p1-1",
    level: 1,
    pattern: ["🔵", "🔴", "🔵"],
    correctAnswer: "🔴",
    options: ["🔴", "🔵"],
    instruction: "What comes next?",
  },
  {
    id: "p1-2",
    level: 1,
    pattern: ["⭐", "🌙", "⭐"],
    correctAnswer: "🌙",
    options: ["🌙", "⭐"],
    instruction: "Find the next one.",
  },
  {
    id: "p1-3",
    level: 1,
    pattern: ["🌸", "🍃", "🌸"],
    correctAnswer: "🍃",
    options: ["🍃", "🌸"],
    instruction: "Choose the next card.",
  },
  {
    id: "p1-4",
    level: 1,
    pattern: ["🍎", "🍐", "🍎"],
    correctAnswer: "🍐",
    options: ["🍐", "🍎"],
    instruction: "What follows?",
  },
  {
    id: "p1-5",
    level: 1,
    pattern: ["🐶", "🐱", "🐶"],
    correctAnswer: "🐱",
    options: ["🐱", "🐶"],
    instruction: "Match the pattern.",
  },

  // LEVEL 2
  {
    id: "p2-1",
    level: 2,
    pattern: ["🔵", "🔴", "🟡", "🔵", "🔴"],
    correctAnswer: "🟡",
    options: ["🔴", "🟡", "🔵"],
    instruction: "Complete the sequence.",
  },
  {
    id: "p2-2",
    level: 2,
    pattern: ["⭐", "🌙", "☀️", "⭐", "🌙"],
    correctAnswer: "☀️",
    options: ["☀️", "🌙", "⭐"],
    instruction: "What's missing?",
  },
  {
    id: "p2-3",
    level: 2,
    pattern: ["🟦", "🟨", "🟦", "🟨"],
    correctAnswer: "🟦",
    options: ["🟦", "🟨", "🟩"],
    instruction: "Look closely at the shapes.",
  },
  {
    id: "p2-4",
    level: 2,
    pattern: ["🚗", "🚲", "🚗", "🚲"],
    correctAnswer: "🚗",
    options: ["🚲", "🚗", "🚂"],
    instruction: "What comes next?",
  },
  {
    id: "p2-5",
    level: 2,
    pattern: ["🎈", "🎁", "🎈", "🎁"],
    correctAnswer: "🎈",
    options: ["🎁", "🎈", "🧁"],
    instruction: "Finish the pattern.",
  },

  // LEVEL 3
  {
    id: "p3-1",
    level: 3,
    pattern: ["🔵", "🔴", "🟡", "🔵", "🔴", "🟡", "🔵"],
    correctAnswer: "🔴",
    options: ["🔴", "🟡", "🔵", "🟢"],
    instruction: "Carefully find the next item.",
  },
  {
    id: "p3-2",
    level: 3,
    pattern: ["⭐", "🌙", "☀️", "⭐", "🌙", "☀️"],
    correctAnswer: "⭐",
    options: ["⭐", "🌙", "☀️", "☁️"],
    instruction: "What starts the pattern again?",
  },
  {
    id: "p3-3",
    level: 3,
    pattern: ["🟦", "🟨", "🟩", "🟦", "🟨"],
    correctAnswer: "🟩",
    options: ["🟩", "🟦", "🟨", "🟥"],
    instruction: "Which shape follows?",
  },
  {
    id: "p3-4",
    level: 3,
    pattern: ["🦁", "🐯", "🐻", "🦁", "🐯"],
    correctAnswer: "🐻",
    options: ["🐻", "🦁", "🐯", "🐘"],
    instruction: "Complete the animal sequence.",
  },
  {
    id: "p3-5",
    level: 3,
    pattern: ["🍭", "🍬", "🍫", "🍭", "🍬"],
    correctAnswer: "🍫",
    options: ["🍫", "🍬", "🍭", "🍩"],
    instruction: "What's the next treat?",
  },
];

export function getQuestionsForLevel(level: number, count: number): PatternQuestion[] {
  const levelQuestions = PATTERN_BANK.filter((q) => q.level === level);
  // Shuffle and take 'count'
  return [...levelQuestions].sort(() => Math.random() - 0.5).slice(0, count);
}
