export const GAME_SOUNDS = {
  correct: "/sounds/correct answer.mp3",
  wrong: "/sounds/wrong answer.mp3",
  levelWin: "/sounds/level win .mp3",
} as const;

export type GameSound = keyof typeof GAME_SOUNDS;

export function playGameSound(sound: GameSound) {
  if (typeof window === "undefined") return;

  const audio = new Audio(GAME_SOUNDS[sound]);
  audio.volume = 0.35;
  audio.play().catch(() => {
    // Browsers can block audio if the child has not interacted yet.
  });
}
