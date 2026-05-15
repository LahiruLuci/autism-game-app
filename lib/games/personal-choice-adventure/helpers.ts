import { ChoiceOption } from "./scenarios";

export const CHOICE_FEEDBACK = {
  correct: [
    "Nice choice 🌟",
    "That can help 💛",
    "Great thinking 😊",
    "You chose a helpful action 🌈",
    "Wonderful choice ✨",
  ],
  incorrect: [
    "That’s okay 💛",
    "Let’s try a helpful choice together 🌼",
    "Good try 😊",
    "We can practice this situation 🌈",
    "Let’s look again gently ✨",
  ],
};

export function getRandomChoiceFeedback(type: "correct" | "incorrect"): string {
  const bank = CHOICE_FEEDBACK[type];
  return bank[Math.floor(Math.random() * bank.length)];
}

export function shuffleOptions(options: ChoiceOption[]): ChoiceOption[] {
  return [...options].sort(() => Math.random() - 0.5);
}
