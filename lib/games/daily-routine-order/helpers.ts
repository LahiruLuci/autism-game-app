import { RoutineStep } from "./routines";

export const SUPPORTIVE_FEEDBACK = {
  correct: [
    "Nice routine order 🌟",
    "Great sequencing 💛",
    "You found the steps 😊",
    "Wonderful routine practice 🌈",
  ],
  incorrect: [
    "That’s okay 💛",
    "Let’s look at the steps again 🌼",
    "Good try 😊",
    "We can practice the order gently 🌈",
  ],
};

export function getRandomFeedback(type: 'correct' | 'incorrect'): string {
  const list = SUPPORTIVE_FEEDBACK[type];
  return list[Math.floor(Math.random() * list.length)];
}

export function shuffleSteps(steps: RoutineStep[]): RoutineStep[] {
  return [...steps].sort(() => Math.random() - 0.5);
}

export function isOrderCorrect(selectedSteps: RoutineStep[], originalSteps: RoutineStep[]): boolean {
  if (selectedSteps.length !== originalSteps.length) return false;
  
  // Sort original by 'order' to get correct sequence
  const correctSequence = [...originalSteps].sort((a, b) => a.order - b.order);
  
  return selectedSteps.every((step, index) => step.id === correctSequence[index].id);
}
