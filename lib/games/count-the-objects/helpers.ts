export const COUNTING_FEEDBACK = {
  correct: [
    "Great counting 🌟",
    "Nice number match 💛",
    "Wonderful counting 😊",
    "You counted carefully 🌈",
  ],
  incorrect: [
    "That’s okay 💛",
    "Let’s count together 🌼",
    "Good try 😊",
    "We can count slowly 🌈",
  ],
};

export function getRandomCountingFeedback(type: "correct" | "incorrect"): string {
  const bank = COUNTING_FEEDBACK[type];
  return bank[Math.floor(Math.random() * bank.length)];
}
