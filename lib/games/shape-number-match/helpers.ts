export const SHAPE_MATCH_FEEDBACK = {
  correct: [
    "Nice matching 🌟",
    "Great counting 💛",
    "Wonderful thinking 😊",
    "You matched carefully 🌈",
  ],
  incorrect: [
    "That’s okay 💛",
    "Let’s count together 🌼",
    "Good try 😊",
    "We can look carefully again 🌈",
  ],
};

export function getRandomShapeFeedback(type: "correct" | "incorrect"): string {
  const bank = SHAPE_MATCH_FEEDBACK[type];
  return bank[Math.floor(Math.random() * bank.length)];
}
