export const EMOTION_DATA: Record<string, { label: string; icon: string; color: string; gradient: string }> = {
  happy: { label: "Happy", icon: "😊", color: "text-amber-500", gradient: "from-amber-50 to-orange-50" },
  sad: { label: "Sad", icon: "😢", color: "text-blue-500", gradient: "from-blue-50 to-indigo-50" },
  angry: { label: "Angry", icon: "😠", color: "text-rose-500", gradient: "from-rose-50 to-red-50" },
  surprised: { label: "Surprised", icon: "😮", color: "text-violet-500", gradient: "from-violet-50 to-purple-50" },
  scared: { label: "Scared", icon: "😨", color: "text-slate-500", gradient: "from-slate-50 to-zinc-50" },
  calm: { label: "Calm", icon: "😌", color: "text-emerald-500", gradient: "from-emerald-50 to-teal-50" },
};

export const REFLECTION_FEEDBACK = {
  general: [
    "Thank you for sharing your feeling 🌈",
    "Nice reflection! 💛",
    "You are thinking carefully about feelings 😊",
    "Wonderful sharing ✨",
    "Feelings are important to notice 🌼",
  ],
  matching: [
    "I feel that way too sometimes! 💛",
    "That is a very common feeling 😊",
    "You understood that situation well! ✨",
  ],
  differing: [
    "People can feel different emotions sometimes 💛",
    "That feeling choice is okay too 🌈",
    "It's interesting how we all feel differently 😊",
  ],
};

export function getRandomFeedback(type: "general" | "matching" | "differing"): string {
  const bank = REFLECTION_FEEDBACK[type];
  return bank[Math.floor(Math.random() * bank.length)];
}
