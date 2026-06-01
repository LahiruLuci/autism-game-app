import { Emotion, EmotionId } from "@/types/games/emotion-face-match";

export const EMOTIONS: Record<EmotionId, Emotion> = {
  happy: {
    id: "happy",
    label: "Happy",
    emoji: "😊",
    color: "bg-gradient-to-br from-amber-50 to-orange-50 text-amber-600 border-amber-100 hover:border-amber-300 ring-amber-400/20",
    supportiveText: "Great matching! Happy faces bring so much joy. 🌟",
  },
  sad: {
    id: "sad",
    label: "Sad",
    emoji: "😢",
    color: "bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 border-blue-100 hover:border-blue-300 ring-blue-400/20",
    supportiveText: "Wonderful effort! It's okay to feel sad sometimes. 💛",
  },
  angry: {
    id: "angry",
    label: "Angry",
    emoji: "😠",
    color: "bg-gradient-to-br from-rose-50 to-red-50 text-rose-600 border-rose-100 hover:border-rose-300 ring-rose-400/20",
    supportiveText: "Nice work! You are very good at identifying feelings. ✨",
  },
  surprised: {
    id: "surprised",
    label: "Surprised",
    emoji: "😮",
    color: "bg-gradient-to-br from-purple-50 to-fuchsia-50 text-purple-600 border-purple-100 hover:border-purple-300 ring-purple-400/20",
    supportiveText: "Amazing job! That was a big surprise! 🎊",
  },
  scared: {
    id: "scared",
    label: "Scared",
    emoji: "😨",
    color: "bg-gradient-to-br from-indigo-50 to-slate-100 text-indigo-600 border-indigo-100 hover:border-indigo-300 ring-indigo-400/20",
    supportiveText: "Great job! You found the right face. You're doing great! 💪",
  },
};

export function getEmotionsByIds(ids: EmotionId[]): Emotion[] {
  return ids.map(id => EMOTIONS[id]);
}
