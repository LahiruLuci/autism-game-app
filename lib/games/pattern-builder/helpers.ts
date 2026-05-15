export const SUPPORTIVE_FEEDBACK = {
  correct: [
    "Nice pattern match 🌟",
    "You found what comes next 💛",
    "Great looking 😊",
    "Wonderful thinking 🌈",
  ],
  incorrect: [
    "That’s okay 💛",
    "Let’s look at the pattern again 🌼",
    "Good try 😊",
    "We can practice the next one gently 🌈",
  ],
};

export function getRandomFeedback(type: 'correct' | 'incorrect'): string {
  const list = SUPPORTIVE_FEEDBACK[type];
  return list[Math.floor(Math.random() * list.length)];
}
