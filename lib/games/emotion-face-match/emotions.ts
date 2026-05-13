import { Emotion, EmotionId } from "@/types/games/emotion-face-match";

export const EMOTIONS: Record<EmotionId, Emotion> = {
  happy: {
    id: "happy",
    label: "Happy",
    emoji: "😊",
    color: "bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200",
    supportiveText: "Great matching! Happy faces bring so much joy. 🌟",
  },
  sad: {
    id: "sad",
    label: "Sad",
    emoji: "😢",
    color: "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200",
    supportiveText: "Wonderful effort! It's okay to feel sad sometimes. 💛",
  },
  angry: {
    id: "angry",
    label: "Angry",
    emoji: "😠",
    color: "bg-rose-100 text-rose-700 hover:bg-rose-200 border-rose-200",
    supportiveText: "Nice work! You are very good at identifying feelings. ✨",
  },
  surprised: {
    id: "surprised",
    label: "Surprised",
    emoji: "😮",
    color: "bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200",
    supportiveText: "Amazing job! That was a big surprise! 🎊",
  },
  scared: {
    id: "scared",
    label: "Scared",
    emoji: "😨",
    color: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-200",
    supportiveText: "Great job! You found the right face. You're doing great! 💪",
  },
};

export function getEmotionsByIds(ids: EmotionId[]): Emotion[] {
  return ids.map(id => EMOTIONS[id]);
}
